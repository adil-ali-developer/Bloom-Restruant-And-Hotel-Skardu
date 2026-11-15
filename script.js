const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
        siteNav.classList.toggle("is-open", !isOpen);
    });

    siteNav.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
            siteNav.classList.remove("is-open");
        }
    });
}

const filterButtons = document.querySelectorAll(".filter-button");
const dishes = document.querySelectorAll(".dish-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const category = button.dataset.filter;

        filterButtons.forEach((filterButton) => {
            const isActive = filterButton === button;
            filterButton.classList.toggle("is-active", isActive);
            filterButton.setAttribute("aria-pressed", String(isActive));
        });

        dishes.forEach((dish) => {
            dish.hidden = category !== "all" && dish.dataset.category !== category;
        });
    });
});

const dateInput = document.querySelector('input[name="date"]');
if (dateInput) {
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
    dateInput.min = localToday;
}

const reservationForm = document.querySelector("#reservation-form");
if (reservationForm) {
    reservationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") || "Guest";
        const email = formData.get("email") || "";
        const date = formData.get("date") || "Not provided";
        const time = formData.get("time") || "Not provided";
        const guests = formData.get("guests") || "Not provided";
        const subject = encodeURIComponent(`Table request for ${name}`);
        const body = encodeURIComponent(
            `Hello Baltora Hotel and Restaurant,\n\nI'd like to request a table.\n\nName: ${name}\nEmail: ${email}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\n\nPlease let me know if you can accommodate us.`
        );

        const formNote = document.querySelector("#form-note");
        if (formNote) {
            formNote.textContent = "Your email app is opening with your request. We'll confirm your table by email.";
        }

        window.location.href = `mailto:reservations@bloomskardu.pk?subject=${subject}&body=${body}`;
    });
}
