<template>
  <div class="dropdown is-hoverable">
    <button
      class="button is-small is-outlined"
      aria-haspopup="true"
      aria-controls="add-to-calendar-menu"
    >
      <span class="icon"
        ><font-awesome-icon :icon="['far', 'calendar-plus']"
      /></span>
      <span>Add to calendar</span>
    </button>
    <div
      class="dropdown-menu add-to-calendar-menu"
      id="add-to-calendar-menu"
      role="menu"
    >
      <div class="dropdown-content">
        <a class="dropdown-item" @click="exportTo('appleical')">
          Apple/iCal
        </a>
        <a class="dropdown-item" @click="exportTo('google')">
          Google Calendar
        </a>
        <a class="dropdown-item" @click="exportTo('office365')">
          Office 365
        </a>
        <a class="dropdown-item" @click="exportTo('outlook')">
          Outlook
        </a>
        <a class="dropdown-item" @click="exportTo('outlookcom')">
          Outlook.com
        </a>
        <a class="dropdown-item" @click="exportTo('yahoo')">
          Yahoo
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    title() {
      return this.event.name + " via dev.events";
    },
    description() {
      return (
        this.event.name + ": https://dev.events/conferences/" + this.event.id
      );
    },
    location() {
      return this.event.countryCode === "ON"
        ? "Online"
        : `${this.event.city}, ${this.event.country}`;
    },
    exportTo(service) {
      // remember to url encode
      window.open(
        `https://www.addevent.com/create/?service=${service}&dallday=true&dstart=${
          this.event.startDate
        }&dend=${
          this.event.endDate
        }&dsum=${this.title()}&ddesc=${this.description()}&dloca=${this.location()}`,
        "_blank"
      );
    }
  }
};
</script>
