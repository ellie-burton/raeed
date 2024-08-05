const colorDict = [
    { cssColor: "ForestGreen", color: "Green", lightenColor: "DarkSeaGreen" },
    { cssColor: "Indigo", color: "Purple", lightenColor: "DarkViolet" },
    { cssColor: "LightSeaGreen", color: "Teal", lightenColor: "LightCyan" },
    { cssColor: "LightCoral", color: "Pink", lightenColor: "LightPink" },
    { cssColor: "Maroon", color: "Red", lightenColor: "FireBrick" },
    { cssColor: "RoyalBlue", color: "Blue", lightenColor: "CornflowerBlue" },
    { cssColor: "Chocolate", color: "Orange", lightenColor: "LightSalmon" },
    { cssColor: "Orange", color: "Yellow", lightenColor: "Gold" },
    { cssColor: "Purple", color: "Magenta", lightenColor: "MediumVioletRed" },
    { cssColor: "SaddleBrown", color: "Brown", lightenColor: "RosyBrown" },
    { cssColor: "Gray", color: "Gray", lightenColor: "DarkGray" }
];

document.addEventListener("DOMContentLoaded", initializeApp);

let state = {
    scenarios: [],
    charityDict: [],
    instructions: [],
    correctAnswers: {},
    currentStep: 0,
    group: "a",
    mainChart: null,
    originalBackgroundColors: [],
    startTime: 0,
    instructionsTime: 0,
    comprehensionCheck1: 1,
    comprehensionCheck2: 1,
    recipientCharity: "unknown",
    scenarioNum: 0,
    edited: false,
    amountReceived: -1,
    originalGift: -1,
    newAmount: -1,
    amountPaid: -1,
    selectedScenarioNum: -1,
    review: false,
    userName: "",
    userCWID: "",
    sessionID: "",
    id: "",
    part: 1,
    scenarioOrder: [-1, -1, -1, -1, -1, -1],
};

function initializeApp() {
    // Event listeners
    document.getElementById("continue").addEventListener("click", handleContinueClick);
    document.getElementById("back").addEventListener("click", handleBackClick);
    document.getElementById("viewInstructionsBtn").addEventListener("click", handleViewInstructionsClick);
    document.getElementById("nextScenarioBtn").addEventListener("click", handleNextScenarioClick);

    // Initial setup
    state.instructions = getInstructions();
    state.correctAnswers = getCorrectAnswers();
    showInstructions();
}

function randomizeColors() {
    const colors = colorDict.filter(color => color.color !== "Gray").map(color => color.color);
    for (let i = colors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]];
    }
    return colors;
}

function shuffleScenarios(scenarios) {
    const nums = [0, 1, 2, 3, 4, 5];
    for (let i = scenarios.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [scenarios[i], scenarios[j]] = [scenarios[j], scenarios[i]];
    }
    
    scenarios.forEach((scenario, index) => {
        scenario.orderNum = index;
    });

    const colors = randomizeColors();
    let j = 0;
    for (let i = 0; i < scenarios.length; i++) {
        if (scenarios[i].primaryMin !== 10) {
            scenarios[i].primaryColor = colors[j];
            scenarios[i].secondaryColor = colors[j + 1];
            j += 2;
        }
    }
    console.log(`Scenarios: ${scenarios}`);
}

function generateCode(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash &= hash; // Convert to 32bit integer
    }
    return hash.toString(16); // Convert to hexadecimal
}

function generateCharities() {
    console.log(`Charity dict: ${state.charityDict}`);
    return state.charityDict.map((charity, i) => 
        `<div class='form-check'>
            <input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio${i + 1}'>
            <label class='form-check-label' for='charityRadio${i + 1}'>
                <b>${charity.name}</b>: <a href='${charity.website}' target='_blank'>Website</a> ${charity.description}
            </label>
        </div>`
    ).join('');
}

