(() => {
    let memories = [];

    // DOM Elements
    const datesContainer = document.getElementById("dates");
    const currentYearSpan = document.getElementById("current-year");
    const monthList = document.getElementById("month-list").getElementsByTagName("span");
    const currentDayElem = document.getElementById("current-day");
    const currentDayNameElem = document.getElementById("current-day-name");
    const eventDetailsContainer = document.getElementById("event-details-container");
    const hamburger = document.getElementById("hamburger");
    const navList = document.querySelector(".nav-list");
    const currentEventsTitle = document.getElementById("current-events-title");

    // Modal Elements
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const closeModal = document.getElementById("close-modal");

    // Audio Elements
    const audio = document.getElementById("audio");
    const playButton = document.getElementById("play-audio");

    // Current date and navigation state
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear() < 2023 ? 2023 : currentDate.getFullYear();

    // Utility functions
    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    const getEventForDate = (dateString) => {
        const formattedDate = formatDate(dateString);
        return memories.find((memory) => memory.date === formattedDate);
    };

    // Highlight selected month
    function highlightMonth() {
        Array.from(monthList).forEach((month, index) => {
            month.classList.toggle("active", index === currentMonth);
        });
    }

    // Generate Calendar Dates
    function generateCalendar() {
        datesContainer.innerHTML = "";
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const today = new Date();

        let datesHTML = "";

        // Add empty slots for alignment
        for (let i = 0; i < firstDay; i++) {
            datesHTML += `<span></span>`;
        }

        // Populate calendar with dates
        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = `${currentMonth + 1}-${day}-${currentYear}`;
            const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();
            const event = getEventForDate(dateString);
            const eventDot = event ? '<div class="dot"></div>' : "";

            datesHTML += `
                <span class="${isToday ? "current" : ""}" data-date="${dateString}">
                    ${eventDot}${day}
                </span>`;
        }

        datesContainer.innerHTML = datesHTML;
        currentYearSpan.textContent = currentYear;
        highlightMonth();
        currentDayElem.textContent = currentDate.getDate();
        currentDayNameElem.textContent = currentDate.toLocaleString("en", { weekday: "long" });
    }

    // Show Event Details
    function showEventDetails(dateString) {
        const event = getEventForDate(dateString);

        if (event) {
            // Display event title in the current-events-title element
            currentEventsTitle.textContent = event.title || "No Title";

            eventDetailsContainer.innerHTML = `
                <div class="event-card">
                    ${event.image ? `<img src="${event.image}" alt="${event.title}" class="event-image">` : ""}
                    <h3>${event.title || "No Title"}</h3>
                    <p>${event.description || "No description available."}</p>
                    <p><strong>Details:</strong> ${event.details || "No additional details."}</p>
                    <div class="photos">
                        ${event.photos
                    ? event.photos.map((photo) => `<img src="${photo}" alt="Photo" class="event-photo">`).join("")
                    : ""
                }
                    </div>
                </div>
            `;
        } else {
            currentEventsTitle.textContent = "No Events Found"; // Update title for no events
            eventDetailsContainer.innerHTML = `<p>No events found for this date.</p>`;
        }
    }

    // Fetch events data
    fetch("./data/memories.json")
        .then((response) => response.json())
        .then((data) => {
            memories = data;
            generateCalendar();
        })
        .catch((error) => {
            console.error("Error loading memories.json:", error);
            eventDetailsContainer.innerHTML = `<p>Failed to load events. Please try again later.</p>`;
        });

    // Year Navigation
    document.getElementById("prev-year").addEventListener("click", () => {
        if (currentYear > 2023) {
            currentYear--;
            generateCalendar();
        }
    });

    document.getElementById("next-year").addEventListener("click", () => {
        currentYear++;
        generateCalendar();
    });

    // Month Selection
    Array.from(monthList).forEach((month, index) => {
        month.addEventListener("click", () => {
            currentMonth = index;
            generateCalendar();
        });
    });

    // Date Click Event
    datesContainer.addEventListener("click", (e) => {
        const dateElem = e.target.closest("span[data-date]");
        if (dateElem) {
            Array.from(datesContainer.querySelectorAll("span")).forEach((span) =>
                span.classList.remove("selected")
            );
            dateElem.classList.add("selected");
            showEventDetails(dateElem.dataset.date);
        }
    });

    // Hamburger Menu
    hamburger.addEventListener("click", () => {
        navList.classList.toggle("mobile");
        hamburger.setAttribute("aria-expanded", navList.classList.contains("mobile"));
    });

    // Image Click to Open Modal
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("event-image") || e.target.classList.contains("event-photo")) {
            modal.style.display = "block";
            modalImage.src = e.target.src;
        }
    });

    // Close Modal on Cross Click
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close Modal if Clicking Outside the Image
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Set the loop to true so the audio plays continuously
    audio.loop = true;

    // Play/Pause Audio Button Click
    playButton.addEventListener("click", () => {
        // If the audio is paused, start playing it
        if (audio.paused) {
            audio.play();
            playButton.textContent = "Pause Sound";  // Change button text to "Pause"
        } else {
            // If the audio is playing, pause it
            audio.pause();
            playButton.textContent = "Play Sound";  // Change button text back to "Play"
        }
    });
})();
