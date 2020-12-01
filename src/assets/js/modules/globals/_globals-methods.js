// import { TweenMax, gsap } from 'gsap';
import { map } from 'lodash/fp';
import LocomotiveScroll from 'locomotive-scroll';
import CacheSelectors from './__cache-selectors.js';

const El = CacheSelectors;
const Methods = {
    init() {
        Methods.locomotiveScroll();
        Methods.mouseControl();
        Methods.mouseHover();

        DOM.noScroll = Methods.noScroll;
        DOM.setAnimationOverlay = Methods.setAnimationOverlay;

        Methods.progressLoading();
    },


    setAnimationOverlay(el, delay, positioninPx) {
        TweenMax.to(el, 1.5, {
            delay: delay,
            top: positioninPx,
            ease: Expo.easeInOut,
        })
    },

    noScroll(conditional) {
        const bodyContent = document.querySelector('body');
        (conditional) ? bodyContent.classList.add('no-scroll') : bodyContent.classList.remove('no-scroll')
    },

    progressLoading() {
        const showprogress = () => {
            if (document.images.length == 0)
                return false;
            
            let loaded = 0;
            for (let i = 0; i < document.images.length; i++)
                if (document.images[i].complete) loaded++;
            
            const percentage = Math.round(100 * loaded / document.images.length);
            setTimeout(()=> {
                document.querySelector('.percentual__text').innerHTML = `${percentage}%`;
                document.querySelector('.percentual__bar').style.width = `${percentage}%`;
            },100)
            
            
            if (percentage == 100)
                window.clearInterval(percentual);
                DOM.setAnimationOverlay(document.querySelector('.percentual'), 0.3, '-100%');
                DOM.setAnimationOverlay(El.overlay.overlayFirst, 0.9, '-100%');
                DOM.setAnimationOverlay(El.overlay.overlayTwo, 0.7, '-100%');
                DOM.setAnimationOverlay(El.overlay.overlayThree, 0.5, '-100%');
                setTimeout(()=>  {
                    El.overlay.overlayContent.classList.remove('overlay--black');
                    El.overlay.overlayContent.classList.remove('is--active');
                },2500)
        }
        const percentual = setInterval(() => showprogress(), 250)
    },

    mouseControl() {
        let mouse = document.querySelector(".mouse"), 
            dataCursor = (mouse.clientWidth, mouse.clientHeight, document.querySelector(".cursor")), 
            follower = document.querySelector(".cursor-follower"), 
            followerLeft = 0, 
            followerTop = 0, 
            moveCursorClientX = 0, 
            moveCursorClientY = 0, 
            cursorLeft = 0,
            cursorTop = 0;

          TweenMax.to({}, 5e-5, {
            repeat: -1,
            onRepeat: () => {
                followerLeft += (moveCursorClientX - followerLeft) / 12,
                followerTop += (moveCursorClientY - followerTop) / 12,
                cursorLeft += moveCursorClientX - cursorLeft,
                cursorTop += moveCursorClientY - cursorTop,
                TweenMax.set(follower, {
                    css: {
                        left: followerLeft - 11,
                        top: followerTop - 11
                    }
                }),
                TweenMax.set(dataCursor, {
                    css: {
                        left: cursorLeft,
                        top: cursorTop
                    }
                })
            }
        });
        
        setTimeout(()=> {
            mouse.classList.add('active');
        }, 2600)

        document.addEventListener("mousemove", (ev) => {
            moveCursorClientX = ev.clientX,
            moveCursorClientY = ev.clientY
        })
    },

    mouseHover() {
        let cursor = document.querySelector(".cursor"), 
            follower = document.querySelector(".cursor-follower");
        const elementsAnime = document.querySelectorAll('a, img');
        const sectionBlack = document.querySelectorAll('.section--construction, .overlay--black');
        
        const eventsHover = (el) => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add("active");
                follower.classList.add("active");
            })

            el.addEventListener('mouseleave', () => {
                cursor.classList.remove("active");
                follower.classList.remove("active");
            })
        }
        
        const changeMoveColor = (el) => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add("white");
                follower.classList.add("white");
            });
    
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove("white");
                follower.classList.remove("white");
            
            });
        }

        map(eventsHover)(elementsAnime);
        map(changeMoveColor)(sectionBlack);

    },

    locomotiveScroll() {
        const scroll = new LocomotiveScroll({
            el: El.scroll,
            smooth: true,
            // lerp: 0.4
        });
        scroll.on("call", (e) => {
            Methods._revealInView()
        });
    },

    _revealInView() {
        window.innerWidth > 767 ? document.querySelectorAll(".is-inview").forEach((el) => {
            const time = el.getAttribute("data-delay") || 0, 
                  interval = el;
            interval.classList.contains("animated") || setTimeout(() => {
                interval.classList.add("animated")
            }, time)
        }) : document.querySelectorAll(".is-inview").forEach( (e) => {
            const time = el.getAttribute("data-delay-mobile") || 0, 
                  interval = el;
            interval.classList.contains("animated") || setTimeout(() => {
                interval.classList.add("animated")
            }, time)
        })
    }
};

export default {
    init: Methods.init,
};
