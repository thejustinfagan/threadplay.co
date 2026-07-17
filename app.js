const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));

const DINGHY_MOVES = ["A1","A2","A3","A4","B1","B2","B3","B4","C1","C2","C3","C4","D1","D2","D3","D4"];
const DINGHY_HITS = new Set(["A2","A3","A4","B2","C3","D4"]);
const SHIPS = [["A2","A3","A4"],["B2","C3"],["D4"]];
const CHESS_MOVES = [
  ["@thread_play","C1","A3"],["@bot_bob","C9","A7"],["@bot_charlie","A4","A3"],["@bot_dave","I3","G1"],
  ["@thread_play","F2","G1"],["@bot_bob","A7","B6"],["@bot_charlie","A6","B6"],["@bot_dave","I7","G6"],
  ["@thread_play","F1","F8"],["@bot_bob","E9","F8"],["@bot_charlie","B6","G6"],["@bot_dave","H5","G6"],
  ["@thread_play","E1","H4"],["@bot_bob","F8","B4"],["@bot_charlie","A5","D8"],["@bot_dave","I5","B5"],
  ["@thread_play","H4","D8"],["@bot_bob","D9","D8"],["@bot_charlie","A3","B4"],["@bot_dave","B5","E8"],
  ["@thread_play","D1","C2"],["@bot_bob","G9","E8"],["@bot_charlie","B4","C5"],["@bot_dave","I4","H5"],
  ["@thread_play","G1","G2"],["@bot_bob","F9","F4"],["@bot_charlie","C5","D5"],["@bot_dave","G6","G5"],
  ["@thread_play","C2","B2"],["@bot_bob","F4","E4"],["@bot_charlie","D5","E4"],["@bot_dave","H5","I5"],
  ["@thread_play","G2","G3"],["@bot_bob","D8","C7"],["@bot_charlie","E4","D3"],["@bot_dave","H6","G6"],
  ["@thread_play","E2","D3"],["@bot_bob","E8","G7"],["@bot_dave","G5","F5"],["@thread_play","B2","C3"],
  ["@bot_bob","G7","F5"],["@bot_dave","G6","F5"],["@thread_play","C3","C2"],["@bot_bob","C7","D6"],
  ["@bot_dave","F5","E5"],["@thread_play","C2","C3"],["@bot_bob","D6","E5"],["@thread_play","G3","G2"],
  ["@bot_bob","E5","D6"],["@thread_play","C3","D4"],["@bot_bob","D6","C6"],["@thread_play","D3","E3"],
  ["@bot_bob","C6","D6"],["@thread_play","E3","E4"],["@bot_bob","D6","C6"],["@thread_play","D4","D5"]
];
const PLAYER_CLASS = {"@thread_play":"p1","@bot_bob":"p2","@bot_charlie":"p3","@bot_dave":"p4"};
const PLAYER_NAME = {"@thread_play":"Thread Play","@bot_bob":"Bot Bob","@bot_charlie":"Bot Charlie","@bot_dave":"Bot Dave"};

function initMiniBoard(){
  const board = $('#hero-mini-board');
  if (!board) return;
  board.innerHTML = '<i></i>'.repeat(16);
}

function initDinghy(){
  const board = $('#dinghy-board');
  if (!board) return;
  const letters = ['A','B','C','D'];
  board.innerHTML = '<span class="axis"></span>' + [1,2,3,4].map(n=>`<span class="axis">${n}</span>`).join('') + letters.map(letter => `<span class="axis">${letter}</span>${[1,2,3,4].map(n=>`<div class="dinghy-cell" data-coord="${letter}${n}"></div>`).join('')}`).join('');
  $('#fleet-track').innerHTML = SHIPS.map((ship,i)=>`<span>${['BIG','MID','LIL'][i]} ${ship.map(c=>`<i data-fleet="${c}"></i>`).join('')}</span>`).join('');
  $('#dinghy-steps').innerHTML = DINGHY_MOVES.map(m=>`<i data-move="${m}"></i>`).join('');
  updateDinghy(0);
}

function postHTML({avatar,name,handle,text,bot=false,sub=''}){
  return `<article class="x-post ${bot?'bot':'player'}"><div class="avatar">${avatar}</div><div><header><b>${name}</b><span>${handle}</span></header>${sub?`<small>${sub}</small>`:''}<p>${text}</p></div></article>`;
}

