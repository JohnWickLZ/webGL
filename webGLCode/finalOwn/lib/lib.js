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

function bufferInit(gl, dataVertices, attrName, program){
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, dataVertices, gl.STATIC_DRAW);
    var attrPos  = gl.getAttribLocation(program, attrName);
    gl.vertexAttribPointer(attrPos, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attrPos);
}