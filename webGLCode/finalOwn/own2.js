
var canvas;
var gl;

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    gl = canvas.getContext('webgl');
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(0,0,1,1);
    gl.clear( gl.COLOR_BUFFER_BIT );

    var VERTEX_SHADER = `
        void main(){
            gl_Position = vec4(0.0, 0.0, 1.0, 1.0);
            gl_PointSize = 10.0;
        }
    `;

    var FRAG_SHADER = `
        void main(){
            gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
        }
    `;
    var vertex = gl.createShader(gl.VERTEX_SHADER);
    var frag = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertex, VERTEX_SHADER);
    gl.shaderSource(frag, FRAG_SHADER);

    this.gl.compileShader(vertex);
    this.gl.compileShader(frag);

    var program = gl.createProgram();
    this.gl.attachShader(program, vertex);
    this.gl.attachShader(program, frag);

    this.gl.linkProgram(program);
    this.gl.useProgram(program);

    gl.clearColor(0,1,1,1); 
    gl.clear( gl.COLOR_BUFFER_BIT );

    this.gl.drawArrays(gl.POINTS, 0, 1);
}
