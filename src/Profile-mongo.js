/*
根据微信企业号的userid记录用户的相关信息
字段包括：_id, userid, roles, name, isMale, phone
 */

import { useCollection } from 'mongo-use-collection'; // eslint-disable-line


export default class Profle {
  constructor(url, collection = 'profles') {
    this.useProfiles = cb => useCollection(url, collection, cb);
  }

  /*
  添加profile
   */
  add(profile = {}) {
    return new Promise((resolve, reject) =>
      this.useProfiles(async col => {
        try {
          const result = await col.insertOne(profile);
          resolve(result);
        } catch (e) {
          reject(e);
        }
      }));
  }
  getByUserId(userid) {
    return new Promise((resolve, reject) =>
      this.useProfiles(async col => {
        try {
          const doc = await col.findOne({ userid });
          resolve(doc);
        } catch (e) {
          reject(e);
        }
      }));
  }
  get(_id) {
    return new Promise((resolve, reject) =>
      this.useProfiles(async col => {
        try {
          const doc = await col.findOne({ _id });
          resolve(doc);
        } catch (e) {
          reject(e);
        }
      }));
  }
  findOne(query) {
    return new Promise((resolve, reject) =>
      this.useProfiles(async col => {
        try {
          const doc = await col.findOne(query);
          resolve(doc);
        } catch (e) {
          reject(e);
        }
      }));
  }
  updateById(_id, profile = {}, options) {
    return new Promise((resolve, reject) =>
      this.useProfiles(async col => {
        try {
          const oldDoc = await this.get(_id);
          const doc = {
            ...oldDoc,
            ...profile,
          };
          delete doc._id; // eslint-disable-line no-underscore-dangle
          await col.updateOne({ _id }, { $set: doc }, options);
          resolve(doc);
        } catch (e) {
          reject(e);
        }
      }));
  }
  remove(_id) {
    return new Promise((resolve, reject) =>
      this.useProfiles(async col => {
        try {
          const result = await col.remove({ _id });
          resolve(result);
        } catch (e) {
          reject(e);
        }
      }));
  }
 }

// const PROFILE_COLLECTION = 'profiles';

// const dao = new WxeProfle(mongoUrl, PROFILE_COLLECTION);
// export default dao;
