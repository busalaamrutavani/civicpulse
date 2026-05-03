let appState;

const conversationTree = {
    start: {
        text: "Hi! I'm your CivicPulse assistant. I'm here to help you get ready for the 2026 Midterm Elections. Are you a first-time voter?",
        options: [
            { text: "Yes, I'm new to this!", next: "first_time" },
            { text: "No, I've voted before.", next: "experienced" }
        ]
    },
    first_time: {
        text: "Exciting! First-time voters are the backbone of democracy. Which state will you be voting in? (This helps me find your local deadlines).",
        options: [
            { text: "California", next: "check_reg", data: { state: 'California' } },
            { text: "Texas", next: "check_reg", data: { state: 'Texas' } },
            { text: "New York", next: "check_reg", data: { state: 'New York' } },
            { text: "Florida", next: "check_reg", data: { state: 'Florida' } }
        ]
    },
    check_reg: {
        text: "Got it! Are you registered to vote in your state?",
        options: [
            { text: "Yes", next: "issue_discovery" },
            { text: "Not sure", next: "how_to_reg" }
        ]
    },
    issue_discovery: {
        text: "Great! What issues do you care most about in this election? (Select one to start)",
        options: [
            { text: "The Economy", next: "issue_info", data: { interest: 'Economy' } },
            { text: "Climate Change", next: "issue_info", data: { interest: 'Climate' } },
            { text: "Healthcare", next: "issue_info", data: { interest: 'Healthcare' } }
        ]
    },
    issue_info: {
        text: "Important choice. In 2026, many state races will focus on this. I've added a curated 'Voter Guide' to your resources. Ready to create your voting plan?",
        options: [
            { text: "Yes, let's do it!", next: "voter_plan" }
        ]
    },
    voter_plan: {
        text: "Your Plan: Vote in {state}, focused on {interest}. Election Day: Nov 3, 2026. I can email this to you or add it to your Google Calendar!",
        options: [
            { text: "Add to Calendar", next: "anything_else" },
            { text: "Email Me", next: "anything_else" }
        ]
    },
    experienced: {
        text: "Welcome back! Glad to have a seasoned voter here. Do you need a refresher on the 2026 timeline or are you looking for polling places?",
        options: [
            { text: "Show me the timeline.", next: "timeline_info" },
            { text: "Find polling places.", next: "map_info" }
        ]
    },
    how_to_reg: {
        text: "No problem! Most states allow you to register online. It takes less than 5 minutes. Would you like me to send you the link for your state?",
        options: [
            { text: "Yes, please!", next: "state_select" },
            { text: "Later, thanks.", next: "anything_else" }
        ]
    },
    timeline_info: {
        text: "The 2026 Midterms are on November 3rd. Primaries happen between March and September. I've added the General Election to your dashboard roadmap!",
        options: [
            { text: "Great, what's next?", next: "anything_else" }
        ]
    },
    anything_else: {
        text: "Is there anything else I can help you with today?",
        options: [
            { text: "Check Registration", next: "check_reg" },
            { text: "Find My Polling Place", next: "map_info" },
            { text: "Done for now.", next: "exit" }
        ]
    },
    exit: {
        text: "Happy voting! I'll be here if you need more help. See you at the polls on Nov 3rd!",
        options: []
    }
};

import { showPollingMap } from './googleServices.js';

export function initAssistant(state) {
    appState = state;
    const bubble = document.getElementById('assistant-bubble');
    const window = document.getElementById('assistant-window');
    const closeBtn = document.getElementById('close-assistant');
    const chatHistory = document.getElementById('chat-history');

    bubble.addEventListener('click', () => {
        window.classList.toggle('hidden');
        if (!window.classList.contains('hidden') && chatHistory.children.length === 0) {
            startConversation();
        }
    });

    closeBtn.addEventListener('click', () => {
        window.classList.add('hidden');
    });
}

function startConversation() {
    renderStep('start');
}

function renderStep(stepKey) {
    const step = conversationTree[stepKey];
    if (!step) return;

    let text = step.text;
    // Handle Placeholders
    if (appState.user.state) text = text.replace('{state}', appState.user.state);
    if (appState.user.interests.length > 0) text = text.replace('{interest}', appState.user.interests[0]);

    addMessage(text, 'ai');

    // Special logic for Maps
    if (stepKey === 'map_info') {
        const map = showPollingMap();
        document.getElementById('chat-history').appendChild(map);
    }

    const optionsContainer = document.getElementById('chat-options');
    optionsContainer.innerHTML = '';

    step.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn-option';
        btn.textContent = opt.text;
        btn.onclick = () => {
            addMessage(opt.text, 'user');
            
            // Handle Data Storage
            if (opt.data) {
                if (opt.data.state) {
                    appState.user.state = opt.data.state;
                    updateVoterPower(60);
                }
                if (opt.data.interest) {
                    appState.user.interests.push(opt.data.interest);
                    updateVoterPower(80);
                }
            }

            // Handle Phase 2 actions
            if (opt.text === 'Add to Calendar') {
                window.openCalendar();
                updateVoterPower(100);
            }
            if (opt.text === 'Email Me') {
                simulateEmailPlan(appState);
                updateVoterPower(100);
            }
            if (opt.text === 'Yes' && stepKey === 'check_reg') updateVoterPower(40);

            setTimeout(() => renderStep(opt.next), 600);
            
            // Logic: Update state based on choices
            if (stepKey === 'start' && opt.text.includes('Yes')) {
                appState.user.persona = 'first-time';
            }
        };
        optionsContainer.appendChild(btn);
    });
}

function addMessage(text, sender) {
    const chatHistory = document.getElementById('chat-history');
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}-bubble`;
    bubble.textContent = text;
    chatHistory.appendChild(bubble);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}
