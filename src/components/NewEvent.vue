<template>
  <div>
    <section class="container section">
      <h1 class="title">🚀 Add a conference</h1>
      <hr />
      <article class="message is-danger" v-if="globalError">
        <div class="message-body">{{ globalError }}</div>
      </article>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Specialization</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <v-select
                multiple
                filterable
                :options="topicsOrdered"
                v-model="newEvent.topics"
                label="name"
                :class="{ 'is-danger': validationErrors.topics }"
                :selectable="() => newEvent.topics.length < 3"
                :reduce="item => item.code"
              >
                <template #search="{ attributes, events }">
                  <input class="vs__search" v-bind="attributes" v-on="events" />
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
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Name</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                class="input is-shadowless"
                v-model="newEvent.name"
                :class="{ 'is-danger': validationErrors.name }"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Website</label>
        </div>
        <div class="field-body">
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
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Twitter</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left">
              <input
                placeholder="Can be a handle, @handle or a link"
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
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Country</label>
        </div>
        <div class="field-body">
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
        </div>
      </div>

      <div class="field is-horizontal" v-if="isUSA">
        <div class="field-label is-normal">
          <label class="label">State</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <span
                class="select is-fullwidth"
                :class="{ 'is-danger': validationErrors.stateCode }"
              >
                <select v-model="newEvent.stateCode" class="is-shadowless">
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
      </div>

      <div class="field is-horizontal" v-if="!isOnline">
        <div class="field-label is-normal">
          <label class="label">City</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="field">
              <div class="field">
                <p class="control">
                  <input
                    class="input is-shadowless"
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

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Date</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <DatePicker
                v-model="datePickerStartDate"
                color="green"
                :popover="{ visibility: 'click' }"
                :masks="{ input: ['D MMM YYYY'] }"
                :input-props="{
                  placeholder: 'From'
                }"
                :min-date="tomorrow()"
              >
                <input
                  slot-scope="{ inputProps, inputEvents, isDragging }"
                  :class="[
                    'input is-shadowless',
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
                  placeholder: 'To'
                }"
                :min-date="newEvent.dates.start"
              >
                <input
                  slot-scope="{ inputProps, inputEvents, isDragging }"
                  :class="[
                    'input is-shadowless',
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
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">Free event</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <label class="radio">
                <input
                  type="radio"
                  v-model="newEvent.price.free"
                  v-bind:value="true"
                />
                Yes
              </label>
              <label class="radio">
                <input
                  type="radio"
                  v-model="newEvent.price.free"
                  v-bind:value="false"
                />
                No
              </label>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!newEvent.price.free">
        <hr />
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Price</label>
          </div>
          <div class="field-body">
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
      <!-- <hr />
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"
            >Description <br /><span class="is-size-7 has-text-grey-light"
              >(optional)</span
            ></label
          >
        </div>
        <div class="field-body">
          <div class="field">
            <textarea
              class="textarea is-shadowless is-medium"
              v-bind:class="{ 'is-danger': isDescriptionTooLong() }"
              v-model.trim="newEvent.description"
              placeholder="A well-written description with program highlights makes the event stand out."
              rows="10"
            />
            <p class="help has-text-danger" v-if="isDescriptionTooLong()">
              The maximum description is {{ descriptionLimit }} chars.
            </p>
          </div>
        </div>
      </div> -->

      <hr />
      <div class="buttons is-pulled-right">
        <button class="button" @click="close()">
          close
        </button>
        <button
          class="button is-success"
          :disabled="isDescriptionTooLong()"
          @click="submitForm()"
        >
          Submit
        </button>
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
import { topicsOrdered } from "../utils/topics";
import states from "../utils/states";
const locale = new Locale();
export default {
  data: () => {
    return {
      descriptionLimit: 1500,
      topicsOrdered,
      states: states,
      newEvent: {
        topics: [],
        price: {
          free: true,
          currency: undefined
        },
        dates: {
          start: undefined,
          end: undefined
        },
        countryCode: undefined,
        description: ""
      }
    };
  },
  created() {
    const { topic, continent, country } = this.$route.query;

    if (topic) {
      this.newEvent.topics.push(topic);
    }
    if (continent === "ON") {
      this.newEvent.countryCode = "ON";
      this.newEvent.city = "Online";
    } else {
      this.newEvent.countryCode = country;
    }
  },
  computed: {
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
      countries: state =>
        state.countries.map(({ code, currency, name }) => ({
          code,
          currency,
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
    const that = this;
    this.fetchInfo().then(() => that.preselectCurrency());
  },
  head: {
    title: function() {
      return {
        separator: " ",
        complement: " ",
        inner: "Add a conference"
      };
    }
  },
  methods: {
    tomorrow,
    isDescriptionTooLong() {
      return this.newEvent.description.length > this.descriptionLimit;
    },
    toggleFree() {
      delete this.newEvent.price.from;
      delete this.newEvent.price.to;
    },
    countrySelected() {
      delete this.newEvent.stateCode;
      delete this.newEvent.city;

      this.preselectCurrency();

      if (this.isOnline) {
        this.newEvent.city = "Online";
      }
    },
    preselectCurrency() {
      const countrySpecificCurrency = this.countries.find(
        ({ code }) => code === this.newEvent.countryCode
      )?.currency;

      this.newEvent.price.currency =
        countrySpecificCurrency || (this.continent === "EU" ? "EUR" : "USD");
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
