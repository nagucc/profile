/* eslint-env mocha */
/*
  eslint-disable padded-blocks, no-unused-expressions
 */

import 'babel-polyfill';
import { expect } from 'chai';
import { createRequest, createResponse } from 'node-mocks-http';
import { OBJECT_IS_UNDEFINED_OR_NULL, OBJECT_IS_NOT_FOUND, REQUIRED } from 'nagu-validates';
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
      await dao.add(() => rawProfile)(req, res, () => {
        rawProfile._id = req.body._id;
        res.send(rawProfile._id);
      });
      const result = res._getData();
      expect(result).to.be.ok;
    });
  });
  describe('get 获取数据', () => {
    it('正确获取数据', async () => {
      const req = createRequest();
      const res = createResponse();
      await dao.get(() => rawProfile._id)(req, res, () => {
        res.send(res.profile);
      });
      const result = res._getData();
      expect(result._id).to.eql(rawProfile._id);
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
        currentUserId: rawProfile._id,
        result: true,
      }, {
        currentUserId: 'otherid',
        result: false,
      }].map(item => it(`正确判断，结果：${item.result}`, async () => {
        const req = createRequest();
        const res = createResponse();
        await dao.isOwner(() => rawProfile._id,
          () => item.currentUserId,
          result => (expect(result).to.eql(item.result))
        )(req, res);
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
        result: true,
      }, {
        groupId: 3,
        result: true,
      }, {
        groupId: 4,
        result: false,
      }].map(item => it(`正确判断，结果：${item.result}`, async () => {
        const req = createRequest();
        const res = createResponse();
        await dao.isManager(() => rawProfile.userid,
        item.groupId,
          result => expect(result).to.eql(item.result)
        )(req, res);
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
        result: true,
      }, {
        groupId: 3,
        result: true,
      }, {
        groupId: 4,
        result: false,
      }].map(item => it(`正确判断，结果：${item.result}`, async () => {
        const req = createRequest();
        const res = createResponse();
        await dao.isManager(() => rawProfile.userid,
        item.groupId,
          result => expect(result).to.eql(item.result)
        )(req, res);
      }));
    });
  });
  describe('update 更新数据', () => {
    it('正确更新数据', async () => {
      let req = createRequest();
      let res = createResponse();
      await dao.update(() => rawProfile._id, () => ({
        other: 'updated',
      }))(req, res);
      req = createRequest();
      res = createResponse();
      await dao.get(() => rawProfile._id)(req, res, () => {
        res.send(res.profile);
      });
      const result = res._getData();
      expect(result.other).to.eql('updated');
    });
  });
  describe('remove 删除数据', () => {
    it('正确删除数据', async () => {
      let req = createRequest();
      let res = createResponse();
      await dao.remove(() => rawProfile._id)(req, res, () => {
        res.send(res.profile);
      });
      req = createRequest();
      res = createResponse();
      await dao.get(() => rawProfile._id)(req, res, () => {
        if (res.profile) res.send(res.profile);
        else res.send('null');
      });
      const result = res._getData();
      expect(result).to.eql('null');
    });
  });
});
