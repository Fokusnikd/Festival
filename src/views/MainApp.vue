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
          >
            <div class="anime-link">
              <v-btn class="error" :to="'/anime/'+item.id">Open</v-btn>
            </div>
          </v-carousel-item>
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

<style scoped>
.anime-link {
  position: absolute;
  bottom: 50px;
  left: 50%;
  background: rgba(0, 0, 0, 0.3);
  transform: translate(-50%, 0);
  padding: 15px 15px 15px 15px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
</style>