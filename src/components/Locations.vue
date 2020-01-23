<template>
  <div>
  <div class="continents is-relative">
      <div class="continent is-inline" v-for="(continent, index) in continents" :key="continent.code" v-bind:class="{'is-active': index == 0}" >
        <a class="continent-name has-text-grey-dark">{{ continent.name }}</a>
        <div class="countryPicker is-hidden">
          <div class="columns is-mobile is-marginless is-multiline">
            <div
              class="country column is-4"
              v-for="country in countriesBy(continent.code)"
              :key="country.code"
              >
              <img :src="icon(country)" />
              <router-link :to="newLocation(country.code)">{{ country.name }}</router-link>
              &nbsp;
              <span class="tag">{{country.count}}</span>
            </div>
          </div>
        </div>        
      </div>
  </div>      
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import mixins from "@/mixins/navigation";

export default {
  mixins: mixins,
  created() {
    this.fetchLocations();
  },
  data: function() {
    return {
      continentOpened: undefined
    }
  },
  methods: {
    icon(country) {
      const code = country.code.substr(3, 2).toLowerCase();
      return (
        "//cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/" +
        code +
        ".svg"
      );
    },
    countriesBy(continent) {
      return this.countries.filter(it => it.code.startsWith(continent));
    },
    ...mapActions(["fetchLocations"])
  },
  computed: {
    ...mapState(["continent", "continents", "countries"])
  }
};
</script>
<style scoped lang="scss">

.continents {
  margin-bottom: 1em;  
}

.continent {
  padding-bottom: 0.5em;
  border-bottom: 1px solid #dbdbdb;

  .countryPicker {
    width: 100%;
    background-color: #fff;
    box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 0;
    right: 0px;
    top: 2em;
    padding: 2em; 
    z-index: 1; 
    position: absolute; 
  }

  &:hover {
    .countryPicker {
        display: block !important;
    }
  }
  
  &:not(:last-of-type)::after {
    padding-bottom: 0.5em;
    border-bottom: 1px solid #dbdbdb;      
    content: " ";
    padding-right: 3em;
  }

  &.is-active {
   border-bottom: 1px solid #42b983; 
   .continent-name {
    //  color: #42b983 !important;
     font-weight: bold;
   }
  }

}

.country {
  img {
    height: 0.7em;
    margin-right: 5px;
    filter: grayscale(40%);
  }
  &:hover {
    color: black !important;
    cursor: pointer;
    filter: none;
  }  
}
</style>
