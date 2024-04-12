# Economic Experiment Web Application Software

This repository contains a web application designed for an ongoing research project at The University of Alabama titled "Income Ambiguity and Charitable Giving: Evidence from the Lab." It simulates an economic experiment where participants make charitable donations based on randomly determined scenarios.

## Project Overview

This application allows randomly assigns users into one of two treatment groups--state-contingent or not--to participate in a study where they make decisions on charitable contributions based on the outcomes of a randomized spin. After the participant makes a decision for each scenario, a random one is selected and played out to determine the final donation and the participant's reward.

## Features
- **Experimential Design:** Treatment groups are randomly assigned and the order of scenarios are shuffled each reload.
- **Dynamic Content Loading:** Scenarios and results are dynamically loaded as the user progresses through the experiment.
- **Chart Visualizations:** Utilizes Chart.js to visually represent decision outcomes and probabilities.
- **Input Verifications:** Users must correctly answer comprehension checks in the instructions to progress. The input fields are also checked for valid answers within the input range.
