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
const charityDict = [
    { name: "Tuscaloosa Public Library", website:"https://www.tuscaloosa-library.org/support-the-library/", description: "The Tuscaloosa Public Library is the City’s and County’s public library for all residents to utilize for their educational, workforce, research and entertainment needs. TPL has been serving this community for more than 100 years and looks to continue that role for the next 100 years. Your gift to the Tuscaloosa Public Library will help maintain the quality of the Library’s collections, diverse programming, informational resources and accessible to technology." },
    {name: "Tuscaloosa YMCA", website: "https://www.ymcatuscaloosa.org/financial", description: "The YMCA of Tuscaloosa embraces people of all ages, incomes, abilities, religions and ethnic backgrounds; we're for everyone. We work to break barriers of isolation and create the connections between people that add meaning to life. Individuals and families who cannot afford to pay full price for memberships or our programs still deserve the life-enriching experiences the Y offers. At the Y, we never turn anyone away because of an inability to pay." },
    {name:"RISE Center at UA", website: "https://risecenter.ua.edu/",description: "RISE was started in 1974 to enrich the lives of infants and preschoolers – both traditional learners and children with varying abilities.  Through early intervention and early childhood preschool services, children at RISE are equipped with the skills necessary to succeed in an inclusive school setting.  Children at RISE receive music therapy, physical therapy, occupational therapy and speech and language therapy in a classroom setting.  Our team of nurses provide medical services to children in need throughout the day.  The program includes seven classrooms led by highly qualified early childhood education teachers that embed individual therapy goals into daily developmentally appropriate activities.  RISE is housed in a state-of-the-art early childhood education facility on the campus of The University of Alabama that is unparalleled in design and accommodations to meet the needs of all children.  RISE is a part of the College of Human Environmental Sciences and provides opportunities for University students to experience evidence-based research practices in the field of early childhood education and early childhood special education.  RISE Center currently serves close to 100 children and their families."},
    {name:"Tuscaloosa Metro Animal Shelter",website:"https://give.metroanimalshelter.org/give/296293/#!/donation/checkout",description: "Tuscaloosa Metro Animal Shelter is the only stray receiving facility for Tuscaloosa County, Tuscaloosa City, and the City of Northport. All animals picked up by the three municipal animal control agencies in Tuscaloosa County are brought to TMAS… Every year we get in thousands of lost and abandoned pets into our facility.  Donations from our amazing supporters allow us to treat, rehabilitate, foster, and adopt them out!"}
]

