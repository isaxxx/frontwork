/*!
 * Frontwork (https://frontwork.isaxxx.com)
 * Copyright Masahide Isaka
 * MIT License (https://github.com/isaxxx/frontwork/blob/master/LICENSE)
 */

'use strict';

// polyfill
import './polyfill/object-assign'; // IE 11

// modules
import Utility from './modules/utility';
import Modal from './modules/modal';
import Carousel from './modules/carousel';
import Menu from './modules/menu';
import Accordion from './modules/accordion';
import Tooltip from './modules/tooltip';
import Parallax from './modules/parallax';

// frontwork object
const Frontwork = {};
Frontwork.Utility = Utility;
Frontwork.Modal = Modal;
Frontwork.Carousel = Carousel;
Frontwork.Menu = Menu;
Frontwork.Accordion = Accordion;
Frontwork.Tooltip = Tooltip;
Frontwork.Parallax = Parallax;

export default Frontwork;
