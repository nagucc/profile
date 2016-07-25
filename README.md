# [nagu-profile](https://github.com//nagu-profile)

[![NPM version](http://img.shields.io/npm/v/nagu-profile.svg?style=flat-square)](https://www.npmjs.com/package/nagu-profile)
[![NPM downloads](http://img.shields.io/npm/dm/nagu-profile.svg?style=flat-square)](https://www.npmjs.com/package/nagu-profile)
[![Build Status](http://img.shields.io/travis//nagu-profile/master.svg?style=flat-square)](https://travis-ci.org//nagu-profile)
[![Coverage Status](https://img.shields.io/coveralls//nagu-profile.svg?style=flat-square)](https://coveralls.io//nagu-profile)
[![Dependency Status](http://img.shields.io/david//nagu-profile.svg?style=flat-square)](https://david-dm.org//nagu-profile)

>

### How to Install

```sh
$ npm install nagu-profile
```

### Getting Started

#### MongoProfileMiddlewares
使用MongoDB存储数据的express中间件。

##### 创建对象
```javascript
export const profileMiddlewares = new MongoProfileMiddlewares(mongoUrl, profileCollection);
```
参数：
- mongoUrl 必须的，数据库连接字符串
- profileCollection 存储profile数据的集合的名称，默认为`profiles`

##### get(getId(req, res) [, success(profile, req, res, next), fail(result, req, res, next)] )
返回一个用于根据id获取profile的async中间件。服务器出错时直接res.send({ret, msg})。
```javascript
const getProfile = profileMiddlewares.get(req => (new ObjectId(req.params.id)));
router.get('/list/:pageIndex',
  getProfile,
  (req, res) => {

  });
```
参数：
- getId 必须的，一个函数，用于获取profile的Id。
- success 获取profile之后的处理函数，默认为：
  ```javascript
  (doc, req, res, next) => {
    res.profile = doc;
    next();
  }
  ```
- fail 失败之后的处理函数，默认为：
  ```javascript
  (result, req, res) => {
    res.send(result);
  }
  ```
### How to Test

Run one, or a combination of the following commands to lint and test your code:

```sh
$ npm run lint          # Lint the source code with ESLint
$ npm test              # Run unit tests with Mocha
$ npm run test:watch    # Run unit tests with Mocha, and watch files for changes
$ npm run test:cover    # Run unit tests with code coverage by Istanbul
```

To launch the documentation site, run:

```sh
$ npm install -g easystatic
$ npm start
```

### License

MIT © 2016 na57
