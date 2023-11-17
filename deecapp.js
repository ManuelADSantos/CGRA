
class DEECapp {
    gl;
    canvas;
    shaderprog;
    ang = 0;
    previous_time = 0;
    frame_rate = 50;

    constructor(canvasname) {
        this.canvas = document.getElementById(canvasname);
        //this.gl = this.canvas.getContext('webgl2');

        //if (!this.gl){
        //    this.webgl_version = 2;
        //} else {
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('webgl-experimental');
        if (!this.gl) {
            document.write('<p>This browser does not support webgl. Big trouble!</p>');
            this.webgl_version = 0;
        }
        else {
            this.webgl_version = 1;
        }
        //
        this.glversion = this.gl.getParameter(this.gl.VERSION);
        console.log(this.glversion);
        this.animate_active = false;
    };

    initialize() {
        // prepare the shaders to be used
        var fragsrc = document.getElementById("my-fragment-shader").text;
        var vertsrc = document.getElementById("my-vertex-shader").text;
        if (!fragsrc)
            console.log('Error: you forgot to define my-fragment-shader');
        if (!vertsrc)
            console.log('Error: you forgot to define my-vertex-shader');

        this.shaderprog = new DEECshader(this.gl);
        this.shaderprog.srcShaders(vertsrc, fragsrc);

        // perform the initializations
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.clearColor(0.1, 0.1, 0.1, 1);
    };

    render() { // this method is to be called repeatedly 
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    };

    animate() {

        var now, elapsed_time;

        if (this.animate_active) {

            // How much time has elapsed since the last frame rendering?
            now = Date.now();
            elapsed_time = now - this.previous_time;

            if (elapsed_time >= this.frame_rate) {


                // Render the scene.
                this.render();

                // Remember when this scene was rendered.
                this.previous_time = now;
            }

            requestAnimationFrame(() => this.animate());
        }
    };

    run() {
        this.animate_active = true;
        this.initialize();
        requestAnimationFrame(() => this.animate());
    }
};

