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
  add(
    // 定义获取profile数据的方法，默认取req.body的全部数据
    composeProfile = req => req.body,
    // 定义操作成功之后的动作，默认继续指向下一个中间件。
    success = (profile, req, res, next) => next(),
    // 定义操作失败之后的动作，默认为输出
    fail = (err, req, res) => res.send(err),
  ) {
    return async (req, res, next) => {
      try {
        const profile = composeProfile(req, res);
        if (!profile.name) {
          fail({
            ret: OBJECT_IS_UNDEFINED_OR_NULL,
            msg: '姓名不能为空',
          }, req, res, next);
          return;
        }
        const result = await this.dao.add(profile);
        success({ _id: result.insertedId, ...profile }, req, res, next);
      } catch (e) {
        fail({
          ret: SERVER_FAILED,
          msg: e,
        }, req, res, next);
      }
    };
  }
  // 根据Id获取profile
  get(
    // 定义获取Id的方法，默认取url中的id参数
    getId = req => req.params.id,
    // 定义操作成功之后的动作，默认继续指向下一个中间件。
    success = (doc, req, res, next) => next(),
    // 定义操作失败之后的动作，默认为输出
    fail = (result, req, res) => res.send(result),
  ) {
    return async (req, res, next) => {
      try {
        const _id = getId(req, res);
        if (!_id) {
          fail({ ret: OBJECT_IS_UNDEFINED_OR_NULL, msg: '必须指定id' }, req, res, next);
          return;
        }
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

  findOne(
    getQuery = () => null,
    // 定义判断结果如何操作的方法，默认执行下一个中间件
    success = (result, req, res, next) => next(),
    // 定义错误处理方法，默认输出错误到客户端
    fail = (err, req, res) => res.send(err),
  ) {
    return async (req, res, next) => {
      try {
        const query = getQuery(req, res);
        if (!query) {
          fail({ ret: OBJECT_IS_UNDEFINED_OR_NULL, msg: '必须提供query' }, req, res, next);
          return;
        }
        const doc = await this.dao.findOne(query);
        success(doc, req, res, next);
      } catch (e) {
        fail({ ret: SERVER_FAILED, msg: e }, req, res, next);
      }
    };
  }
  update(
    getId = () => null,
    composeProfile = () => null,
    // 定义判断结果如何操作的方法，默认执行下一个中间件
    success = (result, req, res, next) => next(),
    // 定义错误处理方法，默认输出错误到客户端
    fail = (err, req, res) => res.send(err),
  ) {
    return async (req, res, next) => {
      const _id = getId(req, res);
      // 确保profile.id不为空
      if (!_id) {
        fail({ ret: OBJECT_IS_UNDEFINED_OR_NULL, msg: 'profile的Id不能为空' }, req, res, next);
        return;
      }
      const profile = composeProfile(req, res);
      if (!profile) {
        fail({ ret: OBJECT_IS_UNDEFINED_OR_NULL, msg: '更新数据不能为空' }, req, res, next);
        return;
      }
      try {
        await this.dao.update(_id, profile);
        success({ _id, ...profile }, req, res, next);
      } catch (e) {
        res.send({
          ret: SERVER_FAILED,
          msg: e,
        });
      }
    };
  }
  remove(
    getId = () => null,
    // 定义判断结果如何操作的方法，默认执行下一个中间件
    success = (result, req, res, next) => next(),
    // 定义错误处理方法，默认输出错误到客户端
    fail = (err, req, res) => res.send(err),
  ) {
    return async (req, res, next) => {
      try {
        const _id = getId(req, res);
        const result = await this.dao.remove(_id);
        success(result, req, res, next);
      } catch (e) {
        fail({ ret: SERVER_FAILED, msg: e }, req, res, next);
      }
    };
  }

// 判断当前用户是否是指定profile的所有者
  isOwner(
    // 定义获取ProfileId的方法，默认返回null
    getId = () => null,
    // 定义获取当前UserId的方法，默认返回null
    getCurrentUserId = () => null,
    // 定义判断结果如何操作的方法，默认执行下一个中间件
    success = (result, req, res, next) => next(),
    // 定义错误处理方法，默认输出错误到客户端
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
    // 定义获取当前UserId的方法，默认返回null
    getCurrentUserId = () => null,
    // 管理组Id
    managerGroupId,
    // 定义判断结果如何操作的方法，默认执行下一个中间件
    success = (result, req, res, next) => next(),
    // 定义错误处理方法，默认输出错误到客户端
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
    // 定义获取当前UserId的方法，默认返回null
    getCurrentUserId = () => null,
    // Superviso组Id
    supervisorGroupId,
    // 定义判断结果如何操作的方法，默认执行下一个中间件
    success = (result, req, res, next) => next(),
    // 定义错误处理方法，默认输出错误到客户端
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

  isOwnerOrSupervisor(
    // 定义获取ProfileId的方法，默认返回null
    getId = () => null,
    // 定义获取当前UserId的方法，默认返回null
    getCurrentUserId = () => null,
    // Superviso组Id
    supervisorGroupId,
    // 定义判断结果如何操作的方法，默认执行下一个中间件
    success = (result, req, res, next) => next(),
    // 定义错误处理方法，默认输出错误到客户端
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
      if (profile && profile.roles && profile.roles.length) {
        result = profile.roles.some(role => role === supervisorGroupId);
      }
      if (result) {
        success(result, req, res, next);
        return;
      }
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
      success(userid === data.userid, req, res, next);
    };
  }

  isOwnerOrManager(
    // 定义获取ProfileId的方法，默认返回null
    getId = () => null,
    // 定义获取当前UserId的方法，默认返回null
    getCurrentUserId = () => null,
    // Manager组Id
    managerGroupId,
    // 定义判断结果如何操作的方法，默认执行下一个中间件
    success = (result, req, res, next) => next(),
    // 定义错误处理方法，默认输出错误到客户端
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
      if (profile && profile.roles && profile.roles.length) {
        result = profile.roles.some(role => role === managerGroupId);
      }
      if (result) {
        success(result, req, res, next);
        return;
      }
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
      success(userid === data.userid, req, res, next);
    };
  }

  isSupervisorOrManager(
    // 定义获取当前UserId的方法，默认返回null
    getCurrentUserId = () => null,
    // Manager组Id
    managerGroupId,
    // Supervisor组Id,
    supervisorGroupId,
    // 定义判断结果如何操作的方法，默认执行下一个中间件
    success = (result, req, res, next) => next(),
    // 定义错误处理方法，默认输出错误到客户端
    fail = (err, req, res) => res.send(err),
  ) {
    return async (req, res, next) => {
      if (!managerGroupId || !supervisorGroupId) {
        fail({ ret: REQUIRED, msg: '必须提供正确的MangerGroupId或SupervisorGroupId' },
          req, res, next);
        return;
      }
      const userid = getCurrentUserId(req, res);
      const profile = await this.dao.getByUserId(userid);
      let isSupervisor = false;
      let isManager = false;
      if (profile && profile.roles && profile.roles.length) {
        isManager = profile.roles.some(role => role === managerGroupId);
        isSupervisor = profile.roles.some(role => role === supervisorGroupId);
      }
      success(isSupervisor || isManager, req, res, next);
    };
  }

  isOwnerOrSupervisorOrManager(
    // 定义获取ProfileId的方法，默认返回null
    getId = () => null,
    // 定义获取当前UserId的方法，默认返回null
    getCurrentUserId = () => null,
    // Manager组Id
    managerGroupId,
    // Supervisor组Id
    supervisorGroupId,
    // 定义判断结果如何操作的方法，默认执行下一个中间件
    success = (result, req, res, next) => next(),
    // 定义错误处理方法，默认输出错误到客户端
    fail = (err, req, res) => res.send(err),
  ) {
    return async (req, res, next) => {
      if (!managerGroupId || !supervisorGroupId) {
        fail({ ret: REQUIRED, msg: '必须提供正确的MangerGroupId或SupervisorGroupId' },
          req, res, next);
        return;
      }
      const userid = getCurrentUserId(req, res);
      const profile = await this.dao.getByUserId(userid);
      let isSupervisor = false;
      let isManager = false;
      if (profile && profile.roles && profile.roles.length) {
        isManager = profile.roles.some(role => role === managerGroupId);
        isSupervisor = profile.roles.some(role => role === supervisorGroupId);
      }
      const result = isSupervisor || isManager;
      if (result) {
        success(result, req, res, next);
        return;
      }
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
      success(userid === data.userid, req, res, next);
    };
  }
}
