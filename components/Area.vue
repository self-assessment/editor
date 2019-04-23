<template>
  <v-expansion-panel-content>
    <template v-slot:header>
      <div>
        <v-badge color="red">
          <template v-slot:badge>
            <span v-if="!value.title[lang]">!</span>
          </template>
          <span>{{ title }}</span>
        </v-badge>
      </div>
    </template>
    <v-card>
      <v-card-text>
        <v-text-field v-model="value.title[lang]" label="Title" />
        <v-textarea v-model="value.description[lang]" label="Description" />
      </v-card-text>
    </v-card>
  </v-expansion-panel-content>
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
