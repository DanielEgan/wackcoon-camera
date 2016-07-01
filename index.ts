import * as path from 'path';
import * as fs from 'fs';

let imagesRoot = path.join(__dirname, '..', 'images');
let FREQUENCY = 10;
let boardType;

fs.readFile('/proc/cpuinfo', (err, data) => {
    var cpuinfo = data.toString();
    console.log(cpuinfo);
    if (/ARMv7/.test(cpuinfo))
        boardType = 'pi';
    else if (/GenuineIntel/.test(cpuinfo))
        boardType = 'edison';
    else
        boardType = 'unknown';

    switch (boardType) {
        case 'pi':
            let RaspiCam = require('raspicam');
            console.log('found a pi');
            let piCamera = new RaspiCam({
                mode: 'photo',
                timelapse: FREQUENCY * 1000,
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
            piCamera.start();
            break;
        case 'edison':
            let ffmpeg = require('./ffmpeg');
            console.log('found an edison');

            new ffmpeg('/dev/video0').then(function (stream) {
                // Callback mode
                stream.fnExtractFrameToPNG('.', {
                    frame_rate: 1,
                    size: '1280x720',
                    file_name: '%t.png'
                });
            });
            console.log('starting camera...');
            break;
        default:
            console.log('unknown board type');

    }
});