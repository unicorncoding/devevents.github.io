<template>
  <div class="has-background-white-bis">
    <Header />
    <section class="section" style="margin-top: 0; padding-top: 0">
      <div class="columns is-centered">
        <div
          class="column is-half has-background-white box"
          style="padding: 50px;"
        >
          <div class="tabs is-centered is-fullwidth">
            <ul>
              <li class="is-active">
                <a href="#">Conference</a>
              </li>
              <li>
                <a href="#">Training</a>
              </li>
              <li>
                <a href="#">Meetup</a>
              </li>
            </ul>
          </div>
          <br />
          <br />
          <div class="columns">
            <div class="column is-one-third">
              <h2 class="subtitle is-4">
                Main info <span class="has-text-danger">*</span>
              </h2>
            </div>
            <div class="column is-two-thirds">
              <div class="field">
                <label class="label has-text-weight-normal">Type </label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select>
                      <option></option>
                      <option>Full-stack conference</option>
                      <option>With options</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="field">
                <label class="label has-text-weight-normal">Name </label>
                <div class="control">
                  <input class="input" />
                </div>
              </div>

              <div class="field">
                <label class="label has-text-weight-normal">Website </label>
                <div class="control">
                  <input class="input" type="text" />
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div class="columns">
            <div class="column is-one-third">
              <h2 class="subtitle is-4">
                Location <span class="has-text-danger">*</span>
              </h2>
            </div>
            <div class="column is-two-thirds">
              <div class="field">
                <label class="label has-text-weight-normal">Country </label>
                <div class="field">
                  <p class="control">
                    <span class="select is-fullwidth">
                      <select>
                        <option></option>
                        <option>Latvia</option>
                        <option>Select dropdown</option>
                        <option>With options</option>
                      </select>
                    </span>
                  </p>
                </div>

                <div class="field">
                  <label class="label has-text-weight-normal">City </label>
                  <div class="field">
                    <p class="control">
                      <input class="input" type="text" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="columns">
            <div class="column is-one-third">
              <h2 class="subtitle is-size-4">
                Date <span class="has-text-danger">*</span>
              </h2>
            </div>
            <div class="column is-two-thirds">
              <div class="field">
                <label class="label has-text-weight-normal">From </label>
                <div class="field">
                  <p class="control">
                    <input class="input" type="text" placeholder="DD-MM-YYYY" />
                  </p>
                </div>
              </div>
              <div class="field">
                <label class="label has-text-weight-normal">To </label>
                <div class="field">
                  <p class="control">
                    <input class="input" type="text" placeholder="DD-MM-YYYY" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div class="columns">
            <div class="column is-one-third">
              <h2 class="subtitle is-size-4">Call for papers</h2>
            </div>
            <div class="column is-two-thirds">
              <div class="field">
                <label class="label has-text-weight-normal">Deadline </label>
                <div class="field">
                  <p class="control">
                    <input class="input" type="text" placeholder="DD-MM-YYYY" />
                  </p>
                </div>
              </div>
              <div class="field">
                <label class="label has-text-weight-normal">URL </label>
                <div class="field">
                  <p class="control">
                    <input class="input" type="text" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div class="buttons is-pulled-right">
            <router-link class="button" :to="{ name: 'events', params: { continent: $route.params.continent } }"
              >back to events</router-link
            >
            <a class="button is-success">Submit</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Header from "./Header";
export default {
  components: { Header }
};
</script>
<style lang="scss" scoped>
.is-active a {
  color: #42b983 !important;
  border-color: #42b983 !important;
  font-weight: bold;
}

.is-success {
  background-color: #42b983;
}

select {
  border-width: 1px;
}

input,
select {
  background-color: hsl(0, 0%, 98%);
}
.select:not(.is-multiple):not(.is-loading)::after {
  border-color: hsl(0, 0%, 86%);
}
.field {
  margin-bottom: 1em;
}
.select select:not([multiple]) {
  height: calc(2.25em);
}
</style>