function getInstructions() {
    return [
        {
            step: 0,
            text: `Thank you for participating in this research study. The entire study will be completed on the computer in one sitting. First please enter your name, CWID, and Session ID.
                <form id="loginForm">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" required>
                    </div>
                    <div class="mb-3">
                        <label for="cwid" class="form-label">CWID</label>
                        <input type="text" class="form-control" id="cwid" required>
                    </div>
                    <div class="mb-3">
                        <label for="session-id" class="form-label">Session #</label>
                        <input type="text" class="form-control" id="session-id" required>
                    </div>
                </form>`,
            review: false,
        },
        { step: 1, text: "Thank you for participating in this research study. The entire study will be completed on the computer in one sitting. The study consists of two parts.", review: true },
        { step: 2, text: "In this part, you will answer a series of questions. In each round, you will be asked to make a contribution to a charity of your choosing. The contribution will be deducted from a sum of money you receive for that round. You can split the sum of money between yourself and the charity however you want. You can even give all of it or keep all of it.", review: true },
        { step: 3, text: "The timeline of this study will be the following: <ol><li>First you will be given the opportunity to select a charity from a list of potential causes. The selected charity will be the recipient of your donation decision in all subsequent rounds. <u>Remember: all the donation decisions you make will be directed to the charity you choose.</u> </li><li>You will then answer a series of six distinct and independent decisions with real financial stakes. In each decision, it will be explained how the sum of money that you can allocate between yourself and the selected charity will be determined by a random spin of a wheel. The wheels used in each decision are unique and unrelated to those used in each and every other decision round. Your choice in each round is to determine how you would like to split the sum of money between yourself and the selected charity.</li><li>Once you have made an allocation in each of the rounds, the computer will select one of the six decision rounds at random. Your choice in the selected decision round will determine your earnings and the amount that will be given to the selected charity.</li></ol>", review: true },
        { step: 4, text: "Before we begin this study, we would like to check your understanding. Q1: How many different allocation decisions will you make? <div class='form-check'><input class='form-check-input' type='radio' name='q1Input' id='q1Input1'><label class='form-check-label' for='q1Input1'>4</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q1Input' id='q1Input2'><label class='form-check-label' for='q1Input2'>5</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q1Input' id='q1Input3'><label class='form-check-label' for='q1Input3'>6</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q1Input' id='q1Input4'><label class='form-check-label' for='q1Input4'>7</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q1Input' id='q1Input5'><label class='form-check-label' for='q1Input5'>8</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q1Input' id='q1Input6'><label class='form-check-label' for='q1Input6'>9</label></div>", review: false },
        { step: 5, text: "Before we begin this study, we would like to check your understanding. Q2: Recall that your decisions will determine your payment. How is your payment determined? <div class='form-check'><input class='form-check-input' type='radio' name='q2Input' id='q2Input1'><label class='form-check-label' for='q2Input1'>Every decision in the six parts will get paid. Thus, I can strategize across decisions and hedge my bets.</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q2Input' id='q2Input2'><label class='form-check-label' for='q2Input2'>The computer will randomly select one of the decisions in the six parts, and my payment will depend on my answer to this question. Thus, there is no point for me to strategize across these decisions.</label></div>", review: false },
        { step: 6, text: "Loading charities...", review: false }
    ];
}

function getPart2Instructions() {
    return [
        { step: 1, text: "Thank you for completing the 1st part of this study. We will now proceed to the 2nd part, where you will encounter a similar set of scenarios and be provided with the same information. However, the question and underlying decision task that you see will be different from that in Part I of the study. ", review: true },
        { step: 2, text: "Half of the respondents completing this study answered the same question as you did: they were asked to pledge an amount to give to charity without specifying how much they would give depending on the result of the spinner. The other half of respondents were asked to make their pledge with the same information but were able to provide two different answers for how much they would give by conditioning the allocation decision on the color that the spinner landed on.", review: true },
        { step: 3, text: "You will see the same 6 scenarios but be asked to fill in the average amount that you think the people in the other group, who were allowed to condition their decision on the color that the spinner landed on, said. You are to assume that everyone in the other group chose the same charity as you when answering what you think they did.", review: true },
        { step: 4, text: `For example, you will see a spinner that you have seen before. Instead of answering that you would give $X to ${state.recipientCharity} without being able to condition the allocation decision on what the spinner lands on, you will answer how much the average person would answer to ${state.recipientCharity} if the spinner lands on $60 and how much the average person would give to ${state.recipientCharity} if the spinner lands on $20.`, review: true },
        { step: 5, text: "You will be paid for this part of the study. The amount earned in Part II will be added to what was earned in the 1st part of the study to determine your payment for the experiment.", review: true },
        { step: 6, text: "As in Part I of the study, one of the 6 answers you provide in this part will be randomly selected for payment. You will make a maximum of $5 if you are able to guess exactly (to 1 decimal place) the average contribution made by the other group in the chosen decision problem. The further your guess is from the average allocation by the other group, the less you will make. Your earnings from the randomly selected question will be determined as follows: <p>Payment = $5 - |YourAnswer – CorrectAverageofOtherGroup|^2,</p>", review: true },
        { step: 7, text: "Suppose your guess of the average contribution is $7.40 while the actual contribution is $8.20. In this case, your guess is $0.8 off from the actual average.  In this scenario, you would be paid $4.36 (= $5 – 0.8*0.8). You cannot receive a negative payment, so if your guess is too far from the truth, you will receive a minimum of $0.", review: true }
    ];
}

function getCorrectAnswers() {
    return {
        4: "q1Input3",
        5: "q2Input2"
    };
}

function showInstructions() {
    const instructionDiv = document.getElementById("instructions");
    if (state.review) {
        instructionDiv.innerHTML = `<p>${state.instructions[1].text}</p>`;
    } else {
        instructionDiv.innerHTML = `<p>${state.instructions[0].text}</p>`;
    }
}

