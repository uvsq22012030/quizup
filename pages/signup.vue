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
              class="font-bold mb-8 tracking-wider w-full text-3xl text-gray-600"
            >
              Inscription
            </h1>
            <div class="text-left py-3">
              <input
                v-model="username"
                type="text"
                class="rounded-lg bg-gray-50 shadow-xl w-full py-3 px-4 block focus:outline-none focus:border-gray-700"
                placeholder="Pseudo"
              />
            </div>
            <div class="text-left py-3">
              <input
                v-model="email"
                type="email"
                class="rounded-lg bg-gray-50 shadow-xl w-full py-3 px-4 block focus:outline-none focus:border-gray-700"
                placeholder="Email"
              />
            </div>

            <div class="text-left py-3">
              <input
                v-model="password"
                type="password"
                class="rounded-lg bg-gray-50 shadow-xl w-full py-3 px-4 block focus:outline-none focus:border-gray-700"
                placeholder="Mot de passe"
              />
            </div>

            <div class="text-left py-3">
              <input
                v-model="confirm_password"
                type="password"
                class="rounded-lg bg-gray-50 shadow-xl w-full py-3 px-4 block focus:outline-none focus:border-gray-700"
                placeholder="Confirmationde mot de passe"
              />
            </div>

            <div class="py-3">
              <button
                class="rounded-lg font-bold bg-red-600 shadow-xl text-white tracking-wider w-full p-5 block hover:bg-red-800 focus:outline-none focus:border-gray-700"
                @click="createUser"
              >
                S'inscrire
              </button>
            </div>
          </form>
          <div class="mt-12 text-center">
            <span> Vous avez déjà un compte? </span>
            <NuxtLink
              to="/login"
              class="font-light font-semibold text-md text-red-400 underline hover:text-red-600"
              >Se connecter</NuxtLink
            >
          </div>
        </div>
        <!--Popup-->
        <template v-if="popup">
          <div
            class="flex h-full w-full top-0 left-0 modal fixed items-center justify-center"
          >
            <div
              class="h-full bg-gray-900 w-full opacity-50 modal-overlay absolute"
            ></div>
            <div
              class="bg-white rounded mx-auto shadow-lg w-11/12 z-50 modal-container overflow-y-auto md:max-w-md"
            >
              <div class="text-left py-4 px-6 modal-content">
                <!--Icon-->
                <div class="flex flex-1 items-center justify-center">
                  <img
                    class="object-fill h-50 w-55"
                    src="~/assets/img/tick.png"
                  />
                </div>
                <!--Title-->
                <div class="flex pb-3 justify-between items-center">
                  <p class="font-bold text-center text-2xl">
                    Inscription réussie !
                  </p>
                </div>
                <!--Body-->
                <p>Cliquer sur le bouton ci-dessous pour continuer</p>
                <!--Footer-->
                <div class="flex pt-2 justify-end">
                  <button
                    class="rounded-lg font-bold bg-red-400 border-2 border-gray-100 text-white tracking-wider w-full p-2 block hover:bg-red-600 focus:outline-none focus:border-gray-700"
                    @click="goToIndex"
                  >
                    Continuer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      popup: false,
    }
  },
  methods: {
    async createUser(e) {
      e.preventDefault()
      if (!this.username) {
        alert("Veuillez saisir un nom d'utilisateur")
      }
      if (!this.confirm_password) {
        alert('Veuillez confirmer le mot de passe')
      } else if (this.confirm_password !== this.password) {
        alert('La confirmation du mot de passe est fausse')
      } else {
        try {
          await this.$fire.auth.createUserWithEmailAndPassword(
            this.email,
            this.password
          )
          this.$fire.auth.currentUser.updateProfile({
            displayName: this.username,
          })
          this.popup = true
        } catch (e) {
          alert(e)
        }
      }
    },
    goToIndex(e) {
      e.preventDefault()
      this.$router.push('/')
    },
  },
}
</script>

<style>
input:checked + label {
  background-color: #f87171;
}
</style>
