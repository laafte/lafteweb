import {contactInfoRequest} from "./contactInfo.js"

function onContactInfoLoaded(data) {
    let hovedstyreContainer = document.getElementById("hovedstyre-container");
    let storstyreContainer = document.getElementById("storstyre-container");

    let band = ["Kjellerbandet", "Leisure Suite Lovers", "S. Møller Storband", "Snaustrinda Spelemannslag", 
                        "Studentersamfundets Salongsorkester", "Studentersamfundets Symfoniorkester"]

    let ssRoles = ["kb-leder", "kb-kasserer", "smoller-leder", "smoller-kasserer", "symforch-formann", 
                    "symforch-nestleder", "symforch-materialforvalter", "symforch-kasserer", "snau-leder", 
                    "lsl-leder", "salong-leder"//, "revy-kapellmester"
                ]

    let ssMail = {
        "kb-leder": "kb-sjef@samfundet.no", 
        "kb-kasserer": "kb-oko@samfundet.no", 
        "smoller-leder": "smoller-styre@samfundet.no", 
        "smoller-kasserer": "smoller-styre@samfundet.no", 
        "symforch-formann": "symforch-formann@samfundet.no", 
        "symforch-nestleder": "symforch-nestleder@samfundet.no", 
        "symforch-materialforvalter": "symforch-material@samfundet.no", 
        "symforch-kasserer": "symforch-kasserer@samfundet.no", 
        "snau-leder": "snaustrinda-sjef@samfundet.no", 
        "lsl-leder": "lsl@samfundet.no", 
        "salong-leder": " salong@samfundet.no"
        // "revy-kapellmester": "erik.bjornerem@gmail.com"
    }

    let hsRoles = ["orkestersjef", "nestleder", "kasserer", "materialforvalter", "intendant"];
    let hsMail = {
        "orkestersjef": "laafte-sjef@samfundet.no", 
        "nestleder": "laafte-nestleder@samfundet.no", 
        "kasserer": "laafte-kasserer@samfundet.no", 
        "materialforvalter": "laafte-material@samfundet.no", 
        "intendant": "laafte-bar@samfundet.no"
    }
    let hsIcons = {
        "orkestersjef": "fa-gavel",
        "nestleder": "fa-pen-fancy",
        "kasserer": "fa-coins",
        "materialforvalter": "fa-tools",
        "intendant": ""
    };

    let hovedstyret = data.contacts.filter(contact => hsRoles.includes(contact.role));
    hovedstyret.sort((a, b) => hsRoles.indexOf(a.role) - hsRoles.indexOf(b.role));

    let storstyret = data.contacts.filter(contact => ssRoles.includes(contact.role));
    storstyret.sort((a,b) => ssRoles.indexOf(a.role) - ssRoles.indexOf(b.role));

    hovedstyret.forEach(contact => {
        let node = document.createElement("div")
        let icon = hsIcons[contact.role] || "fa-id-card";
        let mailAdress = hsMail[contact.role] 
        node.className = "mail-board"
        node.innerHTML =
            `<span class="fas ${icon}"></span>
            <h6>${contact.roleName}</h6>
            <p>${contact.name}</p>
            <a href="mailto: ${mailAdress}">${mailAdress}</a>`;
        hovedstyreContainer.appendChild(node);
    });

    storstyret.forEach( contact => {
        let node = document.createElement("div")
        // For the contacts official @samfundet mail adresses, uncomment this line
        //let mailAdress = ssMail[contact.role]
        let mailAdress = contact.email
        node.className = "contact"
        node.innerHTML = 
            `<h6 >${contact.roleName}</h6>
            <p>${contact.name}</p>
            <a href="mailto: ${mailAdress}">${mailAdress}</a>`;
        storstyreContainer.appendChild(node);
    });


}

document.addEventListener("DOMContentLoaded", event => {
    contactInfoRequest.then(onContactInfoLoaded)
})