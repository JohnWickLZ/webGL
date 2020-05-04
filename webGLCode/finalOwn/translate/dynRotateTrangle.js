
var canvas;
var gl;

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    gl = canvas.getContext('webgl');
    gl.viewport( 0, 0, canvas.width, canvas.height );

    var VERTEX_SHADER = `
        attribute vec4 a_pos;
        uniform float u_sinB, u_cosB;
        void main(){
            gl_Position.x = a_pos.x * u_cosB - a_pos.y * u_sinB;
            gl_Position.y = a_pos.x * u_sinB + a_pos.y * u_cosB;
            gl_Position.z = a_pos.z;
            gl_Position.w = a_pos.w;
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

    var angle = 30.0;
    var u_sinB = gl.getUniformLocation(program, 'u_sinB');
    var u_cosB = gl.getUniformLocation(program, 'u_cosB');
    function run(){
        var sinB = Math.sin(angle / 180.0 * Math.PI);
        var cosB = Math.cos(angle / 180.0 * Math.PI);
        gl.uniform1f(u_sinB, sinB);
        gl.uniform1f(u_cosB, cosB);
        gl.clearColor(0,0,1,1);
        gl.clear( gl.COLOR_BUFFER_BIT );
        this.gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    run();

    window.onkeydown = function(e){
        if(37 === e.keyCode){
            angle-=1.0;
        }
        if(39 === e.keyCode){
            angle+=1.0;
        }
        run();
    } 
}
