<template>
  <v-container>
    <v-card
      v-for="(vendorOwner, index) in vendorOwners"
      :key="index"
      max-width="500"
      class="mx-auto my-4">
      <v-card-title>
        {{ vendorOwner.firstname }} {{ vendorOwner.lastname }}
        <v-spacer></v-spacer>
        <v-icon
          @click="removeVendorOwner(index)">
          mdi-close
        </v-icon>
      </v-card-title>
      <v-card-subtitle>
        Email: {{ vendorOwner.email }}, username: {{ vendorOwner.username }}
      </v-card-subtitle>
    </v-card>

    <v-dialog
      v-model="$store.state.isShowRegisterModal"
      max-width="400">
      <v-card
        max-width="400">
        <v-card-title>
          Register
          <v-spacer></v-spacer>
          <v-icon
            @click="$store.commit('isShowRegisterModalToggle')">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="username"
            label="Username">
          </v-text-field>
          <v-text-field
            v-model="password"
            label="Passwprd"
            type="password">
          </v-text-field>
          <v-text-field
            v-model="firstname"
            label="Firstname">
          </v-text-field>
          <v-text-field
            v-model="lastname"
            label="Lastname">
          </v-text-field>
          <v-text-field
            v-model="email"
            label="Email">
          </v-text-field>
          <v-card-actions>
            <v-btn
              block
              text
              @click="addNewVendorOwner(id, username, password, firstname, lastname, email)">
              Add
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import http from '../../http'

export default {
  methods: {
    removeVendorOwner(index) {
      let id = this.vendorOwners[index].id
      http.server.delete('/vendor-owner/' + id)
        .then((response) => response.data)
        .then(({ status }) => {
          if (status) {
            this.vendorOwners.splice(index, 1)
          }
        })
    },

    addNewVendorOwner(vendorID, username, password, firstname, lastname, email) {
      if (vendorID === "" || username === "" || password === "" || firstname === "" || lastname === "" || email === "") {
        console.log("Unvalid form")
        return
      }
      let data = {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        email: email
      }
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      http.server.post('/vendor-owner/vendor/' + vendorID, data, config)
        .then((response) => response.data)
        .then(({ error, id }) => {
          if (error)
            console.log(error)
          else {
            this.vendorOwners.push({
              id: id,
              username: username,
              firstname: firstname,
              lastname: lastname,
              email: email
            })
            this.username = ""
            this.password = ""
            this.firstname = ""
            this.lastname = ""
            this.email = ""
            this.$store.commit('isShowRegisterModalToggle')
          }
        })
    }
  },

  created() {
    this.id = this.$route.params.id
    http.server.get('/vendor-owner/vendor/' + this.id)
      .then((response) => response.data)
      .then((data) => { this.vendorOwners = data })
  },

  data: () => ({
    id: null,
    vendorOwners: [],
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: ""
  })
}
</script>