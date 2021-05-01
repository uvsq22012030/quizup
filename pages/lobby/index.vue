<template>
  <div>
    <section class="flex flex-col min-h-screen">
      <div class="block">
        <!-- Game history -->
        <h1>Liste des lobbies</h1>
        <div v-if="lobbiesList.length" class="bg-white shadow-md rounded">
          <table
            class="max-w-sm md:w-full md:max-w-full table-fixed md:table-auto shadow-2xl"
          >
            <tbody class="w-full text-gray-600 text-sm font-light">
              <tr
                v-for="(lobby, idx) in lobbiesList"
                :key="idx"
                class="w-full h-40 border-b border-gray-200 hover:bg-red-400"
              >
                <td
                  class="px-1 py-1 md:px-6 md:py-3 text-left whitespace-nowrap"
                >
                  <div class="flex items-center">
                    <span class="font-medium">{{ lobby.creator.name }}</span>
                  </div>
                </td>
                <td class="px-1 py-1 md:px-6 md:py-3 text-left">
                  <div class="flex items-center">
                    <span>{{ lobby.theme }}</span>
                  </div>
                </td>
                <td class="px-1 py-1 md:px-6 md:py-3 text-center">
                  <span
                    class="bg-red-200 text-gray-800 py-1 px-3 rounded-full text-xs"
                  >
                    {{ lobby.state }}
                  </span>
                </td>
                <td class="px-1 py-1 md:px-6 md:py-3 text-center">
                  <div class="flex item-center justify-center font-bold">
                    {{ Object.keys(lobby.players).length }} / 2
                  </div>
                </td>
                <td class="px-1 py-1 md:px-6 md:py-3 text-center">
                  <button
                    type="submit"
                    class="hover:bg-red-600 rounded-full py-2 px-3 font-semibold hover:text-white bg-red-400 text-white"
                    @click="
                      joinLobby(
                        lobby.id,
                        Object.keys(lobby.players).length,
                        lobby.creator.uid
                      )
                    "
                  >
                    Rejoindre
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else>Pas de lobby.</p>
        <div>
          <button
            type="submit"
            class="hover:bg-red-600 rounded-full py-2 px-3 font-semibold hover:text-white bg-red-400 text-white"
            @click="lobbyPopup = true"
          >
            Creer un lobby
          </button>
        </div>
        <!-- Lobby popup -->
        <template v-if="lobbyPopup">
          <div
            class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center"
          >
            <div
              class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
            ></div>
            <div
              class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
            >
              <div
                class="bg-gray-100 modal-content border-3 border-gray-600 rouned-xl block pt-2 pb-5 px-4"
              >
                <!-- Bouton retour au menu -->
                <div class="w-full h-8">
                  <button
                    type="submit"
                    class="bg-red-400 float-right hover:bg-red-600 text-white text-center text-lg font-bold w-7 border rounded-full focus:outline-none"
                    @click="lobbyPopup = false"
                  >
                    »
                  </button>
                </div>
                <!--Search Bar -->
                <div class="p-8">
                  Choisir un thème :
                  <div
                    class="bg-gray-100 flex items-center rounded-2xl md:rounded-full shadow-lg w-full mx-auto"
                  >
                    <v-select
                      id="search"
                      v-model="selectedTheme"
                      :options="themeList"
                      class="bg-gray-100 border-0 rounded-l-2xl md:rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
                      label="theme"
                      type="text"
                      placeholder="Chercher un thème..."
                    >
                    </v-select>
                  </div>
                </div>
                <div class="text-center flex items-center mt-5">
                  <button
                    type="submit"
                    class="hover:bg-red-600 w-1/3 m-auto rounded-full py-2 px-3 font-semibold hover:text-white bg-red-400 text-white"
                    @click="createLobby(selectedTheme)"
                  >
                    Creer le lobby »
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
        <footer class="bg-white mt-5 opacity-0"><h1>Footer</h1></footer>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lobbiesRef: null,
      lobbiesList: [],
      lobbyPopup: false,
      fetchedThemes: null,
      selectedTheme: null,
      themeList: [],
    }
  },
  created() {
    // On recupere les theme de l'API
    this.fetchThemes()
    // On recupere la reference des lobbies dans la base de données
    this.lobbiesRef = this.$fire.database.ref('lobbies/')
    // Ajout d'un ecouteur d'evenement pour récuperer les lobbies
    this.lobbiesRef.on('child_added', (snapshot) =>
      this.lobbiesList.push({ ...snapshot.val(), id: snapshot.key })
    )
    // Ajout d'un ecouteur d'evenement pour récuperer les modifications de lobbies
    this.lobbiesRef.on('child_changed', (snapshot) => {
      const updatedLobby = this.lobbiesList.find(
        (lobby) => lobby.id === snapshot.key
      )
      // On met à jour le nombre de joueurs et l'etat de la partie
      updatedLobby.state = snapshot.val().state
      updatedLobby.players = snapshot.val().players
    })
    // Ajout d'un ecouteur d'evenement pour récuperer les lobbies supprimés
    this.lobbiesRef.on('child_removed', (snapshot) => {
      const deletedLobby = this.lobbiesList.find(
        (lobby) => lobby.id === snapshot.key
      )
      const index = this.lobbiesList.indexOf(deletedLobby)
      this.lobbiesList.splice(index, 1)
    })
  },
  methods: {
    // Methode qui permet à l'utilisateur de rejoindre un lobby
    joinLobby(lobbyId, playersNumber, creatorId) {
      if (playersNumber === 2) {
        // Lobby plein
        alert('Full')
      } else if (creatorId === this.$fire.auth.currentUser.uid) {
        // Le meme utilisateur ne peut pas rejoindre le meme lobby 2 fois
        alert('Same user')
      } else {
        this.lobbiesRef.child(lobbyId).update({
          state: 'ongoing',
        })
        this.lobbiesRef.child(lobbyId + '/players/1').set({
          name: this.$fire.auth.currentUser.displayName,
          uid: this.$fire.auth.currentUser.uid,
        })
        this.$router.push('/lobby/' + lobbyId)
      }
    },
    // Methode qui formatte le nom d'un thème pour l'affichage
    format(themeName) {
      return (
        themeName[0].toUpperCase() + themeName.slice(1).replaceAll('_', ' ')
      )
    },
    // Creation du lobby
    createLobby(themeName) {
      if (!this.selectedTheme) {
        alert('Veuillez choisir un theme')
      } else {
        const lobbyInfo = {
          creator: {
            name: this.$fire.auth.currentUser.displayName,
            uid: this.$fire.auth.currentUser.uid,
          },
          theme: themeName,
          state: 'pending',
          players: [
            {
              name: this.$fire.auth.currentUser.displayName,
              uid: this.$fire.auth.currentUser.uid,
            },
          ],
        }
        const lobbyId = this.lobbiesRef.push(lobbyInfo).key
        this.$router.push('/lobby/' + lobbyId)
      }
    },
    // Recuperation des theme à partir de l'API
    async fetchThemes() {
      try {
        const json = await this.$axios.get(
          'https://enigmatic-stream-69193.herokuapp.com/categories'
        )
        // On recupere les themes
        this.fetchedThemes = json.data
        // On reformatte le nom de chaque theme pour l'inserer dans la liste des suggestions de la barre de recherche
        this.fetchedThemes.forEach((theme) => {
          this.themeList.push(this.format(theme.name))
        })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style></style>
