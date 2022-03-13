"use strict";
(self["webpackChunkreact_webpack"] = self["webpackChunkreact_webpack"] || []).push([[143],{

/***/ 410:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/_react@17.0.2@react/index.js
var _react_17_0_2_react = __webpack_require__(301);
// EXTERNAL MODULE: ./node_modules/_react-dom@17.0.2@react-dom/index.js
var _react_dom_17_0_2_react_dom = __webpack_require__(676);
;// CONCATENATED MODULE: ./src/App.jsx
/* eslint-disable */

function App() {
  return /*#__PURE__*/_react_17_0_2_react.createElement("div", null, /*#__PURE__*/_react_17_0_2_react.createElement("h1", null, "Hello React"), /*#__PURE__*/_react_17_0_2_react.createElement("h2", {
    className: "qf"
  }, "Hello 2115"));
}
/* eslint-enable */
;// CONCATENATED MODULE: ./src/utils/request.js
var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function request() {
  var arr = [1, 2, 3, 4, 2, 1, 3, 4, 5];
  return _toConsumableArray(new Set(arr));
}

function role(C) {
  return C;
} // 装饰器语法


var Dog = role(_class = /*#__PURE__*/function () {
  function Dog() {
    _classCallCheck(this, Dog);
  }

  _createClass(Dog, [{
    key: "run",
    value: function run() {
      console.log('run');
    }
  }]);

  return Dog;
}()) || _class;


;// CONCATENATED MODULE: ./src/main.js
/* eslint-disable */





_react_dom_17_0_2_react_dom.render( /*#__PURE__*/_react_17_0_2_react.createElement(App, null), document.getElementById('root'));
/* eslint-enable */

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(410));
/******/ }
]);