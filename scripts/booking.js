/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?

let dailyRate = 35; 
let dayCounter = 0;
const selectedDays = new Set(); 
const daysOfWeek = document.querySelectorAll(".day-selector li");
const calculatedCostElement = document.getElementById("calculated-cost");
const halfDayButton = document.getElementById("half");
const fullDayButton = document.getElementById("full");
const clearButton = document.getElementById("clear-button");

//ANS = yes these variables need to be initialized when the page is loaded to ensure website starts in a consistent state.

document.addEventListener("DOMContentLoaded", () => {
    dailyRate = 35;
    dayCounter = 0;
    selectedDays.clear();
    daysOfWeek.forEach(day => {
        day.classList.remove("clicked");
    });
    halfDayButton.classList.remove("clicked");
    fullDayButton.classList.add("clicked");
    updateCost();
});

//ANS = they need to be reset depending upon user interactions.


/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!

daysOfWeek.forEach(day => {
    day.addEventListener("click", () => {
        if (!day.classList.contains("clicked")) {
            day.classList.add("clicked");
            selectedDays.add(day);
            dayCounter++;
        } else {
            day.classList.remove("clicked");
            selectedDays.delete(day);
            dayCounter--;
        }
        updateCost();
    });
});

/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

clearButton.addEventListener("click", () => {
    daysOfWeek.forEach(day => {
        day.classList.remove("clicked");
    });
    selectedDays.clear();
    dayCounter = 0;
    halfDayButton.classList.remove('clicked');
    fullDayButton.classList.add('clicked');
    dailyRate = 35;
    updateCost();
});

/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.

halfDayButton.addEventListener("click", () => {
    dailyRate = 20;
    halfDayButton.classList.add("clicked");
    fullDayButton.classList.remove("clicked");
    updateCost();
});

// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.

fullDayButton.addEventListener("click", () => {
    dailyRate = 35;
    fullDayButton.classList.add("clicked");
    halfDayButton.classList.remove("clicked");
    updateCost();
});

/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function updateCost() {
    const totalCost = dayCounter * dailyRate;
    calculatedCostElement.innerHTML = `${totalCost}`;
}