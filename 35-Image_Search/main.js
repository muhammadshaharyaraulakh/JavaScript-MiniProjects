

const API_KEY = "52494397-6316a7f709721b7f7d2a25c51";

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const imageResults = document.getElementById("imageResults");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navLinks.classList.toggle("active");
        });
    }

    async function searchImages(query) {
        if (!API_KEY) {
            imageResults.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
                    <h3 style="margin-bottom: 10px; color: #6C63FF; font-family: Montserrat, sans-serif;">Pixabay API Key Required</h3>
                    <p style="margin-bottom: 15px; color: #555;">Please enter your free Pixabay API key in <code>const API_KEY = "";</code> at the top of <code>main.js</code>.</p>
                    <a href="https://pixabay.com/api/docs/" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 22px; background: #6C63FF; color: #fff; text-decoration: none; border-radius: 50px; font-weight: 600;">
                        Get Free Pixabay API Key &rarr;
                    </a>
                </div>
            `;
            return;
        }

        imageResults.innerHTML = "<p style='grid-column: 1 / -1; text-align: center; font-size: 1.2rem; color: #555;'>Loading images</p>";

        try {
            const url = `https://pixabay.com/api/?key=${encodeURIComponent(API_KEY)}&q=${encodeURIComponent(query)}&image_type=photo&per_page=24&safesearch=true`;
            const response = await fetch(url);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `HTTP Error ${response.status}`);
            }

            const data = await response.json();

            if (!data.hits || data.hits.length === 0) {
                imageResults.innerHTML = "<p style='grid-column: 1 / -1; text-align: center; font-size: 1.2rem; color: #666;'>No results found. Please try another search term.</p>";
                return;
            }

            imageResults.innerHTML = "";

            data.hits.forEach(image => {
                const imageCard = document.createElement("div");
                imageCard.classList.add("image-card");

                imageCard.innerHTML = `
                    <a href="${image.pageURL}" target="_blank" rel="noopener noreferrer">
                        <img src="${image.webformatURL}" alt="${image.tags || 'Pixabay photo'}" loading="lazy">
                    </a>
                `;

                imageResults.appendChild(imageCard);
            });
        } catch (error) {
            console.error("Error fetching images:", error);
            imageResults.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: #e74c3c;">
                    <p><strong>Error loading images:</strong> ${error.message}</p>
                    <p style="color: #666; font-size: 0.9rem; margin-top: 8px;">Please verify your API key at <a href="https://pixabay.com/api/docs/" target="_blank" rel="noopener noreferrer" style="color: #6C63FF;">pixabay.com/api/docs/</a></p>
                </div>
            `;
        }
    }

    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            searchImages(query);
        }
    });

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            searchButton.click();
        }
    });
});