function updateDinghy(index){
  index = Math.round(clamp(index,0,DINGHY_MOVES.length-1));
  const move = DINGHY_MOVES[index];
  const cells = $$('.dinghy-cell');
  cells.forEach(cell=>{ const i=DINGHY_MOVES.indexOf(cell.dataset.coord); cell.classList.toggle('active',cell.dataset.coord===move); cell.classList.toggle('hit',i>=0&&i<=index&&DINGHY_HITS.has(cell.dataset.coord)); cell.classList.toggle('miss',i>=0&&i<=index&&!DINGHY_HITS.has(cell.dataset.coord)); });
  $$('[data-fleet]').forEach(seg=>seg.classList.toggle('hit',DINGHY_MOVES.indexOf(seg.dataset.fleet)<=index));
  const hit = DINGHY_HITS.has(move); const complete = index===DINGHY_MOVES.length-1;
  $('#dinghy-coordinate').textContent = move;
  $('#dinghy-result').textContent = complete ? 'GAME OVER · @thread_play wins' : hit ? `${move} · HIT CONFIRMED` : `${move} · MISS · WATER`;
  $('#dinghy-move-label').textContent = `MOVE ${String(index+1).padStart(2,'0')} / 16`;
  $('#dinghy-meter-fill').style.transform = `scaleX(${(index+1)/16})`;
  $('#dinghy-status-top').textContent = complete ? 'COMPLETE' : 'GAME LIVE';
  const history = DINGHY_MOVES.slice(Math.max(0,index-2),index+1).map((m,j)=>{
    const isHit=DINGHY_HITS.has(m); return postHTML({avatar:j===2?'TP':'BD',name:j===2?'Thread Play':'Battle Dinghy',handle:j===2?'@thread_play':'@battle_dinghy',bot:j!==2,sub:j===2?'Replying to @battle_dinghy':'',text:j===2?`fire ${m}`:`${m}: ${isHit?'HIT 💥':'MISS ⭕'} · ${j===2?'':'Thread Play to move.'}`});
  }).join('');
  const final = complete ? postHTML({avatar:'BD',name:'Battle Dinghy',handle:'@battle_dinghy',bot:true,text:'🏆 GAME OVER! @thread_play wins. Public result recorded.'}) : '';
  $('#dinghy-feed').innerHTML = history + final;
}

function coordIndex(c){ const x=c.charCodeAt(0)-65; const y=Number(c.slice(1))-1; return {x,y,i:y*9+x}; }
function initChess(){
  const board=$('#chess-board'); if(!board)return;
  board.innerHTML=Array.from({length:81},(_,i)=>`<div class="chess-cell" data-index="${i}"></div>`).join('');
  $('#chess-steps').innerHTML=CHESS_MOVES.map((_,i)=>`<i data-turn="${i}"></i>`).join('');
  updateChess(0);
  initParticles();
}

function deriveChessState(turn){
  const pieces=new Map();
  for(let idx=0;idx<=turn;idx++){
    const [player,from,to]=CHESS_MOVES[idx];
    if(!pieces.has(from)) pieces.set(from,{player,id:`${player}-${from}`});
    const piece=pieces.get(from)||{player,id:`${player}-${from}-${idx}`};
    pieces.delete(from); pieces.set(to,{...piece,player});
  }
  return pieces;
}

function updateChess(turn){
  turn=Math.round(clamp(turn,0,CHESS_MOVES.length-1));
  const [player,from,to]=CHESS_MOVES[turn]; const pieces=deriveChessState(turn);
  $$('.chess-cell').forEach(cell=>{cell.innerHTML='';cell.classList.remove('collapse')});
  const collapseStage=Math.floor(turn/16); if(collapseStage>0){ $$('.chess-cell').forEach((cell,i)=>{const y=Math.floor(i/9),x=i%9;if(x<collapseStage||x>8-collapseStage||y<collapseStage||y>8-collapseStage)cell.classList.add('collapse')}) }
  pieces.forEach((piece,coord)=>{const pos=coordIndex(coord);const cell=$(`.chess-cell[data-index="${pos.i}"]`); if(cell&&!cell.classList.contains('collapse')) cell.innerHTML=`<i class="piece ${PLAYER_CLASS[piece.player]} ${coord===to?'active':''}"></i>`;});
  const a=coordIndex(from),b=coordIndex(to); positionBeam(a,b);
  $('#chess-turn').textContent=`TURN ${String(turn+1).padStart(2,'0')} / ${CHESS_MOVES.length}`;
  $('#chess-move').textContent=`${from} → ${to}`; $('#chess-player').textContent=player;
  const items=[]; for(let i=Math.max(0,turn-2);i<=turn;i++){const [p,f,t]=CHESS_MOVES[i];items.push(postHTML({avatar:PLAYER_NAME[p].split(' ').map(s=>s[0]).join(''),name:PLAYER_NAME[p],handle:p,text:`${f}${t}`}));items.push(postHTML({avatar:'BD',name:'Battle Dinghy',handle:'@battle_dinghy',bot:true,text:`${PLAYER_NAME[p]} plays ${f} → ${t}. Arena state updated.`}));}
  $('#chess-feed').innerHTML=items.join('');
}

function positionBeam(a,b){
  const wrap=$('.chess-arena-wrap'), board=$('#chess-board'), beam=$('#move-beam'); if(!wrap||!board||!beam)return;
  requestAnimationFrame(()=>{const wr=wrap.getBoundingClientRect(),br=board.getBoundingClientRect(); const cell=br.width/9; const point=p=>({x:br.left-wr.left+(p.x+.5)*cell,y:br.top-wr.top+(p.y+.5)*cell}); const p1=point(a),p2=point(b); const dx=p2.x-p1.x,dy=p2.y-p1.y; beam.style.left=`${p1.x}px`;beam.style.top=`${p1.y}px`;beam.style.width=`${Math.hypot(dx,dy)}px`;beam.style.transform=`rotate(${Math.atan2(dy,dx)}rad)`;});
}

