const $ = (selector, root = document) => root.querySelector(selector);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
// Battle Chess Arena deterministic demonstration using the simulator's current rules shape.
const arenaCanvas=$('#arena-canvas'); const ctx=arenaCanvas.getContext('2d');
const files='ABCDEFGHI';
const colors=['#168cff','#ff4b68','#b7ff3c','#ffb11b'];
const initialPieces={
  C1:'0B',D1:'0K',E1:'0Q',F1:'0R',G1:'0N',D2:'0P',E2:'0P',F2:'0P',
  C9:'1B',D9:'1K',E9:'1Q',F9:'1R',G9:'1N',D8:'1P',E8:'1P',F8:'1P',
  A3:'2B',A4:'2K',A5:'2Q',A6:'2R',A7:'2N',B4:'2P',B5:'2P',B6:'2P',
  I3:'3B',I4:'3K',I5:'3Q',I6:'3R',I7:'3N',H4:'3P',H5:'3P',H6:'3P'
};
const arenaMoves=[
 ['@thread_play','C1','A3',true,0],
 ['@bot_bob','C9','A7',true,0],
 ['@bot_charlie','B6','A7',true,0],
 ['@bot_dave','I3','G1',true,0],
 ['@thread_play','A3','B4',true,0],
 ['@bot_bob','G9','F7',false,0],
 ['@bot_charlie','A5','B4',true,0],
 ['@bot_dave','G1','F2',true,0],
 ['@thread_play','E1','F2',true,0],
 ['@bot_bob','D9','C8',false,0],
 ['@bot_charlie','A6','H6',true,0],
 ['@bot_dave','I6','H6',true,0],
 ['@thread_play','F2','F7',true,0],
 ['@bot_bob','E8','F7',true,0],
 ['@bot_charlie','A4','B3',false,0],
 ['@bot_dave','I7','G6',false,0],
 ['@thread_play','F1','F7',true,0],
 ['@bot_bob','E9','E2',true,0],
 ['@bot_charlie','A7','B7',false,0],
 ['@bot_dave','I4','H3',false,0],
 ['@thread_play','D1','E2',true,0],
 ['@bot_bob','C8','B7',true,0],
 ['@bot_charlie','B4','F8',true,0],
 ['@bot_dave','G6','F8',true,0],
 ['@thread_play','F7','B7',true,0],
 ['@bot_bob','F9','F8',true,0],
 ['@bot_charlie','B5','C5',false,0],
 ['@bot_dave','H6','E6',false,0],
 ['@thread_play','B7','B3',true,0],
 ['@bot_bob','F8','F5',false,0],
 ['@bot_charlie','C5','D5',false,0],
 ['@bot_dave','E6','E2',true,1],
 ['@thread_play','B3','H3',true,1],
 ['@bot_bob','D8','D7',false,1],
 ['@bot_charlie','D5','E5',false,1],
 ['@bot_dave','E2','E5',true,1],
 ['@thread_play','H3','E3',false,1],
 ['@bot_bob','F5','E5',true,1],
 ['@bot_dave','H5','G5',false,1],
 ['@thread_play','E3','E5',true,1],
 ['@bot_bob','D7','D6',false,1],
 ['@bot_dave','H4','G4',false,1],
 ['@thread_play','D2','D3',false,1],
 ['@bot_bob','D6','E5',true,1],
 ['@bot_dave','G5','F5',false,1],
 ['@thread_play','D3','D4',false,1],
 ['@bot_bob','E5','D4',true,1],
 ['@bot_dave','F5','E5',false,2],
 ['@bot_bob','D4','E5',true,2],
 ['@bot_dave','G4','F4',false,2],
 ['@bot_bob','E5','F4',true,2]
];
let arenaState={...initialPieces}; let arenaIndex=0; let arenaTimer=null;
function squareXY(square){return [files.indexOf(square[0]),parseInt(square.slice(1),10)-1]}
function resetArena(){arenaState={...initialPieces};arenaIndex=0;drawArena()}
function applyArenaMove(move){const [,from,to,,ring]=move;if(arenaState[from]){arenaState[to]=arenaState[from];delete arenaState[from]}if(ring>0){for(const square of Object.keys(arenaState)){const [x,y]=squareXY(square);if(x<ring||y<ring||x>8-ring||y>8-ring)delete arenaState[square]}}}
function drawArena(){
  const size=arenaCanvas.width; const cell=size/9; ctx.clearRect(0,0,size,size);
  ctx.fillStyle='#070a0f';ctx.fillRect(0,0,size,size);
  const moveState=arenaMoves[Math.max(0,Math.min(arenaIndex-1,arenaMoves.length-1))];const collapsed=moveState?moveState[4]:0;
  for(let y=0;y<9;y++)for(let x=0;x<9;x++){
    const dead=collapsed&&(x<collapsed||y<collapsed||x>8-collapsed||y>8-collapsed);
    ctx.fillStyle=dead?'#15171b':((x+y)%2?'#17202b':'#202c39');ctx.fillRect(x*cell,y*cell,cell,cell);
    ctx.strokeStyle=dead?'#292d32':'rgba(255,255,255,.07)';ctx.strokeRect(x*cell,y*cell,cell,cell);
  }
  for(const [square,piece] of Object.entries(arenaState)){
    const [x,y]=squareXY(square); if(collapsed&&(x<collapsed||y<collapsed||x>8-collapsed||y>8-collapsed))continue;
    const side=Number(piece[0]); const type=piece[1]; const cx=(x+.5)*cell,cy=(8-y+.5)*cell;
    ctx.beginPath();ctx.arc(cx,cy,cell*.29,0,Math.PI*2);ctx.fillStyle=colors[side];ctx.shadowColor=colors[side];ctx.shadowBlur=22;ctx.fill();ctx.shadowBlur=0;
    ctx.fillStyle='#08090b';ctx.font=`900 ${cell*.27}px ui-sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(type,cx,cy+1);
  }
  const move=arenaMoves[Math.min(arenaIndex,arenaMoves.length-1)];
  if(move){const [actor,from,to]=move;const [fx,fy]=squareXY(from),[tx,ty]=squareXY(to);ctx.strokeStyle='#fff';ctx.lineWidth=4;ctx.setLineDash([10,10]);ctx.beginPath();ctx.moveTo((fx+.5)*cell,(8-fy+.5)*cell);ctx.lineTo((tx+.5)*cell,(8-ty+.5)*cell);ctx.stroke();ctx.setLineDash([]);$('#arena-turn').textContent=`Turn ${String(arenaIndex+1).padStart(2,'0')}`;$('#arena-move').textContent=`${from} → ${to}`;$('#arena-actor').textContent=actor;}
}
function stepArena(){if(arenaIndex>=arenaMoves.length){clearInterval(arenaTimer);arenaTimer=null;$('#arena-play').textContent='Replay arena demo';return}applyArenaMove(arenaMoves[arenaIndex]);arenaIndex++;drawArena()}
$('#arena-play').addEventListener('click',()=>{if(arenaTimer){clearInterval(arenaTimer);arenaTimer=null;$('#arena-play').textContent='Resume arena demo';return}if(arenaIndex>=arenaMoves.length)resetArena();$('#arena-play').textContent='Pause arena demo';arenaTimer=setInterval(stepArena,reducedMotion?500:260)});
resetArena();
