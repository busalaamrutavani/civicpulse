import { initAssistant } from './components/assistant.js';
import { initTimeline } from './components/timeline.js';
import { initGoogleServices } from './components/googleServices.js';

// Application State
const state = {
    user: {
        registered: false,
        persona: null, // 'first-time', 'seasoned', 'busy'
        location: null,
        state: null, // e.g., 'California'
        interests: [] // e.g., ['Economy', 'Climate']
    },
    currentView: 'dashboard'
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Components
    initAssistant(state);
    initTimeline(state);
    initGoogleServices();

    // Navigation Logic
    const navButtons = {
        'nav-dashboard': 'dashboard-view',
        'nav-timeline': 'timeline-view',
        'nav-resources': 'resources-view'
    };

    Object.keys(navButtons).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', () => {
                const viewId = navButtons[btnId];
                switchView(viewId);
                updateNavActive(btnId);
                
                // Refresh timeline data if entering timeline view
                if (viewId === 'timeline-view') {
                    initTimeline(state);
                }
            });
        }
    });

    // Start Onboarding
    const startBtn = document.getElementById('start-onboarding');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            document.getElementById('assistant-bubble').click();
        });
    }

    // Countdown Timer (November 3, 2026)
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Modal Listeners
    setupModals();
});

function setupModals() {
    const modals = {
        'view-deadlines': 'deadlines-modal',
        'read-faq': 'faq-modal'
    };

    Object.keys(modals).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', () => {
                document.getElementById(modals[btnId]).classList.add('active');
            });
        }
    });

    ['close-deadlines', 'close-faq'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').classList.remove('active');
            });
        }
    });
}

function switchView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active');
    }
}

function updateNavActive(activeId) {
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    document.getElementById(activeId).classList.add('active');
}

function updateCountdown() {
    const electionDate = new Date('November 3, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = electionDate - now;

    if (distance < 0) {
        document.getElementById('countdown-timer').innerHTML = "ELECTION DAY IS HERE!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById('countdown-timer').innerHTML = `${days}d Left`;
}

export function updateVoterPower(percent) {
    const bar = document.getElementById('power-bar');
    const text = document.getElementById('power-percent');
    if (bar && text) {
        bar.style.width = `${percent}%`;
        text.innerText = `${percent}%`;
    }
}

export { state };
