import { contactInfoRequest } from "./contactInfo.js";

function onContactInfoLoaded(data) {
  let container = document.getElementById("hovedstyre-container");

  let hsRoles = [
    "orkestersjef",
    "nestleder",
    "kasserer",
    "materialforvalter",
    "intendant"
  ];
  let hsIcons = {
    orkestersjef: "fa-gavel",
    nestleder: "fa-pen-fancy",
    kasserer: "fa-coins",
    materialforvalter: "fa-tools",
    intendant: "fa-id-card"
  };

  let hovedstyret = data.contacts.filter(contact =>
    hsRoles.includes(contact.role)
  );
  hovedstyret.sort((a, b) => hsRoles.indexOf(a.role) - hsRoles.indexOf(b.role));

  hovedstyret.forEach(contact => {
    let node = document.createElement("div");
    let icon = hsIcons[contact.role];
    node.className = "mail-board";
    node.innerHTML =
      contact.name == null || contact.email == null
      ? `<span class="fas ${icon}"></span>
            <h6 >${contact.roleName}</h6>
            <p style="font-style: italic">Ingen informasjon tilgjengelig</p>`
      : `<span class="fas ${icon}"></span>
            <h6 >${contact.roleName}</h6>
            <p>${contact.name}</p>
            <a href="mailto: ${contact.email}">${contact.email}</a>`;
    container.appendChild(node);
  });
}

document.addEventListener("DOMContentLoaded", event => {
  contactInfoRequest.then(onContactInfoLoaded);
});
