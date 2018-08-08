/**
 *
 * Menu
 * @param {number} maxQuery
 *
 */

'use strict';

import Utility from './utility';

class Menu {

  constructor(maxQuery) {
    const $body = document.querySelector('body');
    const $menu = document.querySelector('.js-menu');
    const $switch = document.querySelector('.js-menu-switch');
    const $layer = document.querySelector('.js-menu-layer');
    let clickTargetList = [];
    let accessibilityTargetList = [];
    this.currentQuery = Utility.getCurrentQuery();
    if ($menu) {
      accessibilityTargetList.push($menu);
    }
    if ($switch) {
      clickTargetList.push($switch);
    }
    if ($layer) {
      clickTargetList.push($layer);
      accessibilityTargetList.push($layer);
    }
    if (clickTargetList.length > 0) {
      const resize = () => {
        if (maxQuery >= this.currentQuery) {
          accessibilityTargetList.forEach(($target) => {
            $target.setAttribute('aria-hidden', $body.classList.contains('is-menu-open') ? 'false' : 'true');
          });
        } else {
          accessibilityTargetList.forEach(($target) => {
            $target.removeAttribute('aria-hidden');
          });
        }
      };
      resize();
      window.addEventListener('resize', Utility.debounce(() => {
        this.currentQuery = Utility.getCurrentQuery();
        resize();
      }));
      clickTargetList.forEach(($target) => {
        $target.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          if (maxQuery >= this.currentQuery) {
            $body.classList.toggle('is-menu-open');
            accessibilityTargetList.forEach(($target) => {
              $target.setAttribute('aria-hidden', $body.classList.contains('is-menu-open') ? 'false' : 'true');
            });
          }
        });
      });
    } else {
      return;
    }
  }

}

export default Menu;
