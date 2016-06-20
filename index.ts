import * as path from 'path';
import RaspiCam = require('raspicam');

let FREQUENCY = 10000;

let imagesRoot = path.join(__dirname,'..', 'images');

let camera = new RaspiCam({
    mode: 'photo',
    timelapse: FREQUENCY,
    timeout: 0,
    rotation: 180,
    encoding: 'png',
    exposure: 'auto',
    saturation: 50,
    brightness: 50,
    quality: 90,
    thumb: 'none',
    output: path.join(imagesRoot, '%d.png'),
    awb: 'sun',
    width: 1296,
    height: 730,
    // preview:"0,0,200,200",
    nopreview: true
});

//start taking timelapses
console.log('starting camera...');
camera.start();