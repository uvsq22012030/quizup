<template>
  <div
    class="bg-local min-h-screen"
    style="background-image: url(background.jpg)"
  >
    <section class="flex flex-col min-h-screen">
      <div
        class="flex items-stretch justify-center py-5 sm:py-10 flex-1 lg:px-15 min-h-screen"
      >
        <div
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
                  @click="$router.push('/')"
                >
                  «
                </button>
                <!-- Difficulté 
                <div class="w-auto space-x-3 text-left md:flex md:items-center">
                  Difficulté
                  <div class="flex items-center md:mt-2 mb-4 md:mb-3">
                    <svg
                      v-for="i in Object.keys(randomQuestions).length"
                      :key="i"
                      :class="[
                        i <= Object.keys(randomQuestions).indexOf(difficulty) + 1
                          ? 'text-yellow-500'
                          : 'text-gray-400',
                        'mx-1 w-4 h-4 fill-current',
                      ]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                      />
                    </svg>
                  </div>
                </div>
                -->
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
          <div v-if="isTimed" ref="timeBar">
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
              v-if="currentQuestionNumber + 1 <= 10"
              class="flex bg-none right-5 object-fill h-5 w-10 md:h-12 md:w-20"
              src="~/assets/img/hourglass.gif"
            />
          </div>
          <!-- Question -->
          <div
            v-if="currentQuestionNumber + 1 <= 10"
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
            <p
              class="block text-center bottom-0 w-full mt-5 text-l md:text-2xl font-bold tracking-wide text-gray-600"
            >
              Bonne réponses
            </p>
            <div
              class="flex w-full h-1/4 items-stretch justify-center text-center space-x-8 mt-5"
            >
              <button
                class="h-1/2 w-1/3 p-2 text-sm md:text-lg font-bold tracking-wider text-white bg-red-400 border-0 rounded-2xl shadow-2xl focus:outline-none hover:bg-red-600 md:hover:text-xl"
                type="submit"
                @click="retry"
              >
                Rejouer
              </button>
              <button
                class="h-1/2 w-1/3 p-2 text-sm md:text-lg font-bold tracking-wider text-white bg-red-400 border-0 rounded-2xl shadow-2xl focus:outline-none hover:bg-red-600 md:hover:text-xl"
                type="submit"
                @click="$router.push('/')"
              >
                Revenir au menu
              </button>
            </div>
          </div>
          <!-- Réponses -->
          <div
            v-if="currentQuestionNumber + 1 <= 10"
            ref="buttons1"
            class="block w-full h-1/4 items-stretch justify-between text-center space-x-8"
          >
            <button
              :disabled="done"
              type="submit"
              :class="defaultButtonClass"
              @click="play"
            >
              {{ randomQuestions[currentQuestionNumber].propositions[0] }}
            </button>
            <button
              :disabled="done"
              type="submit"
              :class="defaultButtonClass"
              @click="play"
            >
              {{ randomQuestions[currentQuestionNumber].propositions[1] }}
            </button>
          </div>
          <div
            v-if="currentQuestionNumber + 1 <= 10"
            ref="buttons2"
            class="block w-full h-1/4 items-stretch justify-between text-center space-x-8 mb-5"
          >
            <button
              :disabled="done"
              type="submit"
              :class="defaultButtonClass"
              @click="play"
            >
              {{ randomQuestions[currentQuestionNumber].propositions[2] }}
            </button>
            <button
              :disabled="done"
              type="submit"
              :class="defaultButtonClass"
              @click="play"
            >
              {{ randomQuestions[currentQuestionNumber].propositions[3] }}
            </button>
          </div>
          <div v-if="currentQuestionNumber + 1 <= 10 && done">
            <!-- Anecdote -->
            <div class="block h-auto w-full space-y-2 mt-2">
              <hr class="w-full border-t" />
              <div class="text-left flex flex-shrink-0 text-gray-800 mr-auto">
                <img
                  class="mr-1 top-0 object-fill h-3 w-3 md:h-6 md:w-6"
                  src="~/assets/img/lamp.png"
                />
                <p
                  class="block float-left w-full text-xs md:text-xl font-bold tracking-wider text-gray-600"
                >
                  Anecdote :
                  {{ randomQuestions[currentQuestionNumber].anecdote }}
                </p>
              </div>
            </div>
            <!-- Bouton suivant -->
            <div class="block h-auto w-full mb-5">
              <button
                type="submit"
                class="float-right h-full w-1/4 md:w-1/6 sm:p-2 text-xs md:text-l tracking-wider text-gray-700 bg-white border-2 border-gray-700 shadow-xl rounded-xl focus:outline-none focus:border-gray-700 hover:bg-gray-100 hover:font-bold"
                @click="nextQuestion"
              >
                Suivant »
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
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
    // On se connecte à la base de données
    this.historyRef = this.$fire.database.ref(
      'history/' + this.$fire.auth.currentUser.uid
    )
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
    play(e) {
      e.preventDefault()
      // On stop et cache le timer
      if (this.isTimed) {
        clearInterval(this.intervalId)
        this.$refs.timeBar.className += 'hidden'
      }
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
        if (this.isTimed) {
          // On calcule le score de la question
          this.gameInfo.score += Math.max(0, this.timer) * 20
          // On l'enregistre dans la base de données
          this.historyRef.child(this.gameKey).update({
            score: this.gameInfo.score,
            answers: this.gameInfo.answers,
          })
        }
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
      this.done = true
    },
    nextQuestion(e) {
      e.preventDefault()
      // On passe à la prochaine question
      this.currentQuestionNumber++
      if (this.currentQuestionNumber < 10) {
        // On remet les boutons à zero
        const buttons1 = this.$refs.buttons1.children
        const buttons2 = this.$refs.buttons2.children
        buttons1.forEach((b) => (b.className = this.defaultButtonClass))
        buttons2.forEach((b) => (b.className = this.defaultButtonClass))
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
    retry(e) {
      e.preventDefault()
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
      // On cree une nouvelle partie dans l'historique
      this.gameKey = this.historyRef.push(this.gameInfo).key
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
        // On cache le timer
        // On termine le tour
        this.$refs.timeBar.className += 'hidden'
        this.done = true
      }
    },
  },
}
</script>

<style></style>
