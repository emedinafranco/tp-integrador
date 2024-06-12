// MENU SCRIPTS

const navMenu = document.getElementById('nav_menu');
const navClose = document.getElementById('nav_close')
const navToggle = document.getElementById('nav-toggle')

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}