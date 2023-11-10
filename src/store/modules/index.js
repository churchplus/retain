import camelCase from 'lodash/camelCase';

const requireModule = require.context(".", false, /\.js$/); //extract all js files inside modules folder

const modules = { }

requireModule.keys().forEach(fileName => {
  if (fileName === "./index.js") return; //reject index.js file

  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ""));
  modules[moduleName] = requireModule(fileName).default;
});

export default modules;