<template>
  <div>
    <vue-final-modal
      v-model="kicked"
      :ssr="true"
      :classes="['glasso', 'modal-container']"
      content-class="modal-content"
      :click-to-close="true"
    >
      <div class="flex flex-col w-full h-full">
        <h1
          class="mb-3 font-bold tracking-wide text-center text-white h-1/3 md:text-2xl"
        >
          VOUS AVEZ ÉTÉ EXPULSÉ !
        </h1>
        <div class="text-center h-60">
          <img
            class="inline-block mb-3 border-0 h-5/6"
            src="~/assets/img/cry.svg"
          />
        </div>
      </div>
    </vue-final-modal>
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
          <div class="flex items-center justify-between w-full">
            <div class="invisible w-1/6"></div>
            <div class="flex items-center">
              <n-link to="/">
                <img
                  class="object-fill w-10 h-10 md:h-15 md:w-15"
                  src="~/assets/img/logo.svg"
                />
              </n-link>
              <p
                class="mx-3 text-xl font-bold tracking-widest text-gray-200 md:text-4xl"
              >
                LOBBIES
              </p>
            </div>
            <button
              type="button"
              class="flex items-center justify-center w-full p-3 mx-2 mt-3 text-white transform scale-100 bg-indigo-800 rounded-lg shadow-xl justify-self-end lg:w-48 hover:bg-indigo-600 hover:scale-105 h-14"
              @click="lobbyPopup = true"
            >
              <div class="mr-3">
                <img class="object-fill w-10 p-1" src="~/assets/img/sofa.svg" />
              </div>
              <div>
                <div class="text-xs text-left">CREER MON</div>
                <div class="-mt-1 font-sans font-semibold lg:text-xl">
                  LOBBY
                </div>
              </div>
            </button>
          </div>
          <div class="flex h-full mt-5">
            <div
              class="w-full h-full p-5 overflow-y-auto bg-indigo-900 rounded-md shadow-xl"
              style="height: 90%"
            >
              <div v-if="lobbiesList.length" class="w-full h-full">
                <LobbyCard
                  v-for="(lobby, idx) in lobbiesList"
                  :key="idx"
                  :label="lobby.theme.name"
                  :user="lobby.creator.name"
                  :status="lobby.state"
                  :players="Object.keys(lobby.players).length"
                  @click="
                    joinLobby(
                      lobby.id,
                      Object.keys(lobby.players).length,
                      lobby.creator.uid
                    )
                  "
                ></LobbyCard>
              </div>
              <div v-else class="text-center">
                <p class="mx-3 tracking-wider text-gray-200 text-l md:text-4xl">
                  Aucun lobby pour le moment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vue-final-modal
      v-model="lobbyPopup"
      :ssr="true"
      :classes="['glasso', 'modal-container']"
      content-class="modal-content"
    >
      <div class="flex flex-col items-center">
        <img
          class="object-fill w-8 h-8 lg:h-15 lg:w-15 animate-bounce"
          src="~/assets/img/mental-health.svg"
        />
        <p class="my-2 text-center">Selectionner un thème :</p>
      </div>
      <v-select
        id="search"
        v-model="selectedTheme"
        :options="themeList"
        class="w-full py-1 m-auto leading-tight text-white placeholder-white bg-indigo-800 border-indigo-900 rounded-full appearance-none md:w-3/5 border-1 hover:bg-indigo-600 focus:outline-none"
        label="theme"
        append-to-body
        type="text"
        placeholder="Rechercher un thème..."
      >
      </v-select>
      <div class="flex flex-wrap items-center justify-center mt-2">
        <button
          type="button"
          class="flex items-center justify-center w-full p-3 mx-2 mt-3 text-white transform scale-100 bg-indigo-800 rounded-lg shadow-xl lg:w-48 hover:bg-indigo-600 hover:scale-105 h-14"
          @click="createLobby(selectedTheme)"
        >
          <div class="mr-3">
            <img
              class="object-fill w-10 p-1"
              src="~/assets/img/play-button.svg"
            />
          </div>
          <div>
            <div class="text-xs text-left">CREER LE</div>
            <div class="-mt-1 font-sans font-semibold lg:text-xl">LOBBY</div>
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
      lobbiesRef: null, // Reference sur les lobby dans la base de données
      lobbiesList: [], // Liste des lobbies existants
      lobbyPopup: false, // Booléen pour afficher le popup de creation de lobby
      fetchedThemes: null, // Themes recuperés
      selectedTheme: null, // Theme choisi dans le menu de creation de lobby
      themeList: [], // Liste des noms des themes pour la barre de recherche
      themeIdDictionary: {}, // Dictionnaire nom : id pour les themes
      kicked: this.$route.params.kicked, // Booléen indiquant si l'utilisateur a été expulsé
    }
  },
  head() {
    return {
      title: 'Play uvsQuiz - Revolution du Trivia',
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
  created() {
    // On recupere les theme de l'API
    this.fetchThemes()
    // On recupere la reference des lobbies dans la base de données
    this.lobbiesRef = this.$fire.database.ref('lobbies/')
    // Ajout d'un ecouteur d'evenement pour récuperer les lobbies
    this.lobbiesRef.on('child_added', (snapshot) =>
      this.lobbiesList.push({ ...snapshot.val(), id: snapshot.key })
    )
    // Ajout d'un ecouteur d'evenement pour récuperer les modifications de lobbies
    this.lobbiesRef.on('child_changed', (snapshot) => {
      const updatedLobby = this.lobbiesList.find(
        (lobby) => lobby.id === snapshot.key
      )
      // On met à jour le nombre de joueurs et l'etat de la partie
      updatedLobby.state = snapshot.val().state
      updatedLobby.players = snapshot.val().players
    })
    // Ajout d'un ecouteur d'evenement pour récuperer les lobbies supprimés
    this.lobbiesRef.on('child_removed', (snapshot) => {
      const deletedLobby = this.lobbiesList.find(
        (lobby) => lobby.id === snapshot.key
      )
      const index = this.lobbiesList.indexOf(deletedLobby)
      this.lobbiesList.splice(index, 1)
    })
  },
  methods: {
    // Methode qui permet à l'utilisateur de rejoindre un lobby
    joinLobby(lobbyId, playersNumber, creatorId) {
      if (creatorId === this.$fire.auth.currentUser.uid) {
        // Le meme utilisateur ne peut pas rejoindre le meme lobby 2 fois
        alert('Same user')
      } else {
        this.lobbiesRef.child(lobbyId + '/players/' + playersNumber).set({
          name: this.$fire.auth.currentUser.displayName,
          uid: this.$fire.auth.currentUser.uid,
          isDone: false,
          score: 0,
          lastAnswer: null,
        })
        this.$router.push('/lobby/' + lobbyId)
      }
    },
    // Methode qui formatte le nom d'un thème pour l'affichage
    format(themeName) {
      return (
        themeName[0].toUpperCase() + themeName.slice(1).replaceAll('_', ' ')
      )
    },
    // Creation du lobby
    async createLobby(themeName) {
      if (!this.selectedTheme) {
        alert('Veuillez choisir un theme')
      } else {
        // On recupere le theme
        let fetchedQuestions = await this.$axios.get(
          'https://enigmatic-stream-69193.herokuapp.com/categories/' +
            String(this.themeIdDictionary[themeName])
        )
        // On prend 10 questions au hasard parmis les 30
        fetchedQuestions = this.shuffleJsonArray(
          fetchedQuestions.data.questions
        ).slice(0, 10)
        const lobbyInfo = {
          creator: {
            name: this.$fire.auth.currentUser.displayName,
            uid: this.$fire.auth.currentUser.uid,
          },
          theme: {
            name: themeName,
            id: this.themeIdDictionary[themeName],
          },
          state: 'En attente',
          type: 'normal',
          players: [
            {
              name: this.$fire.auth.currentUser.displayName,
              uid: this.$fire.auth.currentUser.uid,
              isDone: false,
              score: 0,
              lastAnswer: null,
            },
          ],
          questions: fetchedQuestions,
        }
        const lobbyId = this.lobbiesRef.push(lobbyInfo).key
        this.$router.push('/lobby/' + lobbyId)
      }
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
    // Recuperation des theme à partir de l'API
    async fetchThemes() {
      const json = await this.$axios.get(
        'https://enigmatic-stream-69193.herokuapp.com/categories'
      )
      // On recupere les themes
      this.fetchedThemes = json.data
      // On reformatte le nom de chaque theme pour l'inserer dans la liste des suggestions de la barre de recherche
      this.fetchedThemes.forEach((theme) => {
        this.themeList.push(this.format(theme.name))
        this.themeIdDictionary[this.format(theme.name)] = theme.id
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
