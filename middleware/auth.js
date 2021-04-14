export default function ({ app, route, redirect }) {
  const unprotectedRoutes = ['/login', '/signup', '/forgot-pass']
  if (!unprotectedRoutes.includes(route.path)) {
    //  we are on a protected route
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
