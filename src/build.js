const fs = require('fs');
const _ = require('lodash');
const sd = require('style-dictionary');

//  Build the css for pro from the pro config
const StyleDictionaryPro = sd.extend("src/configs/config-pro.json");
StyleDictionaryPro.buildAllPlatforms()


//  Build the js/ts for jeunes from the jeunes config
const StyleDictionaryJeunes = sd.extend("src/configs/config-jeunes.json");

const typingsES6Template = _.template(
    fs.readFileSync(`${__dirname}/templates/typings/es6.template`)
  );
  
  StyleDictionaryJeunes.registerFormat({
    name: 'typings/es6',
    formatter: typingsES6Template,
  });

StyleDictionaryJeunes.buildAllPlatforms()