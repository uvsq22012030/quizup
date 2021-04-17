<template>
  <div class="bg-local" style="background-image: url(background.jpg)">
    <!-- component -->
    <section class="flex flex-col min-h-screen">
      <div class="flex items-center justify-center flex-1">
        <div
          class="w-full px-4 py-5 text-center bg-white rounded-lg sm:border-2 lg:px-24 lg:max-w-xl sm:max-w-md"
        >
          <form class="text-center">
            <div class="flex items-center justify-center flex-1">
              <img
                class="object-fill h-50 w-55"
                src="~/assets/img/question-mark.png"
              />
            </div>
            <h1
              class="w-full mb-8 text-3xl font-bold tracking-wider text-gray-600"
            >
              Sign up
            </h1>
            <div class="py-2 text-left">
              <input
                v-model="username"
                type="text"
                class="block w-full px-4 py-2 bg-gray-100 bg-gray-200 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700"
                placeholder="Username"
              />
            </div>
            <div class="py-2 text-left">
              <input
                v-model="email"
                type="email"
                class="block w-full px-4 py-2 bg-gray-100 bg-gray-200 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700"
                placeholder="Email"
              />
            </div>
            <div class="py-2 text-left">
              <input
                v-model="password"
                type="password"
                class="block w-full px-4 py-2 bg-gray-100 bg-gray-200 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700"
                placeholder="Password"
              />
            </div>
            <div class="py-2 text-left">
              <input
                v-model="confirm_password"
                type="password"
                class="block w-full px-4 py-2 bg-gray-100 bg-gray-200 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700"
                placeholder="Confirm password"
              />
            </div>
            <div class="py-2">
              <button
                class="block w-full p-2 font-bold tracking-wider text-white bg-red-400 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700 hover:bg-red-600"
                @click="createUser"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div class="mt-12 text-center">
            <span> Already have an account? </span>
            <NuxtLink
              to="/login"
              class="font-light font-semibold text-red-400 underline uppercase text-md hover:text-red-600"
              >Sign in</NuxtLink
            >
          </div>
        </div>
        <!--Popup-->
        <div
          class="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center"
        >
          <div
            class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
          ></div>
          <div
            class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
          >
            <div class="modal-content py-4 text-left px-6">
              <!--Icon-->
              <div class="flex items-center justify-center flex-1">
                <img
                  class="object-fill h-50 w-55"
                  src="~/assets/img/tick.png"
                />
              </div>
              <!--Title-->
              <div class="flex justify-between items-center pb-3">
                <p class="text-2xl text-center font-bold">
                  Registration successful !
                </p>
              </div>
              <!--Body-->
              <p>Please click on the button below to continue.</p>
              <!--Footer-->
              <div class="flex justify-end pt-2">
                <button
                  class="block w-full p-2 font-bold tracking-wider text-white bg-red-400 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700 hover:bg-red-600"
                  @click="goToIndex"
                >
                  Continue
                </button>
              </div>
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
      username: '',
      email: '',
      password: '',
      confirm_password: '',
    }
  },
  methods: {
    async createUser(e) {
      e.preventDefault()
      if (!this.username) {
        alert('Please enter a username')
      }
      if (!this.confirm_password) {
        alert('Please confirm password')
      } else if (this.confirm_password !== this.password) {
        alert('Password confirmation is wrong')
      } else {
        try {
          await this.$fire.auth.createUserWithEmailAndPassword(
            this.email,
            this.password
          )
          this.$fire.auth.currentUser.updateProfile({
            displayName: this.username,
          })
          const body = document.querySelector('body')
          const modal = document.querySelector('.modal')
          modal.classList.toggle('opacity-0')
          modal.classList.toggle('pointer-events-none')
          body.classList.toggle('modal-active')
        } catch (e) {
          alert(e)
        }
      }
    },
    goToIndex(e) {
      e.preventDefault()
      this.$router.push('/')
    },
  },
}
</script>

<style>
input:checked + label {
  background-color: #f87171;
}
</style>
