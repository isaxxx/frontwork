/**
 *
 * Tooltip
 * @param {number} minQuery
 *
 */

'use strict';

import Utility from './utility';

class Tooltip {

  constructor(minQuery) {
    const list = document.querySelectorAll('.js-tooltip');
    const resize = () => {
      if (this.currentQuery >= minQuery) {
        this.map.forEach((unit) => {
          this._setAccessibility(unit);
        });
      } else {
        this._reset(true);
      }
    };
    if (!list.length) {
      return;
    }
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
    resize();
    window.addEventListener('resize', Utility.debounce(() => {
      this.currentQuery = Utility.getCurrentQuery();
      resize();
    }, true));
    this.map.forEach((unit) => {
      unit.$container.addEventListener('mouseover', () => {
        if (this.currentQuery >= minQuery) {
          unit.$container.classList.add('is-hover');
          this._setAccessibility(unit);
        }
      });
      unit.$container.addEventListener('mouseout', () => {
        if (this.currentQuery >= minQuery) {
          unit.$container.classList.remove('is-hover');
          this._setAccessibility(unit);
        }
      });
      if (unit.linkList) {
        [].forEach.call(unit.linkList, ($link) => {
          $link.addEventListener('focus', () => {
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

  _reset(isRemove) {
    this.map.forEach((unit) => {
      unit.$container.classList.remove('is-hover');
      unit.$container.classList.remove('is-focus');
      this._setAccessibility(unit, isRemove);
    });
  }

  _setAccessibility(unit, isRemove) {
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
