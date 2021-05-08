<template>
  <div
    class="flex items-center justify-center w-full p-3 my-3 transition duration-300 ease-in-out transform scale-95 bg-indigo-900 rounded-lg shadow-xl cursor-pointer hover:bg-indigo-600 hover:scale-100 border-1 hover:border-bg-indigo-400 lg:h-25 hover:shadow-2xl"
  >
    <h2 class="font-bold text-center text-gray-100 capitalize lg:text-2xl">
      {{ label.split('_').join(' ') }}
    </h2>
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
  },
}
</script>

<style lang="scss" scoped></style>
