/*
eslint-disable no-param-reassign, no-underscore-dangle
 */
import { SERVER_FAILED,
  OBJECT_IS_UNDEFINED_OR_NULL } from 'nagu-validates';

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
}
