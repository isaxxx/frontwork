/**
 *
 * pagetop
 * @param {number} minQuery
 * @param {number} scrollY
 *
 */

'use strict';

import Utility from './utility';

let instance = false;

class Pagetop {

  constructor(minQuery, scrollY) {
    const $pagetop = document.querySelector('.js-pagetop');
    if (!$pagetop) {
      return;
    }
    minQuery = minQuery !== undefined ? minQuery : 0;
    scrollY = scrollY || 1000;
    Utility.smoothScroll($pagetop);
    const $body = document.querySelector('body');
    const scroll = () => {
      if (window.pageYOffset > scrollY) {
        $body.classList.add('is-fixed-pagetop');
        $pagetop.setAttribute('aria-hidden', 'false');
      } else {
        $body.classList.remove('is-fixed-pagetop');
        $pagetop.setAttribute('aria-hidden', 'true');
      }
    };
    const event = Utility.throttle(() => {
      scroll();
    });
    let isBinded = false;
    const judge = (query) => {
      if (query >= minQuery) {
        if (!isBinded) {
          window.addEventListener('scroll', event, Utility.isSupportedPassive() ? {passive: true} : false);
          scroll();
          isBinded = true;
        }
      } else {
        if (isBinded) {
          window.removeEventListener('scroll', event);
          $body.classList.remove('is-fixed-pagetop');
          $pagetop.removeAttribute('aria-hidden');
          isBinded = false;
        }
      }
    }
    judge(Utility.getCurrentQuery());
    window.addEventListener('resize', Utility.makeWindowWidthResizeEvent((windowWidth, query) => {
      judge(query);
    }, true));
  }

};

export default Pagetop;
