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
        <div
          class="w-full h-full p-3 border-indigo-900 shadow-xl md:p-8 border-3 md:border-12 rounded-xl"
        >
          <div class="flex items-center justify-between w-full">
            <n-link to="/">
              <img src="~/assets/img/back.svg" class="object-fill w-5 h-5" />
            </n-link>

            <div class="flex items-center justify-center">
              <div class="flex -space-x-1 overflow-x-scroll">
                <img
                  class="inline-block w-5 h-5 rounded-full ring-1"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <img
                  class="inline-block w-5 h-5 rounded-full ring-1"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <img
                  class="inline-block w-5 h-5 rounded-full ring-1"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                  alt=""
                />
                <img
                  class="inline-block w-5 h-5 rounded-full ring-1"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
            </div>

            <p
              class="mx-3 text-xl font-bold tracking-widest text-yellow-400 md:text-4xl"
            >
              12
            </p>
            <p
              class="mx-3 text-xl font-bold tracking-widest text-indigo-400 md:text-4xl"
            >
              3<span class="text-base">/10</span>
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
                Quelle abeille est la grande favorite de l'apiculture en Europe
                ?
              </h1>
              <div class="flex flex-wrap w-full my-10">
                <AnswerCard v-for="(n, index) in 4" :key="index"></AnswerCard>
              </div>
              <h1 class="mt-4 text-center text-indigo-300 text-md">
                Un exemple d'anecdote à la reponse donnée plus haut
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    }
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped></style>
