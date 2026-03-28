
// ── Portfolio data — defined first ──
const portfolio = {
    owner: {
        name: "Seth Adri",
        location: "England",
        available: true
    },
    skills: [
        { name: "HTML", level: "intermediate", months: 1 },
        { name: "CSS", level: "intermediate", months: 1 },
        { name: "JavaScript", level: "beginner", months: 0.5 },
        { name: "React", level: "beginner", months: 0 }
    ],
    projects: [
        { name: "Portfolio page", tech: "HTML/CSS", complete: true, url: "#" },
        { name: "Weather app", tech: "JavaScript", complete: false, url: null }
    ]
};

// ── DOM setup ──
const skillsGrid = document.querySelector('.skills-grid');

skillsGrid.innerHTML = portfolio.skills.map((skill) => `
    <div class="skill-card">
        <h3>${skill.name}</h3>
        <p>${skill.level} — ${skill.months} month${skill.months !== 1 ? 's' : ''}</p>
    </div>
`).join('');

// ── Skill card toggle ──
const skillcard = document.querySelectorAll('.skill-card');
skillcard.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('selected');
    });
});



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

const oldprojects = [
    { name: "Portfolio page", tech: "HTML/CSS", complete: true },
    { name: "Weather app", tech: "JavaScript", complete: false },
    { name: "Todo app", tech: "React", complete: false },
    { name: "Interactive card", tech: "CSS/JS", complete: true }
];



// 1. Filter — get only completed projects
const completedProjects = oldprojects.filter((project) => project.complete);
console.log("Completed:", completedProjects);

// 2. Map — get just the names
const projectNames = oldprojects.map((project) => project.name);
console.log("Names:", projectNames);

// 3. Find — get the weather app specifically
const weatherApp = oldprojects.find((project) => project.name === "Weather app");
console.log("Weather app:", weatherApp);

// 4. Chain — get names of incomplete projects only
const incompleteNames = oldprojects
    .filter((project) => !project.complete)
    .map((project) => project.name);
console.log("Incomplete:", incompleteNames);



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

// ── Tabs component ──
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;

        // Remove active from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Add active to clicked button
        button.classList.add('active');

        // Add active to matching panel
        document.getElementById(`tab-${targetTab}`).classList.add('active');
    });
});
// ── Character counter ──
const messageInput = document.getElementById('message');
const charCount = document.querySelector('.char-count');
const maxChars = 300;

messageInput.addEventListener('input', () => {
    const currentLength = messageInput.value.length;
    const remaining = maxChars - currentLength;
    
    charCount.textContent = `${currentLength} / ${maxChars} characters`;
    
    charCount.classList.remove('warning', 'danger');
    
    if (remaining < 50) {
        charCount.classList.add('danger');
    } else if (remaining < 100) {
        charCount.classList.add('warning');
    }
});

const filterButtons = document.querySelectorAll('.filter-btn');
const articles = document.querySelectorAll('article');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Show/hide articles based on filter
        articles.forEach(article => {
            if (filter === 'all' || article.dataset.tech === filter) {
                article.style.display = '';
            } else {
                article.style.display = 'none';
            }
        });
    });
});

// Object destructuring

const { name: portfolioOwner, location: ownerLocation, available } = portfolio.owner;
console.log(`${portfolioOwner} is based in ${ownerLocation}`);
console.log(`Available for work: ${available}`);

// Array destructuring
const [firstSkill, secondSkill, ...otherSkills] = portfolio.skills;
console.log(`First skill: ${firstSkill.name}`);
console.log(`Other skills:`, otherSkills.map(s => s.name));

// Nested destructuring
const { owner: { name: ownerName } } = portfolio;
console.log(`Owner: ${ownerName}`);

// Object.entries to display all owner info
console.log("=== Owner info ===");
Object.entries(portfolio.owner).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});

// Sort skills by months of experience
const sortedSkills = [...portfolio.skills].sort((a, b) => b.months - a.months);
console.log("Skills by experience:", sortedSkills.map(s => s.name));

// Check if all projects have a URL
const allHaveUrls = portfolio.projects.every(p => p.url !== null);
console.log(`All projects have URLs: ${allHaveUrls}`);

// Get only skills at intermediate level
const intermediateSkills = portfolio.skills
    .filter(s => s.level === "intermediate")
    .map(s => s.name);
console.log("Intermediate skills:", intermediateSkills);
 

const getPortfolioSummary = ({ owner, skills, projects }) => {
    const completedCount = projects.filter(p => p.complete).length;
    const status = owner.available ? "Currently available for work." : "Not currently available.";
    return `${owner.name} has ${skills.length} skills and ${completedCount} completed project. ${status}`;
};

console.log(getPortfolioSummary(portfolio));  