defaultScenarios = [
    { num: 0, orderNum: -1, primaryMin: 0, primaryMax: 10, primaryVal: -1, secondaryVal: -1 ,primaryColor: "Gray", secondaryColor: "Gray"},
    { num: 1, orderNum: -1, primaryMin: 2, primaryMax: 8, primaryVal: -1, secondaryVal: -1,primaryColor: "Gray", secondaryColor: "Gray" },
    { num: 2, orderNum: -1, primaryMin: 4, primaryMax: 6, primaryVal: -1, secondaryVal: -1 ,primaryColor: "Gray", secondaryColor: "Gray"},
    { num: 3, orderNum: -1, primaryMin: 5, primaryMax: 5, primaryVal: -1, secondaryVal: -1 ,primaryColor: "Gray", secondaryColor: "Gray"},
    { num: 4, orderNum: -1, primaryMin: 10, primaryMax: 10, primaryVal: -1, secondaryVal: -1 ,primaryColor: "Gray", secondaryColor: "Gray"},
    { num: 5, orderNum: -1, primaryMin: 0, primaryMax: 0, primaryVal: -1, secondaryVal: -1 ,primaryColor: "Gray", secondaryColor: "Gray"},
];

defaultInstructions = [
    {
      step: 0,
      text: `Thank you for participating in this research study. The entire study will be completed on the computer in one sitting. First please enter your name and CWID. <form id="loginForm">
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" required>
        </div>
        <div class="mb-3">
            <label for="cwid" class="form-label">CWID</label>
            <input type="text" class="form-control" id="cwid" required>
        </div>`,
        review: false,
    },
    {
      step: 1,
      text: "You will answer a series of questions. In each round, you will be asked to make a charitable contribution to a charity of your choosing out of a sum of money you receive for that round. You can split the sum of money between yourself and the charity however you want. You can even give all of it or keep all of it.",
      review: true,
    },
    {
      step: 2,
      text: "The timeline of this study will be the following: <ol><li>	First choose a charity from a list that will be the recipient of all your donation decisions. <u>Remember: all the donation decisions you make will be directed to the charity you choose.</u> </li><li>Answer a series of six distinct and independent decisions with real stakes. In each decision,  bit will be explained how the sum of money that you can allocate between yourself and the selected charity will be determined by a random spin of a wheel.  The wheels used in each decision are unique and unrelated to those used in the other decision rounds.  Your choice in each round is how you would like to split the sum of money between yourself and the selected charity.</li><li>The computer will select one of the six decisions at random.  Your choice in the selected decision will determine your earnings and the amount given to the charity.</li></ol>",
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
      text: `Choose a recipient for all your donations from the following list of charities: <div class='form-check'><input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio1'><label class='form-check-label' for='charityRadio1'><b> Tuscaloosa Public Library: </b>Description from their <a href = 'https://www.tuscaloosa-library.org/support-the-library/' target='_blank'>website</a>: “The Tuscaloosa Public Library is the City’s and County’s public library for all residents to utilize for their educational, workforce, research and entertainment needs. TPL has been serving this community for more than 100 years and looks to continue that role for the next 100 years. Your gift to the Tuscaloosa Public Library will help maintain the quality of the Library’s collections, diverse programming, informational resources and accessible to technology.”</label></div>
      <div class='form-check'><input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio2'><label class='form-check-label' for='charityRadio2'><b> Tuscaloosa YMCA: </b>Description from their <a href='https://www.ymcatuscaloosa.org/financial' target='_blank'>website</a>: “The YMCA of Tuscaloosa embraces people of all ages, incomes, abilities, religions and ethnic backgrounds; we're for everyone. We work to break barriers of isolation and create the connections between people that add meaning to life. Individuals and families who cannot afford to pay full price for memberships or our programs still deserve the life-enriching experiences the Y offers. At the Y, we never turn anyone away because of an inability to pay.”</label></div>
      <div class='form-check'><input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio3'><label class='form-check-label' for='charityRadio3'> <b>RISE Center: </b>Description from their <a href='https://risecenter.ua.edu/' target='_blank'>website</a>: “The YMCA of Tuscaloosa embraces people of all ages, incomes, abilities, religions and ethnic backgrounds; we're for everyone. We work to break barriers of isolation and create the connections between people that add meaning to life. Individuals and families who cannot afford to pay full price for memberships or our programs still deserve the life-enriching experiences the Y offers. At the Y, we never turn anyone away because of an inability to pay.”</label></div>
      <div class='form-check'><input class='form-check-input' type='radio' name='charityRadioGroup' id='charityRadio4'><label class='form-check-label' for='charityRadio4'><b> Tuscaloosa Metro Animal Shelter: </b>Description from their <a href='https://give.metroanimalshelter.org/give/296293/#!/donation/checkout' target='_blank'>website</a>: "Tuscaloosa Metro Animal Shelter is the only stray receiving facility for Tuscaloosa County, Tuscaloosa City, and the City of Northport. All animals picked up by the three municipal animal control agencies in Tuscaloosa County are brought to TMAS… Every year we get in thousands of lost and abandoned pets into our facility.  Donations from our amazing supporters allow us to treat, rehabilitate, foster, and adopt them out!"</label></div>",
    `
    ,
    review: false,
    },
];

