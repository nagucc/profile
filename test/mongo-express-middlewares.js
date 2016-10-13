/* eslint-env mocha */
/*
  eslint-disable padded-blocks, no-unused-expressions
 */

import 'babel-polyfill';
import { expect } from 'chai';
import { createRequest, createResponse } from 'node-mocks-http';
import { OBJECT_IS_UNDEFINED_OR_NULL,
  OBJECT_IS_NOT_FOUND, REQUIRED } from 'nagu-validates';
import MongoProfileMiddlewares from '../src/mongo-express-middlewares';

describe('Profile Middlewares', () => {
  const rawProfile = {
    name: Math.random(),
    other: 'test',
    userid: 'userid',
    roles: [1, 2, 3],
    _id: null,
  };
  const mongoUrl = 'mongodb://localhost/test';
  const dao = new MongoProfileMiddlewares(mongoUrl, 'profile', () => rawProfile._id);
  const sendResult = (result, req, res) => res.send(result);
  describe('add 添加数据', () => {
    it('姓名为空时返回出错信息', async () => {
      const req = createRequest();
      const res = createResponse();
      await dao.add(() => ({}))(req, res);
      const data = res._getData();
      expect(data.ret).to.eql(OBJECT_IS_UNDEFINED_OR_NULL);
    });
    it('有姓名即可正确插入数据', async () => {
      const req = createRequest();
      const res = createResponse();
      await dao.add(
        () => rawProfile,
        sendResult,
      )(req, res);
      const result = res._getData();
      expect(result._id).to.be.ok;
      rawProfile._id = result._id;
    });
  });
  describe('get 获取数据', () => {
    it('正确获取数据', async () => {
      const req = createRequest();
      const res = createResponse();
      await dao.get(
        () => rawProfile._id,
        sendResult,
      )(req, res);
      const profile = res._getData();
      expect(profile._id).to.eql(rawProfile._id);
    });
  });
  describe('角色判断', () => {
    describe('isOwner', () => {
      // 错误处理
      [{
        getId: () => null,
        ret: OBJECT_IS_UNDEFINED_OR_NULL,
      }, {
        getId: () => 'test',
        ret: OBJECT_IS_NOT_FOUND,
      }].map(item => it(`错误处理:${item.ret}`, async () => {
        const req = createRequest();
        const res = createResponse();
        await dao.isOwner(item.getId)(req, res);
        const result = res._getData();
        expect(result.ret).to.be.eql(item.ret);
      }));

      // 正确判断
      [{
        currentUserId: rawProfile.userid,
        result: true,
      }, {
        currentUserId: 'otherid',
        result: false,
      }].map(item => it(`正确判断，结果：${item.result}`, async () => {
        const req = createRequest();
        const res = createResponse();
        await dao.isOwner(
          () => rawProfile._id,
          () => item.currentUserId,
          sendResult,
        )(req, res);
        const result = res._getData();
        expect(result).to.eql(item.result.toString());
      }));
    });
    describe('isManager', () => {
      // 错误处理
      it('必须提供ManagerGroupId', async () => {
        const req = createRequest();
        const res = createResponse();
        await dao.isManager(() => rawProfile.userid)(req, res);
        const result = res._getData();
        expect(result.ret).to.be.eql(REQUIRED);
      });

     // 正确判断
      [{
        groupId: 1,
        result: 'true',
      }, {
        groupId: 3,
        result: 'true',
      }, {
        groupId: 4,
        result: 'false',
      }].map(item => it(`正确判断，结果：${item.result}`, async () => {
        const req = createRequest();
        const res = createResponse();
        await dao.isManager(
          () => rawProfile.userid,
          item.groupId,
          sendResult,
        )(req, res);
        const result = res._getData();
        expect(result).to.eql(item.result);
      }));
    });
    describe('isSupervisor', () => {
      // 错误处理
      it('必须提供SupervisorGroupId', async () => {
        const req = createRequest();
        const res = createResponse();
        await dao.isManager(() => rawProfile.userid)(req, res);
        const result = res._getData();
        expect(result.ret).to.be.eql(REQUIRED);
      });

     // 正确判断
      [{
        groupId: 1,
        result: 'true',
      }, {
        groupId: 3,
        result: 'true',
      }, {
        groupId: 4,
        result: 'false',
      }].map(item => it(`正确判断，结果：${item.result}`, async () => {
        const req = createRequest();
        const res = createResponse();
        await dao.isManager(
          () => rawProfile.userid,
          item.groupId,
          sendResult,
        )(req, res);
        const result = res._getData();
        expect(result).to.eql(item.result);
      }));
    });
    describe('isOwnerOrSupervisor', () => {
      // 错误处理
      [
        // supervisorGroupId为空
        {
          supervisorGroupId: null,
          getId: () => 'test',
          ret: REQUIRED,
        }, {  // getId返回null
          supervisorGroupId: 4,
          getId: () => null,
          ret: OBJECT_IS_UNDEFINED_OR_NULL,
        }, {  // 根据profileId获得的profile为空
          supervisorGroupId: 4,
          getId: () => 'wrongid',
          ret: OBJECT_IS_NOT_FOUND,
        },
      ].map(item => it(`错误处理:${item.ret}`, async () => {
        const req = createRequest();
        const res = createResponse();
        await dao.isOwnerOrSupervisor(
          item.getId,
          () => Math.random(),
          item.supervisorGroupId,
          sendResult,
        )(req, res);
        const result = res._getData();
        expect(result.ret).to.eql(item.ret);
      }));

      // 正确判断
      [
        // 当前用户不是owner，也不是Supervisor，这里的profileId只能再执行时设置
        {
          currentUserId: Math.random(),
          groupId: Math.random(),
          result: 'false',
        }, { // 当前用户是owner，不是Supervisor
          currentUserId: rawProfile.userid,
          groupId: Math.random(),
          result: 'true',
        }, { // 当前用户不是owner，是Supervisor
          profileId: Math.random(),
          currentUserId: rawProfile.userid,
          groupId: 2,
          result: 'true',
        },
      ].map(item => it(`正确判断，结果：${item.result}`, async () => {
        const req = createRequest();
        const res = createResponse();
        await dao.isOwnerOrSupervisor(
          () => (item.profileId ? item.profileId : rawProfile._id),
          () => item.currentUserId,
          item.groupId,
          sendResult,
        )(req, res);
        const result = res._getData();
        expect(result).to.eql(item.result);
      }));
    });
    describe('isOwnerOrManager', () => {
      // 错误处理
      [
        // managerGroupId为空
        {
          managerGroupId: null,
          getId: () => 'test',
          ret: REQUIRED,
        }, {  // getId返回null
          managerGroupId: 4,
          getId: () => null,
          ret: OBJECT_IS_UNDEFINED_OR_NULL,
        }, {  // 根据profileId获得的profile为空
          managerGroupId: 4,
          getId: () => 'wrongid',
          ret: OBJECT_IS_NOT_FOUND,
        },
      ].map(item => it(`错误处理:${item.ret}`, async () => {
        const req = createRequest();
        const res = createResponse();
        await dao.isOwnerOrManager(
          item.getId,
          () => Math.random(),
          item.managerGroupId,
          sendResult,
        )(req, res);
        const result = res._getData();
        expect(result.ret).to.eql(item.ret);
      }));

      // 正确判断
      [
        // 当前用户不是owner，也不是Manager，这里的profileId只能再执行时设置
        {
          currentUserId: Math.random(),
          groupId: Math.random(),
          result: 'false',
        }, { // 当前用户是owner，不是Manager
          currentUserId: rawProfile.userid,
          groupId: Math.random(),
          result: 'true',
        }, { // 当前用户不是owner，是Manager
          profileId: Math.random(),
          currentUserId: rawProfile.userid,
          groupId: 2,
          result: 'true',
        },
      ].map(item => it(`正确判断，结果：${item.result}`, async () => {
        const req = createRequest();
        const res = createResponse();
        await dao.isOwnerOrManager(
          () => (item.profileId ? item.profileId : rawProfile._id),
          () => item.currentUserId,
          item.groupId,
          sendResult,
        )(req, res);
        const result = res._getData();
        expect(result).to.eql(item.result);
      }));
    });
    describe('isSupervisorOrManager', () => {
      // 错误处理
      [
        // supervisorGroupId为空
        {
          managerGroupId: 4,
          supervisorGroupId: null,
          ret: REQUIRED,
        }, {  // managerGroupId 为空
          managerGroupId: null,
          supervisorGroupId: 4,
          ret: REQUIRED,
        },
      ].map(item => it(`错误处理:${item.ret}`, async () => {
        const req = createRequest();
        const res = createResponse();
        await dao.isSupervisorOrManager(
          null,
          item.managerGroupId,
          item.supervisorGroupId,
          sendResult,
        )(req, res);
        const result = res._getData();
        expect(result.ret).to.eql(item.ret);
      }));

      // 正确判断
      [
        // 当前用户不是Supervisor，也不是Manager
        {
          managerGroupId: 4,
          supervisorGroupId: 5,
          result: 'false',
        }, { // 当前用户是Supervisor，不是Manager
          managerGroupId: 5,
          supervisorGroupId: 2,
          result: 'true',
        }, { // 当前用户不是Supervisor, 是Manager
          managerGroupId: 2,
          supervisorGroupId: 5,
          result: 'true',
        },
      ].map(item => it(`正确判断，结果：${item.result}`, async () => {
        const req = createRequest();
        const res = createResponse();
        await dao.isSupervisorOrManager(
          () => rawProfile.userid,
          item.managerGroupId,
          item.supervisorGroupId,
          sendResult,
        )(req, res);
        const result = res._getData();
        expect(result).to.eql(item.result);
      }));
    });
    describe('isOwnerOrSupervisorOrManager', () => {
      // 错误处理
      [
        // supervisorGroupId为空
        {
          getId: () => null,
          managerGroupId: 4,
          supervisorGroupId: null,
          ret: REQUIRED,
        }, {  // managerGroupId 为空
          getId: () => null,
          managerGroupId: null,
          supervisorGroupId: 4,
          ret: REQUIRED,
        }, {  // getId 返回null
          getId: () => null,
          currentUserId: Math.random(),
          managerGroupId: 3,
          supervisorGroupId: 4,
          ret: OBJECT_IS_UNDEFINED_OR_NULL,
        }, {  // 根据getId返回的Id不正确
          getId: () => Math.random(),
          currentUserId: Math.random(),
          managerGroupId: 3,
          supervisorGroupId: 4,
          ret: OBJECT_IS_NOT_FOUND,
        },
      ].map(item => it(`错误处理:${item.ret}`, async () => {
        const req = createRequest();
        const res = createResponse();
        await dao.isOwnerOrSupervisorOrManager(
          item.getId,
          () => item.currentUserId,
          item.managerGroupId,
          item.supervisorGroupId,
          sendResult,
        )(req, res);
        const result = res._getData();
        expect(result.ret).to.eql(item.ret);
      }));

      // 正确判断
      [
        // 当前用户不是owner，也不是Manager，也不是Supervisor
        {
          getId: () => rawProfile._id,
          currentUserId: Math.random(),
          managerGroupId: 3,
          supervisorGroupId: 4,
          result: 'false',
        }, { // 当前用户是owner，不是Manager，不是Supervisor
          getId: () => rawProfile._id,
          currentUserId: rawProfile.userid,
          managerGroupId: 6,
          supervisorGroupId: 4,
          result: 'true',
        }, { // 当前用户不是owner，不是Manager，是Supervisor
          getId: () => 'ddd',
          currentUserId: rawProfile.userid,
          managerGroupId: 6,
          supervisorGroupId: 3,
          result: 'true',
        }, { // 当前用户不是owner，是Manager，不是Supervisor
          getId: () => 'ddd',
          currentUserId: rawProfile.userid,
          managerGroupId: 2,
          supervisorGroupId: 4,
          result: 'true',
        },
      ].map(item => it(`正确判断，结果：${item.result}`, async () => {
        const req = createRequest();
        const res = createResponse();
        await dao.isOwnerOrSupervisorOrManager(
          item.getId,
          () => item.currentUserId,
          item.managerGroupId,
          item.supervisorGroupId,
          sendResult,
        )(req, res);
        const result = res._getData();
        expect(result).to.eql(item.result);
      }));
    });
  });
  describe('update 更新数据', () => {
    it('正确更新数据', async () => {
      const req = createRequest();
      const res = createResponse();
      await dao.update(
        () => rawProfile._id,
        () => ({ other: 'updated' }),
        async () => {
          const req2 = createRequest();
          const res2 = createResponse();
          await dao.get(
            () => rawProfile._id,
            sendResult,
          )(req2, res2);
          const profile = res._getData();
          expect(profile.other).to.eql('updated');
        }
      )(req, res);
    });
  });
  describe('remove 删除数据', () => {
    it('正确删除数据', async () => {
      const req = createRequest();
      const res = createResponse();
      await dao.remove(
        () => rawProfile._id,
        sendResult,
      )(req, res);
      const result = res._getData();
      expect(result).to.be.ok;
    });
  });
});
