'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mousetrap = require('mousetrap');

var _mousetrap2 = _interopRequireDefault(_mousetrap);

var _stopCbMwMgr = require('./stopCbMwMgr');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// initialize stopCallback Middleware Manager singleton:
var stopCbMwMgr = new _stopCbMwMgr.StopCbMwMgr();

exports.default = function (ComposedComponent) {
  return function (_Component) {
    _inherits(WithHotkey, _Component);

    function WithHotkey(props) {
      _classCallCheck(this, WithHotkey);

      var _this = _possibleConstructorReturn(this, (WithHotkey.__proto__ || Object.getPrototypeOf(WithHotkey)).call(this, props));

      _this.bindHotkey = function (key, callback, action) {
        _mousetrap2.default.bind(key, callback, action);
        _this.bindings.push(key);
      };

      _this.unbindHotkey = function (key) {
        _mousetrap2.default.unbind(key);
      };

      _this.addHotkeyStopMw = function (cb) {
        stopCbMwMgr.add(cb);
      };

      _this.removeHotkeyStopMw = function (cb) {
        stopCbMwMgr.remove(cb);
      };

      _this.bindings = [];
      return _this;
    }

    _createClass(WithHotkey, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var _this2 = this;

        this.bindings.forEach(function (key) {
          return _this2.unbindHotkey(key);
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ComposedComponent, _extends({
          bindHotkey: this.bindHotkey,
          unbindHotkey: this.unbindHotkey,
          addHotkeyStopMw: this.addHotkeyStopMw,
          removeHotkeyStopMw: this.removeHotkeyStopMw
        }, this.props));
      }
    }]);

    return WithHotkey;
  }(_react.Component);
};