defaultCharities = [
    { name: "Tuscaloosa Public Library", website:"https://www.tuscaloosa-library.org/support-the-library/", description: "The Tuscaloosa Public Library is the City’s and County’s public library for all residents to utilize for their educational, workforce, research and entertainment needs. TPL has been serving this community for more than 100 years and looks to continue that role for the next 100 years. Your gift to the Tuscaloosa Public Library will help maintain the quality of the Library’s collections, diverse programming, informational resources and accessible to technology." },
    {name: "Tuscaloosa YMCA", website: "https://www.ymcatuscaloosa.org/financial", description: "The YMCA of Tuscaloosa embraces people of all ages, incomes, abilities, religions and ethnic backgrounds; we're for everyone. We work to break barriers of isolation and create the connections between people that add meaning to life. Individuals and families who cannot afford to pay full price for memberships or our programs still deserve the life-enriching experiences the Y offers. At the Y, we never turn anyone away because of an inability to pay." },
    {name:"RISE Center at UA", website: "https://risecenter.ua.edu/",description: "RISE was started in 1974 to enrich the lives of infants and preschoolers – both traditional learners and children with varying abilities.  Through early intervention and early childhood preschool services, children at RISE are equipped with the skills necessary to succeed in an inclusive school setting.  Children at RISE receive music therapy, physical therapy, occupational therapy and speech and language therapy in a classroom setting.  Our team of nurses provide medical services to children in need throughout the day.  The program includes seven classrooms led by highly qualified early childhood education teachers that embed individual therapy goals into daily developmentally appropriate activities.  RISE is housed in a state-of-the-art early childhood education facility on the campus of The University of Alabama that is unparalleled in design and accommodations to meet the needs of all children.  RISE is a part of the College of Human Environmental Sciences and provides opportunities for University students to experience evidence-based research practices in the field of early childhood education and early childhood special education.  RISE Center currently serves close to 100 children and their families."},
    {name:"Tuscaloosa Metro Animal Shelter",website:"https://give.metroanimalshelter.org/give/296293/#!/donation/checkout",description: "Tuscaloosa Metro Animal Shelter is the only stray receiving facility for Tuscaloosa County, Tuscaloosa City, and the City of Northport. All animals picked up by the three municipal animal control agencies in Tuscaloosa County are brought to TMAS… Every year we get in thousands of lost and abandoned pets into our facility.  Donations from our amazing supporters allow us to treat, rehabilitate, foster, and adopt them out!"}
]

