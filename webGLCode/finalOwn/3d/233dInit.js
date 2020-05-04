
var canvas;
var gl;

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    gl = canvas.getContext('webgl');
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(0,0,1,1);

    var VERTEX_SHADER = `
        attribute vec4 a_pos;
        attribute vec4 a_color;
        varying vec4 v_color;
        uniform mat4 u_ViewMatrix;
        attribute float a_size;
        void main(){
            gl_Position = u_ViewMatrix * a_pos;
            v_color = a_color;
        }
    `;

    var FRAG_SHADER = `
        precision lowp float;
        varying vec4 v_color;
        void main(){
            gl_FragColor = v_color;
        }
    `;

    var program = this.initShader(gl, VERTEX_SHADER, FRAG_SHADER);

    var dataVertices = new Float32Array([
        0.0, 0.5, -0.4,    0.4, 1.0, 0.4,
        -0.5, -0.5, -0.4,  0.4, 1.0, 0.4,
        0.5, -0.5, -0.4,   0.4, 1.0, 0.4,

        0.5, 0.4, -0.2,    1.0, 0.4, 0.4,
        -0.5, 0.4, -0.2,   1.0, 0.4, 0.4,
        0.0, -0.6, -0.2,   1.0, 0.4, 0.4,

        0.0, 0.5, 0.0,    0.4, 0.4, 1.0,
        -0.5, -0.5, 0.0,   0.4, 0.4, 1.0,
        0.5, -0.5, 0.0,   0.4, 0.4, 1.0
    ]);
    var FSIZE = dataVertices.BYTES_PER_ELEMENT;
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, dataVertices, gl.STATIC_DRAW);

    var a_pos  = gl.getAttribLocation(program, 'a_pos');
    var a_color  = gl.getAttribLocation(program, 'a_color');
    gl.vertexAttribPointer(a_pos, 3, gl.FLOAT, false, FSIZE * 6, 0);
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
    gl.enableVertexAttribArray(a_pos);
    gl.enableVertexAttribArray(a_color);

    var viewMatrix = new Matrix4();
    viewMatrix.setLookAt(0.2, 0.25, 0.25,   0.0, 0.0, 0.0,    0.0, 1.0, 0.0);
    //viewMatrix.setLookAt(0.0, 0.0, 0.25,   0.0, 0.0, 0.0,    0.0, 1.0, 0.0);
    var u_ViewMatrix  = gl.getUniformLocation(program, 'u_ViewMatrix');
    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements)

    gl.clear( gl.COLOR_BUFFER_BIT );
    this.gl.drawArrays(gl.TRIANGLES, 0, 9);
}
