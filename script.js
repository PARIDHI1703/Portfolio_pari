document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('nav ul');

    // Function to toggle mobile menu visibility
    function toggleMobileMenu() {
        navList.classList.toggle('active');
        mobileMenu.classList.toggle('active'); // Optional: for animating hamburger icon
    }

    // Event listener for clicking the hamburger icon
    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', toggleMobileMenu);

        // Close mobile menu when a navigation link is clicked
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('active')) { // Only close if menu is open
                    toggleMobileMenu();
                }
            });
        });
    }

    // Smooth scrolling for all internal navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Smooth scroll animation
                });
            }
        });
    });

    // Highlight active navigation link based on scroll position (for better UX)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    function highlightNavLink() {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Adjust this offset for when the header is sticky, so the link activates
            // slightly before the section reaches the very top of the viewport.
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight * 0.3) { // 30% of section height from top
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active'); // Remove active class from all links first
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active'); // Add active class to the current section's link
            }
        });
    }

    // Add scroll event listener to update active navigation link
    window.addEventListener('scroll', highlightNavLink);
    // Call it once on load to set the initial active link if page is not at the very top
    highlightNavLink();
});