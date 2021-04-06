'use strict';


//------------ progress  Animation  LINE---------------------------------------------------------

const line = document.querySelector('.progress-line__item');

const progressAnimation = () => {
  let scrollTop = window.scrollY;
  let windowHeight = window.innerHeight;
  let siteHeight = document.documentElement.scrollHeight;
  let percentageProgress = Math.floor(scrollTop / (siteHeight - windowHeight) * 100);
  line.style.width = `${percentageProgress}%`;

};

progressAnimation();

window.addEventListener('scroll', () => {
  progressAnimation();

});


const navBar = document.querySelector('.navbar');
const burger = document.querySelector('.navbar__burger');
const burgerBtn = document.querySelector('.navbar__btn');
const mobileMenu = document.querySelector('.navbar__mobile');
const bodyScroll = document.querySelector('.body');

let topFixer = document.querySelector('.top');
let sideBarFixer = document.querySelectorAll('.post-sideBar');


/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    navBar.style.top = '0';
  } else {
    navBar.style.top = '-250px';
    // topFixer.style.marginTop = '0';
  }
  prevScrollpos = currentScrollPos;
};

// mobile menu

var showMenu = false;

burger.addEventListener('click', burgerMenu);

function burgerMenu() {
    if (!showMenu) {
        burgerBtn.classList.add('open');
        mobileMenu.classList.add('open');
        bodyScroll.classList.add('_deleteScrole');
        sideBarFixer.forEach(toFix=>{
          delete  toFix.dataset.animation; 
        });
        // delete  sideBarFixer.dataset.animation;
        showMenu = true;

    } else {
        burgerBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
        bodyScroll.classList.remove('_deleteScrole');
        showMenu = false;
    }
}

const currentLocation = location.href;

const navBarItems = document.querySelectorAll('.navbar__item');

const navBarLength = navBarItems.length;

for (let i =0; i<navBarLength; i++) {

  if (navBarItems[i].href === currentLocation){
    
    navBarItems[i].className = '_active';
  }

}


