import Vue from "vue";
import Vuex from "vuex";
import Cosplay from "./CosplayStore";
import Festival from './FestivalStore';
import Anime from "./AnimeStore";
import User from "./userStore";
import General from "./generalStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Cosplay,
    Anime,
    User,
    General,
    Festival
  }
});