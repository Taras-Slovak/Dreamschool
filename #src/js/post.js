'use strict';
const getAllImg = document.querySelectorAll('.post__content img');




let enlarged = false;
getAllImg[0].classList.add('fix-first-img');

getAllImg.forEach(img => {

    

    img.addEventListener('click', () => {

        
        if (!enlarged) {

        img.classList.add('zoom-in');

        enlarged = true;

        getAllImg[0].classList.remove('zoom-in');

        } else {
         
            img.classList.remove('zoom-in');

            enlarged = false;

            getAllImg[0].classList.remove('zoom-in');
        }

        // img.classList.add('zoom-in');
    });

});
