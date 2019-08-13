<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center wrap>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                label="Email"
                name="email"
                prepend-icon="mdi-account-circle"
                type="email"
                v-model="email"
                required
              ></v-text-field>

              <v-text-field
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                requied
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark @click="onSubmit" :loading="loading" :disabled="loading">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onSubmit() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("loginUser", user)
        .then(() => {
          this.$router.push("/");
        })

        .catch(() => {});

      //logic
    }
  },
  created() {
    if (this.$route.query["loginError"]) {
      this.$store.dispatch("setError", "Please log in to access this page.");
    }
  }
};
</script>