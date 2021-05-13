<template>
  <div>
    <section class="flex flex-col min-h-screen">
      <div class="flex items-center justify-center flex-1">
        <div
          class="w-full h-full text-center bg-white border-0 bg-gradient-to-b from-red-400 via-red-200 via-gray-100 via-gray-300 to-red-400"
        >
          <!-- Navbar -->
          <nav
            class="flex flex-wrap justify-between py-4 bg-white border-solid shadow-2xl border-1 lg:px-12"
          >
            <div
              class="left-0 flex justify-between w-full px-2 pb-5 border-0 border-solid sm:pr-2 sm:pl-6 lg:border-b-0 lg:w-auto lg:pb-0"
            >
              <div
                class="flex items-center flex-shrink-0 mr-auto text-gray-800"
              >
                <img
                  class="object-fill w-10 h-10 md:h-15 md:w-15"
                  src="~/assets/img/logo.svg"
                />
                <span
                  class="ml-6 text-base font-bold tracking-tight md:text-2xl"
                >
                  usvQuiz
                </span>
              </div>

              <!-- Avatar (mobile) -->
              <div class="flex items-center space-x-2">
                <span
                  class="pl-10 font-mono text-xs font-bold tracking-tight text-gray-500 sm:flex sm:text-sm lg:hidden"
                >
                  {{ $fire.auth.currentUser.displayName }}
                </span>
                <div class="border-0 group lg:hidden">
                  <button
                    class="flex items-center bg-white border-0 rounded-sm outline-none focus:outline-none"
                  >
                    <img
                      class="w-8 h-8 border-2 border-gray-500 rounded-lg md:h-13 md:w-13"
                      :src="
                        'https://avatars.dicebear.com/api/avataaars/' +
                        $fire.auth.currentUser.displayName +
                        '.svg'
                      "
                    />
                  </button>
                  <ul
                    class="absolute transition duration-150 ease-in-out origin-top transform scale-0 bg-white border-0 w-7 md:w-12 group-hover:scale-100"
                  >
                    <li class="w-full h-5 border-red-400 rounded-md border-1">
                      <input
                        id="image"
                        class="object-cover w-full h-full"
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
              class="flex items-center flex-shrink-0 hidden space-x-2 lg:flex"
            >
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
                      'https://avatars.dicebear.com/api/avataaars/' +
                      $fire.auth.currentUser.displayName +
                      '.svg'
                    "
                  />
                </button>
                <ul
                  class="absolute w-10 transition duration-150 ease-in-out origin-top transform scale-0 bg-white border-0 min-w-13 group-hover:scale-100"
                >
                  <li class="w-full h-8 border-red-400 rounded-md border-1">
                    <input
                      id="image"
                      class="object-cover w-full h-full"
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
          <div class="justify-center block min-h-full my-0 bg-white">
            <!--Search Bar -->
            <div class="p-8">
              <div
                class="flex items-center w-2/3 mx-auto bg-gray-100 shadow-lg rounded-2xl md:rounded-full lg:w-1/3"
              >
                <v-select
                  id="search"
                  v-model="selectedTheme"
                  :options="searchSuggestions"
                  class="w-full px-6 py-4 leading-tight text-gray-700 bg-gray-100 border-0 rounded-l-2xl md:rounded-l-full focus:outline-none"
                  label="theme"
                  type="text"
                  placeholder="Chercher un thème..."
                >
                </v-select>
                <div class="p-4">
                  <button
                    class="flex items-center justify-center w-8 h-8 p-2 text-white bg-red-400 rounded-full hover:bg-red-500 focus:outline-none md:w-12 md:h-12"
                    @click="soloPopup(selectedTheme)"
                  >
                    <img
                      class="object-fill w-3 h-3 md:h-7 md:w-7"
                      src="~/assets/img/search.png"
                    />
                  </button>
                </div>
              </div>
            </div>
            <!-- Themes -->
            <div class="w-full mx-auto mb-5 lg:w-5/6">
              <h1
                class="static left-0 mb-3 font-mono text-base font-bold md:text-4xl md:w-max-100"
              >
                Thèmes à la une
              </h1>
              <div class="relative items-center justify-center">
                <!-- All Themes Container -->
                <div class="container items-center mx-auto my-auto lg:flex">
                  <!-- Theme 1 -->
                  <div
                    class="mx-8 my-12 bg-white rounded-lg shadow-md lg:m-4 hover:bg-gray-100 hover:shadow-lg"
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
                        class="my-2 text-lg font-medium text-gray-600 uppercase"
                      >
                        {{ popularThemes[0] }}
                      </h3>
                      <div class="mt-5 border-0 group">
                        <button
                          type="submit"
                          class="px-3 py-2 font-semibold text-white bg-red-400 rounded-full hover:bg-red-600 hover:text-white"
                          @click="soloPopup(popularThemes[0])"
                        >
                          Jouer en solo
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- Theme 2 -->
                  <div
                    class="mx-8 my-12 bg-white rounded-lg shadow-md lg:m-4 hover:bg-gray-100 hover:shadow-lg"
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
                        class="my-2 text-lg font-medium text-gray-600 uppercase"
                      >
                        {{ popularThemes[1] }}
                      </h3>
                      <div class="mt-5">
                        <button
                          type="submit"
                          class="px-3 py-2 font-semibold text-white bg-red-400 rounded-full hover:bg-red-600 hover:text-white"
                          @click="soloPopup(popularThemes[1])"
                        >
                          Jouer en solo
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- Theme 3 -->
                  <div
                    class="mx-8 my-12 bg-white rounded-lg shadow-md lg:m-4 hover:bg-gray-100 hover:shadow-lg"
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
                        class="my-2 text-lg font-medium text-gray-600 uppercase"
                      >
                        {{ popularThemes[2] }}
                      </h3>
                      <div class="mt-5">
                        <button
                          type="submit"
                          class="px-3 py-2 font-semibold text-white bg-red-400 rounded-full hover:bg-red-600 hover:text-white"
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
            <div>
              <button
                type="submit"
                class="px-3 py-2 font-semibold text-white bg-red-400 rounded-full hover:bg-red-600 hover:text-white"
                @click="browseLobbies()"
              >
                Parcourir les lobbies
              </button>
            </div>
            <!-- Game history -->
            <div
              v-if="!$fire.auth.currentUser.isAnonymous"
              class="w-full mx-auto lg:w-5/6"
            >
              <h1
                class="mb-3 font-mono font-bold text-left text-l w-max-screen md:text-4xl lg:w-max-200"
              >
                Historique des parties
              </h1>
              <div class="bg-white rounded shadow-md">
                <table
                  class="max-w-sm shadow-2xl table-fixed md:max-w-full md:w-full md:table-auto"
                >
                  <tbody class="w-full text-sm font-light text-gray-600">
                    <tr
                      v-for="(game, idx) in gamesHistory"
                      :key="idx"
                      class="w-full h-40 border-b border-gray-200 hover:bg-red-400"
                    >
                      <td
                        class="px-1 py-1 text-left whitespace-nowrap md:py-3 md:px-6"
                      >
                        <div class="flex items-center">
                          <span class="font-medium">{{ game.date }}</span>
                        </div>
                      </td>
                      <td class="px-1 py-1 text-left md:py-3 md:px-6">
                        <div class="flex items-center">
                          <span>{{ game.theme }}</span>
                        </div>
                      </td>
                      <td class="px-1 py-1 text-center md:py-3 md:px-6">
                        <span
                          class="px-3 py-1 text-xs text-gray-800 bg-red-200 rounded-full"
                        >
                          {{ game.type }}
                        </span>
                      </td>
                      <td class="px-1 py-1 text-center md:py-3 md:px-6">
                        <div class="flex justify-center font-bold item-center">
                          {{ game.score }} pts
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <footer class="mt-5 bg-white opacity-0"><h1>Footer</h1></footer>
            </div>
          </div>
        </div>
        <!-- Solo popup -->
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
      selectedTheme: null,
      lobbiesRef: null,
      searchingForMatch: false,
    }
  },
  created() {
    // On recupere les theme de l'API
    this.fetchThemes()
    // On recupere la reference des lobbies dans la base de données
    this.lobbiesRef = this.$fire.database.ref('lobbies/')
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
    // Methode qui redirige vers la page des lobbies
    browseLobbies() {
      this.$router.push('/lobby')
    },
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
          const formattedName = this.format(theme.name)
          this.themeIdDictionary[formattedName] = theme.id
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
      if (!themeName) {
        alert('Selectionner un theme !')
        return
      }
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
    // Creation du lobby pour le matchmaking
    async createLobby(themeName, queueId) {
      // On recupere le theme
      let fetchedQuestions = await this.$axios.get(
        'https://enigmatic-stream-69193.herokuapp.com/categories/' +
          String(this.themeIdDictionary[themeName])
      )
      // On prend 10 questions au hasard parmis les 30
      fetchedQuestions = this.shuffleJsonArray(
        fetchedQuestions.data.questions
      ).slice(0, 10)
      // Informations du lobby
      const lobbyInfo = {
        creator: {
          name: this.$fire.auth.currentUser.displayName,
          uid: this.$fire.auth.currentUser.uid,
        },
        theme: {
          name: themeName,
          id: this.themeIdDictionary[themeName],
        },
        state: 'matchmaking',
        players: [
          {
            name: this.$fire.auth.currentUser.displayName,
            uid: this.$fire.auth.currentUser.uid,
            isReady: false,
            isDone: false,
            score: 0,
          },
        ],
        questions: fetchedQuestions,
      }
      const lobbyId = this.lobbiesRef.push(lobbyInfo).key
      // On indique au serveur qu'un joueur est disponible
      this.$fire.database.ref('queues/' + queueId).update({
        state: 'found',
        lobbyKey: lobbyId,
      })
      this.$router.push('/lobby/' + lobbyId)
    },
    shuffleJsonArray(array) {
      // Implementation du Fisher Yates shuffle
      // https://bost.ocks.org/mike/shuffle
      let currentIndex = array.length
      let temporaryValue
      let randomIndex
      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }
      return array
    },
    matchMaking(themeName) {
      // On recupere l'identifiant du theme
      const themeId = this.themeIdDictionary[themeName]
      // On indique qu'on est en train de chercher un adversaire
      this.searchingForMatch = true
      // On cherche dans la liste de recherche en cours si un adversaire ayant choisi le meme theme est en train de chercher une partie
      this.$fire.database
        .ref('queues/')
        .get()
        .then((snapshot) => {
          let found = false
          // Si il y a déjà des recherches en cours
          if (snapshot.val()) {
            const queueObject = snapshot.val()
            const queues = Object.keys(queueObject)
            // On parcours les recherches en cours jusqu'à trouver le theme correspondant à celui choisi par l'utilisateur
            for (let i = 0; i < queues.length; i++) {
              // Si on trouve un match on crée un lobby et on redirige l'utilisateur dans le lobby
              if (queueObject[queues[i]].theme.id === themeId) {
                // On a trouvé un joueur
                found = true
                // On indique que la recherche est terminée
                this.searchingForMatch = false
                // On crée un lobby et on redirige l'utilisateur
                this.createLobby(themeName, queues[i])
              }
            }
          }
          if (!found) {
            // Si on ne trouve aucune recherche correspondante
            // On indique au serveur qu'on est en attente de joueur
            const queueInfo = {
              opponent: {
                name: this.$fire.auth.currentUser.displayName,
                uid: this.$fire.auth.currentUser.uid,
              },
              theme: {
                name: themeName,
                id: themeId,
              },
              state: 'searching',
            }
            const queueId = this.$fire.database.ref('queues/').push(queueInfo)
              .key
            // On écoute les evenements pour voir si un joueur a rejoint
            this.$fire.database
              .ref('queues/' + queueId)
              .on('value', (snapshot) => {
                const lobbyKey =
                  snapshot.val() !== null ? snapshot.val().lobbyKey : null
                if (lobbyKey) {
                  // On met à jour l'état de la partie
                  this.$fire.database.ref('lobbies/').child(lobbyKey).update({
                    state: 'ongoing',
                  })
                  // On envoit au serveur les informations du joueur
                  this.$fire.database
                    .ref('lobbies/')
                    .child(lobbyKey + '/players/1')
                    .set({
                      name: this.$fire.auth.currentUser.displayName,
                      uid: this.$fire.auth.currentUser.uid,
                      isReady: false,
                      isDone: false,
                      score: 0,
                    })
                  // On arrête et on supprime la recherche
                  this.searchingForMatch = false
                  this.$fire.database.ref('queues/' + queueId).remove()
                  // On arrête d'écouter les evenements
                  this.$fire.database.ref('queues/' + queueId).off('value')
                  // On renvoit l'utilisateur vers le lobby
                  this.$router.push('/lobby/' + lobbyKey)
                }
              })
          }
        })
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
