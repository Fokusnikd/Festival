<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <h1 class="text--secondary mb-3">Titles</h1>
        <v-card class="mb-3" :elevation="11" v-for="(ad) in myAnime" :key="ad.id">
          <v-layout wrap>
            <v-flex xs4 sm4>
              <v-img class="white--text" height="150px" :src="ad.src"></v-img>
            </v-flex>
            <v-flex xs8 sm8>
              <v-card-text>
                <h2 class="text--primary">{{ad.title}}</h2>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :to="`/anime/${ad.id}`" class="info">Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    myAnime() {
      return this.$store.getters.anime;
    }
  }
};
</script>
