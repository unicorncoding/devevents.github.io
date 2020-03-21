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
              <div class="tabs is-centered is-fullwidth">
                <ul>
                  <li
                    :class="{ 'is-active': newEvent.category === 'conference' }"
                  >
                    <a @click="newEvent.category = 'conference'">Conference</a>
                  </li>
                  <li
                    :class="{ 'is-active': newEvent.category === 'training' }"
                  >
                    <a @click="newEvent.category = 'training'">Training</a>
                  </li>
                  <li :class="{ 'is-active': newEvent.category === 'meetup' }">
                    <a @click="newEvent.category = 'meetup'">Meetup</a>
                  </li>
                </ul>
              </div>
              <br />
              <article class="message is-danger" v-if="globalError">
                <div class="message-body">
                  {{ globalError }}
                </div>
              </article>
              <div class="columns is-marginless">
                <div class="column is-one-third">
                  <h2 class="subtitle is-5 has-text-grey">
                    Main info <span class="has-text-danger">*</span>
                  </h2>
                </div>
                <div class="column is-two-thirds">
                  <div class="field">
                    <div class="control">
                      <div
                        class="is-small select is-fullwidth"
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
                        class="is-small input"
                        placeholder="Name"
                        v-model="newEvent.name"
                        :class="{ 'is-danger': validationErrors.name }"
                      />
                    </div>
                  </div>

                  <div class="field">
                    <div class="control">
                      <input
                        class="is-small input"
                        placeholder="Website"
                        v-model="newEvent.url"
                        :class="{ 'is-danger': validationErrors.url }"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="columns is-marginless">
                <div class="column is-one-third">
                  <h2 class="subtitle is-5 has-text-grey">
                    Location <span class="has-text-danger">*</span>
                  </h2>
                </div>
                <div class="column is-two-thirds">
                  <div class="field">
                    <div class="field">
                      <p class="control">
                        <span
                          class="is-small select is-fullwidth"
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

                    <div class="field">
                      <div class="field">
                        <p class="control">
                          <input
                            class="is-small input"
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
                    Date (from - to) <span class="has-text-danger">*</span>
                  </h2>
                </div>
                <div class="column is-two-thirds">
                  <div class="field is-horizontal">
                    <div class="field-body">
                      <div class="field">
                        <p class="control">
                          <input
                            v-model="newEvent.startDate"
                            class="is-small input"
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
                            class="is-small input"
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
              <div
                class="columns is-marginless"
                v-if="newEvent.category !== 'training'"
              >
                <div class="column is-one-third">
                  <h2 class="subtitle is-5 has-text-grey">Call for papers</h2>
                </div>
                <div class="column is-two-thirds">
                  <div class="field">
                    <div class="field">
                      <p class="control">
                        <input
                          class="is-small input"
                          type="text"
                          placeholder="YYYY-MM-DD"
                          v-model="newEvent.cfpEndDate"
                          :class="{ 'is-danger': validationErrors.cfpEndDate }"
                        />
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <div class="field">
                      <p class="control">
                        <input
                          class="is-small input"
                          type="text"
                          placeholder="URL"
                          v-model="newEvent.cfpUrl"
                          :class="{ 'is-danger': validationErrors.cfpUrl }"
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
export default {
  data: () => {
    return {
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
      if (this.isOnline) {
        this.newEvent.city = "Online";
      } else {
        delete this.newEvent.city;
      }
    },
    submitForm() {
      this.createNew(this.newEvent);
    },
    close() {
      const back = { path: this.$route.path.replace("/new", "") };
      this.$router.push(back);
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
  background-color: #42b983;
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
.select select:not([multiple]) {
  height: calc(2.25em);
}
</style>
