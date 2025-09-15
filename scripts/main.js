document.addEventListener('DOMContentLoaded', () => {
    const mainPage = document.getElementById('main-page');
    const iutirlaSection = document.getElementById('iutirla-section');
    const halloweenSection = document.getElementById('halloween-section');
    const navidadSection = document.getElementById('navidad-section');

    const links = {
        '#iutirla': iutirlaSection,
        '#halloween': halloweenSection,
        '#navidad': navidadSection,
    };

    // Function to show the selected section and hide the main page
    function showSection(section) {
        mainPage.classList.add('hidden');
        section.classList.remove('hidden');
        // move focus for accessibility
        const firstHeading = section.querySelector('h2');
        if (firstHeading) {
            firstHeading.setAttribute('tabindex', '-1');
            firstHeading.focus();
        }
    }

    // Function to show the main page and hide all sections
    window.showMainPage = function() {
        mainPage.classList.remove('hidden');
        iutirlaSection.classList.add('hidden');
        halloweenSection.classList.add('hidden');
        navidadSection.classList.add('hidden');
        // focus back to main heading
        const mainHeading = mainPage.querySelector('h1');
        if (mainHeading) {
            mainHeading.setAttribute('tabindex', '-1');
            mainHeading.focus();
        }
    };

    // Add event listeners to links with hash navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // If it's an internal hash link to sections we manage, intercept it
            const sectionId = this.getAttribute('href');
            const section = links[sectionId];
            if (section) {
                e.preventDefault();
                showSection(section);
            }
        });
    });

    // Enhance skip link if exists
    const skipLink = document.querySelector('a[href="#main-page"]');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const main = document.getElementById('main-page');
            if (main) {
                main.classList.remove('hidden');
                main.querySelector('h1')?.focus();
            }
        });
    }

    // Attach back button handlers (elements with .js-back)
    document.querySelectorAll('.js-back').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.showMainPage();
        });
    });
});
