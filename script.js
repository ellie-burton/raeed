const scenarios = [
  {
    num: 0,
    redMin:0,
    redMax: 10,
  },
  {
    num: 1,
    redMin:2,
    redMax: 8,
  },
  {
    num: 2,
    redMin:4,
    redMax: 6,
  },
  {
    num: 3,
    redMin:5,
    redMax: 5,
  },
  {
    num: 4,
    redMin:10,
    redMax: 10,
  },
  {
    num: 5,
    redMin:0,
    redMax: 0,
  }
];
const instructions = [
  {
    step: 0,
    text: "Thank you for participating in this research study. The entire study will be completed on this website.",
  },
  {
    step: 1,
    text: "You will answer a series of questions. In each round, you will be asked to make a charitable contribution to a charity of your choosing out of a sum of money you receive for that round. You can split the sum of money between yourself and the charity however you want. You can even give all of it or keep all of it.",
  },
  {
    step: 2,
    text: "The timeline of this study will be the following: <ol><li>	First choose a charity from a list that will be the recipient of all your donation decisions. Remember: all the donation decisions you make will be directed to the charity you choose. </li><li>Answer a series of questions with real stakes. Each will be slightly different, and the difference will be underlined and reflected graphically.</li><li>One of your decisions will be selected for your actual payout.</li></ol>",
  },
  {
    step: 3,
    text: "Choose a recipient for all your donations from the following list of charities: <div class='form-check'><input class='form-check-input' type='radio' name='flexRadioDefault' id='flexRadioDefault1'><label class='form-check-label' for='flexRadioDefault1'> Tuscaloosa Public Library</label></div><div class='form-check'><input class='form-check-input' type='radio' name='flexRadioDefault' id='flexRadioDefault1'><label class='form-check-label' for='flexRadioDefault1'> Tuscaloosa  YMCA</label></div><div class='form-check'><input class='form-check-input' type='radio' name='flexRadioDefault' id='flexRadioDefault1'><label class='form-check-label' for='flexRadioDefault1'> RISE Center (Early childhood preschool services)</label></div><div class='form-check'><input class='form-check-input' type='radio' name='flexRadioDefault' id='flexRadioDefault1'><label class='form-check-label' for='flexRadioDefault1'> Tuscaloosa Metro Animal Shelter</label></div>",
  }
];

const charities = [
  "Tuscaloosa Public Library",
  "Tuscaloosa YMCA",
  "RISE Center (Early childhood preschool services)",
  "Tuscaloosa Metro Animal Shelter",
];

let currentStep = 0;
let mainChart = null;
let scenarioNum = 0;


// Additions and modifications to your existing script.js for modal handling
document.addEventListener("DOMContentLoaded", function () {
  const instructionModal = document.getElementById("instructionModal");
  const viewInstructionsBtn = document.getElementById("viewInstructionsBtn");
  let currentStep = 0;

  function updateInstructionText() {
    const instructionDiv = document.getElementById("instructions");
    instructionDiv.innerHTML = `<p>${instructions[currentStep].text}</p>`;
  }

  function nextInstruction() {
    currentStep++;
    if (currentStep >= instructions.length) {
      // Once all instructions are viewed, hide modal and show "View Instructions" button
      instructionModal.style.display = "none";
      viewInstructionsBtn.style.display = "block";
      currentStep = instructions.length - 1; // Ensure step doesn't exceed bounds
    }
    updateInstructionText();
  }

  function backInstruction() {
    currentStep--;
    if (currentStep < 0) {
      currentStep = 0;
    }
    updateInstructionText();
  }

  // Initial instruction text update
  updateInstructionText();

  // Event listeners for instruction navigation
  document
    .getElementById("continue")
    .addEventListener("click", nextInstruction);
  document.getElementById("back").addEventListener("click", backInstruction);

  // Closing the modal manually (via the close button or outside click)
  document.getElementById("closeModal").addEventListener("click", function () {
    instructionModal.style.display = "none";
    viewInstructionsBtn.style.display = "block";
  });

  // Reopening the modal with the "View Instructions" button
  viewInstructionsBtn.addEventListener("click", function () {
    currentStep = 0;
    instructionModal.style.display = "block";
    viewInstructionsBtn.style.display = "none";
  });

  function showScenarioA(scenario, index) {
    const scenarioDiv = document.getElementById("scenario");
    scenarioDiv.innerHTML = ``;
    scenarioDiv.innerHTML = `<h2>Scenario ${index+1}</h2><p>The money you receive will be determined by a draw from an urn. In the urn, there are red balls and blue balls. Randomly drawing a red ball yields $20, and randomly drawing a blue ball yields $60. There are 10 balls in the urn, where the number of red balls is between ${scenario.redMin} and ${scenario.redMax}. The rest are blue. You will <b>first make the decision</b> on how much you will give and <b>then computer will draw a random ball</b> from the urn.</p>`;
    const inputDiv = document.getElementById("user-input");
    inputDiv.innerHTML = ``;
inputDiv.innerHTML = `<p>How much do you want to give to your chosen charity? </p>
<div class="input-group input-group-lg">
    <span class="input-group-text" id="inputGroup-sizing-lg">$</span>
    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
  </div>
</div>`;  
  }

  function showScenarioB(scenario, index) {
    const scenarioDiv = document.getElementById("scenario");
    scenarioDiv.innerHTML = ``;
    scenarioDiv.innerHTML = `<h2>Scenario ${index+1}</h2><p>The money you receive will be determined by a draw from an urn. In the urn, there are red balls and blue balls. Randomly drawing a red ball yields $20, and randomly drawing a blue ball yields $60. There are 10 balls in the urn, where the number of red balls is between ${scenario.redMin} and ${scenario.redMax}. The rest are blue. You will <b>first make the decision</b> on how much your donation will be for each color of the ball randomly drawn from the urn. <b> Subsequently, </b> the computer will draw a random ball from the urn.</p>`;
  }

  function generatePaginationButtons() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = ""; 
    pagination.appendChild(document.createElement("br")); 
    pagination.appendChild(document.createElement("br")); 
    pagination.appendChild(document.createElement("br")); 
    pagination.appendChild(document.createElement("br")); 

    scenarios.forEach((scenario, index) => {
      const button = document.createElement("button");
      button.textContent = index + 1;
      button.classList.add("btn", "btn-primary", "mb-2"); 
      if (group == "a") {
        button.addEventListener("click", () => showScenarioA(scenario, index));
      }
      if (group == "b") {
        button.addEventListener("click", () => showScenarioB(scenario, index));
      }

      pagination.appendChild(button);
    });
  }

  // Shuffle scenarios
  scenarios.sort(() => Math.random() - 0.5);

  //randomly determine if the user is in group a or b
  var group = Math.random() < 0.5 ? "a" : "b";
  if (group == "a") {
    showScenarioA(scenarios[0], 0);
  }
  if (group == "b") {
    showScenarioB(scenarios[0], 0);
  }

  const instructionDiv = document.getElementById("instructions");
  instructionDiv.innerHTML = `<p>${instructions[0].text}</p>`;
  generatePaginationButtons();
});
