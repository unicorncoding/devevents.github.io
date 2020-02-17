<template>
  <span>
    <a @click="copyRssLink()">
      <i class="fas fa-rss"></i>
      export rss
    </a>
  </span>
</template>
<script>
export default {
  methods: {
    copyRssLink() {
      const rssLink =
        "https://dev.events/api/events/rss" + this.$route.fullPath;
      this.$copyText(rssLink).then(
        () => {
          this.$notify({
            ignoreDuplicates: true,
            title: "RSS link copied to clipboard",
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
