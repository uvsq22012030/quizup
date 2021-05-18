<template>
  <div
    class="flex items-center justify-center w-full p-3 my-3 space-x-3 transition duration-300 ease-in-out transform scale-95 bg-indigo-900 rounded-lg shadow-xl glassomorphism hover:bg-indigo-600 border-1 hover:border-bg-indigo-400 lg:h-25 hover:shadow-2xl"
  >
    <h1
      class="w-6 h-full py-5 font-bold text-left text-gray-100 capitalize lg:text-2xl"
    >
      {{ rank }} .
    </h1>
    <img
      class="inline-block bg-indigo-800 border-indigo-900 rounded-full shadow-2xl w-15 border-10"
      :src="'https://avatars.dicebear.com/api/bottts/' + name + '.svg'"
    />
    <h1
      class="w-full h-full py-5 font-bold text-left text-gray-100 capitalize lg:text-2xl"
    >
      {{ name }}
    </h1>
    <h1
      class="w-full h-full py-5 font-bold text-left text-gray-100 capitalize lg:text-2xl"
    >
      {{ score }} pts
    </h1>
  </div>
</template>

<script>
export default {
  name: 'RankCard',
  props: {
    name: {
      type: String,
      default: '',
    },
    rank: {
      type: String,
      default: '0',
    },
    score: {
      type: String,
      default: '0',
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
