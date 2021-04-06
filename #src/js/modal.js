'use strict';

let body = document.querySelector('.body');


class Modal {

    constructor(id) {
        this.elem = document.getElementById(id);
        this.loadHideListeners();
    }

    show(callback) {
        this.elem.classList.add('_visibility');
        body.classList.add('_removeScrole');
        if (callback) {callback ();}
    }

    hide(callback) {
        this.elem.classList.remove('_visibility');
        body.classList.remove('_removeScrole');
        this.createCloseEvent();
        if (callback) {callback ();}
    }

    createCloseEvent() {
        let event = new Event('modalClose');
        document.dispatchEvent(event);
    }

    // Create event listeners for close modal
    loadHideListeners() {

        // Hide modal when you press close
        this.elem.addEventListener('click', e => {
            if (e.target.classList.contains('modal__close')) {
                this.hide();
            }
        });

        // Also hide modal when you press outside
        this.elem.addEventListener('click', e => {
            if (e.target.classList.contains('modal')) {
                this.hide();
            }
        });
    }

}

// function Initialization Modal

function initialModal(modalNumber) {
    const modal1 = new Modal(`myModal_${modalNumber}`);
    document.getElementById(`showModal_${modalNumber}`).addEventListener('click', () => {

        modal1.show();

    });
}


