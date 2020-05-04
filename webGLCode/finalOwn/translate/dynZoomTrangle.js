
var canvas;
var gl;

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    gl = canvas.getContext('webgl');
    gl.viewport( 0, 0, canvas.width, canvas.height );

    var VERTEX_SHADER = `
        attribute vec4 a_pos;
        uniform float u_change;
        void main(){
            gl_Position.x = a_pos.x;
            gl_Position.y = a_pos.y;
            gl_Position.z = a_pos.z;
            gl_Position.w = u_change;
            gl_PointSize = 10.0;
        }
    `;

    var FRAG_SHADER = `
        precision lowp float;
        uniform vec4 u_color;
        void main(){
            gl_FragColor = u_color;
        }
    `;

    var program = this.initShader(gl, VERTEX_SHADER, FRAG_SHADER);

    var dataVertices = new Float32Array([
        0.0, 0.0,
        0.5, 0.5,
        0.5, 0.0
    ]);

    bufferInit(gl, dataVertices, 'a_pos', program);

    var u_color = gl.getUniformLocation(program, 'u_color');
    gl.uniform4f(u_color, 0.0, 1.0, 0.0, 1.0);

    var u_change = gl.getUniformLocation(program, 'u_change');
    var zoomValue = 0.7;
    function run(){
        gl.uniform1f(u_change, zoomValue);
        gl.clearColor(0,0,1,1);
        gl.clear( gl.COLOR_BUFFER_BIT );
        this.gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    run();

    window.onkeydown = function(e){
        if(37 === e.keyCode){
            zoomValue-=0.1;
        }
        if(39 === e.keyCode){
            zoomValue+=0.1;
        }
        run();
    } 
}