document.addEventListener("DOMContentLoaded", function() {
    const loginModal = document.getElementById("loginModal");
    //show modal
    loginModal.style.display = "block";

    const sessionNumberInput = document.getElementById("session-number");
    const loadSessionBtn = document.getElementById("load-session");
    const createSessionBtn = document.getElementById("create-session");
    const saveSessionBtn = document.getElementById("save-session");
    const headerContent = document.getElementById("header-content");
    const mainContent = document.getElementById("main-content");

    let newSession = false;

    loadSessionBtn.addEventListener("click", loadSession);
    createSessionBtn.addEventListener("click", createSession);

    const charitiesNav = document.getElementById("charities-btn");
    const proportionsNav = document.getElementById("proportions-btn");


    charitiesNav.addEventListener("click", loadCharities);
    proportionsNav.addEventListener("click", loadProportions);

    function loadSession() {
        // Load session data from Google Sheet
        loginModal.style.display = "none";

      }

    function createSession() {
        newSession = true;
        // Create a new session with default values
        loginModal.style.display = "none";


        // Generate GUID
        const guid = generateGuid();
        
        //Welcome message
        headerContent.innerHTML = `<h1>Admin: Session ${guid}</h1>`;
        loadCharities();
    }

    function saveSession() {
        // Save current session data to Google Sheet
    }



    function loadCharities() {
        // Load charity data and render input fields
        if(newSession){
            renderCharities(defaultCharities);
        }
    }

    function loadProportions() {
        // Load proportions data and render input fields
        if(newSession){
            renderProportions(defaultScenarios);
        }
    }



    function renderCharities(charities) {
        document.getElementById('main-content').innerHTML = `
            <h2>Charities</h2>
                <p>Enter the name, website, and description of each charity. You can add up to 5 charities.</p>
                <div class="charities">
                    ${charities.map((charity, index) => `
                        <div class="charity row mb-3">
                            <div class="col-md-2">
                                <input type="text" class="form-control mb-2" value="${charity.name}" id="charity-name-${index}" placeholder="Charity Name">
                            </div>
                            <div class="col-md-3">
                                <input type="text" class="form-control mb-2" value="${charity.website}" id="charity-website-${index}" placeholder="Charity Website">
                            </div>
                            <div class="col-md-6">
                                <textarea class="form-control mb-2" id="charity-description-${index}" placeholder="Charity Description" rows="1">${charity.description}</textarea>
                            </div>
                            <div class="col-md-1 d-flex align-items-start">
                                <button class="btn btn-outline-secondary mr-1 move-up">↑</button>
                                <button class="btn btn-outline-secondary mr-1 move-down">↓</button>
                                <button class="btn btn-outline-danger delete">🗑️</button>
                            </div>
                        </div>
                    `).join('')}
                    <button id="add-charity" class="btn btn-primary">Add Charity</button>
                </div>
        `;
        document.getElementById("add-charity").addEventListener("click", addCharity);
    }

    function addCharity() {
        const charities = document.querySelector('.charities');
        const charity = document.createElement('div');
        charity.classList.add('charity', 'row', 'mb-3');
        charity.innerHTML = `
            <div class="col-md-2">
                <input type="text" class="form-control mb-2" value="" id="charity-name-${charities.children.length}" placeholder="Charity Name">
            </div>
            <div class="col-md-3">
                <input type="text" class="form-control mb-2" value="" id="charity-website-${charities.children.length}" placeholder="Charity Website">
            </div>
            <div class="col-md-6">
                <textarea class="form-control mb-2" id="charity-description-${charities.children.length}" placeholder="Charity Description" rows="1"></textarea>
            </div>
            <div class="col-md-1 d-flex align-items-start">
                <button class="btn btn-outline-secondary mr-1 move-up">↑</button>
                <button class="btn btn-outline-secondary mr-1 move-down">↓</button>
                <button class="btn btn-outline-danger delete">🗑️</button>
            </div>
        `;
        charities.insertBefore(charity, document.getElementById("add-charity"));

        // Move the "Add Charity" button below the newly added charity
        const addCharityBtn = document.getElementById("add-charity");
        charities.appendChild(addCharityBtn);
    }
    

    function renderProportions(proportions) {
        mainContent.innerHTML = `
            <div class="proportions">
                <h2>Proportions</h2>
                <p>For each of the 6 scenarios, you can set the minimum and maximum values for the primary variable. For example, where the minimum is 2 and maximum is 4, there would be 2 red balls, 6 blue balls, and 2 gray balls.</p>
                ${proportions.map((proportion, index) => `
                    <div class="proportion mb-3">
                        <h3>Scenario ${index + 1}:</h3>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="proportion-primaryMin-${index}" class="input-label">Min</label>
                                <input type="number" class="form-control mb-2" value="${proportion.primaryMin}" id="proportion-primaryMin-${index}">
                            </div>
                            <div class="col-md-6">
                                <label for="proportion-primaryMax-${index}" class="input-label">Max</label>
                                <input type="number" class="form-control mb-2" value="${proportion.primaryMax}" id="proportion-primaryMax-${index}">
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function generateGuid() {
        // Generate a random GUID
        return 'xxx-yxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function showError(message) {
        alert(message);
    }
});
