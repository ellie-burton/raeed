const scenarios = [
  {
    num: 0,
    redMin: 0,
    redMax: 10,
  },
  {
    num: 1,
    redMin: 2,
    redMax: 8,
  },
  {
    num: 2,
    redMin: 4,
    redMax: 6,
  },
  {
    num: 3,
    redMin: 5,
    redMax: 5,
  },
  {
    num: 4,
    redMin: 10,
    redMax: 10,
  },
  {
    num: 5,
    redMin: 0,
    redMax: 0,
  },
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
  },
  {
    step: 4,
    text: "Before we begin this study, we would like to check your understanding. <p>Q2: Recall that your decisions will determine your payment. How is your payment determined? <div class='form-check'><input class='form-check-input' type='radio' name='q4Input' id='q2Input1'><label class='form-check-label' for='q2Input1'>Every decision in the six parts will get paid. Thus, I can strategize across decisions and hedge my bets.</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q4Input' id='q2Input2'><label class='form-check-label' for='q2Input2'>The computer will randomly select one of the decisions in the six parts, and my payment will depend on my answer to this question. Thus, there is no point for me to strategize across these decisions.</label></div></p>",
  },
  {
    step: 5,
    text: "Choose a recipient for all your donations from the following list of charities: <div class='form-check'><input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio1'><label class='form-check-label' for='charityRadio1'> Tuscaloosa Public Library</label></div><div class='form-check'><input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio2'><label class='form-check-label' for='charityRadio2'> Tuscaloosa YMCA</label></div><div class='form-check'><input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio3'><label class='form-check-label' for='charityRadio3'> RISE Center (Early childhood preschool services)</label></div><div class='form-check'><input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio4'><label class='form-check-label' for='charityRadio4'> Tuscaloosa Metro Animal Shelter</label></div>",
  },
];
// Example of correct answers defined in an object
const correctAnswers = {
  3: "q1Input3", // Assuming the correct answer for the first question is the third option
  4: "q2Input2", // Correct answer for the second question
};

