import * as path from 'path';
import * as fs from 'fs';
let exec = require('child_process').exec;

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
                output: '%d.png',
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
            console.log('found an edison');

            exec("ffmpeg -s 1280x720 -i /dev/video0 -y -vf fps=10/60 %03d.png", function (error, stdout, stderr) {
                if(error) console.log('error: ' + error);
                console.log(stdout);
            });
            console.log('starting camera...');
            break;
        default:
            console.log('unknown board type');

    }
});