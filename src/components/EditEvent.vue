<template>
  <div>
    <section class="container section" role="main">
      <h1 class="title">Edit a conference</h1>
      <hr />
      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field">
            <div class="control">
              <textarea class="textarea" v-model="json" rows="30"></textarea>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="buttons is-pulled-right">
        <button class="button" @click="close()">
          close
        </button>
        <button class="button is-success" @click="save()">
          Save
        </button>
      </div>
      <button
        @click="close()"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </section>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import lazyAxios from "../utils/axios";
export default {
  created() {
    const id = this.$route.params.id;
    lazyAxios()
      .then(axios => axios.get(`/events/fetch/${id}`))
      .then(({ data }) => data)
      .then(
        ({
          startDate,
          continentCode,
          topicCode,
          endDate,
          id,
          topics,
          top,
          countryCode,
          name
        }) => ({
          startDate,
          endDate,
          id,
          topicCode: topicCode || undefined,
          continentCode,
          topics,
          top,
          countryCode,
          name
        })
      )
      .then(data => (this.json = JSON.stringify(data, undefined, 2)));
  },
  data: () => {
    return {
      json: ""
    };
  },
  methods: {
    close() {
      this.$router.go(-1);
    },
    save() {
      let eventJson = JSON.parse(this.json);
      this.updateEvent(eventJson);
    },
    ...mapActions(["updateEvent"])
  }
};
</script>
<style lang="scss" scoped>
.modal-close::before,
.modal-close::after {
  background-color: black !important;
}
</style>
