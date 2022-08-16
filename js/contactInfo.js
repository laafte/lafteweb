import {config} from "./config.js"

export let contactInfoRequest =
  fetch(config.paths.kontaktApi)
  .then((response) => response.json())
