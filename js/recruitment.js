import {contactInfoRequest} from "./contactInfo.js"

function onRecruitmentLoaded(data) {
    let container = document.getElementById("band-reqruitment-container");

    let leaderRoles = ["kb-leder", "lsl-leder", "smoller-leder", "snau-leder", "salong-leder", "symforch-formann" ];
    let leaderInBand = {
        "kb-leder" : "Kjellerbandet", 
        "lsl-leder" : "Leisure Suite Lovers", 
        "smoller-leder" : "S. Møller Storband", 
        "snau-leder" : "Snaustrinda Spelemannslag", 
        "salong-leder" : "Studentersamfundets Salongsorkester", 
        "symforch-formann" : "Studentersamfundets Symfoniorkester"
    }
    let availableSeatsInBand = {
        "Kjellerbandet" : "Kjellerbandet søker denne høsten nye medlemmer på 4. trompet, 1. altsax (lead), vokal og gitar.", 
        "Leisure Suite Lovers" : "LSL søker denne høsten ny mannlig vokalist.", 
        "S. Møller Storband" : "S. Møller søker trompetist og altsaxofonist denne høsten.", 
        "Snaustrinda Spelemannslag" : "Snau ser særlig etter blås (feks klarinett og fløyte) denne høsten, og er ellers interesserte i fele/hardingfele, trekkspel, komp eller andre instrumenter som passer inn i folkemusikken.", 
        "Studentersamfundets Salongsorkester" : "Se grupperingens egne nettsider for mer informasjon om opptak.", 
        "Studentersamfundets Symfoniorkester" : "Symfoniorkesteret søker nye medlemmer på fiolin, bratsj, horn, trombone, trompet, tuba og slagverk. Se Symforchs egne nettsider for mer informasjon om åpen øving og opptak."
    }

    let leaders = data.contacts.filter(contact => leaderRoles.includes(contact.role));
    leaders.sort((a, b) => leaderRoles.indexOf(a.role) - leaderRoles.indexOf(b.role));

    leaders.forEach(leader => {
        let node = document.createElement("div");
        let band = leaderInBand[leader.role];
        let availableSeats = availableSeatsInBand[band];
        node.className = "band"
        node.innerHTML = 
            `<h2>${band}</h2>
            <h4>Ledige plasser:</h4>
            <p>${availableSeats}</p>
            <p> Send en mail til <a style = " white-space:nowrap; " href="mailto:${leader.email}?subject=Opptak">${leader.email}</a> for å melde interesse.</p>`
        container.appendChild(node);
    }); 
}

document.addEventListener("DOMContentLoaded", event => {
    contactInfoRequest.then(onRecruitmentLoaded)
})
