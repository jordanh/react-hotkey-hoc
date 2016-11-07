'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StopCbMwMgr = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mousetrap = require('mousetrap');

var _mousetrap2 = _interopRequireDefault(_mousetrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StopCbMwMgr = exports.StopCbMwMgr = function () {
  function StopCbMwMgr() {
    _classCallCheck(this, StopCbMwMgr);

    var defaultStopCb = _mousetrap2.default.prototype.stopCallback;
    var defaultMw = function defaultMw(e, element, combo, next) {
      if (!defaultStopCb(e, element, combo)) {
        return next();
      }
      return true;
    };
    this.middleware = new Set();
    this.add(defaultMw);
  }

  _createClass(StopCbMwMgr, [{
    key: 'rebuildMiddware',
    value: function rebuildMiddware() {
      var _this = this;

      var chain = function chain(e, element, combo, next) {
        return next(e, element, combo);
      };
      var use = function use(fn) {
        chain = function (stack) {
          return function (e, element, combo, next) {
            return stack(e, element, combo, function () {
              return fn.call(_this, e, element, combo, next.bind(_this));
            });
          };
        }(chain);
      };
      this.middleware.forEach(function (fn) {
        return use(fn);
      });
      var stopCallback = function stopCallback(e, element, combo) {
        return chain(e, element, combo, function () {
          return false;
        });
      };
      _mousetrap2.default.prototype.stopCallback = stopCallback;
    }
  }, {
    key: 'add',
    value: function add(fn) {
      this.middleware.add(fn);
      this.rebuildMiddware();
    }
  }, {
    key: 'remove',
    value: function remove(fn) {
      this.middleware.delete(fn);
      this.rebuildMiddware();
    }
  }]);

  return StopCbMwMgr;
}();