function loadSessionData(sessionID) {
    const YOUR_SCRIPT_ID = 'AKfycbxnL6UhgEOweluxemNtHm5b8dKmuKzTFzkBgystpqJVtUYRuCepxoSZ0nJS-w4hd4L1';
    fetch(`https://script.google.com/macros/s/${YOUR_SCRIPT_ID}/exec?sessionID=${sessionID}`, { mode: "cors" })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                populateSessionData(data.data);
            } else {
                alert(sessionID + " is not a valid session ID. Please refresh the page and retry.");
            }
        })
        .catch(error => {
            alert("Error loading session data: " + error.message);
        });
}

function populateSessionData(data) {
    state.charityDict = [];
    for (let i = 1; i < 6; i++) {
        if (data[i] === "") break;
        const charity = data[i].split("###");
        state.charityDict.push({ name: charity[0], website: charity[1], description: charity[2] });
    }

    state.scenarios = [];
    let rowIdx = 6;
    for (let i = 0; i < 6; i++) {
        state.scenarios.push({
            num: i,
            orderNum: -1,
            primaryMin: data[rowIdx],
            primaryMax: data[rowIdx + 1],
            primaryVal: -1,
            secondaryVal: -1,
            primaryColor: "Gray",
            secondaryColor: "Gray",
            time: 0,
            primaryGuess: -1,
            secondaryGuess: -1,
        });
        rowIdx += 2;
    }
    shuffleScenarios(state.scenarios);
    showScenario(state.scenarios[0], 0, state.group === "b");
    state.scenarios[0].time = new Date();
    showScenarioNumbers(state.scenarios.length);
    highlightCurrentScenario(0);
}

function handleContinueClick() {
    if (state.review && !state.instructions[state.currentStep].review) return;

    if (state.part === 1 && !state.review) {
        if (state.currentStep === 1) state.startTime = new Date();
        if (state.currentStep === 6) {
            const charityRadio = document.querySelector('input[name="charityRadioGroup"]:checked');
            if (charityRadio) {
                state.recipientCharity = charityRadio.labels[0].innerText.split(':')[0];
            } else {
                alert("Please select a charity before proceeding.");
                return;
            }
            state.instructionsTime = new Date() - state.startTime;
        }
        if (state.currentStep === 0) {
            state.userName = document.getElementById("name").value;
            state.userCWID = document.getElementById("cwid").value;
            state.sessionID = document.getElementById("session-id").value;

            if (state.userName && state.userCWID && state.sessionID) {
                if (state.userCWID.length !== 8) {
                    alert("Please enter a valid CWID.");
                    return;
                }
                loadSessionData(state.sessionID);
            } else {
                alert("Please enter your name, CWID, and session ID before proceeding.");
                return;
            }
            state.id = generateCode(state.userName + state.userCWID);
            if (!validateAnswers()) {
                alert("Please answer the question correctly before proceeding.");
                return;
            }
        }
    }
    nextInstruction();
}

function handleBackClick() {
    if (state.currentStep > 0) {
        state.currentStep--;
        updateInstructionText();
    }
}

function handleViewInstructionsClick() {
    state.review = true;
    state.currentStep = 1;
    document.getElementById("instructionModal").style.display = "block";
    document.getElementById("viewInstructionsBtn").style.display = "none";
    updateInstructionText();
}

function handleNextScenarioClick() {
    if(state.part === 2){
        updateUserInputs();
        moveToNextScenario();
        return;
    }

    if (validateCurrentInput()) {
        updateUserInputs();
        moveToNextScenario();
    } else {
        alert("Please enter a valid amount within the specified range.");
    }
}

function validateAnswers() {
    //This is for instructions
    if (state.correctAnswers.hasOwnProperty(state.currentStep)) {
        const questionNumber = state.currentStep === 4 ? 1 : 2;
        const userAnswer = document.querySelector(`input[name="q${questionNumber}Input"]:checked`);
        return userAnswer && userAnswer.id === state.correctAnswers[state.currentStep];
    }
    return true;
}

function nextInstruction() {
    state.currentStep++;
    if (state.currentStep >= state.instructions.length || (state.currentStep > 2 && state.review)) {
        document.getElementById("instructionModal").style.display = "none";
        document.getElementById("viewInstructionsBtn").style.display = "block";
        state.currentStep = 0;
    }
    updateInstructionText();
}

function updateInstructionText() {
    const instructionDiv = document.getElementById("instructions");
    if (state.review) {
        if (state.instructions[state.currentStep] && state.instructions[state.currentStep].review) {
            instructionDiv.innerHTML = `<p>${state.instructions[state.currentStep].text}</p>`;
        }
    } else {
        if (state.part === 1 && state.currentStep === 6) {
            instructionDiv.innerHTML = generateCharities();
        } else if (state.instructions[state.currentStep]) {
            instructionDiv.innerHTML = `<p>${state.instructions[state.currentStep].text}</p>`;
        }
    }
}

