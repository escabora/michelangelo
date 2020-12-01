import { map, flow } from 'lodash/fp';
import CacheSelectors from './__cache-selectors.js';

const El = CacheSelectors.images;
const Methods = {
    init() {
        Methods.eventPerspective();
    },


    eventPerspective() {
        const add = (el) => {
            TweenMax.to(el, .5, {
                y: -30,	
                className: "+=shadow2",	
                ease: Power2.easeOut,
            }); 
        };

        const hover = (e, el) => {
            // console.log(e);
            let target = e.target;
        
            let coordX = -(e.offsetX / target.clientWidth - .2);
            let coordY = -(e.offsetY / target.clientHeight - .2);
        
            TweenMax.to(el, .3, {
                rotationX: 10 * -coordY
                ,	rotationY: 10 * coordX
            });
        }

        const remove = (el) => {
            TweenMax.to(el, .8, {
                y: 0, 
                ease: Expo.easeOut,
            }),	
            TweenMax.to(el, .5, {
              el: 1,	
              rotationX: 0,	
              rotationY: 0,	
              className: "-=shadow2",	
              ease: Cubic.easeInOut,
            });
        }

        const animeElements = (el) => {
            el.addEventListener('mouseenter', () => add(el));
            el.addEventListener('mousemove', (e) => hover(e, el));
            el.addEventListener('mouseleave', () => remove(el));
        }

        map(animeElements)(El)
    }
};

export default {
    init: Methods.init,
};
