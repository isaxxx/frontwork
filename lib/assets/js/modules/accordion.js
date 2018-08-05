/**
 *
 * accordion
 * @param {number} maxQuery
 *
 */

'use strict';

import Utility from './utility';

let instance = false;

class Accordion {
  constructor(maxQuery) {
    const list = document.querySelectorAll('.js-accordion');
    if (instance || !list.length) {
      return;
    }
    instance = true;
    this.maxQuery = maxQuery;
    this.currentQuery = Utility.getCurrentQuery();
    this.map = [];
    [].forEach.call(list, ($container) => {
      const $switch = $container.querySelector('.js-accordion__switch');
      const $content = $container.querySelector('.js-accordion__content');
      this.map.push({
        $container: $container,
        $switch: $switch || null,
        $content: $content || null,
        isMove: false
      });
    });
    this.map.forEach((unit) => {
      if (unit.$switch) {
        unit.$switch.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          if (maxQuery >= this.currentQuery && !unit.isMove) {
            unit.isMove = true;
            unit.$container.classList.toggle('is-open');
            Utility.slideToggle(unit.$content, () => {
              this._setAccessibility(unit);
              unit.isMove = false;
            });
          }
        });
      }
    });
    this._bindEvents();
  }

  _bindEvents() {
    const resize = (query) => {
      this.currentQuery = query;
      const isRemove = this.maxQuery >= query ? false : true;
      this.map.forEach((unit) => {
        this._setAccessibility(unit, isRemove);
      });
    };
    resize(this.currentQuery);
    window.addEventListener('resize', Utility.makeWindowWidthResizeEvent((windowWidth, query) => {
      resize(query);
    }, true));
  }

  _setAccessibility(unit, isRemove) {
    if (unit.$content) {
      if (isRemove) {
        unit.$content.removeAttribute('aria-hidden');
        unit.$content.removeAttribute('aria-expanded');
      } else {
        if (unit.$container.classList.contains('is-open')) {
          unit.$content.setAttribute('aria-hidden', 'false');
          unit.$content.setAttribute('aria-expanded', 'true');
        } else {
          unit.$content.setAttribute('aria-hidden', 'true');
          unit.$content.setAttribute('aria-expanded', 'false');
        }
      }
    }
  }
}

export default Accordion;
