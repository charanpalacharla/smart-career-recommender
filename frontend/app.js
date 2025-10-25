// Typing animation
const typingText = "Discover your perfect career path using AI 🔍";
let index = 0;
function typeEffect() {
  if (index < typingText.length) {
    document.getElementById("ai-typing").innerHTML += typingText.charAt(index);
    index++;
    setTimeout(typeEffect, 45);
  }
}
window.addEventListener("load", () => {
  typeEffect();
  // particles config
  particlesJS("particles-js", {
    particles: {
      number: { value: 70 },
      color: { value: "#00eaff" },
      shape: { type: "circle" },
      opacity: { value: 0.45 },
      size: { value: 3 },
      move: { speed: 2 },
      line_linked: { enable: true, distance: 140, color: "#00eaff", opacity: 0.25, width: 1 }
    }
  });
});

// Form submit & API call
const form = document.getElementById("careerForm");
const resultBox = document.getElementById("result");
const suggestionsList = document.getElementById("suggestionsList");
const saveBtn = document.getElementById("saveBtn");

document.getElementById("careerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim() || "Anonymous";
  const email = document.getElementById("email").value.trim() || "";
  const skillsRaw = document.getElementById("skills").value.trim();
  const interestsRaw = document.getElementById("interests").value.trim();

  const skills = skillsRaw ? skillsRaw.split(",").map(s => s.trim()) : [];
  const interests = interestsRaw || "";

  resultBox.classList.remove("hidden");
  suggestionsList.innerHTML = "<li>🤖 Genie is thinking...</li>";

  try {
    const resp = await fetch("http://127.0.0.1:8000/api/users/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, skills, interests })
    });
    const data = await resp.json();
    const suggestions = [data.recommendedCareer || data.career].filter(Boolean);

    suggestionsList.innerHTML = suggestions.map(s => `<li>✨ ${s}</li>`).join("");
    const utter = new SpeechSynthesisUtterance(`Hey ${name}, I suggest: ${suggestions.join(", ")}`);
    window.speechSynthesis.speak(utter);
  } catch (err) {
    console.error(err);
    suggestionsList.innerHTML = "<li>❌ Could not connect to backend. Make sure backend is running.</li>";
  }
});

// Save again small animation
saveBtn?.addEventListener('click', () => {
  saveBtn.textContent = 'Saved ✓';
  setTimeout(()=> saveBtn.textContent = 'Save again', 1200);
});
