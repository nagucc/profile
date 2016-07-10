/* eslint-env mocha */
/*
  eslint-disable padded-blocks, no-unused-expressions, no-underscore-dangle
 */

import 'babel-polyfill';
import { expect } from 'chai';
import { createRequest, createResponse } from 'node-mocks-http';
import { OBJECT_IS_UNDEFINED_OR_NULL } from 'nagu-validates';
import MongoProfileMiddlewares from '../src/mongo-express-middlewares';

describe('Profile Middlewares', () => {
  let profileId;
  const random = Math.random();
  const mongoUrl = 'mongodb://localhost/test';
  const dao = new MongoProfileMiddlewares(mongoUrl, 'profile', () => profileId);
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
      await dao.add(() => ({
        name: random,
        other: 'test',
      }))(req, res, () => {
        profileId = req.body._id;
        res.send(profileId);
      });
      const result = res._getData();
      expect(result).to.be.ok;
    });
  });
  describe('get 获取数据', () => {
    it('正确获取数据', async () => {
      const req = createRequest();
      const res = createResponse();
      await dao.get(() => profileId)(req, res, () => {
        res.send(res.profile);
      });
      const result = res._getData();
      const { _id, name, ...rest } = result;
      expect(_id).to.eql(profileId);
      expect(name).to.eql(random);
      expect(rest).to.eql({ other: 'test' });
    });
  });
  describe('update 更新数据', () => {
    it('正确更新数据', async () => {
      let req = createRequest();
      let res = createResponse();
      await dao.update(() => profileId, () => ({
        other: 'updated',
      }))(req, res);
      req = createRequest();
      res = createResponse();
      await dao.get(() => profileId)(req, res, () => {
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
      await dao.remove(() => profileId)(req, res, () => {
        res.send(res.profile);
      });
      req = createRequest();
      res = createResponse();
      await dao.get(() => profileId)(req, res, () => {
        if (res.profile) res.send(res.profile);
        else res.send('null');
      });
      const result = res._getData();
      expect(result).to.eql('null');
    });
  });
});
