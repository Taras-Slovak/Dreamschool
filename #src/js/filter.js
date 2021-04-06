'use strict';

function app() {
    const buttons = document.querySelectorAll('.filter__item');
    const cards = document.querySelectorAll('.post-preview');
    const topPost = document.querySelector('.top-post');

    const addText = document.querySelector('.add-text');

    const addTextTitle = document.querySelector('.add-text__title');

    const fix = document.querySelector('.fix');

    const burgerBtn = document.querySelector('.navbar__btn');
    const mobileMenu = document.querySelector('.navbar__mobile');
    const bodyScroll = document.querySelector('.body');

// fix animation for animation.js--------
    let fixerAnimationJs = document.querySelector('.post-flex');
// fix animation for animation.js--------    
    

    function filter(category, items) {
        items.forEach((item) => {
            const isItemFiltered = !item.classList.contains(category);
            const isShowAll = category.toLowerCase() === 'all';
            fix.classList.add('fixer');
            topPost.classList.add('transform');
            topPost.classList.add('hide');
            delete fixerAnimationJs.dataset.animation;// fix animation for animation.js--------

            if (isItemFiltered && !isShowAll) {

                delete fixerAnimationJs.dataset.animation;// fix animation for animation.js--------

                item.classList.add('anime');


            } else {

                item.classList.remove('hide');
                item.classList.remove('anime');

                burgerBtn.classList.remove('open');
                mobileMenu.classList.remove('open');
                bodyScroll.classList.remove('_deleteScrole');
                showMenu = false;

            }
        });
    }

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const currentCategory = button.dataset.filter;
            filter(currentCategory, cards);

            if (topPost.classList.contains('none') || topPost.classList.contains('hide')) {

                addText.classList.add('visibility');

            } else {
                addText.contains.remove('visibility');
            }

            if (button.dataset.filter === 'all') {

                addTextTitle.innerHTML = 'Показано дописи з міткою: "Показати усі пости"';

            } else if (button.dataset.filter === 'istoriiaUkrainy') {

                addTextTitle.innerHTML = 'Показано дописи з міткою: "Історія України"';

            } else if (button.dataset.filter === 'khimiia') {

                addTextTitle.innerHTML = 'Показано дописи з міткою: "Хімія"';

            } else if (button.dataset.filter === 'piznavalne') {

                addTextTitle.innerHTML = 'Показано дописи з міткою: "Пізнавальне"';

            } else if (button.dataset.filter === 'tsikaviFakty') {

                addTextTitle.innerHTML = 'Показано дописи з міткою: "Цікаві факти"';

            } else if (button.dataset.filter === 'ukraine') {

                addTextTitle.innerHTML = 'Показано дописи з міткою: "Україна"';

            } else if (button.dataset.filter === 'rizne') {

                addTextTitle.innerHTML = 'Показано дописи з міткою: "Різне"';

            }



        });
    });

    cards.forEach((card) => {
        card.ontransitionend = function () {
            if (card.classList.contains('anime')) {

                card.classList.add('hide');
            }

        };
    });
}

app();