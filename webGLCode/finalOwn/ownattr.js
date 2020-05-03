
var canvas;
var gl;

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    gl = canvas.getContext('webgl');
    gl.viewport( 0, 0, canvas.width, canvas.height );

    var VERTEX_SHADER = `
        attribute vec4 a_pos;
        void main(){
            gl_Position = a_pos;
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
        -0.5, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ]);
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, dataVertices, gl.STATIC_DRAW);

    var a_pos  = gl.getAttribLocation(program, 'a_pos');
    gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_pos);
    //this.gl.vertexAttrib4f(a_position, 0.0, 0.3, 1.0, 1.0);
    var u_color = gl.getUniformLocation(program, 'u_color');
    gl.uniform4f(u_color, 0.0, 1.0, 0.0, 1.0);
    this.gl.drawArrays(gl.POINTS, 0, 5);
}
