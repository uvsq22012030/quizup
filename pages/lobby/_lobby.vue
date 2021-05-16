<template>
  <div v-if="!isLoading">
    <vue-final-modal
      v-model="kickPopup"
      :ssr="true"
      :classes="['glasso', 'modal-container']"
      content-class="modal-content"
    >
      <div class="h-full w-full flex flex-col">
        <h1
          class="mb-3 text-center text-indigo-800 h-1/3 font-bold tracking-wide md:text-2xl"
        >
          EXPULSER LE JOUEUR ?
        </h1>
        <div class="text-center h-100">
          <img
            class="inline-block h-5/6 border-0 mb-3"
            src="~/assets/img/alarm.svg"
          />
          <h1 class="text-center text-indigo-800 font-bold">
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
                class="hover:animate-bounce object-fill w-10 h-10"
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
            class="bg-indigo-900 border-3 border-indigo-800 w-full h-4/6 shadow-xl rounded-md"
          >
            <h4
              class="mt-2 text-center capitalize font-bold tracking-normal text-yellow-400 md:text-4xl"
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
              class="mt-6 flex items-center justify-center space-x-3"
            >
              <div class="flex flex-col">
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
                    class="-mt-1 font-sans font-semibold lg:text-xl capitalize"
                  >
                    inviter
                  </div>
                </button>
                <h1
                  v-if="urlCopied"
                  class="mt-1 text-center text-gray-400 text-md"
                >
                  LIEN COPIÉ !
                </h1>
                <h1 v-else class="mt-1 invisible h-6"></h1>
              </div>
              <div class="flex flex-col">
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
                    class="-mt-1 font-sans font-semibold lg:text-xl capitalize"
                  >
                    démarrer
                  </div>
                </button>
                <h1 class="mt-1 invisible h-6"></h1>
              </div>
            </div>
            <div
              v-else
              class="mt-6 flex items-center justify-center space-x-2 h-1/6"
            >
              <img
                class="animate-spin inline-block h-1/2"
                src="~/assets/img/spinner.svg"
              />
              <h1 class="text-center text-gray-400 text-xl">
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
                <n-link to="/lobby">
                  <img
                    src="~/assets/img/back.svg"
                    class="object-fill w-5 h-5"
                  />
                </n-link>
                <div class="flex items-center justify-center">
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
                  class="mx-3 text-xl font-bold tracking-widest text-yellow-400 md:text-4xl"
                >
                  {{ gameInfo.answers }}
                </p>
                <p
                  class="mx-3 text-xl font-bold tracking-widest text-indigo-400 md:text-4xl"
                >
                  {{ currentQuestionNumber + 1 }}
                  <span class="text-base">/{{ totalQuestions }}</span>
                </p>
              </div>
              <!-- Chrono -->
              <div ref="timeBar">
                <!-- Progressbar -->
                <div
                  v-if="currentQuestionNumber < 10"
                  class="flex h-4 bg-white w-5/6 bg-grey-light float-left rounded-full shadow-2xl md:mt-3"
                >
                  <div
                    class="h-4 bg-indigo-500 text-xs leading-none py-1 text-center rounded-full text-white"
                    :style="'width:' + 5 * (20 - timer) + '%'"
                  ></div>
                </div>
                <!-- Hourglass -->
                <img
                  v-if="currentQuestionNumber < 10"
                  class="flex bg-none right-5 object-fill h-5 w-10 md:h-12 md:w-20"
                  src="~/assets/img/hourglass.gif"
                />
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
                      v-for="(n, index) in 4"
                      :key="index"
                      :disabled="done"
                      ref="answerCards"
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
            <div></div>
          </div>
        </div>
        <!-- Si l'adversaire quitte ou abandonne -->
        <div v-else class="block h-full w-full py-10 md:py-30">
          <img
            class="block mr-auto ml-auto object-fill h-20 w-20 md:h-50 md:w-50"
            src="~/assets/img/wreath.png"
          />
          <!-- Partie terminée -->
          <p
            class="block text-center bottom-0 w-full mt-5 text-xl md:text-6xl font-bold tracking-wide text-gray-600"
          >
            Partie terminée !
          </p>
          <!-- Message de fin -->
          <p
            class="block text-center bottom-0 w-full mt-5 text-l md:text-2xl font-bold tracking-wide text-gray-600"
          >
            Tout les adversaires ont quitté
          </p>
          <p
            class="block text-center bottom-0 w-full mt-5 text-l md:text-2xl font-bold tracking-wide text-gray-600"
          >
            Vous avez gagné !
          </p>
          <!-- Score -->
          <p
            class="block text-center bottom-0 w-full mt-5 text-l md:text-2xl font-bold tracking-wide text-gray-600"
          >
            Score : {{ gameInfo.score }} points
          </p>
          <!-- Bouton retour au menu -->
          <div
            class="flex w-full h-1/4 items-stretch justify-center text-center space-x-8 mt-5"
          >
            <button
              class="h-1/2 w-1/3 p-2 text-sm md:text-lg font-bold tracking-wider text-white bg-red-400 border-0 rounded-2xl shadow-2xl focus:outline-none hover:bg-red-600 md:hover:text-xl"
              type="submit"
              @click="$router.push('/lobby')"
            >
              Revenir au menu des lobbies
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      this.userNumber = this.lobbyInfo.players.length - 1
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
            // On lance la partie
            this.gameStarted = true
            this.intervalId = setInterval(this.countdown, 1000)
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
