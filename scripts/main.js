/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class
    if (this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 400 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 400) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.querySelector('i').classList.contains('ri-sun-line') ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    const themeIcon = themeButton.querySelector('i')
    if (selectedTheme === 'dark') {
        themeIcon.classList.remove('ri-moon-line')
        themeIcon.classList.add('ri-sun-line')
    } else {
        themeIcon.classList.remove('ri-sun-line')
        themeIcon.classList.add('ri-moon-line')
    }
} else {
    // Default to Dark Mode
    document.body.classList.add(darkTheme)
    const themeIcon = themeButton.querySelector('i')
    themeIcon.classList.remove('ri-moon-line')
    themeIcon.classList.add('ri-sun-line')
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    const themeIcon = themeButton.querySelector('i')
    themeIcon.classList.toggle('ri-sun-line')
    themeIcon.classList.toggle('ri-moon-line')

    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true // Animations repeat
})

sr.reveal(`.hero__data, .hero__content`)
sr.reveal(`.hero__image-wrapper`, { delay: 700 })
sr.reveal(`.hero__scroll`, { delay: 900, origin: 'bottom' })
sr.reveal(`.about__img`, { origin: 'left' })
sr.reveal(`.about__data`, { origin: 'right' })
sr.reveal(`.skills__content, .projects__card`, { interval: 100 })
sr.reveal(`.contact__content`, { origin: 'bottom' })

/*=============== CURSOR GLOW ===============*/
const glow = document.querySelector('.cursor-glow');
if (glow) {
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

/*=============== CONTACT FORM ===============*/
const contactForm = document.querySelector('.contact__form'); // Select via class since ID wasn't added

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const project = contactForm.querySelector('textarea').value;

        // This is a client-side solution. For a real backend, you'd plain fetch() to a service.
        // Here we format a mailto link to open the user's email client.
        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AProject Details:%0D%0A${project}`;

        // REPLACE THIS EMAIL with your actual email
        const myEmail = "gyanub331@gmail.com";

        window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;

        // Optional: Show success message (alert for now)
        alert("This will open your email client to send the message!");
        contactForm.reset();
    });
}
