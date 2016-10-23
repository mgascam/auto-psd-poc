var PSD = require('psd');
var exec = require('child_process').exec;
var fs = require('fs-extra');
var path = require('path');
var RSVP = require('rsvp');

var command = 'TexturePacker --data out/en/spt-game-{v}.json --format easeljs --sheet out/en/myTest-{v}-{n}.png --multipack --variant 1:hi --variant 0.5:low in/game/common/*.png in/game/en/*.png';
var file = process.argv[2] || './sample.psd';

var PATHS = {
    png: 'png'
};

function extractLayers(file) {
    var promises = [];

    PSD.open(file).then(function (psd) {
        console.log('psd found, begin extraction');
        psd.tree().descendants().forEach(function (node) {
            promises.push(layerToPng(node));
        });
        RSVP.all(promises).then(function (pngs) {
            console.log('All DONE!');
        });
    });
}

function layerToPng(layer) {
    var promise = new RSVP.Promise(function (resolve, reject) {
        if (layer.isGroup()) {
            return true;
        }

        fs.ensureDir(PATHS.png, function (err) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }

            layer.saveAsPng(path.join(PATHS.png, layer.name + '.png'))
            .then(function (e) {
                console.log('Extracted: ' + layer.name + '.png');
                resolve(layer);
            }).catch(function (err) {
                console.log(err);
                reject(err);
            });
        });
    });
    return promise;
}

function start() {
    console.log('start');
    clean();
}

function clean() {
    console.log('Clean up');
    fs.emptyDir(PATHS.png, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('clean done!');
        extractLayers(file);
    });
}

start();