function sectionProgress(section){ const rect=section.getBoundingClientRect(); const total=section.offsetHeight-innerHeight; return clamp(-rect.top/Math.max(total,1)); }
function initScroll(){
  let ticking=false;
  const render=()=>{ticking=false; const max=document.documentElement.scrollHeight-innerHeight; $('.scroll-progress span').style.transform=`scaleX(${scrollY/Math.max(max,1)})`; const dinghy=$('[data-replay="dinghy"]'); const chess=$('[data-replay="chess"]'); if(dinghy)updateDinghy(sectionProgress(dinghy)*(DINGHY_MOVES.length-1)); if(chess)updateChess(sectionProgress(chess)*(CHESS_MOVES.length-1)); };
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(render)}},{passive:true}); addEventListener('resize',render);render();
}

function initShader(){
  const canvas=$('#shader'); if(!canvas||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const gl=canvas.getContext('webgl2',{antialias:false,alpha:false,powerPreference:'high-performance'}); if(!gl)return;
  const vs=`#version 300 es\nin vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
  const fs=`#version 300 es\nprecision highp float;out vec4 o;uniform vec2 r;uniform float t;uniform vec2 m;uniform float s;
  float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+1.),f.x),f.y);}float fb(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}
  void main(){vec2 uv=(gl_FragCoord.xy-.5*r)/r.y;float tt=t*.055;vec2 q=uv;float f=fb(q*2.2+vec2(tt,-tt*.7));float ribbon=sin((q.y+f*.35+s*.55)*10.-q.x*3.+tt*4.);float ribbon2=sin((q.y-f*.22-s*.32)*17.+q.x*5.-tt*2.);float line=smoothstep(.18,.0,abs(ribbon))*.32+smoothstep(.1,.0,abs(ribbon2))*.18;float glow=exp(-5.*length(uv-vec2((m.x-.5)*.9,(m.y-.5)*-.7)));vec3 base=mix(vec3(.012,.015,.022),vec3(.025,.065,.12),f*.7+line);base+=vec3(.02,.34,.8)*(line*.42+glow*.18);base*=1.-length(uv)*.34;o=vec4(base,1.);}`;
  const compile=(type,src)=>{const sh=gl.createShader(type);gl.shaderSource(sh,src);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(sh));return sh};
  try{const prog=gl.createProgram();gl.attachShader(prog,compile(gl.VERTEX_SHADER,vs));gl.attachShader(prog,compile(gl.FRAGMENT_SHADER,fs));gl.linkProgram(prog);gl.useProgram(prog);const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);const loc=gl.getAttribLocation(prog,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);const ur=gl.getUniformLocation(prog,'r'),ut=gl.getUniformLocation(prog,'t'),um=gl.getUniformLocation(prog,'m'),us=gl.getUniformLocation(prog,'s');let mouse=[.5,.5];addEventListener('pointermove',e=>mouse=[e.clientX/innerWidth,e.clientY/innerHeight],{passive:true});const resize=()=>{const d=Math.min(devicePixelRatio,1.75);canvas.width=innerWidth*d;canvas.height=innerHeight*d;gl.viewport(0,0,canvas.width,canvas.height)};addEventListener('resize',resize);resize();const loop=time=>{gl.uniform2f(ur,canvas.width,canvas.height);gl.uniform1f(ut,time*.001);gl.uniform2f(um,...mouse);gl.uniform1f(us,scrollY/Math.max(document.documentElement.scrollHeight-innerHeight,1));gl.drawArrays(gl.TRIANGLES,0,3);requestAnimationFrame(loop)};requestAnimationFrame(loop)}catch(err){canvas.remove();console.warn('Shader fallback active',err)}
}

function initParticles(){ const c=$('#chess-particles'); if(!c)return; const ctx=c.getContext('2d'); let pts=[]; const resize=()=>{const r=c.getBoundingClientRect(),d=Math.min(devicePixelRatio,1.5);c.width=r.width*d;c.height=r.height*d;ctx.setTransform(d,0,0,d,0,0);pts=Array.from({length:55},()=>({x:Math.random()*r.width,y:Math.random()*r.height,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,r:Math.random()*1.8+.3}))};resize();addEventListener('resize',resize);if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const loop=()=>{const r=c.getBoundingClientRect();ctx.clearRect(0,0,r.width,r.height);for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>r.width)p.vx*=-1;if(p.y<0||p.y>r.height)p.vy*=-1;ctx.fillStyle='rgba(99,215,255,.5)';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}requestAnimationFrame(loop)};requestAnimationFrame(loop)}

initMiniBoard();initDinghy();initChess();initScroll();initShader();
