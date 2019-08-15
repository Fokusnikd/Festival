<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="(item,i) in promoAnime"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
export default {
  computed: {
    promoAnime() {
      return this.$store.getters.promoAnime;
    }
  }
};
</script>