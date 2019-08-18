<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 v-if="ad">
        <h1>{{ad.title}}</h1>
        <h1>{{ad.description}}</h1>
        <h1>{{ad.contacts}}</h1>
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
    ad() {
      const id = this.id;
      return this.$store.getters.crewById(id);
    }
  }
};
</script>
