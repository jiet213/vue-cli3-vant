# vue-vant

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

这是基于vue-cli3搭建的项目，集成vant框架、axios、jquery

实现dllPlugin优化打包速度，将第三方库单独打包进行引入
实现生产环境中删除console.log

实现rem自动适配
npm i postcss-pxtorem -S
npm i amfe-flexible -S
然后在vue.config.js中对css进行配置，并设置基准值37.5
找到入口文件main.js引入 import 'amfe-flexible'; 这样就能实现该UI框架的REM自适应了，而且全局也不用去配置REM的布局