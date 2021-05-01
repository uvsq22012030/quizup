<template>
  <div>
    <p>Utilisateurs présent dans le lobby:</p>
    <div v-if="lobbyInfo">
      <h1 v-for="(user, idx) in lobbyInfo.players" :key="idx">
        {{ user.name }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lobbyRef: null,
      lobbyInfo: {},
    }
  },
  created() {
    this.$fire.database
      .ref('lobbies/')
      .get()
      .then((snapshot) => {
        // Il n'y aucun lobby
        if (!snapshot.val()) {
          this.$router.push({
            name: 'lobby',
            params: {
              force: true,
            },
          })
        } else if (
          !Object.keys(snapshot.val()).includes(this.$route.params.lobby)
        ) {
          // Le lobby est inexistant
          this.$router.push({
            name: 'lobby',
            params: {
              force: true,
            },
          })
        }
      })
    // On recupere la reference des lobbies dans la base de données
    this.lobbyRef = this.$fire.database.ref(
      'lobbies/' + this.$route.params.lobby
    )
    // On recupere les informations du lobby
    this.lobbyRef.on('value', (snapshot) => {
      if (!snapshot.val())
        this.$router.push({
          name: 'lobby',
          params: {
            force: true,
          },
        })
      this.lobbyInfo = snapshot.val()
    })
  },
  beforeRouteLeave(to, from, next) {
    if (!to.params.force) {
      // L'utilisateur essaie de quitter le lobby
      const answer = confirm(
        'Etes-vous sûr de vouloir quitter cette page? Vous quitterez le lobby'
      )
      if (answer) {
        // Si l'utilisateur est le createur du lobby alors on supprime le lobby
        if (this.lobbyInfo.creator.uid === this.$fire.auth.currentUser.uid) {
          this.$fire.database
            .ref('lobbies/' + this.$route.params.lobby)
            .remove()
        } else {
          // Sinon on supprime l'utilisateur qui s'est deconnecté de la base de données
          this.$fire.database
            .ref('lobbies/' + this.$route.params.lobby + '/players/1')
            .remove()
          this.$fire.database
            .ref('lobbies/' + this.$route.params.lobby)
            .update({
              state: 'pending',
            })
        }
        next()
      } else next(false)
    } else next()
  },
}
</script>

<style></style>
