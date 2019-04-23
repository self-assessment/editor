<template>
  <v-layout column style="height: calc(100vh - 36px)">
    <v-toolbar class="purple" dark :tabs="!!structure">
      <v-toolbar-title>
        <v-layout row>
          <v-img src="/white.png" height="30" width="30" contain class="mr-3" />
          Self Assessments
        </v-layout>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-select
        class="lang-select"
        v-model="lang"
        :items="['de', 'en']"
      ></v-select>

      <v-btn v-if="structure" icon @click="save">
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn v-if="structure" icon @click="close">
        <v-icon>close</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          v-if="structure"
          v-model="tab"
          centered
          grow
          color="purple"
          slider-color="green"
        >
          <v-tab>General Information</v-tab>
          <v-tab>
            <v-badge>
              <template v-slot:badge>
                <span v-if="structure.areas.length > 0">
                  {{ structure.areas.length }}
                </span>
              </template>
              Areas
            </v-badge>
          </v-tab>
          <v-tab>
            <v-badge>
              <template v-slot:badge>
                <span v-if="structure.questions.length > 0">
                  {{ structure.questions.length }}
                </span>
              </template>
              Questions
            </v-badge>
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-content v-if="!structure" class="align-center">
      <v-layout column class="align-center">
        <v-btn @click="create">
          Create New Assessment
        </v-btn>
        <v-btn @click="open">
          Open Existing Assessment
        </v-btn>
      </v-layout>
    </v-content>

    <v-tabs-items v-else v-model="tab" class="tab-full-height">
      <v-tab-item class="pa-5">
        TODO show general information

        <pre>{{ structure }}</pre>
      </v-tab-item>

      <v-tab-item class="pa-5">
        <v-fab-transition>
          <v-btn
            v-show="tab === 1"
            fixed
            dark
            fab
            bottom
            right
            color="green"
            @click="addArea"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-fab-transition>

        <v-expansion-panel expand>
          <question-area
            v-for="(item, i) in structure.areas"
            :key="i"
            v-model="structure.areas[i]"
            :lang="lang"
          />
        </v-expansion-panel>
      </v-tab-item>

      <v-tab-item class="pa-5">
        <v-fab-transition>
          <v-btn
            v-show="tab === 2"
            absolute
            dark
            fab
            bottom
            right
            color="green"
            @click="addQuestion"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-fab-transition>

        <v-expansion-panel expand>
          <question
            v-for="(item, i) in structure.questions"
            :key="i"
            v-model="structure.questions[i]"
            :areas="areas"
            :lang="lang"
          />
        </v-expansion-panel>
      </v-tab-item>
    </v-tabs-items>
  </v-layout>
</template>

<style>
.tab-full-height,
.tab-full-height > .v-window__container,
.tab-full-height > .v-window__container > .v-window-item {
  height: 100%;
}
.tab-full-height {
  overflow-y: scroll;
}
.v-btn--bottom.v-btn--absolute {
  bottom: 36px;
}
.lang-select {
  width: 60px;
  flex: none;
}
</style>

<script>
import Question from '../components/Question'
import Area from '../components/Area'
import SelfAssessment from '../lib/SelfAssessment'

export default {
  components: {
    'question-area': Area,
    Question
  },
  data() {
    return {
      lang: 'en',
      tab: null,
      structure: false
    }
  },
  computed: {
    areas() {
      const list = []
      this.structure.areas.forEach(area => {
        let text = area.title[this.lang]
        if (!text) text = area.title.en
        if (!text) text = area.key

        list.push({
          text,
          value: area.key
        })
      })
      return list
    }
  },
  methods: {
    create() {
      this.structure = {
        areas: [],
        questions: []
      }
    },
    async open() {
      // TODO show file chooser and then load content
      this.structure = await SelfAssessment.select()
    },
    async save() {
      const xml = await SelfAssessment.stringify(this.structure)

      // TODO download file
      console.log('we got the xml', xml) // eslint-disable-line
    },
    close() {
      this.structure = false
    },
    addQuestion() {
      const i = this.structure.questions.length + 1
      this.structure.questions.push({
        key: `question_${i}`,
        title: {
          en: `Question ${i}`
        },
        description: {
          en: null
        },
        areas: [],
        choices: []
      })
    },
    addArea() {
      const i = this.structure.areas.length + 1
      this.structure.areas.push({
        key: `area_${i}`,
        title: {
          en: `Area ${i}`
        },
        description: {
          en: null
        }
      })
    }
  }
}
</script>
