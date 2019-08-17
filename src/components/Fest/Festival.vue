<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <v-row v-if="Festival">
          <v-img :src="Festival.src" height="400px" aspect-ratio="1"></v-img>
        </v-row>
        <v-row v-if="Festival">
          <v-card-text>
            <h2 class="text--primary">{{Festival.title}}</h2>
            <h2 class="text--primary">{{Festival.city}}</h2>
            <h2 class="text--primary">{{Festival.description}}</h2>
            <h2 class="text--primary">{{Festival.type}}</h2>
            <h2 class="text--primary">{{Festival.officialPage}}</h2>
            <h2 class="text--primary">{{Festival.dataTime}}</h2>
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
    Festival() {
      const id = this.id;
      return this.$store.getters.festivalById(id);
    }
  }
};
</script>
