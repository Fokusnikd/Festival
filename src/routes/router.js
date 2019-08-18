import Vue from "vue";
import Router from "vue-router";
import MainApp from "../views/MainApp";
import Login from "../components/Auth/Login";
import Registration from "../components/Auth/Registration";
import CosplayList from "../components/Cosplay/CosplayList";
import Cosplay from "../components/Cosplay/Cosplay";
import NewCosplay from "../components/Cosplay/NewCosplay";
import AnimeList from "../components/Title/AnimeList";
import Anime from "../components/Title/Anime";
import NewAnime from "../components/Title/NewAnime";
import Festival from "../components/Fest/Festival";
import FestivalList from "../components/Fest/FestivalList";
import NewFestival from "../components/Fest/NewFestival";
import Crew from "../components/Crew/Crew";
import CrewList from "../components/Crew/CrewList";
import NewCrew from "../components/Crew/NewCrew";

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

    },
    {
      path: "/newcosplay/:id",
      props: true,
      name: "newcosplay",
      component: NewCosplay,

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

    },
    {
      path: "/festivalList",
      name: "festivalList",
      component: FestivalList
    },

    {
      path: "/festival/:id",
      props: true,
      name: "festival",
      component: Festival
    },
    {
      path: "/newFestival",
      name: "newfestival",
      component: NewFestival,

    },

    {
      path: "/crewList",
      name: "crewlist",
      component: CrewList
    },

    {
      path: "/crew/:id",
      props: true,
      name: "crew",
      component: Crew
    },
    {
      path: "/newCrew",
      name: "newcrew",
      component: NewCrew,

    },
  ]
});