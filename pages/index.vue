<template>
  <div>
    <section class="flex flex-col min-h-screen">
      <div class="flex items-center justify-center flex-1">
        <div
          class="w-full h-full text-center bg-white border-0 bg-gradient-to-b from-red-400 via-red-200 via-gray-100 via-gray-300 via-red-200 via-gray-100 to-red-400"
        >
          <!-- Navbar -->
          <nav
            class="flex justify-between flex-wrap bg-white py-4 lg:px-12 shadow-2xl border-solid border-1"
          >
            <div
              class="left-0 flex justify-between lg:w-auto w-full lg:border-b-0 px-2 sm:pl-6 sm:pr-2 border-solid border-0 pb-5 lg:pb-0"
            >
              <div
                class="flex items-center flex-shrink-0 text-gray-800 mr-auto"
              >
                <img
                  class="object-fill h-10 w-10 md:h-15 md:w-15"
                  src="~/assets/img/question-mark.png"
                />
                <span
                  class="font-semibold text-base font-mono md:text-2xl tracking-tight"
                >
                  QuizUp
                </span>
              </div>
              <!-- Avatar (mobile) -->
              <div class="flex items-center space-x-2">
                <span
                  class="text-gray-500 font-bold font-mono pl-10 tracking-tight text-xs sm:text-sm sm:flex lg:hidden"
                >
                  {{ $fire.auth.currentUser.displayName }}
                </span>
                <div class="group border-0 lg:hidden">
                  <button
                    class="outline-none focus:outline-none bg-white border-0 rounded-sm flex items-center"
                  >
                    <img
                      class="border-gray-500 border-2 rounded-lg h-8 w-8 md:h-13 md:w-13"
                      :src="
                        'https://avatars.dicebear.com/api/male/' +
                        $fire.auth.currentUser.displayName +
                        '.svg'
                      "
                    />
                  </button>
                  <ul
                    class="w-7 md:w-12 bg-white border-0 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top"
                  >
                    <li class="w-full h-5 border-1 rounded-md border-red-400">
                      <input
                        id="image"
                        class="object-cover h-full w-full"
                        type="image"
                        alt="Logout"
                        src="exit.png"
                        @click="signOut"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- Avatar -->
            <div
              class="flex items-center flex-shrink-0 hidden lg:flex space-x-2"
            >
              <span class="text-gray-500 font-bold pl-10 tracking-tight">
                {{ $fire.auth.currentUser.displayName }}
              </span>
              <div class="group border-0">
                <button
                  class="outline-none focus:outline-none bg-white border-0 rounded-sm flex items-center min-w-13"
                >
                  <img
                    class="border-gray-500 border-2 rounded-lg h-13 w-13"
                    :src="
                      'https://avatars.dicebear.com/api/male/' +
                      $fire.auth.currentUser.displayName +
                      '.svg'
                    "
                  />
                </button>
                <ul
                  class="w-10 bg-white border-0 transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-13"
                >
                  <li class="w-full h-8 border-1 rounded-md border-red-400">
                    <input
                      id="image"
                      class="object-cover h-full w-full"
                      type="image"
                      alt="Logout"
                      src="exit.png"
                      @click="signOut"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div class="block justify-center min-h-full bg-white md:mx-20 my-0">
            <!--Search Bar -->
            <div class="p-8">
              <div
                class="bg-gray-100 flex items-center rounded-2xl md:rounded-full shadow-lg w-2/3 lg:w-1/3 mx-auto"
              >
                <v-select
                  id="search"
                  :options="searchSuggestions"
                  class="bg-gray-100 border-0 rounded-l-2xl md:rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
                  label="theme"
                  type="text"
                  placeholder="Chercher un thème..."
                >
                </v-select>
                <div class="p-4">
                  <button
                    class="bg-red-400 text-white rounded-full p-2 hover:bg-red-500 focus:outline-none h-8 w-8 md:w-12 md:h-12 flex items-center justify-center"
                  >
                    <img
                      class="object-fill h-3 w-3 md:h-7 md:w-7"
                      src="~/assets/img/search.png"
                    />
                  </button>
                </div>
              </div>
            </div>
            <!-- Themes -->
            <div class="mx-auto w-full lg:w-5/6 mb-5">
              <h1
                class="static left-0 text-base md:w-max-100 font-bold font-mono md:text-4xl mb-3"
              >
                Thèmes à la une
              </h1>
              <div class="relative items-center justify-center">
                <!-- All Themes Container -->
                <div class="lg:flex items-center container mx-auto my-auto">
                  <!-- Theme 1 -->
                  <div
                    class="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8"
                  >
                    <!-- Theme Image -->
                    <img
                      src="https://picsum.photos/id/29/2106/1404"
                      alt=""
                      class="overflow-hidden"
                    />
                    <!-- Theme Content -->
                    <div class="p-4">
                      <h3
                        class="font-medium text-gray-600 text-lg my-2 uppercase"
                      >
                        {{ popularThemes[0] }}
                      </h3>
                      <div class="group border-0 mt-5">
                        <button
                          type="submit"
                          class="hover:bg-red-600 rounded-full py-2 px-3 font-semibold hover:text-white bg-red-400 text-white"
                          @click="soloPopup(popularThemes[0])"
                        >
                          Jouer en solo
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- Theme 2 -->
                  <div
                    class="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8"
                  >
                    <!-- Theme Image -->
                    <img
                      src="https://picsum.photos/id/247/2106/1404"
                      alt=""
                      class="overflow-hidden"
                    />
                    <!-- Theme Content -->
                    <div class="p-4">
                      <h3
                        class="font-medium text-gray-600 text-lg my-2 uppercase"
                      >
                        {{ popularThemes[1] }}
                      </h3>
                      <div class="mt-5">
                        <button
                          type="submit"
                          class="hover:bg-red-600 rounded-full py-2 px-3 font-semibold hover:text-white bg-red-400 text-white"
                          @click="soloPopup(popularThemes[1])"
                        >
                          Jouer en solo
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- Theme 3 -->
                  <div
                    class="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8"
                  >
                    <!-- Theme Image -->
                    <img
                      src="https://picsum.photos/id/342/2106/1404"
                      alt=""
                      class="overflow-hidden"
                    />
                    <!-- Theme Content -->
                    <div class="p-4">
                      <h3
                        class="font-medium text-gray-600 text-lg my-2 uppercase"
                      >
                        {{ popularThemes[2] }}
                      </h3>
                      <div class="mt-5">
                        <button
                          type="submit"
                          class="hover:bg-red-600 rounded-full py-2 px-3 font-semibold hover:text-white bg-red-400 text-white"
                          @click="soloPopup(popularThemes[2])"
                        >
                          Jouer en solo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Game history -->
            <div
              v-if="!$fire.auth.currentUser.isAnonymous"
              class="mx-auto w-full lg:w-5/6"
            >
              <h1
                class="text-left w-max-screen lg:w-max-200 font-bold font-mono text-l md:text-4xl mb-3"
              >
                Historique des parties
              </h1>
              <div class="bg-white shadow-md rounded">
                <table
                  class="max-w-sm md:w-full md:max-w-full table-fixed md:table-auto shadow-2xl"
                >
                  <tbody class="w-full text-gray-600 text-sm font-light">
                    <tr
                      v-for="(game, idx) in gamesHistory"
                      :key="idx"
                      class="w-full h-40 border-b border-gray-200 hover:bg-red-400"
                    >
                      <td
                        class="px-1 py-1 md:px-6 md:py-3 text-left whitespace-nowrap"
                      >
                        <div class="flex items-center">
                          <span class="font-medium">{{ game.date }}</span>
                        </div>
                      </td>
                      <td class="px-1 py-1 md:px-6 md:py-3 text-left">
                        <div class="flex items-center">
                          <span>{{ game.theme }}</span>
                        </div>
                      </td>
                      <td class="px-1 py-1 md:px-6 md:py-3 text-center">
                        <span
                          class="bg-red-200 text-gray-800 py-1 px-3 rounded-full text-xs"
                        >
                          {{ game.type }}
                        </span>
                      </td>
                      <td class="px-1 py-1 md:px-6 md:py-3 text-center">
                        <div class="flex item-center justify-center font-bold">
                          {{ game.score }} pts
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <footer class="bg-white mt-5 opacity-0"><h1>Footer</h1></footer>
            </div>
          </div>
        </div>
        <!-- Popup -->
        <template v-if="optionsPopup">
          <div
            class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center"
          >
            <div
              class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
            ></div>
            <div
              class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
            >
              <div
                class="bg-gray-100 modal-content border-3 border-gray-600 rouned-xl block pt-2 pb-5 px-4"
              >
                <!-- Bouton retour au menu -->
                <div class="w-full h-8">
                  <button
                    type="submit"
                    class="bg-red-400 float-right hover:bg-red-600 text-white text-center text-lg font-bold w-7 border rounded-full focus:outline-none"
                    @click="optionsPopup = false"
                  >
                    »
                  </button>
                </div>
                <!-- Game mode -->
                <fieldset class="flex items-center justify-between p-4">
                  <div class="block m-auto">
                    <legend class="block font-bold mb-2">
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
                      class="bg-gray-300 hover:bg-red-200 text-gray-800 font-semibold py-2 px-4 cursor-pointer rounded-l"
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
                      class="bg-gray-300 hover:bg-red-200 text-gray-800 font-semibold py-2 px-4 cursor-pointer rounded-r"
                      for="timed"
                    >
                      Chrono
                    </label>
                  </div>
                </fieldset>
                <div class="text-center flex items-center mt-5">
                  <button
                    type="submit"
                    class="hover:bg-red-600 w-1/3 m-auto rounded-full py-2 px-3 font-semibold hover:text-white bg-red-400 text-white"
                    @click="playSolo"
                  >
                    Jouer »
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
