export let contactInfoRequest =
  fetch('/api/kontaktinfo/')
    .then(response => response.json());
