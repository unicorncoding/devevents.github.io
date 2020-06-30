<template>
  <script type="application/ld+json">
    {{jsonld}}
  </script>
</template>
<script>
import dayjs from "dayjs";
export default {
  name: "JsonLd",
  props: {
    course: {
      required: true,
      type: Object
    }
  },
  created() {
    const yearAgo = dayjs()
      .subtract(1, "year")
      .toDate();
    const endOfYear = dayjs()
      .endOf("year")
      .toDate();
    const offers = this.course.offers.map(offer => ({
      "@type": "Offer",
      price: offer.price,
      priceCurrency: "EUR",
      validFrom: yearAgo,
      availability: "https://schema.org/InStock",
      url: "https://dev.events"
    }));
    const image = this.course.trainer.background;
    const organizer = {
      "@type": "Organization",
      name: "dev.events",
      url: "https://dev.events"
    };
    const description = this.course.tldr;
    this.jsonld = {
      "@context": "http://schema.org",
      "@type": "EducationEvent",
      name: this.course.title + " by " + this.course.trainer.title,
      eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      description: description,
      startDate: endOfYear,
      endDate: endOfYear,
      image,
      organizer,
      offers,
      isAccessibleForFree: false,
      performer: {
        "@type": "Organization",
        name: "dev.events"
      },
      location: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "In-house",
          addressRegion: "In your office"
        },
        name: "In-house, in your office"
      }
    };
  }
};
</script>
