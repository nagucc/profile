import _extends from 'babel-runtime/helpers/extends';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _Promise from 'babel-runtime/core-js/promise';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import { useCollection } from 'mongo-use-collection';
import { SERVER_FAILED, OBJECT_IS_UNDEFINED_OR_NULL } from 'nagu-validates';

// import { mongoUrl } from '../../config';

var Profle = function () {
  function Profle(url) {
    var collection = arguments.length <= 1 || arguments[1] === undefined ? 'profles' : arguments[1];

    _classCallCheck(this, Profle);

    this.useProfiles = function (cb) {
      return useCollection(url, collection, cb);
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
    key: 'update',
    value: function update(_id) {
      var _this4 = this;

      var profile = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      return new _Promise(function (resolve, reject) {
        return _this4.useProfiles(function () {
          var _ref4 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee4(col) {
            var oldDoc, doc;
            return _regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.prev = 0;
                    _context4.next = 3;
                    return _this4.get(_id);

                  case 3:
                    oldDoc = _context4.sent;
                    doc = _extends({}, oldDoc, profile);
                    _context4.next = 7;
                    return col.updateOne({ _id: _id }, { $set: doc });

                  case 7:
                    resolve(doc);
                    _context4.next = 13;
                    break;

                  case 10:
                    _context4.prev = 10;
                    _context4.t0 = _context4['catch'](0);

                    reject(_context4.t0);

                  case 13:
                  case 'end':
                    return _context4.stop();
                }
              }
            }, _callee4, _this4, [[0, 10]]);
          }));

          return function (_x7) {
            return _ref4.apply(this, arguments);
          };
        }());
      });
    }
  }, {
    key: 'remove',
    value: function remove(_id) {
      var _this5 = this;

      return new _Promise(function (resolve, reject) {
        return _this5.useProfiles(function () {
          var _ref5 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee5(col) {
            var result;
            return _regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.prev = 0;
                    _context5.next = 3;
                    return col.remove({ _id: _id });

                  case 3:
                    result = _context5.sent;

                    resolve(result);
                    _context5.next = 10;
                    break;

                  case 7:
                    _context5.prev = 7;
                    _context5.t0 = _context5['catch'](0);

                    reject(_context5.t0);

                  case 10:
                  case 'end':
                    return _context5.stop();
                }
              }
            }, _callee5, _this5, [[0, 7]]);
          }));

          return function (_x8) {
            return _ref5.apply(this, arguments);
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
                    ret: OBJECT_IS_UNDEFINED_OR_NULL,
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
                    ret: SERVER_FAILED,
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

                  res.profile = doc;
                  next();
                  _context2.next = 12;
                  break;

                case 9:
                  _context2.prev = 9;
                  _context2.t0 = _context2['catch'](0);

                  res.send({
                    ret: SERVER_FAILED,
                    msg: _context2.t0
                  });

                case 12:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2, [[0, 9]]);
        }));

        return function (_x5, _x6, _x7) {
          return _ref2.apply(this, arguments);
        };
      }();
    }
  }, {
    key: 'update',
    value: function update(getId, composeProfile) {
      var _this3 = this;

      return function () {
        var _ref3 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee3(req, res, next) {
          var _id, profile;

          return _regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _id = getId(req, res);
                  profile = composeProfile(req, res);
                  _context3.prev = 2;
                  _context3.next = 5;
                  return _this3.dao.update(_id, profile);

                case 5:
                  next();
                  _context3.next = 11;
                  break;

                case 8:
                  _context3.prev = 8;
                  _context3.t0 = _context3['catch'](2);

                  res.send({
                    ret: SERVER_FAILED,
                    msg: _context3.t0
                  });

                case 11:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this3, [[2, 8]]);
        }));

        return function (_x8, _x9, _x10) {
          return _ref3.apply(this, arguments);
        };
      }();
    }
  }, {
    key: 'remove',
    value: function remove(getId) {
      var _this4 = this;

      return function () {
        var _ref4 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee4(req, res, next) {
          var _id;

          return _regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _id = getId(req, res);
                  _context4.prev = 1;
                  _context4.next = 4;
                  return _this4.dao.remove(_id);

                case 4:
                  next();
                  _context4.next = 10;
                  break;

                case 7:
                  _context4.prev = 7;
                  _context4.t0 = _context4['catch'](1);

                  res.send({
                    ret: SERVER_FAILED,
                    msg: _context4.t0
                  });

                case 10:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this4, [[1, 7]]);
        }));

        return function (_x11, _x12, _x13) {
          return _ref4.apply(this, arguments);
        };
      }();
    }
  }]);

  return MongoProfileMiddlewares;
}();

export { Profle as Profile, Profle as MongoProfile, MongoProfileMiddlewares };
//# sourceMappingURL=index.es6.js.map