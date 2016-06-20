declare module 'raspicam' {
    class RaspiCam {
        constructor(options: RaspiCam.RaspiCamOptions);
        foo: string;
        on(event: string, callback: (err?:Error, timestamp?:any, file?:any) => void);
        start():void;
        stop():void;
    }
    namespace RaspiCam {

        interface RaspiCamOptions {
            mode?: string,
            timelapse?: number,
            timeout?: number,
            rotation?: number,
            preview?: string,
            output?: string,
            encoding?: string,
            exposure?: string,
            saturation?: number,
            brightness?: number,
            quality?: number,
            thumb?: string,
            nopreview?: boolean,
            awb?: string,
            width?: number,
            height?: number
        }
    }

    export = RaspiCam;
}


// declare var RaspiCam: RaspiCam;

// export = RaspiCam;