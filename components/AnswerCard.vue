<template>
  <div
    class="flex items-center justify-center w-full p-2 my-3 transition ease-out transform scale-95 rounded-lg shadow-xl cursor-pointer h-15 md:h-50 md:w-1/2 hover:bg-indigo-600 hover:scale-100 border-1 hover:border-bg-indigo-400 hover:shadow-2xl"
    :class="{
      'bg-green-600': isCorrect,
      'bg-red-600': isFalse,
      'bg-indigo-900': !isFalse && !isCorrect,
    }"
  >
    <h2 class="text-xl text-center text-gray-100">Abeille blanche</h2>
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
    isCorrect: {
      type: Boolean,
      default: false,
    },
    isFalse: {
      type: Boolean,
      default: false,
    },
    players: {
      type: [String, Number],
      default: '19',
    },
  },
}
</script>

<style lang="scss" scoped></style>
