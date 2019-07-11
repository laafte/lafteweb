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
        "symforch-formann" : "Studentersamfundet Symfoniorkester"
    }
    let availableSeatsInBand = {
        "Kjellerbandet" : "4. trompet, 1. altsax (lead), vokal og gitar.", 
        "Leisure Suite Lovers" : "Vokal (herre).", 
        "S. Møller Storband" : "Ingen ledige plasser kommende semester.", 
        "Snaustrinda Spelemannslag" : "Snau ser særlig etter blås (feks klarinett og fløyte) til høsten, og er ellers interesserte i fele/hardingfele, trekkspel, komp eller andre instrumenter som passer inn i folkemusikken.", 
        "Studentersamfundets Salongsorkester" : "Ingen ledige plasser kommende semester.", 
        "Studentersamfundet Symfoniorkester" : "Ingen ledige plasser kommende semester."
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
            <p> Send en mail til <a style = " white-space:nowrap; " href="mailto:${leader.email}?subject=Opptak">${leader.email}</a> for å melde interesse</p>`
        container.appendChild(node);
    }); 
}

document.addEventListener("DOMContentLoaded", event => {
    contactInfoRequest.then(onRecruitmentLoaded)
})