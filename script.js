document.addEventListener("DOMContentLoaded", function () {
    fetch("https://docs.google.com/spreadsheets/d/1xsz1l9reLyakcG1cQBZjytMJ6KZF0zX8Zac4a_YE4C0/export?format=csv")
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").slice(1); // Skip header row
            const categories = {};

            rows.forEach(row => {
                const columns = row.split(",");
                if (columns.length < 7) return;

                const [id, name, thumbnail, episode_id, episode_name, embed_code, category] = columns.map(col => col.trim());

                if (!categories[category]) {
                    categories[category] = [];
                }

                categories[category].push({ id, name, thumbnail, episode_id, episode_name, embed_code });
            });

            // Inject Categories & Episodes into HTML
            const moviesContainer = document.getElementById("movies-container");
            Object.keys(categories).forEach(category => {
                const categoryDiv = document.createElement("div");
                categoryDiv.innerHTML = `<h2 class="category">${category}</h2>
                    <div class="movie-row">
                        ${categories[category].map(episode => `
                            <div class="episode" data-embed="${episode.embed_code}">
                                <img src="${episode.thumbnail}" alt="${episode.name} - ${episode.episode_name}">
                                <div class="episode-info">${episode.name} - ${episode.episode_name}</div>
                            </div>
                        `).join("")}
                    </div>`;

                moviesContainer.appendChild(categoryDiv);
            });

            // Add Click Event to Episodes (Open Modal)
            document.querySelectorAll(".episode").forEach(episode => {
                episode.addEventListener("click", function () {
                    const embedCode = this.getAttribute("data-embed");
                    document.getElementById("video-player").innerHTML = embedCode;
                    document.getElementById("video-modal").style.display = "block";
                });
            });

            // Close Modal
            document.querySelector(".close").addEventListener("click", function () {
                document.getElementById("video-modal").style.display = "none";
                document.getElementById("video-player").innerHTML = "";
            });
        })
        .catch(error => console.error("Error loading movies:", error));
});