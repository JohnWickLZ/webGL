
var canvas;
var gl;

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    gl = canvas.getContext('webgl');
    gl.viewport( 0, 0, canvas.width, canvas.height );

    var VERTEX_SHADER = `
        attribute vec4 a_pos;
        uniform mat4 u_translate;
        uniform mat4 u_rotate;
        void main(){
            gl_Position = u_rotate * u_translate * a_pos;
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

    var u_translate = gl.getUniformLocation(program, 'u_translate');
    var u_rotate = gl.getUniformLocation(program, 'u_rotate');

    gl.uniformMatrix4fv(u_translate, false, translate(0.5, 0.0, 0.0));
    gl.uniformMatrix4fv(u_rotate, false, rotate(30.0));
    gl.clearColor(0,0,1,1);
    gl.clear( gl.COLOR_BUFFER_BIT );
    this.gl.drawArrays(gl.TRIANGLES, 0, 3);
}
