- 全局安装nodemon
```
cnpm i nodemon -g
```
- 启动本地mongodb服务（路径是你的mongodb安装目录）
```
mongod --dbpath "D:\mongodb\data"
```

- 还可以在 utils/connet.js中，自行修改数据库名
- 启动node服务
```
cnpm install
npm start
```
- 使用robot3T（可视化界面）操作mongodb数据。
- 自行创建对应的数据库，再根据models目录来创建集合和文档。
