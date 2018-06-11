/**
 *
 * tooltip
 * @param {number} minQuery
 *
 */

'use strict';

import Utility from './utility';

let instance = false;

class Tooltip {

  constructor(minQuery) {
    if (instance) {
      return;
    }
    const list = document.querySelectorAll('.js-tooltip');
    if (!list.length) {
      return;
    }
    instance = true;
    this.currentQuery = Utility.getCurrentQuery();
    this.map = [];
    [].forEach.call(list, ($container) => {
      const $child = $container.querySelector('.js-tooltip__child');
      const linkList = $container.querySelectorAll('a');
      this.map.push({
        $container: $container,
        $child: $child ? $child : null,
        linkList: linkList.length ? linkList : null
      });
    });
    const resize = (query) => {
      this.currentQuery = query;
      if (this.currentQuery >= minQuery) {
        this.map.forEach((unit) => {
          this._setAccessibility(unit);
        });
      } else {
        this._reset(true);
      }
    };
    resize(this.currentQuery);
    window.addEventListener('resize', Utility.makeWindowWidthResizeEvent((windowWidth, query) => {
      resize(query);
    }, true));
    this.map.forEach((unit) => {
      unit.$container.addEventListener('mouseover', (e) => {
        if (this.currentQuery >= minQuery) {
          unit.$container.classList.add('is-hover');
          this._setAccessibility(unit);
        }
      });
      unit.$container.addEventListener('mouseout', (e) => {
        if (this.currentQuery >= minQuery) {
          unit.$container.classList.remove('is-hover');
          this._setAccessibility(unit);
        }
      });
      if (unit.linkList) {
        [].forEach.call(unit.linkList, ($link) => {
          $link.addEventListener('focus', (e) => {
            if (this.currentQuery >= minQuery) {
              this._reset();
              unit.$container.classList.add('is-focus');
              this._setAccessibility(unit);
            }
          });
          $link.addEventListener('blur', (e) => {
            if (this.currentQuery >= minQuery) {
              if (e.relatedTarget) {
                let $target = e.relatedTarget.parentNode;
                while (!$target.classList.contains('js-tooltip')) {
                  $target = $target.parentNode;
                  if ($target === document) {
                    this._reset();
                    break;
                  }
                }
              }
            }
          });
        });
      }
    });
  }

  _reset (isRemove) {
    this.map.forEach((unit) => {
      unit.$container.classList.remove('is-hover');
      unit.$container.classList.remove('is-focus');
      this._setAccessibility(unit, isRemove);
    });
  }

  _setAccessibility (unit, isRemove) {
    if (!unit.$child) {
      return;
    }
    if (isRemove) {
      unit.$child.removeAttribute('aria-hidden');
      return;
    }
    if (unit.$container.classList.contains('is-hover') || unit.$container.classList.contains('is-focus')) {
      unit.$child.setAttribute('aria-hidden', 'false');
    } else {
      unit.$child.setAttribute('aria-hidden', 'true');
    }
  }

}

export default Tooltip;
