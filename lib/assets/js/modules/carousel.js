/**
 *
 * Carousel
 * @param {object} $target
 * @param {object} param
 *
 */

'use strict';

import Utility from './utility';

class Carousel {

  constructor($target, param) {
    const defaultParam = {
      usePager: true,
      useControls: true,
      isAuto: true,
      animationDuration: 500,
      animationType: 'horizontal', // 'horizontal' or 'fade'
      pauseTime: 3000,
      onLoaded: function() {},
      onMoveBefore: function() {},
      onMoveAfter: function() {},
      onResized: function() {}
    };
    if (!$target) {
      return;
    }
    this.config = Object.assign(defaultParam, param);
    this.$target = $target;
    this.currentIndex = 0;
    this.autoTimer = false;
    this.isMove = false;
    this.childList = this.$target.children;
    this.childListLength = this.childList.length;
    this.$container = this._buildContainer();
    this.pagerList = this._buildPager();
    this.controls = this._buildControls();
    Utility.loadImages(this.$target, () => {
      this._load();
    });
  }

  resize() {
    if (this.config.animationType === 'fade') {
      let maxWidth = 0;
      let maxHeight = 0;
      this.$target.style.height = '';
      this.$target.style.width = '';
      [].forEach.call(this.childList, ($child) => {
        const height = $child.offsetHeight;
        const width = $child.offsetWidth;
        if (maxHeight < height) {
          maxHeight = height;
        }
        if (maxWidth < width) {
          maxWidth = width;
        }
      });
      this.$target.style.height = maxHeight + 'px';
      this.$target.style.width = maxWidth + 'px';
    } else if (this.config.animationType === 'horizontal') {
      this.$target.style.transform = 'translate3d(-' + (this.childList[0].offsetWidth * this.currentIndex) + 'px, 0, 0)';
    }
  }

  move(number) {
    if (number !== this.currentIndex && !this.isMove) {
      this._moveBefore(number);
      if (this.config.animationType === 'fade') {
        const after = () => {
          this.childList[this.currentIndex].removeEventListener('transitionend', after);
          this._moveAfter(number);
        };
        this._changeZIndex(number);
        this.childList[number].style.opacity = 1;
        this.childList[number].style.visibility = 'visible';
        this.childList[this.currentIndex].style.opacity = 0;
        this.childList[this.currentIndex].style.visibility = 'hidden';
        this.childList[this.currentIndex].addEventListener('transitionend', after);
      } else if (this.config.animationType === 'horizontal') {
        const after = () => {
          this.$target.removeEventListener('transitionend', after);
          this.$target.style.transitionDuration = '0ms';
          this._moveAfter(number);
        };
        this.$target.style.transitionDuration = this.config.animationDuration + 'ms';
        this.$target.style.transform = 'translate3d(-' + (this.childList[0].offsetWidth * number) + 'px, 0, 0)';
        this.$target.addEventListener('transitionend', after);
      }
    }
  }

  next() {
    const nextIndex = this.currentIndex !== this.childListLength - 1 ? this.currentIndex + 1 : 0;
    this.move(nextIndex);
  }

  prev() {
    const prevIndex = this.currentIndex ? this.currentIndex - 1 : this.childListLength - 1;
    this.move(prevIndex);
  }

  stop() {
    if (!this.isMove) {
      this.config.isAuto = !this.config.isAuto;
      if (this.autoTimer !== false) {
        clearTimeout(this.autoTimer);
      }
      if (this.config.useControls) {
        this.controls.$stop.innerHTML = this.config.isAuto ? 'AUTO PLAY : ON' : 'AUTO PLAY : OFF';
      }
      if (this.config.isAuto) {
        this.next();
      }
    }
  }

  _buildContainer() {
    const $container = document.createElement('div');
    $container.classList.add('js-carousel');
    if (this.config.animationType === 'fade') {
      $container.classList.add('js-carousel--fade');
    } else if (this.config.animationType === 'horizontal') {
      $container.classList.add('js-carousel--horizontal');
    }
    this.$target.parentNode.insertBefore($container, this.$target);
    $container.appendChild(this.$target);
    this.$target.classList.add('js-carousel__slide');
    [].forEach.call(this.childList, ($child) => {
      $child.classList.add('js-carousel__item');
    });
    return $container;
  }

