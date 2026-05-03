const milestones = [
    { date: 'Jan 2026', title: 'Campaign Kickoff', desc: 'Candidates begin filing and fundraising.' },
    { date: 'Mar - Sep 2026', title: 'Primary Elections', desc: 'States hold primaries to select general election candidates.' },
    { date: 'Oct 5, 2026', title: 'Registration Deadline', desc: 'Final day to register in many states.' },
    { date: 'Oct 20, 2026', title: 'Early Voting Begins', desc: 'Mail-in and early in-person voting opens.' },
    { date: 'Nov 3, 2026', title: 'Election Day', desc: 'Polls open nationwide for the Midterms.' }
];

export function initTimeline(state) {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    let displayMilestones = [...milestones];
    
    // Simulate state-specific primary dates
    if (state && state.user.state === 'California') {
        displayMilestones[1] = { date: 'June 2, 2026', title: 'California Primaries', desc: 'State and local primary elections.' };
    } else if (state && state.user.state === 'Texas') {
        displayMilestones[1] = { date: 'March 3, 2026', title: 'Texas Primaries', desc: 'The first major primary of the 2026 cycle.' };
    }

    const timelineHtml = displayMilestones.map((m, i) => `
        <div class="timeline-item glass" style="margin-bottom: 1.5rem; padding: 1.5rem; transition-delay: ${i * 0.1}s">
            <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <div class="timeline-date" style="background: var(--primary); padding: 0.5rem; border-radius: 8px; font-weight: 700; min-width: 100px; text-align: center;">
                    ${m.date}
                </div>
                <div>
                    <h3 style="margin-bottom: 0.5rem; color: var(--accent);">${m.title}</h3>
                    <p style="color: var(--text-dim); line-height: 1.5;">${m.desc}</p>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = `<div style="max-width: 700px; margin: 0 auto; padding-top: 2rem;">${timelineHtml}</div>`;
}