document.addEventListener("DOMContentLoaded", function () {
    // Variables and initialization
    const instructionModal = document.getElementById("instructionModal");
    const viewInstructionsBtn = document.getElementById("viewInstructionsBtn");
    const instructionDiv = document.getElementById("instructions");
    const scenarios = getScenarios();
    const instructions = getInstructions();
    const correctAnswers = getCorrectAnswers();

    let currentStep = 0;
    let group = Math.random() < 0.5 ? "a" : "b";
    let mainChart;
    let originalBackgroundColors = [];
    let totalTimeSpent = 0;
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
    let id = "";

    let scenario0Order = -1;
    let scenario1Order = -1;
    let scenario2Order = -1;
    let scenario3Order = -1;
    let scenario4Order = -1;
    let scenario5Order = -1;

    // Shuffle scenarios
    shuffleScenarios(scenarios);

    // Event listeners
    document.getElementById("continue").addEventListener("click", handleContinueClick);
    document.getElementById("back").addEventListener("click", handleBackClick);
    viewInstructionsBtn.addEventListener("click", handleViewInstructionsClick);
    document.getElementById("nextScenarioBtn").addEventListener("click", handleNextScenarioClick);
    document.getElementById("confirmChange").addEventListener("click", handleConfirmChangeClick);

    // Initial setup
    showInstructions();
    if (group === "a") {
        showScenario(scenarios[0], 0, false);
    } else {
        showScenario(scenarios[0], 0, true);
    }

    function getScenarios() {
        return [
            { num: 0, orderNum: -1, primaryMin: 0, primaryMax: 10, primaryVal: -1, secondaryVal: -1 ,primaryColor: "Gray", secondaryColor: "Gray"},
            { num: 1, orderNum: -1, primaryMin: 2, primaryMax: 8, primaryVal: -1, secondaryVal: -1,primaryColor: "Gray", secondaryColor: "Gray" },
            { num: 2, orderNum: -1, primaryMin: 4, primaryMax: 6, primaryVal: -1, secondaryVal: -1 ,primaryColor: "Gray", secondaryColor: "Gray"},
            { num: 3, orderNum: -1, primaryMin: 5, primaryMax: 5, primaryVal: -1, secondaryVal: -1 ,primaryColor: "Gray", secondaryColor: "Gray"},
            { num: 4, orderNum: -1, primaryMin: 10, primaryMax: 10, primaryVal: -1, secondaryVal: -1 ,primaryColor: "Gray", secondaryColor: "Gray"},
            { num: 5, orderNum: -1, primaryMin: 0, primaryMax: 0, primaryVal: -1, secondaryVal: -1 ,primaryColor: "Gray", secondaryColor: "Gray"},
        ];
    }
    
    

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
        console.log("Randomized colors: " + colors);
        return colors;
    }

    function shuffleScenarios(scenarios) {
        nums = [0, 1, 2, 3, 4, 5];
        for (let i = scenarios.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [scenarios[i], scenarios[j]] = [scenarios[j], scenarios[i]];
        }
        
        scenario0Order = scenarios.findIndex((scenario) => scenario.num == 0);
        console.log("Scenario 0 order: " + scenario0Order);
        scenarios.find((scenario) => scenario.num == 0).orderNum = scenario0Order;
        scenario1Order = scenarios.findIndex((scenario) => scenario.num == 1);
        console.log("Scenario 1 order: " + scenario1Order);
        scenarios.find((scenario) => scenario.num == 1).orderNum = scenario1Order;
        scenario2Order = scenarios.findIndex((scenario) => scenario.num == 2);
        console.log("Scenario 2 order: " + scenario2Order);
        scenarios.find((scenario) => scenario.num == 2).orderNum = scenario2Order;
        scenario3Order = scenarios.findIndex((scenario) => scenario.num == 3);
        console.log("Scenario 3 order: " + scenario3Order);
        scenarios.find((scenario) => scenario.num == 3).orderNum = scenario3Order;
        scenario4Order = scenarios.findIndex((scenario) => scenario.num == 4);
        console.log("Scenario 4 order: " + scenario4Order);
        scenarios.find((scenario) => scenario.num == 4).orderNum = scenario4Order;
        scenario5Order = scenarios.findIndex((scenario) => scenario.num == 5);
        console.log("Scenario 5 order: " + scenario5Order);
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
        console.log(scenarios);

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
        htmlText = "Choose a recipient for all your donations from the following list of charities: ";
        for (let i = 0; i < charityDict.length; i++) {
            htmlText += `<div class='form-check'><input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio${i + 1}'><label class='form-check-label' for='charityRadio${i + 1}'><b>${charityDict[i].name}</b>: <a href = '${charityDict[i].website}' target='_blank'>Website</a> ${charityDict[i].description}</label></div>`;
        }
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
          step: 0,
          text: "Thank you for participating in this research study. The entire study will be completed on the computer in one sitting. The study consists of two parts.",
          review: true,
        },
        {
            step: 1,
            text: "In this part, you will answer a series of questions. In each round, you will be asked to make a contribution to a charity of your choosing. The contribution will be deducted from a sum of money you receive for that round. You can split the sum of money between yourself and the charity however you want. You can even give all of it or keep all of it.",
            review: true,
        },
        {
          step: 2,
          text: "The timeline of this study will be the following: <ol><li>First you will be given the opportunity to select a charity from a list of potential causes. The selected charity will be the recipient of your donation decision in all subsequent rounds. <u>Remember: all the donation decisions you make will be directed to the charity you choose.</u> </li><li>You will then answer a series of six distinct and independent decisions with real financial stakes. In each decision, it will be explained how the sum of money that you can allocate between yourself and the selected charity will be determined by a random spin of a wheel. The wheels used in each decision are unique and unrelated to those used in each and every other decision round. Your choice in each round is to determine how you would like to split the sum of money between yourself and the selected charity.</li><li>Once you have made an allocation in each of the rounds, the computer will select one of the six decision rounds at random. Your choice in the selected decision round will determine your earnings and the amount that will be given to the selected charity.</li></ol>",
          review: true,
        },
        {
          step: 3,
          text: "Before we begin this study, we would like to check your understanding. </p><p> Q1: How many different allocation decisions will you make?  <div class='form-check'><input class='form-check-input' type='radio' name='q3Input' id='q1Input1'><label class='form-check-label' for='q1Input1'>4</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q3Input' id='q1Input2'><label class='form-check-label' for='q1Input2'>5</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q3Input' id='q1Input3'><label class='form-check-label' for='q1Input3'>6</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q3Input' id='q1Input4'><label class='form-check-label' for='q1Input4'>7</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q3Input' id='q1Input5'><label class='form-check-label' for='q1Input5'>8</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q3Input' id='q1Input6'><label class='form-check-label' for='q1Input6'>9</label></div></p>",
          review: false,
        },
        {
          step: 4,
          text: "Before we begin this study, we would like to check your understanding. <p>Q2: Recall that your decisions will determine your payment. How is your payment determined? <div class='form-check'><input class='form-check-input' type='radio' name='q4Input' id='q2Input1'><label class='form-check-label' for='q2Input1'>Every decision in the six parts will get paid. Thus, I can strategize across decisions and hedge my bets.</label></div><div class='form-check'><input class='form-check-input' type='radio' name='q4Input' id='q2Input2'><label class='form-check-label' for='q2Input2'>The computer will randomly select one of the decisions in the six parts, and my payment will depend on my answer to this question. Thus, there is no point for me to strategize across these decisions.</label></div></p>",
          review: false,
        },
        {
          step: 5,
          text: generateCharities(),
        review: false,
        }
        ];}

    function getCorrectAnswers() {
        return {
            3: "q1Input3",
            4: "q2Input2"
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


    function handleContinueClick() {
        if (review){
            if (instructions[currentStep].review == false){
                return;
            }
        }
        if (currentStep == 5) {
            const charityRadio = document.querySelector('input[name="charityRadioGroup"]:checked');
            if (charityRadio) {
                recipientCharity = charityRadio.labels[0].innerText;
            } else {
                alert("Please select a charity before proceeding.");
                return;
            }
        }
        if (currentStep == 0){
            userName = document.getElementById("name").value;
            userCWID = document.getElementById("cwid").value;
            if (userName && userCWID) {
                if (userCWID.length != 8) {
                    alert("Please enter a valid CWID.");
                    return;
                }

            } else {
                alert("Please enter your name and CWID before proceeding.");
                return;
            }
            id = generateCode(userName, userCWID);

        }
        if (validateAnswers()) {
            nextInstruction();
        } else {
            if (currentStep == 3) {
                comprehensionCheck1 = 0;
            } else {
                comprehensionCheck2 = 0;
            }
            alert("Please answer the question correctly before proceeding.");
        }
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

    function handleConfirmChangeClick() {
        updateDonation(outcome);
        finalSubmit();
    }

    function validateAnswers() {
        if (correctAnswers.hasOwnProperty(currentStep)) {
            const userAnswer = document.querySelector(`input[name="q${currentStep}Input"]:checked`);
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
            if (instructions[currentStep]) {
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
        console.log("Starting randomlyHighlightScenario with callback:", callback);
        const scenarioBoxes = document.getElementsByClassName("scenario-box");

        const highlightDuration = 3000; // Total duration of the highlight effect
        const intervalDuration = 200; // Duration of each highlight interval
        //get random number
        let currentIndex = getRandomInt(0,scenarioBoxes.length);

        console.log("Initial currentIndex:", currentIndex);
        const intervalId = setInterval(() => {
            console.log("Current currentIndex:", currentIndex);
            scenarioBoxes[currentIndex].classList.remove("random-highlight");

            currentIndex = getRandomInt(0,scenarioBoxes.length);
            console.log("Next currentIndex:", currentIndex);

            scenarioBoxes[currentIndex].classList.add("random-highlight");
        }, intervalDuration);
        

        setTimeout(() => {
            console.log("Clearing intervalId");
            clearInterval(intervalId);
            scenarioBoxes[currentIndex].classList.add("final-highlight");
            selectedScenarioNum = currentIndex;
            console.log("Calling callback with currentIndex:", currentIndex);
            callback(currentIndex);
        }, highlightDuration);
    }


    function moveToNextScenario() {
        console.log("Entering moveToNextScenario with scenarioNum:", scenarioNum);
        if (scenarioNum < scenarios.length - 1) {
            console.log("Incrementing scenarioNum");
            scenarioNum++;
            console.log("Incremented scenarioNum to:", scenarioNum);
            console.log("Highlighting current scenario");
            highlightCurrentScenario(scenarioNum);
            console.log("Showing scenario with index:", scenarioNum);
            showScenario(scenarios[scenarioNum], scenarioNum, group === "b");
            console.log("Scrolling to top of page");
            window.scrollTo(0, 0);
            console.log("Finished showing scenario with index:", scenarioNum);
        } else {
            console.log("scenarioNum is equal to scenarios.length - 1");
            alert("Now randomly selecting a scenario to run.");
            window.scrollTo(0, 0);
            console.log("Hiding next scenario button");
            document.getElementById("nextScenarioBtn").style.display = "none";
            console.log("Handling submission");
            handleSubmission();
        }
    }

    showInstructions();
    showScenarioNumbers(scenarios.length);
    highlightCurrentScenario(0);

    function showScenario(scenario, index, stateContingent) {
        console.log("Entering showScenario with scenario:", scenario, "index:", index, "stateContingent:", stateContingent);
        const scenarioDiv = document.getElementById("scenario");
        const inputDiv = document.getElementById("user-input");

        if (scenario.primaryMin == 10 || (scenario.primaryMin == 0 && scenario.primaryMax != 10)) {
            console.log("PrimaryMin is 10 or PrimaryMin is 0 and PrimaryMax is not 10");
            document.getElementById("scenarioChart").style.display = "none";
            scenarioDiv.innerHTML = `<h2>Scenario ${scenarioNum + 1}</h2><p>This scenario has a fixed outcome with no random elements.</p>`;
            const donationAmount = scenario.primaryMin === 10 ? 20 : 60;
            inputDiv.innerHTML = `<p>You have been given $${donationAmount}. You can split this sum between you and your chosen charity. If you decide to give $X to your chosen charity, then you will take $${donationAmount}-$X home. You cannot donate more than $${donationAmount}</p><p>How much would you like to pledge to share with your chosen charity?</p>
                                <input type="number" class="form-control" placeholder="Enter your donation" value="${scenario.primaryVal === -1 ? "" : scenario.primaryVal}" id="input${scenarioNum}">`;
        } else {
            console.log("PrimaryMin is not 10 and PrimaryMax is not 10");
            document.getElementById("scenarioChart").style.display = "block";
            setupChart(scenario, "scenarioChart");
            const scenarioDescription = stateContingent ? generateStateContingentDescription(scenario) : generateNonStateContingentDescription(scenario);
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
        console.log("Generating chart data...");
        console.log("Scenario:", scenario);

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
    
        console.log("Primary count:", primaryCount);
        console.log("Secondary count:", secondaryCount);
        console.log("Unknown count:", unknownCount);

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

        console.log("xValues:", xValues);
        console.log("yValues:", yValues);
        console.log("barColors:", barColors);

        return {
            labels: xValues,
            values: yValues,
            colors: barColors,
        };
    }
    
    function lightenColor(color) {
        console.log(`lightenColor function called with color: ${color}`);
        if(color == "gray") {
            console.log(`Color is gray. Returning lightgray`);
            return "lightgray";
        }
        let lightenedColor = colorDict.find((col) => {
            console.log(`Checking if ${col.cssColor} matches ${color}`);
            return col.cssColor == color;
        }).lightenColor;
        console.log(`Returning lightened color: ${lightenedColor}`);
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
                if (callback) callback(outcome);
            }
        }, flashDuration);
    }

    function displayResult(color, certainty) {
        console.log(`color: ${color}, certainty: ${certainty}`);
        document.getElementById("spinBtn").style.display = "none";

        if (color != "primary" && color != "secondary") {
            color = Math.random() < 0.5 ? "primary" : "secondary";
        }

        if (outcome == "primary") {
            amountReceived = 20;
            originalGift = scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryVal;
        } else {
            amountReceived = 60;
            originalGift = scenarios.find(scenario => scenario.num === selectedScenarioNum).secondaryVal;
        }

        const scenarioDescription = document.getElementById("scenarioDescription");
        if (certainty == 'certain') {
            scenarioDescription.innerHTML += `Here is how much you decided to give: $${scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryVal}<br>`;
            const decisionInput = document.getElementById("decisionInput");
            decisionInput.innerHTML = `
                <p>Would you like to change your decision? If yes, how much would you like to give to charity out of the sum? If not, click "finish."</p>
                <input type="number" id="newDonationAmount" value="${scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryVal}" />
            `;
        } else if (group === "b") {
            if (outcome == 'unknown') {
                outcome = Math.random() < 0.5 ? "primary" : "secondary";
            }
            console.log(`Wheel landed on: ${color == "primary" ? scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryColor : scenarios.find(scenario => scenario.num === selectedScenarioNum).secondaryColor}`);
            console.log(`Here is what you receive from the spin: $${amountReceived}`);
            console.log(`Here is how much you decided to give: $${color == "primary" ? scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryVal : scenarios.find(scenario => scenario.num === selectedScenarioNum).secondaryVal}`);
            scenarioDescription.innerHTML += `
                Wheel landed on: ${outcome.toUpperCase()}<br>
                Here is what you receive from the spin: $${amountReceived}<br>
                Here is how much you decided to give: $${color == "primary" ? scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryVal : scenarios.find(scenario => scenario.num === selectedScenarioNum).secondaryVal}<br>
            `;
            const decisionInput = document.getElementById("decisionInput");
            decisionInput.innerHTML = `
                <p>Would you like to change your decision? If yes, how much would you like to give to charity out of the sum? If not, click "finish."</p>
                <input type="number" id="newDonationAmount" value="" />
            `;
        } else {
            if (outcome == 'unknown') {
                outcome = Math.random() < 0.5 ? "primary" : "secondary";
            }
            console.log(`Wheel landed on: ${outcome.toUpperCase()}`);
            console.log(`Here is what you receive from the spin: $${amountReceived}`);
            console.log(`Here is how much you decided to give: $${scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryVal}`);
            scenarioDescription.innerHTML += `
                Wheel landed on: ${outcome.toUpperCase()}<br>
                Here is what you receive from the spin: $${amountReceived}<br>
                Here is how much you decided to give: $${scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryVal}
            `;
            const decisionInput = document.getElementById("decisionInput");
            decisionInput.innerHTML = `
                <p>Would you like to change your decision? If yes, how much would you like to give to charity out of the sum? If not, click "finish."</p>
                <input type="number" id="newDonationAmount" value="${scenarios.find(scenario => scenario.num === selectedScenarioNum).primaryVal}" />
            `;
        }

        const confirmButton = document.getElementById("confirmChange");
        confirmButton.addEventListener("click", function () {
            updateDonation(color);
            finalSubmit();
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
            outcome = "primary";
            displayResult(outcome, 'certain');
        } else if ((scenario.primaryMin == 0 && scenario.primaryMax != 10)) {
            scenarioDescription.innerHTML = `Round # Selected: Scenario ${scenario.orderNum + 1}. This was a fixed scenario in which you recieve $60.<br>`;
            outcome = "secondary";
            displayResult(outcome, 'certain');
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
        console.log("Starting handleSubmission");

        //unhighlight final scenario box
        const scenarioBoxes = document.getElementsByClassName("scenario-box");
        console.log("Checkpoint 1");
        scenarioBoxes[scenarioBoxes.length-1].classList.remove("current-scenario");
        console.log("Checkpoint 2");

        console.log("Unhighlighted final scenario box");

        // Randomly highlight scenarios before selecting one
        randomlyHighlightScenario((finalIndex) => {
            //wait for 1 second to show result
            setTimeout(() => {
                console.log('sleep for 1 second');
            }, 1000);
            console.log("Finished randomly highlighting scenarios");

            const selectedScenario = scenarios[finalIndex];
            console.log("Selected scenario:", selectedScenario);

            displayOutcome(selectedScenario);

            console.log("Displayed scenario outcome");

            // Show the modal after highlighting and selecting the scenario

            document.getElementById("submitModal").style.display = "block";
            console.log("Displayed submit modal");
        });

        console.log("Ending handleSubmission");
    }

    function finalSubmit() {
        const formData = new FormData();
        formData.append("Subject ID", id);
        formData.append("ComprehensionQ1", comprehensionCheck1);
        formData.append("ComprehensionQ2", comprehensionCheck2);
        formData.append("RecipientCharity", recipientCharity);
        formData.append("Treatment", group);
        formData.append("Scenario0Order", scenario0Order);
        formData.append("Scenario1Order", scenario1Order);
        formData.append("Scenario2Order", scenario2Order);
        formData.append("Scenario3Order", scenario3Order);
        formData.append("Scenario4Order", scenario4Order);
        formData.append("Scenario5Order", scenario4Order);
        formData.append("Scenario0Primary", scenarios[0].primaryVal);
        formData.append("Scenario0Secondary", scenarios[0].secondaryVal);
        formData.append("Scenario1Primary", scenarios[1].primaryVal);
        formData.append("Scenario1Secondary", scenarios[1].secondaryVal);
        formData.append("Scenario2Primary", scenarios[2].primaryVal);
        formData.append("Scenario2Secondary", scenarios[2].secondaryVal);
        formData.append("Scenario3Primary", scenarios[3].primaryVal);
        formData.append("Scenario3Secondary", scenarios[3].secondaryVal);
        formData.append("Scenario4Primary", scenarios[4].primaryVal);
        formData.append("Scenario4Secondary", scenarios[4].secondaryVal);
        formData.append("Scenario5Primary", scenarios[5].primaryVal);
        formData.append("Scenario5Secondary", scenarios[5].secondaryVal);
        formData.append("ScenarioSelected", selectedScenarioNum);
        formData.append("AmountReceived", amountReceived);
        formData.append("OriginalGift", originalGift);
        formData.append("Revise", edited);
        formData.append("NewAnswer", newAmount);
        formData.append("AmountPaid", amountPaid);

        const url = "https://script.google.com/macros/s/AKfycby21YkZ0pjSNMUG4YOmzzYj4RLPq4ZdDEHbXrw99jPcdlkI_ERkWd6XlnsArF-h_pPB/exec";
        fetch(url, {
            method: "POST",
            mode: "no-cors",
            body: new URLSearchParams(formData),
        })
            .then(response => response.text())
            .then(data => {
                console.log("Success:", data);
                alert(`Thank you for completing the study! Please show this screen to the experiment administrator in order to receive your payout of $${amountPaid}.`);
                window.location.reload();
            })
            .catch(error => console.error("Error:", error));
    }

});
