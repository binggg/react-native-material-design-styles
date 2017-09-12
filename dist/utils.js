'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
var toCamelCase = exports.toCamelCase = function toCamelCase(s1) {
    return s1.replace(/\-(\w)/g, function (x) {
        return x.slice(1).toUpperCase();
    });
};

var htmlToReactStyle = exports.htmlToReactStyle = function htmlToReactStyle(fileContent, Text) {
    var classes = fileContent.match(/--[^\{\}]+\{[^\{\}]*}/mg);
    var classObj = {};

    for (var i in classes) {
        var cls = classes[i];
        var clearCls = cls.replace(/\s/g, '');
        var className = clearCls.match(/--[^:\{]*/)[0].slice(2);
        var classNameCamel = toCamelCase(className);
        var rules = clearCls.match(/[\{;\/][^;\*\/}]+/g);

        classObj[classNameCamel] = {};

        for (var j in rules) {
            var rule = rules[j];
            var clearRule = rule.slice(1);

            var _clearRule$split = clearRule.split(':');

            var _clearRule$split2 = _slicedToArray(_clearRule$split, 2);

            var prop = _clearRule$split2[0];
            var value = _clearRule$split2[1];

            var propCamel = toCamelCase(prop);
            var supportedPrpps = Object.keys(Text);

            if (supportedPrpps.indexOf(propCamel) !== -1) {
                if (Text[propCamel] === 'number') {
                    value = value.replace(/px|rem|em/g, '');
                }
                if (propCamel === 'fontFamily') {
                    // React native (iOS) doesn't support multiple font families in the styles
                    // Presumably because you ship fonts with the app.
                    var fonts = value.split(',');
                    if (fonts.length > 1) {
                        value = fonts[0];
                    }
                }
                value = value.replace(/'/g, '');
                if (!/[^0-9\-\.]/.test(value) && propCamel != 'fontWeight') {
                    value = Number(value);
                }
                classObj[classNameCamel][propCamel] = value;
            }
        }
    }

    return classObj;
};

var colorToReactStyle = exports.colorToReactStyle = function colorToReactStyle(fileContent) {
    var classes = fileContent.match(/--[^;\@\>/\n]+/mg);
    var classObj = {};
    for (var i in classes) {
        var cls = classes[i];
        var clearCls = cls.replace(/\s/g, '');

        var _clearCls$split = clearCls.split(':');

        var _clearCls$split2 = _slicedToArray(_clearCls$split, 2);

        var className = _clearCls$split2[0];
        var value = _clearCls$split2[1];

        var clearClassName = className.slice(2);
        var classNameCamel = toCamelCase(clearClassName);

        classObj[classNameCamel] = {};

        if (value && value.indexOf('#') != -1) {
            classObj[classNameCamel]['color'] = value;
        }

        if (classNameCamel.indexOf('Opacity') != -1) {
            classObj[classNameCamel]['opacity'] = Number(value);
        }
    }

    return classObj;
};