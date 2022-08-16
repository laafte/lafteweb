import {config} from "./config.js"

export let recruitmentInfoRequest =
  fetch(config.paths.rekruteringsApi)
