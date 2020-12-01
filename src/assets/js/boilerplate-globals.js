// Polyfills
import 'es6-promise/auto';

import 'unfetch/polyfill';

import Globals from './modules/globals/globals-index.js';

window.DOM = window.DOM || {};

document.addEventListener('DOMContentLoaded', Globals.init);