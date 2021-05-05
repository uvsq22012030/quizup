<template>
  <div
    v-if="!isLoading"
    class="bg-local min-h-screen"
    style="background-image: url(../background.jpg)"
  >
    <section v-if="lobbyInfo" class="flex flex-col min-h-screen">
      <div
        v-if="
          (!gameStarted && lobbyInfo.players.length < 2) ||
          (lobbyInfo.players[0] && !lobbyInfo.players[0].isReady) ||
          (lobbyInfo.players[1] && !lobbyInfo.players[1].isReady)
        "
      >
        Utilisateur dans le lobby :
        <div v-for="(player, idx) in lobbyInfo.players" :key="idx">
          <h1>{{ player.name }} : {{ player.isReady }}</h1>
        </div>
        <button
          v-if="!lobbyInfo.players[userNumber].isReady"
          type="submit"
          class="md:pl-2 flex items-center bg-red-400 hover:bg-red-600 text-white text-lg font-bold md:w-7 border mr-2 rounded-full focus:outline-none"
          @click="getReady()"
        >
          I'm ready!
        </button>
      </div>
      <div
        v-else-if="gameReady"
        class="flex items-stretch justify-center py-5 sm:py-10 flex-1 lg:px-15 min-h-screen"
      >
        <!-- L'adversaire n'a pas quitté ou abandonné -->
        <div
          v-if="!opponentSurrendered"
          class="rounded-lg border-1 shadow-2xl px-1 md:px-5 py-3 sm:border-2 xl:max-w-3/5 sm:w-screen"
        >
          <!-- Informations sur la partie -->
          <div
            v-if="currentQuestionNumber + 1 <= 10"
            class="flex justify-between h-5 w-full mb-8"
          >
            <div
              class="block md:flex text-left w-1/3 text-xs md:font-bold md:text-l"
            >
              <!-- Bouton retour au menu -->
              <div class="flex items-start md:items-center">
                <button
                  type="submit"
                  class="md:pl-2 flex items-center bg-red-400 hover:bg-red-600 text-white text-lg font-bold md:w-7 border mr-2 rounded-full focus:outline-none"
                  @click="$router.push('/lobby')"
                >
                  «
                </button>
              </div>
            </div>
            <div
              class="justify-center space-x-2 flex w-1/3 items-center text-xs md:font-bold md:text-l"
            >
              <img class="h-3 w-3 md:h-8 md:w-8" src="~/assets/img/check.png" />
              <p>{{ gameInfo.answers }}</p>
            </div>
            <div
              class="justify-end space-x-1 flex w-1/3 items-center text-xs md:font-bold md:text-l"
            >
              <img
                class="h-3 w-3 md:h-8 md:w-8"
                src="~/assets/img/questions.png"
              />
              <p>{{ currentQuestionNumber + 1 }}/{{ totalQuestions }}</p>
            </div>
          </div>
          <!-- Timer bar -->
          <div ref="timeBar">
            <!-- Progressbar -->
            <div
              v-if="currentQuestionNumber + 1 <= 10"
              class="flex h-4 bg-white w-5/6 bg-grey-light float-left rounded-full shadow-2xl md:mt-3"
            >
              <div
                class="h-4 bg-red-400 text-xs leading-none py-1 text-center rounded-full text-white"
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
          <!-- Question -->
          <div
            v-if="currentQuestionNumber < 10"
            class="block h-1/6 w-full mb-2"
          >
            <p
              class="block float-left w-full mt-5 text-l md:text-2xl font-bold tracking-wide text-gray-600"
            >
              {{ randomQuestions[currentQuestionNumber].question }}
            </p>
          </div>
          <!-- Message de fin de partie -->
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
            <p
              class="block text-center bottom-0 w-full mt-5 text-l md:text-2xl font-bold tracking-wide text-gray-600"
            >
              {{ gameInfo.answers }} / {{ totalQuestions }}
            </p>
            <!-- Bonne réponses -->
            <p
              class="block text-center bottom-0 w-full mt-5 text-l md:text-2xl font-bold tracking-wide text-gray-600"
            >
              Bonne réponses
            </p>
            <!-- Score -->
            <p
              class="block text-center bottom-0 w-full mt-5 text-l md:text-2xl font-bold tracking-wide text-gray-600"
            >
              Score : {{ gameInfo.score }} points
            </p>
            <!-- Gagné/Perdu/Egalité -->
            <p
              v-if="
                lobbyInfo.players[userNumber].score >
                lobbyInfo.players[opponentNumber].score
              "
              class="block text-center bottom-0 w-full mt-5 text-l md:text-2xl font-bold tracking-wide text-gray-600"
            >
              Vous avez gagné :D !
            </p>
            <p
              v-else-if="
                lobbyInfo.players[userNumber].score <
                lobbyInfo.players[opponentNumber].score
              "
              class="block text-center bottom-0 w-full mt-5 text-l md:text-2xl font-bold tracking-wide text-gray-600"
            >
              Vous avez perdu :(
            </p>
            <p
              v-else
              class="block text-center bottom-0 w-full mt-5 text-l md:text-2xl font-bold tracking-wide text-gray-600"
            >
              Egalité
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
          <!-- Réponses -->
          <div
            v-if="currentQuestionNumber + 1 <= 10"
            ref="buttons1"
            class="block w-full h-1/4 items-stretch justify-between text-center space-x-8"
          >
            <button type="submit" :class="defaultButtonClass" @click="play">
              {{ randomQuestions[currentQuestionNumber].propositions[0] }}
            </button>
            <button type="submit" :class="defaultButtonClass" @click="play">
              {{ randomQuestions[currentQuestionNumber].propositions[1] }}
            </button>
          </div>
          <div
            v-if="currentQuestionNumber + 1 <= 10"
            ref="buttons2"
            class="block w-full h-1/4 items-stretch justify-between text-center space-x-8 mb-5"
          >
            <button type="submit" :class="defaultButtonClass" @click="play">
              {{ randomQuestions[currentQuestionNumber].propositions[2] }}
            </button>
            <button type="submit" :class="defaultButtonClass" @click="play">
              {{ randomQuestions[currentQuestionNumber].propositions[3] }}
            </button>
          </div>
        </div>
        <!-- Si l'adversaire quitte ou abandonne -->
        <div v-else>L'adversaire a quitté GG!</div>
      </div>
    </section>
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
          this.$fire.database
            .ref('lobbies/' + this.$route.params.lobby)
            .update({
              state: 'finished',
            })
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
      isLoading: false, // Booleen indiquant si l'on doit afficher l'ecran de chargement ou pas
      historyRef: null, // Reference sur l'historique dans la base de données
      intervalId: null, // Identifiant pour la fonction setInterval du chronometre
      timer: 20, // Temps donné pour chaque question
      done: false, // Booléen décrivant si le round est terminé ou non
      lobbyRef: null, // Reference sur le lobby dans la base de données
      lobbyInfo: null, // Informations du lobby
      randomQuestions: [], // Liste aleatoire de questions
      defaultButtonClass:
        // CSS par défaut de chaque bouton
        'h-5/6 w-5/12 p-2 font-xl tracking-wider text-gray-700 border-2 border-gray-700 shadow-xl rounded-3xl focus:outline-none focus:border-gray-700 hover:font-bold hover:bg-gray-100 bg-white',
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
      opponentNumber: null, // Position de l'adversaire dans la base de données
      gameReady: false, // Booléen indiquant si la partie est prete à etre lancée ou non
      gameStarted: false, // Booléen indiquant si la partie a commencé ou non
      opponentSurrendered: false, // Booléen indiquant si l'adversaire a quitté ou abandonné
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
    this.lobbyRef.on('value', (snapshot) => {
      // Si le createur supprime le lobby on redirige l'autre joueur vers la liste des lobbies
      if (!snapshot.val()) {
        this.opponentSurrendered = true
        clearInterval(this.intervalId)
      }
      this.lobbyInfo = snapshot.val()
      // Si les infos existent et que la partie n'a pas commencé
      if (this.lobbyInfo) {
        if (!this.gameStarted) {
          // On verifie si la partie est prete à etre lancée
          this.gameReady =
            this.lobbyInfo.players.length > 1 &&
            this.lobbyInfo.players[0].isReady &&
            this.lobbyInfo.players[1].isReady
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
        } else {
          // On verifie si les deux utilisateurs ont terminé
          this.done =
            this.lobbyInfo.players[0].isDone && this.lobbyInfo.players[1].isDone
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
              5000
            )
          }
        }
      }
    })
    // On recupere les questions du theme choisi et son nom
    if (this.lobbyInfo) {
      this.randomQuestions = this.lobbyInfo.questions
      this.gameInfo.theme = this.lobbyInfo.theme.name
    }
    // On recupere les positions dans la bdd de l'utilisateur et de son adversaire
    if (
      this.lobbyInfo &&
      this.lobbyInfo.creator.uid === this.$fire.auth.currentUser.uid
    ) {
      this.userNumber = 0
      this.opponentNumber = 1
    } else {
      this.userNumber = 1
      this.opponentNumber = 0
    }
  },
  beforeMount() {
    // On ajoute un ecouteur d'evenements pour voir si l'utilisateur est encore sur la page
    window.addEventListener('beforeunload', this.preventNav)
    window.addEventListener('unload', this.browserClosedHandler)
  },
  beforeDestroy() {
    // On supprime l'ecouteur d'evenements
    window.removeEventListener('beforeunload', this.preventNav)
    window.removeEventListener('unload', this.browserClosedHandler)
  },
  methods: {
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
        this.$fire.database.ref('lobbies/' + this.$route.params.lobby).update({
          state: 'finished',
        })
      }
      clearInterval(this.intervalId)
    },
    // Fonction qui s'execute apres l'evenement beforeunload
    preventNav(event) {
      event.preventDefault()
      event.returnValue = ''
    },
    // Methode qui permet à l'utilisateur de se mettre pret
    getReady() {
      this.lobbyRef.child('players/' + this.userNumber).update({
        isReady: true,
      })
    },
    play(e) {
      e.preventDefault()
      // On stop et cache le timer
      clearInterval(this.intervalId)
      this.$refs.timeBar.className += 'hidden'
      // On desactive les boutons
      const buttons1 = this.$refs.buttons1.children
      const buttons2 = this.$refs.buttons2.children
      buttons1.forEach((b) => (b.disabled = true))
      buttons2.forEach((b) => (b.disabled = true))
      // On récupere la réponse cliquée
      const userAnswer = e.target.innerText
      const rightAnswer = this.randomQuestions[this.currentQuestionNumber]
        .réponse
      if (userAnswer === rightAnswer) {
        // Bonne réponse
        // On la met en vert
        e.target.className = e.target.className
          .replace('hover:bg-gray-100', '')
          .replace('bg-white', 'bg-green-400')
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
        e.target.className = e.target.className
          .replace('hover:bg-gray-100', '')
          .replace('bg-white', 'bg-red-400')
        // On met la bonne réponse en vert
        const buttons1 = this.$refs.buttons1.children
        const buttons2 = this.$refs.buttons2.children
        buttons1.forEach(function (b) {
          if (b.innerText === rightAnswer) {
            b.className = b.className
              .replace('hover:bg-gray-100', '')
              .replace('bg-white', 'bg-green-400')
          }
        })
        buttons2.forEach(function (b) {
          if (b.innerText === rightAnswer) {
            b.className = b.className
              .replace('hover:bg-gray-100', '')
              .replace('bg-white', 'bg-green-400')
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
      const buttons1 = this.$refs.buttons1.children
      const buttons2 = this.$refs.buttons2.children
      buttons1.forEach((b) => (b.disabled = false))
      buttons2.forEach((b) => (b.disabled = false))
      // On passe à la prochaine question
      this.currentQuestionNumber++
      if (this.currentQuestionNumber < 10) {
        // On remet les boutons à zero
        const buttons1 = this.$refs.buttons1.children
        const buttons2 = this.$refs.buttons2.children
        buttons1.forEach((b) => (b.className = this.defaultButtonClass))
        buttons2.forEach((b) => (b.className = this.defaultButtonClass))
        // On affiche et remet le chrono à zero et on relance le decompte
        this.$refs.timeBar.className = this.$refs.timeBar.className.replace(
          'hidden',
          ' '
        )
        this.timer = 20
        this.intervalId = setInterval(this.countdown, 1000)
      } else {
        clearInterval(this.intervalId)
        // On se connecte à la base de données pour sauvegarder l'historique
        if (!this.$fire.auth.currentUser.isAnonymous) {
          console.log('finito')
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
        const buttons1 = this.$refs.buttons1.children
        const buttons2 = this.$refs.buttons2.children
        buttons1.forEach((b) => (b.disabled = true))
        buttons2.forEach((b) => (b.disabled = true))
        clearInterval(this.intervalId)
        // On met la bonne réponse en vert
        const rightAnswer = this.randomQuestions[this.currentQuestionNumber]
          .réponse
        buttons1.forEach(function (b) {
          if (b.innerText === rightAnswer) {
            b.className = b.className
              .replace('hover:bg-gray-100', '')
              .replace('bg-white', 'bg-green-400')
          }
        })
        buttons2.forEach(function (b) {
          if (b.innerText === rightAnswer) {
            b.className = b.className
              .replace('hover:bg-gray-100', '')
              .replace('bg-white', 'bg-green-400')
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
