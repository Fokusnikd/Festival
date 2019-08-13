import store from '../stores/store'
export default function (to, from, next) {
  if (store.getters.user) {
    next()
  } else {
    next('/login?loginError=true')
  }
}