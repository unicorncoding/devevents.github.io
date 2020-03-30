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
    const online = this.event.country === "Online";
    const mode = online
      ? "OnlineEventAttendanceMode"
      : "OfflineEventAttendanceMode";
    const description = online
      ? `Online ${this.event.topic} developer ${this.event.category}`
      : `${this.event.topic} developer ${this.event.category} in ${this.event.city}, ${this.event.country}`;
    this.jsonld = {
      "@context": "http://schema.org",
      "@type": "EducationEvent",
      name: this.event.name,
      eventAttendanceMode: "https://schema.org/" + mode,
      eventStatus: "https://schema.org/EventScheduled",
      description: description,
      startDate: this.event.startDate,
      endDate: this.event.endDate,
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
        name: `${this.event.city}, ${this.event.country}`
      }
    };
  }
};
</script>
