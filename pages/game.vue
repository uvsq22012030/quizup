<template>
  <div>
    <div class="relative h-screen overflow-hidden bg-indigo-900">
      <img
        src="~/assets/img/Rainbow-Vortex.svg"
        class="absolute object-cover w-full h-full"
      />
      <div
        class="absolute inset-0 opacity-25 bg-gradient-to-tr from-indigo-400 via-indigo-600 to-black"
      ></div>
      <div
        class="container relative h-full px-1 py-1 mx-auto md:px-12 md:py-12 z-1"
      >
        <!-- Partie en cours -->
        <div
          v-if="currentQuestionNumber < 10"
          class="w-full h-full p-3 border-indigo-900 shadow-xl md:p-8 border-3 md:border-12 rounded-xl"
        >
          <div class="flex items-center justify-between w-full">
            <div class="w-1/3">
              <radial-progress-bar
                v-if="currentQuestionNumber < 10 && isTimed"
                ref="timeBar"
                :diameter="100"
                :completed-steps="timer * 5"
                :total-steps="100"
              >
                <p class="text-xl text-white">{{ timer }}</p>
              </radial-progress-bar>
            </div>

            <p
              class="w-1/3 mx-3 text-xl font-bold tracking-widest text-center text-yellow-400 md:text-4xl"
            >
              {{ gameInfo.answers }}
            </p>
            <p
              class="w-1/3 mx-3 text-xl font-bold tracking-widest text-right text-indigo-400 md:text-4xl"
            >
              {{ currentQuestionNumber + 1 }}
              <span class="text-base">/{{ totalQuestions }}</span>
            </p>
          </div>
          <!-- Chrono -->

          <div class="flex h-full mt-5">
            <div
              class="w-full h-full p-5 overflow-y-scroll bg-indigo-900 rounded-md shadow-xl"
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
                  ref="answerCards"
                  :disabled="done"
                  :label="
                    randomQuestions[currentQuestionNumber].propositions[index]
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
              <!-- Anecdote -->
              <div v-if="currentQuestionNumber < 10 && done" class="">
                <div class="flex items-center justify-center w-full">
                  <img
                    class="object-fill mr-3 w-7 h-7"
                    src="~/assets/img/mental-health.svg"
                  />
                  <h1 class="text-sm text-indigo-300 max-w-max">
                    {{ randomQuestions[currentQuestionNumber].anecdote }}
                  </h1>
                </div>
                <button
                  type="button"
                  class="flex items-center justify-center w-full p-3 mx-2 mt-5 text-white transform scale-90 bg-indigo-800 rounded-lg shadow-xl hover:bg-indigo-600 hover:scale-95 h-14"
                  @click="nextQuestion"
                >
                  <div class="mr-3">
                    <img
                      class="object-fill w-10 p-1"
                      src="~/assets/img/next.svg"
                    />
                  </div>
                  <div>
                    <div class="text-sm text-left">PROCHAINE</div>
                    <div class="-mt-1 font-sans font-semibold lg:text-xl">
                      QUESTION
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Fin de partie -->
        <div
          class="container relative h-full px-1 py-1 mx-auto md:px-12 md:py-12 z-1"
        >
          <div
            class="flex flex-col items-center w-full h-full p-3 mt-6 space-y-2 border-indigo-900 shadow-xl md:p-8 border-3 md:border-12 rounded-xl"
          >
            <h1 class="py-8 text-4xl text-center text-gray-100">
              Partie terminée
            </h1>
            <div class="w-1/2 my-5 h-50">
              <img
                class="object-contain w-full h-full"
                src="~/assets/img/finish-line.svg"
              />
            </div>
            <h1 class="my-8 text-4xl font-bold text-center text-gray-100">
              Bonnes réponses : {{ gameInfo.answers }} / {{ totalQuestions }}
            </h1>
            <h1
              v-if="isTimed"
              class="text-4xl font-bold text-center text-gray-100"
            >
              Score : {{ gameInfo.score }} points
            </h1>
            <div class="flex items-center justify-center space-x-2">
              <button
                type="button"
                class="flex items-center justify-center w-full p-4 m-3 text-white transform scale-100 bg-indigo-800 rounded-lg shadow-xl lg:w-1/2 hover:bg-indigo-600 hover:scale-105 h-14"
                @click="$router.push('/')"
              >
                <div class="">
                  <img
                    class="object-fill w-10 p-1"
                    src="~/assets/img/back.svg"
                  />
                </div>
                <div
                  class="ml-2 -mt-1 font-sans font-semibold capitalize lg:text-base"
                >
                  RETOUR
                </div>
              </button>
              <button
                type="button"
                class="flex items-center justify-center w-full p-4 m-3 text-white transform scale-100 bg-indigo-800 rounded-lg shadow-xl lg:w-1/2 hover:bg-indigo-600 hover:scale-105 h-14"
                @click="retry()"
              >
                <div class="">
                  <img
                    class="object-fill w-10 p-1"
                    src="~/assets/img/circular-arrow.png"
                  />
                </div>
                <div
                  class="ml-2 -mt-1 font-sans font-semibold capitalize lg:text-base"
                >
                  REJOUER
                </div>
              </button>
            </div>
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
  data() {
    return {
      historyRef: null, // Reference sur l'historique dans la base de données
      intervalId: null, // Identifiant pour la fonction setInterval du chronometre
      isTimed: this.$route.params.isTimed, // Booléen décrivant le mode de jeu (Chrono/Normal)
      timer: 20, // Temps donné pour chaque question
      done: false, // Booléen décrivant si l'utilisateur a repondu ou non à la question courante
      theme: [],
      randomQuestions: [], // Liste aleatoire de questions
      currentQuestionNumber: 0, // Numero de la question courante
      totalQuestions: 10, // Nombre total de questions
      gameInfo: {
        // Informations de la partie qui seront stockées dans l'historique
        date: new Date().toLocaleDateString(),
        theme: this.$route.params.themeName,
        type: 'Solo',
        score: 0,
        answers: 0,
      },
      options: {
        text: {
          color: '#FFFFFF',
          shadowEnable: true,
          shadowColor: '#000000',
          hideText: true,
        },
        progress: {
          color: '#2dbd2d',
          backgroundColor: '#333333',
        },
        layout: {
          height: 100,
          width: 150,
          verticalTextAlign: 61,
          horizontalTextAlign: 43,
          zeroOffset: 0,
          strokeWidth: 30,
          progressPadding: 5,
          type: 'circle',
        },
      },
      gameKey: null, // Clé de la partie dans la base de donnée
    }
  },
  head() {
    return {
      title: 'Play uvsQuiz - Révolution du Trivia',
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
    if (!this.$fire.auth.currentUser.isAnonymous) {
      // On se connecte à la base de données
      this.historyRef = this.$fire.database.ref(
        'history/' + this.$fire.auth.currentUser.uid
      )
    }
    // On recupere le theme choisi et on selectionne 10 questions au hasard parmis les 30
    this.theme = this.$route.params.theme
    this.randomQuestions = this.shuffleJsonArray(this.theme.questions).slice(
      0,
      10
    )
  },
  mounted() {
    // Si le mode choisi est le mode Chrono alors on lance le décompte et on enregistre la partie dans la base de données
    if (this.$route.params.isTimed) {
      if (!this.$fire.auth.currentUser.isAnonymous)
        this.gameKey = this.historyRef.push(this.gameInfo).key
      this.intervalId = setInterval(this.countdown, 1000)
    }
  },
  methods: {
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
    play(userAnswer, index) {
      // On stop et cache le timer
      if (this.isTimed) {
        clearInterval(this.intervalId)
        this.$refs.timeBar.className += 'hidden'
      }
      // On compare la réponse cliquée
      const rightAnswer = this.randomQuestions[this.currentQuestionNumber]
        .réponse
      if (userAnswer === rightAnswer) {
        // Bonne réponse
        // On la met en vert
        this.$refs.answerCards[index].isCorrect = true
        // On augmente le nombre de bonne réponses
        this.gameInfo.answers += 1
        if (this.isTimed) {
          // On calcule le score de la question
          this.gameInfo.score += Math.max(0, this.timer) * 20
          console.log(this.gameInfo.score)
          if (!this.$fire.auth.currentUser.isAnonymous) {
            // On l'enregistre dans la base de données
            this.historyRef.child(this.gameKey).update({
              score: this.gameInfo.score,
              answers: this.gameInfo.answers,
            })
          }
        }
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
      this.done = true
    },
    nextQuestion() {
      // On passe à la prochaine question
      this.currentQuestionNumber++
      if (this.currentQuestionNumber < 10) {
        // On remet les boutons à zero
        this.$refs.answerCards.forEach(function (b) {
          b.isFalse = false
          b.isCorrect = false
        })
        // On cache l'anecdote et le bouton suivant
        this.done = false
        if (this.isTimed) {
          // On affiche et remet le chrono à zero et on relance le decompte
          this.$refs.timeBar.className = this.$refs.timeBar.className.replace(
            'hidden',
            ' '
          )
          this.timer = 20
          this.intervalId = setInterval(this.countdown, 1000)
        }
      } else clearInterval(this.intervalId)
    },
    retry() {
      // On cache l'anectode et le bouton suivant
      this.done = false
      // On tire 10 questions au hasard
      this.randomQuestions = this.shuffleJsonArray(this.theme.questions).slice(
        0,
        10
      )
      // On remet le score et les questions à zero
      this.gameInfo.answers = 0
      this.gameInfo.score = 0
      this.gameInfo.date = new Date().toLocaleDateString()
      this.currentQuestionNumber = 0
      if (!this.$fire.auth.currentUser.isAnonymous) {
        // On cree une nouvelle partie dans l'historique
        this.gameKey = this.historyRef.push(this.gameInfo).key
      }
      // On remet le chrono à zero
      this.timer = 20
      // On relance le decompte
      this.intervalId = setInterval(this.countdown, 1000)
    },
    countdown() {
      // On decremente le compteur
      this.timer -= 1
      // Fin du chronometre
      if (!this.timer) {
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
        this.done = true
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
