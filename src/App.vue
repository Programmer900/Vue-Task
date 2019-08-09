<template>
  <v-app>
    <Navbar :title="title" :description="description" />
    <v-content>
      <v-layout
              text-center
              wrap
      >

        <v-flex class="pt-10">
          <h1 class="display-1 font-weight-bold mb-3">
            Задачник
          </h1>
          <router-view></router-view>
        </v-flex>
      </v-layout>

    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Nav'

export default {
  components: {
    Navbar
  },
  data: () => ({
    title: "Create",
    description: "TurboRender Test Task A.Chernenko"
  }),
};
</script>
