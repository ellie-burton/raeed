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
    text: "Thank you for participating in this research study. The entire study will be completed on the computer in one sitting.",
  },
  {
    step: 1,
    text: "You will answer a series of questions. In each round, you will be asked to make a charitable contribution to a charity of your choosing out of a sum of money you receive for that round. You can split the sum of money between yourself and the charity however you want. You can even give all of it or keep all of it.",
  },
  {
    step: 2,
    text: "The timeline of this study will be the following: <ol><li>	First choose a charity from a list that will be the recipient of all your donation decisions. <u>Remember: all the donation decisions you make will be directed to the charity you choose.</u> </li><li>Answer a series of six distinct and independent decisions with real stakes. In each decision, you will be described how the sum of money that you can allocate between yourself and the selected charity will be determined by a random spin of a wheel.  The wheels used in each decision are unique and unrelated to those used in the other decision rounds.  Your choice in each round is how you would like to split the sum of money between yourself and the selected charity.</li><li>The computer will select one of the six decisions at random.  Your choice in the selected decision will determine your earnings and the amount given to the charity.</li></ol>",
  },
  {
    step: 3,
    text: "Before we begin this study, we would like to check your understanding. </p><p> Q1: How many different allocation decisions will you make?  <div class='form-check'><input class='form-check-input' type='radio' name='q3Input' id='q1Input1'><label class='form-check-label' for='q1Input1'>4</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q3Input' id='q1Input2'><label class='form-check-label' for='q1Input2'>5</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q3Input' id='q1Input3'><label class='form-check-label' for='q1Input3'>6</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q3Input' id='q1Input4'><label class='form-check-label' for='q1Input4'>7</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q3Input' id='q1Input5'><label class='form-check-label' for='q1Input5'>8</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q3Input' id='q1Input6'><label class='form-check-label' for='q1Input6'>9</label></div></p>",
}
,
{
  step: 4,
  text: "Before we begin this study, we would like to check your understanding. <p>Q2: Recall that your decisions will determine your payment. How is your payment determined? <div class='form-check'><input class='form-check-input' type='radio' name='q4Input' id='q2Input1'><label class='form-check-label' for='q2Input1'>Every decision in the six parts will get paid. Thus, I can strategize across decisions and hedge my bets.</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q4Input' id='q2Input2'><label class='form-check-label' for='q2Input2'>The computer will randomly select one of the decisions in the six parts, and my payment will depend on my answer to this question. Thus, there is no point for me to strategize across these decisions.</label></div></p>",
}
,
 {
    step: 5,
    text: "Choose a recipient for all your donations from the following list of charities: <div class='form-check'><input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio1'><label class='form-check-label' for='charityRadio1'> Tuscaloosa Public Library</label></div><div class='form-check'><input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio2'><label class='form-check-label' for='charityRadio2'> Tuscaloosa YMCA</label></div><div class='form-check'><input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio3'><label class='form-check-label' for='charityRadio3'> RISE Center (Early childhood preschool services)</label></div><div class='form-check'><input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio4'><label class='form-check-label' for='charityRadio4'> Tuscaloosa Metro Animal Shelter</label></div>",
  },
];
// Example of correct answers defined in an object
const correctAnswers = {
  3: 'q1Input3', // Assuming the correct answer for the first question is the third option
  4: 'q2Input2'  // Correct answer for the second question
};


