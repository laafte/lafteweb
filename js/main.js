import {contactInfoRequest} from "./contactInfo.js";

document.addEventListener("DOMContentLoaded", event => {
  let leaderInfos = document.querySelectorAll(".leader-info");
  contactInfoRequest
    .then((data) => {
      // API does in fact support multiple leaders, pick the first one and keep minding our own business
      let sjef = data.contacts.filter(contact => contact.role === "orkestersjef")[0];
      leaderInfos.forEach(element => {
	element.textContent = `${sjef.roleName}: ${sjef.name} | laafte-sjef@samfundet.no | ${sjef.phone}`;
      })
    })
})
