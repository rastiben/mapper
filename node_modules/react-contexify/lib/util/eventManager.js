"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var eventManager = {
  eventList: new Map(),
  on: function on(event, callback) {
    var _this = this;

    this.eventList.has(event) || this.eventList.set(event, new Set());
    this.eventList.get(event).add(callback);

    return function () {
      return _this.eventList.get(event).delete(callback);
    };
  },
  emit: function emit(event) {
    var _this2 = this;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (!this.eventList.has(event)) {
      console.warn("<" + event + "> Event is not registered. Did you forgot to bind the event ?");
      return false;
    }
    this.eventList.get(event).forEach(function (cb) {
      return cb.call.apply(cb, [_this2].concat(_toConsumableArray(args)));
    });

    return true;
  }
};

exports.default = eventManager;