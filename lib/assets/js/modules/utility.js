/**
 *
 * Utility
 *
 */

'use strict';

class Utility {

  /**
   *
   * loadImages
   * @param {object} $target
   * @param {function} callback
   *
   */

  static loadImages($target, callback = function() {}) {
    const images = $target.querySelectorAll('img, [data-src]');
    if (images.length) {
      const maxCount = images.length;
      let currentCount = 0;
      [].forEach.call(images, ($image) => {
        const img = new Image();
        img.src = $image.getAttribute('src') || $image.getAttribute('data-src');
        img.onload = img.onerror = () => {
          currentCount++;
          if (maxCount === currentCount) {
            callback();
          }
        };
      });
    } else {
      callback();
    }
  }

  /**
   *
   * coverImage
   * @param {object} $target
   * @param {object} $image
   * @param {number} imageWidth
   * @param {number} imageHeight
   *
   */

  static coverImage($target, $image, imageWidth, imageHeight) {
    let currentTargetWidth;
    let currentTargetHeight;
    let width;
    let height;
    let left;
    let top;
    if ($target === window) {
      currentTargetWidth = $target.innerWidth;
      currentTargetHeight = $target.innerHeight;
    } else {
      currentTargetWidth = $target.offsetWidth;
      currentTargetHeight = $target.offsetHeight;
    }
    if (currentTargetWidth * imageHeight / imageWidth > currentTargetHeight) {
      width =  Math.floor(currentTargetWidth) + 'px';
      left = '0';
      height =  Math.floor(currentTargetWidth * imageHeight / imageWidth) + 'px';
      top = '-' + Math.floor((currentTargetWidth * imageHeight / imageWidth - currentTargetHeight) / 2) + 'px';
    } else {
      width = Math.floor(currentTargetHeight * imageWidth / imageHeight) + 'px';
      left = '-' + Math.floor((currentTargetHeight * imageWidth / imageHeight - currentTargetWidth) / 2) + 'px';
      height = Math.floor(currentTargetHeight) + 'px';
      top = '0';
    }
    $image.style.width = width;
    $image.style.height = height;
    $image.style.left = left;
    $image.style.top = top;
  }

  /**
   *
   * isTouchDevice
   * @return {bool}
   *
   */

  static isTouchDevice() {
    return typeof document.ontouchstart !== 'undefined';
  }

  /**
   *
   * isIE
   * @return {bool}
   *
   */

  static isIE() {
    return document.uniqueID && document.documentMode === 11;
  }

  /**
   *
   * isTabletDevice
   * @return {bool}
   *
   */

  static isTabletDevice() {
    const ua = navigator.userAgent;
    return ua.indexOf('iPad') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') === -1);
  }

  /**
   *
   * isIOS
   * @return {bool}
   *
   */

  static isIOS() {
    const ua = navigator.userAgent;
    return /iP(hone|(o|a)d)/.test(ua);
  }

  /**
   *
   * getCurrentQuery
   * @return {number}
   *
   */

