<template>
  <div>
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
          class="w-full h-full p-2 border-indigo-900 shadow-xl md:p-8 border-5 lg:border-12 rounded-xl"
        >
          <div class="flex items-center justify-center w-full">
            <img
              class="object-fill w-8 h-8 lg:h-15 lg:w-15"
              src="~/assets/img/logo.svg"
            />
            <p class="mx-3 text-xl font-bold text-gray-200 lg:text-4xl">
              uvsQuiz
            </p>
          </div>
          <div class="flex flex-wrap items-center h-full">
            <div class="flex flex-col items-center w-full p-5 lg:w-1/2">
              <img
                class="w-20 h-20 bg-indigo-800 border-indigo-900 rounded-full shadow-2xl border-10 lg:h-80 lg:w-80"
                :src="
                  'https://avatars.dicebear.com/api/bottts/' +
                  $fire.auth.currentUser.displayName +
                  '.svg'
                "
              />
              <p
                class="mt-2 mb-2 text-base font-bold tracking-tight text-white lg:mt-8 lg:text-4xl"
              >
                {{ $fire.auth.currentUser.displayName }}
              </p>
              <span
                class="p-2 text-xs text-center text-pink-300 bg-indigo-900 rounded-lg cursor-pointer hover:bg-indigo-700"
                @click="signOut"
                >Déconnexion</span
              >

              <div class="flex flex-wrap items-center mt-2">
                <button
                  type="button"
                  class="flex items-center justify-center w-full p-3 mx-2 mt-3 text-white transform scale-100 bg-indigo-800 rounded-lg shadow-xl lg:w-48 hover:bg-indigo-600 hover:scale-105 h-14"
                >
                  <div class="mr-3">
                    <img
                      class="object-fill w-10 p-1"
                      src="~/assets/img/hotel-bell.svg"
                    />
                  </div>
                  <div>
                    <div class="text-xs text-left">ALLER AU</div>
                    <div class="-mt-1 font-sans font-semibold lg:text-xl">
                      LOBBIES
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  class="flex items-center justify-center w-full p-3 mx-2 mt-3 text-white transform scale-100 bg-indigo-800 rounded-lg shadow-xl lg:w-48 hover:bg-indigo-600 hover:scale-105 h-14"
                  @click="openSelectPopup = true"
                >
                  <div class="mr-3">
                    <img
                      class="object-fill w-10 p-1"
                      src="~/assets/img/play-button.svg"
                    />
                  </div>
                  <div>
                    <div class="text-xs text-left">CATEGORIE</div>
                    <div class="-mt-1 font-sans font-semibold lg:text-xl">
                      ALEATOIRE
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div
              class="w-full h-full p-2 p-5 overflow-y-auto bg-indigo-900 rounded-md shadow-xl h-1/2 lg:h-5/6 lg:w-1/2"
            >
              <div class="sticky w-full px-4 my-2">
                <input
                  v-model="searchQuery"
                  type="search"
                  class="w-full p-3 text-center text-white bg-indigo-800 border-0 shadow-2xl lg:text-2xl rounded-xl focus:outline-none"
                  placeholder="Rechercher une categorie"
                />
              </div>
              <div class="w-full h-full">
                <GameCard
                  v-for="(theme, index) in resultQuery"
                  :key="index"
                  :label="theme.name"
                ></GameCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <vue-final-modal
      v-model="openSelectPopup"
      :ssr="true"
      :classes="['glasso', 'modal-container']"
      content-class="modal-content"
    >
      <div class="flex flex-col items-center">
        <img
          class="object-fill w-8 h-8 lg:h-15 lg:w-15 animate-bounce"
          src="~/assets/img/mental-health.svg"
        />
        <p class="my-2 text-center">
          Mets ton contenu de popup ici Nassim. Mdrr essaie de respecter le
          style de design. j'ai commencé avec les boutons pour toi
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-center mt-2">
        <button
          type="button"
          class="flex items-center justify-center w-full p-3 mx-2 mt-3 text-white transform scale-100 bg-indigo-800 rounded-lg shadow-xl lg:w-48 hover:bg-indigo-600 hover:scale-105 h-14"
        >
          <div class="mr-3">
            <img class="object-fill w-10 p-1" src="~/assets/img/bulb.svg" />
          </div>
          <div>
            <div class="text-xs text-left">MODE</div>
            <div class="-mt-1 font-sans font-semibold lg:text-xl">NORMAL</div>
          </div>
        </button>
        <button
          type="button"
          class="flex items-center justify-center w-full p-3 mx-2 mt-3 text-white transform scale-100 bg-indigo-800 rounded-lg shadow-xl lg:w-48 hover:bg-indigo-600 hover:scale-105 h-14"
        >
          <div class="mr-3">
            <img class="object-fill w-10 p-1" src="~/assets/img/deadline.svg" />
          </div>
          <div>
            <div class="text-xs text-left">MODE</div>
            <div class="-mt-1 font-sans font-semibold lg:text-xl">CHRONO</div>
          </div>
        </button>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      fetchedThemes: [],
      openSelectPopup: false,
    }
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.fetchedThemes.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(' ')
            .every((v) => item.name.toLowerCase().includes(v))
        })
      } else {
        return this.fetchedThemes
      }
    },
  },
  mounted() {
    this.fetchThemes()
  },
  methods: {
    // Recuperation des theme à partir de l'API
    async fetchThemes() {
      try {
        const json = await this.$axios.get(
          'https://enigmatic-stream-69193.herokuapp.com/categories'
        )
        // On recupere les themes
        this.fetchedThemes = json.data
        // On reformatte le nom de chaque theme pour l'inserer dans la liste des suggestions de la barre de recherche
        this.fetchedThemes.forEach((theme) => {
          this.searchSuggestions.push(this.format(theme.name))
        })
        // On récupere 15 thèmes à la une
      } catch (err) {
        console.log(err)
      }
    },
    // Deconnexion
    async signOut() {
      try {
        // On vérifie si l'utilisateur est connecté en tant qu'anonyme
        if (!this.$fire.auth.currentUser.isAnonymous) {
          // Sinon, on le deconnecte
          await this.$fire.auth.signOut()
        } else {
          // Si oui, on supprime le compte
          this.$fire.auth.currentUser.delete()
        }
        // On redirige vers la page de connexion
        this.$router.push('/login')
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.speech-bubble {
  position: relative;
  background: #28585c;
  border-radius: 0.4em;
}

.speech-bubble:after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 56px solid transparent;
  border-right-color: #28585c;
  border-left: 0;
  border-top: 0;
  margin-top: -28px;
  margin-left: -56px;
}
</style>
