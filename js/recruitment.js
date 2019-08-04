import { contactInfoRequest } from "./contactInfo.js";

function onRecruitmentLoaded(data) {
  let container = document.getElementById("band-recruitment-container");

  let leaderRoles = [
    "kb-leder",
    "lsl-leder",
    "smoller-leder",
    "snau-leder",
    "salong-leder",
    "symforch-formann"
  ];

  let leaderInBand = {
    "kb-leder": ["Kjellerbandet", "kb@samfundet.no"],
    "lsl-leder": ["Leisure Suite Lovers", "lsl@samfundet.no"],
    "smoller-leder": ["S. Møller Storband", "post@smoller.no"],
    "snau-leder": [
      "Snaustrinda Spelemannslag",
      "snaustrinda-sjef@samfundet.no"
    ],
    "salong-leder": [
      "Studentersamfundets Salongsorkester",
      "salong@samfundet.no"
    ],
    "symforch-formann": [
      "Studentersamfundets Symfoniorkester",
      "symforch-formann@samfundet.no"
    ]
  };

  let availableSeatsInBand = {
    Kjellerbandet:
      "Kjellerbandet søker denne høsten nye medlemmer på 4. trompet, 1. altsax (lead), vokal og gitar.",
    "Leisure Suite Lovers": "LSL søker denne høsten ny mannlig vokalist.",
    "S. Møller Storband":
      "S. Møller søker trompetist og altsaxofonist denne høsten.",
    "Snaustrinda Spelemannslag":
      "Snau ser særlig etter blås (feks klarinett og fløyte) denne høsten, og er ellers interesserte i fele/hardingfele, trekkspel, komp eller andre instrumenter som passer inn i folkemusikken.",
    "Studentersamfundets Salongsorkester":
      "Se grupperingens egne nettsider for mer informasjon om opptak.",
    "Studentersamfundets Symfoniorkester":
      "Symfoniorkesteret søker nye medlemmer på fiolin, bratsj, horn, trombone, trompet, tuba og slagverk. Se Symforchs egne nettsider for mer informasjon om åpen øving og opptak."
  };

  let leaders = data.contacts.filter(contact =>
    leaderRoles.includes(contact.role)
  );

  leaders.sort(
    (a, b) => leaderRoles.indexOf(a.role) - leaderRoles.indexOf(b.role)
  );

  leaders.forEach(leader => {
    let container = document.getElementById("band-recruitment-container");
    let node = document.createElement("div");
    let band = leaderInBand[leader.role][0];
    let availableSeats = availableSeatsInBand[band];
    node.className = "band";
    node.innerHTML = `<h3>${band}</h3>
        <h4>Ledige plasser:</h4>
        ${
          availableSeats == null
            ? "<p class='longer-text'><span style='font-style: italic'>Ingen informasjon tilgjenelig</span></p>"
            : `<p class='longer-text'>${availableSeats}</p><p class='longer-text'><p class="longer-text"> Send en mail til <a style = " white-space:nowrap; " href="mailto:${
                leader.email == null
                  ? leaderInBand[leader.role][1]
                  : leader.email
              }?subject=Opptak">${
                leader.email == null
                  ? leaderInBand[leader.role][1]
                  : leader.email
              }</a> for å melde interesse</p> `
        }`;
    container.appendChild(node);
  });
}

document.addEventListener("DOMContentLoaded", event => {
  contactInfoRequest.then(onRecruitmentLoaded);
});
