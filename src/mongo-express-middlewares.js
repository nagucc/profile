/*
eslint-disable no-param-reassign, no-underscore-dangle
 */
import { SERVER_FAILED,
  OBJECT_IS_UNDEFINED_OR_NULL, OBJECT_IS_NOT_FOUND, REQUIRED } from 'nagu-validates';

import { Profile } from './index';

export default class MongoProfileMiddlewares {
  constructor(mongoUrl, collection = 'profiles', getId) {
    this.mongoUrl = mongoUrl;
    this.collection = collection;
    this.getId = getId;
    this.dao = new Profile(this.mongoUrl, this.collection);
  }
  /*
  添加Profile
   */
  add(composeProfile) {
    return async (req, res, next) => {
      try {
        const profile = composeProfile(req, res);
        if (!profile.name) {
          res.send({
            ret: OBJECT_IS_UNDEFINED_OR_NULL,
            msg: '姓名不能为空',
          });
          return;
        }
        const result = await this.dao.add(profile);
        req.body._id = result.insertedId;
        next();
      } catch (e) {
        res.send({
          ret: SERVER_FAILED,
          msg: e,
        });
      }
    };
  }
  get(getId,
    success = (doc, req, res, next) => {
      res.profile = doc;
      next();
    },
    fail = (result, req, res) => {
      res.send(result);
    }) {
    return async (req, res, next) => {
      try {
        const _id = getId(req, res);
        const doc = await this.dao.get(_id);
        success(doc, req, res, next);
      } catch (e) {
        fail({
          ret: SERVER_FAILED,
          msg: e,
        }, req, res, next);
      }
    };
  }

  findOne(getQuery, success = (doc, req, res, next) => {
    res.profile = doc;
    next();
  }, fail = (result, req, res) => {
    res.send(result);
  }) {
    return async (req, res, next) => {
      try {
        const query = getQuery(req, res);
        const doc = await this.dao.findOne(query);
        success(doc, req, res, next);
      } catch (e) {
        fail({
          ret: SERVER_FAILED,
          msg: e,
        }, req, res, next);
      }
    };
  }
  update(getId, composeProfile) {
    return async (req, res, next) => {
      const _id = getId(req, res);
      const profile = composeProfile(req, res);
      try {
        await this.dao.update(_id, profile);
        next();
      } catch (e) {
        res.send({
          ret: SERVER_FAILED,
          msg: e,
        });
      }
    };
  }
  remove(getId) {
    return async (req, res, next) => {
      const _id = getId(req, res);
      try {
        await this.dao.remove(_id);
        next();
      } catch (e) {
        res.send({
          ret: SERVER_FAILED,
          msg: e,
        });
      }
    };
  }

// 判断当前用户是否是指定profile的所有者
  isOwner(
    getId = () => null,
    getCurrentUserId = () => null,
    success = (result, req, res, next) => next(),
    fail = (err, req, res) => res.send(err),
  ) {
    return async (req, res, next) => {
      try {
        const id = getId(req, res);
        // 确保profile.id不为空
        if (!id) {
          fail({ ret: OBJECT_IS_UNDEFINED_OR_NULL, msg: 'profile的Id不能为空' }, req, res, next);
          return;
        }
        const data = await this.dao.get(id);
        // 确保id正确，能取到数据
        if (!data) {
          fail({ ret: OBJECT_IS_NOT_FOUND, msg: '对象不存在' }, req, res, next);
          return;
        }
        const userid = getCurrentUserId(req, res, next);
        success(userid === data.userid, req, res, next);
      } catch (e) {
        fail({
          ret: SERVER_FAILED,
          msg: e,
        }, req, res, next);
      }
    };
  }

  isManager(
    getCurrentUserId = () => null,
    managerGroupId,
    success = (result, req, res, next) => next(),
    fail = (err, req, res) => res.send(err),
  ) {
    return async (req, res, next) => {
      if (!managerGroupId) {
        fail({ ret: REQUIRED, msg: '必须提供正确的MangerGroupId' }, req, res, next);
        return;
      }
      const userid = getCurrentUserId(req, res);
      const profile = await this.dao.getByUserId(userid);
      let result = false;
      if (profile.roles && profile.roles.length) {
        result = profile.roles.some(role => role === managerGroupId);
      }
      success(result, req, res, next);
    };
  }

  isSupervisor(
    getCurrentUserId = () => null,
    supervisorGroupId,
    success = (result, req, res, next) => next(),
    fail = (err, req, res) => res.send(err),
  ) {
    return async (req, res, next) => {
      if (!supervisorGroupId) {
        fail({ ret: REQUIRED, msg: '必须提供正确的SupervisorGroupId' }, req, res, next);
        return;
      }
      const userid = getCurrentUserId(req, res);
      const profile = await this.dao.getByUserId(userid);
      let result = false;
      if (profile.roles && profile.roles.length) {
        result = profile.roles.some(role => role === supervisorGroupId);
      }
      success(result, req, res, next);
    };
  }
}
