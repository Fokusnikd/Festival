<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <v-card>
          <v-img class="white--text" height="300px" :src="ad.src">
            <v-card-title class="align-end fill-height">{{ad.title}}</v-card-title>
          </v-img>
          <v-card-text>
            <h1 class="text--primary">{{ad.title}}</h1>
            <h1 class="text--primary">{{ad.title}}</h1>
            <h1 class="text--primary">{{ad.title}}</h1>
          </v-card-text>

          <v-flex xs12>
            <v-card class="mb-3" :elevation="11" v-for="cosp in cosplay" :key="cosp.id">
              <v-layout wrap>
                <v-flex xs4 sm4>
                  <v-img class="white--text" height="150px" :src="cosp.src"></v-img>
                </v-flex>
                <v-flex xs8 sm8>
                  <v-card-text>
                    <h2 class="text--primary">{{cosplay.title}}</h2>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :to="`/Cosplay/${ad.id}`" class="info">Open</v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :to="`/newCosplay/${ad.id}`" class="warning">Add cosplay</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      cosplay: []
    };
  },
  computed: {
    ad() {
      const id = this.id;
      return this.$store.getters.animeById(id);
    },
    myCosplay() {
      const id = this.id;

      this.cosplay.push(this.$store.getters.cosplayById2(id));
      console.log(this.cosplay);
      return this.$store.getters.cosplay;
    }
  }
};
</script>
