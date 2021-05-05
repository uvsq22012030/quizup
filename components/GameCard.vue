<template>
  <div>
    <div
      class="inline-block px-8 py-8 transition duration-150 transform scale-100 hover:scale-105"
    >
      <div
        class="max-w-xs p-5 overflow-hidden transition-shadow duration-300 ease-in-out bg-white rounded-lg shadow-xl cursor-pointer h-128 w-128 hover:shadow-2xl"
      >
        <h2 class="text-4xl font-bold text-red-500 capitalize">
          {{ label.split('_').join(' ') }}
        </h2>
      </div>
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
  },
}
</script>

<style lang="scss" scoped></style>
