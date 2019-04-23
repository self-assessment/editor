<template>
  <v-card>
    <v-card-text>
      <v-layout row>
        <v-flex xs10 style="padding-right: 4px;">
          <v-text-field v-model="value.title[lang]" label="Title" />
        </v-flex>
        <v-flex xs2 style="padding-left: 4px;">
          <v-text-field type="number" v-model="value.score" label="Score" />
        </v-flex>
      </v-layout>
      <v-textarea v-model="value.description[lang]" label="Description" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    lang: {
      type: String,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    title() {
      if (this.value.title[this.lang]) {
        return this.value.title[this.lang]
      }

      if (this.value.title.en) {
        return this.value.title.en
      }

      return 'Title Missing'
    }
  }
}
</script>
