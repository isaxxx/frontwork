/**
 *
 * menu
 * @param {number} maxQuery
 *
 */

'use strict';

import Utility from './utility';

let instance = false;

class Menu {

  constructor(maxQuery) {
    if (instance) {
      return;
    }
    instance = true;
    this.currentQuery = Utility.getCurrentQuery();
    let clickTargetList = [],
      accessibilityTargetList = [];
    const $body = document.querySelector('body');
    const $menu = document.querySelector('.js-menu');
    const $switch = document.querySelector('.js-menu-switch');
    const $layer = document.querySelector('.js-menu-layer');
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
      const resize = (query) => {
        this.currentQuery = query;
        if (maxQuery >= this.currentQuery) {
          accessibilityTargetList.forEach(($target) => {
            $target.setAttribute('aria-hidden', $body.classList.contains('is-menu-open') ? 'false': 'true');
          });
        } else {
          accessibilityTargetList.forEach(($target) => {
            $target.removeAttribute('aria-hidden');
          });
        }
      };
      resize(this.currentQuery);
      window.addEventListener('resize', Utility.makeWindowWidthResizeEvent((windowWidth, query) => {
        resize(query);
      }, true));
      clickTargetList.forEach(($target) => {
        $target.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          console.log('this.currentQuery'+this.currentQuery);
          console.log('maxQuery'+maxQuery);
          if (maxQuery >= this.currentQuery) {
            $body.classList.toggle('is-menu-open');
            accessibilityTargetList.forEach(($target) => {
              $target.setAttribute('aria-hidden', $body.classList.contains('is-menu-open') ? 'false': 'true');
            });
          }
        });
      });
    }
  }

};

export default Menu;
