<template>
  <span>
    <a @click="copyCalendarLink()">
      <font-awesome-icon :icon="['far', 'calendar-check']" />
      export cal
    </a>
  </span>
</template>
<script>
export default {
  methods: {
    copyCalendarLink() {
      const rssLink =
        "https://dev.events/api/events/cal" + this.$route.fullPath;
      this.$copyText(rssLink).then(
        () => {
          this.$notify({
            ignoreDuplicates: true,
            title: "iCal link copied to clipboard",
            type: "success",
            text: rssLink
          });
        },
        () => {
          this.$notify({
            ignoreDuplicates: true,
            title: "Unable to copy the link",
            type: "error",
            duration: -1,
            text: rssLink
          });
        }
      );
    }
  }
};
</script>
