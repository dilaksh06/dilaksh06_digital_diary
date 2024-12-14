// Fetch the events from the memories.json file
let memories = [];

// Fetch the JSON data when the page loads
fetch("./data/memories.json")
    .then((response) => response.json())
    .then((data) => {
        memories = data;
        generateCalendar(); // Call the function to generate the calendar after data is loaded
    })
    .catch((error) => {
        console.error("Error loading memories.json:", error);
    });

const datesContainer = document.getElementById("dates");
const currentYearSpan = document.getElementById("current-year");
const monthList = document.getElementById("month-list").getElementsByTagName("span");
const currentDayElem = document.getElementById("current-day");
const currentDayNameElem = document.getElementById("current-day-name");
const eventDetailsContainer = document.getElementById("event-details-container"); // Assume this container exists in your HTML

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear() < 2023 ? 2023 : currentDate.getFullYear(); // Start from 2023

// Highlight the selected month
function highlightMonth() {
    for (let i = 0; i < monthList.length; i++) {
        monthList[i].classList.remove("active");
        if (i === currentMonth) {
            monthList[i].classList.add("active");
        }
    }
}

// Generate Calendar Dates
function generateCalendar() {
    datesContainer.innerHTML = "";
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Add empty slots for alignment
    for (let i = 0; i < firstDay; i++) {
        datesContainer.innerHTML += `<span></span>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const today = new Date();
        const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

        // Format the date as 'Month Day, Year' for checking
        const dateString = `${currentMonth + 1}-${day}-${currentYear}`;

        // Check if there is an event for the current date
        const event = memories.find(memory => memory.date === new Date(dateString).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }));

        // Add the blue dot above dates with events
        const eventDot = event ? '<div class="dot"></div>' : '';

        datesContainer.innerHTML += `
            <span class="${isToday ? "current" : ""}" data-date="${dateString}">
                ${eventDot}${day}
            </span>`;
    }

    currentYearSpan.textContent = currentYear;
    highlightMonth();
    currentDayElem.textContent = currentDate.getDate();
    currentDayNameElem.textContent = currentDate.toLocaleString("en", { weekday: "long" });
}

// Event details display
function showEventDetails(dateString) {
    // Format the clicked date as 'Month Day, Year' to match the format in JSON (e.g. 'January 1, 2024')
    const formattedDate = new Date(dateString).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    const event = memories.find((memory) => memory.date === formattedDate);

    if (event) {
        eventDetailsContainer.innerHTML = `
            <div class="event-card">
                <img src="${event.image}" alt="${event.title}">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p><strong>Details:</strong> ${event.details}</p>
                <div class="photos">
                    ${event.photos.map((photo) => `<img src="${photo}" alt="Photo">`).join("")}
                </div>
            </div>
        `;
    } else {
        eventDetailsContainer.innerHTML = `<p>No events found for this date.</p>`;
    }
}

// Year Navigation
document.getElementById("prev-year").addEventListener("click", () => {
    if (currentYear > 2023) { // Prevent navigating to years before 2023
        currentYear--;
        generateCalendar();
    }
});

document.getElementById("next-year").addEventListener("click", () => {
    currentYear++;
    generateCalendar();
});

// Month Selection
for (let i = 0; i < monthList.length; i++) {
    monthList[i].addEventListener("click", () => {
        currentMonth = i;
        generateCalendar();
    });
}

// Click event for selecting dates
datesContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && e.target.dataset.date) {
        showEventDetails(e.target.dataset.date);
    }
});

generateCalendar();

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('mobile');
});