function showScenarioNumbers(totalScenarios) {
    const scenarioNumbersDiv = document.getElementById("scenarioNumbers");
    for (let i = 0; i < totalScenarios; i++) {
        const box = document.createElement("div");
        box.className = "scenario-box";
        box.innerText = i + 1;
        scenarioNumbersDiv.appendChild(box);
    }
}

function highlightCurrentScenario(index) {
    const scenarioBoxes = document.getElementsByClassName("scenario-box");
    if (index > 0) {
        scenarioBoxes[index - 1].classList.remove("current-scenario");
    }
    scenarioBoxes[index].classList.add("current-scenario");
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - Math.ceil(min)) + Math.ceil(min));
}

function randomlyHighlightScenario(callback) {
    const scenarioBoxes = document.getElementsByClassName("scenario-box");
    const highlightDuration = 3000;
    const intervalDuration = 200;
    let elapsedTime = 0;
    let currentIndex = getRandomInt(0, scenarioBoxes.length);

    const intervalId = setInterval(() => {
        scenarioBoxes[currentIndex].classList.remove("random-highlight");
        currentIndex = getRandomInt(0, scenarioBoxes.length);
        scenarioBoxes[currentIndex].classList.add("random-highlight");
        elapsedTime += intervalDuration;

        if (elapsedTime >= highlightDuration) {
            clearInterval(intervalId);
            scenarioBoxes[currentIndex].classList.add("final-highlight");
            state.selectedScenarioNum = currentIndex;
            callback(currentIndex);
        }
    }, intervalDuration);
}

function moveToNextScenario() {
    if (state.scenarioNum < state.scenarios.length - 1) {
        state.scenarioNum++;
        highlightCurrentScenario(state.scenarioNum);
        showScenario(state.scenarios[state.scenarioNum], state.scenarioNum, state.group === "b");
        if(state.part === 1){
        state.scenarios[state.scenarioNum - 1].time = new Date() - state.scenarios[state.scenarioNum - 1].time;
        state.scenarios[state.scenarioNum].time = new Date();
        }
        window.scrollTo(0, 0);
    } else {
        state.scenarios[state.scenarioNum].time = new Date() - state.scenarios[state.scenarioNum].time;
        alert("Now randomly selecting a scenario.");
        window.scrollTo(0, 0);
        document.getElementById("nextScenarioBtn").style.display = "none";
        handleSubmission();
    }
}

function showScenario(scenario, index, stateContingent) {
    const scenarioDiv = document.getElementById("scenario");
    const inputDiv = document.getElementById("user-input");

    if (scenario.primaryMin === 10 || (scenario.primaryMin === 0 && scenario.primaryMax !== 10)) {
        //certain scenarios
        if (state.part === 1){
            document.getElementById("scenarioChart").style.display = "none";
            scenarioDiv.innerHTML = `<h2>Scenario ${state.scenarioNum + 1}</h2><p>This scenario has a fixed outcome with no random elements.</p>`;
            const donationAmount = scenario.primaryMin === 10 ? 20 : 60;
            inputDiv.innerHTML = `<p>You have been given $${donationAmount}. You can split this sum between you and your chosen charity. If you decide to give $X to your chosen charity, then you will take $${donationAmount}-$X home. You cannot donate more than $${donationAmount}</p><p>How much would you like to pledge to share with your chosen charity?</p><input type="number" class="form-control" placeholder="Enter your donation" value="${scenario.primaryVal === -1 ? "" : scenario.primaryVal}" id="input${state.scenarioNum}">`;    
        }
        else{
        document.getElementById("scenarioChart").style.display = "none";
        scenarioDiv.innerHTML = `<h2>Scenario ${state.scenarioNum + 1}</h2><p>This scenario has a fixed outcome with no random elements.</p>`;
        const donationAmount = scenario.primaryMin === 10 ? 20 : 60;
        inputDiv.innerHTML = `<p>In this scenario, you have been given $${donationAmount}. What do you think is the average contribution of the other group who faced this question?</p><input type="number" class="form-control" placeholder="Enter your donation" value="" id="part2PrimaryInput${state.scenarioNum}">`;
        }
    } else {
        document.getElementById("scenarioChart").style.display = "block";
        setupChart(scenario, "scenarioChart");
        let scenarioDescription = state.part === 2 ? generatePart2Description(scenario) : (stateContingent ? generateStateContingentDescription(scenario) : generateNonStateContingentDescription(scenario));
        scenarioDiv.innerHTML = `<h2>Scenario ${state.scenarioNum + 1}</h2><p>${scenarioDescription}</p>`;
        //inputDiv.innerHTML = stateContingent ? generateStateInputs() : generateNonStateInputs();
        inputDiv.innerHTML = state.part === 2 ? generatePart2Inputs() : (stateContingent ? generateStateInputs() : generateNonStateInputs());

    }
}

