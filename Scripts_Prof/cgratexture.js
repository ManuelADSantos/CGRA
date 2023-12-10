class CGRAtexture{
    constructor(glcontext){
        this.gl = glcontext;
        this.textureid = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureid);
        this.level = 0;
        this.internalFormat = this.gl.RGBA;
        this.width = 2;
        this.height = 2;
        this.border = 0;
        this.srcFormat = this.gl.RGBA;
        this.srcType = this.gl.UNSIGNED_BYTE;
        this.pixels = new Uint8Array([255, 255, 255, 255, 
                                      0,0,0,255,  
                                      0,0,0,255, 
                                      255,255,255,255]);  
        this.gl.texImage2D(this.gl.TEXTURE_2D, this.level, this.internalFormat,
                this.width, this.height, this.border, this.srcFormat, this.srcType,
                this.pixels);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        //this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    }
    
    loaded(){
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureid);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.internalFormat,
                this.srcFormat, this.srcType, this.pixels);
        var ispowerof2 = ((this.pixels.width & 1) + (this.pixels.height & 1))==0;
        console.log("width="+this.pixels.width+" height="+this.pixels.height);
        if (ispowerof2) {
           // Yes, it's a power of 2. Generate mipmaps.
           this.gl.generateMipmap(this.gl.TEXTURE_2D);
        } else {
           // No, it's not a power of 2. Turn off mipmaps and set
           // wrapping to clamp to edge
           this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
           this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
           this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        }
    }
    update(imagedata, width,height){
        this.width = width;
        this.height = height;
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureid);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.internalFormat,
                 this.srcFormat, this.srcType, imagedata);  
    }
    
    load(url){
        this.pixels = new Image();
        this.pixels.src = url;
	this.requestCORSIfNotSameOrigin(this.pixels, url);
	this.pixels.src = url;
        this.pixels.onload = () => this.loaded();

    }
    
    requestCORSIfNotSameOrigin(img, url) {

    if ((new URL(url, window.location.href)).origin !== window.location.origin) {
	this.pixels.crossOrigin = "";
	console.log("CORS");
    }
  }
}
