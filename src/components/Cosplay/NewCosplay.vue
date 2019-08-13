<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary">New ad</h1>
        <v-form ref="form">
          <v-text-field
            label="Ad title"
            name="title"
            type="text"
            v-model="title"
            :rules="[v=> !!v|| 'Title is required']"
            required
          ></v-text-field>
        </v-form>
        <v-layout wrap class="mb-3">
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn class="warning">
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs12>
            <img src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" height="200" />
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs12></v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn dark :loading="loading" :disabled=" loading" @click="createAd">Create</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      title: "",
      promo: false
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    createAd() {
      const ad = {
        title: this.title,
        src: "https://cdn.shazoo.ru/309070_dYM2kid3qv_19_12.jpg",
        animeId: this.id
      };

      this.$store
        .dispatch("createCosplay", ad)
        .then(() => {
          this.$router.go("-1");
        })
        .catch(() => {});
    }
  }
};
</script>

