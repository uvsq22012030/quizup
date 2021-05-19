<template>
  <div v-if="!isLoading">
    <vue-final-modal
      v-model="showIc"
      :ssr="true"
      :classes="['glasso', 'modal-container']"
      content-class="bg-transparent"
      :click-to-close="false"
    >
      <img
        v-if="initialCountdown > 0"
        class="animate-ping object-cover h-full w-full"
        :src="getImgUrl(initialCountdown)"
      />
    </vue-final-modal>
    <vue-final-modal
      v-model="kickPopup"
      :ssr="true"
      :classes="['glasso', 'modal-container']"
      content-class="modal-content"
    >
      <div class="flex flex-col w-full h-full">
        <h1
          class="mb-3 font-bold tracking-wide text-center text-indigo-800 h-1/3 md:text-2xl"
        >
          EXPULSER LE JOUEUR ?
        </h1>
        <div class="text-center h-100">
          <img
            class="inline-block mb-3 border-0 h-5/6"
            src="~/assets/img/alarm.svg"
          />
          <h1 class="font-bold text-center text-indigo-800">
            Veux-tu vraiment expulser ce joueur?
          </h1>
        </div>
        <div class="flex flex-wrap items-center justify-center mt-2">
          <button
            type="button"
            class="flex items-center justify-center w-full p-3 mx-2 mt-3 text-white transform scale-100 bg-indigo-800 rounded-lg shadow-xl lg:w-48 hover:bg-indigo-600 hover:scale-105 h-14"
            @click="kickPlayer()"
          >
            <div class="-mt-1 font-sans font-semibold lg:text-xl">OUI</div>
          </button>
          <button
            type="button"
            class="flex items-center justify-center w-full p-3 mx-2 mt-3 text-white transform scale-100 bg-indigo-800 rounded-lg shadow-xl lg:w-48 hover:bg-indigo-600 hover:scale-105 h-14"
            @click="kickPopup = false"
          >
            <div class="-mt-1 font-sans font-semibold lg:text-xl">NON</div>
          </button>
        </div>
      </div>
    </vue-final-modal>
    <div class="relative h-screen overflow-hidden bg-indigo-900">
      <img
        src="~/assets/img/Rainbow-Vortex.svg"
        class="absolute object-cover w-full h-full"
      />
      <div
        class="absolute inset-0 opacity-25 bg-gradient-to-tr from-indigo-400 via-indigo-600 to-black"
      ></div>
      <!-- Salle d'attente -->
      <div
        v-if="!gameStarted || !gameReady"
        class="container relative h-full px-1 py-1 mx-auto md:px-12 md:py-12 z-1"
      >
        <div
          class="w-full h-full p-3 border-indigo-900 shadow-xl md:p-8 border-3 md:border-12 rounded-xl"
        >
          <div class="flex items-center justify-between w-full mb-2">
            <n-link to="/lobby">
              <img
                src="~/assets/img/back.svg"
                class="object-fill w-10 h-10 hover:animate-bounce"
              />
            </n-link>
            <div class="flex items-center">
              <img
                class="object-fill w-10 h-10 md:h-15 md:w-15"
                src="~/assets/img/logo.svg"
              />
            </div>
            <div class="invisible w-1/10"></div>
          </div>
          <div
            class="w-full bg-indigo-900 border-indigo-800 rounded-md shadow-xl border-3"
          >
            <h4
              class="mt-2 font-bold tracking-normal text-center text-yellow-400 capitalize md:text-4xl"
            >
              JOUEURS : {{ lobbyInfo.players.length }}
            </h4>
            <div
              class="w-full h-full p-2 p-5 overflow-y-auto bg-indigo-900 rounded-md shadow-xl"
            >
              <div class="w-full h-full">
                <PlayerCard
                  v-for="(player, index) in lobbyInfo.players"
                  :key="index"
                  :name="player.name"
                  :host="player.uid === lobbyInfo.creator.uid"
                  :kick="
                    lobbyInfo !== null &&
                    userNumber !== null &&
                    lobbyInfo.players[userNumber].uid ===
                      lobbyInfo.creator.uid &&
                    lobbyInfo.players[userNumber].uid !== player.uid
                  "
                  @click="openKickPopup(index)"
                ></PlayerCard>
              </div>
            </div>
            <div
              v-if="
                lobbyInfo !== null &&
                userNumber !== null &&
                lobbyInfo.players[userNumber].uid === lobbyInfo.creator.uid
              "
              class="flex flex-wrap items-center justify-center p-5 mt-6 space-x-3"
            >
              <div class="flex flex-col w-full md:w-60">
                <button
                  type="button"
                  class="flex items-center justify-center w-full text-white transform scale-100 bg-indigo-800 rounded-lg shadow-xl lg:w-48 hover:bg-indigo-600 hover:scale-105 h-14"
                  @click="copyURL()"
                >
                  <div class="mr-3">
                    <img
                      class="object-fill w-10 p-1"
                      src="~/assets/img/link.png"
                    />
                  </div>
                  <div
                    class="-mt-1 font-sans font-semibold capitalize lg:text-xl"
                  >
                    inviter
                  </div>
                </button>
                <span
                  v-if="urlCopied"
                  class="mt-1 text-center text-gray-400 text-md"
                >
                  LIEN COPIÉ !
                </span>
                <span v-else class="invisible h-6 mt-1"></span>
              </div>
              <div class="flex flex-col w-full md:w-60">
                <button
                  type="button"
                  class="flex items-center justify-center w-full text-white transform scale-100 bg-indigo-800 rounded-lg shadow-xl lg:w-48 hover:bg-indigo-600 hover:scale-105 h-14"
                  @click="startGame()"
                >
                  <div class="mr-3">
                    <img
                      class="object-fill w-10 p-1"
                      src="~/assets/img/play-button.svg"
                    />
                  </div>
                  <div
                    class="-mt-1 font-sans font-semibold capitalize lg:text-xl"
                  >
                    démarrer
                  </div>
                </button>
                <h1 class="invisible h-6 mt-1"></h1>
              </div>
            </div>
            <div
              v-else
              class="flex items-center justify-center mt-6 space-x-2 h-1/6"
            >
              <img
                class="inline-block animate-spin h-1/2"
                src="~/assets/img/spinner.svg"
              />
              <h1 class="text-xl text-center text-gray-400">
                En attente de l'hôte pour démarrer la partie ;)
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameReady">
        <!-- L'adversaire n'a pas quitté ou abandonné -->
        <!-- Lancement de la partie  -->
        <div v-if="!opponentSurrendered">
          <div
            class="container relative h-full px-1 py-1 mx-auto md:px-12 md:py-12 z-1"
          >
            <!-- Partie en cours -->
            <div
              v-if="currentQuestionNumber < 10"
              class="w-full h-full p-3 border-indigo-900 shadow-xl md:p-8 border-3 md:border-12 rounded-xl"
            >
              <div class="flex items-center justify-between w-full">
                <div class="w-1/4">
                  <radial-progress-bar
                    v-if="currentQuestionNumber < 10"
                    ref="timeBar"
                    :diameter="100"
                    :completed-steps="timer * 5"
                    :total-steps="100"
                  >
                    <p class="text-xl text-white">{{ timer }}</p>
                  </radial-progress-bar>
                </div>
                <div class="flex items-center justify-center w-1/4">
                  <div class="flex -space-x-1 overflow-x-scroll">
                    <img
                      v-for="(player, idx) in lobbyInfo.players"
                      :key="idx"
                      class="inline-block w-5 h-5 rounded-full ring-1"
                      :src="
                        'https://avatars.dicebear.com/api/bottts/' +
                        player.name +
                        '.svg'
                      "
                    />
                  </div>
                </div>

                <p
                  class="w-1/4 mx-3 text-xl font-bold tracking-widest text-right text-yellow-400 md:text-4xl"
                >
                  {{ gameInfo.answers }}
                </p>
                <p
                  class="w-1/4 mx-3 text-xl font-bold tracking-widest text-right text-indigo-400 md:text-4xl"
                >
                  {{ currentQuestionNumber + 1 }}
                  <span class="text-base">/{{ totalQuestions }}</span>
                </p>
              </div>

              <div class="flex h-full mt-5">
                <div
                  class="w-full h-full p-5 bg-indigo-900 rounded-md shadow-xl"
                  style="height: 90%"
                >
                  <h1
                    class="my-3 text-xl font-bold text-center text-white md:text-2xl"
                  >
                    {{ randomQuestions[currentQuestionNumber].question }}
                  </h1>
                  <div class="flex flex-wrap w-full mt-10">
                    <AnswerCard
                      ref="answerCards"
                      v-for="(n, index) in 4"
                      :key="index"
                      :disabled="done"
                      :label="
                        randomQuestions[currentQuestionNumber].propositions[
                          index
                        ]
                      "
                      @click="
                        play(
                          randomQuestions[currentQuestionNumber].propositions[
                            index
                          ],
                          index
                        )
                      "
                    ></AnswerCard>
                  </div>
                </div>
              </div>
            </div>
            <!-- Fin de partie -->
            <div
              v-else
              class="container relative h-full px-1 py-1 mx-auto md:px-12 md:py-12 z-1"
            >
              <div
                class="flex flex-col items-center space-y-2 w-full h-full p-3 border-indigo-900 shadow-xl md:p-8 border-3 md:border-12 rounded-xl"
              >
                <h1 class="text-center text-gray-100 font-bold text-4xl">
                  Vous êtes classé : {{ userRanking }}.
                </h1>
                <h1 class="text-center text-gray-100 font-bold text-4xl">
                  Score : {{ gameInfo.score }} points
                </h1>
                <div
                  class="w-1/2 h-4/5 p-2 p-5 overflow-y-auto bg-indigo-900 rounded-md shadow-xl"
                >
                  <div class="w-full h-full">
                    <RankCard
                      v-for="(player, index) in rankingTable"
                      :key="index"
                      :name="player.name"
                      :rank="index + 1"
                      :score="player.score"
                    ></RankCard>
                  </div>
                </div>
                <button
                  type="button"
                  class="flex items-center justify-center w-full text-white transform scale-100 bg-indigo-800 rounded-lg shadow-xl lg:w-48 hover:bg-indigo-600 hover:scale-105 h-14"
                  @click="$router.push('/lobby')"
                >
                  <div class="mr-3">
                    <img
                      class="object-fill w-10 p-1"
                      src="~/assets/img/back.svg"
                    />
                  </div>
                  <div
                    class="-mt-1 font-sans font-semibold capitalize lg:text-xl"
                  >
                    Retour
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Si l'adversaire quitte ou abandonne -->
        <div
          v-else
          class="container relative h-full px-1 py-1 mx-auto md:px-12 md:py-12 z-1"
        >
          <div
            class="flex flex-col items-center space-y-2 w-full h-full p-3 border-indigo-900 shadow-xl md:p-8 border-3 md:border-12 rounded-xl"
          >
            <div class="w-1/2 h-50">
              <img
                class="object-contain h-full w-full"
                src="~/assets/img/winner.png"
              />
            </div>
            <h1 class="text-center text-gray-100 font-bold text-4xl">
              VOUS AVEZ GAGNÉ !
            </h1>
            <h1 class="text-center text-gray-100 text-2xl">
              Tous les adversaires ont quitté
            </h1>
            <h1 class="text-center text-gray-100 font-bold text-4xl">
              Score : {{ gameInfo.score }} points
            </h1>
            <button
              type="button"
              class="flex items-center justify-center w-full text-white transform scale-100 bg-indigo-800 rounded-lg shadow-xl lg:w-48 hover:bg-indigo-600 hover:scale-105 h-14"
              @click="$router.push('/lobby')"
            >
              <div class="mr-3">
                <img class="object-fill w-10 p-1" src="~/assets/img/back.svg" />
              </div>
              <div class="-mt-1 font-sans font-semibold capitalize lg:text-xl">
                Retour
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'

