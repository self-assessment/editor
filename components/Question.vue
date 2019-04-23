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
      <!--
      <v-spacer></v-spacer>

      <v-btn icon flat @click.stop="add($event)">
        <v-icon>add</v-icon>
      </v-btn>
      -->
    </template>
    <v-card>
      <v-card-text>
        <v-text-field v-model="value.title[lang]" label="Title" />
        <v-textarea v-model="value.description[lang]" label="Description" />

        <v-combobox
          v-model="value.areas"
          :items="areas"
          multiple
          chips
          label="Areas"
          :return-object="false"
        >
          <template v-slot:selection="{ parent, item, selected, disabled }">
            <v-chip
              :selected="selected"
              :disabled="disabled"
              class="v-chip--select-multi"
              @input="parent.selectItem(item)"
            >
              <v-avatar
                class="accent white--text"
                v-text="
                  getArea(item)
                    .text.slice(0, 1)
                    .toUpperCase()
                "
              ></v-avatar>
              {{ getArea(item).text }}
            </v-chip>
          </template>
        </v-combobox>

        <v-toolbar flat color="#FFF">
          <v-toolbar-title>Choices</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="addChoice">
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
        <choice
          v-for="(item, i) in value.choices"
          v-model="value.choices[i]"
          :key="i"
          :lang="lang"
          class="ma-2"
        ></choice>
      </v-card-text>
    </v-card>
  </v-expansion-panel-content>
</template>

<script>
import Choice from './Choice'

export default {
  components: { Choice },
  props: {
    lang: {
      type: String,
      required: true
    },
    value: {
      type: Object,
      default() {
        return {
          title: null,
          description: null,
          areas: [],
          choices: []
        }
      }
    },
    areas: {
      type: Array,
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
  },
  methods: {
    addChoice() {
      this.value.choices.push({
        title: {},
        description: {},
        score: 1
      })
    },
    getArea(key) {
      for (const area of this.areas) {
        if (area.value === key) {
          return area
        }
      }

      return {
        text: 'error'
      }
    }
  }
}
</script>
