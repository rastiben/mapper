'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animation = exports.theme = exports.ContextMenu = exports.Submenu = exports.IconFont = exports.ContextMenuProvider = exports.Separator = exports.Item = undefined;

var _Item = require('./components/Item');

Object.defineProperty(exports, 'Item', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Item).default;
  }
});

var _Separator = require('./components/Separator');

Object.defineProperty(exports, 'Separator', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Separator).default;
  }
});

var _ContextMenuProvider = require('./components/ContextMenuProvider');

Object.defineProperty(exports, 'ContextMenuProvider', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ContextMenuProvider).default;
  }
});

var _IconFont = require('./components/IconFont');

Object.defineProperty(exports, 'IconFont', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_IconFont).default;
  }
});

var _Submenu = require('./components/Submenu');

Object.defineProperty(exports, 'Submenu', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Submenu).default;
  }
});

var _ContextMenu = require('./components/ContextMenu');

var _ContextMenu2 = _interopRequireDefault(_ContextMenu);

var _withProxy = require('./util/withProxy');

var _withProxy2 = _interopRequireDefault(_withProxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Ctx = (0, _withProxy2.default)(_ContextMenu2.default);
var theme = {
  light: 'light',
  dark: 'dark'
};
var animation = {
  fade: 'fade',
  flip: 'flip',
  pop: 'pop',
  zoom: 'zoom'
};

exports.ContextMenu = Ctx;
exports.theme = theme;
exports.animation = animation;