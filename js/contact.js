import {contactInfoRequest} from "./contactInfo.js"

function onContactInfoLoaded(data) {
    let container = document.getElementById("hovedstyre-container");

    let hsRoles = ["orkestersjef", "nestleder", "kasserer", "materialforvalter", "intendant"];
    let hsIcons = {
        "orkestersjef": "fa-gavel",
        "nestleder": "fa-pen-fancy",
        "kasserer": "fa-coins",
        "materialforvalter": "fa-tools",
        "intendant": "fa-cocktail"
    };

    let hovedstyret = data.contacts.filter(contact => hsRoles.includes(contact.role));
    hovedstyret.sort((a, b) => hsRoles.indexOf(a.role) - hsRoles.indexOf(b.role));

    hovedstyret.forEach(contact => {
        let node = document.createElement("div")
        let icon = hsIcons[contact.role] || "fa-id-card";
        node.className = "mail-board"
        node.innerHTML =
            `<span class="fas ${icon}"></span>
            <h6 >${contact.roleName}</h6>
            <p>${contact.name}</p>
            <a href="mailto: ${contact.email}">${contact.email}</a>`;
        container.appendChild(node);
    })
}

document.addEventListener("DOMContentLoaded", event => {
    contactInfoRequest.then(onContactInfoLoaded)
})