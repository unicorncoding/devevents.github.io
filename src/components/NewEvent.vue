<template>
  <div>
    <div
      class="modal is-active"
      ref="modal"
      tabindex="0"
      @keydown.esc="close()"
    >
      <div class="modal-background"></div>
      <div class="modal-content">
        <section class="section is-marginless is-paddingless">
          <div class="columns is-centered">
            <div class="column has-background-white" style="padding: 50px">
              <article class="message is-danger" v-if="globalError">
                <div class="message-body">{{ globalError }}</div>
              </article>
              <div class="columns is-marginless">
                <div class="column is-one-third">
                  <h2 class="subtitle is-5 has-text-grey">
                    Main info
                    <span class="has-text-danger">*</span>
                  </h2>
                </div>
                <div class="column is-two-thirds">
                  <div class="field">
                    <div class="control">
                      <div
                        class=" select is-fullwidth"
                        :class="{ 'is-danger': validationErrors.topicCode }"
                      >
                        <select v-model="newEvent.topicCode">
                          <option
                            v-for="topic in topics"
                            :key="topic.code"
                            :value="topic.code"
                            >{{ topic.name }} {{ newEvent.category }}</option
                          >
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="field">
                    <div class="control">
                      <input
                        class=" input"
                        placeholder="Name"
                        v-model="newEvent.name"
                        :class="{ 'is-danger': validationErrors.name }"
                      />
                    </div>
                  </div>

                  <div class="field">
                    <div class="control">
                      <input
                        class=" input"
                        placeholder="Website"
                        v-model="newEvent.url"
                        :class="{ 'is-danger': validationErrors.url }"
                      />
                    </div>
                  </div>

                  <div class="field">
                    <div class="control">
                      <input
                        class=" input"
                        placeholder="@twitter"
                        v-model="newEvent.twitter"
                        :class="{ 'is-danger': validationErrors.twitter }"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="columns is-marginless">
                <div class="column is-one-third">
                  <h2 class="subtitle is-5 has-text-grey">
                    Location
                    <span class="has-text-danger">*</span>
                  </h2>
                </div>
                <div class="column is-two-thirds">
                  <div class="field">
                    <div class="field">
                      <p class="control">
                        <span
                          class=" select is-fullwidth"
                          :class="{ 'is-danger': validationErrors.countryCode }"
                        >
                          <select
                            v-model="newEvent.countryCode"
                            @change="countrySelected()"
                          >
                            <option disabled selected :value="undefined"
                              >Choose country...</option
                            >
                            <option
                              v-for="country in countries"
                              :key="country.code"
                              :value="country.code"
                              >{{ country.name }}</option
                            >
                          </select>
                        </span>
                      </p>
                    </div>

                    <div class="field" v-if="isUSA">
                      <div class="field">
                        <p class="control">
                          <span
                            class=" select is-fullwidth"
                            :class="{ 'is-danger': validationErrors.stateCode }"
                          >
                            <select v-model="newEvent.stateCode">
                              <option disabled selected :value="undefined"
                                >Choose state...</option
                              >
                              <option
                                v-for="(stateName, stateCode) in states"
                                :key="stateCode"
                                :value="stateCode"
                                >{{ stateName }}</option
                              >
                            </select>
                          </span>
                        </p>
                      </div>
                    </div>

                    <div class="field">
                      <div class="field">
                        <p class="control">
                          <input
                            class=" input"
                            placeholder="City"
                            :disabled="isOnline"
                            v-model="newEvent.city"
                            :class="{ 'is-danger': validationErrors.city }"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns is-marginless">
                <div class="column is-one-third">
                  <h2 class="subtitle is-5 has-text-grey">
                    Date (from - to)
                    <span class="has-text-danger">*</span>
                  </h2>
                </div>
                <div class="column is-two-thirds">
                  <div class="field is-horizontal">
                    <div class="field-body">
                      <div class="field">
                        <p class="control">
                          <input
                            v-model="newEvent.startDate"
                            class=" input"
                            type="text"
                            placeholder="YYYY-MM-DD"
                            :class="{ 'is-danger': validationErrors.startDate }"
                          />
                        </p>
                      </div>
                      <div class="field">
                        <p class="control">
                          <input
                            v-model="newEvent.endDate"
                            class=" input"
                            type="text"
                            placeholder="YYYY-MM-DD"
                            :class="{ 'is-danger': validationErrors.endDate }"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr style="margin-top: 0" />
              <div class="columns is-marginless">
                <div class="column is-one-third">
                  <h2 class="subtitle is-5 has-text-grey">Call for papers</h2>
                </div>
                <div class="column is-two-thirds">
                  <div class="field">
                    <div class="field">
                      <p class="control">
                        <input
                          class=" input"
                          type="text"
                          placeholder="URL"
                          v-model="newEvent.cfpUrl"
                          :class="{ 'is-danger': validationErrors.cfpUrl }"
                        />
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <div class="field">
                      <p class="control">
                        <input
                          class=" input"
                          type="text"
                          placeholder="YYYY-MM-DD"
                          v-model="newEvent.cfpEndDate"
                          :class="{ 'is-danger': validationErrors.cfpEndDate }"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="buttons is-pulled-right">
                <button class="button" @click="close()">close</button>
                <a class="button is-success" @click="submitForm()">Submit</a>
              </div>
            </div>
          </div>
        </section>
        <button
          @click="close()"
          class="modal-close is-large"
          aria-label="close"
        ></button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import states from "../utils/states";
export default {
  data: () => {
    return {
      states: states,
      newEvent: {
        countryCode: undefined,
        category: "conference",
        topicCode: "fullstack"
      }
    };
  },
  created() {
    this.newEvent.topicCode = this.$route.params.topic || "fullstack";

    if (this.$route.params.continent === "ON") {
      this.newEvent.countryCode = "ON";
      this.newEvent.city = "Online";
    } else {
      this.newEvent.countryCode = this.$route.params.country;
    }
  },
  computed: {
    isOnline() {
      return this.newEvent.countryCode === "ON";
    },
    isUSA() {
      return this.newEvent.countryCode === "US";
    },
    html() {
      return document.documentElement;
    },
    ...mapState("creation", {
      validationErrors: state => state.validationErrors,
      globalError: state => state.globalError,
      topics: state => state.topics,
      countries: state => state.countries
    })
  },
  mounted() {
    this.$refs.modal.focus();
    this.html.classList.add("is-clipped");
    this.fetchInfo();
  },
  beforeDestroy() {
    this.html.classList.remove("is-clipped");
  },
  methods: {
    countrySelected() {
      delete this.newEvent.stateCode;
      delete this.newEvent.city;
      if (this.isOnline) {
        this.newEvent.city = "Online";
      }
    },
    submitForm() {
      this.createNew(this.newEvent);
    },
    close() {
      this.$router.go(-1);
    },
    ...mapActions("creation", ["createNew", "fetchInfo"])
  }
};
</script>
<style lang="scss" scoped>
.tabs .is-active a {
  color: #42b983 !important;
  border-color: #42b983 !important;
  font-weight: bold;
}

.is-success {
  background-color: #42b983 !important;
}

select {
  border-width: 1px;
}

input,
select {
  background-color: hsl(0, 0%, 98%);
}
.select:not(.is-multiple):not(.is-loading)::after {
  border-color: hsl(0, 0%, 86%);
}
.field {
  margin-bottom: 1em;
}
hr {
  margin-top: 0px;
}
</style>
