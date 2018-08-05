/**
 *
 * utility
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
    const currentTargetWidth = $target.offsetWidth;
    const currentTargetHeight = $target.offsetHeight;
    let width;
    let height;
    let left;
    let top;
    if (currentTargetWidth * imageHeight / imageWidth > currentTargetHeight) {
      width = '100%';
      left = '0';
      height = currentTargetWidth * imageHeight / imageWidth + 'px';
      top = '-' + (currentTargetWidth * imageHeight / imageWidth - currentTargetHeight) / 2 + 'px';
    } else {
      width = currentTargetHeight * imageWidth / imageHeight + 'px';
      left = '-' + (currentTargetHeight * imageWidth / imageHeight - currentTargetWidth) / 2 + 'px';
      height = '100%';
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

  static throttle(func, interval = 50, isLastExec) {
    let lastTime = performance.now();
    return () => {
      if (isLastExec) {
        this.debounce(func, interval);
      }
      const nowTime = performance.now();
      if (lastTime + interval <= nowTime) {
        lastTime = nowTime;
        func();
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
   * makeWindowWidthResizeEvent
   * @param {function} func
   * @param {bool} isQueryRelation
   *
   */

  static makeWindowWidthResizeEvent(func, isQueryRelation) {
    let currentWindowWidth = window.innerWidth;
    let currentQuery = this.getCurrentQuery();
    return this.debounce(() => {
      const windowWidth = window.innerWidth;
      if (currentWindowWidth !== windowWidth) {
        currentWindowWidth = windowWidth;
        if (isQueryRelation) {
          const query = this.getCurrentQuery();
          if (currentQuery !== query) {
            currentQuery = query;
            func(currentWindowWidth, currentQuery);
          }
        } else {
          func(currentWindowWidth);
        }
      }
    });
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
   *
   */

  static waitScroll() {
    // empty
  }

  /**
   *
   * smoothScroll
   * @param {object} $target
   * @param {number} duration
   *
   */

  static smoothScroll($target, duration = 300) {
    if (!$target) {
      return;
    }
    $target.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const href = $target.getAttribute('href');
      let goalPosition;
      if (href === '#' || href === '#top') {
        goalPosition = 0;
      } else {
        goalPosition = document.querySelector(href).getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientTop;
      }
      const startTime = performance.now();
      const currentPosition = window.pageYOffset;
      const difference = goalPosition - currentPosition;
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

}

export default Utility;
