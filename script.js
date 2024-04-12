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
    let currentStep = 0;
    const instructionModal = document.getElementById("instructionModal");
    const viewInstructionsBtn = document.getElementById("viewInstructionsBtn");
    const instructionDiv = document.getElementById("instructions");
    const userInputs = new Array(scenarios.length).fill('');
    var group = Math.random() < 0.5 ? "a" : "b";
    var mainChart;
    var originalBackgroundColors = [];

    function setupChart(scenario) {
        const ctx = document.getElementById('mainChart').getContext('2d');
        if (!ctx) {
            console.error("Chart canvas not found!");
            return;
        }

        const dataCounts = generateChartData(scenario);
        mainChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: dataCounts.labels,
                datasets: [{ data: dataCounts.values, backgroundColor: dataCounts.colors, borderWidth: 1 }]
            },
            options: { animation: { duration: 0 }, tooltips: { enabled: false } }
        });

        originalBackgroundColors = mainChart.data.datasets[0].backgroundColor.slice();
    }
    Chart.defaults.global.tooltips.enabled = false;
    Chart.defaults.global.legend.display = false;
    Chart.defaults.global.hover.enabled = false;

    
function generateChartData(scenario) {
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
    return {
        labels: xValues,
        values: yValues,
        colors: barColors
    };
}

