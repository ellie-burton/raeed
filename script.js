let scenarios = [
  {
    num: 0,
    orderNum: -1,
    redMin: 0,
    redMax: 10,
    redVal: -1,
    blueVal: -1,
  },
  {
    num: 1,
    orderNum: -1,

    redMin: 2,
    redMax: 8,
    redVal: -1,
    blueVal: -1,
  },
  {
    num: 2,
    orderNum: -1,

    redMin: 4,
    redMax: 6,
    redVal: -1,
    blueVal: -1,
  },
  {
    num: 3,
    orderNum: -1,

    redMin: 5,
    redMax: 5,
    redVal: -1,
    blueVal: -1,
  },
  {
    num: 4,
    orderNum: -1,

    redMin: 10,
    redMax: 10,
    redVal: -1,
    blueVal: -1,
  },
  {
    num: 5,
    orderNum: -1,

    redMin: 0,
    redMax: 0,
    redVal: -1,
    blueVal: -1,
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
    text: `Choose a recipient for all your donations from the following list of charities: <div class='form-check'><input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio1'><label class='form-check-label' for='charityRadio1'><b> Tuscaloosa Public Library: </b>Description from their <a href = 'https://www.tuscaloosa-library.org/support-the-library/' target='_blank'>website</a>: “The Tuscaloosa Public Library is the City’s and County’s public library for all residents to utilize for their educational, workforce, research and entertainment needs. TPL has been serving this community for more than 100 years and looks to continue that role for the next 100 years. Your gift to the Tuscaloosa Public Library will help maintain the quality of the Library’s collections, diverse programming, informational resources and accessible to technology.”</label></div>
    <div class='form-check'><input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio2'><label class='form-check-label' for='charityRadio2'><b> Tuscaloosa YMCA: </b>Description from their <a href='https://www.ymcatuscaloosa.org/financial' target='_blank'>website</a>: “The YMCA of Tuscaloosa embraces people of all ages, incomes, abilities, religions and ethnic backgrounds; we're for everyone. We work to break barriers of isolation and create the connections between people that add meaning to life. Individuals and families who cannot afford to pay full price for memberships or our programs still deserve the life-enriching experiences the Y offers. At the Y, we never turn anyone away because of an inability to pay.”</label></div>
    <div class='form-check'><input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio3'><label class='form-check-label' for='charityRadio3'> <b>RISE Center: </b>Description from their <a href='https://risecenter.ua.edu/' target='_blank'>website</a>: “The YMCA of Tuscaloosa embraces people of all ages, incomes, abilities, religions and ethnic backgrounds; we're for everyone. We work to break barriers of isolation and create the connections between people that add meaning to life. Individuals and families who cannot afford to pay full price for memberships or our programs still deserve the life-enriching experiences the Y offers. At the Y, we never turn anyone away because of an inability to pay.”</label></div>
    <div class='form-check'><input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio4'><label class='form-check-label' for='charityRadio4'><b> Tuscaloosa Metro Animal Shelter: </b>Description from their <a href='https://give.metroanimalshelter.org/give/296293/#!/donation/checkout' target='_blank'>website</a>: "Tuscaloosa Metro Animal Shelter is the only stray receiving facility for Tuscaloosa County, Tuscaloosa City, and the City of Northport. All animals picked up by the three municipal animal control agencies in Tuscaloosa County are brought to TMAS… Every year we get in thousands of lost and abandoned pets into our facility.  Donations from our amazing supporters allow us to treat, rehabilitate, foster, and adopt them out!"</label></div>",
  `
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
  //RANDOMIZE ORDER OF SCENARIOS
  for (let i = scenarios.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [scenarios[i], scenarios[j]] = [scenarios[j], scenarios[i]]; // swap elements
  }

  //populate the data items about the scenario order
  //find the index of 1 in the scenario order
  var scenario0Order = scenarios.findIndex((scenario) => scenario.num == 0);
  scenarios.find((scenario) => scenario.num == 0).orderNum = scenario0Order;
  var scenario1Order = scenarios.findIndex((scenario) => scenario.num == 1);
  scenarios.find((scenario) => scenario.num == 1).orderNum = scenario0Order;
  var scenario2Order = scenarios.findIndex((scenario) => scenario.num == 2);
  scenarios.find((scenario) => scenario.num == 2).orderNum = scenario0Order;
  var scenario3Order = scenarios.findIndex((scenario) => scenario.num == 3);
  scenarios.find((scenario) => scenario.num == 3).orderNum = scenario0Order;
  var scenario4Order = scenarios.findIndex((scenario) => scenario.num == 4);
  scenarios.find((scenario) => scenario.num == 4).orderNum = scenario0Order;
  var scenario5Order = scenarios.findIndex((scenario) => scenario.num == 5);
  scenarios.find((scenario) => scenario.num == 5).orderNum = scenario0Order;


  var group = Math.random() < 0.5 ? "a" : "b";
  var mainChart;
  var originalBackgroundColors = [];

  //initial data
  var totalTimeSpent = 0;
  var comprehensionCheck1 = 1;
  var comprehensionCheck2 = 1;
  var recipientCharity = "unknown";
  var edited = false;
  var amountReceived = -1;
  var originalGift = -1;
  var newAmount = -1;
  var amountPaid = -1;

  function setupChart(scenario, chart) {
    const ctx = document.getElementById(chart).getContext('2d');
    if (!ctx) {
      console.error("Chart canvas not found!");
      return;
    }
  
    const dataCounts = generateChartData(scenario);
    mainChart = new Chart(ctx, {
      type: 'pie',
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
          duration: 0 // Ensures the chart does not animate
        },
        hover: {
          mode: 'nearest',
          intersect: true,
          animationDuration: 0  // Disables animation on hover
        },
        tooltips: { enabled: false }, // Optionally disable tooltips
        legend: { display: false }, // Optionally hide the legend
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          // Adding afterDraw event to draw question marks
          afterDraw: function(chart) {
            const ctx = chart.ctx;
            ctx.font = "24px Arial"; // Customize font size and style
            ctx.textAlign = "center";
            ctx.fillStyle = "white"; // Text color
  
            chart.data.datasets.forEach(function (dataset, i) {
              const meta = chart.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                const label = chart.data.labels[index];
                if (label.includes("Unknown")) {
                  // Only draw on 'Unknown' slices
                  const centerPoint = bar.tooltipPosition();
                  ctx.fillText("?", centerPoint.x, centerPoint.y); // Draw a question mark
                }
              });
            });
          }
        }
      }
    });
    originalBackgroundColors = mainChart.data.datasets[0].backgroundColor.slice();
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
    if (
      group === "a" ||
      scenarios[currentStep].redMin == 10 ||
      (scenarios[currentStep].redMin == 0 && scenarios[currentStep].redMax == 0)
    ) {
      scenarios[currentStep].redVal = document.getElementById(
        `input${currentStep}`
      ).value;
      scenarios[currentStep].blueVal = document.getElementById(
        `input${currentStep}`
      ).value;
    } else {
      scenarios[currentStep].redVal = document.getElementById(
        `redInput${currentStep}`
      ).value;
      scenarios[currentStep].blueVal = document.getElementById(
        `blueInput${currentStep}`
      ).value;
    }
  }

  function validateCurrentInput() {
    //if certainty scenario, check if input is valid
    if (
      scenarios[currentStep].redMin == 10 ||
      (scenarios[currentStep].redMin == 0 && scenarios[currentStep].redMax == 0)
    ) {
      console.log("Certainty Scenario");
      const input = parseInt(
        document.getElementById(`input${currentStep}`).value,
        10
      );
      if (scenarios[currentStep].redMin == 10) {
        console.log("Certainly RED i.e. must be under 20");
        if (input > 20 || input < 0) {
          console.log(
            "Invalid input for certainly RED:" + scenarios[currentStep].redVal
          );
          return false;
        }
      } else if (
        scenarios[currentStep].redMin == 0 &&
        scenarios[currentStep].redMax == 0
      ) {
        console.log("Certainly BLUE i.e. must be under 60");
        if (input > 60 || input < 0) {
          console.log(
            "Invalid input for certainly BLUE:" + scenarios[currentStep].blueVal
          );
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
    if (review && currentStep > 3) {
      //if in review mode, only go through step
      //close modal after step 3
      instructionModal.style.display = "none";
    }
    //check charity selection
    if (currentStep == 5) {
      var charityRadio = document.querySelector(
        'input[name="charityRadioGroup"]:checked'
      );
      if (charityRadio) {
        recipientCharity = charityRadio.labels[0].innerText;
      } else {
        alert("Please select a charity before proceeding.");
        return;
      }
    }
    if (validateAnswers()) {
      nextInstruction();
    } else {
      //set comprehensioncheck value to false for appropriate value
      if (currentStep == 3) {
        comprehensionCheck1 = 0;
      } else {
        comprehensionCheck2 = 0;
      }
      alert("Please answer the question correctly before proceeding.");
    }
    if (!review && currentStep >= instructions.length) {
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
    if (currentStep >= instructions.length || (currentStep > 2 && review)) {
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
    //certainty scenario
    if (
      scenario.redMin == 10 ||
      (scenario.redMin == 0 && scenario.redMax != 10)
    ) {
      //clear the chart
      document.getElementById("scenarioChart").style.display = "none";

      scenarioDiv.innerHTML = `<h2>Scenario ${
        index + 1
      }</h2><p>This scenario has a fixed outcome with no random elements.</p>`;
      inputDiv.innerHTML = `<p>You have been given $${
        scenario.redMin === 10 ? 20 : 60
      }. You can split this sum between you and your chosen charity. If you decide to give $X to your chosen charity, then you will take $${
        scenario.redMin === 10 ? 20 : 60
      }-$X home.

      You cannot donate more than $${
        scenario.redMin === 10 ? 20 : 60
      }</p><p>How much would you like to pledge to share with your chosen charity?</p>
                  <input type="number" class="form-control" placeholder="Enter your donation" value="${
                    scenario.redVal === -1 ? "" : scenario.redVal
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
              scenarios[index].redVal === -1 ? "" : scenarios[index].redVal
            }" id="redInput${index}">
            <input type="number" class="form-control" placeholder="Amount if blue (up to $60)" value="${
              scenarios[index].blueVal === -1 ? "" : scenarios[index].blueVal
            }" id="blueInput${index}">`;
  }

  function generateNonStateInputs(index) {
    return `<p>Enter donation amount (up to $20)</p>
            <input type="number" class="form-control" placeholder="Enter donation amount" value="${
              scenarios[index].redVal === -1 ? "" : scenarios[index].redVal
            }" id="input${index}">`;
  }

  function finalSubmit() {
    var formData = new FormData();
    formData.append("TimeReadingInstructions", totalTimeSpent);
    formData.append("ComprehensionQ1", comprehensionCheck1);
    formData.append("ComprehensionQ2", comprehensionCheck2);
    formData.append("RecipientCharity", recipientCharity);
    formData.append("Treatment", group);
    formData.append("Scenario0Order", scenario0Order);
    formData.append("Scenario1Order", scenario1Order);
    formData.append("Scenario2Order", scenario2Order);
    formData.append("Scenario3Order", scenario3Order);
    formData.append("Scenario4Order", scenario4Order);
    formData.append("Scenario5Order", scenario5Order);
      formData.append("Scenario0Red", scenarios[scenario0Order].redVal);
      formData.append("Scenario0Blue", scenarios[scenario0Order].blueVal);
      formData.append("Scenario1Red", scenarios[scenario1Order].redVal);
      formData.append("Scenario1Blue", scenarios[scenario1Order].blueVal);
      formData.append("Scenario2Red", scenarios[scenario2Order].redVal);
      formData.append("Scenario2Blue", scenarios[scenario2Order].blueVal);
      formData.append("Scenario3Red", scenarios[scenario3Order].redVal);
      formData.append("Scenario3Blue", scenarios[scenario3Order].blueVal);
      formData.append("Scenario4Red", scenarios[scenario4Order].redVal);
      formData.append("Scenario4Blue", scenarios[scenario4Order].blueVal);
      formData.append("Scenario5Red", scenarios[scenario5Order].redVal);
      formData.append("Scenario5Blue", scenarios[scenario5Order].blueVal);
    formData.append("ScenarioSelected", selectedScenarioNum);
    formData.append("AmountReceived", amountReceived);
    formData.append("OriginalGift", originalGift);
    formData.append("Revise", edited);
    formData.append("NewAnswer", newAmount);
    formData.append("AmountPaid", amountPaid);

    // Send data to your Apps Script Web App URL
    let url =
      "https://script.google.com/macros/s/AKfycby21YkZ0pjSNMUG4YOmzzYj4RLPq4ZdDEHbXrw99jPcdlkI_ERkWd6XlnsArF-h_pPB/exec";
    fetch(url, {
      method: "POST",
      mode: "no-cors", // Note: 'no-cors' mode means you won't be able to read the response
      body: new URLSearchParams(formData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success:", data);
        alert(
          `Thank you for completing the study! Please show this screen to the experiment administrator in order to recieve your payout of $${amountPaid}. `
        );
      })
      .catch((error) => console.error("Error:", error));
  }

  let selectedScenarioNum = -1;
  function selectRandomScenario() {
    const randomNumber = Math.floor(Math.random() * scenarios.length); // Adjust according to your scenarios
    selectedScenarioNum = randomNumber;
    return scenarios.find((scenario) => scenario.num === randomNumber);
  }

  function displayResult(outcome,certainty) {
    // Hide the submit button
    document.getElementById("spinBtn").style.display = "none";

    // Assuming the 'outcome' variable contains only the color 'red' or 'blue'.
    const color = outcome; // 'outcome' should be 'red' or 'blue'
    if (color == "gray") {
      //50/50 chance of red or blue
      color = Math.random() < 0.5 ? "red" : "blue";
    }

    //write the original gift
    if(outcome == "red"){
      amountReceived = 20;
      originalGift = scenarios.find((scenario) => scenario.num === selectedScenarioNum).redVal;
    }
    else{
      amountReceived = 60;
      originalGift = scenarios.find((scenario) => scenario.num === selectedScenarioNum).blueVal;
    }

    const scenarioDescription = document.getElementById("scenarioDescription");
    if(certainty == 'certain'){
      scenarioDescription.innerHTML += `Here is how much you decided to give: $${scenarios.find((scenario) => scenario.num === selectedScenarioNum).redVal}<br>`;
    }
    else if (group === "b") {
      scenarioDescription.innerHTML += `
            Wheel landed on: ${color.toUpperCase()}<br>
            Here is what you receive from the spin: $${amountReceived}<br>
            Here is how much you decided to give: $`;
      if (color == "red") {
        scenarioDescription.innerHTML += `${scenarios.find((scenario) => scenario.num === selectedScenarioNum).redVal}<br>`;
      } else {
        scenarioDescription.innerHTML += `${scenarios.find((scenario) => scenario.num === selectedScenarioNum).blueVal}<br>`;
      }

      const decisionInput = document.getElementById("decisionInput");
      decisionInput.innerHTML = `
            <p>Would you like to change your decision? If yes, how much would you like to give to charity out of the sum?</p>
            <input type="number" id="newDonationAmount" value="" />
        `;
        //group a
    } else {
      scenarioDescription.innerHTML += `
            Wheel landed on: ${color.toUpperCase()}<br>
            Here is what you receive from the spin: $${amountReceived}<br>
            Here is how much you decided to give: $${
              scenarios.find((scenario) => scenario.num === selectedScenarioNum).redVal
            }
        `;

      const decisionInput = document.getElementById("decisionInput");
      decisionInput.innerHTML = `
            <p>Would you like to change your decision? If yes, how much would you like to give to charity out of the sum?</p>
            <input type="number" id="newDonationAmount" value="${scenarios.find((scenario) => scenario.num === selectedScenarioNum).redVal}" />
        `;
    }

    const confirmButton = document.getElementById("confirmChange");
    // Make sure to pass the current scenario number and color to the update function
    confirmButton.addEventListener("click", function () {
      updateDonation(color); 
      finalSubmit();
    });
  }

  function updateDonation(color) {
    newAmount = document.getElementById("newDonationAmount").value;
    var prevAmt = -1;
    console.log(`New donation amount: $${newAmount}`);
    if (color == "red") {
        if (scenarios.find((scenario) => scenario.num === selectedScenarioNum).redVal != newAmount) {
          edited = true;
          scenarios.find((scenario) => scenario.num === selectedScenarioNum).redVal = newAmount;
        }
        else{
          amountPaid = amountReceived-scenarios.find((scenario) => scenario.num === selectedScenarioNum).redVal;
        }

        amountPaid = amountReceived-newAmount;

      }
      if (color == "blue") {
        if (scenarios.find((scenario) => scenario.num === selectedScenarioNum).blueVal != newAmount) {
          edited = true;
          scenarios.find((scenario) => scenario.num === selectedScenarioNum).blueVal = newAmount;
        }
        else{
          amountPaid = amountReceived-scenarios.find((scenario) => scenario.num === selectedScenarioNum).redVal;
        }
        amountPaid = amountReceived-newAmount;
      }
  }

  function displayOutcome(scenario) {
    const scenarioDescription = document.getElementById("scenarioDescription");

    //if certainty scenario, don't need to spin
      //don't spin, just say what the outcome is
      if (scenario.redMin == 10) {
        scenarioDescription.innerHTML = `Round # Selected: Scenario ${scenario.orderNum + 1}. This was a fixed scenario in which you recieve $20.<br>`;
        outcome = "red";
        displayResult(outcome,'certain');
      } else if((scenario.redMin == 0 && scenario.redMax != 10)){
        scenarioDescription.innerHTML = `Round # Selected: Scenario ${scenario.orderNum + 1}. This was a fixed scenario in which you recieve $60.<br>`;
        outcome = "blue";
        displayResult(outcome,'certain');
      }
      
    else {
      setupChart(scenario, "mainChart"); // Reset the chart for the next spin

      scenarioDescription.innerHTML = `Round # Selected: Scenario ${
        scenario.orderNum + 1
      }<br>`;
      document.getElementById("spinBtn").addEventListener("click", function () {
        spinChart(displayResult);
      });
    }
    const modalTitle = document.querySelector("#submitModal .modal-title");
    modalTitle.textContent = "Scenario Outcome";

    
  }

  function handleSubmission() {
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
