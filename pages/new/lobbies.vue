<template>
  <div>
    <div class="relative h-screen overflow-hidden bg-indigo-900">
      <img
        src="~/assets/img/Rose-Petals.svg"
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
          <div class="flex items-center justify-center w-full">
            <n-link to="/">
              <img
                class="object-fill w-10 h-10 md:h-15 md:w-15"
                src="~/assets/img/logo.svg"
              />
            </n-link>
            <p
              class="mx-3 text-xl font-bold tracking-widest text-gray-200 md:text-4xl"
            >
              LOBBIES
            </p>
          </div>
          <div class="flex h-full mt-5">
            <div
              class="w-full h-full p-5 overflow-y-auto bg-indigo-900 rounded-md shadow-xl"
              style="height: 90%"
            >
              <div class="w-full h-full">
                <LobbyCard
                  v-for="(theme, index) in resultQuery"
                  :key="index"
                  :label="theme.name"
                ></LobbyCard>
              </div>
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
      fetchedThemes: [],
    }
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.fetchedThemes.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(' ')
            .every((v) => item.name.toLowerCase().includes(v))
        })
      } else {
        return this.fetchedThemes
      }
    },
  },
  mounted() {
    this.fetchThemes()
  },
  methods: {
    // Recuperation des theme à partir de l'API
    async fetchThemes() {
      try {
        const json = await this.$axios.get(
          'https://enigmatic-stream-69193.herokuapp.com/categories'
        )
        // On recupere les themes
        this.fetchedThemes = json.data
        // On reformatte le nom de chaque theme pour l'inserer dans la liste des suggestions de la barre de recherche
        this.fetchedThemes.forEach((theme) => {
          this.searchSuggestions.push(this.format(theme.name))
        })
        // On récupere 15 thèmes à la une
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
