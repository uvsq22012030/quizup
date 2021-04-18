<template>
  <div class="container">
    <div>
      <h1 class="text-9xl title">QuizUp</h1>
      <p class="mt-3 mb-5 text-lg font-bold tracking-wider text-gray-500">
        Welcome : {{ $fire.auth.currentUser.displayName }} !
      </p>
      <div class="mt-5">
        <button
          class="px-4 py-2 font-semibold text-red-700 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent"
          @click="signOut"
        >
          Deconnexion
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async signOut() {
      try {
        // Check if a user is logged in with an anonymous an account
        if (!this.$fire.auth.currentUser.isAnonymous) {
          // If not, log out
          await this.$fire.auth.signOut()
        } else {
          // Else delete the anonymous account
          this.$fire.auth.currentUser.delete()
        }
        // Redirect to login page
        this.$router.push('/login')
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
