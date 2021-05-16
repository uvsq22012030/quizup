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
                  @click="browseLobbies()"
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
                  @click="randomTheme()"
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
                  @click="soloPopup(theme.name)"
                ></GameCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <vue-final-modal
      v-model="optionsPopup"
      :ssr="true"
      :classes="['glasso', 'modal-container']"
      content-class="modal-content"
    >
      <div class="flex flex-col items-center">
        <img
          class="object-fill w-8 h-8 lg:h-15 lg:w-15 animate-bounce"
          src="~/assets/img/mental-health.svg"
        />
        <p v-if="themeName" class="my-2 capitalize font-bold text-center">
          Theme selectionné : {{ themeName.split('_').join(' ') }}
        </p>
        <p class="my-2 text-center">Choisir un mode de jeu :</p>
      </div>

      <div class="flex flex-wrap items-center justify-center mt-2">
        <button
          type="button"
          class="flex items-center justify-center w-full p-3 mx-2 mt-3 text-white transform scale-100 bg-indigo-800 rounded-lg shadow-xl lg:w-48 hover:bg-indigo-600 hover:scale-105 h-14"
          @click="playSolo(false)"
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
          @click="playSolo(true)"
        >
          <div class="mr-3">
            <img class="object-fill w-10 p-1" src="~/assets/img/deadline.svg" />
          </div>
          <div>
            <div class="text-xs text-left">MODE</div>
            <div class="-mt-1 font-sans font-semibold lg:text-xl">CHRONO</div>
          </div>
        </button>
        <button
          type="button"
          class="flex items-center justify-center w-full p-3 mx-2 mt-3 text-white transform scale-100 bg-indigo-800 rounded-lg shadow-xl lg:w-48 hover:bg-indigo-600 hover:scale-105 h-14"
          @click="matchMaking(themeName)"
        >
          <div class="mr-3">
            <img class="object-fill w-10 p-1" src="~/assets/img/vs.svg" />
          </div>
          <div>
            <div class="text-xs text-left">MODE</div>
            <div class="-mt-1 font-sans font-semibold lg:text-xl">VERSUS</div>
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
      optionsPopup: false,
      chosenTheme: null,
      fetchedThemes: [],
      themeIdDictionary: {},
      searchQuery: null,
      lobbiesRef: null,
      searchingForMatch: false,
      themeName: null,
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
  created() {
    // On recupere les theme de l'API
    this.fetchThemes()
    // On recupere la reference des lobbies dans la base de données
    this.lobbiesRef = this.$fire.database.ref('lobbies/')
  },
  methods: {
    // Methode qui renvoit un theme aléatoire
    randomTheme() {
      this.searchQuery = this.fetchedThemes[
        Math.floor(Math.random() * this.fetchedThemes.length)
      ].name
        .split('_')
        .join(' ')
    },
    // Methode qui redirige vers la page des lobbies
    browseLobbies() {
      this.$router.push('/lobby')
    },
    // Recuperation des theme à partir de l'API
    async fetchThemes() {
      const json = await this.$axios.get(
        'https://enigmatic-stream-69193.herokuapp.com/categories'
      )
      // On recupere les themes
      this.fetchedThemes = json.data
      // On reformatte le nom de chaque theme pour l'inserer dans la liste des suggestions de la barre de recherche
      this.fetchedThemes.forEach((theme) => {
        this.themeIdDictionary[theme.name] = theme.id
      })
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
    playSolo(chronoMode) {
      // On redirige vers la page de jeu en envoyant le json correspondant
      this.$router.push({
        name: 'game',
        params: {
          theme: this.chosenTheme.data,
          themeName: this.themeName,
          isTimed: chronoMode,
        },
      })
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
