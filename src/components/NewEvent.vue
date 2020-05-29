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
                        class="select is-fullwidth"
                        :class="{ 'is-danger': validationErrors.topicCode }"
                      >
                        <select
                          v-model="newEvent.topicCode"
                          class="is-borderless"
                        >
                          <option
                            v-for="topic in topics"
                            :key="topic.code"
                            :value="topic.code"
                            >{{ topic.name }} conference</option
                          >
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="field">
                    <div class="control">
                      <input
                        class=" input is-borderless is-shadowless"
                        placeholder="name"
                        v-model="newEvent.name"
                        :class="{ 'is-danger': validationErrors.name }"
                      />
                    </div>
                  </div>

                  <div class="field">
                    <div class="control">
                      <input
                        class=" input is-borderless is-shadowless"
                        placeholder="url"
                        v-model="newEvent.url"
                        :class="{ 'is-danger': validationErrors.url }"
                      />
                    </div>
                  </div>

                  <div class="field">
                    <div class="control">
                      <input
                        class=" input is-borderless is-shadowless"
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
                          class=" select is-fullwidth "
                          :class="{ 'is-danger': validationErrors.countryCode }"
                        >
                          <select
                            class="is-borderless"
                            v-model="newEvent.countryCode"
                            @change="countrySelected()"
                          >
                            <option disabled selected :value="undefined"
                              >choose country...</option
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
                            <select
                              v-model="newEvent.stateCode"
                              class="is-borderless is-shadowless"
                            >
                              <option disabled selected :value="undefined"
                                >choose state...</option
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
                            class=" input is-borderless is-shadowless"
                            placeholder="city"
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
                    Date
                    <span class="has-text-danger">*</span>
                  </h2>
                </div>
                <div class="column is-two-thirds">
                  <div class="field">
                    <div class="field-body">
                      <div class="field">
                        <p class="control">
                          <DatePicker
                            mode="range"
                            v-model="datePickerDates"
                            color="green"
                            :popover="{ visibility: 'click' }"
                            :masks="{ input: ['D MMM YYYY'] }"
                            :input-props="{
                              placeholder: 'date (from - to)',
                              readonly: true
                            }"
                            :min-date="tomorrow()"
                            :columns="$screens({ default: 1, lg: 2 })"
                          >
                            <input
                              slot-scope="{
                                inputProps,
                                inputEvents,
                                isDragging
                              }"
                              :class="[
                                'input is-borderless is-shadowless',
                                { 'has-text-grey-lighter': isDragging },
                                { 'is-danger': validationErrors.dates }
                              ]"
                              v-bind="inputProps"
                              v-on="inputEvents"
                            />
                          </DatePicker>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="columns is-marginless">
                <div class="column is-one-third">
                  <h2 class="subtitle is-5 has-text-grey">
                    Price
                  </h2>
                </div>
                <div class="column is-two-thirds">
                  <div class="field">
                    <div class="field has-addons">
                      <a @click="toggleFree()" class="has-text-grey">
                        <font-awesome-icon
                          :icon="[
                            'far',
                            this.newEvent.price.free ? 'check-circle' : 'circle'
                          ]"
                        />
                        this is a free event
                      </a>
                    </div>
                    <div class="field-body" v-if="!newEvent.price.free">
                      <div class="field">
                        <p class="control">
                          <input
                            class="input"
                            placeholder="from"
                            :class="{ 'is-danger': validationErrors.price }"
                            v-model="newEvent.price.from"
                          />
                        </p>
                      </div>
                      <div class="field">
                        <p class="control">
                          <input
                            class="input"
                            placeholder="to"
                            :class="{ 'is-danger': validationErrors.price }"
                            v-model="newEvent.price.to"
                          />
                        </p>
                      </div>
                      <div class="field">
                        <div class="control">
                          <div
                            class="select is-fullwidth"
                            :class="{ 'is-danger': validationErrors.price }"
                          >
                            <select
                              v-model="newEvent.price.currency"
                              class="is-borderless"
                            >
                              <option
                                v-for="curr in currencies"
                                :key="curr"
                                :value="curr"
                                >{{ curr }}</option
                              >
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr style="margin: top: 0" />

              <div class="columns is-marginless">
                <div class="column is-one-third">
                  <h2 class="subtitle is-5 has-text-grey">Call for papers</h2>
                </div>
                <div class="column is-two-thirds">
                  <div class="field">
                    <div class="field">
                      <p class="control">
                        <input
                          class=" input is-borderless is-shadowless"
                          type="text"
                          placeholder="url"
                          v-model="newEvent.cfpUrl"
                          :class="{ 'is-danger': validationErrors.cfpUrl }"
                        />
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <div class="field">
                      <p class="control">
                        <DatePicker
                          v-model="datePickerCfpEndDate"
                          color="green"
                          :popover="{ visibility: 'click' }"
                          :masks="{ input: ['D MMM YYYY'] }"
                          :input-props="{
                            placeholder: 'end date'
                          }"
                          :min-date="tomorrow()"
                        >
                          <input
                            slot-scope="{ inputProps, inputEvents }"
                            :class="[
                              'input is-borderless is-shadowless',
                              { 'is-danger': validationErrors.cfpEndDate }
                            ]"
                            v-bind="inputProps"
                            v-on="inputEvents"
                          />
                        </DatePicker>
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
          class="modal-close is-large has-background-white"
          aria-label="close"
        ></button>
      </div>
    </div>
  </div>
