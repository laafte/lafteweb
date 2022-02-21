import { contactInfoRequest } from './contactInfo.js';
import { recruitmentInfoRequest } from './recruitmentInfo.js';

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
document.addEventListener('DOMContentLoaded', event => {
  contactInfoRequest.then(contactLoaded);
  recruitmentInfoRequest.then(recruitmentLoaded);
});


// We create a reusable template for the content
// This approach makes it easier to avoid .innerHMTL to the benefit of .textContent,
// reducing the need for trusting/sanitising our input. It's also faster (presumably)!
// Main drawback is somewhat tedious manual DOM tree building.
function createWrapperTemplate() {
  let baseWrapperNode = document.createElement('div');
  baseWrapperNode.className = 'band';

  let wrapperHeadingTop = document.createElement('h3');
  baseWrapperNode.appendChild(wrapperHeadingTop);

  let wrapperHeadingSub = document.createElement('h4');
  wrapperHeadingSub.textContent = 'Ledige plasser:';
  baseWrapperNode.appendChild(wrapperHeadingSub);

  let longTextElem = document.createElement('p');
  longTextElem.className = 'longer-text';
  
  for (let i = 0; i < 3; i++) {
    baseWrapperNode.appendChild(longTextElem.cloneNode());
  }
  
  return baseWrapperNode;
}

// only run when all data is ready
const createHTML = (contactInfo, recruitmentInfo) => {
  let container = document.getElementById('band-recruitment-container');

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
    if(!isActive) {
      continue;
    }

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
    if(recrText === null || recrText === '') {
      recrText = 'Ingen opptak dette semesteret.'
      recrTextNode.style.fontStyle = 'italic';
      recruiting = false;
    }

    // Header
    topHeaderNode.textContent = groupName;

    // Recruitment text body
    // Using innerHTML to no break Snaus link.
    // Not a neccessity and maybe unsafe, but we'll keep it for now
    recrTextNode.innerHTML = recrText;


    // Contact information
    // Only add if actually recruiting
    if(recruiting) {
      contactLink.href='mailto:' + contactAddr + '?subject=Opptak';
      contactLink.textContent = contactAddr;
      
      // Must be sandwitched between text nodes
      contactTextNode.append(document.createTextNode('Send epost til '));
      contactTextNode.append(contactLink);
      contactTextNode.append(document.createTextNode(' for å melde interesse.'));
    }
    // Add finished DOM tree to main container
    container.append(wrapperNode);
  }
}

