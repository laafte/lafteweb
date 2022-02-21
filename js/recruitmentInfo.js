export let recruitmentInfoRequest =
  fetch('../api/rekruteringsinfo/')
    .then(response => response.json());
