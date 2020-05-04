
var canvas;
var gl;

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    gl = canvas.getContext('webgl');
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(0,0,1,1);

    var VERTEX_SHADER = `
        attribute vec4 a_pos;
        attribute float a_size;
        void main(){
            gl_Position = a_pos;
            gl_PointSize = a_size;
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

    var dataSize = new this.Float32Array([
        10.0, 20.0, 30.0
    ]);
    var bufferSize = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferSize);
    gl.bufferData(gl.ARRAY_BUFFER, dataSize, gl.STATIC_DRAW);

    var a_size  = gl.getAttribLocation(program, 'a_size');
    gl.vertexAttribPointer(a_size, 1, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_size);

    var u_color = gl.getUniformLocation(program, 'u_color');
    gl.uniform4f(u_color, 0.0, 1.0, 0.0, 1.0);

    gl.clear( gl.COLOR_BUFFER_BIT );
    this.gl.drawArrays(gl.POINTS, 0, 3);
}
