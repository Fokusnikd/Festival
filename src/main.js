import Vue from "vue";
import App from "./App.vue";
import router from "./routes/router";
import store from "./stores/store";
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min';
import * as fb from 'firebase';
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    fb.initializeApp({
      apiKey: "AIzaSyAtOUfM9-TTr7wZV8ZZXOEbDtLnbmuXgr8",
      authDomain: "festival-3bcdb.firebaseapp.com",
      databaseURL: "https://festival-3bcdb.firebaseio.com",
      projectId: "festival-3bcdb",
      storageBucket: "festival-3bcdb.appspot.com",
      messagingSenderId: "228542522089",
      appId: "1:228542522089:web:28f9b62891b9e70e"
    });
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user);
      }
    });
    this.$store.dispatch('fetchAnime');
    this.$store.dispatch("fetchFestival");
    this.$store.dispatch("fetchCosplay");
  }
}).$mount("#app");