var PSD = require('psd');
var exec = require('child_process').exec;
var fs = require('fs-extra');
var path = require('path');

var command = 'TexturePacker --data out/en/spt-game-{v}.json --format easeljs --sheet out/en/myTest-{v}-{n}.png --multipack --variant 1:hi --variant 0.5:low in/game/common/*.png in/game/en/*.png';
var file = process.argv[2] || './sample.psd';

var PATHS = {
  png: 'png'
};

function extractLayers(file) {
  console.log(file);
  console.log('Begin layer extract');
  PSD.open(file).then(function (psd) {
      console.log('psd found, begin extraction');
      psd.tree().descendants().forEach(function (node) {
          console.log('here');
          if (node.isGroup()) {
              return true;
          }

          fs.ensureDir('png', function(err){
            if(err) {
              console.log(err);
              return;
            }
            console.log(PATHS.png);

            node.saveAsPng(path.join(PATHS.png, node.name + '.png'))
            .then(function(e){
              console.log('Extracted: ' + node.name + '.png');
            })
            .catch(function (err) {
                console.log(err.stack);
            });
          });
      });
  });
}

function start() {
  console.log('start');
  clean();
}

function clean() {
  console.log('Clean up');
  fs.emptyDir(PATHS.png, function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('clean done!')
    extractLayers(file);

  });
}

start();
