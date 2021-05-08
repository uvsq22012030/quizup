<template>
  <div
    class="flex items-center justify-between w-full p-2 my-3 transition duration-100 ease-in-out transform scale-95 bg-indigo-900 rounded-lg shadow-xl cursor-pointer hover:bg-indigo-600 hover:scale-100 border-1 hover:border-bg-indigo-400 hover:shadow-2xl"
  >
    <div>
      <h2 class="text-lg font-bold text-gray-100 capitalize">
        {{ label.split('_').join(' ') }} -
        <span class="text-indigo-400">HOST: {{ user }}</span>
      </h2>
      <p class="text-gray-100 text">{{ players }} Joueurs</p>
    </div>
    <div>
      <p>status</p>
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
    players: {
      type: [String, Number],
      default: '19',
    },
  },
}
</script>

<style lang="scss" scoped></style>