  static getCurrentQuery() {
    return +(getComputedStyle(document.querySelector('body'), ':after').getPropertyValue('content').replace(/"/g, ''));
  }

  /**
   *
   * slideUp
   * @param {object} $target
   * @param {function} callback
   * @param {number} duration
   *
   */

  static slideUp($target, callback = function() {}, duration = 200) {
    const targetHeight = $target.offsetHeight;
    const targetPaddingTop = parseInt(getComputedStyle($target).getPropertyValue('padding-top'));
    const targetPaddingBottom = parseInt(getComputedStyle($target).getPropertyValue('padding-bottom'));
    $target.style.display = 'block';
    $target.style.overflow = 'hidden';
    $target.style.height = targetHeight + 'px';
    $target.style.paddingTop = targetPaddingTop + 'px';
    $target.style.paddingBottom = targetPaddingBottom + 'px';
    $target.style.visibility = '';
    const startTime = performance.now();
    const render = () => {
      const elapsedTime = performance.now() - startTime;
      if (elapsedTime < duration) {
        $target.style.height = Math.floor(targetHeight - this.easing(elapsedTime, 0, targetHeight, duration)) + 'px';
        $target.style.paddingTop = Math.floor(targetPaddingTop - this.easing(elapsedTime, 0, targetPaddingTop, duration)) + 'px';
        $target.style.paddingBottom = Math.floor(targetPaddingBottom - this.easing(elapsedTime, 0, targetPaddingBottom, duration)) + 'px';
        requestAnimationFrame(render);
      } else {
        $target.style.height = '0px';
        $target.style.paddingTop = '0px';
        $target.style.paddingBottom = '0px';
        $target.style.display = 'none';
        $target.style.height = '';
        $target.style.paddingTop = '';
        $target.style.paddingBottom = '';
        $target.style.overflow = '';
        cancelAnimationFrame(render);
        callback();
      }
    };
    render();
  }

  /**
   *
   * slideDown
   * @param {object} $target
   * @param {function} callback
   * @param {number} duration
   *
   */

  static slideDown($target, callback = function() {}, duration = 200) {
    $target.style.height = '';
    $target.style.overflow = 'hidden';
    $target.style.visibility = 'hidden';
    $target.style.display = 'block';
    const targetHeight = $target.offsetHeight;
    const targetPaddingTop = parseInt(getComputedStyle($target).getPropertyValue('padding-top'));
    const targetPaddingBottom = parseInt(getComputedStyle($target).getPropertyValue('padding-bottom'));
    $target.style.overflow = 'hidden';
    $target.style.height = '0px';
    $target.style.paddingTop = '0';
    $target.style.paddingBottom = '0';
    $target.style.visibility = '';
    const startTime = performance.now();
    const render = () => {
      const elapsedTime = performance.now() - startTime;
      if (elapsedTime < duration) {
        $target.style.height = Math.floor(this.easing(elapsedTime, 0, targetHeight, duration)) + 'px';
        $target.style.paddingTop = Math.floor(this.easing(elapsedTime, 0, targetPaddingTop, duration)) + 'px';
        $target.style.paddingBottom = Math.floor(this.easing(elapsedTime, 0, targetPaddingBottom, duration)) + 'px';
        requestAnimationFrame(render);
      } else {
        $target.style.height = targetHeight + 'px';
        $target.style.paddingTop = targetPaddingTop + 'px';
        $target.style.paddingBottom = targetPaddingBottom + 'px';
        $target.style.height = '';
        $target.style.paddingTop = '';
        $target.style.paddingBottom = '';
        $target.style.overflow = '';
        cancelAnimationFrame(render);
        callback();
      }
    };
    render();
  }

  /**
   *
   * slideToggle
   * @param {object} $target
   * @param {function} callback
   * @param {number} duration
   *
   */

  static slideToggle($target, callback = function() {}, duration = 200) {
    if (getComputedStyle($target).getPropertyValue('display') === 'none') {
      this.slideDown($target, callback, duration);
    } else {
      this.slideUp($target, callback, duration);
    }
  }

  /**
   *
   * easing
   * @param {number} elapsedTime
   * @param {number} currentPosition
   * @param {number} difference
   * @param {number} duration
   *
   */

  static easing(elapsedTime, currentPosition, difference, duration) {
    elapsedTime /= duration;
    elapsedTime--;
    return difference * (elapsedTime * elapsedTime * elapsedTime * elapsedTime * elapsedTime + 1) + currentPosition;
  }

  /**
   *
   * throttle
   * @param {function} func
   * @param {number} interval
   * @param {bool} isLastExec
   *
   */

  static throttle(func, interval = 50, isLastExec = true) {
    let lastTime = performance.now();
    let debounce = this.debounce(func, interval);
    return () => {
      const nowTime = performance.now();
      if (lastTime + interval <= nowTime) {
        lastTime = nowTime;
        func();
      }
      if (isLastExec) {
        debounce();
      }
    };
  }

  /**
   *
   * debounce
   * @param {function} func
   * @param {number} interval
   *
   */

  static debounce(func, interval = 500) {
    let timer = false;
    return () => {
      if (timer !== false) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        func();
      }, interval);
    };
  }

  /**
   *
   * isSupportedPassive
   * @return {bool}
   *
   */