function generateNonStateContingentDescription(scenario) {
    const primaryColor = state.scenarios[state.scenarioNum].primaryColor;
    const secondaryColor = state.scenarios[state.scenarioNum].secondaryColor;
    return `The money you receive will be determined by a spin of a wheel. The wheel consists of ten sections of equal size that are either ${primaryColor} or ${secondaryColor}. The number of ${primaryColor} sections is between ${state.scenarios[state.scenarioNum].primaryMin} and ${state.scenarios[state.scenarioNum].primaryMax}. The rest are ${secondaryColor}. Randomly landing on ${primaryColor} yields $20, and randomly landing on ${secondaryColor} yields $60. You will first make the decision on how much you will give, and then the computer will randomly spin the wheel.`;
}

function generateStateContingentDescription(scenario) {
    return `The money you receive will be determined by a spin of a wheel. The wheel consists of ten sections of equal size that are either ${state.scenarios[state.scenarioNum].primaryColor} or ${state.scenarios[state.scenarioNum].secondaryColor}. The number of ${state.scenarios[state.scenarioNum].primaryColor} sections is between ${state.scenarios[state.scenarioNum].primaryMin} and ${state.scenarios[state.scenarioNum].primaryMax}. The rest are ${state.scenarios[state.scenarioNum].secondaryColor}. Randomly landing on ${state.scenarios[state.scenarioNum].primaryColor} yields $20, and randomly landing on ${state.scenarios[state.scenarioNum].secondaryColor} yields $60. You will first make the decision on how much you will give, and then the computer will randomly spin the wheel.`;
}

function generatePart2Description(scenario) {
    return `This wheel consists of ten sections of equal size that are either ${state.scenarios[state.scenarioNum].primaryColor} or ${state.scenarios[state.scenarioNum].secondaryColor}. The number of ${state.scenarios[state.scenarioNum].primaryColor} sections is between ${state.scenarios[state.scenarioNum].primaryMin} and ${state.scenarios[state.scenarioNum].primaryMax}. The rest are ${state.scenarios[state.scenarioNum].secondaryColor}. Randomly landing on ${state.scenarios[state.scenarioNum].primaryColor} yields $20, and randomly landing on ${state.scenarios[state.scenarioNum].secondaryColor} yields $60. What do you think is the average contribution of the other group who faced this question?`;
}

function generateStateInputs() {
    return `<p>Select donation amounts based on color outcomes...</p><input type="number" class="form-control" placeholder="Amount if ${state.scenarios[state.scenarioNum].primaryColor} (up to $20)" value="${state.scenarios[state.scenarioNum].primaryVal === -1 ? "" : state.scenarios[state.scenarioNum].primaryVal}" id="primaryInput${state.scenarioNum}"><input type="number" class="form-control" placeholder="Amount if ${state.scenarios[state.scenarioNum].secondaryColor} (up to $60)" value="${state.scenarios[state.scenarioNum].secondaryVal === -1 ? "" : state.scenarios[state.scenarioNum].secondaryVal}" id="secondaryInput${state.scenarioNum}">`;
}

function generateNonStateInputs() {
    return `<p>Enter donation amount (up to $20)</p><input type="number" class="form-control" placeholder="Enter donation amount" value="${state.scenarios[state.scenarioNum].primaryVal === -1 ? "" : state.scenarios[state.scenarioNum].primaryVal}" id="input${state.scenarioNum}">`;
}

function generatePart2Inputs() {
    return `<p>Enter the average donation amount for each color outcome...</p><input type="number" class="form-control" placeholder="Amount if ${state.scenarios[state.scenarioNum].primaryColor} (up to $20)" value="" id="part2PrimaryInput${state.scenarioNum}"><input type="number" class="form-control" placeholder="Amount if ${state.scenarios[state.scenarioNum].secondaryColor} (up to $60)" value="" id="part2SecondaryInput${state.scenarioNum}">`;
}

function updateUserInputs() {
    if (state.part === 2){
        state.scenarios[state.scenarioNum].part2PrimaryInput = document.getElementById(`part2PrimaryInput${state.scenarioNum}`).value;
        //if this field doesnt exist: document.getElementById(`part2SecondaryInput${state.scenarioNum}`).value
        if(state.scenarios[state.scenarioNum].part2SecondaryInput === undefined){
            state.scenarios[state.scenarioNum].secondaryVal = -1;
        }
        else{
            state.scenarios[state.scenarioNum].part2SecondaryInput = document.getElementById(`part2SecondaryInput${state.scenarioNum}`).value;
        }
    }
    else if (state.group === "a" || state.scenarios[state.scenarioNum].primaryMin === 10 || (state.scenarios[state.scenarioNum].primaryMin === 0 && state.scenarios[state.scenarioNum].primaryMax === 0)) {
        state.scenarios[state.scenarioNum].primaryVal = document.getElementById(`input${state.scenarioNum}`).value;
        state.scenarios[state.scenarioNum].secondaryVal = document.getElementById(`input${state.scenarioNum}`).value;
    } else {
        state.scenarios[state.scenarioNum].primaryVal = document.getElementById(`primaryInput${state.scenarioNum}`).value;
        state.scenarios[state.scenarioNum].secondaryVal = document.getElementById(`secondaryInput${state.scenarioNum}`).value;
    }
    console.log(`Scenario ${state.scenarioNum} updated with primaryVal: ${state.scenarios[state.scenarioNum].primaryVal} and secondaryVal: ${state.scenarios[state.scenarioNum].secondaryVal}`);
}