document.addEventListener("DOMContentLoaded", function () {

  //Instruction modal
  let currentStep = 0;

  const instructionModal = document.getElementById("instructionModal");
  const viewInstructionsBtn = document.getElementById("viewInstructionsBtn");


  function updateInstructionText() {
    const instructionDiv = document.getElementById("instructions");
    instructionDiv.innerHTML = `<p>${instructions[currentStep].text}</p>`;
  }

  
  function validateAnswers(currentStep) {
    let isValid = true;

    // Check if there are questions to validate in this step
    if (correctAnswers.hasOwnProperty(currentStep)) {
        const userAnswer = document.querySelector(`input[name="q${currentStep}Input"]:checked`);
        
        console.log(`User selected: ${userAnswer ? userAnswer.id : "no selection"}`); // Debugging output

        // Validate user's answer
        isValid = userAnswer && userAnswer.id === correctAnswers[currentStep];

        if (!isValid) {

          //CHANGE THIS WHEN DEPLOYING
          return true;
            alert("Please answer the question correctly before proceeding.");
        }
    }

    return isValid;
}

var mainChart;
var originalBackgroundColors;
var originalBorderWidth;



function setupChart(scenario) {
    const ctx = document.getElementById('mainChart').getContext('2d');

    var redCount = scenario.redMin;
    var blueCount = 10 - scenario.redMax;
    var unknownCount = 10 - redCount - blueCount;
    const xValues = [];
    const yValues = [];
    const barColors = [];
    for (var i = 0; i < redCount; i++) {
      xValues.push("red");
      yValues.push(1);
      barColors.push("red");
    }
    for (var i = 0; i < blueCount; i++) {
      xValues.push("blue");
      yValues.push(1);
      barColors.push("blue");
    }
    for (var i = 0; i < unknownCount; i++) {
      xValues.push("Unknown");
      yValues.push(1);
      barColors.push("gray");
    }

    mainChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: xValues,
            datasets: [{
                label: 'Spin Result',
                data: yValues, // Even chances for both colors initially
                backgroundColor: barColors, // Red and Blue colors
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                duration: 0 // Turn off animation during setup
            },
            tooltips: {
                enabled: false // Disable tooltips
            }
        }
    });

    storeOriginalChartState(); // Store the original state of the chart
}


  //submisson
  function selectRandomScenario() {
    const randomNumber = Math.floor(Math.random() * scenarios.length); // Adjust according to your scenarios
    return scenarios[randomNumber];
}

function handleSpinResult(currentSlice) {
  const color = mainChart.data.labels[currentSlice];
  const amount = color === 'Red' ? 20 : 60; // Adjust amounts as needed
  const selectedScenario = selectRandomScenario();
  displayOutcome(selectedScenario, { color, amount });
}
Chart.defaults.global.tooltips.enabled = false;
Chart.defaults.global.legend.display = false;
Chart.defaults.global.hover.enabled = false;

function displayOutcome(scenario, outcome) {
  //document.getElementById("spinBtn").addEventListener("click", spinChart);
  setupChart(scenario); // Reset the chart for the next spin
    const modalTitle = document.querySelector('#submitModal .modal-title');
    modalTitle.textContent = 'Scenario Outcome';

    const scenarioDescription = document.getElementById('scenarioDescription');
    scenarioDescription.innerHTML = `Round # Selected: Scenario ${scenario.num + 1}<br>`;

    const decisionInput = document.getElementById('decisionInput');
    decisionInput.innerHTML = `
        <p>Would you like to change your decision? If yes, how much would you like to give to charity out of the sum?</p>
        <input type="number" id="newDonationAmount" value="${userInputs[scenario.num]}" />
    `;

    const confirmButton = document.getElementById('confirmChange');
    confirmButton.onclick = () => updateDonation(scenario.num);

    // Show the modal
    const submitModal = new bootstrap.Modal(document.getElementById('submitModal'));
    submitModal.show();
}

function updateDonation(scenarioIndex) {
    const newDonation = document.getElementById('newDonationAmount').value;
    userInputs[scenarioIndex] = newDonation; // Update the user input
    alert('Your donation has been updated and the results are finalized.');
    const submitModal = new bootstrap.Modal(document.getElementById('submitModal'));
    submitModal.hide(); // Hide the modal after confirmation
}

//for scenario type b
function displayOutcomeB(scenario, outcome) {
  const modalTitle = document.querySelector('#submitModal .modal-title');
  modalTitle.textContent = 'Scenario Outcome';

  const scenarioDescription = document.getElementById('scenarioDescription');
  scenarioDescription.innerHTML = `
      Round # Selected: Scenario ${scenario.num + 1}<br>
      Here is what you landed on: ${outcome.color.toUpperCase()}<br>
      Here is what you receive from the spin: $${outcome.amount}<br>
      Here is how much you decided to give: $${userInputs[scenario.num][outcome.color.toLowerCase()]}
  `;

  const decisionInput = document.getElementById('decisionInput');
  decisionInput.innerHTML = `
      <p>Would you like to change your decision? If yes, how much would you like to give to charity out of the sum?</p>
      <input type="number" id="newDonationAmount" value="${userInputs[scenario.num][outcome.color.toLowerCase()]}" />
  `;

  const confirmButton = document.getElementById('confirmChange');
  confirmButton.onclick = () => updateDonationB(scenario.num, outcome.color.toLowerCase());

  // Show the modal
  const submitModal = new bootstrap.Modal(document.getElementById('submitModal'));
  submitModal.show();
}

