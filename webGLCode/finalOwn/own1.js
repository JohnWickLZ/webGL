
var canvas;
var gl;

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    
    gl = canvas.getContext('webgl');
    gl.clearColor(0,0,1,1);
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clear( gl.COLOR_BUFFER_BIT );
}
