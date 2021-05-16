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
            <n-link to="/">
              <img src="~/assets/img/back.svg" class="object-fill w-5 h-5" />
            </n-link>
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
          <div v-if="isTimed" ref="timeBar">
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
                  :label="
                    randomQuestions[currentQuestionNumber].propositions[index]
                  "
                  ref="answerCards"
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
              <div
                v-if="currentQuestionNumber < 10 && done"
                class="flex items-center justify-between"
              >
                <div class="text-left flex flex-shrink-0 mr-auto">
                  <img
                    class="mr-1 top-0 object-fill h-3 w-3 md:h-6 md:w-6"
                    src="~/assets/img/lamp.png"
                  />
                  <h1
                    class="block float-left text-center text-indigo-300 text-md max-w-max"
                  >
                    {{ randomQuestions[currentQuestionNumber].anecdote }}
                  </h1>
                </div>
                <button
                  class="float-right h-full w-auto sm:p-2 outline-none bg-indigo-900 border-0 focus:outline-none bg-opacity-0"
                  @click="nextQuestion"
                >
                  <img
                    class="object-fill w-8 h-8 lg:h-15 lg:w-15 animate-bounce outline-none focus:outline-none"
                    src="~/assets/img/right-arrow.svg"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Fin de partie -->
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      historyRef: null, // Reference sur l'historique dans la base de données
      intervalId: null, // Identifiant pour la fonction setInterval du chronometre
      isTimed: this.$route.params.isTimed, // Booléen décrivant le mode de jeu (Chrono/Normal)
      timer: 20, // Temps donné pour chaque question
      done: false, // Booléen décrivant si l'utilisateur a repondu ou non à la question courante
      theme: [],
      randomQuestions: [], // Liste aleatoire de questions
      defaultButtonClass:
        // CSS par défaut de chaque bouton
        'h-5/6 w-5/12 p-2 font-xl tracking-wider text-gray-700 border-2 border-gray-700 shadow-xl rounded-3xl focus:outline-none focus:border-gray-700 hover:font-bold hover:bg-gray-100 bg-white',
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
      gameKey: null, // Clé de la partie dans la base de donnée
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
