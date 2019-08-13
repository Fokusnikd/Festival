import Vue from "vue";
import Router from "vue-router";
import Guard from '../routes/auth-guard';
import MainApp from "../views/MainApp";
import Login from "../components/Auth/Login";
import Registration from "../components/Auth/Registration";
import CosplayList from "../components/Cosplay/CosplayList";
import Cosplay from "../components/Cosplay/Cosplay";
import NewCosplay from "../components/Cosplay/NewCosplay";
import AnimeList from "../components/Title/AnimeList";
import Anime from "../components/Title/Anime";
import NewAnime from "../components/Title/NewAnime";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
      path: "",
      name: "mainApp",
      component: MainApp
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/registration",
      name: "registration",
      component: Registration
    },
    {
      path: "/cosplayList",
      name: "cosplayList",
      component: CosplayList
    },

    {
      path: "/cosplay/:id",
      props: true,
      name: "cosplay",
      component: Cosplay,
      beforeEnter: Guard
    },
    {
      path: "/newcosplay/:id",
      props: true,
      name: "newcosplay",
      component: NewCosplay,
      beforeEnter: Guard
    },

    {
      path: "/animeList",
      name: "animeList",
      component: AnimeList
    },

    {
      path: "/anime/:id",
      props: true,
      name: "anime",
      component: Anime
    },
    {
      path: "/newAnime",
      name: "newanime",
      component: NewAnime,
      beforeEnter: Guard
    },
  ]
});