// 1. A function that takes a name and days remaining
//    and returns a personalised message
const getProgressMessage = (name, daysLeft) => {
    return `${name} is ${daysLeft} days into their frontend journey`;
};

console.log(getProgressMessage("Seth", 20));

// 2. A function with a default parameter
const getDayGreeting = (day = "today") => {
    return `Let's learn something new ${day}`;
};

console.log(getDayGreeting("Monday"));
console.log(getDayGreeting());

// 3. A function that returns an object
const createSkill = (name, level) => ({
    name,           // shorthand for name: name
    level,
    isLearning: true
});

const html = createSkill("HTML", "beginner");
const css = createSkill("CSS", "intermediate");
console.log(html);
console.log(css);

const projects = [
    { name: "Portfolio page", tech: "HTML/CSS", complete: true },
    { name: "Weather app", tech: "JavaScript", complete: false },
    { name: "Todo app", tech: "React", complete: false },
    { name: "Interactive card", tech: "CSS/JS", complete: true }
];

// 1. Filter — get only completed projects
const completedProjects = projects.filter((project) => project.complete);
console.log("Completed:", completedProjects);

// 2. Map — get just the names
const projectNames = projects.map((project) => project.name);
console.log("Names:", projectNames);

// 3. Find — get the weather app specifically
const weatherApp = projects.find((project) => project.name === "Weather app");
console.log("Weather app:", weatherApp);

// 4. Chain — get names of incomplete projects only
const incompleteNames = projects
    .filter((project) => !project.complete)
    .map((project) => project.name);
console.log("Incomplete:", incompleteNames);

// Clear existing cards
skillsGrid.innerHTML = '';

// Generate new cards from data
skillsGrid.innerHTML = skillsData.map((skill) => `
    <div class="skill-card">
        <h3>${skill.name}</h3>
        <p>${skill.description}</p>
    </div>
`).join('');

const skillcard = document.querySelectorAll('.skill-card');
skillcard.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('selected');
    });
});

const skillsData = [
    { name: "HTML", description: "Structuring web pages semantically" },
    { name: "CSS", description: "Styling and layout" },
    { name: "JavaScript", description: "Making things interactive" },
    { name: "React", description: "Building modern web apps" }
];

const skillsGrid = document.querySelector('.skills-grid');



const getSkillLevel = (skill) => {
    switch (skill) {
        case "HTML":
            return "Solid foundation";  
        case "CSS":
            return "Getting advanced";   
        case "JavaScript":
            return "Building fast";
        case "React":
            return "Coming soon";
        default:
           return "unknown skill";
    }
};

console.log(getSkillLevel("HTML"));
console.log(getSkillLevel("CSS"));
console.log(getSkillLevel("JavaScript"));
console.log(getSkillLevel("React"));
console.log(getSkillLevel("Python"));