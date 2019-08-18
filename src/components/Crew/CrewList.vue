<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <h1 class="text--secondary mb-3">Titles</h1>
        <v-card class="mb-3" :elevation="11" v-for="crew in myCrew" :key="crew.id">
          <v-layout wrap>
            <v-flex xs8 sm8>
              <v-card-text>
                <h2 class="text--primary">{{crew.title}}</h2>
              </v-card-text>
              <v-card-text>
                <h2 class="text--primary">{{crew.description}}</h2>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :to="`/crew/${crew.id}`" class="info">Open</v-btn>
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
    myCrew() {
      return this.$store.getters.crew;
    }
  }
};
</script>
