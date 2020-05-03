function initShader(gl, VERTEX_SHADER,FRAG_SHADER){
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
    return program;
}