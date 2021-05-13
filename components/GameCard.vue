<template>
  <div
    class="flex items-center justify-center w-full p-3 my-3 transition duration-300 ease-in-out transform scale-95 bg-indigo-900 rounded-lg shadow-xl cursor-pointer glassomorphism hover:bg-indigo-600 hover:scale-100 border-1 hover:border-bg-indigo-400 lg:h-25 hover:shadow-2xl"
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

<style lang="scss" scoped>
.glassomorphism {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
