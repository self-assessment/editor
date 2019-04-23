<template>
  <v-expansion-panel-content>
    <template v-slot:header>
      <div>{{ value.title[lang] }}</div>
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

        <v-combobox
          v-model="value.areas"
          :items="areas"
          multiple
          chips
          label="Areas"
          :return-object="false"
        >
          <template
            v-slot:selection="{ parent, item, index, selected, disabled }"
          >
            <v-chip
              :selected="selected"
              :disabled="disabled"
              class="v-chip--select-multi"
              @input="parent.selectItem(item)"
            >
              <v-avatar
                class="accent white--text"
                v-text="areas[index].text.slice(0, 1).toUpperCase()"
              ></v-avatar>
              {{ areas[index].text }}
            </v-chip>
          </template>
        </v-combobox>
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
  }
}
</script>
