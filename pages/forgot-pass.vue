<template>
  <div class="bg-local" style="background-image: url(background.jpg)">
    <!-- component -->
    <section class="flex flex-col min-h-screen">
      <div class="flex flex-1 items-center justify-center">
        <div
          class="bg-white rounded-xl text-center w-full py-16 px-4 shadow-2xl sm:max-w-md lg:max-w-2xl lg:px-24"
        >
          <form class="text-center">
            <div class="flex flex-1 items-center justify-center">
              <img class="object-fill h-50 w-55" src="~/assets/img/logo.svg" />
            </div>
            <h1
              class="font-bold mb-8 tracking-wider w-full text-2xl text-gray-600"
            >
              Réinitialisation de mot de passe
            </h1>
            <div class="text-left py-5">
              <input
                v-model="email"
                type="email"
                class="rounded-lg bg-gray-50 shadow-xl w-full py-5 px-4 block focus:outline-none focus:border-gray-700"
                placeholder="Email"
              />
            </div>
            <div class="py-5">
              <button
                class="rounded-lg font-bold bg-red-600 shadow-xl text-white tracking-wider w-full p-5 block hover:bg-red-800 focus:outline-none focus:border-gray-700"
                @click="sendEmail"
              >
                Envoyer
              </button>
            </div>

            <div class="mt-12 text-center">
              <span> Vous avez déjà un compte? </span>
              <NuxtLink
                to="/login"
                class="font-light font-semibold text-md text-red-400 underline hover:text-red-600"
                >Se connecter</NuxtLink
              >
              <br />
              <span> Pas de compte? </span>
              <NuxtLink
                to="/signup"
                class="font-light font-semibold text-md text-red-400 underline hover:text-red-600"
                >En créer un</NuxtLink
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
        alert("L'email a bient été envoyé !")
        this.$router.push('/login')
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>

<style></style>
