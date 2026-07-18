const $ = (selector, root = document) => root.querySelector(selector);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
// WebGL2 thread field. Static CSS background remains if unavailable.
(() => {
  const canvas = $('#shader');
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: true, powerPreference: 'high-performance' });
  if (!gl || reducedMotion) return;
  const vertex = `#version 300 es
  in vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
  const fragment = `#version 300 es
  precision highp float;out vec4 o;uniform vec2 r;uniform float t;uniform float s;uniform vec2 m;
  float line(vec2 uv,float y,float w){return smoothstep(w,0.,abs(uv.y-y));}
  void main(){
    vec2 uv=(gl_FragCoord.xy-.5*r)/min(r.x,r.y);
    float time=t*.12;float v=0.;
    for(int i=0;i<9;i++){
      float fi=float(i);
      float y=.22*sin(uv.x*(2.2+fi*.17)+time*(.7+fi*.04)+fi*.83);
      y+=.06*sin(uv.x*7.8-time+fi*1.7);
      y+=(fi-4.)*.035;
      v+=line(uv,y,.0045+(fi==4?0.003:0.));
    }
    float pointer=.12/(.1+length(uv-(m-.5)*vec2(r.x/r.y,1.)));
    vec3 paper=vec3(.958,.958,.935);
    vec3 blue=vec3(.055,.44,1.);
    vec3 ink=vec3(.02,.022,.025);
    float sweep=smoothstep(-.8,.9,uv.x+s*.6);
    vec3 col=mix(paper,ink,clamp(v*.26,0.,.16));
    col=mix(col,blue,clamp(v*.08*sweep+pointer*.012,0.,.08));
    o=vec4(col,1.);
  }`;
  const compile = (type, source) => {
    const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
    return shader;
  };
  try {
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program); gl.useProgram(program);
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    const uniforms = {
      r: gl.getUniformLocation(program,'r'), t: gl.getUniformLocation(program,'t'),
      s: gl.getUniformLocation(program,'s'), m: gl.getUniformLocation(program,'m')
    };
    let pointer = [.5,.5];
    addEventListener('pointermove', e => pointer=[e.clientX/innerWidth,1-e.clientY/innerHeight], { passive:true });
    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 1.7); canvas.width = innerWidth*dpr; canvas.height=innerHeight*dpr;
      gl.viewport(0,0,canvas.width,canvas.height);
    }; resize(); addEventListener('resize', resize);
    const render = now => {
      gl.uniform2f(uniforms.r,canvas.width,canvas.height); gl.uniform1f(uniforms.t,now/1000);
      gl.uniform1f(uniforms.s,scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight));
      gl.uniform2f(uniforms.m,pointer[0],pointer[1]); gl.drawArrays(gl.TRIANGLES,0,3); requestAnimationFrame(render);
    }; requestAnimationFrame(render);
  } catch (error) { console.warn('Thread shader unavailable', error); }
})();