function validateCurrentInput() {
    const scenario = state.scenarios[state.scenarioNum];
    const primaryInput = "";
    const secondaryInput = "";
    if (state.group === "a"){
        //one input
        const input = document.getElementById(`input${state.scenarioNum}`).value;
        if (scenario.primaryMin === 10){
            return (input >= 0 && input <= 60);
        }
        return (input >= 0 && input <= 20);
    }
    else if(state.group === "b"){
        //two inputs
        primaryInput = document.getElementById(`primaryInput${state.scenarioNum}`).value;
        secondaryInput = document.getElementById(`secondaryInput${state.scenarioNum}`).value; 
        return (primaryInput >= 0 && primaryInput <= 60) && (secondaryInput >= 0 && secondaryInput <= 20);
    }
}

function setupChart(scenario, chartId) {
    const ctx = document.getElementById(chartId).getContext('2d');
    if (!ctx) return console.error("Chart canvas not found!");

    const dataCounts = generateChartData(scenario);
    if (state.mainChart) state.mainChart.destroy();

    state.mainChart = new Chart(ctx, {
        type: 'pie',
        data: { labels: dataCounts.labels, datasets: [{ data: dataCounts.values, backgroundColor: dataCounts.colors, borderWidth: 1 }] },
        options: { animation: { duration: 0 }, tooltips: { enabled: false }, legend: { display: false }, responsive: false, maintainAspectRatio: true }
    });

    state.originalBackgroundColors = state.mainChart.data.datasets[0].backgroundColor.slice();
}

function generateChartData(scenario) {
    const primaryCount = scenario.primaryMin;
    const secondaryCount = 10 - scenario.primaryMax;
    const unknownCount = 10 - primaryCount - secondaryCount;
    const primaryCSS = colorDict.find(color => color.color === scenario.primaryColor).cssColor;
    const secondaryCSS = colorDict.find(color => color.color === scenario.secondaryColor).cssColor;

    const xValues = [...Array(primaryCount).fill(scenario.primaryColor), ...Array(secondaryCount).fill(scenario.secondaryColor), ...Array(unknownCount).fill("Unknown")];
    const yValues = Array(10).fill(1);
    const barColors = [...Array(primaryCount).fill(primaryCSS), ...Array(secondaryCount).fill(secondaryCSS), ...Array(unknownCount).fill("gray")];

    return { labels: xValues, values: yValues, colors: barColors };
}

function lightenColor(color) {
    return color === "gray" ? "lightgray" : colorDict.find(col => col.cssColor === color).lightenColor;
}

function spinChart(callback) {
    console.log("Spinning chart...");
    const totalSlices = 10;
    let previousSlice = -1;
    const spinDuration = 3000;
    const flashDuration = 100;
    let elapsedTime = 0;

    const intervalId = setInterval(() => {
        if (previousSlice >= 0) {
            console.log(`Setting background color of slice ${previousSlice} to original`);
            state.mainChart.data.datasets[0].backgroundColor[previousSlice] = state.originalBackgroundColors[previousSlice];
        }

        let currentSlice;
        do {
            currentSlice = Math.floor(Math.random() * totalSlices);
        } while (currentSlice === previousSlice);

        const lightenedColor = lightenColor(state.mainChart.data.datasets[0].backgroundColor[currentSlice]);
        console.log(`Setting background color of slice ${currentSlice} to ${lightenedColor}`);
        state.mainChart.data.datasets[0].backgroundColor[currentSlice] = lightenedColor;

        state.mainChart.update();
        previousSlice = currentSlice;
        elapsedTime += flashDuration;

        if (elapsedTime >= spinDuration) {
            console.log("Spin completed. Determining outcome...");
            clearInterval(intervalId);
            const outcome = state.mainChart.data.labels[currentSlice];
            const certainty = outcome === "Unknown" ? state.originalBackgroundColors[currentSlice] : "uncertain";
            console.log(`Outcome determined: ${outcome} with certainty ${certainty}`);
            callback(outcome, certainty);
        }
    }, flashDuration);
}

