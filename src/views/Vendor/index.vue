<template>
  <v-container>
    <v-card
      max-width="500"
      class="mx-auto my-4"
      v-for="(vendor, index) in $store.state.vendors"
      :key="index"
      :to="'/vendor-detail/' + vendor.id">
      <v-card-title>
        {{ vendor.name }}
        
      </v-card-title>
      <v-card-subtitle>
        {{ vendor.description }}
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
export default {
  created() {
    
  },

  data: () => ({
    
  })
}
</script>