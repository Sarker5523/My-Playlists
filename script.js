document.addEventListener("DOMContentLoaded", function () {
    fetch("https://docs.google.com/spreadsheets/d/1xsz1l9reLyakcG1cQBZjytMJ6KZF0zX8Zac4a_YE4C0/export?format=csv")
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").slice(1); // Remove header row
            const moviesContainer = document.getElementById("movies-container");

            rows.forEach(row => {
                const columns = row.split(",");
                if (columns.length < 3) return;

                const [thumbnail, title, category] = columns;

                const movieDiv = document.createElement("div");
                movieDiv.classList.add("movie");

                movieDiv.innerHTML = `
                    <img src="${thumbnail.trim()}" alt="${title.trim()}">
                    <div class="movie-title">${title.trim()}</div>
                    <div class="movie-category">${category.trim()}</div>
                `;

                moviesContainer.appendChild(movieDiv);
            });
        })
        .catch(error => console.error("Error loading movies:", error));
});