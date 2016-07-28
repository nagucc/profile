(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('babel-runtime/helpers/extends'), require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/core-js/promise'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('mongo-use-collection'), require('nagu-validates')) :
  typeof define === 'function' && define.amd ? define(['exports', 'babel-runtime/helpers/extends', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/promise', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'mongo-use-collection', 'nagu-validates'], factory) :
  (factory((global.nagu-profile = global.nagu-profile || {}),global._extends,global._regeneratorRuntime,global._asyncToGenerator,global._Promise,global._classCallCheck,global._createClass,global.mongoUseCollection,global.naguValidates));
}(this, function (exports,_extends,_regeneratorRuntime,_asyncToGenerator,_Promise,_classCallCheck,_createClass,mongoUseCollection,naguValidates) { 'use strict';

  _extends = 'default' in _extends ? _extends['default'] : _extends;
  _regeneratorRuntime = 'default' in _regeneratorRuntime ? _regeneratorRuntime['default'] : _regeneratorRuntime;
  _asyncToGenerator = 'default' in _asyncToGenerator ? _asyncToGenerator['default'] : _asyncToGenerator;
  _Promise = 'default' in _Promise ? _Promise['default'] : _Promise;
  _classCallCheck = 'default' in _classCallCheck ? _classCallCheck['default'] : _classCallCheck;
  _createClass = 'default' in _createClass ? _createClass['default'] : _createClass;

  // import { mongoUrl } from '../../config';

  var Profle = function () {
    function Profle(url) {
      var collection = arguments.length <= 1 || arguments[1] === undefined ? 'profles' : arguments[1];

      _classCallCheck(this, Profle);

      this.useProfiles = function (cb) {
        return mongoUseCollection.useCollection(url, collection, cb);
      };
    }

    /*
    添加profile
     */


    _createClass(Profle, [{
      key: 'add',
      value: function add() {
        var _this = this;

        var profile = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        return new _Promise(function (resolve, reject) {
          return _this.useProfiles(function () {
            var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(col) {
              var result;
              return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;
                      _context.next = 3;
                      return col.insertOne(profile);

                    case 3:
                      result = _context.sent;

                      resolve(result);
                      _context.next = 10;
                      break;

                    case 7:
                      _context.prev = 7;
                      _context.t0 = _context['catch'](0);

                      reject(_context.t0);

                    case 10:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, _this, [[0, 7]]);
            }));

            return function (_x3) {
              return _ref.apply(this, arguments);
            };
          }());
        });
      }
    }, {
      key: 'getByUserId',
      value: function getByUserId(userid) {
        var _this2 = this;

        return new _Promise(function (resolve, reject) {
          return _this2.useProfiles(function () {
            var _ref2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee2(col) {
              var doc;
              return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.prev = 0;
                      _context2.next = 3;
                      return col.findOne({ userid: userid });

                    case 3:
                      doc = _context2.sent;

                      resolve(doc);
                      _context2.next = 10;
                      break;

                    case 7:
                      _context2.prev = 7;
                      _context2.t0 = _context2['catch'](0);

                      reject(_context2.t0);

                    case 10:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, _this2, [[0, 7]]);
            }));

            return function (_x4) {
              return _ref2.apply(this, arguments);
            };
          }());
        });
      }
    }, {
      key: 'get',
      value: function get(_id) {
        var _this3 = this;

        return new _Promise(function (resolve, reject) {
          return _this3.useProfiles(function () {
            var _ref3 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee3(col) {
              var doc;
              return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.prev = 0;
                      _context3.next = 3;
                      return col.findOne({ _id: _id });

                    case 3:
                      doc = _context3.sent;

                      resolve(doc);
                      _context3.next = 10;
                      break;

                    case 7:
                      _context3.prev = 7;
                      _context3.t0 = _context3['catch'](0);

                      reject(_context3.t0);

                    case 10:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, _callee3, _this3, [[0, 7]]);
            }));

            return function (_x5) {
              return _ref3.apply(this, arguments);
            };
          }());
        });
      }
    }, {
      key: 'findOne',
      value: function findOne(query) {
        var _this4 = this;

        return new _Promise(function (resolve, reject) {
          return _this4.useProfiles(function () {
            var _ref4 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee4(col) {
              var doc;
              return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.prev = 0;
                      _context4.next = 3;
                      return col.findOne(query);

                    case 3:
                      doc = _context4.sent;

                      resolve(doc);
                      _context4.next = 10;
                      break;

                    case 7:
                      _context4.prev = 7;
                      _context4.t0 = _context4['catch'](0);

                      reject(_context4.t0);

                    case 10:
                    case 'end':
                      return _context4.stop();
                  }
                }
              }, _callee4, _this4, [[0, 7]]);
            }));

            return function (_x6) {
              return _ref4.apply(this, arguments);
            };
          }());
        });
      }
    }, {
      key: 'update',
      value: function update(_id) {
        var _this5 = this;

        var profile = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return new _Promise(function (resolve, reject) {
          return _this5.useProfiles(function () {
            var _ref5 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee5(col) {
              var oldDoc, doc;
              return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.prev = 0;
                      _context5.next = 3;
                      return _this5.get(_id);

                    case 3:
                      oldDoc = _context5.sent;
                      doc = _extends({}, oldDoc, profile);
                      _context5.next = 7;
                      return col.updateOne({ _id: _id }, { $set: doc });

                    case 7:
                      resolve(doc);
                      _context5.next = 13;
                      break;

                    case 10:
                      _context5.prev = 10;
                      _context5.t0 = _context5['catch'](0);

                      reject(_context5.t0);

                    case 13:
                    case 'end':
                      return _context5.stop();
                  }
                }
              }, _callee5, _this5, [[0, 10]]);
            }));

            return function (_x8) {
              return _ref5.apply(this, arguments);
            };
          }());
        });
      }
    }, {
      key: 'remove',
      value: function remove(_id) {
        var _this6 = this;

        return new _Promise(function (resolve, reject) {
          return _this6.useProfiles(function () {
            var _ref6 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee6(col) {
              var result;
              return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.prev = 0;
                      _context6.next = 3;
                      return col.remove({ _id: _id });

                    case 3:
                      result = _context6.sent;

                      resolve(result);
                      _context6.next = 10;
                      break;

                    case 7:
                      _context6.prev = 7;
                      _context6.t0 = _context6['catch'](0);

                      reject(_context6.t0);

                    case 10:
                    case 'end':
                      return _context6.stop();
                  }
                }
              }, _callee6, _this6, [[0, 7]]);
            }));

            return function (_x9) {
              return _ref6.apply(this, arguments);
            };
          }());
        });
      }
    }]);

    return Profle;
  }();

  var MongoProfileMiddlewares = function () {
    function MongoProfileMiddlewares(mongoUrl) {
      var collection = arguments.length <= 1 || arguments[1] === undefined ? 'profiles' : arguments[1];
      var getId = arguments[2];

      _classCallCheck(this, MongoProfileMiddlewares);

      this.mongoUrl = mongoUrl;
      this.collection = collection;
      this.getId = getId;
      this.dao = new Profle(this.mongoUrl, this.collection);
    }
    /*
    添加Profile
     */


    _createClass(MongoProfileMiddlewares, [{
      key: 'add',
      value: function add(composeProfile) {
        var _this = this;

        return function () {
          var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(req, res, next) {
            var profile, result;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    profile = composeProfile(req, res);

                    if (profile.name) {
                      _context.next = 5;
                      break;
                    }

                    res.send({
                      ret: naguValidates.OBJECT_IS_UNDEFINED_OR_NULL,
                      msg: '姓名不能为空'
                    });
                    return _context.abrupt('return');

                  case 5:
                    _context.next = 7;
                    return _this.dao.add(profile);

                  case 7:
                    result = _context.sent;

                    req.body._id = result.insertedId;
                    next();
                    _context.next = 15;
                    break;

                  case 12:
                    _context.prev = 12;
                    _context.t0 = _context['catch'](0);

                    res.send({
                      ret: naguValidates.SERVER_FAILED,
                      msg: _context.t0
                    });

                  case 15:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this, [[0, 12]]);
          }));

          return function (_x2, _x3, _x4) {
            return _ref.apply(this, arguments);
          };
        }();
      }
    }, {
      key: 'get',
      value: function get(getId) {
        var _this2 = this;

        var success = arguments.length <= 1 || arguments[1] === undefined ? function (doc, req, res, next) {
          res.profile = doc;
          next();
        } : arguments[1];
        var fail = arguments.length <= 2 || arguments[2] === undefined ? function (result, req, res) {
          res.send(result);
        } : arguments[2];

        return function () {
          var _ref2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee2(req, res, next) {
            var _id, doc;

            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.prev = 0;
                    _id = getId(req, res);
                    _context2.next = 4;
                    return _this2.dao.get(_id);

                  case 4:
                    doc = _context2.sent;

                    success(doc, req, res, next);
                    _context2.next = 11;
                    break;

                  case 8:
                    _context2.prev = 8;
                    _context2.t0 = _context2['catch'](0);

                    fail({
                      ret: naguValidates.SERVER_FAILED,
                      msg: _context2.t0
                    }, req, res, next);

                  case 11:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this2, [[0, 8]]);
          }));

          return function (_x7, _x8, _x9) {
            return _ref2.apply(this, arguments);
          };
        }();
      }
    }, {
      key: 'findOne',
      value: function findOne(getQuery) {
        var _this3 = this;

        var success = arguments.length <= 1 || arguments[1] === undefined ? function (doc, req, res, next) {
          res.profile = doc;
          next();
        } : arguments[1];
        var fail = arguments.length <= 2 || arguments[2] === undefined ? function (result, req, res) {
          res.send(result);
        } : arguments[2];

        return function () {
          var _ref3 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee3(req, res, next) {
            var query, doc;
            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.prev = 0;
                    query = getQuery(req, res);
                    _context3.next = 4;
                    return _this3.dao.findOne(query);

                  case 4:
                    doc = _context3.sent;

                    success(doc, req, res, next);
                    _context3.next = 11;
                    break;

                  case 8:
                    _context3.prev = 8;
                    _context3.t0 = _context3['catch'](0);

                    fail({
                      ret: naguValidates.SERVER_FAILED,
                      msg: _context3.t0
                    }, req, res, next);

                  case 11:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3, _this3, [[0, 8]]);
          }));

          return function (_x12, _x13, _x14) {
            return _ref3.apply(this, arguments);
          };
        }();
      }
    }, {
      key: 'update',
      value: function update(getId, composeProfile) {
        var _this4 = this;

        return function () {
          var _ref4 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee4(req, res, next) {
            var _id, profile;

            return _regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _id = getId(req, res);
                    profile = composeProfile(req, res);
                    _context4.prev = 2;
                    _context4.next = 5;
                    return _this4.dao.update(_id, profile);

                  case 5:
                    next();
                    _context4.next = 11;
                    break;

                  case 8:
                    _context4.prev = 8;
                    _context4.t0 = _context4['catch'](2);

                    res.send({
                      ret: naguValidates.SERVER_FAILED,
                      msg: _context4.t0
                    });

                  case 11:
                  case 'end':
                    return _context4.stop();
                }
              }
            }, _callee4, _this4, [[2, 8]]);
          }));

          return function (_x15, _x16, _x17) {
            return _ref4.apply(this, arguments);
          };
        }();
      }
    }, {
      key: 'remove',
      value: function remove(getId) {
        var _this5 = this;

        return function () {
          var _ref5 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee5(req, res, next) {
            var _id;

            return _regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _id = getId(req, res);
                    _context5.prev = 1;
                    _context5.next = 4;
                    return _this5.dao.remove(_id);

                  case 4:
                    next();
                    _context5.next = 10;
                    break;

                  case 7:
                    _context5.prev = 7;
                    _context5.t0 = _context5['catch'](1);

                    res.send({
                      ret: naguValidates.SERVER_FAILED,
                      msg: _context5.t0
                    });

                  case 10:
                  case 'end':
                    return _context5.stop();
                }
              }
            }, _callee5, _this5, [[1, 7]]);
          }));

          return function (_x18, _x19, _x20) {
            return _ref5.apply(this, arguments);
          };
        }();
      }
    }]);

    return MongoProfileMiddlewares;
  }();

  exports.Profile = Profle;
  exports.MongoProfile = Profle;
  exports.MongoProfileMiddlewares = MongoProfileMiddlewares;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map