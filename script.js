// Function to handle intersection changes
function file2_handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // If the element is intersecting the viewport, add the 'show' class
            entry.target.classList.add('show');
        }
    });
}

// Create a new Intersection Observer
const file2_observer = new IntersectionObserver(file2_handleIntersection, {
    threshold: 0.5 // Trigger when at least 50% of the element is visible
});

// Select the elements to observe
const file2_centeredContent = document.querySelector('.file2-centered-content');
const file2_gridLayout = document.querySelector('.file2-grid-layout');

// Function to generate HTML dynamically from JSON data
function file2_generateHTMLFromJSON(jsonData) {
    // Generate Centered Content HTML
    file2_centeredContent.innerHTML = `
        <div>
            <h1>${jsonData.centeredContent.title}</h1>
            <p class="file2-text">${jsonData.centeredContent.text}</p>
        </div>
    `;

    // Generate Grid Layout HTML
    file2_gridLayout.innerHTML = '';
    jsonData.gridLayout.forEach(item => {
        file2_gridLayout.innerHTML += `
            <div class="file2-grid-cell">
                <h2>
                    <span class="file2-icon"><img src="${item.icon}" alt="" /></span>
                    ${item.title}
                </h2>
                <p>${item.text}</p>
            </div>
        `;
    });
}

// Fetch the JSON data from the file
fetch('data.json')
    .then(response => response.json())
    .then(jsonData => {
        // Call the function to generate HTML
        file2_generateHTMLFromJSON(jsonData);

        // Observe the elements
        file2_observer.observe(file2_centeredContent);
        file2_observer.observe(file2_gridLayout);
    })
    .catch(error => console.error('Error fetching JSON:', error));
