<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <v-row v-if="Cosplay">
          <v-img :src="Cosplay.src" height="400px" aspect-ratio="1"></v-img>
        </v-row>
        <v-row>
          <v-card-text>
            <h2 class="text--primary">{{Cosplay.title}}</h2>
            <h2 class="text--primary">{{Cosplay.city}}</h2>
            <h2 class="text--primary">{{Cosplay.description}}</h2>
            <h2 class="text--primary">{{Cosplay.type}}</h2>
            <h2 class="text--primary">{{Cosplay.crew}}</h2>
            <h2 class="text--primary">{{Cosplay.festivalId}}</h2>
            <h2 class="text--primary">{{Cosplay.animeId}}</h2>
            <h2 class="text--primary">{{Cosplay.dataTime}}</h2>
          </v-card-text>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {};
  },

  computed: {
    Cosplay() {
      const id = this.id;

      return this.$store.getters.cosplayById(id);
    }
  }
};
</script>
