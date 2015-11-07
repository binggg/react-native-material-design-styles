'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utils = require('./utils');

var _supportedProperties = require('./supportedProperties');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by binggg on 2015/11/6.
 */

var typographyFilePath = _path2.default.join(__dirname, '../bower_components/paper-styles/');
var fileContent = _fs2.default.readFileSync(typographyFilePath + 'typography.html', 'utf8');

function getTypography() {
  return (0, _utils.htmlToReactStyle)(fileContent, _supportedProperties.Text);
}

exports.default = getTypography;