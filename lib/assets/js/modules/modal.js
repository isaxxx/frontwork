/**
 *
 * modal
 * @param {object} targetList
 * @param {object} param
 *
 */

'use strict';

import Utility from './utility';

class Modal {

  constructor(targetList, param) {
    if (!targetList.length) {
      return;
    }
    const defaultParam = {
      useControls: true,
      isLoadingTest: false, // check loading animation
      onOpenBefore: function () {},
      onOpenAfter: function () {},
      onResized: function () {}
    };
    this.config = Object.assign(defaultParam, param);
    this.targetList = targetList;
    this.currentIndex = 0;
    this.isOpen = false;
    this.isMove = false;
    this.dataList = {};
    [].forEach.call(this.targetList, ($target, index) => {
      const data = $target.getAttribute('href');
      this.dataList[index] = {};
      this.dataList[index]['data'] = data;
      $target.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.open(index);
      });
    });
    this.dataListLength = Object.keys(this.dataList).length;
    this.modal = this._buildContainer();
    const controls = this._buildControls();
    if (controls) {
      this.modal = Object.assign(this.modal, controls);
    }
    this._bindEvent();
  }

  resize () {
    if (this.isOpen) {
      this.modal.$frame.style.height = this.modal.$content.offsetHeight + 'px';
      this.modal.$frame.style.width = this.modal.$content.offsetWidth + 'px';
    }
  }

  open (index) {
    if (this.isOpen && (this.currentIndex === index || this.dataListLength === 1)) {
      return;
    }
    let isFocus = false;
    if (!this.isOpen) {
      isFocus = true;
      this.modal.$container.classList.add('is-show');
      this.modal.$container.setAttribute('aria-hidden', 'false');
      this.isOpen = true;
    }
    this.currentIndex = index;
    this._insertContent(() => {
      if (isFocus) {
        this.modal.$content.focus();
      }
    });
  }

  prev () {
    if (this.isOpen && this.config.useControls && this.dataListLength > 1) {
      const prevIndex = this.currentIndex === 0 ? this.dataListLength - 1 : this.currentIndex - 1;
      this.open(prevIndex);
    }
  }

  next () {
    if (this.isOpen && this.config.useControls && this.dataListLength > 1) {
      const nextIndex = this.currentIndex === this.dataListLength - 1 ? 0 : this.currentIndex + 1;
      this.open(nextIndex);
    }
  }

  close () {
    if (this.isOpen) {
      this.modal.$container.classList.remove('is-show');
      this.modal.$container.setAttribute('aria-hidden', 'true');
      this.isOpen = false;
      this.isMove = false;
      this.modal.$content.innerHTML = '';
      this.targetList[this.currentIndex].focus();
    }
  }

  _buildContainer () {
    const $container = document.createElement('div');
    const $content = document.createElement('div');
    const $controls = document.createElement('div');
    const $controlsContainer = document.createElement('div');
    const $frame = document.createElement('div');
    const $loading = document.createElement('div');
    const $close = document.createElement('a');
    $container.classList.add('js-modal');
    $content.classList.add('js-modal__content');
    $controls.classList.add('js-modal__controls');
    $controlsContainer.classList.add('js-modal__controls-container');
    $frame.classList.add('js-modal__frame');
    $loading.classList.add('js-modal__loading');
    $close.classList.add('js-modal__close');
    $container.setAttribute('aria-hidden', 'true');
    $content.setAttribute('tabindex', '0');
    $close.setAttribute('href', '#');
    $close.innerHTML = 'CLOSE';
    $loading.innerHTML = 'LOADING';
    $controlsContainer.appendChild($frame);
    $controlsContainer.appendChild($close);
    $controls.appendChild($controlsContainer);
    $container.appendChild($content);
    $container.appendChild($controls);
    $container.appendChild($loading);
    $container.addEventListener('click', (e) => {
      e.stopPropagation();
      this.close();
    });
    $content.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    $close.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.close();
    });
    document.querySelector('body').appendChild($container);
    return {
      $container: $container,
      $content: $content,
      $controls: $controls,
      $controlsContainer: $controlsContainer,
      $frame: $frame,
      $loading: $loading,
      $close: $close
    };
  }

  _buildControls () {
    if (this.config.useControls && this.dataListLength > 1) {
      const $prev = document.createElement('a');
      const $next = document.createElement('a');
      $prev.classList.add('js-modal__prev');
      $next.classList.add('js-modal__next');
      $prev.setAttribute('href', '#');
      $next.setAttribute('href', '#');
      $prev.innerHTML = 'PREV';
      $next.innerHTML = 'NEXT';
      this.modal.$controlsContainer.appendChild($prev);
      this.modal.$controlsContainer.appendChild($next);
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
      return {
        $prev: $prev,
        $next: $next
      };
    } else {
      return false;
    }
  }

  _bindEvent () {
    window.addEventListener('resize', Utility.debounce(() => {
      this.resize();
      this.config.onResized();
    }));
    document.addEventListener('keydown', (e) => {
      if (this.isOpen) {
        const key = e.keyCode;
        const $target = e.target;
        if (key === 37) {
          this.prev();
        } else if (key === 39) {
          this.next();
        } else if (key === 27) {
          this.close();
        } else if (key === 9) {
          if (!this.modal.$container.contains($target)) {
            if (e.shiftKey) {
              if (this.config.useControls && this.dataListLength > 1) {
                this.modal.$next.focus();
              } else {
                this.modal.$close.focus();
              }
            } else {
              this.modal.$content.focus();
            }
          }
        }
      }
    });
    document.addEventListener('keyup', (e) => {
      if (this.isOpen) {
        const key = e.keyCode;
        const $target = e.target;
        if (key === 9) {
          if (!this.modal.$container.contains($target)) {
            if (e.shiftKey) {
              if (this.config.useControls && this.dataListLength > 1) {
                this.modal.$next.focus();
              } else {
                this.modal.$close.focus();
              }
            } else {
              this.modal.$content.focus();
            }
          }
        }
      }
    });
  }

  _insertContent (callback) {
    callback = callback || function () {};
    this.modal.$content.innerHTML = '';
    this.modal.$loading.style.display = 'block';
    this.modal.$content.classList.remove('is-show');
    this.isMove = true;
    this.config.onOpenBefore();
    if (!this.config.isLoadingTest) {
      const data = this.dataList[this.currentIndex].data;
      this.modal.$content.innerHTML = this._createContent(data);
      Utility.imagesLoad(this.modal.$content, () => {
        if (this.isMove) {
          this.resize();
          this.modal.$loading.style.display = 'none';
          this.modal.$content.classList.add('is-show');
          this.isMove = false;
          this.config.onOpenAfter();
          callback();
        }
      });
    }
  }

  _createContent (data) {
    if (data.slice(0, 1) === '#') {
      return document.querySelector(data).innerHTML;
    } else if (data.match(/\.(jpg|png|gif|svg)$/)) {
      if (Utility.isTouchDevice()) {
        return '<a href="' + data + '"><img src="' + data + '" alt="" /></a>';
      } else {
        return '<img src="' + data + '" alt="" />';
      }
    } else {
      return '<iframe src="' + data + '"></iframe>';
    }
  }

};

export default Modal;
