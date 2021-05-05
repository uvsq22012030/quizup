<template>
  <div>
    <section class="flex flex-col min-h-screen">
      <div class="w-full h-full text-center bg-white border-0">
        <!-- Navbar -->
        <nav class="flex justify-between py-4 shadow-2xl lg:px-12">
          <div
            class="left-0 flex justify-between w-full px-2 pb-5 sm:pr-2 sm:pl-6 lg:w-auto lg:pb-0"
          >
            <div class="flex items-center flex-shrink-0 mr-auto text-gray-800">
              <img
                class="object-fill w-10 h-10 md:h-15 md:w-15"
                src="~/assets/img/logo.svg"
              />
              <span class="ml-6 text-base font-bold tracking-tight md:text-2xl">
                usvQuiz
              </span>
            </div>
          </div>

          <div
            class="flex items-center w-1/3 mx-auto shadow-lg rounded-2xl md:rounded-full"
          >
            <v-select
              id="search"
              :options="searchSuggestions"
              class="w-full px-6 py-2 leading-tight text-gray-700 border-0 rounded-l-2xl md:rounded-l-full focus:outline-none"
              label="theme"
              type="text"
              placeholder="Chercher un thème..."
            >
            </v-select>
            <div class="p-4">
              <button
                class="flex items-center justify-center w-10 h-10 p-2 text-white bg-red-400 rounded-full md:h-12 md:w-12 hover:bg-red-500 focus:outline-none"
              >
                <img
                  class="object-fill w-10 h-10"
                  src="~/assets/img/play-button.svg"
                />
              </button>
            </div>
          </div>

          <!-- Avatar -->
          <div class="flex items-center flex-shrink-0 hidden space-x-2 lg:flex">
            <span class="pl-10 font-bold tracking-tight text-gray-500">
              {{ $fire.auth.currentUser.displayName }}
            </span>
            <div class="border-0 group">
              <button
                class="flex items-center bg-white border-0 rounded-sm outline-none min-w-13 focus:outline-none"
              >
                <img
                  class="border-2 border-gray-500 rounded-lg h-13 w-13"
                  :src="
                    'https://avatars.dicebear.com/api/male/' +
                    $fire.auth.currentUser.displayName +
                    '.svg'
                  "
                />
              </button>
              <ul
                class="absolute transition duration-150 ease-in-out transform scale-0 bg-white border-0 origin-x min-w-13 group-hover:scale-100"
              >
                <li
                  class="w-full h-8 p-5 border-red-400 rounded-md border-1"
                  @click="signOut"
                >
                  Deconnexion
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div class="justify-center block min-h-full my-0">
          <!--Search Bar -->
          <!-- Themes -->

          <div class="w-full mx-auto my-25">
            <div class="inline-block mt-2 mr-2">
              <button
                type="button"
                class="focus:outline-none text-white text-sm py-2.5 px-5 border-b-4 border-red-600 rounded-md bg-red-500 hover:bg-red-400"
              >
                VOIR LES LOBBIES
              </button>
            </div>
            <div class="flex pb-20 overflow-x-scroll hide-scroll-bar">
              <div class="flex ml-10 flex-nowrap lg:ml-40 md:ml-20">
                <GameCard
                  v-for="(theme, index) in fetchedThemes"
                  :key="index"
                  :label="theme.name"
                ></GameCard>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Popup -->
      <template v-if="optionsPopup">
        <div
          class="fixed top-0 left-0 flex items-center justify-center w-full h-full modal"
        >
          <div
            class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
          ></div>
          <div
            class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
          >
            <div
              class="block px-4 pt-2 pb-5 bg-gray-100 border-gray-600 border-3 modal-content rouned-xl"
            >
              <!-- Bouton retour au menu -->
              <div class="w-full h-8">
                <button
                  type="submit"
                  class="float-right text-lg font-bold text-center text-white bg-red-400 border rounded-full w-7 hover:bg-red-600 focus:outline-none"
                  @click="optionsPopup = false"
                >
                  »
                </button>
              </div>
              <!-- Game mode -->
              <fieldset class="flex items-center justify-between p-4">
                <div class="block m-auto">
                  <legend class="block mb-2 font-bold">
                    Choisir le mode de jeu :
                  </legend>
                  <input
                    id="normal"
                    v-model="gameMode"
                    :value="false"
                    class="hidden"
                    type="radio"
                    checked
                  />
                  <label
                    class="px-4 py-2 font-semibold text-gray-800 bg-gray-300 rounded-l cursor-pointer hover:bg-red-200"
                    for="normal"
                  >
                    Normal
                  </label>
                  <input
                    id="timed"
                    v-model="gameMode"
                    :value="true"
                    class="hidden"
                    type="radio"
                  />
                  <label
                    class="px-4 py-2 font-semibold text-gray-800 bg-gray-300 rounded-r cursor-pointer hover:bg-red-200"
                    for="timed"
                  >
                    Chrono
                  </label>
                </div>
              </fieldset>
              <div class="flex items-center mt-5 text-center">
                <button
                  type="submit"
                  class="w-1/3 px-3 py-2 m-auto font-semibold text-white bg-red-400 rounded-full hover:bg-red-600 hover:text-white"
                  @click="playSolo"
                >
                  Jouer »
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchSuggestions: [],
      optionsPopup: false,
      gameMode: false,
      chosenTheme: null,
      fetchedThemes: [],
      popularThemes: [],
      themeIdDictionary: {},
      historyRef: null,
      gamesHistory: [],
    }
  },
  created() {
    // On recupere les theme de l'API
    this.fetchThemes()
    // On recupere l'historique si l'utilisateur n'est pas anonyme
    if (!this.$fire.auth.currentUser.isAnonymous) {
      // On recupere la reference de l'historique dans la base de données
      this.historyRef = this.$fire.database.ref(
        'history/' + this.$fire.auth.currentUser.uid
      )
      // Ajout d'un ecouteur d'evenement pour récuperer l'historique
      this.historyRef.on('child_added', (snapshot) =>
        this.gamesHistory.push({ ...snapshot.val(), id: snapshot.key })
      )
    }
  },
  methods: {
    // Methode qui formatte le nom d'un thème pour l'affichage
    format(themeName) {
      return (
        themeName[0].toUpperCase() + themeName.slice(1).replaceAll('_', ' ')
      )
    },

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
        const randomNumbers = []
        for (let i = 0; i < 15; i++) {
          let random = Math.floor(Math.random() * this.fetchedThemes.length)
          while (randomNumbers.includes(random))
            random = Math.floor(Math.random() * this.fetchedThemes.length)
          randomNumbers.push(random)
          const formattedName = this.format(this.fetchedThemes[random].name)
          this.popularThemes.push(formattedName)
          this.themeIdDictionary[formattedName] = this.fetchedThemes[random].id
        }
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

    // Affichage du menu d'options de partie
    async soloPopup(themeName) {
      // Recuperation du nom du theme
      this.themeName = themeName
      // On récupere l'id du theme choisi
      this.chosenTheme = await this.$axios.get(
        'https://enigmatic-stream-69193.herokuapp.com/categories/' +
          String(this.themeIdDictionary[themeName])
      )
      // On affiche le menu d'options de partie
      this.optionsPopup = true
    },
    // Lancement du jeu solo
    playSolo(e) {
      e.preventDefault()
      // On redirige vers la page de jeu en envoyant le json correspondant
      this.$router.push({
        name: 'game',
        params: {
          theme: this.chosenTheme.data,
          themeName: this.themeName,
          isTimed: this.gameMode,
        },
      })
    },
  },
}
</script>

<style>
input:checked + label {
  background-color: #fc8181;
  color: white;
}
th,
td {
  word-wrap: break-word;
}
</style>
