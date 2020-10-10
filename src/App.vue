<template>
  <div id="app">
    <div class="content-wrapper">
      <section class="title">
        <h1>Shortify</h1>
        <p>Enter a long url below, then click the button to shorten it. Easy!</p>
      </section>
      <section>
        <InputFieldShortifyUrl placeholder="Paste a URL" :field="this.shortifyFormModel.fields.url" :shortified="shortified" :fetching="fetching" v-on:onButtonClick="genShortUrl" v-on:onChange="resetErrors" v-on:onEdit="resetShortified"/>
      </section>
      <section>
        <ShortifyHistory />
      </section>
    </div>
    <Alert />
  </div>
</template>

<script>
import {getShortUrl} from "@/api/api.shrtco.de.js"

import InputFieldShortifyUrl from '@/components/InputFieldShortifyUrl.vue'
import ShortifyHistory from '@/components/ShortifyHistory.vue'
import Alert from '@/components/Alert.vue'

export default {
  name: 'App',
  components: {
    InputFieldShortifyUrl,
    ShortifyHistory,
    Alert
  },
  data() {
      return {
          shortified: false //Used to show if URL in box is shortened
      };
  },
  computed: {
    shortifyFormModel() {
        return this.$store.state.shortify.shortifyFormModel;
    },
    fetching() {
        return this.$store.state.activity.fetching;
    }
  },
  async created() {
    this.$store.dispatch('createShortifyFormModel');
  },
  methods: {
    genShortUrl(){
      if (!this.shortified && this.shortifyFormModel.validate()) { 
        //if form model is valid, and the url doesn't already look like it's been shortened
        this.$store.dispatch('startFetch');
        getShortUrl(this.shortifyFormModel.values()) //API Call
        .then((response) => response.json())
          .then((json) => {
            if (json.ok) {
              const result = json.result;
              this.$store.dispatch('updateShortifyFormModel', {fieldName: 'url', value: result.full_short_link}); //Set model url field value to shortlink (which updates input box)
              this.$store.dispatch('addToHistory', result);
              this.shortified = true;
            } else {
              this.$store.dispatch('alert', json.error);
            }
            this.$store.dispatch('endFetch');
          })
          .catch((error) => {
            this.$store.dispatch('alert', error);
            this.$store.dispatch('endFetch');
          });
      }
    },
    resetErrors() {
      this.shortifyFormModel.clearErrors();
    },
    resetShortified() { //Run when inputbox is edited
      if (!this.shortifyFormModel.fields.url.value.includes('shrtco.de')) {
        this.shortified = false;
      }
    }
  },
  watch: {
    fetching() { //Adds fetching class to html which controls cursor
      let html = document.getElementsByTagName('html')[0];
      if (this.fetching) {
        html.classList.add('fetching');
      } else {
        html.classList.remove('fetching');
      }
    }
  }
}

</script>

<style lang="scss">
  @import "./assets/css/variables.scss";
  @import "./assets/css/main.scss";
  @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Oswald&display=swap');

  #app {
    margin: 20vh 0 6rem;

    .content-wrapper {
      width: 40rem;
      max-width: 80vw;
      margin: 4rem auto;
    }

    section.title {
      padding: 2rem;
      text-align: center;

      h1 {
        margin: 0;
        text-shadow: .25rem .25rem 0 $colour-tertiary, -.25rem -.25rem 0 $colour-tertiary;
      }
    }

    @media screen and (max-width: 360px) {
        section.title {
          padding: .75rem;
        }
    }
  
  }

</style>
