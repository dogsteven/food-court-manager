<template>
  <v-app>
    <v-navigation-drawer
      v-model="isShowDrawer"
      app>
      <v-list>
        <v-list-item
          to="/vendor">
          <v-list-item-icon>
            <v-icon>fas fa-store</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Vendor
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      dark
      app>
      <v-app-bar-nav-icon
        @click="isShowDrawer = !isShowDrawer">
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        Food Court Manager
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon
        @click="addNewItem">
        mdi-plus
      </v-icon>
    </v-app-bar>

    <v-dialog
      v-model="isShowVendorAdder"
      max-width="500">
      <v-card
        max-width="500"
        class="mx-auto">
        <v-card-title>
          Vendor Adder
          <v-spacer></v-spacer>
          <v-icon
            @click="isShowVendorAdder = false">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newVendorName"
            label="Name">
          </v-text-field>
          <v-textarea
            v-model="newVendorDescription"
            label="Description">
          </v-textarea>
          <v-card-actions>
            <v-btn
              text
              block
              @click="addNewVendor">
              Add
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-main>
      <router-view>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import http from './http'

export default {
  name: 'App',

  created() {
    if (this.$store.state.vendors.length === 0) {
      http.server.get('/vendor')
        .then(res => res.data)
        .then(data => {
          data.forEach((item) => {
            this.$store.commit('pushVendor', item)
          })
        })
    }
  },

  methods: {
    addNewItem() {
      if (this.$route.name === 'VendorView') {
        this.isShowVendorAdder = true
      }
      if (this.$route.name === 'VendorDetailView') {
        this.$store.commit('isShowRegisterModalToggle')
      }
    },
    
    addNewVendor() {
      let data = {
        name: this.newVendorName,
        description: this.newVendorDescription
      }
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      if (data.name === "" || data.description === "")
        return
      http.server.post('/vendor', data, config)
        .then((response) => response.data)
        .then(({ id }) => {
          if (id !== null) {
            this.$store.commit('pushVendor', {
              id: id,
              ...data
            })
            this.isShowVendorAdder = false
          }
        })
    }
  },

  data: () => ({
    isShowDrawer: false,
    isShowVendorAdder: false,
    newVendorName: "",
    newVendorDescription: ""
  }),
};
</script>
