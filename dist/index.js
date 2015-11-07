'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTheme = exports.color = exports.typography = undefined;

var _typography = require('./typography');

var _typography2 = _interopRequireDefault(_typography);

var _color = require('./color');

var _color2 = _interopRequireDefault(_color);

var _defaultTheme = require('./defaultTheme');

var _defaultTheme2 = _interopRequireDefault(_defaultTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typography = exports.typography = (0, _typography2.default)();
var color = exports.color = (0, _color2.default)();
var defaultTheme = exports.defaultTheme = (0, _defaultTheme2.default)();