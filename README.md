# CivicPulse | 2026 Election Assistant

CivicPulse is a smart, dynamic assistant designed to help users navigate the complex 2026 US Midterm election cycle. It simplifies the voting process through interactive guidance, personalized timelines, and deep integration with simulated Google Services.

## 🏛️ Chosen Vertical: First-Time Voter & Civic Engagement
The solution is designed for **First-Time Voters** and **Busy Professionals** who need a clear, step-by-step roadmap to the polls. It focuses on lowering the barrier to entry for civic participation.

## 🧠 Approach and Logic
The application uses a **Modular State-Driven Architecture**:
- **State Management**: A centralized `state` object tracks user persona, registration status, selected state, and political interests.
- **Adaptive Conversation**: The AI Assistant (CivicPulse) uses a decision-tree logic that adapts its questions and advice based on the user's previous answers.
- **Reactive UI**: The Dashboard and Timeline components listen to state changes (e.g., selecting "Texas" updates the primary election dates in the timeline).
- **Gamification**: A **"Voter Power" progress bar** on the dashboard motivates users by visualizing their journey to being 100% election-ready.
- **Interactive Modals**: Detailed state deadlines and FAQs are now accessible via a sleek modal system within the Resources tab.

## 🛠️ How the Solution Works
1.  **Onboarding**: The user is greeted by the CivicPulse assistant, which identifies their experience level.
2.  **State & Interests**: The assistant collects the user's voting state and issues they care about (Economy, Climate, etc.).
3.  **Interactive Timeline**: Users can switch to the Timeline view to see a roadmap of the 2026 cycle tailored to their state.
4.  **Google Services Integration**:
    - **Google Maps**: Visualizes the nearest polling place (simulated).
    - **Google Calendar**: Generates a deep link to add Election Day to the user's real calendar.
    - **Gmail**: Simulates emailing a custom "Voting Plan" summary.
5.  **Completion**: Once the plan is created, the user reaches 100% "Voter Power" and receives a customized roadmap.

## 🏁 How to Run
- **Standard**: Open [`index.html`](file:///c:/Users/Amruta/Desktop/Projects/civicpulse/index.html) in any modern browser.
- **Simplified**: Open [`CLICK_ME_CIVICPULSE.html`](file:///c:/Users/Amruta/Desktop/Projects/CLICK_ME_CIVICPULSE.html) for a single-file, zero-dependency experience.

## 📋 Assumptions Made
- **2026 Schedule**: Assumes the US Midterm General Election is on November 3, 2026.
- **Demo States**: Specific primary dates are provided for California and Texas; other states use a generic 2026 range.
- **API Simulation**: Google Services (Maps, Calendar, Search) are simulated with real UI logic to demonstrate integration capabilities without requiring active API keys.

## 🚀 Technical Stack
- **Structure**: Semantic HTML5
- **Logic**: Modern Vanilla JavaScript (ES Modules)
- **Styling**: Premium Vanilla CSS (Glassmorphism, CSS Variables, Keyframe Animations)
- **Design**: "Civic Blue & Gold" professional palette.