  _buildPager() {
    if (this.config.usePager) {
      const $pager = document.createElement('ul');
      let pagerList = [];
      $pager.classList.add('js-carousel__pager');
      for (let i = 0; i < this.childListLength; i++) {
        const $pagerItem = document.createElement('li');
        const $pagerLink = document.createElement('a');
        $pagerLink.setAttribute('href', '#');
        $pagerLink.innerHTML = i;
        $pagerItem.appendChild($pagerLink);
        $pager.appendChild($pagerItem);
        pagerList[i] = $pagerItem;
        ((i) => {
          $pagerLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.move(i);
          });
        })(i);
      }
      this.$container.appendChild($pager);
      return pagerList;
    } else {
      return false;
    }
  }

  _buildControls() {
    if (this.config.useControls) {
      const $prev = document.createElement('a');
      const $next = document.createElement('a');
      const $stop = document.createElement('a');
      $prev.classList.add('js-carousel__prev');
      $next.classList.add('js-carousel__next');
      $stop.classList.add('js-carousel__stop');
      $prev.setAttribute('href', '#');
      $next.setAttribute('href', '#');
      $stop.setAttribute('href', '#');
      $prev.innerHTML = 'PREV';
      $next.innerHTML = 'NEXT';
      $stop.innerHTML = this.config.isAuto ? 'AUTO PLAY : ON' : 'AUTO PLAY : OFF';
      this.$container.appendChild($prev);
      this.$container.appendChild($next);
      this.$container.appendChild($stop);
      $prev.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.prev();
      });
      $next.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.next();
      });
      $stop.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.stop();
      });
      return {
        $prev: $prev,
        $next: $next,
        $stop: $stop
      };
    } else {
      return false;
    }
  }

  _load() {
    if (this.config.animationType === 'fade') {
      this._changeZIndex(0);
      [].forEach.call(this.childList, ($child) => {
        $child.style.opacity = 0;
        $child.style.visibility = 'hidden';
        $child.style.transitionDuration = this.config.animationDuration + 'ms, ' + this.config.animationDuration + 'ms';
      });
      this.childList[0].style.opacity = 1;
      this.childList[0].style.visibility = 'visible';
    } else if (this.config.animationType === 'horizontal') {
      this.$target.style.transform = 'translate3d(0, 0, 0)';
    }
    this._setAccessibility(0);
    this.resize();
    this.$container.classList.add('is-loaded');
    requestAnimationFrame(() => {
      this.childList[this.currentIndex].classList.add('is-show');
      if (this.config.usePager) {
        this.pagerList[this.currentIndex].classList.add('is-current');
      }
    });
    this._bindEvent();
    this.config.onLoaded();
    if (this.config.isAuto) {
      this.autoTimer = setTimeout(() => {
        this.next();
      }, this.config.pauseTime);
    }
  }

  _moveBefore(number) {
    this.config.onMoveBefore();
    this.isMove = true;
    this.childList[this.currentIndex].classList.add('is-leaving');
    this.childList[this.currentIndex].classList.remove('is-show');
    this.childList[number].classList.add('is-show');
    if (this.config.usePager) {
      this.pagerList[this.currentIndex].classList.remove('is-current');
      this.pagerList[number].classList.add('is-current');
    }
    this._setAccessibility(number);
  }

  _moveAfter(number) {
    this.childList[this.currentIndex].classList.remove('is-leaving');
    this.currentIndex = number;
    this.isMove = false;
    this.config.onMoveAfter();
    if (this.config.isAuto) {
      if (this.autoTimer !== false) {
        clearTimeout(this.autoTimer);
      }
      this.autoTimer = setTimeout(() => {
        this.next();
      }, this.config.pauseTime);
    }
  }

  _bindEvent() {
    window.addEventListener('resize', Utility.debounce(() => {
      this.resize();
      this.config.onResized();
    }));
    if (this.config.useControls) {
      document.addEventListener('keydown', (e) => {
        const key = e.keyCode;
        if (key === 37) {
          this.prev();
        } else if (key === 39) {
          this.next();
        } else if (key === 13) {
          this.stop();
        }
      });
    }
  }

  _setAccessibility(number) {
    [].forEach.call(this.childList, ($child) => {
      $child.setAttribute('tabindex', '-1');
      $child.setAttribute('aria-hidden', 'true');
    });
    this.childList[number].removeAttribute('tabindex');
    this.childList[number].setAttribute('aria-hidden', 'false');
  }

  _changeZIndex(number) {
    this.childList[this.currentIndex].style.zIndex = 3;
    this.childList[number].style.zIndex = 2;
    [].forEach.call(this.childList, ($child, index) => {
      if (index !== this.currentIndex && index !== number) {
        $child.style.zIndex = 1;
      }
    });
  }

}

export default Carousel;
