export default function ({ app, route, redirect }) {
  const unprotectedRoutes = ['/login', '/signup', '/forgot-pass']
  const gameRoutes = ['/game']
  if (!unprotectedRoutes.includes(route.path)) {
    //  we are on a protected route
    // On essaie d'acceder au jeu sans avoir specifier de parametres de jeu
    if (
      gameRoutes.includes(route.path) &&
      Object.keys(route.params).length === 0 &&
      route.params.constructor === Object
    ) {
      return redirect('/')
    }
    // On essaie d'acceder à un lobby
    // if (route.name === 'lobby-lobby') {
    //
    // }
    if (!app.$fire.auth.currentUser) {
      //  take them to sign in page
      return redirect('/login')
    }
  } else if (unprotectedRoutes.includes(route.path)) {
    if (!app.$fire.auth.currentUser) {
      //  leave them on the sign in page
    } else {
      return redirect('/')
    }
  }
}
