<template>
  <div
    class="flex items-center justify-center w-full p-2 my-3 transition ease-out transform scale-95 rounded-lg shadow-xl cursor-pointer h-15 md:h-30 md:w-1/2 hover:bg-indigo-600 hover:scale-100 border-1 hover:border-bg-indigo-400 hover:shadow-2xl"
    :class="{
      'bg-green-600 hover:bg-green-600 hover:scale-100 hover:border-bg-green-600': isCorrect,
      'bg-red-600 hover:bg-red-600 hover:scale-100 hover:border-bg-red-600': isFalse,
      'bg-indigo-900': !isFalse && !isCorrect,
    }"
  >
    <button
      :disabled="disabled"
      class="w-full h-full text-xl text-center text-gray-100 outline-none"
      @click="$emit('click')"
    >
      {{ label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'AnswerCard',
  props: {
    label: {
      type: String,
      default: '',
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
    isFalse: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped></style>
