<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <v-card v-if="ad">
          <v-img class="white--text" height="600px" :src="ad.src"></v-img>
          <v-card-text>
            <h1 class="text--primary" align="center">{{ad.title}}</h1>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :to="`/newCosplay/${ad.id}`" class="warning">Add cosplay</v-btn>
          </v-card-actions>

          <v-flex xs12 mx-2 pb-2>
            <v-card class="mb-3" :elevation="5" v-for="cosp in myCosplay" :key="cosp.id">
              <v-layout wrap>
                <v-flex xs4 sm4>
                  <v-img class="white--text" height="150px" :src="cosp.src"></v-img>
                </v-flex>
                <v-flex xs8 sm8>
                  <v-card-text>
                    <h2 class="text--primary">{{cosp.title}}</h2>
                    <h2 class="text--primary">{{cosp.city}}</h2>
                    <h2 class="text--primary">{{cosp.description}}</h2>
                    <h2 class="text--primary">{{cosp.type}}</h2>
                    <h2 class="text--primary">{{cosp.crew}}</h2>
                    <h2 class="text--primary">{{cosp.festivalId}}</h2>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :to="`/Cosplay/${cosp.id}`" class="info">Open</v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-card>
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
      return this.$store.getters.animeById(id);
    },
    myCosplay() {
      const id = this.id;
      console.log(this.$store.getters.cosplay);
      return this.$store.getters.cosplayById2(id);
    }
  }
};
</script>
