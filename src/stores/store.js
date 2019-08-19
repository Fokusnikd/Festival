import Vue from "vue";
import Vuex from "vuex";
import Cosplay from "./CosplayStore";
import Festival from './FestivalStore';
import Anime from "./AnimeStore";
import User from "./userStore";
import General from "./generalStore";
import Crew from "./СrewStore";
import Member from "./MemberStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Cosplay,
    Anime,
    User,
    General,
    Festival,
    Crew,
    Member
  }
});