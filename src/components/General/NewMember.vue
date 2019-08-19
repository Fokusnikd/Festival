<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary">New Member</h1>

        <v-form ref="form">
          <v-text-field label="Nickname" name="nickname" type="text" v-model="nickname"></v-text-field>
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
        <v-form>
          <v-autocomplete
            v-model="city"
            :items="cities"
            label="City"
            placeholder="Воронеж"
            required
          ></v-autocomplete>
          <v-autocomplete
            label="Type of cosplayer"
            placeholder="Type"
            clearable
            v-model="typeOM"
            :items="typeOfMember"
          ></v-autocomplete>
        </v-form>

        <v-form>
          <v-text-field label="Oficial Page" name="Oficial Page" type="text" v-model="officialPage"></v-text-field>
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
            <v-spacer></v-spacer>
            <v-btn dark :loading="loading" :disabled=" loading" @click="createMember">Create</v-btn>
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
      nickname: "",
      city: "",
      description: "",
      typeOM: "",
      image: null,
      imageSrc: "",
      officialPage: ""
    };
  },
  computed: {
    cities() {
      return this.$store.getters.cities;
    },
    typeOfMember() {
      return this.$store.getters.typeOfMember;
    },
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
    createMember() {
      const member = {
        nickname: this.nickname,
        city: this.city,
        type: this.typeOM,
        description: this.description,
        officialPage: this.officialPage,
        src: this.image
      };

      this.$store
        .dispatch("createMember", member)
        .then(() => {
          this.$router.go("-1");
        })
        .catch(() => {});
    }
  }
};
</script>

