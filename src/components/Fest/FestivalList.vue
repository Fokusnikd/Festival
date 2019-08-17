<template>
  <v-layout wrap>
    <v-flex xs12 sm6>
      <v-card class v-for="fest in Festivals" :key="fest.id">
        <v-img class="white--text" height="300px" :src="fest.src">
          <v-card-title class="display-4 border align-end bold fill-height">{{fest.title}}</v-card-title>
        </v-img>

        <v-card-text>
          <span>{{fest.dataTime}}</span>
          <br />
          <span class="text--primary">
            <span>{{fest.city}}</span>
            <br />
            <span>{{fest.type}}</span>
          </span>
        </v-card-text>

        <v-card-actions>
          <v-btn dark :to="`/festival/${fest.id}`">Open</v-btn>
          <v-btn dark>Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  computed: {
    Festivals() {
      return this.$store.getters.festival;
    }
  }
};
</script>

<style scoped>
.border {
  font: 2em Arial, sans-serif;
  text-shadow: black 0 0 3px;
}
</style>