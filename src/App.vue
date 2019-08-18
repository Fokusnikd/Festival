<template>
  <div class="app">
    <v-app>
      <v-navigation-drawer dark temporary app v-model="drawer">
        <v-list>
          <v-list-item-group color="primary">
            <v-list-item v-for="link in links" :key="link.title" :to="link.url">
              <v-list-item-icon>
                <v-icon v-text="link.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="link.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar dark app>
        <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer=!drawer"></v-app-bar-nav-icon>

        <v-toolbar-title class="pointer">
          <router-link to="/" tag="span">Fandom Performance</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn v-for="link in links" :key="link.title" :to="link.url" text>
            <v-icon left>{{link.icon}}</v-icon>
            {{link.title}}
          </v-btn>
          <v-btn v-if="isUserLoggedIn" :to="'/'" @click="onLogout">
            <v-icon left>mdi-exit-to-app</v-icon>Log out
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>
      <v-content>
        <router-view></router-view>
      </v-content>
      <template v-if="error">
        <v-snackbar
          color="color"
          @input="closeError"
          :value="true"
          :multi-line="true"
          :timeout="5000"
        >
          {{error}}
          <v-btn color="error" @click="closeError">Close</v-btn>
        </v-snackbar>
      </template>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    closeError() {
      this.$store.dispatch("cleanError");
    },
    onLogout() {
      this.$store.dispatch("logOut");
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          { title: "New Fandom", icon: "mdi-star", url: "/newAnime" },
          { title: "Fandoms", icon: "mdi-star", url: "/animeList" },
          { title: "Festivals", icon: "mdi-star", url: "/festivalList" },
          { title: "Crews", icon: "mdi-star", url: "/crewList" }
        ];
      }
      {
        return [
          { title: "Login", icon: "mdi-star", url: "/login" },
          { title: "Registration", icon: "mdi-star", url: "/registration" }
        ];
      }
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
