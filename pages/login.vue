<template>
  <div class="bg-local" style="background-image: url(background.jpg)">
    <!-- component -->
    <section class="flex flex-col min-h-screen">
      <div class="flex items-center justify-center flex-1">
        <div
          class="w-full px-4 py-16 text-center bg-white rounded-lg sm:border-2 lg:px-24 lg:max-w-xl sm:max-w-md"
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
              Connexion
            </h1>
            <div class="py-2 text-left">
              <input
                v-model="email"
                type="email"
                class="block w-full px-4 py-2 bg-gray-100 bg-gray-200 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700"
                placeholder="Email"
              />
            </div>
            <div class="py-2 text-left">
              <input
                v-model="password"
                type="password"
                class="block w-full px-4 py-2 bg-gray-100 bg-gray-200 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700"
                placeholder="Mot de passe"
              />
            </div>
            <div class="py-2">
              <button
                class="block w-full p-2 font-bold tracking-wider text-white uppercase bg-red-400 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700 hover:bg-red-600"
                @click="signInUser"
              >
                Connexion
              </button>
            </div>
          </form>
          <div class="text-center">
            <NuxtLink to="/forgot-pass" class="hover:underline"
              >Mot de passe oublié?</NuxtLink
            >
          </div>
          <div class="mt-12 text-center">
            <span> Pas de compte? </span>
            <NuxtLink
              to="/signup"
              class="font-light font-semibold text-red-400 underline text-md hover:text-red-600"
              >En créer un</NuxtLink
            >
          </div>
          <div class="mt-2 text-center">
            <span> Sinon </span>
            <a
              href="#"
              class="font-light font-semibold text-red-400 underline text-md hover:text-red-600"
              @click="signInAnonymous"
              >Cliquer ici</a
            >
            <span> pour se connecter en tant qu'invité. </span>
          </div>
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
      password: '',
    }
  },
  methods: {
    async signInUser(e) {
      e.preventDefault()
      try {
        const userInfo = await this.$fire.auth.signInWithEmailAndPassword(
          this.email,
          this.password
        )
        console.log(userInfo)
        this.$router.push('/')
      } catch (e) {
        alert(e)
      }
    },
    async signInAnonymous(e) {
      e.preventDefault()
      try {
        await this.$fire.auth.signInAnonymously()
        await this.$fire.auth.currentUser.updateProfile({
          displayName: 'Guest_' + Date.now(),
        })
        this.$router.push('/')
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>

<style></style>
