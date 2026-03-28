// ── Data ──
const skills = [
    { name: "HTML", percent: 75 },
    { name: "CSS", percent: 70 },
    { name: "JavaScript", percent: 45 },
    { name: "React", percent: 20 },
    { name: "Git", percent: 55 }
];

let currentAccent = "#e154a2";

// ── Generate skill bars ──
const skillsList = document.getElementById('skills-list');

skillsList.innerHTML = skills.map((skill, index) => `
    <div class="skill-item">
        <div class="skill-header">
            <span class="skill-name">${skill.name}</span>
            <span class="skill-percent">${skill.percent}%</span>
        </div>
        <div class="skill-bar-track">
            <div class="skill-bar-fill" 
                 id="bar-${index}"
                 data-percent="${skill.percent}">
            </div>
        </div>
    </div>
`).join('');

// ── Flip logic ──
const card = document.getElementById('card');
const flipBtn = document.getElementById('flip-btn');
const flipBackBtn = document.getElementById('flip-back-btn');

flipBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    card.classList.add('flipped');
    animateBars();
});

flipBackBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    card.classList.remove('flipped');
});

// Also flip on card click
card.addEventListener('click', () => {
    card.classList.toggle('flipped');
    if (card.classList.contains('flipped')) {
        animateBars();
    }
});

// ── Animate skill bars ──
const animateBars = () => {
    skills.forEach((skill, index) => {
        const bar = document.getElementById(`bar-${index}`);
        setTimeout(() => {
            bar.style.width = `${skill.percent}%`;
        }, index * 150);
    });
};

// ── Theme switcher ──
const swatches = document.querySelectorAll('.swatch');

const setAccent = (colour) => {
    currentAccent = colour;
    document.documentElement.style.setProperty('--accent', colour);
};

swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
        swatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        setAccent(swatch.dataset.colour);
    });
});