export function initGoogleServices() {
    renderNewsFeed();
    setupCalendarLink();
}

function renderNewsFeed() {
    const feed = document.getElementById('news-feed');
    if (!feed) return;

    const news = [
        { title: "Voter Turnout Projected to Hit Records in 2026", source: "Google News", time: "2h ago" },
        { title: "Key Races to Watch: The Fight for the Senate", source: "Election Daily", time: "5h ago" },
        { title: "New Polling Laws: What You Need to Know", source: "Civic Watch", time: "1d ago" }
    ];

    feed.innerHTML = news.map(item => `
        <div class="news-item" style="padding: 1rem 0; border-bottom: 1px solid var(--glass-border);">
            <h4 style="font-size: 1rem; margin-bottom: 0.25rem;">${item.title}</h4>
            <div style="display: flex; gap: 1rem; font-size: 0.8rem; color: var(--text-dim);">
                <span>${item.source}</span>
                <span>•</span>
                <span>${item.time}</span>
            </div>
        </div>
    `).join('');
}

function setupCalendarLink() {
    // This function would be called when the user clicks 'Add to Calendar' in the assistant
    // It creates a deep link to Google Calendar with the election details
    const event = {
        title: '2026 Midterm Election Day',
        details: 'Time to vote! Polls open 7AM - 8PM.',
        date: '20261103T070000Z/20261103T200000Z'
    };
    const link = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.details)}&dates=${event.date}`;
    
    // We'll expose this to the assistant
    window.openCalendar = () => {
        window.open(link, '_blank');
        alert("Simulating: Opening Google Calendar with Election Day event...");
    };
}

export function simulateEmailPlan(state) {
    const planSummary = `Your 2026 Voting Plan for ${state.user.state}:\n- Issues: ${state.user.interests.join(', ')}\n- Election Day: Nov 3, 2026\n- Location: Main Street Library`;
    
    console.log("Simulating Gmail Send:", planSummary);
    
    const toast = document.createElement('div');
    toast.className = 'glass';
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.padding = '1rem 2rem';
    toast.style.zIndex = '2000';
    toast.style.border = '1px solid var(--success)';
    toast.innerHTML = `<strong>📧 Plan Emailed!</strong> Check your Gmail inbox for your custom voting roadmap.`;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 4000);
}

// Simulated Google Maps Polling Place Finder
export function showPollingMap(location) {
    const mapContainer = document.createElement('div');
    mapContainer.className = 'glass';
    mapContainer.style.height = '300px';
    mapContainer.style.marginTop = '1rem';
    mapContainer.style.display = 'flex';
    mapContainer.style.alignItems = 'center';
    mapContainer.style.justifyContent = 'center';
    mapContainer.style.background = 'url("https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=14&size=600x300&key=MOCK_KEY")'; // Mock URL
    mapContainer.innerHTML = `
        <div style="background: white; color: black; padding: 1rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
            <strong>Main Street Library</strong><br>
            123 Democracy Ave, New York, NY<br>
            <span style="color: var(--success); font-size: 0.8rem;">● Open 7AM - 8PM</span>
            <button class="btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem; margin-top: 0.5rem; display: block;" onclick="alert('Opening Google Maps Directions...')">Get Directions</button>
        </div>
    `;
    return mapContainer;
}
