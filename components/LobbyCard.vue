<template>
  <div
    class="flex flex-wrap items-center justify-between w-full p-2 my-3 transition duration-100 ease-in-out transform scale-95 bg-indigo-900 rounded-lg shadow-xl cursor-pointer hover:bg-indigo-600 hover:scale-100 border-1 hover:border-bg-indigo-400 hover:shadow-2xl"
  >
    <div class="w-2/3">
      <h2 class="text-lg font-bold text-gray-100 capitalize">
        {{ label.split('_').join(' ') }} -
        <span class="text-indigo-400">HOST: {{ user }}</span>
      </h2>
      <p class="text-gray-100 text">{{ players }} Joueur(s)</p>
    </div>
    <div class="w-1/3 p-2">
      <p class="text-right text-gray-100 capitalize">{{ status }}</p>
    </div>
    <div class="w-full py-1">
      <button
        type="button"
        class="flex items-center justify-center w-full text-white transform scale-100 bg-indigo-800 rounded-lg shadow-xl hover:bg-indigo-600 hover:scale-105 h-14"
        @click="$emit('click')"
      >
        <div class="mr-3">
          <img
            class="object-fill w-10 p-1"
            src="~/assets/img/play-button.svg"
          />
        </div>
        <div v-if="status !== 'En cours'">
          <div class="-mt-1 font-sans font-semibold lg:text-xl">REJOINDRE</div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameCard',
  props: {
    label: {
      type: String,
      default: '',
    },
    user: {
      type: String,
      default: 'hello',
    },
    status: {
      type: String,
      default: 'hello',
    },
    players: {
      type: [String, Number],
      default: '19',
    },
  },
}
</script>

<style lang="scss" scoped></style>
