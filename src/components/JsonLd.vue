<template>
  <script type="application/ld+json">
    {{jsonld}}
  </script>
</template>
<script>
export default {
  name: "JsonLd",
  props: {
    event: {
      required: true,
      type: Object
    }
  },
  created() {
    const image = this.event.twitter
      ? [`https://twitter-avatar.now.sh/${this.event.twitter}`]
      : undefined;
    const organizer = this.event.twitter
      ? {
          "@type": "Organization",
          name: this.event.twitter,
          url: this.event.url
        }
      : undefined;
    const online = this.event.country === "Online";
    const mode = online
      ? "OnlineEventAttendanceMode"
      : "OfflineEventAttendanceMode";
    const description = online
      ? `Online ${this.event.topic} developer conference`
      : `${this.event.topic} developer conference in ${this.event.city}, ${this.event.country}`;
    this.jsonld = {
      "@context": "http://schema.org",
      "@type": "EducationEvent",
      name: this.event.name,
      eventAttendanceMode: "https://schema.org/" + mode,
      eventStatus: "https://schema.org/EventScheduled",
      description: description,
      startDate: this.event.startDate,
      endDate: this.event.endDate,
      image,
      organizer,
      isAccessibleForFree: this.event.free === true,
      performer: {
        "@type": "Organization",
        name: this.event.name
      },
      location: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: this.event.city,
          addressRegion: this.event.country
        },
        name: online ? "Online" : `${this.event.city}, ${this.event.country}`
      }
    };
  }
};
</script>