function lightenColor(color) {
    //lighten color by percent
    if (color == "gray") {
      return "lightgray";
    } else if (color == "blue") {
      return "lightblue";
    } else if (color == "darkred") {
      return "red";
    } else {
      return "lightgray";
    }
  }
  let outcome  = null;
  function spinChart(callback) {
    const totalSlices = 10;
    let previousSlice = -1;
    const spinDuration = 3000;
    const flashDuration = 100;
    let elapsedTime = 0;
  
    const intervalId = setInterval(() => {
        if (previousSlice >= 0) {
            mainChart.data.datasets[0].backgroundColor[previousSlice] = originalBackgroundColors[previousSlice];
        }
  
        let currentSlice;
        do {
            currentSlice = Math.floor(Math.random() * totalSlices);
        } while (currentSlice === previousSlice);
  
        mainChart.data.datasets[0].backgroundColor[currentSlice] = lightenColor(
            mainChart.data.datasets[0].backgroundColor[currentSlice]
          );
    
          mainChart.update();
        previousSlice = currentSlice;
        elapsedTime += flashDuration;

        
  
        if (elapsedTime >= spinDuration) {
            clearInterval(intervalId);
            outcome =  mainChart.data.labels[currentSlice];
            if (callback) callback(outcome);
        }
    }, flashDuration);
}

  

    function updateInstructionText() {
        if (instructions[currentStep]) {
            instructionDiv.innerHTML = `<p>${instructions[currentStep].text}</p>`;
        }
    }

    function validateAnswers() {
        if (correctAnswers.hasOwnProperty(currentStep)) {
            const userAnswer = document.querySelector(`input[name="q${currentStep}Input"]:checked`);
            return userAnswer && userAnswer.id === correctAnswers[currentStep];
        }
        return true;
    }

    document.getElementById("continue").addEventListener("click", function() {
        if (validateAnswers()) {
            nextInstruction();
        } else {
            alert("Please answer the question correctly before proceeding.");
        }
    });

    document.getElementById("back").addEventListener("click", function() {
        if (currentStep > 0) currentStep--;
        updateInstructionText();
    });

    viewInstructionsBtn.addEventListener("click", function () {
        currentStep = 0;
        instructionModal.style.display = "block";
        viewInstructionsBtn.style.display = "none";
        updateInstructionText();
    });

    function nextInstruction() {
        currentStep++;
        if (currentStep >= instructions.length) {
            instructionModal.style.display = "none";
            viewInstructionsBtn.style.display = "block";
            currentStep = 0; // Reset to the start
        }
        updateInstructionText();
    }

    if (group === "a") {
        showScenario(scenarios[0], 0, false);
    } else {
        showScenario(scenarios[0], 0, true);
    }

    function showScenario(scenario, index, stateContingent) {
        const scenarioDiv = document.getElementById("scenario");
        if (!scenarioDiv) {
            console.error("Scenario div not found!");
            return;
        }
        
        // Update the scenario description based on whether it is state-contingent
        const scenarioDescription = stateContingent ? generateStateContingentDescription(scenario) : generateNonStateContingentDescription(scenario);
        scenarioDiv.innerHTML = `<h2>Scenario ${index + 1}</h2><p>${scenarioDescription}</p>`;
        
        // Input fields for donations
        const inputDiv = document.getElementById("user-input");
        if (stateContingent) {
            inputDiv.innerHTML = `
                <p>For your possible donation amounts, you can select any number up to $20 for a red ball and up to $60 for a blue ball.</p>
                <p>Please select how much you would give if you drew a...</p>
                <div class="input-group input-group-lg">
                    <span class="input-group-text">$</span>
                    <input type="number" class="form-control" placeholder="Amount for red ball (up to $20)" value="${userInputs[index]?.red || ''}" id="redInput${index}">
                </div>
                <div class="input-group input-group-lg mt-2">
                    <span class="input-group-text">$</span>
                    <input type="number" class="form-control" placeholder="Amount for blue ball (up to $60)" value="${userInputs[index]?.blue || ''}" id="blueInput${index}">
                </div>
            `;
        } else {
            inputDiv.innerHTML = `
                <p>How much do you want to give to your chosen charity?</p>
                <div class="input-group input-group-lg">
                    <span class="input-group-text">$</span>
                    <input type="number" class="form-control" placeholder="Enter donation amount (up to $20)" value="${userInputs[index] || ''}" id="input${index}">
                </div>
            `;
        }
    
        // Append a submit button if it's the last scenario
        if (index === scenarios.length - 1) {
            const submitBtn = document.createElement('button');
            submitBtn.textContent = 'Submit';
            submitBtn.classList.add('btn', 'btn-success', 'mt-3');
            submitBtn.addEventListener('click', function() {
                if (allFieldsFilled()) {
                    handleSubmission(); // Function to handle the final submission
                } else {
                    alert("Please fill in all required fields before submitting.");
                }
            });
            inputDiv.appendChild(submitBtn);
        }
    
        // Add event listeners to inputs to capture live changes
        if (stateContingent) {
            document.getElementById(`redInput${index}`).addEventListener('input', updateInputs);
            document.getElementById(`blueInput${index}`).addEventListener('input', updateInputs);
        } else {
            document.getElementById(`input${index}`).addEventListener('input', updateInputs);
        }
    
        function updateInputs() {
            if (stateContingent) {
                const redInput = document.getElementById(`redInput${index}`);
                const blueInput = document.getElementById(`blueInput${index}`);
                userInputs[index] = {
                    red: redInput.value,
                    blue: blueInput.value
                };
            } else {
                const input = document.getElementById(`input${index}`);
                userInputs[index] = input.value;
            }
        }
    }
    
    function allFieldsFilled() {
        // Implement logic to check if all fields are filled based on scenario type
        // This is a placeholder for actual validation logic
        return userInputs.every(input => input !== '' && input != null);
    }

    let selectedScenarioNum =null;
    function selectRandomScenario() {
        const randomNumber = Math.floor(Math.random() * scenarios.length); // Adjust according to your scenarios
        selectedScenarioNum = randomNumber;
        return scenarios[randomNumber];
    }

    function displayResult(outcome) {
        // Hide the submit button
        document.getElementById('spinBtn').style.display = 'none';
    
        // Assuming the 'outcome' variable contains only the color 'red' or 'blue'.
        const color = outcome; // 'outcome' should be 'red' or 'blue'
        if (color == 'gray'){
            //50/50 chance of red or blue
            color = Math.random() < 0.5 ? "red" : "blue";
        }
        const amount = color === 'red' ? 20 : 60; // Example amounts for each color
    
        const scenarioDescription = document.getElementById('scenarioDescription');
        //

        if (group === "b") {
            scenarioDescription.innerHTML = `
            Wheel landed on: ${color.toUpperCase()}<br>
            Here is what you receive from the spin: $${amount}<br>
            Here is how much you decided to give: $${userInputs[selectedScenarioNum][color]}
        `;
    
        const decisionInput = document.getElementById('decisionInput');
        decisionInput.innerHTML = `
            <p>Would you like to change your decision? If yes, how much would you like to give to charity out of the sum?</p>
            <input type="number" id="newDonationAmount" value="${userInputs[selectedScenarioNum][color]}" />
        `;
            }
        else {
            scenarioDescription.innerHTML = `
            Wheel landed on: ${color.toUpperCase()}<br>
            Here is what you receive from the spin: $${amount}<br>
            Here is how much you decided to give: $${userInputs[selectedScenarioNum]}
        `;
    
        const decisionInput = document.getElementById('decisionInput');
        decisionInput.innerHTML = `
            <p>Would you like to change your decision? If yes, how much would you like to give to charity out of the sum?</p>
            <input type="number" id="newDonationAmount" value="${userInputs[selectedScenarioNum]}" />
        `;
        }

    
        const confirmButton = document.getElementById('confirmChange');
        // Make sure to pass the current scenario number and color to the update function
        confirmButton.onclick = () => updateDonation(userInputs[selectedScenarioNum], color);
    }
    
    function updateDonation(scenarioNum, color) {
        const newAmount = document.getElementById('newDonationAmount').value;
        console.log(`Updated donation for scenario #${scenarioNum} and color ${color}: $${newAmount}`);
        alert(`Thank you for completing the study! The application will now close.`)
        window.close();
        // Add further logic here to process this updated donation
    }
    
    function displayOutcome(scenario) {
        document.getElementById("spinBtn").addEventListener("click", function() {
            spinChart(displayResult);
        });
                setupChart(scenario); // Reset the chart for the next spin
          const modalTitle = document.querySelector('#submitModal .modal-title');
          modalTitle.textContent = 'Scenario Outcome';
      
          const scenarioDescription = document.getElementById('scenarioDescription');
          scenarioDescription.innerHTML = `Round # Selected: Scenario ${scenario.num + 1}<br>`;

      }
    
    function handleSubmission() {
        console.log("Submission Data:", userInputs);
        document.getElementById('submitModal').style.display = 'block';
        const selectedScenario = selectRandomScenario();
        displayOutcome(selectedScenario);
    
        // Additional logic to process submission
    }
    
    function generateNonStateContingentDescription(scenario) {
        return `The money you receive will be determined by a draw from an urn containing 10 balls. 
                There are between ${scenario.redMin} and ${scenario.redMax} red balls; each red ball is worth $20. 
                The rest are blue balls, each worth $60.`;
    }
    
    function generateStateContingentDescription(scenario) {
        return `In this scenario, you first decide how much to donate depending on the color of the ball drawn. 
                There are between ${scenario.redMin} and ${scenario.redMax} red balls (each worth $20) and 
                the remaining balls are blue (each worth $60).`;
    }
    

    function generatePaginationButtons() {
        const pagination = document.getElementById("pagination");
        pagination.innerHTML = "<br/><br/><br/><br/>";
        scenarios.forEach((scenario, index) => {
            const button = document.createElement("button");
            button.textContent = `Scenario ${index + 1}`;
            button.className = "btn btn-primary mb-2";
            button.onclick = () => showScenario(scenario, index, group === "b");
            pagination.appendChild(button);
        });
    }

    generatePaginationButtons();
    document.getElementById("instructions").innerHTML = `<p>${instructions[0].text}</p>`;

});


