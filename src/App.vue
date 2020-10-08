<template>
  <div id="app">
    <div class="content-wrapper">
      <section class="title">
        <h1>Shortify</h1>
        <p>Enter a long url below, and click the button to shorten it. Easy!</p>
      </section>
      <section class="shortify">
        <InputFieldShortifyUrl placeholder="Paste a URL" :field="this.shortifyFormModel.fields.url" :shortified="shortified" v-on:onButtonClick="genShortUrl" v-on:onChange="resetErrors"/>
      </section>
    </div>
    <ErrorAlert />
  </div>
</template>

<script>
import {getShortUrl} from "./api/api.shrtco.de.js"

import InputFieldShortifyUrl from './components/InputFieldShortifyUrl.vue'
import ErrorAlert from './components/ErrorAlert.vue'

export default {
  name: 'App',
  components: {
    InputFieldShortifyUrl,
    ErrorAlert
  },
  data() {
      return {
          shortified: false
      };
  },
  computed: {
    shortifyFormModel() {
        return this.$store.state.shortify.shortifyFormModel;
    },
  },
  async created() {
    this.$store.dispatch('createShortifyFormModel');
  },
  methods: {
    genShortUrl(){
      if (!this.shortified && this.shortifyFormModel.validate()) {
        getShortUrl(this.shortifyFormModel.fields.url.value)
        .then((response) => response.json())
          .then((json) => {
            if (json.ok) {
              this.$store.dispatch('updateShortifyFormModel', {fieldName: 'url', value: json.result.full_short_link});
              this.shortified = true;
            } else {
              this.$store.dispatch('alert', json.error);
            }
          })
          .catch((error) => {
            this.$store.dispatch('alert', error);
          });
      }
    },
    resetErrors() {
      this.shortifyFormModel.clearErrors();
      this.shortified = false;
    }
  }
}
</script>

<style lang="scss">
  @import "./assets/css/main.scss";
  @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Oswald&display=swap');

  #app {
    margin: 20vh 0 6rem;

    .content-wrapper {
      width: 40rem;
      max-width: 80vw;
      margin: auto;
    }

    section.title {
      background-color: #88AB81;
      padding: 2rem;
      text-align: center;

      h1 {
        margin: 0;
        text-shadow: .25rem .25rem 0 #ECD18E, -.25rem -.25rem 0 #ECD18E;
      }
    }
  
    section.shortify {
      
      //background-color: #ECD18E;
    }
  }

</style>
