import { contactInfoRequest } from './contactInfo.js';
import { recruitmentInfoRequest } from './recruitmentInfo.js';

/*
 * Fetches and presents recruitment info from the API
 */

let contactInfo = null;
let recruitmentInfo = null;

// Hopefully this way of ensuring all data is loaded
// will not lead to deadlocks.
// Banking on the JS implementation being single threaded
function contactLoaded(data) {
  contactInfo = data;
  if (recruitmentInfo != null) {
    createHTML(contactInfo, recruitmentInfo);
  }
}

function recruitmentLoaded(data) {
  recruitmentInfo = data;
  if (contactInfo != null) {
    createHTML(contactInfo, recruitmentInfo);
  }
}

// Listen for both fetches
document.addEventListener('DOMContentLoaded', (event) => {
  contactInfoRequest
    .then(contactLoaded);
  
  recruitmentInfoRequest
    .then((response) => response.text())
    .then((responseText) => {
      const JsonTextWithBreakTags = replaceLineBreakWith(responseText, '<br/>')
      console.log(JsonTextWithBreakTags)
      return JSON.parse(JsonTextWithBreakTags)
    })
    .then(recruitmentLoaded);
});


// Not regex parsable?
function replaceLineBreakWith(inputString, replacement) {
  let resultString = "";
  
  for (let i = 0; i < inputString.length - 1; i++) {
    let lookaheadIndex = i + 1;
    let curChar = inputString[i];
    let nextChar = inputString[lookaheadIndex];

    if(curChar === '\r' && nextChar === '\n') {
      resultString += replacement;
      // Skip ahead, both \r and \n are consumed as a line break
      i = i + 1;
    }
    else if(curChar === '\r' || nextChar === '\n') {
      resultString += replacement
    }
    else {
      resultString += curChar
    }
  }

  // Final character
  let lastChar = inputString[inputString.length - 1]
  if(lastChar === '\r' || lastChar === '\n') {
    resultString += replacement
  }
  else {
    resultString += lastChar
  }
  
  return resultString
}

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

// Only run when all data is ready
function createHTML(contactInfo, recruitmentInfo) {
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

  for (let i = 0; i < recruitmentInfo.length; i++) {
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
    if (recrText === null || recrText === '') {
      recrText = 'Intet opptak dette semesteret.';
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
    if (recruiting) {
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
