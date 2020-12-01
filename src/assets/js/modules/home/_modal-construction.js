import { map, flow, tap, concat } from 'lodash/fp';
import CacheSelectors from './__cache-selectors.js';
import CacheOverlay from './../globals/__cache-selectors.js';

const El = CacheSelectors.modal;
const overlay = CacheOverlay.overlay;

const Methods = {
    init() {
        Methods.modal();
    },

    inAnimation() {
        DOM.setAnimationOverlay(overlay.overlayFirst, 0.5, '0');
        DOM.setAnimationOverlay(overlay.overlayTwo, 0.7, '0');
        DOM.setAnimationOverlay(overlay.overlayThree, 0.9, '0');
    },

    outAnimation() {
        DOM.setAnimationOverlay(overlay.overlayFirst, 0.9, '-100%');
        DOM.setAnimationOverlay(overlay.overlayTwo, 0.7, '-100%');
        DOM.setAnimationOverlay(overlay.overlayThree, 0.5, '-100%');
    },

    modal() {

        const setModal =(condicional, dataContent, time) => {
            if(condicional == 'open')
                setTimeout(()=> {
                    map((item) => 
                        (item.getAttribute('data-content') == dataContent) ? item.classList.add('is--active') : item.classList.remove('is--active'))(El.contentModalShow)

                    El.modalContent.classList.add('is--active')
                },time) 
            
            else
                setTimeout(()=> 
                    map((item) => item.classList.remove('is--active'))(El.contentModalShow),    
                    El.modalContent.classList.remove('is--active')
                ,time)                
        };

        const clickLink = (ev, el) => {
            ev.preventDefault();
            if (el.classList.contains('js--open-details-figure')) {
                const getContruct = el.getAttribute('data-construction');

                overlay.overlayContent.classList.add('is--active');
                DOM.noScroll(true);
                Methods.inAnimation();
                setModal('open', getContruct, 2500);
            } else {
                DOM.noScroll(false);

                Methods.outAnimation();
                setModal('close','close', 200);
                setTimeout(()=> overlay.overlayContent.classList.remove('is--active'),2500)
            }
        }

        const setEvents = (el) => {
            el.addEventListener('click', (ev) => clickLink(ev, el))
        }

        flow([
            concat,
            map(setEvents),
            // tap(map=>console.log('map: ', map)),
        ])
        ([...El.linkOpenModal], [...El.linkCloseModal])
    },
    
};

export default {
    init: Methods.init,
};
