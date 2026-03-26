// Variables
const myName = "Seth Adri";
const daysLeft = 20;
const skills = ["HTML", "CSS", "JavaScript", "React"];

// Template literal
console.log(`My name is ${myName} and I have ${daysLeft} days left`);

// Array operations
console.log(skills.length);
console.log(skills[0]);
skills.push("Git");
console.log(skills);

// Object
const developer = {
    name: myName,
    location: "England",
    learning: true
};

console.log(developer.name);
console.log(`${developer.name} is based in ${developer.location}`);

// Select the h1 and log it
const heading = document.querySelector('h1');
console.log(heading);

// Change the subtitle text dynamically
const subtitle = document.querySelector('.hero-subtitle');
subtitle.textContent = "Frontend Developer in training — Day 10 of 30";

// Add a class to the first section
const firstSection = document.querySelector('section');
firstSection.classList.add('active');

// Log how many sections exist
const allSections = document.querySelectorAll('section');
console.log(`There are ${allSections.length} sections on this page`);

const viewWorkBtn = document.querySelector('.btn-primary');
let clickCount = 0;

viewWorkBtn.addEventListener('click', (event) => {
    event.preventDefault();   // stops it jumping to #projects for now
    clickCount++;
    console.log(`Button clicked ${clickCount} time(s)`);
    
    if (clickCount === 3) {
        viewWorkBtn.textContent = "You really want to see my work!";
    }
});

const skillcard = document.querySelectorAll('.skill-card');
skillcard.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('selected');
    });
});

