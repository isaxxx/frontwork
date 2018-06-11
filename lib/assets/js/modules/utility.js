/**
 *
 * utility
 *
 */

'use strict';

class Utility {

  /**
   *
   * imagesLoad
   * @param {object} $target
   * @param {function} callback
   *
   */

  static imagesLoad ($target, callback) {
    const images = $target.querySelectorAll('img, [data-src]');
    if (images.length) {
      const maxCount = images.length;
      let currentCount = 0;
      [].forEach.call(images, ($image) => {
        const img = new Image();
        img.src = $image.getAttribute('src') || $image.getAttribute('data-src');
        img.onload = img.onerror = () => {
          currentCount++;
          if (maxCount === currentCount){
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
   * isTouchDevice
   * @return {bool}
   *
   */

  static isTouchDevice () {
    return typeof document.ontouchstart !== 'undefined';
  }

  /**
   *
   * isIE
   * @return {bool}
   *
   */

  static isIE () {
    return document.uniqueID && document.documentMode === 11;
  }

  /**
   *
   * isTabletDevice
   * @return {bool}
   *
   */

  static isTabletDevice () {
    const ua = navigator.userAgent;
    return ua.indexOf('iPad') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') === -1);
  }

  /**
   *
   * getCurrentQuery
   * @return {number}
   *
   */

  static getCurrentQuery () {
    return +(getComputedStyle(document.querySelector('body'), ':after').getPropertyValue('content').replace(/"/g, ''));
  }

  /**
   *
   * setTabletViewport
   * @param {string} value
   *
   */

  static setTabletViewport (value) {
    const meta = document.querySelector('meta[name=viewport]');
    if ( this.isTabletDevice ) {
      meta.setAttribute('content', value);
    }
  }

  /**
   *
   * splitBySpan
   * @param {object} $target
   *
   */

  static splitBySpan ($target) {
    $target.innerHTML = $target.textContent.replace(/(\S)/g, '<span>$1</span>');
  }

  /**
   *
   * slideUp
   * @param {object} $target
   * @param {function} callback
   * @param {number} duration
   *
   */

  static slideUp ($target, callback, duration) {
    callback = callback || function () {};
    duration = duration || 200;
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
    }
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

  static slideDown ($target, callback, duration) {
    callback = callback || function () {};
    duration = duration || 200;
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
    }
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

  static slideToggle ($target, callback, duration) {
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

  static easing (elapsedTime, currentPosition, difference, duration) {
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

  static throttle (func, interval, isLastExec) {
    interval = interval || 50;
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

  static debounce (func, interval) {
  	interval = interval || 500;
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

  static makeWindowWidthResizeEvent (func, isQueryRelation) {
    let currentWindowWidth = window.innerWidth,
      currentQuery = this.getCurrentQuery();
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
   * fixHeight
   * @param {object} $target
   *
   */

  static fixHeight ($target) {
    $target.style.height = $target.offsetHeight + 'px';
    window.addEventListener('resize', this.makeWindowWidthResizeEvent(() => {
      $target.style.height = '';
      $target.style.height = $target.offsetHeight + 'px';
    }));
  }

  /**
   *
   * isSupportedPassive
   * @return {bool}
   *
   */

  static isSupportedPassive () {
    let res = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: () => {
          res = true;
        }
      });
      window.addEventListener('testCase', opts, opts);
      window.removeEventListener('testCase', opts, opts);
    } catch (e) {}
    return res;
  }

  /**
   *
   * smoothScroll
   * @param {object} $target
   * @param {number} duration
   *
   */

  static smoothScroll ($target, duration) {
    if (!$target) {
      return;
    }
    duration = duration || 300;
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
        }
      };
      scroll();
    });
  }

  /**
   *
   * waitScroll
   * @param {object} targetList
   * @param {number} threshold
   *
   */

  static waitScroll (targetList, threshold) {
    if (!targetList.length) {
      return;
    }
    threshold = threshold !== undefined ? threshold : 0.5;
    const observer = new IntersectionObserver((changes) => {
      for (const change of changes) {
        console.log(change.target.getBoundingClientRect().top);
        if (change.isIntersecting) {
          change.target.classList.add('is-scrolled');
        } else if (0 < change.target.getBoundingClientRect().top) {
          change.target.classList.remove('is-scrolled');
        }
      }
    }, {
      threshold: [threshold]
    });
    [].forEach.call(targetList, ($target) => {
      observer.observe($target);
    });
  }

  /**
   *
   * _init
   *
   */

  static _init () {
    this._addBodyClass();
  }

  /**
   *
   * _addBodyClass
   *
   */

  static _addBodyClass () {
    document.addEventListener('DOMContentLoaded', () => {
      const $body = document.querySelector('body');
      $body.classList.add('is-ready');
      if (this.isIE()) {
        $body.classList.add('is-ie');
      }
      if (this.isTouchDevice()) {
        $body.classList.add('is-touch-device');
      }
      window.addEventListener('load', () => {
        $body.classList.add('is-loaded');
      });
    });
  }

}

export default Utility;
