<template>
  <span>
    <a @click="copyCalendarLink()">
      <i class="far fa-calendar-check"></i>
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
            title: "Copied",
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
