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

          <v-textarea
            label="Description"
            name="description"
            type="text"
            v-model="description"
            rows="1"
            :rules="[v=> !!v|| 'Description is required']"
            required
            auto-grow
          ></v-textarea>
        </v-form>
        <v-layout wrap class="mb-3">
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn class="warning" @click="trigger">
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <input
              type="file"
              @change="imageLoad"
              style="display:none"
              ref="fileInput"
              accept="image/*"
            />
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs12>
            <img :src="imageSrc" v-if="imageSrc" height="200" />
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs12>
            <v-switch v-model="promo" label="Add to promo"></v-switch>
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn :loading="loading" :disabled=" loading" @click="createAd">Create</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      promo: false,
      description: "",
      image: null,
      imageSrc: ""
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },

  methods: {
    trigger() {
      this.$refs.fileInput.click();
    },
    imageLoad(e) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };

      reader.readAsDataURL(file);
      this.image = file;
    },

    createAd() {
      const ad = {
        title: this.title,
        description: this.description,
        promo: this.promo,
        src: this.image
      };

      this.$store
        .dispatch("createAnime", ad)
        .then(() => {
          this.$router.push("/animeList");
        })
        .catch(() => {});
    }
  }
};
</script>

