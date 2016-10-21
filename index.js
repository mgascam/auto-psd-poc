var PSD = require('psd');
var _ = require('lodash');
const util = require('util');


var file = process.argv[2] || './simple.psd';

PSD.open(file).then(function (psd) {
    util.inspect(psd);
    var type, fonts = [];
    psd.tree().descendants().forEach(function (node) {

      // type = node.get('typeTool');
      //
      // if(!type) return;
      //
      // fonts = fonts.concat(type.fonts());
      //console.log(node);
    });

    // console.log(_.uniq(fonts));
});
