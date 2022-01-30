const burgerMenu = document.getElementById('burgerMenu')
const xMenu = document.getElementById('x-menu')
const mobileNavHeader = document.querySelector('.mobile-nav-header')
const mobileNavFooter = document.querySelector('.mobile-nav-footer')
const navigationWrapper = document.querySelector('.navigation-wrapper')
const body = document.querySelector('body')

burgerMenu.addEventListener('click', toggleMobileMenu)
xMenu.addEventListener('click', toggleMobileMenu)

function toggleMobileMenu() {
  navigationWrapper.classList.toggle('hidden')
  mobileNavHeader.classList.toggle('hidden')
  mobileNavFooter.classList.toggle('hidden')
  body.classList.toggle('scroll-disabled')
}

