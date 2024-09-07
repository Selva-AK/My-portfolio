document.addEventListener('DOMContentLoaded', () => {
    /*===== MENU SHOW =====*/ 
    const showMenu = (toggleId, navId) => {
        const toggle = document.getElementById(toggleId);
        const nav = document.getElementById(navId);

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('show');
            });
        }
    };
    showMenu('nav-toggle', 'nav-menu');

    /*==================== REMOVE MENU MOBILE ====================*/
    const navLink = document.querySelectorAll('.nav__link');

    function linkAction() {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.classList.remove('show');
        }
    }
    navLink.forEach(n => n.addEventListener('click', linkAction));

    /*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            const sectionId = current.getAttribute('id');

            const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    /*===== SCROLL REVEAL ANIMATION =====*/
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200,
        // reset: true
    });

    sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
    sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
    sr.reveal('.home__social-icon', { interval: 200 });
    sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 });

    // Adding ScrollReveal for Projects and Experience sections
    sr.reveal('.projects__container', { delay: 300 });
    sr.reveal('.timeline__container', { delay: 300 });
});

// Get the modal and its components
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.querySelector('.close');

// Add event listener to all 'work__img' links
document.querySelectorAll('.work__img').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();  // Prevent default anchor behavior
        const imgSrc = this.querySelector('img').src;  // Get the image source
        modal.style.display = 'block';  // Show the modal
        modalImg.src = imgSrc;  // Set the modal image source
    });
});

// Close the modal when the close button is clicked
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close the modal if clicking outside the modal content
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
