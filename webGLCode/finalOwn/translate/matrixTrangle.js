
var canvas;
var gl;

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    gl = canvas.getContext('webgl');
    gl.viewport( 0, 0, canvas.width, canvas.height );

    var VERTEX_SHADER = `
        attribute vec4 a_pos;
        uniform mat4 u_change;
        void main(){
            gl_Position = u_change * a_pos;
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

    // var Tx = 0.0;
    // var Ty = 0.0;
    // var Tz = 0.0;
    // 平移矩阵
    // var dataMatrix = new this.Float32Array([
    //     1.0, 0.0, 0.0, 0.0,
    //     0.0, 1.0, 0.0, 0.0,
    //     0.0, 0.0, 1.0, 0.0,
    //     Tx, Ty, Tz, 1.0
    // ]);

    // var Tx = 1.0;
    // var Ty = 1.0;
    // var Tz = 1.0;
    // // 缩放矩阵
    // var dataMatrix = new this.Float32Array([
    //     Tx, 0.0, 0.0, 0.0,
    //     0.0, Ty, 0.0, 0.0,
    //     0.0, 0.0, Tz, 0.0,
    //     0.0, 0.0, 0.0, 1.0
    // ]);

    var angle = 0.0;
    var u_change = gl.getUniformLocation(program, 'u_change');
    function run(){
        var sinB = Math.sin(Math.PI * angle / 180);
        var cosB = Math.cos(Math.PI * angle / 180);
        // 缩放矩阵
        var dataMatrix = new this.Float32Array([
            cosB, sinB, 0.0, 0.0,
            -sinB, cosB, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]);
        gl.uniformMatrix4fv(u_change, false, dataMatrix)
        gl.clearColor(0,0,1,1);
        gl.clear( gl.COLOR_BUFFER_BIT );
        this.gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    run();

    window.onkeydown = function(e){
        if(37 === e.keyCode){
            angle += 1.0;
            //Tx-=0.01;
        }
        if(39 === e.keyCode){
            angle -= 1.0;
            //Tx+=0.01;
        }
        // if(38 === e.keyCode){
        //     Ty+=0.01;
        // }
        // if(40 === e.keyCode){
        //     Ty-=0.01;
        // }
        run();
    } 
}
