var PSD = require('psd');

var file = process.argv[2] || './sample.psd';

PSD.open(file).then(function (psd) {
    psd.tree().descendants().forEach(function (node) {
        if (node.isGroup()) {
            return true;
        }

        node.saveAsPng('./output/' + node.name + '.png').catch(function (err) {
            console.log(err.stack);
        });
    });
});
