
var canvas;
var gl;

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    gl = canvas.getContext('webgl');
    gl.enable(gl.DEPTH_TEST);
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(0,0,1,1);

    var VERTEX_SHADER = `
        attribute vec4 a_pos;
        attribute vec4 a_color;
        varying vec4 v_color;
        uniform mat4 u_ProMatrix;
        uniform mat4 u_ViewMatrix;
        attribute float a_size;
        void main(){
            gl_Position = u_ProMatrix * u_ViewMatrix * a_pos;
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
        0.75, 1.0,  0.0,   0.4, 0.4, 1.0,  //钱
        0.25, -1.0, 0.0,   0.4, 0.4, 1.0,
        1.25, -1.0, 0.0,   0.4, 0.4, 1.0,

        0.75,  1,   -4.0,  0.4, 1.0, 0.4, //后
        0.25, -1.0, -4.0,  0.4, 1.0, 0.4,
        1.25,  -0.5, -4.0,  0.4, 1.0, 0.4,

        0.75,  1.0, -2.0,   1.0, 0.4, 0.4, //中
        0.25, -1.0, -2.0,   1.0, 0.4, 0.4,
        1.25, -1.0, -2.0,   1.0, 0.4, 0.4,



        -0.75,  1,   -4.0,  0.4, 1.0, 0.4, //后
        -0.25, -1.0, -4.0,  0.4, 1.0, 0.4,
        -1.25,  -0.5, -4.0,  0.4, 1.0, 0.4,

        -0.75,  1.0, -2.0,   1.0, 0.4, 0.4, //中
        -0.25, -1.0, -2.0,   1.0, 0.4, 0.4,
        -1.25, -1.0, -2.0,   1.0, 0.4, 0.4,

        -0.75, 1.0,  0.0,   0.4, 0.4, 1.0,  //钱
        -0.25, -1.0, 0.0,   0.4, 0.4, 1.0,
        -1.25, -1.0, 0.0,   0.4, 0.4, 1.0
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

    var near = 1.1;
    var far = 100;
    var u_ProMatrix  = gl.getUniformLocation(program, 'u_ProMatrix');
    var u_ViewMatrix  = gl.getUniformLocation(program, 'u_ViewMatrix');
    function run(){
        var proMatrix = new Matrix4();
        proMatrix.setPerspective(30, 1, near, far);
        gl.uniformMatrix4fv(u_ProMatrix, false, proMatrix.elements);

        var viewMatrix = new Matrix4();
        viewMatrix.setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0);
        gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
        gl.clear( gl.COLOR_BUFFER_BIT );
        gl.clear(gl.DEPTH_BUFFER_BIT);
        this.gl.drawArrays(gl.TRIANGLES, 0, 18);
    }
    run();
    window.onkeydown = function(e){
        if(37 === e.keyCode){
            near-=0.1;
        }
        if(39 === e.keyCode){
            near+=0.1;
        }
        if(38 === e.keyCode){
            far-=0.1;
        }
        if(40 === e.keyCode){
            far+=0.1;
        }
        run();
    }
}
