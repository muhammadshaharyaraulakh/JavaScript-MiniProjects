
const search = document.getElementById('action');
search.addEventListener('click', () => {
    fetchProfile();
})
async function fetchProfile() {

    const username = document.getElementById('username').value;
    const card = document.getElementById('profile-card');

    if (!username) return;

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();

        if (data.message === "Not Found") {
            alert("User not found!");
            return;
        }

        card.innerHTML = `
            <img src="${data.avatar_url}" class="profile-pic" alt="Avatar">
            <h2>${data.name || data.login}</h2>
            <p>${data.bio || 'No bio available'}</p>
            <div style="display: flex; justify-content: space-around; margin-top: 20px;">
                <span><strong>${data.followers}</strong> Followers</span>
                <span><strong>${data.public_repos}</strong> Repositories</span>
            </div>
            <a href="${data.html_url}" target="_blank" style="display: inline-block; margin-top: 20px; color: #38bdf8; text-decoration: none;">View Profile</a>
        `;

        // Trigger animation
        card.classList.remove('show');
        setTimeout(() => card.classList.add('show'), 100);

        // Subtle color shift based on the profile
        document.querySelector('.background-glow').style.background =
            `radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)`;

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
