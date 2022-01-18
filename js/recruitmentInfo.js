export let recruitmentInfoRequest =
  fetch('https://laafte.samfundet.no/api/rekruteringsinfo/')
    .then(response => response.json());
