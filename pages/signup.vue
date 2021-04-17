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
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirm_password: '',
    }
  },
  methods: {
    async createUser(e) {
      e.preventDefault()
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
          this.$store.commit('SET_REGISTER', true)
          console.log('Signup: ' + this.$store.state.register)
          this.$router.push('/register_success')
        } catch (e) {
          alert(e)
        }
      }
    },
  },
}
</script>

<style>
input:checked + label {
  background-color: #f87171;
}
</style>
