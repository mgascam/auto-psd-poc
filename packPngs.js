var exec = require('child_process').exec;
var fs = require('fs-extra');

var cmd = 'TexturePacker --data spriteSheets/spt-game-{v}.json --format easeljs --sheet spriteSheets/spt-{v}-{n}.png --multipack --variant 1:hi --variant 0.5:low png/*.png';
var PATHS = {
    spriteSheets: 'spriteSheets'
};

function createSprites() {
    fs.ensureDir(PATHS.spriteSheets, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        exec(cmd, function (error, stdout, stderr) {
            // command output is in stdout
            if (error) {
                console.log(error);
            }
            console.log(`stdout: ${stdout}`);
        });
    });
}

function start() {
    console.log('start');
    clean();
}

function clean() {
    console.log('Clean up');
    fs.emptyDir(PATHS.spriteSheets, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('clean done!');
        createSprites();
    });
}

start();
