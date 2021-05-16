<template>
  <div
    class="flex items-center justify-center w-full p-3 my-3 space-x-3 transition duration-300 ease-in-out transform scale-95 bg-indigo-900 rounded-lg shadow-xl glassomorphism hover:bg-indigo-600 border-1 hover:border-bg-indigo-400 lg:h-25 hover:shadow-2xl"
  >
    <img
      class="inline-block h-full bg-indigo-800 border-indigo-900 rounded-full shadow-2xl border-10"
      :src="'https://avatars.dicebear.com/api/bottts/' + name + '.svg'"
    />
    <h1
      class="py-5 font-bold text-left text-gray-100 capitalize w-full h-full lg:text-2xl"
    >
      {{ name }}
    </h1>
    <img
      v-if="host"
      class="inline-block h-full rounded-full shadow-2xl border-2 bg-indigo-800 border-indigo-900"
      src="~/assets/img/crowns.png"
    />
    <button
      v-else-if="kick"
      class="float-right h-full w-auto sm:p-2 outline-none border-0 focus:outline-none bg-opacity-0"
      @click="$emit('click')"
    >
      <img
        class="inline-block h-full rounded-full shadow-2xl hover:animate-bounce"
        src="~/assets/img/close.svg"
      />
    </button>
  </div>
</template>

<script>
export default {
  name: 'PlayerCard',
  props: {
    name: {
      type: String,
      default: '',
    },
    host: {
      type: Boolean,
      default: false,
    },
    kick: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.glassomorphism {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
