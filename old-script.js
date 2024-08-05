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


document.addEventListener("DOMContentLoaded", function () {
    // Variables and initialization
    const instructionModal = document.getElementById("instructionModal");
    const viewInstructionsBtn = document.getElementById("viewInstructionsBtn");
    const instructionDiv = document.getElementById("instructions");
    let scenarios = [];
    let charityDict = [];
    let instructions = getInstructions();
    const correctAnswers = getCorrectAnswers();
    
    let currentStep = 0;
    //EDIT: for testing purposes
    // let group = Math.random() < 0.5 ? "a" : "b";
    //group a is non-state, group b is state
    //state (b) should see edit option
    //non state (a) should see part 2
    let group = "a";
    let mainChart;
    let originalBackgroundColors = [];
    
    let startTime = 0;
    let instructionsTime = 0;

    let comprehensionCheck1 = 1;
    let comprehensionCheck2 = 1;
    let recipientCharity = "unknown";
    let scenarioNum = 0;
    let edited = false;
    let amountReceived = -1;
    let originalGift = -1;
    let newAmount = -1;
    let amountPaid = -1;
    let selectedScenarioNum = -1;
    let review = false;
    let userName = "";
    let userCWID = "";
    let sessionID = "";
    let id = "";
    let part =1;

    let scenario0Order = -1;
    let scenario1Order = -1;
    let scenario2Order = -1;
    let scenario3Order = -1;
    let scenario4Order = -1;
    let scenario5Order = -1;

    // Functions

    // Event listeners
    document.getElementById("continue").addEventListener("click", handleContinueClick);
    document.getElementById("back").addEventListener("click", handleBackClick);
    viewInstructionsBtn.addEventListener("click", handleViewInstructionsClick);
    document.getElementById("nextScenarioBtn").addEventListener("click", handleNextScenarioClick);

    // Initial setup
    showInstructions();

    function randomizeColors() {
        var colors = [];
        for (var i=0; i<colorDict.length; i++) {
            if (colorDict[i].color == "Gray") continue;
            colors.push(colorDict[i].color);
        }
        for (var i = colors.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = colors[i];
            colors[i] = colors[j];
            colors[j] = temp;
        }
        return colors;
    }

    function shuffleScenarios(scenarios) {
        nums = [0, 1, 2, 3, 4, 5];
        for (let i = scenarios.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [scenarios[i], scenarios[j]] = [scenarios[j], scenarios[i]];
        }
        
        scenario0Order = scenarios.findIndex((scenario) => scenario.num == 0);
        scenarios.find((scenario) => scenario.num == 0).orderNum = scenario0Order;
        scenario1Order = scenarios.findIndex((scenario) => scenario.num == 1);
        scenarios.find((scenario) => scenario.num == 1).orderNum = scenario1Order;
        scenario2Order = scenarios.findIndex((scenario) => scenario.num == 2);
        scenarios.find((scenario) => scenario.num == 2).orderNum = scenario2Order;
        scenario3Order = scenarios.findIndex((scenario) => scenario.num == 3);
        scenarios.find((scenario) => scenario.num == 3).orderNum = scenario3Order;
        scenario4Order = scenarios.findIndex((scenario) => scenario.num == 4);
        scenarios.find((scenario) => scenario.num == 4).orderNum = scenario4Order;
        scenario5Order = scenarios.findIndex((scenario) => scenario.num == 5);
        scenarios.find((scenario) => scenario.num == 5).orderNum = scenario5Order; 
        
        var colors = randomizeColors();
        
        let j=0;
        for (let i = 0; i < scenarios.length; i++) {
            if(scenarios[i].primaryMin == 10){
                continue;
            }
            else{
                scenarios[i].primaryColor = colors[j];
                scenarios[i].secondaryColor = colors[j+1];
                j+=2;
            }
        }
        console.log(`Scenarios: ${scenarios}`);
    }

    function generateCode(input) {
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            const char = input.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString(16); // Convert to hexadecimal
    }

    function generateCharities() {
        console.log(`Charity dict: ${charityDict}`);
        htmlText = "Choose a recipient for all your donations from the following list of charities: ";
        for (let i = 0; i < charityDict.length; i++) {
            htmlText += `<div class='form-check'><input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio${i + 1}'><label class='form-check-label' for='charityRadio${i + 1}'><b>${charityDict[i].name}</b>: <a href = '${charityDict[i].website}' target='_blank'>Website</a> ${charityDict[i].description}</label></div>`;
        }
        //get element by id and set innerHTML to htmlText

        return htmlText;
    }
    function getInstructions() {
        return [
        {
          step: 0,
          text: `Thank you for participating in this research study. The entire study will be completed on the computer in one sitting. First please enter your name, CWID, and Session ID. <form id="loginForm">
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
            </div>`,
            review: false,
        },
        {
          step: 1,
          text: "Thank you for participating in this research study. The entire study will be completed on the computer in one sitting. The study consists of two parts.",
          review: true,
        },
        {
            step: 2,
            text: "In this part, you will answer a series of questions. In each round, you will be asked to make a contribution to a charity of your choosing. The contribution will be deducted from a sum of money you receive for that round. You can split the sum of money between yourself and the charity however you want. You can even give all of it or keep all of it.",
            review: true,
        },
        {
          step: 3,
          text: "The timeline of this study will be the following: <ol><li>First you will be given the opportunity to select a charity from a list of potential causes. The selected charity will be the recipient of your donation decision in all subsequent rounds. <u>Remember: all the donation decisions you make will be directed to the charity you choose.</u> </li><li>You will then answer a series of six distinct and independent decisions with real financial stakes. In each decision, it will be explained how the sum of money that you can allocate between yourself and the selected charity will be determined by a random spin of a wheel. The wheels used in each decision are unique and unrelated to those used in each and every other decision round. Your choice in each round is to determine how you would like to split the sum of money between yourself and the selected charity.</li><li>Once you have made an allocation in each of the rounds, the computer will select one of the six decision rounds at random. Your choice in the selected decision round will determine your earnings and the amount that will be given to the selected charity.</li></ol>",
          review: true,
        },
        {
          step: 4,
          text: "Before we begin this study, we would like to check your understanding. </p><p> Q1: How many different allocation decisions will you make?  <div class='form-check'><input class='form-check-input' type='radio' name='q1Input' id='q1Input1'><label class='form-check-label' for='q1Input1'>4</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q1Input' id='q1Input2'><label class='form-check-label' for='q1Input2'>5</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q1Input' id='q1Input3'><label class='form-check-label' for='q1Input3'>6</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q1Input' id='q1Input4'><label class='form-check-label' for='q1Input4'>7</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q1Input' id='q1Input5'><label class='form-check-label' for='q1Input5'>8</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q1Input' id='q1Input6'><label class='form-check-label' for='q1Input6'>9</label></div></p>",
          review: false,
        },
        {
          step: 5,
          text: "Before we begin this study, we would like to check your understanding. <p>Q2: Recall that your decisions will determine your payment. How is your payment determined? <div class='form-check'><input class='form-check-input' type='radio' name='q2Input' id='q2Input1'><label class='form-check-label' for='q2Input1'>Every decision in the six parts will get paid. Thus, I can strategize across decisions and hedge my bets.</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q2Input' id='q2Input2'><label class='form-check-label' for='q2Input2'>The computer will randomly select one of the decisions in the six parts, and my payment will depend on my answer to this question. Thus, there is no point for me to strategize across these decisions.</label></div></p>",
          review: false,
        },
        {
          step: 6,
          text: "Loading charities...",
        review: false,
        }
        ];}

    function getPart2Instructions() {
        return [
          {
            step: 1,
            text: "Thank you for completing the 1st part of this study. We will now proceed to the 2nd part, where you will encounter a similar set of scenarios and be provided with the same information. However, the question and underlying decision task that you see will be different from that in Part I of the study. ",
            review: true,
        },
          {
            step: 2,
            text: "Half of the respondents completing this study answered the same question as you did: they were asked to pledge an amount to give to charity without specifying how much they would give depending on the result of the spinner. The other half of respondents were asked to make their pledge with the same information but were able to provide two different answers for how much they would give by conditioning the allocation decision on the color that the spinner landed on.",
            review: true,
        },
          {
            step: 3,
            text: "You will see the same 6 scenarios but be asked to fill in the average amount that you think the people in the other group, who were allowed to condition their decision on the color that the spinner landed on, said. You are to assume that everyone in the other group chose the same charity as you when answering what you think they did.",
            review: true,
        },
          {
            step: 4,
            text: `For example, you will see a spinner that you have seen before. Instead of answering that you would give $X to ${recipientCharity} without being able to condition the allocation decision on what the spinner lands on, you will answer how much the average person would answer to ${recipientCharity} if the spinner lands on $60 and how much the average person would give to ${recipientCharity} if the spinner lands on $20.`,
            review: true,
        },
          {
            step: 5,
            text:"You will be paid for this part of the study. The amount earned in Part II will be added to what was earned in the 1st part of the study to determine your payment for the experiment. ",
            review: true,
        },
          {
            step: 6,
            text: "As in Part I of the study, one of the 6 answers you provide in this part will be randomly selected for payment. You will make a maximum of $5 if you are able to guess exactly (to 1 decimal place) the average contribution made by the other group in the chosen decision problem. The further your guess is from the average allocation by the other group, the less you will make. Your earnings from the randomly selected question will be determined as follows: <p>Payment = $5 - |YourAnswer – CorrectAverageofOtherGroup|^2,</p>"
            ,review: true,
        },
        {
          step: 7,
          text: "Suppose your guess of the average contribution is $7.40 while the actual contribution is $8.20. In this case, your guess is $0.8 off from the actual average.  In this scenario, you would be paid $4.36 (= $5 – 0.8*0.8). You cannot receive a negative payment, so if your guess is too far from the truth, you will receive a minimum of $0."
        ,review: true,
        }

        ];
    }
    function getCorrectAnswers() {
        return {
            4: "q1Input3",
            5: "q2Input2"
        };
    }

    function showInstructions() {
        if(review){
            instructionDiv.innerHTML = `<p>${instructions[1].text}</p>`;
        }
        else {
            instructionDiv.innerHTML = `<p>${instructions[0].text}</p>`;
        }
    }

    function loadSessionData(sessionID) {
        let YOUR_SCRIPT_ID = 'AKfycbxnL6UhgEOweluxemNtHm5b8dKmuKzTFzkBgystpqJVtUYRuCepxoSZ0nJS-w4hd4L1';
        fetch(
            `https://script.google.com/macros/s/${YOUR_SCRIPT_ID}/exec?sessionID=${sessionID}`,
            {
              mode: "cors",
            }
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.status === "success") {
                populateSessionData(data.data);
              } else {
                alert(sessionID + " is not a valid session ID.");
              }
            })
            .catch((error) => {
              alert("Error loading session data: " + error.message);
            });
    }
    function populateSessionData(data) {
        charityDict = [];
            for (let i = 1; i < 6; i++) {
              if (data[i] == "") break;
              charity = data[i].split("###");
              console.log(charity);
              charityDict.push({
                name: charity[0],
                website: charity[1],
                description: charity[2],
              });
              console.log(charityDict);
            }
        
            scenarios = [];
            let rowIdx = 6;
            for (let i = 0; i < 6; i++) {
              scenarios.push({
                num: i,
                orderNum: -1,
                primaryMin: data[rowIdx],
                primaryMax: data[rowIdx+ 1],
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
            shuffleScenarios(scenarios);
            if (group === "a") {
                showScenario(scenarios[0], 0, false);
                scenarios[0].time = new Date();
            } else {
                showScenario(scenarios[0], 0, true);
                scenarios[0].time = new Date();
            }
            showScenarioNumbers(scenarios.length);
            highlightCurrentScenario(0);
    }

    function handleContinueClick() {
        if (review){
            if (instructions[currentStep].review == false){
                return;
            }
        }
        if(part==1){
            if (!review){
                if (currentStep ==1){
                    startTime = new Date();
                    console.log(`Start time: ${startTime}`);
                }
            }
            if (currentStep == 6) {
                const charityRadio = document.querySelector('input[name="charityRadioGroup"]:checked');
                if (charityRadio) {
                    recipientCharity = charityRadio.labels[0].innerText;
                    //only keep up to before ':'
                    recipientCharity = recipientCharity.substring(0, recipientCharity.indexOf(':'));
                } else {
                    alert("Please select a charity before proceeding.");
                    return;
                }
                instructionsTime = new Date() - startTime;
    
                console.log(`Instructions time: ${instructionsTime}`);
            }
            if (currentStep == 0) {
                userName = document.getElementById("name").value;
                userCWID = document.getElementById("cwid").value;
                sessionID = document.getElementById("session-id").value;
    
                if (userName && userCWID && sessionID) {
                    if (userCWID.length != 8) {
                        alert("Please enter a valid CWID.");
                        return;
                    }
                    //check session ID from admin spreadsheet
                    loadSessionData(sessionID);
    
                } else {
                    alert("Please enter your name, CWID, and session ID before proceeding.");
                    return;
                }
                id = generateCode(userName, userCWID);
                if (validateAnswers()) {
                    nextInstruction();
                } else {
                    if (currentStep == 4) {
                        comprehensionCheck1 = 0;
                    } else {
                        comprehensionCheck2 = 0;
                    }
                    alert("Please answer the question correctly before proceeding.");
                }
            }}
                nextInstruction();
    }

    function handleBackClick() {
        if (currentStep > 0) {
            currentStep--;
            updateInstructionText();
        }
    }

    function handleViewInstructionsClick() {
        review = true;
        currentStep = 1;
        instructionModal.style.display = "block";
        viewInstructionsBtn.style.display = "none";
        updateInstructionText();
    }

    function handleNextScenarioClick() {
        if (validateCurrentInput()) {
            updateUserInputs();
            moveToNextScenario();
        } else {
            alert("Please enter a valid amount within the specified range.");
        }
    }

    function validateAnswers() {
        if (correctAnswers.hasOwnProperty(currentStep)) {
            if (currentStep == 4) {
                q=1;
            }
            else{
                q=2;
            }
            const userAnswer = document.querySelector(`input[name="q${q}Input"]:checked`);
            return userAnswer && userAnswer.id === correctAnswers[currentStep];
        }
        return true;
    }

    function nextInstruction() {
        currentStep++;
        if (currentStep >= instructions.length || (currentStep > 2 && review)) {
            instructionModal.style.display = "none";
            viewInstructionsBtn.style.display = "block";
            currentStep = 0;
        }
        updateInstructionText();
    }

    function updateInstructionText() {
        if(review){
            if (instructions[currentStep] && instructions[currentStep].review == true) {
                instructionDiv.innerHTML = `<p>${instructions[currentStep].text}</p>`;
            }   
        }
        else{
            if ((part==1) && currentStep == 6) {
                instructionDiv.innerHTML = generateCharities();
            }
            else if (instructions[currentStep]) {
                instructionDiv.innerHTML = `<p>${instructions[currentStep].text}</p>`;
            }
        }
    }

    function showScenarioNumbers(totalScenarios) {
        const scenarioNumbersDiv = document.getElementById("scenarioNumbers");
        for (let i = 0; i < totalScenarios; i++) {
            const box = document.createElement("div");
            //set style on div to shift right
            box.className = "scenario-box";
            box.innerText = i + 1;
            scenarioNumbersDiv.appendChild(box);
        }
    }

    function highlightCurrentScenario(index) {
        const scenarioBoxes = document.getElementsByClassName("scenario-box");
        if (index > 0) {
            scenarioBoxes[index-1].classList.remove("current-scenario");
        }
        scenarioBoxes[index].classList.add("current-scenario");
    }
    function getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFlooprimary = Math.floor(max);
        return Math.floor(Math.random() * (maxFlooprimary - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
      }
      
    function randomlyHighlightScenario(callback) {
        const scenarioBoxes = document.getElementsByClassName("scenario-box");

        const highlightDuration = 3000; // Total duration of the highlight effect
        const intervalDuration = 200; // Duration of each highlight interval
        //get random number
        let currentIndex = getRandomInt(0,scenarioBoxes.length);

        const intervalId = setInterval(() => {
            scenarioBoxes[currentIndex].classList.remove("random-highlight");

            currentIndex = getRandomInt(0,scenarioBoxes.length);

            scenarioBoxes[currentIndex].classList.add("random-highlight");
        }, intervalDuration);
        

        setTimeout(() => {
            clearInterval(intervalId);
            scenarioBoxes[currentIndex].classList.add("final-highlight");
            selectedScenarioNum = currentIndex;
            callback(currentIndex);
        }, highlightDuration);
    }


    function moveToNextScenario() {
        console.log("Entering moveToNextScenario with scenarioNum:", scenarioNum);
        if (scenarioNum < scenarios.length - 1) {
            scenarioNum++;
            highlightCurrentScenario(scenarioNum);
            showScenario(scenarios[scenarioNum], scenarioNum, group === "b");
            scenarios[scenarioNum-1].time = new Date() - scenarios[scenarioNum-1].time;
            console.log(`Scenario ${scenarioNum-1} ended: ${scenarios[scenarioNum-1].time} ms`);
            console.log(`Scenario ${scenarioNum} started at ${scenarios[scenarioNum].time}`);
            scenarios[scenarioNum].time = new Date();
            window.scrollTo(0, 0);
        } else {
            scenarios[scenarioNum].time = new Date() - scenarios[scenarioNum].time;
            console.log("Scenario " + (scenarioNum) + " ended: " + scenarios[scenarioNum].time);

            alert("Now randomly selecting a scenario to run.");
            window.scrollTo(0, 0);
            document.getElementById("nextScenarioBtn").style.display = "none";
            handleSubmission();
        }
    }

    showInstructions();

    function showScenario(scenario, index, stateContingent) {
        const scenarioDiv = document.getElementById("scenario");
        const inputDiv = document.getElementById("user-input");

        if (scenario.primaryMin == 10 || (scenario.primaryMin == 0 && scenario.primaryMax != 10)) {
            document.getElementById("scenarioChart").style.display = "none";
            scenarioDiv.innerHTML = `<h2>Scenario ${scenarioNum + 1}</h2><p>This scenario has a fixed outcome with no random elements.</p>`;
            const donationAmount = scenario.primaryMin === 10 ? 20 : 60;
            inputDiv.innerHTML = `<p>You have been given $${donationAmount}. You can split this sum between you and your chosen charity. If you decide to give $X to your chosen charity, then you will take $${donationAmount}-$X home. You cannot donate more than $${donationAmount}</p><p>How much would you like to pledge to share with your chosen charity?</p>
                                <input type="number" class="form-control" placeholder="Enter your donation" value="${scenario.primaryVal === -1 ? "" : scenario.primaryVal}" id="input${scenarioNum}">`;
        } else {
            document.getElementById("scenarioChart").style.display = "block";
            setupChart(scenario, "scenarioChart");
            let scenarioDescription="";
            if(part==2){
                scenarioDescription = generatePart2Description(scenario);
            }
            else{
                scenarioDescription = stateContingent ? generateStateContingentDescription(scenario) : generateNonStateContingentDescription(scenario);

            }
            scenarioDiv.innerHTML = `<h2>Scenario ${scenarioNum + 1}</h2><p>${scenarioDescription}</p>`;
            inputDiv.innerHTML = stateContingent ? generateStateInputs() : generateNonStateInputs();
        }
    }

    function generateNonStateContingentDescription(scenario) {
        let primaryColor = scenarios[scenarioNum].primaryColor;
        let secondaryColor = scenarios[scenarioNum].secondaryColor;
        return `The money you receive will be determined by a spin of a wheel. The wheel consists of ten sections of equal size that are either ${primaryColor} or ${secondaryColor}. The number of ${primaryColor} sections is between ${scenarios[scenarioNum].primaryMin} and ${scenarios[scenarioNum].primaryMax}. The rest are ${secondaryColor}. Randomly landing on ${primaryColor} yields $20, and randomly landing on ${secondaryColor} yields $60. You will first make the decision on how much you will give, and then the computer will randomly spin the wheel.`;
    }
    

    function generateStateContingentDescription(scenario) {
        return `The money you receive will be determined by a spin of a wheel. The wheel consists of ten sections of equal size that are either ${scenarios[scenarioNum].primaryColor} or ${scenarios[scenarioNum].secondaryColor}. The number of ${scenarios[scenarioNum].primaryColor} sections is between ${scenarios[scenarioNum].primaryMin} and ${scenarios[scenarioNum].primaryMax}. The rest are ${scenarios[scenarioNum].secondaryColor}. Randomly landing on ${scenarios[scenarioNum].primaryColor} yields $20, and randomly landing on ${scenarios[scenarioNum].secondaryColor} yields $60. You will first make the decision on how much you will give, and then the computer will randomly spin the wheel.`;
    }

    function generatePart2Description(scenario) {
        return `This wheel consists of ten sections of equal size that are either ${scenarios[scenarioNum].primaryColor} or ${scenarios[scenarioNum].secondaryColor}. The number of ${scenarios[scenarioNum].primaryColor} sections is between ${scenarios[scenarioNum].primaryMin} and ${scenarios[scenarioNum].primaryMax}. The rest are ${scenarios[scenarioNum].secondaryColor}. Randomly landing on ${scenarios[scenarioNum].primaryColor} yields $20, and randomly landing on ${scenarios[scenarioNum].secondaryColor} yields $60. What do you think is the average contribution of the other group who faced this question?`;
    }

    function generateStateInputs() {
        return `<p>Select donation amounts based on color outcomes...</p>
                <input type="number" class="form-control" placeholder="Amount if ${scenarios[scenarioNum].primaryColor} (up to $20)" value="${scenarios[scenarioNum].primaryVal === -1 ? "" : scenarios[scenarioNum].primaryVal}" id="primaryInput${scenarioNum}">
                <input type="number" class="form-control" placeholder="Amount if ${scenarios[scenarioNum].secondaryColor} (up to $60)" value="${scenarios[scenarioNum].secondaryVal === -1 ? "" : scenarios[scenarioNum].secondaryVal}" id="secondaryInput${scenarioNum}">`;
    }


    function generateNonStateInputs() {
        return `<p>Enter donation amount (up to $20)</p>
                <input type="number" class="form-control" placeholder="Enter donation amount" value="${scenarios[scenarioNum].primaryVal === -1 ? "" : scenarios[scenarioNum].primaryVal}" id="input${scenarioNum}">`;
    }

    function updateUserInputs() {
        if (group === "a" || scenarios[scenarioNum].primaryMin == 10 || (scenarios[scenarioNum].primaryMin == 0 && scenarios[scenarioNum].primaryMax == 0)) {
            scenarios[scenarioNum].primaryVal = document.getElementById(`input${scenarioNum}`).value;
            scenarios[scenarioNum].secondaryVal = document.getElementById(`input${scenarioNum}`).value;
        } else {
            scenarios[scenarioNum].primaryVal = document.getElementById(`primaryInput${scenarioNum}`).value;
            scenarios[scenarioNum].secondaryVal = document.getElementById(`secondaryInput${scenarioNum}`).value;
        }
        console.log(`Scenario ${scenarioNum} updated with primaryVal: ${scenarios[scenarioNum].primaryVal} and secondaryVal: ${scenarios[scenarioNum].secondaryVal}`);
    }

    function validateCurrentInput() {
        if (scenarios[scenarioNum].primaryMin == 10 || (scenarios[scenarioNum].primaryMin == 0 && scenarios[scenarioNum].primaryMax == 0)) {
            const input = parseInt(document.getElementById(`input${scenarioNum}`).value, 10);
            if (scenarios[scenarioNum].primaryMin == 10) {
                if (input > 20 || input < 0) {
                    return false;
                }
            } else if (scenarios[scenarioNum].primaryMin == 0 && scenarios[scenarioNum].primaryMax == 0) {
                if (input > 60 || input < 0) {
                    return false;
                }
            }
            return true;
        }
        let inputValid = true;

        if (group == "b") {
            const primaryInput = parseInt(document.getElementById(`primaryInput${scenarioNum}`).value, 10);
            const secondaryInput = parseInt(document.getElementById(`secondaryInput${scenarioNum}`).value, 10);
            if (isNaN(primaryInput) || primaryInput < 0 || primaryInput > 20 || isNaN(secondaryInput) || secondaryInput < 0 || secondaryInput > 60) {
                inputValid = false;
            }
        } else {
            const userInput = document.getElementById(`input${scenarioNum}`).value;
            const donationAmount = parseInt(userInput, 10);
            if (isNaN(donationAmount) || donationAmount < 0 || donationAmount > 20) {
                inputValid = false;
            }
        }
        return inputValid;
    }


    function setupChart(scenario, chartId) {
        const ctx = document.getElementById(chartId).getContext('2d');
        if (!ctx) {
            console.error("Chart canvas not found!");
            return;
        }
    
        const dataCounts = generateChartData(scenario);
        if (mainChart) {
            mainChart.destroy();  // Destroy existing chart instance before creating a new one
        }
    
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
                    duration: 0
                },
                tooltips: { enabled: false },
                legend: { display: false },
                responsive: false,
                maintainAspectRatio: true,
                plugins: {
                    afterDraw: function (chart) {
                        const ctx = chart.ctx;
                        ctx.font = "24px Arial";
                        ctx.textAlign = "center";
                        ctx.fillStyle = "white";
    
                        chart.data.datasets.forEach(function (dataset, i) {
                            const meta = chart.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                const label = chart.data.labels[index];
                                if (label.includes("Unknown")) {
                                    const centerPoint = bar.tooltipPosition();
                                    ctx.fillText("?", centerPoint.x, centerPoint.y);
                                }
                            });
                        });
                    }
                }
            }
        });
    
        originalBackgroundColors = mainChart.data.datasets[0].backgroundColor.slice();
    }
    
    
    function generateChartData(scenario) {
        const primaryCount = scenario.primaryMin;
        const secondaryCount = 10 - scenario.primaryMax;
        const unknownCount = 10 - primaryCount - secondaryCount;
        let primaryColor = scenario.primaryColor;
        let secondaryColor = scenario.secondaryColor;
        // use colorsDict to get css color
        var primaryCSS = colorDict.find((color) => color.color == primaryColor).cssColor;
        var secondaryCSS = colorDict.find((color) => color.color == secondaryColor).cssColor;

        const xValues = [];
        const yValues = [];
        const barColors = [];
    
        for (let i = 0; i < primaryCount; i++) {
            xValues.push(primaryColor);
            yValues.push(1);
            barColors.push(primaryCSS);
        }
        for (let i = 0; i < secondaryCount; i++) {
            xValues.push(secondaryColor);
            yValues.push(1);
            barColors.push(secondaryCSS);
        }
        for (let i = 0; i < unknownCount; i++) {
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
        if(color == "gray") {
            return "lightgray";
        }
        let lightenedColor = colorDict.find((col) => {
            return col.cssColor == color;
        }).lightenColor;
        return lightenedColor;
    }
    

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

            mainChart.data.datasets[0].backgroundColor[currentSlice] = lightenColor(mainChart.data.datasets[0].backgroundColor[currentSlice]);

            mainChart.update();
            previousSlice = currentSlice;
            elapsedTime += flashDuration;

            if (elapsedTime >= spinDuration) {
                clearInterval(intervalId);
                outcome = mainChart.data.labels[currentSlice];
                if (outcome == "Unknown") {
                    outcome = originalBackgroundColors[currentSlice];
                }
                console.log(`Wheel landed on: ${outcome}`);
                if (callback) callback(outcome,"uncertain");
            }
        }, flashDuration);
    }

    // Function: displayResult
    // Purpose: Display the result of the spin to the user, based on the selected color and certainty.
    // Parameters:
    // - color: The color of the spin outcome.
    // - certainty: The certainty of the spin outcome.
    // Return: None
    function displayResult(color, certainty) {
        // Log the color and certainty to the console
        console.log(`color: ${color}, certainty: ${certainty}`);

        // Hide the spin button
        document.getElementById("spinBtn").style.display = "none";

        // If the color is not "primary" or "secondary", choose a random color
        if (color != "primary" && color != "secondary") {
            color = Math.random() < 0.5 ? "primary" : "secondary";
        }

        // Determine the amount received based on the spin outcome
        if (outcome == "primary") {
            amountReceived = 60;
            originalGift = scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryVal;
        } else {
            amountReceived = 20;
            originalGift = scenarios.find(scenario => scenario.num === selectedScenarioNum).secondaryVal;
        }

        // Access the scenario description element and update its content
        const scenarioDescription = document.getElementById("scenarioDescription");

        // If the certainty is 'certain', update the scenario description and add a new input field
        if (certainty == 'certain') {
            scenarioDescription.innerHTML += `Here is how much you decided to give: $${scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryVal}<br>`;
            const decisionInput = document.getElementById("decisionInput");
            if(group == "b") {
                decisionInput.innerHTML = `
                    <p>We would like to give you an opportunity to change your decision and allocate more or less to your selected cause.  Would you like to change your allocation decision? If yes, how much would you like to give to charity out of the sum that you have received?</p>
                    <input type="number" id="newDonationAmount" value="${scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryVal}" />
                `;
            }
        } 
        // If the group is 'b', update the scenario description and add a new input field
        else if (group === "b") {
            let newspincolor = '';
            // If the spin outcome is 'unknown', choose a random color
            if (outcome == 'unknown') {
                outcome = Math.random() < 0.5 ? "primary" : "secondary";
                if (outcome == "primary") {
                    newspincolor = scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryColor;
                } else {
                    newspincolor = scenarios.find(scenario => scenario.num === selectedScenarioNum).secondaryColor;
                }
            }
            // Log the amount received and the amount decided to give
            console.log(`Here is what you receive from the spin: $${amountReceived}`);
            console.log(`Here is how much you decided to give: $${color == "primary" ? scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryVal : scenarios.find(scenario => scenario.num === selectedScenarioNum).secondaryVal}`);
            // Update the scenario description with the spin outcome and amounts
            scenarioDescription.innerHTML += `
                Wheel landed on: ${newspincolor.toUpperCase()}<br>
                Here is what you receive from the spin: $${amountReceived}<br>
                Here is how much you decided to give: $${color == "primary" ? scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryVal : scenarios.find(scenario => scenario.num === selectedScenarioNum).secondaryVal}<br>
            `;
            const decisionInput = document.getElementById("decisionInput");
            // Add a new input field for changing the allocation decision
            decisionInput.innerHTML = `
                <p>We would like to give you an opportunity to change your decision and allocate more or less to your selected cause.  Would you like to change your allocation decision? If yes, how much would you like to give to charity out of the sum that you have received?</p>
                <input type="number" id="newDonationAmount" value="" />
            `;
        } 
        // If the group is neither 'a' nor 'b', update the scenario description without adding a new input field
        else {
            let newspincolor = '';
            // If the spin outcome is 'unknown', choose a random color
            if (outcome == 'unknown') {
                outcome = Math.random() < 0.5 ? "primary" : "secondary";
                if (outcome == "primary") {
                    newspincolor = scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryColor;
                } else {
                    newspincolor = scenarios.find(scenario => scenario.num === selectedScenarioNum).secondaryColor;
                }

            }
            // Update the scenario description with the spin outcome and amounts
            scenarioDescription.innerHTML += `
                Wheel landed on: ${newspincolor.toUpperCase()}<br>
                Here is what you receive from the spin: $${amountReceived}<br>
                Here is how much you decided to give: $${scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryVal}
            `;
        }

        // Access the confirm change button and add an event listener
        const confirmButton = document.getElementById("confirmChange");
        confirmButton.addEventListener("click", function () {
            // If the group is 'b', update the donation amount and call the updateDonation function
            if(group == "b") {
                updateDonation(color);
            }
            // If the group is 'a', call the part2 function
            if(group == "a"){
                part2();
            }
            // If the group is neither 'a' nor 'b', call the finalSubmit function
            else{
                finalSubmit();
            }
        });
    }

    function updateDonation(color) {
        newAmount = document.getElementById("newDonationAmount").value;
        console.log(`New donation amount: $${newAmount}`);
        if (color == "primary") {
            if (scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryVal != newAmount) {
                edited = true;
                scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryVal = newAmount;
            }
            amountPaid = amountReceived - newAmount;
        } else if (color == "secondary") {
            if (scenarios.find(scenario => scenario.num === selectedScenarioNum).secondaryVal != newAmount) {
                edited = true;
                scenarios.find(scenario => scenario.num === selectedScenarioNum).secondaryVal = newAmount;
            }
            amountPaid = amountReceived - newAmount;
        }
    }
    function revealColors(scenario) {
        primary = scenario.primaryColor;
        secondary = scenario.secondaryColor;

        primaryCSS = colorDict.find((color) => color.color == primary).cssColor;
        secondaryCSS = colorDict.find((color) => color.color == secondary).cssColor;
        let index = 0;
        setTimeout(() => {
            mainChart.data.datasets[0].backgroundColor = mainChart.data.datasets[0].backgroundColor.map(color => {
                if (color === 'gray') {                    
                    let newColor = Math.random() < 0.5 ? primaryCSS : secondaryCSS;
                    //store in originalBackgroundColors
                    originalBackgroundColors[index] = newColor;
                    index++;
                    return newColor;
                }
                index++;
                return color;
            });
            mainChart.update();
        }, 3000); // Delay of 3 seconds
    }
    function displayOutcome(scenario) {

        const scenarioDescription = document.getElementById("scenarioDescription");

        if (scenario.primaryMin == 10) {
            scenarioDescription.innerHTML = `Round # Selected: Scenario ${scenario.orderNum + 1}. This was a fixed scenario in which you recieve $20.<br>`;
            displayResult("primary", 'certain');
        } else if ((scenario.primaryMin == 0 && scenario.primaryMax != 10)) {
            scenarioDescription.innerHTML = `Round # Selected: Scenario ${scenario.orderNum + 1}. This was a fixed scenario in which you recieve $60.<br>`;
            displayResult("secondary", 'certain');
        } else {
            setupChart(scenario, "mainChart");
            scenarioDescription.innerHTML = `Round # Selected: Scenario ${scenario.orderNum + 1}. <br> Below is the distribution you were originally shown. <br> Remember, a ${scenario.primaryColor} results in $60, and a ${scenario.secondaryColor} results in in $20. <br> In 3 seconds, the colors of the unknown slices will be revealed. <br>`;
            document.getElementById("spinBtn").addEventListener("click", function () {
                spinChart(displayResult);
            });
        revealColors(scenario);
        }
        const modalTitle = document.querySelector("#submitModal .modal-title");
        modalTitle.textContent = "Scenario Outcome";
    }

    function handleSubmission() {
        //unhighlight final scenario box
        const scenarioBoxes = document.getElementsByClassName("scenario-box");
        scenarioBoxes[scenarioBoxes.length-1].classList.remove("current-scenario");

        // Randomly highlight scenarios before selecting one
        randomlyHighlightScenario((finalIndex) => {
            //wait for 1 second to show result
            setTimeout(() => {
            }, 1000);

            const selectedScenario = scenarios[finalIndex];

            displayOutcome(selectedScenario);
            document.getElementById("submitModal").style.display = "block";
        });

    }

    function part2() {
        //clear all html
        document.getElementById("nextScenarioBtn").style.display = "block";

        scenarioHtml = document.getElementById("scenario");
        scenarioHtml.innerHTML = "";
        scenarioNums = document.getElementById("scenarioNumbers");
        scenarioNums.innerHTML = "<br><br><br><br><br>";

        //show state contingent options
        group = "b";

        scenarioNum = 0;
        review = false;
        part=2;
        instructions = getPart2Instructions();
        document.getElementById("submitModal").style.display = "none";
        //unhighlight final scenario box
        //go through scenarios
        
        //highlight first scenario box
        
        
        showScenarioNumbers(scenarios.length);
        showScenario(scenarios[0], 0, false);
        highlightCurrentScenario(0);
        instructionModal.style.display = "block";
        currentStep = 0;
        showInstructions();
        viewInstructionsBtn.style.display = "none";

    }

    function finalSubmit() {
        if (scenarios[0].primaryGuess!=-1){
            group="a";
        }

        const formData = new FormData();
        console.log(`Subject ID: ${id}`);
        formData.append("Subject ID", id);
        formData.append("sessionID", sessionID);
        formData.append("ComprehensionQ1", comprehensionCheck1);
        formData.append("ComprehensionQ2", comprehensionCheck2);
        formData.append("RecipientCharity", recipientCharity);
        formData.append("InstructionsTime", instructionsTime);
        formData.append("Treatment", group);
        formData.append("Scenario0Order", scenario0Order);
        formData.append("Scenario1Order", scenario1Order);
        formData.append("Scenario2Order", scenario2Order);
        formData.append("Scenario3Order", scenario3Order);
        formData.append("Scenario4Order", scenario4Order);
        formData.append("Scenario5Order", scenario4Order);
        formData.append("Scenario0Primary", scenarios[0].primaryVal);
        formData.append("Scenario0Secondary", scenarios[0].secondaryVal);
        formData.append("Scenario0Time", scenarios[0].time);
        formData.append("Scenario1Primary", scenarios[1].primaryVal);
        formData.append("Scenario1Secondary", scenarios[1].secondaryVal);
        formData.append("Scenario1Time", scenarios[1].time);
        formData.append("Scenario2Primary", scenarios[2].primaryVal);
        formData.append("Scenario2Secondary", scenarios[2].secondaryVal);
        formData.append("Scenario2Time", scenarios[2].time);
        formData.append("Scenario3Primary", scenarios[3].primaryVal);
        formData.append("Scenario3Secondary", scenarios[3].secondaryVal);
        formData.append("Scenario3Time", scenarios[3].time);
        formData.append("Scenario4Primary", scenarios[4].primaryVal);
        formData.append("Scenario4Secondary", scenarios[4].secondaryVal);
        formData.append("Scenario4Time", scenarios[4].time);
        formData.append("Scenario5Primary", scenarios[5].primaryVal);
        formData.append("Scenario5Secondary", scenarios[5].secondaryVal);
        formData.append("Scenario5Time", scenarios[5].time);
        formData.append("ScenarioSelected", selectedScenarioNum);
        formData.append("AmountReceived", amountReceived);
        formData.append("OriginalGift", originalGift);
        formData.append("Revise", edited);
        formData.append("NewAnswer", newAmount);
        formData.append("AmountPaid", amountPaid);
        formData.append("Scenario0GuessPrimary", scenarios[0].primaryGuess);
        formData.append("Scenario0GuessSecondary", scenarios[0].secondaryGuess);
        formData.append("Scenario1GuessPrimary", scenarios[1].primaryGuess);
        formData.append("Scenario1GuessSecondary", scenarios[1].secondaryGuess);
        formData.append("Scenario2GuessPrimary", scenarios[2].primaryGuess);
        formData.append("Scenario2GuessSecondary", scenarios[2].secondaryGuess);
        formData.append("Scenario3GuessPrimary", scenarios[3].primaryGuess);
        formData.append("Scenario3GuessSecondary", scenarios[3].secondaryGuess);
        formData.append("Scenario4GuessPrimary", scenarios[4].primaryGuess);
        formData.append("Scenario4GuessSecondary", scenarios[4].secondaryGuess);
        formData.append("Scenario5GuessPrimary", scenarios[5].primaryGuess);
        formData.append("Scenario5GuessSecondary", scenarios[5].secondaryGuess);


        const url = "https://script.google.com/macros/s/AKfycbwoYdgHjvr7skUP99BCfzKkvQhJmDucljjvg3NNsAawf0Npm_jC3EISlyTFMxVTll_Y/exec";
        console.log("Submitting form data:", formData);
        fetch(url, {
            method: "POST",
            mode: "no-cors",
            body: new URLSearchParams(formData),
        })
            .then(response => {
                console.log("Response received:", response);
                return response.text();
            })
            .then(data => {
                console.log("Success:", data);
                alert(`Thank you for completing the study! Please show this screen to the experiment administrator in order to receive your payout of $${amountPaid}.`);
                window.location.reload();
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

});
