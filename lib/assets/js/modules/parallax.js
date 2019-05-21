/**
 *
 * Parallax
 * @param {object} args
 *
 */

'use strict';

import Utility from './utility';

class Parallax {

  constructor(args = {
    useScrollEvent: false,
    weightLevel: 10,
    animationDuration: 500,
    animationTimingFunction: 'cubic-bezier(0, 0.54, 0.20, 1.00)'
  }) {
    const list = document.querySelectorAll('.js-parallax');
    if (!list.length) {
      return;
    }
    this.windowHeight = window.innerHeight;
    this.windowPosition = window.pageYOffset;
    this.map = [];
    [].forEach.call(list, ($el) => {
      const unit = {
        $el: $el,
        x: parseInt($el.getAttribute('data-x')) || 0, // translateX
        y: parseInt($el.getAttribute('data-y')) || 0, // translateY
        state: 0 // 0:before 1:animation 2:after
      };
      unit.$el.style.transitionProperty = 'transform';
      unit.$el.style.transitionDuration = args.animationDuration + 'ms';
      unit.$el.style.transitionTimingFunction = args.animationTimingFunction;
      Utility.loadImages(unit.$el, () => {
        unit.$el.classList.add('is-loaded');
        this._resetProperty(unit);
        this._checkPosition(unit);
      });
      this.map.push(unit);
    });
    this.resize();
    if (args.useScrollEvent) {
      // scroll event
      window.addEventListener('scroll', Utility.throttle(() => {
        this.windowPosition = window.pageYOffset;
        this.map.forEach((unit) => {
          this._checkPosition(unit);
        });
      }, args.weightLevel), Utility.isSupportedPassive() ? {
        passive: true
      } : false);
    } else {
      // requestAnimationFrame
      const checkPosition = () => {
        this.windowPosition = window.pageYOffset;
        this.map.forEach((unit) => {
          this._checkPosition(unit);
        });
        setTimeout(() => {
          requestAnimationFrame(checkPosition);
        }, args.weightLevel);
      };
      requestAnimationFrame(checkPosition);
    }
    window.addEventListener('resize', Utility.debounce(() => {
      this.resize();
    }));
    window.addEventListener('load', () => {
      this.resize();
    });
  }

  resize() {
    this.windowHeight = window.innerHeight;
    this.windowPosition = window.pageYOffset;
    this.map.forEach((unit) => {
      this._resetProperty(unit);
      this._checkPosition(unit);
    });
  }

  _resetProperty(unit) {
    unit.top = unit.$el.getBoundingClientRect().top; // element top position
    unit.height = unit.$el.clientHeight; // element height
    unit.start = unit.top + this.windowPosition - this.windowHeight + unit.y; // absolute start position
    unit.end = unit.top + this.windowPosition + unit.height; // absolute end position
  }

  _checkPosition(unit) {
    if (this.windowPosition < unit.start) {
      this._before(unit);
    } else if (this.windowPosition > unit.end) {
      this._after(unit);
    } else {
      this._animation(unit);
    }
  }

  _before(unit) {
    if (unit.state !== 0) {
      unit.$el.style.transform = 'translate3d(' + unit.x + 'px, ' + unit.y + 'px, 0)';
      unit.state = 0;
    }
  }

  _after(unit) {
    if (unit.state !== 2) {
      unit.$el.style.transform = 'translate3d(0, 0, 0)';
      unit.state = 2;
    }
  }

  _animation(unit) {
    const proportion = 1 - ((this.windowPosition - unit.start) / (unit.end - unit.start));
    unit.$el.style.transform = 'translate3d(' + Math.floor(unit.x * proportion) + 'px, ' + Math.floor(unit.y * proportion) + 'px, 0)';
    unit.state = 1;
  }

}

export default Parallax;
