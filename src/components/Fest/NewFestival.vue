<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary">New Festival</h1>
        <v-form ref="form">
          <v-text-field
            label="Festival title"
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
        <v-form>
          <v-autocomplete
            v-model="city"
            :items="cities"
            label="City"
            placeholder="Воронеж"
            required
          ></v-autocomplete>
          <v-autocomplete
            label="Type of festival"
            placeholder="Type"
            clearable
            v-model="typeOF"
            :items="typeOfFestival"
          ></v-autocomplete>
        </v-form>
        <!-- /// -->
        <v-form>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Oficial Page"
                name="Oficial Page"
                type="text"
                v-model="officialPage"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="dataTime"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-combobox
                    v-model="dataTime"
                    multiple
                    chips
                    small-chips
                    label="Multiple picker in menu"
                    prepend-icon="mdi-event"
                    readonly
                    v-on="on"
                  ></v-combobox>
                </template>
                <v-date-picker v-model="dataTime" multiple no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(dataTime)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-form>
        <!-- /// -->
        <v-form>
          <v-row></v-row>
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
          <v-flex xs12></v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn dark :loading="loading" :disabled=" loading" @click="createFestival">Create</v-btn>
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
      city: "",
      description: "",
      typeOF: "",
      image: null,
      imageSrc: "",
      dataTime: [],
      officialPage: "",
      menu: false
    };
  },
  computed: {
    cities() {
      return this.$store.getters.cities;
    },
    typeOfFestival() {
      return this.$store.getters.typeOfFestival;
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
      reader.onload = e => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
      this.image = file;
    },
    createFestival() {
      const festival = {
        title: this.title,
        src: this.image,
        city: this.city,
        type: this.typeOF,
        description: this.description,
        officialPage: this.officialPage,
        dataTime: this.dataTime
      };
      console.log(festival);
      this.$store
        .dispatch("createFestival", festival)
        .then(() => {
          this.$router.go("-1");
        })
        .catch(() => {});
    }
  }
};
</script>