  static isSupportedPassive() {
    let res = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: () => {
          res = true;
          return res;
        }
      });
      window.addEventListener('testCase', null, opts);
    } catch (e) {
      // empty
    }
    return res;
  }

  /**
   *
   * waitScroll
   * @param {object} $target
   * @param {number} duration
   * @param {number} reactionRenge
   * @param {function} callback
   *
   */

  static waitScroll($target, duration = 100, reactionRange = 0.25, callback = function() {}) {
    let windowHeight = window.innerHeight;
    const scroll = this.throttle(() => {
      if ((windowHeight > ($target.getBoundingClientRect().top + (reactionRange * windowHeight))) && !$target.classList.contains('is-scrolled')) {
        window.removeEventListener('scroll', scroll);
        window.removeEventListener('resize', resize);
        $target.classList.add('is-scrolled');
        callback($target);
      }
    }, duration, true);
    const resize = this.debounce(() => {
      windowHeight = window.innerHeight;
    });
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', scroll, this.isSupportedPassive() ? {
      passive: true
    } : false);
  }

  /**
   *
   * smoothScroll
   * @param {object} $target
   * @param {number} duration
   *
   */

  static smoothScroll($target, duration = 300) {
    $target.addEventListener('click', (e) => {
      const href = $target.getAttribute('href');
      const goalPosition = (() => {
        if (href === '#' || href === '#top') {
          document.querySelector('body').focus();
          return 0;
        } else {
          if (href.indexOf('#') !== -1) {
            const hash = href.slice(href.lastIndexOf('#'));
            if (href.match(/^#/) || ((location.pathname + location.search + hash) === href) || ((location.protocol + '//' + location.hostname + location.pathname + location.search + hash) === href)) {
              const $el = document.getElementById(hash.substring(1));
              if ($el) {
                $el.focus();
                history.replaceState(null, null, location.pathname + location.search + hash);
                return $el.getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientTop;
              }
            }
          }
          return null;
        }
      })();
      const currentPosition = window.pageYOffset;
      const difference = goalPosition - currentPosition;
      const startTime = performance.now();
      const scroll = () => {
        const elapsedTime = performance.now() - startTime;
        const elapsedPosition = Utility.easing(elapsedTime, currentPosition, difference, duration);
        if (elapsedTime < duration) {
          window.scrollTo(0, elapsedPosition);
          requestAnimationFrame(scroll);
        } else {
          window.scrollTo(0, goalPosition);
          cancelAnimationFrame(scroll);
          if (!this.isIE()) {
            window.dispatchEvent(new Event('scroll'));
          } else {
            const event = document.createEvent('Event');
            event.initEvent('scroll', false, false);
            window.dispatchEvent(event);
          }
        }
      };
      if (goalPosition === null) {
        return;
      }
      e.stopPropagation();
      e.preventDefault();
      scroll();
    });
  }

  /**
   *
   * addBodyClass
   *
   */

  static addBodyClass() {
    document.addEventListener('DOMContentLoaded', () => {
      const $body = document.querySelector('body');
      $body.classList.add('is-ready');
      if (this.isIE()) {
        $body.classList.add('is-ie');
      }
      if (this.isTouchDevice()) {
        $body.classList.add('is-touch-device');
      }
      if (this.isIOS()) {
        $body.classList.add('is-ios');
      }
      window.addEventListener('load', () => {
        $body.classList.add('is-loaded');
      });
    });
  }

  /**
   *
   * radian (θ)
   * @param {number} degree
   * @return θ
   * 
   * @example
   * Math.sin(Frontwork.Animation.rad(90)) -> -1 ~ 1
   * Math.cos(Frontwork.Animation.rad(90)) -> -1 ~ 1
   * 2 * Math.sin(Frontwork.Animation.rad(90)) -> -2 ~ 2 (2 double)
   * Math.sin(2 * Frontwork.Animation.rad(90)) -> -1 ~ 1 (2 circling)
   * [Math.cos(2 * Math.PI * Frontwork.Animation.rad(90)), Math.sin(2 * Math.PI * Frontwork.Animation.rad(90))] -> circle
   * 
   * // Lissajous figure
   * const tick = () => {
   *  const center = {x: 100, y: 100};
   *  TweenMax.set($obj, {x: center.x + Math.cos(θ) * 100, y: center.y + Math.sin(θ) * 100});
   *  window.requestAnimationFrame(tick);
   * };
   * window.requestAnimationFrame(tick);
   *
   */

  static rad(deg) {
    return deg * Math.PI / 180;
  }


  /**
   *
   * degree
   * @param {number} radian (θ)
   * @return degree
   *
   */

  static deg(rad) {
    return rad * 180 / Math.PI;
  }


  /**
   *
   * random decimal
   * @param {number} min
   * @param {number} max
   * @return random decimal number
   *
   */

  static rand(min, max) {
    return Math.random() * (max - min) + min;
  }


  /**
   *
   * random integer
   * @param {number} min
   * @param {number} max
   * @return random integer number
   *
   */

  static randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   *
   * lazyLoad
   * @param {array} threshold
   * @param {string} margin
   * @param {object} rootElement
   *
   */

  static lazyLoad(threshold = [0], margin = '0px 0px 100px 0px', rootElement = null) {
    const $targetList = document.querySelectorAll('[data-src], [data-srcset]');
    if ($targetList.length) {
      const observer = new IntersectionObserver((changes) => {
        for (const change of changes) {
          if (change.isIntersecting) {
            const src = change.target.getAttribute('data-src');
            const srcset = change.target.getAttribute('data-srcset');
            if (src) {
              change.target.setAttribute('src', src);
            }
            if (srcset) {
              change.target.setAttribute('srcset', srcset);
            }
          }
        }
      }, {
        root: rootElement,
        threshold: threshold,
        rootMargin: margin,
      });
      [].forEach.call(targetList, ($target) => {
        observer.observe($target);
      });
    }
  }

}

export default Utility;
