<template>
  <v-app>
    <v-layout column>
      <nuxt />
      <v-footer>
        <a href="https://github.com/self-assessment/editor">
          Github
        </a>
      </v-footer>
    </v-layout>
  </v-app>
</template>

<style>
.v-footer {
  justify-content: center;
}
.v-footer a {
  color: #aaa;
  text-decoration: none;
}
</style>

<script>
export default {}
</script>