function displayResult(color, certainty) {
    document.getElementById("spinBtn").style.display = "none";
    if (color !== "primary" && color !== "secondary") color = Math.random() < 0.5 ? "primary" : "secondary";
    state.amountReceived = color === "primary" ? 60 : 20;
    state.originalGift = state.scenarios.find(scenario => scenario.num === state.selectedScenarioNum)[color === "primary" ? "primaryVal" : "secondaryVal"];

    const scenarioDescription = document.getElementById("scenarioDescription");
    if (certainty === 'certain') {
        scenarioDescription.innerHTML += `Here is how much you decided to give: $${state.originalGift}<br>`;
        if (state.group === "b") {
            document.getElementById("decisionInput").innerHTML = `<p>We would like to give you an opportunity to change your decision and allocate more or less to your selected cause.  Would you like to change your allocation decision? If yes, how much would you like to give to charity out of the sum that you have received?</p><input type="number" id="newDonationAmount" value="${state.originalGift}" />`;
        }
    } else if (state.group === "b") {
        const newspincolor = state.originalBackgroundColors[state.selectedScenarioNum];
        scenarioDescription.innerHTML += `Wheel landed on: ${newspincolor.toUpperCase()}<br>Here is what you receive from the spin: $${state.amountReceived}<br>Here is how much you decided to give: $${state.originalGift}<br>`;
        document.getElementById("decisionInput").innerHTML = `<p>We would like to give you an opportunity to change your decision and allocate more or less to your selected cause.  Would you like to change your allocation decision? If yes, how much would you like to give to charity out of the sum that you have received?</p><input type="number" id="newDonationAmount" value="" />`;
    } else {
        const newspincolor = state.originalBackgroundColors[state.selectedScenarioNum];
        scenarioDescription.innerHTML += `Wheel landed on: ${newspincolor.toUpperCase()}<br>Here is what you receive from the spin: $${state.amountReceived}<br>Here is how much you decided to give: $${state.originalGift}`;
    }

    document.getElementById("confirmChange").addEventListener("click", () => {
        if (state.group === "b") updateDonation(color);
        if (state.group === "a") part2();
        else finalSubmit();
    });
}

function updateDonation(color) {
    state.newAmount = document.getElementById("newDonationAmount").value;
    const scenario = state.scenarios.find(scenario => scenario.num === state.selectedScenarioNum);
    if (color === "primary") {
        if (scenario.primaryVal !== state.newAmount) {
            state.edited = true;
            scenario.primaryVal = state.newAmount;
        }
        state.amountPaid = state.amountReceived - state.newAmount;
    } else if (color === "secondary") {
        if (scenario.secondaryVal !== state.newAmount) {
            state.edited = true;
            scenario.secondaryVal = state.newAmount;
        }
        state.amountPaid = state.amountReceived - state.newAmount;
    }
}

function revealColors(scenario) {
    const primaryCSS = colorDict.find(color => color.color === scenario.primaryColor).cssColor;
    const secondaryCSS = colorDict.find(color => color.color === scenario.secondaryColor).cssColor;
    setTimeout(() => {
        state.mainChart.data.datasets[0].backgroundColor = state.mainChart.data.datasets[0].backgroundColor.map(color => color === 'gray' ? (Math.random() < 0.5 ? primaryCSS : secondaryCSS) : color);
        state.mainChart.update();
    }, 3000);
}

function displayOutcome(scenario) {
    if(state.part==1) {
        const scenarioDescription = document.getElementById("scenarioDescription");
        if (scenario.primaryMin === 10) {
            scenarioDescription.innerHTML = `Round # Selected: Scenario ${scenario.orderNum + 1}. This was a fixed scenario in which you receive $20.<br>`;
            displayResult("primary", 'certain');
        } else if (scenario.primaryMin === 0 && scenario.primaryMax !== 10) {
            scenarioDescription.innerHTML = `Round # Selected: Scenario ${scenario.orderNum + 1}. This was a fixed scenario in which you receive $60.<br>`;
            displayResult("secondary", 'certain');
        } else {
            setupChart(scenario, "mainChart");
            scenarioDescription.innerHTML = `Round # Selected: Scenario ${scenario.orderNum + 1}. <br> Below is the distribution you were originally shown. <br> Remember, a ${scenario.primaryColor} results in $60, and a ${scenario.secondaryColor} results in in $20. <br> In 3 seconds, the colors of the unknown slices will be revealed. <br>`;
            document.getElementById("spinBtn").addEventListener("click", () => spinChart(displayResult));
            revealColors(scenario);
        }
        document.querySelector("#submitModal .modal-title").textContent = "Scenario Outcome";
    }
    else if(state.part==2) {
        const scenarioDescription = document.getElementById("scenarioDescription");
        if (scenario.primaryMin === 10) {
            scenarioDescription.innerHTML = `Round # Selected: Scenario ${scenario.orderNum + 1}. This was a fixed scenario in which one receives $20.<br>`;
            displayResult("primary", 'certain');
        } else if (scenario.primaryMin === 0 && scenario.primaryMax !== 10) {
            scenarioDescription.innerHTML = `Round # Selected: Scenario ${scenario.orderNum + 1}. This was a fixed scenario in which one receives $60.<br>`;
            displayResult("secondary", 'certain');
        } else {
            setupChart(scenario, "mainChart");
            scenarioDescription.innerHTML = `Round # Selected: Scenario ${scenario.orderNum + 1}. <br> Below is the distribution you were originally shown. <br> Remember, a ${scenario.primaryColor} results in $60, and a ${scenario.secondaryColor} results in in $20. <br> This will be the scenario of which your guesses will be compared to the actual average donations.`;
        }
        document.getElementById("confirmChange").addEventListener("click", () => {
             finalSubmit();
        });
        document.querySelector("#submitModal .modal-title").textContent = "Scenario Outcome";
    }
}

