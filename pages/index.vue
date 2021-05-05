<template>
  <div>
    <section class="flex flex-col min-h-screen">
      <div class="flex flex-1 items-center justify-center">
        <div
          class="bg-white bg-gradient-to-b h-full from-red-400 via-red-200 via-gray-100 via-gray-300 to-red-400 border-0 text-center w-full"
        >
          <!-- Navbar -->
          <nav
            class="bg-white border-solid flex flex-wrap border-1 py-4 shadow-2xl justify-between lg:px-12"
          >
            <div
              class="border-solid flex border-0 w-full px-2 pb-5 left-0 justify-between sm:pr-2 sm:pl-6 lg:border-b-0 lg:w-auto lg:pb-0"
            >
              <div
                class="flex mr-auto flex-shrink-0 text-gray-800 items-center"
              >
                <img
                  class="object-fill h-10 w-10 md:h-15 md:w-15"
                  src="~/assets/img/logo.svg"
                />
                <span
                  class="font-bold text-base ml-6 tracking-tight md:text-2xl"
                >
                  usvQuiz
                </span>
              </div>

              <!-- Avatar (mobile) -->
              <div class="flex space-x-2 items-center">
                <span
                  class="font-bold font-mono text-xs tracking-tight pl-10 text-gray-500 sm:flex sm:text-sm lg:hidden"
                >
                  {{ $fire.auth.currentUser.displayName }}
                </span>
                <div class="border-0 group lg:hidden">
                  <button
                    class="bg-white rounded-sm flex outline-none border-0 items-center focus:outline-none"
                  >
                    <img
                      class="rounded-lg border-gray-500 border-2 h-8 w-8 md:h-13 md:w-13"
                      :src="
                        'https://avatars.dicebear.com/api/male/' +
                        $fire.auth.currentUser.displayName +
                        '.svg'
                      "
                    />
                  </button>
                  <ul
                    class="bg-white border-0 transform origin-top transition ease-in-out w-7 scale-0 duration-150 absolute md:w-12 group-hover:scale-100"
                  >
                    <li class="rounded-md border-1 border-red-400 h-5 w-full">
                      <input
                        id="image"
                        class="h-full object-cover w-full"
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
              class="flex space-x-2 flex-shrink-0 items-center hidden lg:flex"
            >
              <span class="font-bold tracking-tight pl-10 text-gray-500">
                {{ $fire.auth.currentUser.displayName }}
              </span>
              <div class="border-0 group">
                <button
                  class="bg-white rounded-sm flex outline-none border-0 min-w-13 items-center focus:outline-none"
                >
                  <img
                    class="rounded-lg border-gray-500 border-2 h-13 w-13"
                    :src="
                      'https://avatars.dicebear.com/api/male/' +
                      $fire.auth.currentUser.displayName +
                      '.svg'
                    "
                  />
                </button>
                <ul
                  class="bg-white border-0 min-w-13 transform origin-top transition ease-in-out w-10 scale-0 duration-150 absolute group-hover:scale-100"
                >
                  <li class="rounded-md border-1 border-red-400 h-8 w-full">
                    <input
                      id="image"
                      class="h-full object-cover w-full"
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
          <div class="bg-white min-h-full my-0 block justify-center">
            <!--Search Bar -->
            <div class="p-8">
              <div
                class="flex mx-auto bg-gray-100 rounded-2xl shadow-lg w-2/3 items-center md:rounded-full lg:w-1/3"
              >
                <v-select
                  id="search"
                  :options="searchSuggestions"
                  class="bg-gray-100 border-0 rounded-l-2xl leading-tight w-full py-4 px-6 text-gray-700 md:rounded-l-full focus:outline-none"
                  label="theme"
                  type="text"
                  placeholder="Chercher un thème..."
                >
                </v-select>
                <div class="p-4">
                  <button
                    class="rounded-full flex bg-red-400 h-8 text-white p-2 w-8 items-center justify-center md:h-12 md:w-12 hover:bg-red-500 focus:outline-none"
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
            <div class="mx-auto mb-5 w-full lg:w-5/6">
              <h1
                class="font-bold font-mono text-base mb-3 left-0 static md:text-4xl md:w-max-100"
              >
                Thèmes à la une
              </h1>
              <div class="relative items-center justify-center">
                <!-- All Themes Container -->
                <div class="container my-auto mx-auto items-center lg:flex">
                  <!-- Theme 1 -->
                  <div
                    class="bg-white rounded-lg shadow-md my-12 mx-8 lg:m-4 hover:bg-gray-100 hover:shadow-lg"
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
                        class="font-medium my-2 text-lg text-gray-600 uppercase"
                      >
                        {{ popularThemes[0] }}
                      </h3>
                      <div class="border-0 mt-5 group">
                        <button
                          type="submit"
                          class="rounded-full font-semibold bg-red-400 text-white py-2 px-3 hover:bg-red-600 hover:text-white"
                          @click="soloPopup(popularThemes[0])"
                        >
                          Jouer en solo
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- Theme 2 -->
                  <div
                    class="bg-white rounded-lg shadow-md my-12 mx-8 lg:m-4 hover:bg-gray-100 hover:shadow-lg"
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
                        class="font-medium my-2 text-lg text-gray-600 uppercase"
                      >
                        {{ popularThemes[1] }}
                      </h3>
                      <div class="mt-5">
                        <button
                          type="submit"
                          class="rounded-full font-semibold bg-red-400 text-white py-2 px-3 hover:bg-red-600 hover:text-white"
                          @click="soloPopup(popularThemes[1])"
                        >
                          Jouer en solo
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- Theme 3 -->
                  <div
                    class="bg-white rounded-lg shadow-md my-12 mx-8 lg:m-4 hover:bg-gray-100 hover:shadow-lg"
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
                        class="font-medium my-2 text-lg text-gray-600 uppercase"
                      >
                        {{ popularThemes[2] }}
                      </h3>
                      <div class="mt-5">
                        <button
                          type="submit"
                          class="rounded-full font-semibold bg-red-400 text-white py-2 px-3 hover:bg-red-600 hover:text-white"
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
                class="font-bold font-mono text-left text-l mb-3 w-max-screen md:text-4xl lg:w-max-200"
              >
                Historique des parties
              </h1>
              <div class="bg-white rounded shadow-md">
                <table
                  class="max-w-sm shadow-2xl table-fixed md:max-w-full md:w-full md:table-auto"
                >
                  <tbody class="font-light text-sm w-full text-gray-600">
                    <tr
                      v-for="(game, idx) in gamesHistory"
                      :key="idx"
                      class="border-b border-gray-200 h-40 w-full hover:bg-red-400"
                    >
                      <td
                        class="text-left py-1 px-1 whitespace-nowrap md:py-3 md:px-6"
                      >
                        <div class="flex items-center">
                          <span class="font-medium">{{ game.date }}</span>
                        </div>
                      </td>
                      <td class="text-left py-1 px-1 md:py-3 md:px-6">
                        <div class="flex items-center">
                          <span>{{ game.theme }}</span>
                        </div>
                      </td>
                      <td class="text-center py-1 px-1 md:py-3 md:px-6">
                        <span
                          class="rounded-full bg-red-200 text-xs py-1 px-3 text-gray-800"
                        >
                          {{ game.type }}
                        </span>
                      </td>
                      <td class="text-center py-1 px-1 md:py-3 md:px-6">
                        <div class="flex font-bold item-center justify-center">
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
            class="flex h-full w-full top-0 left-0 modal fixed items-center justify-center"
          >
            <div
              class="h-full bg-gray-900 w-full opacity-50 modal-overlay absolute"
            ></div>
            <div
              class="bg-white rounded mx-auto shadow-lg w-11/12 z-50 modal-container overflow-y-auto md:max-w-md"
            >
              <div
                class="bg-gray-100 border-3 border-gray-600 px-4 pt-2 pb-5 modal-content rouned-xl block"
              >
                <!-- Bouton retour au menu -->
                <div class="h-8 w-full">
                  <button
                    type="submit"
                    class="border rounded-full font-bold bg-red-400 text-white text-center text-lg w-7 float-right hover:bg-red-600 focus:outline-none"
                    @click="optionsPopup = false"
                  >
                    »
                  </button>
                </div>
                <!-- Game mode -->
                <fieldset class="flex p-4 items-center justify-between">
                  <div class="m-auto block">
                    <legend class="font-bold mb-2 block">
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
                      class="rounded-l cursor-pointer font-semibold bg-gray-300 py-2 px-4 text-gray-800 hover:bg-red-200"
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
                      class="rounded-r cursor-pointer font-semibold bg-gray-300 py-2 px-4 text-gray-800 hover:bg-red-200"
                      for="timed"
                    >
                      Chrono
                    </label>
                  </div>
                </fieldset>
                <div class="flex mt-5 text-center items-center">
                  <button
                    type="submit"
                    class="rounded-full font-semibold m-auto bg-red-400 text-white py-2 px-3 w-1/3 hover:bg-red-600 hover:text-white"
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
