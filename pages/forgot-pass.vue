<template>
  <div class="bg-local" style="background-image: url(background.jpg)">
    <!-- component -->
    <section class="flex flex-col min-h-screen">
      <div class="flex items-center justify-center flex-1">
        <div
          class="bg-white w-full px-4 py-16 text-center rounded-lg sm:border-2 lg:px-24 lg:max-w-xl sm:max-w-md"
        >
          <form class="text-center">
            <div class="flex items-center justify-center flex-1">
              <img
                class="object-fill h-50 w-55"
                src="~/assets/img/question-mark.png"
              />
            </div>
            <h1
              class="w-full mb-8 text-3xl font-bold tracking-wider text-gray-600"
            >
              Reset password
            </h1>
            <div class="py-2 text-left">
              <input
                v-model="email"
                type="email"
                class="block w-full px-4 py-2 bg-gray-100 bg-gray-200 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700"
                placeholder="Email"
              />
            </div>
            <div class="mb-6 text-center">
              <button
                type="submit"
                class="block w-full p-2 font-bold tracking-wider text-white bg-red-400 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700 hover:bg-red-600"
                @click="sendEmail"
              >
                Reset password
              </button>
            </div>
            <hr class="mb-6 border-t" />
            <div class="mt-12 text-center">
              <span> Already have an account? </span>
              <NuxtLink
                to="/login"
                class="font-light font-semibold text-red-400 underline text-md hover:text-red-600"
                >Sign in</NuxtLink
              >
              <br />
              <span> Don't have an account? </span>
              <NuxtLink
                to="/signup"
                class="font-light font-semibold text-red-400 underline text-md hover:text-red-600"
                >Create one</NuxtLink
              >
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    }
  },
  methods: {
    async sendEmail(e) {
      e.preventDefault()
      try {
        await this.$fire.auth.sendPasswordResetEmail(this.email)
        alert('Email sent successfully !')
        this.$router.push('/login')
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>

<style></style>
