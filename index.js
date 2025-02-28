// Sidebar Toggle Function
function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const sidebarOne = document.querySelector(".sidebar-one");

    if (sidebar) sidebar.classList.toggle("active");
    if (sidebarOne) sidebarOne.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
    const sliderWrapper = document.querySelector(".slider-wrapper");
    let slides = Array.from(document.querySelectorAll(".slide"));

    function updateSlider(clickedIndex) {
        const centerIndex = slides.findIndex(slide => slide.classList.contains("active"));

        if (clickedIndex === centerIndex) return; // Do nothing if already centered

        // Rotate slides to bring clicked image to center
        let rotateCount = clickedIndex - centerIndex;

        if (rotateCount < 0) {
            // Rotate right
            for (let i = 0; i < Math.abs(rotateCount); i++) {
                slides.unshift(slides.pop()); // Move last to first
            }
        } else {
            // Rotate left
            for (let i = 0; i < rotateCount; i++) {
                slides.push(slides.shift()); // Move first to last
            }
        }

        // Update the DOM
        sliderWrapper.innerHTML = "";
        slides.forEach((slide, index) => {
            slide.classList.remove("active");

            if (index === Math.floor(slides.length / 2)) {
                slide.classList.add("active"); // Set clicked image as center
            }

            sliderWrapper.appendChild(slide);
        });

        // Add blur effect only after a click
        sliderWrapper.classList.add("clicked");
    }

    slides.forEach((slide, index) => {
        slide.addEventListener("click", function () {
            updateSlider(slides.indexOf(this));
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("toggle-btn");
    toggleBtn.setAttribute("id", "themeToggle");
    toggleBtn.innerHTML = `<span class="material-symbols-outlined">dark_mode</span>`; // Default: Dark mode (Moon)
    document.body.appendChild(toggleBtn);

    // Load theme preference
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        toggleBtn.innerHTML = `<span class="material-symbols-outlined">light_mode</span>`; // Sun icon
    }

    toggleBtn.addEventListener("click", function () {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            toggleBtn.innerHTML = `<span class="material-symbols-outlined">light_mode</span>`; // Sun icon
        } else {
            localStorage.setItem("theme", "dark");
            toggleBtn.innerHTML = `<span class="material-symbols-outlined">dark_mode</span>`; // Moon icon
        }
    });
});



