/*
eslint-env mocha
 */
 /*
 eslint-disable no-unused-expressions
  */
import { expect } from 'chai';
import 'babel-polyfill';

import ProfileManager from '../src/Profile-mongo';
const mongoUrl = 'mongodb://localhost/test';
const dao = new ProfileManager(mongoUrl);

describe('Profile Data Access', () => {
  const userid = Math.random();
  const profile = {
    userid,
    roles: [3, 5],
  };
  it('add 正常添加数据', async () => {
    await dao.add(profile);
    expect(profile._id).to.be.ok;
  });
  it('findOne 正确查询', async () => {
    const doc = await dao.findOne({ userid });
    expect(doc).to.eql(profile);
  });
  it('getByUserId 根据userid可获取数据', async () => {
    const result = await dao.getByUserId(userid);
    expect(result).to.eql(profile);
  });
  it('update 正确更新, get 正确取到数据', async () => {
    const updated = { ...profile, roles: [3] };
    const { _id, ...rest } = updated;
    await dao.updateById(_id, rest);
    const result = await dao.get(_id);
    expect(result).to.eql(updated);
  });

  it('remove 正确删除', async () => {
    await dao.remove(profile._id);
    const doc = await dao.get(profile._id);
    expect(doc).to.be.null;
  });
});
