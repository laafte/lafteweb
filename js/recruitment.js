import { contactInfoRequest } from "./contactInfo.js";

function onRecruitmentLoaded(data) {
  let container = document.getElementById("band-recruitment-container");

  let leaderRoles = [
    "kb-leder",
    "lsl-leder",
    "smoller-leder",
    "snau-leder",
    "salong-leder",
    "symforch-formann",
    "sfo-leder"
  ];

  let leaderInBand = {
    "kb-leder": ["Kjellerbandet", "kb-sjef@samfundet.no"],
    "lsl-leder": ["Leisure Suit Lovers", "lsl@samfundet.no"],
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
    ],
    "sfo-leder": [
      "Samfundets Fusion Orkester", 
      "laafte-sfo@samfundet.no"]
  };

  let availableSeatsInBand = {
    "Kjellerbandet": ,
    "Leisure Suit Lovers": 
      "Spiller du tenorsax? Er du interessert i Disco? Liker du ABBA, Earth, Wind & Fire og andre 70/80-talls hits? Søk Leisure Suit Lovers! LSL søker en discoglad trompetist kommende semester V21! Søk søk søk!",
    "S. Møller Storband":
      "S. Møller søker trompet, vokal og tenorsaksofon, og ønsker at interesserte sender mail med opptak av seg selv + litt info om hvem de er og hva de holder på med. Aktuelle søkere kan bli innkalt til fysisk prøvespill, men det vurderer vi etter antall søkere.",
    "Snaustrinda Spelemannslag": 
      "Vi søkjer nye musikarar på gitar, kontrabass og trekkspel, men alle som er interessert i folkemusikk og speler eit instrument er velkomen på open øving! Sjå <a href=\"https://facebook.com/Snaustrinda/\">Facebook-sida vår</a> for meir info.",
    "Studentersamfundets Salongsorkester":
      "Se <a href=\"https://www.facebook.com/studentersamfundetssalongorkester/\">Salongorkesterets Facebookside</a> for mer informasjon om opptak.",
    "Studentersamfundets Symfoniorkester": 
      "Symforch søker nye trombonister.",
    "Samfundets Fusion Orkester":
      "SFO har opptak på saksofon! Ta kontakt hvis du er interessert." 
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
        ? "<p class='longer-text'><span style='font-style: italic'>Ingen opptak dette semesteret. </span></p>"
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
