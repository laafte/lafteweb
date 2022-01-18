import { contactInfoRequest } from "./contactInfo.js";
import { recruitmentInfoRequest } from "./recruitmentInfo.js";

/*
 * Trying to augment this version to both support API fetch of
 * contact info and recruitment text
 */

let contactInfo = null;
let recruitmentInfo = null;

const contactLoaded = (data) => {
  contactInfo = data;
  if(recruitmentInfo != null) {
    createHTML(contactInfo, recruitmentInfo);
  }
}

const recruitmentLoaded = (data) => {
  recruitmentInfo = data;
  if(contactInfo != null) {
    createHTML(contactInfo, recruitmentInfo);
  }
}

// Listen for both fetches
document.addEventListener("DOMContentLoaded", event => {
  contactInfoRequest.then(contactLoaded);
  recruitmentInfoRequest.then(recruitmentLoaded);
});


// We create a reusable template for the content
// This approach makes it easier to avoid .innerHMTL to the benefit of .textContent,
// reducing the need for trusting/sanitising our input. It's also faster (presumably)!
// Main drawback is somewhat tedious manual DOM tree building.
function createWrapperTemplate() {
  let baseWrapperNode = document.createElement('div');
  baseWrapperNode.className = "band";

  let wrapperHeadingTop = document.createElement('h3');
  baseWrapperNode.appendChild(wrapperHeadingTop);

  let wrapperHeadingSub = document.createElement('h4');
  wrapperHeadingSub.textContent = 'Ledige plasser:';
  baseWrapperNode.appendChild(wrapperHeadingSub);

  let longTextElem = document.createElement('p');
  longTextElem.className='longer-text';
  
  for(let i = 0; i < 3; i++) {
    baseWrapperNode.appendChild(longTextElem.cloneNode());
  }
  
  return baseWrapperNode;
}

// only run when all data is ready
const createHTML = (contactInfo, recruitmentInfo) => {
  let container = document.getElementById("band-recruitment-container");
  console.log(contactInfo, recruitmentInfo);

  const nameMap = {
    'lsl': 'Leisure Suit Lovers',
    'kb': 'Kjellerbandet',
    'salongen': 'Studentersamfundets Salongorkester',
    'revy': 'Revybandet',
    'smoller': 'S. Møller Storband',
    'sfo': 'Samfundets Fusion Orkester',
    'symforch': 'Studentersamfundets Symfoniorkester'
  };


  let baseWrapperNode = createWrapperTemplate(); 
  
  for(let i = 0; i < recruitmentInfo.length; i++) {
    // Make sure this group is active before rendering
    let isActive = recruitmentInfo[i].aktiv;
    if(!isActive)
      continue;

    // Setup all the DOM references we need
    // Trying to be 100% consistent with old impl, thus no new classes for identification
    let wrapperNode = baseWrapperNode.cloneNode(true); // deep copy of base template
    let topHeaderNode = wrapperNode.querySelector('h3');
    let longTextNodes = wrapperNode.querySelectorAll('p');
    let recrTextNode = longTextNodes[0];
    let contactTextNode = longTextNodes[2];
    let contactLink = document.createElement('a');
    contactLink.style.whiteSpace = 'nowrap';
    
    let recrText = recruitmentInfo[i].rekruteringstekst;
    let contactAddr = recruitmentInfo[i].kontaktinfo;

    let groupName = nameMap[recruitmentInfo[i].gruppering];

    let recruiting = true;
    
    // Setup contents
    // No recruitment text is interpreted as no free positions
    if(recrText === null || recrText === "") {
      recrText = "Ingen opptak dette semesteret."
      recrTextNode.style.fontStyle = 'italic';
      recruiting = false;
    }

    // Header
    topHeaderNode.textContent = groupName;

    // Recruitment text body
    // Making an exception to not break Snaus link.
    // ASK IF WE ACTUALLY MUST SUPPORT THIS
    recrTextNode.innerHTML = recrText;


    // Contact information
    // Only add if actually recruiting
    if(recruiting) {
      contactLink.href="mailto:" + contactAddr + "?subject=Opptak";
      contactLink.textContent = contactAddr;
      
      // Must be sandwitched between text nodes
      contactTextNode.append(document.createTextNode("Send epost til "));
      contactTextNode.append(contactLink);
      contactTextNode.append(document.createTextNode(" for å melde interesse."));
    }
    // Add finished DOM tree to main container
    container.append(wrapperNode);
  }
}


/*
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
      "symforch-leder@samfundet.no"
    ],
    "sfo-leder": [
      "Samfundets Fusion Orkester", 
      "laafte-sfo@samfundet.no"]
  };

  let availableSeatsInBand = {
    "Kjellerbandet": 
      "KB har opptak på piano! Ta kontakt hvis du er interessert.",
    "Leisure Suit Lovers": "Er du interessert i Disco? Liker du ABBA, Earth, Wind & Fire og andre 70/80-talls hits? Søk Leisure Suit Lovers! LSL søker en discoglad musiker på trompet til V22! Søk søk søk!",
    "S. Møller Storband": null, 
    "Snaustrinda Spelemannslag": 
      "Vi søkjer nye musikarar på gitar, kontrabass, blås og trekkspel, men alle som er interessert i folkemusikk og speler eit instrument er velkomen på open øving! Sjå <a href=\"https://facebook.com/Snaustrinda/\">Facebook-sida vår</a> for meir info.",
    "Studentersamfundets Salongsorkester": null,
    "Studentersamfundets Symfoniorkester": 
      "Symforch har opptak på obo og fiolin! Send en e-post hvis du er interessert. 🎻🎻🎻",
    "Samfundets Fusion Orkester": null 
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
*/
