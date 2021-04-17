<template>
  <div class="bg-local" style="background-image: url(background.jpg)">
    <!-- component -->
    <section class="flex flex-col min-h-screen">
      <div class="flex items-center justify-center flex-1">
        <div
          class="bg-white w-full px-4 py-16 text-center rounded-lg sm:border-2 lg:px-24 lg:max-w-xl sm:max-w-md"
        >
          <form class="text-center">
            <div class="flex items-center justify-center flex-1">
              <img class="object-fill h-50 w-55" src="~/assets/img/tick.png" />
            </div>
            <h1
              class="w-full mb-8 text-3xl font-bold tracking-wider text-red-400"
            >
              Registration successful !
            </h1>
            <div class="w-full mb-3 text-2xl tracking-wider text-gray-600">
              <h2>Click on the button below to continue</h2>
            </div>
            <div class="mb-6 text-center">
              <button
                type="submit"
                class="block w-full p-2 font-bold tracking-wider text-white bg-red-400 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700 hover:bg-red-600"
                @click="goToIndex"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    goToIndex(e) {
      e.preventDefault()
      this.$router.push('/')
    },
  },
}
</script>

<style></style>
