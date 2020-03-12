const api = window.location.href.includes("localhost")
  ? "//localhost:5555/api"
  : "//dev.events/api";

module.exports = api;