export default {
  components: {
    RadialProgressBar,
  },
  beforeRouteLeave(to, from, next) {
    if (!to.params.force) {
      // L'utilisateur essaie de quitter le lobby
      const answer = confirm(
        'Etes-vous sûr de vouloir quitter cette page? Vous quitterez le lobby'
      )
      if (answer) {
        // On lance l'ecran de chargement
        this.isLoading = true
        // On arrete d'écouter les evenements
        this.lobbyRef.off('value')
        // Si l'utilisateur est le createur du lobby alors on supprime le lobby
        if (
          !this.gameStarted &&
          this.lobbyInfo.creator.uid === this.$fire.auth.currentUser.uid
        ) {
          this.$fire.database
            .ref('lobbies/' + this.$route.params.lobby)
            .remove()
        } else if (Object.keys(this.lobbyInfo.players).length === 1) {
          // Si c'est le dernier utilisateur connecté alors la partie est finie donc on supprime le lobby
          this.$fire.database
            .ref('lobbies/' + this.$route.params.lobby)
            .remove()
        } else {
          // Sinon on supprime l'utilisateur qui s'est deconnecté de la base de données
          this.$fire.database
            .ref(
              'lobbies/' +
                this.$route.params.lobby +
                '/players/' +
                this.userNumber
            )
            .remove()
        }
        clearInterval(this.intervalId)
        next()
      } else next(false)
    } else {
      clearInterval(this.intervalId)
      next()
    }
  },
  data() {
    return {
      playerToKick: null, // Joueur que l'hôte a choisit d'expulser
      kickPopup: false, // Booleen affichant le popup d'expulsion de joueur
      urlCopied: false, // Booleen indiquant si l'url a bien été copiée
      isLoading: true, // Booleen indiquant si l'on doit afficher l'ecran de chargement ou pas
      historyRef: null, // Reference sur l'historique dans la base de données
      intervalId: null, // Identifiant pour la fonction setInterval du chronometre
      timer: 20, // Temps donné pour chaque question
      done: false, // Booléen décrivant si le round est terminé ou non
      lobbyRef: null, // Reference sur le lobby dans la base de données
      lobbyInfo: null, // Informations du lobby
      randomQuestions: [], // Liste aleatoire de questions
      currentQuestionNumber: 0, // Numero de la question courante
      totalQuestions: 10, // Nombre total de questions
      gameInfo: {
        // Informations de la partie qui seront stockées dans l'historique
        date: new Date().toLocaleDateString(),
        theme: null,
        type: 'Multijoueur',
        score: 0,
        answers: 0,
      },
      userNumber: null, // Position de l'utilisateur dans la base de données
      gameReady: false, // Booléen indiquant si la partie est prete à etre lancée ou non
      gameStarted: false, // Booléen indiquant si la partie a commencé ou non
      opponentSurrendered: false, // Booléen indiquant si l'adversaire a quitté ou abandonné
      rankingTable: [], // Classement final total de la partie
      userRanking: null, // Classement final du joueur
      initialCountdown: 3, // Compte à rebours initial de début de partie
      icIntervalId: null, // Identifiant pour la fonction setInterval du compte à rebours initial
      showIc: false, // Booléen permettant l'affichage du compte à rebours initial
    }
  },
  head() {
    return {
      title: 'Lobby uvsQuiz - Revolution du Trivia',
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
  beforeCreate() {
    // On redirige l'utilisateur si le lobby n'existe pas
    this.$fire.database
      .ref('lobbies/')
      .get()
      .then((snapshot) => {
        // Il n'y aucun lobby
        if (!snapshot.val()) {
          this.$router.push({
            name: 'lobby',
            params: {
              force: true,
            },
          })
        } else if (
          !Object.keys(snapshot.val()).includes(this.$route.params.lobby)
        ) {
          // Le lobby est inexistant
          this.$router.push({
            name: 'lobby',
            params: {
              force: true,
            },
          })
        } else if (
          snapshot.val()[this.$route.params.lobby].type === 'normal' &&
          snapshot.val()[this.$route.params.lobby].state !== 'En attente'
        ) {
          // La partie a déjà commencée
          this.$router.push({
            name: 'lobby',
            params: {
              force: true,
            },
          })
        } else {
          // Le joueur rejoint le lobby
          const idTable = snapshot
            .val()
            [this.$route.params.lobby].players.map(function (player) {
              return player.uid
            })
          let includes = false
          for (let i = 0; i < idTable.length; i++) {
            if (idTable[i] === this.$fire.auth.currentUser.uid) {
              includes = true
              break
            }
          }
          if (!includes) {
            const playersNumber = snapshot.val()[this.$route.params.lobby]
              .players.length
            this.$fire.database
              .ref('lobbies/')
              .child(this.$route.params.lobby + '/players/' + playersNumber)
              .set({
                name: this.$fire.auth.currentUser.displayName,
                uid: this.$fire.auth.currentUser.uid,
                isDone: false,
                score: 0,
                lastAnswer: null,
              })
          }
        }
      })
  },
  created() {
    // On recupere la reference des lobbies dans la base de données
    this.lobbyRef = this.$fire.database.ref(
      'lobbies/' + this.$route.params.lobby
    )
    // On recupere les informations du lobby
    this.lobbyRef.get().then((snapshot) => {
      // On recupere les questions du theme choisi et son nom
      this.randomQuestions = this.lobbyInfo.questions
      this.gameInfo.theme = this.lobbyInfo.theme.name
      // this.userNumber = this.lobbyInfo.players.length - 1
      for (let i = 0; i < this.lobbyInfo.players.length; i++) {
        if (this.$fire.auth.currentUser.uid === this.lobbyInfo.players[i].uid) {
          this.userNumber = i
        }
      }
      this.isLoading = false
    })
    // On ecoute les evenement du serveur
    this.lobbyRef.on('value', (snapshot) => {
      // Si le createur supprime le lobby on redirige l'autre joueur vers la liste des lobbies
      if (!snapshot.val()) {
        this.$router.push({
          name: 'lobby',
          params: {
            force: true,
          },
        })
      }
      this.lobbyInfo = snapshot.val()
      // Si les infos existent et que la partie n'a pas commencé
      if (this.lobbyInfo) {
        if (!this.gameStarted) {
          // Si l'utilisateur se fait expulser
          if (
            this.userNumber !== null &&
            !Object.keys(this.lobbyInfo.players).includes(
              String(this.userNumber)
            )
          ) {
            this.$router.push({
              name: 'lobby',
              params: {
                force: true,
                kicked: true,
              },
            })
          }
          // On recupere l'état de la partie
          this.gameReady = this.lobbyInfo.state === 'En cours'
          if (this.gameReady) {
            if (this.lobbyInfo.type === 'matchmaking') {
              // On lance la partie
              this.gameStarted = true
              this.intervalId = setInterval(this.countdown, 1000)
            } else if (this.lobbyInfo.type === 'normal') {
              // On lance le compte à rebours initial
              this.showIc = true
              const sound = new Audio('/initialCountdown.mp3')
              sound.play()
              this.icIntervalId = setInterval(
                function () {
                  this.initialCountdown -= 1
                  // Si le compte à rebours atteint 0
                  if (!this.initialCountdown) {
                    // On arrête le compte à rebours
                    clearInterval(this.icIntervalId)
                    this.showIc = false
                    // On lance la partie
                    this.gameStarted = true
                    this.intervalId = setInterval(this.countdown, 1000)
                  }
                }.bind(this),
                1000
              )
            }
          }
        } else if (
          Object.keys(this.lobbyInfo.players).length === 1 &&
          this.currentQuestionNumber < 10
        ) {
          // Si l'adversaire abandonne
          this.opponentSurrendered = 1
          clearInterval(this.intervalId)
          // On arrete d'écouter les evenements
          this.lobbyRef.off('value')
          // On donne un bonus de score à l'utilisateur
          this.gameInfo.score += 600
          // On met à jour le score dans le lobby
          this.lobbyRef.child('players/' + this.userNumber).update({
            score: this.gameInfo.score,
          })
          // On change l'état de la partie à 'Terminée'
          this.$fire.database
            .ref('lobbies/' + this.$route.params.lobby)
            .update({
              state: 'Terminée',
            })
        } else if (this.currentQuestionNumber < 10) {
          // On verifie si les deux utilisateurs ont terminé
          const roundDone = (player) => player.isDone
          this.done = this.lobbyInfo.players.every(roundDone)
          // Si les deux utilisateurs ont terminé alors on passe au round suivant (question suivante)
          if (this.done) {
            // On commence le tour
            this.lobbyRef.child('players/' + this.userNumber).update({
              isDone: false,
            })
            // On passe à la prochaine question
            setTimeout(
              function () {
                this.nextQuestion()
              }.bind(this),
              1000
            )
          }
        }
      }
    })
  },
  beforeMount() {
    // On recupere l'url de la page courante
    this.url = window.location.href
    // On ajoute un ecouteur d'evenements pour voir si l'utilisateur est encore sur la page
    window.addEventListener('beforeunload', this.preventNav)
    window.addEventListener('unload', this.browserClosedHandler)
    window.addEventListener('onunload', this.browserClosedHandler)
  },
  beforeDestroy() {
    // On supprime l'ecouteur d'evenements
    window.removeEventListener('beforeunload', this.preventNav)
    window.removeEventListener('unload', this.browserClosedHandler)
    window.removeEventListener('onunload', this.browserClosedHandler)
    // On arrete d'écouter les evenements
    this.lobbyRef.off('value')
  },
  methods: {
    getImgUrl(imgNumber) {
      return require('~/assets/img/chrono' + imgNumber + '.png')
    },
    kickPlayer() {
      this.$fire.database
        .ref(
          'lobbies/' +
            this.$route.params.lobby +
            '/players/' +
            this.playerToKick
        )
        .remove()
      this.playerToKick = null
      this.kickPopup = false
    },
    openKickPopup(playerNumber) {
      this.playerToKick = playerNumber
      this.kickPopup = true
    },
    startGame() {
      if (this.lobbyInfo.players.length >= 2) {
        // Le createur du lobby change l'état de la partie à 'En cours'
        this.$fire.database.ref('lobbies/' + this.$route.params.lobby).update({
          state: 'En cours',
        })
      } else {
        alert("Il n'y a pas assez de joueurs dans le lobby !")
      }
    },
    copyURL() {
      const tmp = document.createElement('textarea')
      document.body.appendChild(tmp)
      tmp.value = window.location.href
      tmp.select()
      document.execCommand('copy')
      this.urlCopied = true
      document.body.removeChild(tmp)
      setTimeout(
        function () {
          this.urlCopied = false
        }.bind(this),
        2000
      )
    },
    browserClosedHandler(event) {
      // On arrete d'écouter les evenements
      this.lobbyRef.off('value')
      // On lance l'ecran de chargement
      this.isLoading = true
      // Si l'utilisateur est le createur du lobby alors on supprime le lobby
      if (
        !this.gameStarted &&
        this.lobbyInfo.creator.uid === this.$fire.auth.currentUser.uid
      ) {
        this.$fire.database.ref('lobbies/' + this.$route.params.lobby).remove()
      } else if (Object.keys(this.lobbyInfo.players).length === 1) {
        // Si c'est le dernier utilisateur connecté alors la partie est finie donc on supprime le lobby
        this.$fire.database.ref('lobbies/' + this.$route.params.lobby).remove()
      } else {
        // Sinon on supprime l'utilisateur qui s'est deconnecté de la base de données
        this.$fire.database
          .ref(
            'lobbies/' +
              this.$route.params.lobby +
              '/players/' +
              this.userNumber
          )
          .remove()
      }
      clearInterval(this.intervalId)
    },
    // Fonction qui s'execute apres l'evenement beforeunload
    preventNav(event) {
      event.preventDefault()
      event.returnValue = ''
    },
    play(userAnswer, index) {
      console.log(this.userNumber)
      // On stop et cache le timer
      clearInterval(this.intervalId)
      this.$refs.timeBar.className += 'hidden'
      // On desactive les boutons
      this.$refs.answerCards.forEach(function (b) {
        b.disabled = true
      })
      // On compare la réponse cliquée
      const rightAnswer = this.randomQuestions[this.currentQuestionNumber]
        .réponse
      if (userAnswer === rightAnswer) {
        // Bonne réponse
        // On la met en vert
        this.$refs.answerCards[index].isCorrect = true
        // On augmente le nombre de bonne réponses
        this.gameInfo.answers += 1
        // On calcule le score de la question
        this.gameInfo.score += Math.max(0, this.timer) * 5
        // On met à jour le score dans le lobby
        this.lobbyRef.child('players/' + this.userNumber).update({
          score: this.gameInfo.score,
        })
      } else {
        // Mauvaise réponse
        // On met la réponse en rouge
        this.$refs.answerCards[index].isFalse = true
        // On met la bonne réponse en vert
        this.$refs.answerCards.forEach(function (b) {
          if (b.label === rightAnswer) {
            b.isCorrect = true
          }
        })
      }
      // On termine le tour
      this.lobbyRef.child('players/' + this.userNumber).update({
        isDone: true,
      })
    },
    nextQuestion() {
      // On reactive les boutons
      this.$refs.answerCards.forEach(function (b) {
        b.disabled = false
      })
      // On passe à la prochaine question
      this.currentQuestionNumber++
      if (this.currentQuestionNumber < 10) {
        // On remet les boutons à zero
        this.$refs.answerCards.forEach(function (b) {
          b.isFalse = false
          b.isCorrect = false
        })
        // On affiche et remet le chrono à zero et on relance le decompte
        this.$refs.timeBar.className = this.$refs.timeBar.className.replace(
          'hidden',
          ' '
        )
        this.timer = 20
        this.intervalId = setInterval(this.countdown, 1000)
      } else {
        // Arret du chronometre
        clearInterval(this.intervalId)
        // Determination du classement final
        this.rankingTable = this.lobbyInfo.players.sort(function (a, b) {
          return b.score - a.score
        })
        // Recuperation de la position de l'utilisateur dans le classement
        this.userRanking =
          this.rankingTable
            .map(function (player) {
              return player.uid
            })
            .indexOf(this.$fire.auth.currentUser.uid) + 1
        // On met l'état de la partie à terminer
        this.$fire.database.ref('lobbies/' + this.$route.params.lobby).update({
          state: 'terminée',
        })
        // On se connecte à la base de données pour sauvegarder l'historique
        if (!this.$fire.auth.currentUser.isAnonymous) {
          this.historyRef = this.$fire.database.ref(
            'history/' + this.$fire.auth.currentUser.uid
          )
          this.historyRef.push(this.gameInfo)
        }
      }
    },
    countdown() {
      // On decremente le compteur
      this.timer -= 1
      // Fin du chronometre
      if (!this.timer) {
        // On desactive les boutons
        this.$refs.answerCards.forEach(function (b) {
          b.disabled = true
        })
        clearInterval(this.intervalId)
        // On met la bonne réponse en vert
        const rightAnswer = this.randomQuestions[this.currentQuestionNumber]
          .réponse
        this.$refs.answerCards.forEach(function (b) {
          if (b.label === rightAnswer) {
            b.isCorrect = true
          }
        })
        // On cache le timer
        // On termine le tour
        this.$refs.timeBar.className += 'hidden'
        this.lobbyRef.child('players/' + this.userNumber).update({
          isDone: true,
        })
      }
    },
  },
}
</script>

<style></style>
