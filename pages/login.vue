<template>
  <div class="relative h-screen overflow-hidden bg-indigo-900">
    <img
      src="~/assets/img/Rose-Petals.svg"
      class="absolute object-cover w-full h-full"
    />
    <div
      class="absolute inset-0 opacity-25 bg-gradient-to-tr from-indigo-400 via-indigo-600 to-black"
    ></div>
    <div
      class="container relative h-full px-1 py-1 mx-auto md:px-12 md:py-12 z-1"
    >
      <div
        class="w-full h-full p-3 border-indigo-900 shadow-xl md:p-8 border-3 md:border-12 rounded-xl"
      >
        <div class="flex items-center justify-center w-full">
          <n-link to="/">
            <img
              class="object-fill w-10 h-10 md:h-15 md:w-15"
              src="~/assets/img/logo.svg"
            />
          </n-link>
          <p
            class="mx-3 text-xl font-bold tracking-widest text-gray-200 md:text-4xl"
          >
            LOGIN
          </p>
        </div>
        <div class="flex h-full mt-5">
          <div
            class="flex justify-center w-full h-full p-5 overflow-y-auto bg-indigo-900 rounded-md shadow-xl align-center"
            style="height: 90%"
          >
            <form class="w-full mt-8 text-center lg:w-1/2">
              <div class="py-5 text-left">
                <input
                  v-model="email"
                  type="email"
                  class="block w-full px-4 py-5 text-xl text-center text-white bg-indigo-600 rounded-lg shadow-2xl md:text-2xl focus:outline-none focus:border-indigo-700"
                  placeholder="Email"
                />
              </div>
              <div class="py-5 text-left">
                <input
                  v-model="password"
                  type="password"
                  class="block w-full px-4 py-5 text-xl text-center text-white bg-indigo-600 rounded-lg shadow-2xl md:text-2xl focus:outline-none focus:border-indigo-700"
                  placeholder="Mot de passe"
                />
              </div>
              <div class="py-5">
                <button
                  class="block w-full p-5 text-xl font-bold tracking-wider text-white bg-red-600 rounded-lg shadow-xl md:text-2xl hover:bg-red-800 focus:outline-none focus:border-gray-700"
                  @click="signInUser"
                >
                  Connexion
                </button>
              </div>
              <div class="flex flex-wrap items-center justify-center">
                <n-link
                  to="signup"
                  class="flex items-center justify-center w-full p-3 mx-2 mt-3 text-white no-underline transform scale-100 bg-indigo-800 rounded-lg shadow-xl md:w-48 hover:bg-indigo-600 hover:scale-105 h-14"
                >
                  <div class="mr-3">
                    <img
                      class="object-fill w-10 p-1"
                      src="~/assets/img/checklist.svg"
                    />
                  </div>
                  <div>
                    <div class="text-xs text-left">PAS DE COMPTE</div>
                    <div class="-mt-1 font-sans text-xl font-semibold">
                      S'INSCRIRE
                    </div>
                  </div>
                </n-link>
                <button
                  class="flex items-center justify-center w-full p-3 mx-2 mt-3 text-white transform scale-100 bg-indigo-800 rounded-lg shadow-xl md:w-48 hover:bg-indigo-600 hover:scale-105 h-14"
                  @click="signInAnonymous"
                >
                  <div class="mr-3">
                    <img
                      class="object-fill w-10 p-1"
                      src="~/assets/img/anonymous.svg"
                    />
                  </div>
                  <div>
                    <div class="text-xs text-left">CONNEXION</div>
                    <div class="-mt-1 font-sans text-xl font-semibold">
                      ANONYME
                    </div>
                  </div>
                </button>
                <n-link
                  to="forgot-pass"
                  class="flex items-center justify-center w-full p-3 mx-2 mt-3 text-white no-underline transform scale-100 bg-indigo-800 rounded-lg shadow-xl md:w-48 hover:bg-indigo-600 hover:scale-105 h-14"
                >
                  <div class="mr-3">
                    <img
                      class="object-fill w-10 p-1"
                      src="~/assets/img/forgot.svg"
                    />
                  </div>
                  <div>
                    <div class="text-xs text-left">MOT DE PASSE</div>
                    <div class="-mt-1 font-sans text-xl font-semibold">
                      OUBLIE
                    </div>
                  </div>
                </n-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
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
  head() {
    return {
      title: 'Join uvsQuiz - Revolution du Trivia',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Le seul jeu de questions-réponses multijoueurs que vous jouerez si vous avez été à UVSQ',
        },
      ],
    }
  },
  methods: {
    async signInUser(e) {
      e.preventDefault()
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.email,
          this.password
        )
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
