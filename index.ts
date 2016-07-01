import * as path from 'path';
import RaspiCam = require('raspicam');

let imagesRoot = path.join(__dirname,'..', 'images');

//determine OS version.  Pi or Edison

let camera = new RaspiCam({
    mode: 'photo',
    timelapse: 1000,
    timeout: 0,
    rotation: 180,
    preview: '100,100,200,200',
    output: path.join(imagesRoot, '%d.png'),
    encoding: 'png'
});

//start taking timelapses
console.log('starting camera...');
camera.start();

//catch crashes and unexpected exits
process.on('exit', () => stop('exit'));
process.on('SIGINT', () => stop('SIGINT'));
process.on('uncaughtException', (err) => stop(err));

function stop(reason) {
    console.log('stopping camera...');
    console.log(reason);
    camera.stop();
}