function updateDonationB(scenarioIndex, color) {
  const newDonation = document.getElementById('newDonationAmount').value;
  userInputs[scenarioIndex][color] = newDonation; // Update the specific color donation
  alert('Your donation has been updated and the results are finalized.');
  const submitModal = new bootstrap.Modal(document.getElementById('submitModal'));
  submitModal.hide(); // Hide the modal after confirmation
}


  function nextInstruction() {
    if (currentStep == 2){
      console.log("handle charity selection");
      handleCharitySelection();
    };
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
  document.getElementById("continue").addEventListener("click", function() {
    if (validateAnswers(currentStep)) {
        nextInstruction(); // Only proceed to the next instruction if the answer is valid
    } else {
        console.log(`Validation failed for step ${currentStep}. Expected: ${correctAnswers[currentStep]}`); // Debugging output
    }
});
  document.getElementById("back").addEventListener("click", backInstruction);

  // Reopening the modal with the "View Instructions" button
  viewInstructionsBtn.addEventListener("click", function () {
    currentStep = 0;
    instructionModal.style.display = "block";
    viewInstructionsBtn.style.display = "none";
  });

  function handleCharitySelection() {
    const charityRadios = document.getElementsByName("charityRadioGroup");
    let selectedCharity = null;
    charityRadios.forEach((radio) => {
      if (radio.checked) {
        selectedCharity = radio.id;
      }
    });
    console.log(selectedCharity);
}


function lightenColor(color) {
  //lighten color by percent
  if (color == "gray") {
    return "lightgray";
  } else if (color == "blue") {
    return "lightblue";
  } else if (color == "darkred") {
    return "lightcoral";
  } else {
    return "lightgray";
  }
}


  // Function to store the original state of the chart
  function storeOriginalChartState() {
    originalBackgroundColors =
      mainChart.data.datasets[0].backgroundColor.slice(); // Clone the original backgroundColors
  }

function spinChart() {
  const totalSlices = 10;
  let previousSlice = -1; // Track the previous slice
  const spinDuration = 5000; // Total duration for the spin
  const flashDuration = 500; // Duration each slice is highlighted
  let elapsedTime = 0; // Track elapsed time

  const intervalId = setInterval(() => {
    if (previousSlice >= 0) {
      // Reset the previous slice immediately
      mainChart.data.datasets[0].backgroundColor[previousSlice] =
        originalBackgroundColors[previousSlice];
    }

    // Calculate the current slice; ensure it's different from the previous one
    let currentSlice;
    do {
      currentSlice = Math.floor(Math.random() * totalSlices);
    } while (currentSlice === previousSlice);

    // Highlight the current slice
    mainChart.data.datasets[0].backgroundColor[currentSlice] = lightenColor(
      mainChart.data.datasets[0].backgroundColor[currentSlice]
    );

    mainChart.update();

    previousSlice = currentSlice; // Update the previous slice tracker
    elapsedTime += flashDuration;

    if (elapsedTime >= spinDuration) {
      clearInterval(intervalId); // Stop spinning

      //if red, go to red chart, if blue, go to blue chart
      if (mainChart.data.labels[currentSlice] == "Red") {

      } else if (mainChart.data.labels[currentSlice] == "Blue") {
        
      }
    }
  }, flashDuration); // Run this interval every 3ms
}

function allFieldsFilledA() {
  //CHANGE THIS WHEN DEPLOYING
  return true;
  return userInputs.every(input => input);
}
function allFieldsFilledB() {
  //CHANGE THIS WHEN DEPLOYING
  return true;
  return userInputs.every(input => input.red && input.blue);
} 

//Non state-contingent instructions
const userInputs = new Array(scenarios.length).fill('');  // Initialize array to store user inputs

function showScenarioA(scenario, index) {
    const scenarioDiv = document.getElementById("scenario");
    scenarioDiv.innerHTML = `<h2>Scenario ${index+1}</h2><p><ul><li>The money you receive will be determined by a draw from an urn. In the urn, there are red balls and blue balls. </li><li>Randomly drawing a red ball yields $20, and randomly drawing a blue ball yields $60.</li><li> There are 10 balls in the urn, where the number of red balls is between ${scenario.redMin} and ${scenario.redMax}. The rest are blue. </li><li>You will <b>first make the decision</b> on how much you will give and <b>then computer will draw a random ball</b> from the urn.</li></ul></p>`;
    const inputDiv = document.getElementById("user-input");
    inputDiv.innerHTML = `<p>How much do you want to give to your chosen charity? </p>
    <div class="input-group input-group-lg">
        <span class="input-group-text" id="inputGroup-sizing-lg">$</span>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value="${userInputs[index]}">
      </div>
    </div>`;
    // Update input on change
    const inputField = inputDiv.querySelector('input');
    inputField.addEventListener('input', () => {
        userInputs[index] = inputField.value;
    });
    if (index === scenarios.length - 1) {
      const submitBtn = document.createElement('button');
      submitBtn.textContent = 'Submit';
      submitBtn.classList.add('btn', 'btn-success', 'mt-3');
      submitBtn.onclick = () => {
        if (allFieldsFilledA()) {
          document.getElementById('submitModal').style.display = 'block';

            // Proceed with showing the submission modal
            const selectedScenario = selectRandomScenario();
      const outcome = spinChart(selectedScenario);
            displayOutcome(selectedScenario, outcome);

            
        } else {
            // Alert the user or handle as needed
            alert("Please fill in all required fields before submitting.");
        }
      };
      inputDiv.appendChild(submitBtn);
  }
}

  //State-contingent instructions
  function showScenarioB(scenario, index) {
    const scenarioDiv = document.getElementById("scenario");
    scenarioDiv.innerHTML = `<h2>Scenario ${index+1}</h2><p><ul><li>The money you receive will be determined by a draw from an urn. In the urn, there are red balls and blue balls.</li><li>Randomly drawing a red ball yields $20, and randomly drawing a blue ball yields $60.</li><li>There are 10 balls in the urn, where the number of red balls is between ${scenario.redMin} and ${scenario.redMax}. The rest are blue.</li><li>You will <b>first make the decision</b> on how much your donation will be for each color of the ball randomly drawn from the urn.</li><li><b>Subsequently,</b> the computer will draw a random ball from the urn.</li></ul></p>`;
    
    const inputDiv = document.getElementById("user-input");
    inputDiv.innerHTML = `<p>For your possible donation amounts, you can select any number up to (and including) $20 for the red ball and any number up to (and including) $60 for the blue ball.</p>
<p>Please select how much you give if you drew...</p>
<div class="input-group input-group-lg">
    <span class="input-group-text" id="inputGroup-sizing-lg">A red ball, in which case you have $20: $</span>
    <input type="text" class="form-control" value="${userInputs[index]?.red || ''}" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" id="redInput">
</div>
<div class="input-group input-group-lg">
    <span class="input-group-text" id="inputGroup-sizing-lg">A blue ball, in which case you have $60: $</span>
    <input type="text" class="form-control" value="${userInputs[index]?.blue || ''}" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" id="blueInput">
</div>`;

    // Update input on change
    const redInput = document.getElementById('redInput');
    const blueInput = document.getElementById('blueInput');
    redInput.addEventListener('input', () => {
        userInputs[index] = {...userInputs[index], red: redInput.value};
    });
    blueInput.addEventListener('input', () => {
        userInputs[index] = {...userInputs[index], blue: blueInput.value};
    });
    if (index === scenarios.length - 1) {
      const submitBtn = document.createElement('button');
      submitBtn.textContent = 'Submit';
      submitBtn.classList.add('btn', 'btn-success', 'mt-3');
      
      submitBtn.onclick = () => {
          if (allFieldsFilledB()) {
              // Proceed with showing the submission modal
              document.getElementById('submitModal').style.display = 'block';

              const selectedScenario = selectRandomScenario();
        const outcome = spinChart(selectedScenario);
              displayOutcomeB(selectedScenario, outcome);

          } else {
              // Alert the user or handle as needed
              alert("Please fill in all required fields before submitting.");
          }
        };
      inputDiv.appendChild(submitBtn);
    };
    }


  function generatePaginationButtons() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = ""; 
    //breaks to shift content down below header
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
