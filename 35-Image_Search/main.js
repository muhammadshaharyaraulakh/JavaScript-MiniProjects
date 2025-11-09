
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const imageResults = document.getElementById("imageResults");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");


    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");
    });


    async function searchImages(query) {
        imageResults.innerHTML = "<p>Loading...</p>";
        try {
            const response = await fetch(`https://api.openverse.org/v1/images?q=${encodeURIComponent(query)}`);
            const data = await response.json();

            if (!data.results || data.results.length === 0) {
                imageResults.innerHTML = "<p>No results found.</p>";
                return;
            }

            imageResults.innerHTML = ""; 

            data.results.forEach(image => {
                const imageCard = document.createElement("div");
                imageCard.classList.add("image-card");

                imageCard.innerHTML = `
                    <a href="${image.foreign_landing_url}" target="_blank" rel="noopener noreferrer">
                        <img src="${image.thumbnail || image.url}" alt="${image.title || "Image"}">
                    </a>
                `;

                imageResults.appendChild(imageCard);
            });
        } catch (error) {
            console.error("Error fetching images:", error);
            imageResults.innerHTML = "<p>Error loading images. Please try again later.</p>";
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