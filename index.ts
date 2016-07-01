import * as path from 'path';
import RaspiCam = require('raspicam');
let ffmpeg = require('ffmpeg');

let imagesRoot = path.join(__dirname, '..', 'images');
let FREQUENCY = 10;

// if ("pi") {
//     let piCamera = new RaspiCam({
//         mode: 'photo',
//         timelapse: FREQUENCY * 1000,
//         timeout: 0,
//         rotation: 180,
//         encoding: 'png',
//         exposure: 'auto',
//         saturation: 50,
//         brightness: 50,
//         quality: 90,
//         thumb: 'none',
//         output: path.join(imagesRoot, '%d.png'),
//         awb: 'sun',
//         width: 1296,
//         height: 730,
//         // preview:"0,0,200,200",
//         nopreview: true
//     });

//     //start taking timelapses
//     console.log('starting camera...');
//     piCamera.start();
// }
// else if("edison") {
// let timer = setInterval(, FREQUENCY * 1000);
try {
    var process = new ffmpeg('/dev/video0');

    process.then(function (video) {
        // Callback mode
        video.fnExtractFrameToJPG('.', {
            frame_rate: 1,
            duration_time: 5,
            size: '1280x720',
            file_name: '%t.png'
        }, function (error, files) {
            console.log(error);
            
            if(files) console.log(files.length);
            if (!error)
                console.log('Frames: ' + files);
        });
    }, function (err) {
        console.log('Error: ' + err);
    });
} catch (e) {
    console.log(e.code);
    console.log(e.msg);
}
// }