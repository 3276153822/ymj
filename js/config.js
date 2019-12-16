require.config({
  //配置参数
  //baseUrl 选填的，不写就是默认以requirejs所在文件夹为基础路径
  paths: {
    //配置短路径：不再基础路径下的文件引入，最好配置短路径
    jquery: "../lib/jquery-1.10.1.min"
  },
  shim: {
    //依赖关系的设置
    common: ["jquery"],
    index: ["jquery", "common"],
    carousel: ["jquery"],
    good: ["jquery", "common"],
    cart: ["jquery", "common"]
  }
});