</template>
<script>
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import { Locale } from "v-calendar";
import { mapState, mapActions } from "vuex";
import { tomorrow } from "../utils/dates";
import states from "../utils/states";
const locale = new Locale();
export default {
  data: () => {
    return {
      states: states,
      newEvent: {
        price: {
          free: false
        },
        dates: undefined,
        countryCode: undefined,
        topicCode: undefined
      }
    };
  },
  created() {
    this.newEvent.topicCode = this.$route.params.topic || "fullstack";
    this.newEvent.price.currency =
      this.$route.params.continent === "EU" ? "EUR" : "USD";
    if (this.$route.params.continent === "ON") {
      this.newEvent.countryCode = "ON";
      this.newEvent.city = "Online";
    } else {
      this.newEvent.countryCode = this.$route.params.country;
    }
  },
  computed: {
    datePickerCfpEndDate: {
      get() {
        return this.newEvent.cfpEndDate
          ? locale.parse(this.newEvent.cfpEndDate, "YYYY-MM-DD")
          : undefined;
      },
      set(cfpEndDate) {
        this.newEvent.cfpEndDate = locale.format(cfpEndDate, "YYYY-MM-DD");
      }
    },
    datePickerDates: {
      get() {
        return this.newEvent.dates
          ? {
              start: locale.parse(this.newEvent.dates.start, "YYYY-MM-DD"),
              end: locale.parse(this.newEvent.dates.end, "YYYY-MM-DD")
            }
          : undefined;
      },
      set({ start, end }) {
        this.newEvent.dates = {
          start: locale.format(start, "YYYY-MM-DD"),
          end: locale.format(end, "YYYY-MM-DD")
        };
      }
    },
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
      countries: state => state.countries,
      currencies: state =>
        new Set(
          state.countries
            .map(({ currency }) => currency)
            .filter(Boolean)
            .sort()
        )
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
    tomorrow,
    toggleFree() {
      this.newEvent.price.free = !this.newEvent.price.free;
      delete this.newEvent.price.from;
      delete this.newEvent.price.to;
    },
    countrySelected() {
      delete this.newEvent.stateCode;
      delete this.newEvent.city;

      const countrySpecificCurrency = this.countries.find(
        ({ code }) => code === this.newEvent.countryCode
      ).currency;
      if (countrySpecificCurrency) {
        this.newEvent.price.currency = countrySpecificCurrency;
      }

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
  },
  components: { DatePicker }
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

.modal-close::before,
.modal-close::after {
  background-color: black !important;
}

.field {
  margin-bottom: 1em;
}
.is-danger {
  border: 1px solid red !important;
  border-radius: 4px;
}
hr {
  margin-top: 0px;
}
</style>
