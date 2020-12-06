"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = _axios["default"].create({
  baseURL: process.env.VUE_APP_BASE_URL_API
});

exports.api = api;