function handleSubmission() {
    const scenarioBoxes = document.getElementsByClassName("scenario-box");
    scenarioBoxes[scenarioBoxes.length - 1].classList.remove("current-scenario");
    randomlyHighlightScenario((finalIndex) => {
        setTimeout(() => displayOutcome(state.scenarios[finalIndex]), 1000);
        document.getElementById("submitModal").style.display = "block";
    });
}

function part2() {
    document.getElementById("nextScenarioBtn").style.display = "block";
    document.getElementById("scenario").innerHTML = "";
    document.getElementById("scenarioNumbers").innerHTML = "<br><br><br><br><br>";
    state.group = "b";
    state.scenarioNum = 0;
    state.review = false;
    state.part = 2;
    state.instructions = getPart2Instructions();
    document.getElementById("submitModal").style.display = "none";
    showScenarioNumbers(state.scenarios.length);
    showScenario(state.scenarios[0], 0, false);
    highlightCurrentScenario(0);
    document.getElementById("instructionModal").style.display = "block";
    state.currentStep = 0;
    showInstructions();
    document.getElementById("viewInstructionsBtn").style.display = "none";
}

function finalSubmit() {
    const formData = new FormData();
    formData.append("Subject ID", state.id);
    formData.append("sessionID", state.sessionID);
    formData.append("ComprehensionQ1", state.comprehensionCheck1);
    formData.append("ComprehensionQ2", state.comprehensionCheck2);
    formData.append("RecipientCharity", state.recipientCharity);
    formData.append("InstructionsTime", state.instructionsTime);
    formData.append("Treatment", state.group);
    formData.append("Scenario0Order", state.scenarioOrder[0]);
    formData.append("Scenario1Order", state.scenarioOrder[1]);
    formData.append("Scenario2Order", state.scenarioOrder[2]);
    formData.append("Scenario3Order", state.scenarioOrder[3]);
    formData.append("Scenario4Order", state.scenarioOrder[4]);
    formData.append("Scenario5Order", state.scenarioOrder[5]);
    state.scenarios.forEach((scenario, index) => {
        formData.append(`Scenario${index}Primary`, scenario.primaryVal);
        formData.append(`Scenario${index}Secondary`, scenario.secondaryVal);
        formData.append(`Scenario${index}Time`, scenario.time);
        formData.append(`Scenario${index}GuessPrimary`, scenario.primaryGuess);
        formData.append(`Scenario${index}GuessSecondary`, scenario.secondaryGuess);
    });
    formData.append("ScenarioSelected", state.selectedScenarioNum);
    formData.append("AmountReceived", state.amountReceived);
    formData.append("OriginalGift", state.originalGift);
    formData.append("Revise", state.edited);
    formData.append("NewAnswer", state.newAmount);
    formData.append("AmountPaid", state.amountPaid);

    formData.append("Part2PrimaryInput0", state.scenarios[0].part2PrimaryInput);
    formData.append("Part2SecondaryInput0", state.scenarios[0].part2SecondaryInput);
    formData.append("Part2PrimaryInput1", state.scenarios[1].part2PrimaryInput);
    formData.append("Part2SecondaryInput1", state.scenarios[1].part2SecondaryInput);
    formData.append("Part2PrimaryInput2", state.scenarios[2].part2PrimaryInput);
    formData.append("Part2SecondaryInput2", state.scenarios[2].part2SecondaryInput);
    formData.append("Part2PrimaryInput3", state.scenarios[3].part2PrimaryInput);
    formData.append("Part2SecondaryInput3", state.scenarios[3].part2SecondaryInput);
    formData.append("Part2PrimaryInput4", state.scenarios[4].part2PrimaryInput);
    formData.append("Part2SecondaryInput4", state.scenarios[4].part2SecondaryInput);
    formData.append("Part2PrimaryInput5", state.scenarios[5].part2PrimaryInput);
    formData.append("Part2SecondaryInput5", state.scenarios[5].part2SecondaryInput);

    fetch("https://script.google.com/macros/s/AKfycbwoYdgHjvr7skUP99BCfzKkvQhJmDucljjvg3NNsAawf0Npm_jC3EISlyTFMxVTll_Y/exec", {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(formData),
    })
    .then(response => response.text())
    .then(data => {
        alert(`Thank you for completing the study! Please show this screen to the experiment administrator in order to receive your payout of $${state.amountPaid}.`);
        window.location.reload();
    })
    .catch(error => console.error("Error:", error));
}
 