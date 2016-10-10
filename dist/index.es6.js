import _extends from 'babel-runtime/helpers/extends';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _Promise from 'babel-runtime/core-js/promise';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import { useCollection } from 'mongo-use-collection';
import { REQUIRED, SERVER_FAILED, OBJECT_IS_NOT_FOUND, OBJECT_IS_UNDEFINED_OR_NULL } from 'nagu-validates';

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
    value: function add() {
      var composeProfile = arguments.length <= 0 || arguments[0] === undefined ? function (req) {
        return req.body;
      } : arguments[0];

      var _this = this;

      var success = arguments.length <= 1 || arguments[1] === undefined ? function (profile, req, res, next) {
        return next();
      } : arguments[1];
      var fail = arguments.length <= 2 || arguments[2] === undefined ? function (err, req, res) {
        return res.send(err);
      } : arguments[2];

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

                  fail({
                    ret: OBJECT_IS_UNDEFINED_OR_NULL,
                    msg: '姓名不能为空'
                  }, req, res, next);
                  return _context.abrupt('return');

                case 5:
                  _context.next = 7;
                  return _this.dao.add(profile);

                case 7:
                  result = _context.sent;

                  success(_extends({ _id: result.insertedId }, profile), req, res, next);
                  _context.next = 14;
                  break;

                case 11:
                  _context.prev = 11;
                  _context.t0 = _context['catch'](0);

                  fail({
                    ret: SERVER_FAILED,
                    msg: _context.t0
                  }, req, res, next);

                case 14:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this, [[0, 11]]);
        }));

        return function (_x5, _x6, _x7) {
          return _ref.apply(this, arguments);
        };
      }();
    }
    // 根据Id获取profile

  }, {
    key: 'get',
    value: function get() {
      var getId = arguments.length <= 0 || arguments[0] === undefined ? function (req) {
        return req.params.id;
      } : arguments[0];

      var _this2 = this;

      var success = arguments.length <= 1 || arguments[1] === undefined ? function (doc, req, res, next) {
        return next();
      } : arguments[1];
      var fail = arguments.length <= 2 || arguments[2] === undefined ? function (result, req, res) {
        return res.send(result);
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

                  if (_id) {
                    _context2.next = 5;
                    break;
                  }

                  fail({ ret: OBJECT_IS_UNDEFINED_OR_NULL, msg: '必须指定id' }, req, res, next);
                  return _context2.abrupt('return');

                case 5:
                  _context2.next = 7;
                  return _this2.dao.get(_id);

                case 7:
                  doc = _context2.sent;

                  success(doc, req, res, next);
                  _context2.next = 14;
                  break;

                case 11:
                  _context2.prev = 11;
                  _context2.t0 = _context2['catch'](0);

                  fail({
                    ret: SERVER_FAILED,
                    msg: _context2.t0
                  }, req, res, next);

                case 14:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2, [[0, 11]]);
        }));

        return function (_x11, _x12, _x13) {
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
                    ret: SERVER_FAILED,
                    msg: _context3.t0
                  }, req, res, next);

                case 11:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this3, [[0, 8]]);
        }));

        return function (_x16, _x17, _x18) {
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
                    ret: SERVER_FAILED,
                    msg: _context4.t0
                  });

                case 11:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this4, [[2, 8]]);
        }));

        return function (_x19, _x20, _x21) {
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
                    ret: SERVER_FAILED,
                    msg: _context5.t0
                  });

                case 10:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, _this5, [[1, 7]]);
        }));

        return function (_x22, _x23, _x24) {
          return _ref5.apply(this, arguments);
        };
      }();
    }

    // 判断当前用户是否是指定profile的所有者

  }, {
    key: 'isOwner',
    value: function isOwner() {
      var getId = arguments.length <= 0 || arguments[0] === undefined ? function () {
        return null;
      } : arguments[0];
      var getCurrentUserId = arguments.length <= 1 || arguments[1] === undefined ? function () {
        return null;
      } : arguments[1];

      var _this6 = this;

      var success = arguments.length <= 2 || arguments[2] === undefined ? function (result, req, res, next) {
        return next();
      } : arguments[2];
      var fail = arguments.length <= 3 || arguments[3] === undefined ? function (err, req, res) {
        return res.send(err);
      } : arguments[3];

      return function () {
        var _ref6 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee6(req, res, next) {
          var id, data, userid;
          return _regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.prev = 0;
                  id = getId(req, res);
                  // 确保profile.id不为空

                  if (id) {
                    _context6.next = 5;
                    break;
                  }

                  fail({ ret: OBJECT_IS_UNDEFINED_OR_NULL, msg: 'profile的Id不能为空' }, req, res, next);
                  return _context6.abrupt('return');

                case 5:
                  _context6.next = 7;
                  return _this6.dao.get(id);

                case 7:
                  data = _context6.sent;

                  if (data) {
                    _context6.next = 11;
                    break;
                  }

                  fail({ ret: OBJECT_IS_NOT_FOUND, msg: '对象不存在' }, req, res, next);
                  return _context6.abrupt('return');

                case 11:
                  userid = getCurrentUserId(req, res, next);

                  success(userid === data.userid, req, res, next);
                  _context6.next = 18;
                  break;

                case 15:
                  _context6.prev = 15;
                  _context6.t0 = _context6['catch'](0);

                  fail({
                    ret: SERVER_FAILED,
                    msg: _context6.t0
                  }, req, res, next);

                case 18:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, _this6, [[0, 15]]);
        }));

        return function (_x29, _x30, _x31) {
          return _ref6.apply(this, arguments);
        };
      }();
    }
  }, {
    key: 'isManager',
    value: function isManager() {
      var getCurrentUserId = arguments.length <= 0 || arguments[0] === undefined ? function () {
        return null;
      } : arguments[0];
      var managerGroupId = arguments[1];

      var _this7 = this;

      var success = arguments.length <= 2 || arguments[2] === undefined ? function (result, req, res, next) {
        return next();
      } : arguments[2];
      var fail = arguments.length <= 3 || arguments[3] === undefined ? function (err, req, res) {
        return res.send(err);
      } : arguments[3];

      return function () {
        var _ref7 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee7(req, res, next) {
          var userid, profile, result;
          return _regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  if (managerGroupId) {
                    _context7.next = 3;
                    break;
                  }

                  fail({ ret: REQUIRED, msg: '必须提供正确的MangerGroupId' }, req, res, next);
                  return _context7.abrupt('return');

                case 3:
                  userid = getCurrentUserId(req, res);
                  _context7.next = 6;
                  return _this7.dao.getByUserId(userid);

                case 6:
                  profile = _context7.sent;
                  result = false;

                  if (profile.roles && profile.roles.length) {
                    result = profile.roles.some(function (role) {
                      return role === managerGroupId;
                    });
                  }
                  success(result, req, res, next);

                case 10:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, _this7);
        }));

        return function (_x35, _x36, _x37) {
          return _ref7.apply(this, arguments);
        };
      }();
    }
  }, {
    key: 'isSupervisor',
    value: function isSupervisor() {
      var getCurrentUserId = arguments.length <= 0 || arguments[0] === undefined ? function () {
        return null;
      } : arguments[0];
      var supervisorGroupId = arguments[1];

      var _this8 = this;

      var success = arguments.length <= 2 || arguments[2] === undefined ? function (result, req, res, next) {
        return next();
      } : arguments[2];
      var fail = arguments.length <= 3 || arguments[3] === undefined ? function (err, req, res) {
        return res.send(err);
      } : arguments[3];

      return function () {
        var _ref8 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee8(req, res, next) {
          var userid, profile, result;
          return _regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  if (supervisorGroupId) {
                    _context8.next = 3;
                    break;
                  }

                  fail({ ret: REQUIRED, msg: '必须提供正确的SupervisorGroupId' }, req, res, next);
                  return _context8.abrupt('return');

                case 3:
                  userid = getCurrentUserId(req, res);
                  _context8.next = 6;
                  return _this8.dao.getByUserId(userid);

                case 6:
                  profile = _context8.sent;
                  result = false;

                  if (profile.roles && profile.roles.length) {
                    result = profile.roles.some(function (role) {
                      return role === supervisorGroupId;
                    });
                  }
                  success(result, req, res, next);

                case 10:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, _this8);
        }));

        return function (_x41, _x42, _x43) {
          return _ref8.apply(this, arguments);
        };
      }();
    }
  }]);

  return MongoProfileMiddlewares;
}();

export { Profle as Profile, Profle as MongoProfile, Profle as ProfileManager, MongoProfileMiddlewares };
//# sourceMappingURL=index.es6.js.map