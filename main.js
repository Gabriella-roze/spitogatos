const burgerMenu = document.getElementById('burgerMenu')
const xMenu = document.getElementById('x-menu')
const navigationWrapper = document.querySelector('.navigation-wrapper')
const body = document.querySelector('body')

burgerMenu.addEventListener('click', toggleMobileMenu)
xMenu.addEventListener('click', toggleMobileMenu)

function toggleMobileMenu() {
  navigationWrapper.classList.toggle('hidden')
  body.classList.toggle('scroll-disabled')
}

