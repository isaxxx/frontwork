/*!
 * Frontwork (https://frontwork.isaxxx.com)
 * Copyright Masahide Isaka
 * MIT License (https://github.com/isaxxx/frontwork/blob/master/LICENSE)
 */

/**
 *
 * main (entry point)
 *
 */

'use strict';

// polyfill
import './polyfill/object-assign'; // IE 11
import './polyfill/intersection-observer'; // IE11, Safari, iOS Safari

// modules
import Utility from './modules/utility';
import Modal from './modules/modal';
import Carousel from './modules/carousel';
import Menu from './modules/menu';
import Accordion from './modules/accordion';
import Tooltip from './modules/tooltip';
import Pagetop from './modules/pagetop';
import Parallax from './modules/parallax';
import Youtube from './modules/youtube';
import GoogleMaps from './modules/google-maps';

// exec
Utility._init();

export {Utility, Modal, Carousel, Menu, Accordion, Tooltip, Pagetop, Parallax, Youtube, GoogleMaps};
