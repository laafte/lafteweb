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
    "kb-leder": ["Kjellerbandet", "kb-sjef@samfundet.no"],
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
    "Kjellerbandet": "Spiller du trommer eller bass? Vi i Kjellerbandet trenger nye medlemmer! Søk for å få muligheten til å både lære mye, spille med andre flinke folk og få masse nye venner! Send oss en mail på kb-sjef@samfundet.no eller send oss en melding på facebooksiden vår. ",
    "Leisure Suite Lovers": null,
    "S. Møller Storband":
      "S. Møller har løpende opptak for vikar på bass dette semesteret.",
    "Snaustrinda Spelemannslag": "Snaustrinda har opptak, og ser etter fele, hardingfele, klarinett, fløyte, perk eller andre instrumenter som passer inn i folkemusikken. Vi har åpne øvelser torsdag 9. og torsdag 16. januar kl. 18.50.",
    "Studentersamfundets Salongsorkester":
      "Se <a href=\"http://salong.samfundet.no/\">Salongorkesterets egne nettsider</a> for mer informasjon om opptak.",
    "Studentersamfundets Symfoniorkester": "Symforch søker slagverk våren 2020!"
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
        ? "<p class='longer-text'><span style='font-style: italic'>Opptaket for våren 2020 er gjennomført.</span></p>"
        : `<p class='longer-text'>${availableSeats}</p><p class='longer-text'><p class="longer-text"> Send epost til <a style = " white-space:nowrap; " href="mailto:${
        leader.email == null
          ? leaderInBand[leader.role][1]
          : leader.email
        }?subject=Opptak">${
        leader.email == null
          ? leaderInBand[leader.role][1]
          : leader.email
        }</a> for å melde interesse.</p> `
      }`;
    container.appendChild(node);
  });
}

document.addEventListener("DOMContentLoaded", event => {
  contactInfoRequest.then(onRecruitmentLoaded);
});
