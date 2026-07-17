const $ = (selector, root = document) => root.querySelector(selector);
// Battle Dinghy scroll replay. Move order is the current WinnerBot source contract.
const dinghyMoves = ['A1','A2','A3','A4','B1','B2','B3','B4','C1','C2','C3','C4','D1','D2','D3','D4'];
const shipCells = new Set(['A2','A3','B3','C1','C2','D4']);
const shipGroups = [['A2','A3'],['C1','C2'],['B3'],['D4']];
const dinghyBoard = $('#dinghy-board');
const dinghyThread = $('#dinghy-thread');
const dinghyCells = new Map();

for (const row of 'ABCD') for (let col=1; col<=4; col++) {
  const coord = `${row}${col}`;
  const cell = document.createElement('div'); cell.className='dinghy-cell'; cell.dataset.coord=coord;
  cell.innerHTML=`<span class="cell-label">${coord}</span>`; dinghyBoard.append(cell); dinghyCells.set(coord,cell);
}
const fleetStatus = $('#fleet-status');
shipGroups.forEach((ship,index)=>{const el=document.createElement('div');el.className='ship';el.dataset.ship=index;el.style.setProperty('--health','1');fleetStatus.append(el)});

function dinghyPost(kind, name, handle, text, time='now') {
  return `<article class="post ${kind}"><div class="avatar">${kind==='bot'?'BD':'TP'}</div><div><header><b>${name}</b> <span>${handle} · ${time}</span></header><p>${text.replace(/(@\w+)/g,'<mark>$1</mark>')}</p><div class="actions-row"><span>◯</span><span>↻</span><span>♡</span><span>▥</span><span>↗</span></div></div></article>`;
}
function renderDinghy(index) {
  index = Math.max(0, Math.min(dinghyMoves.length-1,index));
  const activeMove = dinghyMoves[index];
  dinghyCells.forEach((cell,coord)=>{
    const moveIndex = dinghyMoves.indexOf(coord);
    cell.className='dinghy-cell';
    if(moveIndex<=index) cell.classList.add(shipCells.has(coord)?'hit':'miss');
    if(coord===activeMove) cell.classList.add('active');
  });
  shipGroups.forEach((ship,i)=>{
    const hits=ship.filter(c=>dinghyMoves.indexOf(c)<=index).length;
    const health=1-hits/ship.length; $(`.ship[data-ship="${i}"]`).style.setProperty('--health',health);
  });
  const hit=shipCells.has(activeMove); const done=index===dinghyMoves.length-1;
  $('#dinghy-step').textContent=`Move ${String(index+1).padStart(2,'0')} / 16`;
  $('#dinghy-coord').textContent=activeMove; $('#dinghy-fill').style.transform=`scaleX(${(index+1)/16})`;
  $('#board-result').textContent=done?'Fleet cleared':`${hit?'Hit':'Miss'} at ${activeMove}`;
  const start = dinghyPost('player','Thread Play','@thread_play','<mark>@battle_dinghy</mark> I challenge <mark>@maya</mark>.');
  const begun = dinghyPost('bot','Battle Dinghy','@battle_dinghy','Game has begun. <mark>@thread_play</mark>, you\'re up first.');
  const recent = dinghyMoves.slice(Math.max(0,index-2),index+1).map((move,j)=>{
    const actualIndex=Math.max(0,index-2)+j; const result=shipCells.has(move)?'Hit':'Miss';
    return dinghyPost(actualIndex%2?'bot':'player',actualIndex%2?'Battle Dinghy':'Thread Play',actualIndex%2?'@battle_dinghy':'@thread_play',actualIndex%2?`${result}. ${actualIndex<15?'Next coordinate.':'Final board verified.'}`:`fire ${move}`,`${Math.max(1,16-actualIndex)}m`);
  }).join('');
  const finish = done ? dinghyPost('bot','Battle Dinghy','@battle_dinghy','🏆 GAME OVER. <mark>@thread_play</mark> wins. Final state and receipt attached.') : '';
  dinghyThread.innerHTML=start+begun+recent+finish;
  dinghyThread.scrollTop=dinghyThread.scrollHeight;
}
renderDinghy(0);

const replaySection = $('#dinghy');
let lastDinghyIndex = -1;
function syncDinghy(){
  const rect=replaySection.getBoundingClientRect();
  const travel=replaySection.offsetHeight-innerHeight;
  const progress=Math.max(0,Math.min(1,-rect.top/Math.max(1,travel)));
  const index=Math.min(15,Math.floor(progress*16));
  if(index!==lastDinghyIndex){lastDinghyIndex=index;renderDinghy(index)}
}
addEventListener('scroll',syncDinghy,{passive:true}); syncDinghy();
