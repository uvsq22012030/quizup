<template>
  <div class="bg-local" style="background-image: url(background.jpg)">
    <!-- component -->
    <section class="flex flex-col min-h-screen">
      <div class="flex items-center justify-center flex-1">
        <div
          class="w-full px-4 py-5 text-center bg-white rounded-lg sm:border-2 lg:px-24 lg:max-w-xl sm:max-w-md"
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
              Inscription
            </h1>
            <div class="py-2 text-left">
              <input
                v-model="username"
                type="text"
                class="block w-full px-4 py-2 bg-gray-100 bg-gray-200 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700"
                placeholder="Pseudo"
              />
            </div>
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
            <div class="py-2 text-left">
              <input
                v-model="confirm_password"
                type="password"
                class="block w-full px-4 py-2 bg-gray-100 bg-gray-200 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700"
                placeholder="Confirmer mot de passe"
              />
            </div>
            <div class="py-2">
              <button
                class="block w-full p-2 font-bold tracking-wider text-white bg-red-400 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700 hover:bg-red-600"
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
              class="font-light font-semibold text-red-400 underline uppercase text-md hover:text-red-600"
              >Se connecter</NuxtLink
            >
          </div>
        </div>
        <!--Popup-->
        <template v-if="popup">
          <div
            class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center"
          >
            <div
              class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
            ></div>
            <div
              class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
            >
              <div class="modal-content py-4 text-left px-6">
                <!--Icon-->
                <div class="flex items-center justify-center flex-1">
                  <img
                    class="object-fill h-50 w-55"
                    src="~/assets/img/tick.png"
                  />
                </div>
                <!--Title-->
                <div class="flex justify-between items-center pb-3">
                  <p class="text-2xl text-center font-bold">
                    Inscription réussie !
                  </p>
                </div>
                <!--Body-->
                <p>Cliquer sur le bouton ci-dessous pour continuer</p>
                <!--Footer-->
                <div class="flex justify-end pt-2">
                  <button
                    class="block w-full p-2 font-bold tracking-wider text-white bg-red-400 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700 hover:bg-red-600"
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
