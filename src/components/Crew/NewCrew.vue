<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary">New ad</h1>
        <v-form ref="form">
          <v-text-field
            label="Crew title"
            name="Crew"
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
          <v-text-field
            label="Contacts"
            name="Contacts"
            type="text"
            v-model="contacts"
            :rules="[v=> !!v|| 'Contacts is required']"
            required
          ></v-text-field>
          <v-autocomplete
            item-text="title"
            label="Members"
            clearable
            chips
            deletable-chips
            multiple
            v-model="memberId"
            :items="members"
          ></v-autocomplete>
        </v-form>
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
      memberId: "4",
      description: "",
      contacts: ""
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    members() {
      return this.$store.getters.member;
    }
  },

  methods: {
    createAd() {
      const ad = {
        title: this.title,
        description: this.description,
        contacts: this.contacts,
        memberId: this.memberId
      };
      console.log(ad);
      this.$store
        .dispatch("createCrew", ad)
        .then(() => {
          this.$router.go("-1");
        })
        .catch(() => {});
    }
  }
};
</script>

