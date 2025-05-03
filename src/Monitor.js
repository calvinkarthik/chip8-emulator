const COLS = 64;
const ROWS = 32; // 64x32 is the size of the display in pixels
const SCALE = 15; // for modern displays the pixel size must be scaled up to be visible
class Monitor {
    constructor(canvas) {
        this.cols = COLS;
        this.rows = ROWS;

        this.display = new Array(this.cols * this.rows);
        this.scale = SCALE;

        this.canvas.width = this.cols * this.scale;
        this.canvas.height = this.rows * this.scale;

        this.canvasCtx = this.canvas.getContext("2d");
    }

    setPixel(x, y) {
        
        this.display[x + (y * this.cols)] ^= 1;
        return this.display[x + (y * this.cols)] != 1;
    }

    clear() {
        this.display = new Array(this.cols * this.rows);
    }

    paint() {
        //clear the canvas and fill with black
        this.canvasCtx.fillStyle = '#000';
        this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for(let i=0; i < this.cols*this.rows; i++) {
            let x = (i % this.cols) * this.scale;
            let y = Math.floor(i / this.cols) * this.scale;

            if(this.display[i] == 1) { // check if pixel is set to 1
                //draw white square for each pixel set to 1
                this.canvasCtx.fillStyle = '#FFF';
                this.canvasCtx.fillRect(x, y, this.scale, this.scale);
            }
        }
    }

    testRender() {
        this.setPixel(0, 0);
        this.setPixel(5,2);
        this.paint();
    }
}

export default Monitor;