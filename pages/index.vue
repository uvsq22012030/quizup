<template>
  <div>
    <section class="flex flex-col min-h-screen">
      <div class="flex items-center justify-center flex-1">
        <div
          class="w-full h-full text-center bg-white border-0 bg-gradient-to-b from-white via-gray-100 via-gray-300 via-red-200 to-red-400"
        >
          <!-- Navbar -->
          <nav
            class="flex mb-1 justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-0"
          >
            <div
              class="left-0 flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-0 pb-5 lg:pb-0"
            >
              <div
                class="flex items-center flex-shrink-0 text-gray-800 mr-auto"
              >
                <img
                  class="object-fill h-15 w-15"
                  src="~/assets/img/question-mark.png"
                />
                <span class="font-semibold font-mono text-2xl tracking-tight">
                  QuizUp
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <span
                  class="text-gray-500 font-bold font-mono pl-10 tracking-tight hidden sm:flex lg:hidden"
                >
                  {{ $fire.auth.currentUser.displayName }}
                </span>
                <div class="group border-0 lg:hidden">
                  <button
                    class="outline-none focus:outline-none bg-white border-0 rounded-sm flex items-center min-w-13"
                  >
                    <img
                      class="border-gray-500 border-2 rounded-lg h-13 w-13"
                      :src="
                        'https://avatars.dicebear.com/api/male/' +
                        $fire.auth.currentUser.displayName +
                        '.svg'
                      "
                    />
                  </button>
                  <ul
                    class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-13"
                  >
                    <li class="rounded-sm py-1 hover:bg-red-400">
                      <button class="w-full" @click="signOut">Logout</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              class="flex items-center flex-shrink-0 hidden lg:flex space-x-2"
            >
              <span class="text-gray-500 font-bold pl-10 tracking-tight">
                {{ $fire.auth.currentUser.displayName }}
              </span>
              <div class="group border-0">
                <button
                  class="outline-none focus:outline-none bg-white border-0 rounded-sm flex items-center min-w-13"
                >
                  <img
                    class="border-gray-500 border-2 rounded-lg h-13 w-13"
                    :src="
                      'https://avatars.dicebear.com/api/male/' +
                      $fire.auth.currentUser.displayName +
                      '.svg'
                    "
                  />
                </button>
                <ul
                  class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-13"
                >
                  <li class="rounded-sm py-1 hover:bg-red-400">
                    <button class="w-full" @click="signOut">Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div class="block justify-center min-h-full bg-white mx-20 my-0">
            <!--Search Bar -->
            <div class="p-8">
              <div
                class="bg-gray-100 flex items-center rounded-full shadow-lg w-1/3 mx-auto"
              >
                <input
                  id="search"
                  class="bg-gray-100 rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Search for a theme..."
                />
                <div class="p-4">
                  <button
                    class="bg-red-400 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center"
                  >
                    <img
                      class="object-fill h-7 w-7"
                      src="~/assets/img/search.png"
                    />
                  </button>
                </div>
              </div>
            </div>
            <!-- Themes -->
            <div class="mx-auto w-full lg:w-5/6 mb-5">
              <h1
                class="static left-0 w-max-100 font-bold font-mono text-4xl mb-3"
              >
                Popular Themes
              </h1>
              <div class="relative items-center justify-center">
                <!-- All Cards Container -->
                <div class="lg:flex items-center container mx-auto my-auto">
                  <!-- Card 1 -->
                  <div
                    class="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8"
                  >
                    <!-- Card Image -->
                    <img
                      src="https://picsum.photos/id/29/2106/1404"
                      alt=""
                      class="overflow-hidden"
                    />
                    <!-- Card Content -->
                    <div class="p-4">
                      <h3
                        class="font-medium text-gray-600 text-lg my-2 uppercase"
                      >
                        Climb the Mountains
                      </h3>
                      <p class="text-justify">
                        The be might what days revellers, which sought to a nor.
                        Land from to suits his some. Saw him counsel begun
                        mother though but. Ofttimes soils of since mighty
                        pollution.
                      </p>
                      <div class="mt-5">
                        <a
                          href=""
                          class="hover:bg-red-600 rounded-full py-2 px-3 font-semibold hover:text-white bg-red-400 text-black"
                        >
                          Play
                        </a>
                      </div>
                    </div>
                  </div>
                  <!-- Card 2 -->
                  <div
                    class="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8"
                  >
                    <!-- Card Image -->
                    <img
                      src="https://picsum.photos/id/247/2106/1404"
                      alt=""
                      class="overflow-hidden"
                    />
                    <!-- Card Content -->
                    <div class="p-4">
                      <h3
                        class="font-medium text-gray-600 text-lg my-2 uppercase"
                      >
                        Explore the Desert
                      </h3>
                      <p class="text-justify">
                        Rapping wind chamber have was has, is all of thy stood
                        chamber his bore. Nameless or as door tapping both thy
                        grew lenore. We my still respiterespite lie, with
                        lordly.
                      </p>
                      <div class="mt-5">
                        <a
                          href=""
                          class="hover:bg-red-600 rounded-full py-2 px-3 font-semibold hover:text-white bg-red-400 text-black"
                        >
                          Play
                        </a>
                      </div>
                    </div>
                  </div>
                  <!-- Card 3 -->
                  <div
                    class="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8"
                  >
                    <!-- Card Image -->
                    <img
                      src="https://picsum.photos/id/342/2106/1404"
                      alt=""
                      class="overflow-hidden"
                    />
                    <!-- Card Content -->
                    <div class="p-4">
                      <h3
                        class="font-medium text-gray-600 text-lg my-2 uppercase"
                      >
                        Tour the City
                      </h3>
                      <p class="text-justify">
                        Upon but that objects tis sore would what. Who formed in
                        coffined heartless shades, there mine was heart vast
                        flaunting he low relief uncouth, dear and and but
                        suffice ofttimes.
                      </p>
                      <div class="mt-5">
                        <a
                          href=""
                          class="hover:bg-red-600 rounded-full py-2 px-3 font-semibold hover:text-white bg-red-400 text-black"
                        >
                          Play
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Game history -->
            <div class="mx-auto w-full lg:w-5/6">
              <h1
                class="static left-0 w-max-100 font-bold font-mono text-4xl mb-3"
              >
                Games History
              </h1>
              <div class="bg-white shadow-md rounded">
                <table class="w-full table-auto shadow-2xl">
                  <tbody class="text-gray-600 text-sm font-light">
                    <tr class="h-40 border-b border-gray-200 hover:bg-red-400">
                      <td class="py-3 px-6 text-left whitespace-nowrap">
                        <div class="flex items-center">
                          <span class="font-medium">Apr 19, 14:30</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-left">
                        <div class="flex items-center">
                          <span>Theme</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-center">
                        <span
                          class="bg-red-200 text-gray-800 py-1 px-3 rounded-full text-xs"
                        >
                          Solo
                        </span>
                      </td>
                      <td class="py-3 px-6 text-center">
                        <div class="flex item-center justify-center font-bold">
                          0 pts
                        </div>
                      </td>
                    </tr>
                    <tr class="h-40 border-b border-gray-200 hover:bg-red-400">
                      <td class="py-3 px-6 text-left">
                        <div class="flex items-center">
                          <span class="font-medium">Apr 19, 14:30</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-left">
                        <div class="flex items-center">
                          <span>Theme</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-center">
                        <span
                          class="bg-blue-200 text-gray-800 py-1 px-3 rounded-full text-xs"
                        >
                          Multijoueur
                        </span>
                      </td>
                      <td class="py-3 px-6 text-center">
                        <div class="flex item-center justify-center font-bold">
                          0 pts
                        </div>
                      </td>
                    </tr>
                    <tr class="h-40 border-b border-gray-200 hover:bg-red-400">
                      <td class="py-3 px-6 text-left">
                        <div class="flex items-center">
                          <span class="font-medium">Apr 19, 14:30</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-left">
                        <div class="flex items-center">
                          <span>Theme</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-center">
                        <span
                          class="bg-blue-200 text-gray-800 py-1 px-3 rounded-full text-xs"
                        >
                          Multijoueur
                        </span>
                      </td>
                      <td class="py-3 px-6 text-center">
                        <div class="flex item-center justify-center font-bold">
                          0 pts
                        </div>
                      </td>
                    </tr>
                    <tr class="h-40 border-b border-gray-200 hover:bg-red-400">
                      <td class="py-3 px-6 text-left">
                        <div class="flex items-center">
                          <span class="font-medium">Apr 19, 14:30</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-left">
                        <div class="flex items-center">
                          <span>Theme</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-center">
                        <span
                          class="bg-red-200 text-gray-800 py-1 px-3 rounded-full text-xs"
                        >
                          Solo
                        </span>
                      </td>
                      <td class="py-3 px-6 text-center">
                        <div class="flex item-center justify-center font-bold">
                          0 pts
                        </div>
                      </td>
                    </tr>
                    <tr class="h-40 border-b border-gray-200 hover:bg-red-400">
                      <td class="py-3 px-6 text-left">
                        <div class="flex items-center">
                          <span class="font-medium">Apr 19, 14:30</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-left">
                        <div class="flex items-center">
                          <span>Theme</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-center">
                        <span
                          class="bg-red-200 text-gray-800 py-1 px-3 rounded-full text-xs"
                        >
                          Solo
                        </span>
                      </td>
                      <td class="py-3 px-6 text-center">
                        <div class="flex item-center justify-center font-bold">
                          0 pts
                        </div>
                      </td>
                    </tr>
                    <tr class="h-40 border-b border-gray-200 hover:bg-red-400">
                      <td class="py-3 px-6 text-left">
                        <div class="flex items-center">
                          <span class="font-medium">Apr 19, 14:30</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-left">
                        <div class="flex items-center">
                          <span>Theme</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-center">
                        <span
                          class="bg-blue-200 text-gray-800 py-1 px-3 rounded-full text-xs"
                        >
                          Multijoueur
                        </span>
                      </td>
                      <td class="py-3 px-6 text-center">
                        <div class="flex item-center justify-center font-bold">
                          0 pts
                        </div>
                      </td>
                    </tr>
                    <tr class="h-40 border-b border-gray-200 hover:bg-red-400">
                      <td class="py-3 px-6 text-left">
                        <div class="flex items-center">
                          <span class="font-medium">Apr 19, 14:30</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-left">
                        <div class="flex items-center">
                          <span>Theme</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-center">
                        <span
                          class="bg-red-200 text-gray-800 py-1 px-3 rounded-full text-xs"
                        >
                          Solo
                        </span>
                      </td>
                      <td class="py-3 px-6 text-center">
                        <div class="flex item-center justify-center font-bold">
                          0 pts
                        </div>
                      </td>
                    </tr>
                    <tr class="h-40 border-b border-gray-200 hover:bg-red-400">
                      <td class="py-3 px-6 text-left">
                        <div class="flex items-center">
                          <span class="font-medium">Apr 19, 14:30</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-left">
                        <div class="flex items-center">
                          <span>Theme</span>
                        </div>
                      </td>
                      <td class="py-3 px-6 text-center">
                        <span
                          class="bg-blue-200 text-gray-800 py-1 px-3 rounded-full text-xs"
                        >
                          Multijoueur
                        </span>
                      </td>
                      <td class="py-3 px-6 text-center">
                        <div class="flex item-center justify-center font-bold">
                          0 pts
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <footer class="bg-white mt-5 opacity-0"><h1>Footer</h1></footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    async signOut() {
      try {
        // Check if a user is logged in with an anonymous an account
        if (!this.$fire.auth.currentUser.isAnonymous) {
          // If not, log out
          await this.$fire.auth.signOut()
        } else {
          // Else delete the anonymous account
          this.$fire.auth.currentUser.delete()
        }
        // Redirect to login page
        this.$router.push('/login')
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>

<style></style>
