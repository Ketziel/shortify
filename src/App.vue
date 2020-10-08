<template>
  <div id="app">
    <div class="content-wrapper">
      <section class="title">
        <h1>Shortify</h1>
        <p>Enter a long url below, and click the button to shorten it. Easy!</p>
      </section>
      <section class="shortify">
        <InputFieldShortifyUrl placeholder="Paste a URL" :field="this.shortifyFormModel.fields.url" v-on:onButtonClick="genShortUrl"/>
      </section>
    </div>
  </div>
</template>

<script>
import {getShortUrl} from "./api/api.shrtco.de.js"

import InputFieldShortifyUrl from './components/InputFieldShortifyUrl.vue'

export default {
  name: 'App',
  components: {
    InputFieldShortifyUrl
  },
  data() {
      return {
          test: 'NOT FETCHED YET'
      };
  },
  computed: {
    shortifyFormModel() {
        return this.$store.state.shortify.shortifyFormModel;
    },
  },
  async created() {

    this.$store.dispatch('createShortifyFormModel');

    // await getShortUrl('https://github.com/Ketziel/shortify')
    // .then((response) => response.json())
    //   .then((json) => {
    //     this.test = json.result.full_short_link;
    //   })
    // .catch((error) => {
    //     console.log(error);
    // });
  },
  methods: {
    genShortUrl(){
      if (this.shortifyFormModel.validate()) {
        getShortUrl(this.shortifyFormModel.fields.url.value)
        .then((response) => response.json())
          .then((json) => {
            this.$store.dispatch('updateShortifyFormModel', {fieldName: 'url', value: json.result.full_short_link});
          })
        .catch((error) => {
            console.log(error);
        });
      }
    }
  }
}
</script>

<style lang="scss">
  @import "./assets/css/main.scss";
  @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Oswald&display=swap');

  #app {
    margin-top: 20vh;

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
      }
    }
  
    section.shortify {
      
      //background-color: #ECD18E;
    }
  }

</style>
