<template>
  <div>
    <!-- component -->
    <section class="flex flex-col min-h-screen">
      <div class="flex items-center justify-center flex-1">
        <div
          class="w-full px-4 py-16 text-center rounded-lg sm:border-2 lg:px-24 lg:max-w-xl sm:max-w-md"
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
              Login
            </h1>
            <div class="py-2 text-left">
              <input
                type="email"
                class="block w-full px-4 py-2 bg-gray-100 bg-gray-200 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700"
                placeholder="Email"
              />
            </div>
            <div class="py-2 text-left">
              <input
                type="password"
                class="block w-full px-4 py-2 bg-gray-100 bg-gray-200 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700"
                placeholder="Password"
              />
            </div>
            <div class="py-2">
              <button
                type="submit"
                class="block w-full p-2 font-bold tracking-wider text-white bg-red-400 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-700 hover:bg-red-600"
              >
                Sign In
              </button>
            </div>
          </form>
          <div class="text-center">
            <NuxtLink to="/forgot-pass" class="hover:underline"
              >Forgot password?</NuxtLink
            >
          </div>
          <div class="mt-12 text-center">
            <span> Don't have an account? </span>
            <NuxtLink
              to="/signup"
              class="font-light font-semibold text-red-400 underline text-md hover:text-red-600"
              >Create one</NuxtLink
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
