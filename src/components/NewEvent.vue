<template>
  <div>
    <section class="container section">
      <h1 class="title is-3">Add new conference</h1>
      <hr />
      <div class="columns is-centered">
        <div class="column">
          <article class="message is-danger" v-if="globalError">
            <div class="message-body">{{ globalError }}</div>
          </article>
          <div class="columns is-marginless">
            <div class="column is-one-third">
              <h2 class="subtitle is-5 has-text-grey">
                Main info
              </h2>
            </div>
            <div class="column is-two-thirds">
              <div class="field">
                <div class="control">
                  <v-select
                    multiple
                    :options="topics"
                    v-model="newEvent.topics"
                    label="name"
                    :class="{ 'is-danger': validationErrors.topics }"
                    :selectable="() => newEvent.topics.length < 3"
                    :reduce="item => item.code"
                    placeholder="Specialization / emphasis on..."
                  >
                    <template #search="{ attributes, events }">
                      <input
                        maxlength="1"
                        class="vs__search"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                    <template v-slot:option="option">
                      <div class="columns is-mobile">
                        <div class="column is-narrow">
                          <img
                            :src="'/icons/topics/' + option.code + '.png'"
                            :alt="option.code"
                            class="icon"
                          />
                        </div>
                        <div class="column">
                          {{ option.name }}
                        </div>
                      </div>
                    </template>
                  </v-select>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    class="input is-shadowless"
                    placeholder="Name"
                    v-model="newEvent.name"
                    :class="{ 'is-danger': validationErrors.name }"
                  />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    class="input is-shadowless"
                    placeholder="URL"
                    v-model="newEvent.url"
                    :class="{ 'is-danger': validationErrors.url }"
                  />
                </div>
              </div>

              <div class="field">
                <div class="control has-icons-left">
                  <input
                    class="input is-shadowless"
                    v-model="newEvent.twitter"
                    :class="{ 'is-danger': validationErrors.twitter }"
                  />
                  <span class="icon is-left">
                    <font-awesome-icon :icon="['fab', 'twitter']" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="columns is-marginless">
            <div class="column is-one-third">
              <h2 class="subtitle is-5 has-text-grey">
                Location and date
              </h2>
            </div>
            <div class="column is-two-thirds">
              <div class="field">
                <div class="field">
                  <p class="control">
                    <span
                      class="select is-fullwidth"
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
                        <select
                          v-model="newEvent.stateCode"
                          class="is-shadowless"
                        >
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

                <div class="field" v-if="!isOnline">
                  <div class="field">
                    <p class="control">
                      <input
                        class=" input  is-shadowless"
                        placeholder="City"
                        :disabled="isOnline"
                        v-model="newEvent.city"
                        :class="{ 'is-danger': validationErrors.city }"
                      />
                    </p>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-body">
                    <div class="field">
                      <p class="control">
                        <DatePicker
                          v-model="datePickerStartDate"
                          color="green"
                          :popover="{ visibility: 'click' }"
                          :masks="{ input: ['D MMM YYYY'] }"
                          :input-props="{
                            placeholder: 'Date (from)'
                          }"
                          :min-date="tomorrow()"
                        >
                          <input
                            slot-scope="{ inputProps, inputEvents, isDragging }"
                            :class="[
                              'input  is-shadowless',
                              { 'has-text-grey-lighter': isDragging },
                              { 'is-danger': validationErrors.dates }
                            ]"
                            v-bind="inputProps"
                            v-on="inputEvents"
                          />
                        </DatePicker>
                      </p>
                    </div>
                    <div class="field">
                      <p class="control">
                        <DatePicker
                          v-model="datePickerEndDate"
                          color="green"
                          :popover="{ visibility: 'click' }"
                          :masks="{ input: ['D MMM YYYY'] }"
                          :input-props="{
                            placeholder: 'Date (to)'
                          }"
                          :min-date="newEvent.dates.start"
                        >
                          <input
                            slot-scope="{ inputProps, inputEvents, isDragging }"
                            :class="[
                              'input  is-shadowless',
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
          </div>
          <hr />
          <div class="columns is-marginless">
            <div class="column is-one-third">
              <h2 class="subtitle is-5 has-text-grey">
                Price
              </h2>
            </div>
            <div class="column is-two-thirds">
              <div class="field">
                <div class="field has-addons">
                  <button
                    @click="toggleFree()"
                    class="button is-small is-borderless"
                  >
                    <span class="icon is-small">
                      <font-awesome-icon
                        :icon="[
                          'far',
                          this.newEvent.price.free ? 'check-circle' : 'circle'
                        ]"
                      />
                    </span>
                    <span>Free event</span>
                  </button>
                </div>
                <div class="field-body" v-if="!newEvent.price.free">
                  <div class="field">
                    <p class="control">
                      <input
                        class="input  is-shadowless"
                        placeholder="From"
                        :class="{ 'is-danger': validationErrors.price }"
                        v-model.number="newEvent.price.from"
                      />
                    </p>
                  </div>
                  <div class="field">
                    <p class="control">
                      <input
                        class="input  is-shadowless"
                        placeholder="To"
                        :class="{ 'is-danger': validationErrors.price }"
                        v-model.number="newEvent.price.to"
                      />
                    </p>
                  </div>
                  <div class="field">
                    <div class="control">
                      <div
                        class="select is-fullwidth"
                        :class="{ 'is-danger': validationErrors.price }"
                      >
                        <select v-model="newEvent.price.currency">
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
          <hr />
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
</template>
<script>
import vSelect from "vue-select";
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
        topics: [],
        price: {
          free: false
        },
        dates: {
          start: undefined,
          end: undefined
        },
        countryCode: undefined,
        topicCode: undefined
      }
    };
  },
  created() {
    this.newEvent.topicCode = this.$route.query.topic || "fullstack";
    this.newEvent.price.currency =
      this.$route.query.continent === "EU" ? "EUR" : "USD";
    if (this.$route.query.continent === "ON") {
      this.newEvent.countryCode = "ON";
      this.newEvent.city = "Online";
    } else {
      this.newEvent.countryCode = this.$route.query.country;
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
    datePickerEndDate: {
      get() {
        return this.newEvent.dates.end
          ? locale.parse(this.newEvent.dates.end, "YYYY-MM-DD")
          : undefined;
      },
      set(endDate) {
        this.newEvent.dates.end = endDate
          ? locale.format(endDate, "YYYY-MM-DD")
          : undefined;
      }
    },
    datePickerStartDate: {
      get() {
        return this.newEvent.dates.start
          ? locale.parse(this.newEvent.dates.start, "YYYY-MM-DD")
          : undefined;
      },
      set(startDate) {
        this.newEvent.dates.start = startDate
          ? locale.format(startDate, "YYYY-MM-DD")
          : undefined;
      }
    },
    isOnline() {
      return this.newEvent.countryCode === "ON";
    },
    isUSA() {
      return this.newEvent.countryCode === "US";
    },
    ...mapState("creation", {
      validationErrors: state => state.validationErrors,
      globalError: state => state.globalError,
      topics: state => state.topics,
      countries: state =>
        state.countries.map(({ code, name }) => ({
          code,
          name: code === "ON" ? name.toUpperCase() : name
        })),
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
    this.fetchInfo();
  },
  head: {
    title: function() {
      return {
        separator: " ",
        complement: " ",
        inner: "Add new event"
      };
    }
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
      this.$router.push({ name: "confs", params: this.$route.query });
    },
    ...mapActions("creation", ["createNew", "fetchInfo"])
  },
  components: { DatePicker, vSelect }
};
</script>
<style lang="scss" scoped>
.modal-close::before,
.modal-close::after {
  background-color: black !important;
}
</style>