document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 0;
  const instructionModal = document.getElementById("instructionModal");
  const viewInstructionsBtn = document.getElementById("viewInstructionsBtn");
  const instructionDiv = document.getElementById("instructions");
  const userInputs = new Array(scenarios.length).fill("");
  scenarios.sort(() => Math.random() - 0.5);

  //populate the data items about the scenario order
  //find the index of 1 in the scenario order
  var scenario0Order = scenarios.findIndex((scenario) => scenario.num == 0);
  var scenario1Order = scenarios.findIndex((scenario) => scenario.num == 1);
  var scenario2Order = scenarios.findIndex((scenario) => scenario.num == 2);
  var scenario3Order = scenarios.findIndex((scenario) => scenario.num == 3);
  var scenario4Order = scenarios.findIndex((scenario) => scenario.num == 4);
  var scenario5Order = scenarios.findIndex((scenario) => scenario.num == 5);

  var group = Math.random() < 0.5 ? "a" : "b";
  var mainChart;
  var originalBackgroundColors = [];

  //initial data 
  var totalTimeSpent = 0;
  var comprehensionCheck1 = 1;
  var comprehensionCheck2 = 1;
  var recipientCharity = "unknown";
  var edited = false;
  var amountRecieved = -1;
  var originalGift = -1;
  var newGift = -1;
  var amountPaid=-1;



  function setupChart(scenario, chart) {
    const ctx = document.getElementById(chart).getContext("2d");
    if (!ctx) {
      console.error("Chart canvas not found!");
      return;
    }

    const dataCounts = generateChartData(scenario);
    mainChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: dataCounts.labels,
        datasets: [
          {
            data: dataCounts.values,
            backgroundColor: dataCounts.colors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: {
          duration: 0,
          onProgress: function (animation) {
            const chartInstance = animation.chart;
            const ctx = chartInstance.ctx;
            ctx.font = "24px Arial"; // Customize font size and style
            ctx.textAlign = "center";
            ctx.fillStyle = "white"; // Text color

            chartInstance.data.datasets.forEach(function (dataset, i) {
              const meta = chartInstance.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                const label = chartInstance.data.labels[index];
                if (label.includes("Unknown")) {
                  // Only draw on 'Unknown' slices
                  const centerPoint = bar.tooltipPosition();
                  ctx.fillText("?", centerPoint.x, centerPoint.y); // Draw a question mark
                }
              });
            });
          },
        },
        tooltips: { enabled: false }, // Optionally disable tooltips
        legend: { display: false }, // Optionally hide the legend
        responsive: true,
        maintainAspectRatio: true,
      },
    });
    originalBackgroundColors =
      mainChart.data.datasets[0].backgroundColor.slice();
  }

  Chart.defaults.global.tooltips.enabled = false;
  Chart.defaults.global.legend.display = false;
  Chart.defaults.global.hover.enabled = false;
  function moveToNextScenario() {
    currentStep++;
    if (currentStep < scenarios.length) {
      showScenario(scenarios[currentStep], currentStep, group === "b");
      window.scrollTo(0, 0); // Scroll to top when moving to the next scenario
    } else {
      document.getElementById("nextScenarioBtn").style.display = "none";
      handleSubmission(); 
    }
  }

  function updateUserInputs() {
    if (group === "a") {
        userInputs[currentStep] = document.getElementById(`input${currentStep}`).value;
    }
    else {
        //deal with certainty scenario
        if(scenarios[currentStep].redMin == 10 || (scenarios[currentStep].redMin == 0 && scenarios[currentStep].redMax != 10)){  
            userInputs[currentStep] = {red: document.getElementById(`input${currentStep}`).value,
            blue: document.getElementById(`input${currentStep}`).value};
        }
        else{
            userInputs[currentStep] = {
                //if certainty scenario, only one input
                red: document.getElementById(`redInput${currentStep}`).value,
                blue: document.getElementById(`blueInput${currentStep}`).value,
    
            };
        }
        
    }
    }


  function validateCurrentInput() {
    //if certainty scenario, check if input is valid
    if(scenarios[currentStep].redMin == 10 || scenarios[currentStep].redMin == 0){
        if(scenarios[currentStep].redMin == 10){
            if(userInputs[currentStep] > 20 || userInputs[currentStep] < 0){
                return false;
            }
        }else{
            if(userInputs[currentStep] > 60 || userInputs[currentStep] < 0){
                return false;
            }
        }
        return true;
    }
    const currentIndex = currentStep; // Assuming currentStep is your current scenario index
    let inputValid = true;

    // Example validation for a scenario with range conditions
    if (group == "b") {
      const redInput = parseInt(
        document.getElementById(`redInput${currentIndex}`).value,
        10
      );
      const blueInput = parseInt(
        document.getElementById(`blueInput${currentIndex}`).value,
        10
      );
      if (
        isNaN(redInput) ||
        redInput < 0 ||
        redInput > 20 ||
        isNaN(blueInput) ||
        blueInput < 0 ||
        blueInput > 60
      ) {
        inputValid = false;
      }
    } else {
      const userInput = document.getElementById(`input${currentIndex}`).value;

      const donationAmount = parseInt(userInput, 10);
      if (isNaN(donationAmount) || donationAmount < 0 || donationAmount > 20) {
        inputValid = false;
      }
    }

    return inputValid;
  }

  document
    .getElementById("nextScenarioBtn")
    .addEventListener("click", function () {
      if (validateCurrentInput()) {
        updateUserInputs();
        moveToNextScenario();
      } else {
        alert("Please enter a valid amount within the specified range.");
      }
    });

    function generateNonStateContingentDescription(scenario) {
        return `The money you receive will be determined by a spin of a wheel. The wheel consists of ten sections of equal size that are either red or blue. The number of red sections is between ${scenario.redMin} and ${scenario.redMax}. The rest are blue. Randomly landing on red yields $20, and randomly landing on blue yields $60. You will first make the decision on how much you will give, and then the computer will randomly spin the wheel.`;
      }
    
      function generateStateContingentDescription(scenario) {
        return `The money you receive will be determined by a spin of a wheel. The wheel consists of ten sections of equal size that are either red or blue. The number of red sections is between ${scenario.redMin} and ${scenario.redMax}. The rest are blue. Randomly landing on red yields $20, and randomly landing on blue yields $60. You will first make the decision on how much you will give, and then the computer will randomly spin the wheel.`;
      }

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
      colors: barColors,
    };
  }
  function allFieldsFilled() {
    if (group === "a") {
      return userInputs.every((input) => input);
    } else {
      return userInputs.every((input) => input.red && input.blue);
    }
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
  let outcome = null;
  let review = false;

  function spinChart(callback) {
    const totalSlices = 10;
    let previousSlice = -1;
    const spinDuration = 3000;
    const flashDuration = 100;
    let elapsedTime = 0;

    const intervalId = setInterval(() => {
      if (previousSlice >= 0) {
        mainChart.data.datasets[0].backgroundColor[previousSlice] =
          originalBackgroundColors[previousSlice];
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
        outcome = mainChart.data.labels[currentSlice];
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
      const userAnswer = document.querySelector(
        `input[name="q${currentStep}Input"]:checked`
      );
      return userAnswer && userAnswer.id === correctAnswers[currentStep];
    }
    return true;
  }

  document.getElementById("continue").addEventListener("click", function () {
    if(review&&currentStep>3){
        //if in review mode, only go through step 
        //close modal after step 3
        instructionModal.style.display = "none";

    }
    //check charity selection
    if(currentStep == 5){
        var charityRadio = document.querySelector('input[name="charityRadioGroup"]:checked');
        if(charityRadio){
            recipientCharity = charityRadio.labels[0].innerText;
        }else{
            alert("Please select a charity before proceeding.");
            return;
        }
    }
    if (validateAnswers()) {
      nextInstruction();
    } else {
      //set comprehensioncheck value to false for appropriate value
      if(currentStep == 3){
        comprehensionCheck1 = 0;
      }else{
      comprehensionCheck2 = 0;
      }
      alert("Please answer the question correctly before proceeding.");
    }
    if(!review&&currentStep>=instructions.length){
      //calculate time spent
      totalTimeSpent = new Date() - startTime;
    }
  });

  document.getElementById("back").addEventListener("click", function () {
    if (currentStep > 0) {
      currentStep--;
      updateInstructionText();
    }
  });

  viewInstructionsBtn.addEventListener("click", function () {
    //implement logic to only go through step 3
    review = true;
    currentStep = 0;
    instructionModal.style.display = "block";
    viewInstructionsBtn.style.display = "none";
    updateInstructionText();
  });

  function nextInstruction() {
    currentStep++;
    if ((currentStep >= instructions.length) || (currentStep > 2 && review)) {
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
    const inputDiv = document.getElementById("user-input");
    if (scenario.redMin == 10 || scenario.redMin == 0 && scenario.redMax != 10) {
        //clear the chart
        document.getElementById("scenarioChart").style.display = "none";

      scenarioDiv.innerHTML = `<h2>Scenario ${index+1}</h2><p>This scenario has a fixed outcome with no random elements.</p>`;
      inputDiv.innerHTML = `<p>You have been given $${
        scenario.redMin === 10 ? 20 : 60
      }. You can split this sum between you and your chosen charity. If you decide to give $X to your chosen charity, then you will take $${
        scenario.redMin === 10 ? 20 : 60
      }-$X home.

      You cannot donate more than $${
        scenario.redMin === 10 ? 20 : 60
      }</p><p>How much would you like to pledge to share with your chosen charity?</p>
                <input type="number" class="form-control" placeholder="Enter donation amount" value="${
                  userInputs[index] || ""
                }" id="input${index}">`;
    } else {
        document.getElementById("scenarioChart").style.display = "block";
      setupChart(scenario, "scenarioChart");
      const scenarioDescription = stateContingent
        ? generateStateContingentDescription(scenario)
        : generateNonStateContingentDescription(scenario);
      scenarioDiv.innerHTML = `<h2>Scenario ${
        index + 1
      }</h2><p>${scenarioDescription}</p>`;
      inputDiv.innerHTML = stateContingent
        ? generateStateInputs(index)
        : generateNonStateInputs(index);
    }
  }

  // Additional functions for generating input fields based on scenario type
  function generateStateInputs(index) {
    return `<p>Select donation amounts based on color outcomes...</p>
            <input type="number" class="form-control" placeholder="Amount if red (up to $20)" value="${
              userInputs[index].red || ""
            }" id="redInput${index}">
            <input type="number" class="form-control" placeholder="Amount if blue (up to $60)" value="${
              userInputs[index].blue || ""
            }" id="blueInput${index}">`;
  }

  function generateNonStateInputs(index) {
    return `<p>Enter donation amount (up to $20)</p>
            <input type="number" class="form-control" placeholder="Enter donation amount" value="${
              userInputs[index] || ""
            }" id="input${index}">`;
  }

  function finalSubmit() {
    var formData = new FormData();
    formData.append('TimeReadingInstructions', totalTimeSpent);
    formData.append('ComprehensionQ1', comprehensionCheck1);
    formData.append('ComprehensionQ2', comprehensionCheck2);
    formData.append('RecipientCharity', recipientCharity);
    formData.append('Treatment', group);
    formData.append('Scenario0Order', scenario0Order);
    formData.append('Scenario1Order', scenario1Order);
    formData.append('Scenario2Order', scenario2Order);
    formData.append('Scenario3Order', scenario3Order);
    formData.append('Scenario4Order', scenario4Order);
    formData.append('Scenario5Order', scenario5Order);
    if(group === "a"){
      formData.append('Scenario1Red', userInputs[1]);
      formData.append('Scenario2Red', userInputs[2]);
      formData.append('Scenario3Red', userInputs[3]);
      formData.append('Scenario4Red', userInputs[4]);
      formData.append('Scenario5Red', userInputs[5]);
    }else{
      formData.append('Scenario0Red', userInputs[0].red||-1);
      formData.append('Scenario0Blue', userInputs[0].blue||-1);
    formData.append('Scenario1Red',userInputs[1].red||-1);
    formData.append('Scenario1Blue',userInputs[1].blue||-1);
    formData.append('Scenario2Red',userInputs[2].red||-1);
    formData.append('Scenario2Blue',userInputs[2].blue||-1);
    formData.append('Scenario3Red',userInputs[3].red||-1);
    formData.append('Scenario3Blue',userInputs[3].blue||-1);
    formData.append('Scenario4Red',userInputs[4].red||-1);
    formData.append('Scenario4Blue',userInputs[4].blue||-1);
    formData.append('Scenario5Red',userInputs[5].red||-1);
    formData.append('Scenario5Blue',userInputs[5].blue||-1);
    }
    formData.append('ScenarioSelected', selectedScenarioNum);
    formData.append('AmountRecieved', amountRecieved); 
    formData.append('OriginalGift', originalGift);
    formData.append('Revise', edited);
    formData.append('NewAnswer', newGift);
    formData.append('AmountPaid', amountPaid);

    // Send data to your Apps Script Web App URL
    let url = 'https://script.google.com/macros/s/AKfycbwL9lZHsmWympt7wCWRBq6sxRWw_b-SlDNyOpPwIkX9S3QgFPbzR5SSyCbtDMExBmHI/exec';
    fetch(url, {
        method: 'POST',
        mode: 'no-cors', // Note: 'no-cors' mode means you won't be able to read the response
        body: new URLSearchParams(formData)
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
        alert('Submission successful!');
    })
    .catch(error => console.error('Error:', error));
}

  let selectedScenarioNum = -1;
  function selectRandomScenario() {
    const randomNumber = Math.floor(Math.random() * scenarios.length); // Adjust according to your scenarios
    selectedScenarioNum = randomNumber;
    return scenarios[randomNumber];
  }

  function displayResult(outcome) {

    // Hide the submit button
    document.getElementById("spinBtn").style.display = "none";

    // Assuming the 'outcome' variable contains only the color 'red' or 'blue'.
    const color = outcome; // 'outcome' should be 'red' or 'blue'
    if (color == "gray") {
      //50/50 chance of red or blue
      color = Math.random() < 0.5 ? "red" : "blue";
    }
    const amount = color === "red" ? 20 : 60; // Example amounts for each color
    //save the moneyRecieved
    amountRecieved = amount;

    const scenarioDescription = document.getElementById("scenarioDescription");

    if (group === "b") {
      scenarioDescription.innerHTML = `
            Wheel landed on: ${color.toUpperCase()}<br>
            Here is what you receive from the spin: $${amount}<br>
            Here is how much you decided to give: $`;
      if (color =='red'){
        scenarioDescription.innerHTML += `${userInputs[selectedScenarioNum].red}<br>`;
      } else {
        scenarioDescription.innerHTML += `${userInputs[selectedScenarioNum].blue}<br>`;
      }

      const decisionInput = document.getElementById("decisionInput");
      decisionInput.innerHTML = `
            <p>Would you like to change your decision? If yes, how much would you like to give to charity out of the sum?</p>
            <input type="number" id="newDonationAmount" value="" />
        `;
    } else {
      scenarioDescription.innerHTML = `
            Wheel landed on: ${color.toUpperCase()}<br>
            Here is what you receive from the spin: $${amount}<br>
            Here is how much you decided to give: $${
              userInputs[selectedScenarioNum]
            }
        `;

      const decisionInput = document.getElementById("decisionInput");
      decisionInput.innerHTML = `
            <p>Would you like to change your decision? If yes, how much would you like to give to charity out of the sum?</p>
            <input type="number" id="newDonationAmount" value="${userInputs[selectedScenarioNum]}" />
        `;
    }

    const confirmButton = document.getElementById("confirmChange");
    // Make sure to pass the current scenario number and color to the update function
    confirmButton.addEventListener("click", function () {
      updateDonation(userInputs[selectedScenarioNum], color);
      finalSubmit();
    });
}

  function updateDonation(scenarioNum, color) {
    const newAmount = document.getElementById("newDonationAmount").value;

    if (group === "a") {
      if (userInputs[scenarioNum] != newAmount ){
        edited = true;
      }
      userInputs[scenarioNum] = newAmount;
    }
    else{
      if (color == "red" ){
        if (userInputs[scenarioNum].red != newAmount ){
            edited = true;
            userInputs[scenarioNum].red = newAmount;
          }
        
    }
    if (color == "blue" ){
      if (userInputs[scenarioNum].blue != newAmount ){
          edited = true;
          userInputs[scenarioNum].blue = newAmount;

        }
  }
  }

    //check if user updated amount

    console.log(
      `Updated donation for scenario #${scenarioNum} and color ${color}: $${newAmount}`
    );
    alert(
      `Thank you for completing the study! The application will now close.`
    );

  }

  function displayOutcome(scenario) {
    console.log("Entered display outcome function");
    //if certainty scenario, don't need to spin
    if(scenario.redMin == 10 || (scenario.redMin == 0 && scenario.redMax != 10)){
        //don't spin, just say what the outcome is
        if(scenario.redMin == 10){
            outcome = "red";
        }else{
            outcome = "blue";
        }
        displayResult(outcome);
    }
    else{
    document.getElementById("spinBtn").addEventListener("click", function () {
      spinChart(displayResult);
    });
    setupChart(scenario, "mainChart"); // Reset the chart for the next spin
}
    const modalTitle = document.querySelector("#submitModal .modal-title");
    modalTitle.textContent = "Scenario Outcome";

    const scenarioDescription = document.getElementById("scenarioDescription");
    scenarioDescription.innerHTML = `Round # Selected: Scenario ${
      scenario.num + 1
    }<br>`;
  }

  function handleSubmission() {
    console.log("Submission Data:", userInputs);
    document.getElementById("submitModal").style.display = "block";
    const selectedScenario = selectRandomScenario();
    displayOutcome(selectedScenario);

    // Additional logic to process submission
  }
  //set initial instruction to display
  document.getElementById(
    "instructions"
  ).innerHTML = `<p>${instructions[0].text}</p>`;
  //start time
  let startTime = new Date();

});
