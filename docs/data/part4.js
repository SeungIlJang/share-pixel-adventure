/* 모두의 픽셀모험 — 시즌 2 「떨어진 빛들」 제1부 「답하는 빛」 데이터 (시즌 2의 1~7장)
   게임 안에서는 "4부"로 다룬다(partLabel 이 「시즌 2 · 1부」로 보여 준다). 새 동료 사나(창술사)와 그 기술·특성이 여기 들어 있다.
   던전·들판의 큰 지도는 tools/growmaps.cjs 가 지은 것이다(rev 가 붙은 곳). 아직 그림이 없는 마물·인물은 지금 있는 그림에 색만 바꿔 쓴다 —
   design/prompt14~17 의 결과물이 들어오면 같은 이름(id·look)의 그림이 대신 쓰인다. */
(function(){
"use strict";
/* ---- 화자 색 ---- */
const T='#7cc4ff', K='#c79bff', M='#9fe8c4', C='#f0c27a', LORD='#c0708a', NPC='#d9cdb5', SANA='#7fd6d0', ICE='#bfe6f2', FOE='#c9a24a';
const say=(n,t,c)=>({n,t,c});
/* ---- 적 능력치: 시즌 1의 마지막 장(22장)에서 이어 가되, 오르는 폭을 줄였다.
   시즌 1의 곡선(장마다 공격 ×1.085)을 그대로 이으면 레벨마다 일정하게 크는 일행을 금세 앞지른다 — 시뮬레이션에서 일반 전투도 지는 것을 확인했다.
   ch 는 시즌 1에서 이어 센 장 번호(시즌 2의 1~7장 = 23~29). 보스의 hp/atk/mag 는 시뮬레이션으로 맞춘 값을 직접 적는다 ---- */
const pw=(b,k)=>Math.pow(b,k);
function reg(ch,m){ m=m||{}; const c=ch-22; return {
  hp:Math.round(1640*pw(1.10,c)*(m.hp||1)), atk:Math.round(204*pw(1.045,c)*(m.atk||1)), mag:Math.round(150*pw(1.045,c)*(m.mag||1)),
  def:Math.round((48+1.5*c)*(m.def||1)), spd:(m.spd||11)+7+Math.floor(c/2), exp:Math.round(940*pw(1.15,c)*(m.exp||1)), gold:Math.round(250*pw(1.08,c)*(m.gold||1)) }; }
function bos(ch,m){ m=m||{}; const c=ch-22; return {
  def:Math.round(52+1.5*c), spd:(m.spd||10)+7+Math.floor(c/2), exp:Math.round(6500*pw(1.15,c)), gold:Math.round(2500*pw(1.08,c)), boss:true }; }
/* ---- 지역 팔레트: 차갑고 푸른 세계. 따뜻한 색은 사람 사는 곳의 불빛에만 ---- */
const PAL={
  port:  { bg:'#0a1016', floor:'#343c44', wall:'#1c262e', grass:'#2c4a5c', altar:'#2a3a66', boss:'#5a2a3a', chest:'#3a2e1a', detail:'rgba(190,225,240,.12)', roof:'#4a7088', roof2:'#3e6278' },
  pier:  { bg:'#070c12', floor:'#2c3a46', wall:'#141e28', grass:'#2e5870', altar:'#2a3a66', boss:'#3a5a7a', chest:'#3a2e1a', detail:'rgba(180,230,245,.10)', rock:'#32485a', rock2:'#283c4c' },
  light: { bg:'#05080e', floor:'#262e3c', wall:'#10161e', grass:'#2c4a66', altar:'#2a3a66', boss:'#2a5a6a', chest:'#3a2e1a', detail:'rgba(140,240,255,.09)', rock:'#2c3848', rock2:'#242e3c' },
  court: { bg:'#09080b', floor:'#34303a', wall:'#1e1a24', grass:'#3a3a48', altar:'#2a3a66', boss:'#4a2a3a', chest:'#3a2e1a', detail:'rgba(192,112,138,.08)', roof:'#4a4054', roof2:'#3c3446' },
  cape:  { bg:'#0b0e12', floor:'#3a4048', wall:'#20262e', grass:'#3a5466', altar:'#2a3a66', boss:'#5a2a3a', chest:'#3a2e1a', detail:'rgba(255,220,170,.09)', roof:'#6a5a4a', roof2:'#5a4c3e' },
  sea:   { bg:'#080d14', floor:'#34465a', wall:'#18242f', grass:'#3c6a86', altar:'#2a3a66', boss:'#3a5a7a', chest:'#3a2e1a', detail:'rgba(200,240,255,.10)', rock:'#3a5266', rock2:'#2e4456', tuft:'#9ad8ec' },
  fleet: { bg:'#06090e', floor:'#2e3640', wall:'#141a22', grass:'#30506a', altar:'#2a3a66', boss:'#5a4a1a', chest:'#3a2e1a', detail:'rgba(201,162,74,.08)', rock:'#303c4a', rock2:'#28323e' },
  camp:  { bg:'#0a0c10', floor:'#383e46', wall:'#1e242c', grass:'#3a5466', altar:'#2a3a66', boss:'#5a2a3a', chest:'#3a2e1a', detail:'rgba(255,200,140,.10)', roof:'#5a6a78', roof2:'#4c5c6a' },
  storm: { bg:'#060a10', floor:'#2c3c4e', wall:'#141e2a', grass:'#3a6078', altar:'#2a3a66', boss:'#3a5a7a', chest:'#3a2e1a', detail:'rgba(220,245,255,.12)', rock:'#32485c', rock2:'#283c4e', tuft:'#b8e8f8' },
  whale: { bg:'#05070c', floor:'#2a3040', wall:'#12161f', grass:'#2e4660', altar:'#2a3a66', boss:'#6a5a2a', chest:'#3a2e1a', detail:'rgba(255,230,170,.07)', rock:'#30384a', rock2:'#262e3e' },
  gate:  { bg:'#050608', floor:'#24282e', wall:'#0e1014', grass:'#2a3e50', altar:'#2a3a66', boss:'#6a5216', chest:'#3a2e1a', detail:'rgba(201,162,74,.10)', rock:'#2a3038', rock2:'#22282e' },
  shore: { bg:'#04060c', floor:'#283444', wall:'#0e141c', grass:'#2c4a66', altar:'#2a3a66', boss:'#3a5a7a', chest:'#3a2e1a', detail:'rgba(140,240,255,.12)', rock:'#2c3a4c', rock2:'#24303e', tuft:'#8ff0ff' },
};
const TOWN=[ "1111111111111111","1000000000000001","1011100100111101","1000000000000001","1000000000030001","1000000000000001",
             "1010001100110001","1000000000000001","1000000000000001","1111111101111111","1111111111111111" ];
const ICE_TRAP='쩍 — 얇은 얼음이 꺼졌다! 얼음물에 빠졌다가 기어 나왔다. (전원 HP 피해)';

definePart(4,{

/* 제단의 동료 대화(시즌 2 · 1부). ch 는 시즌 1에서 이어 센 값(23~29) */
talks:{
  s2t3:{ch:25,when:'sanaJoined',title:'작살과 검',lines:[
    ['코르','그 작살, 고기 잡던 거라며. 사람한테 겨눈 건 우리가 처음이야?'],
    ['사나','처음이야. 마지막이면 좋겠고.'],
    ['테리','세던데. 팔이 아직 저려.'],
    ['사나','…고래는 한 번에 못 잡아. 숨이 찰 때까지 따라가는 거야. 너희한테도 그러려고 했어.'],
    ['미아','그럼 저희는 숨이 덜 찬 고래였네요.'],
    ['사나','웃기는 사람들이네. 그 빛을 켠 사람들이 이런 줄 몰랐어.'] ]},
  s2t4:{ch:26,when:'lordTold',title:'끄지 않는 불',lines:[
    ['카엘','군주는 등대를 안 끈대. 당연해. 삼백 해를 기다려서 겨우 켠 불이니까.'],
    ['사나','그 불 때문에 내 동생이 풀리고 있어도?'],
    ['카엘','…그걸 모르겠어서 가는 거야. 우리 선조는 저편을 보지도 않고 문을 닫았어.'],
    ['카엘','난 그 값을 삼백 해 치 봤어. 그러니까 이번엔, 보고 나서 정할 거야.'],
    ['사나','보고 나서도 안 끄겠다면?'],
    ['테리','그땐 다른 길을 찾을 때까지 같이 있을게. 그건 약속할 수 있어.'] ]},
  s2t6:{ch:28,when:'s2c5done',title:'거둬 가는 것',lines:[
    ['미아','선단에서 본 것… 멈춘 사람한테서 뭔가를 빼 가고 있었어요.'],
    ['사나','수집관의 일꾼들이야. 「풀리지 않게 돌보는 것」이라고 배웠어. 재상님 말씀으로.'],
    ['코르','돌보는 놈들이 사냥개를 끌고 다녀?'],
    ['사나','…나도 그게 걸려. 돌보는 거라면 왜 숨어서 하지.'],
    ['카엘','재상이 누구야?'],
    ['사나','칼릭 님. 별지기님 곁에서 삼백 해를 섬긴 분. 이 땅에서 그분을 의심하는 사람은 없어.'],
    ['코르','삼백 해라. 그 숫자, 우린 좀 질렸는데.'] ]},
},

goals:{4:[
  ['s2c1done','살레나 항 동쪽 ▣ 얼어붙은 부두를 살펴보자'],
  ['sanaJoined','부두 끝 ▣ 멈춘 등대섬에서 푸른 빛이 닿은 자리를 확인하자'],
  ['lordTold','살레나 항 남쪽 ▣ 물길로 약속의 뜰에 가서 그림자 군주에게 알리자'],
  ['s2c5done','부두 끝 ▣ 곶 마을 「끝물」을 지나 얼음 바다의 멈춘 선단을 넘자'],
  ['s2c6done','작살터에서 채비하고, 눈보라 속 ▣ 바람벽을 뚫자'],
  ['s2c7done','바다 끝 관문을 지키는 수집관을 쓰러뜨리자'],
  ['part4Clear','관문 너머 ▣ 멈춘 땅의 기슭에 오르자'],
]},

/* 숨은 강적 — 길에서 벗어난 곳. 싸우지 않아도 이야기는 진행된다 */
elites:{ icesea1:{x:15,y:5,id:'kingWolf',lv:34}, whalegrave:{x:31,y:17,id:'whaleSoul',lv:37} },

enemies:{
  kingWolf: {elite:'icesea1',  name:'빙판의 왕 늑대',     hp:38000,atk:250,mag:215,def:58,spd:24,exp:9000,gold:4600,color:'#b8d8e8',boss:true,weak:'fire',look:'wolf',big:2,palx:{f:'#b8d8e8',F:'#7a9cb0',l:'#ffffff',e:'#8ff0ff'},atkFx:'claw',moves:['eflurry','eatk','echarge','eblast','esmash'],enrage:0.4},
  whaleSoul:{elite:'whalegrave',name:'얼지 않는 고래의 넋',hp:44000,atk:215,mag:200,def:64,spd:18,exp:10500,gold:5200,color:'#d8e8f0',boss:true,weak:'bolt',resist:'ice',look:'brute',big:2,palx:{b:'#c8dce8',B:'#8aa4b8',l:'#ffffff',e:'#ffc870'},atkFx:'smash',moves:['esmash','emagic','efocus','eaoe','edrain','echarge','eblast']},
  /* 1장 — 얼어붙은 부두: 날다 멈추고, 솟다 멈춘 것들. 불에 약하다 */
  frostGull:  {weak:'arrow',name:'서리 갈매기',  ...reg(23,{hp:.75,spd:19}),      color:'#c8dce8',look:'bat',palx:{b:'#c8dce8',B:'#8aa4b8',l:'#ffffff'}},
  iceCrab:    {weak:'fire',resist:'arrow',name:'얼음 게',...reg(23,{hp:1.3,def:1.3,spd:9,atk:.9}),color:'#7ab8d0',look:'scarab',palx:{g:'#7ab8d0',G:'#4a8098',l:'#d8f4ff',w:'#ffffff',e:'#1a2a3a'}},
  stillSpray: {weak:'fire', name:'멈춘 물보라',  ...reg(23,{hp:.9,mag:1.12}),     color:'#9ad8ec',look:'slime',palx:{g:'#9ad8ec',G:'#5a9cb8',l:'#e8fbff',w:'#ffffff'},aiMagic:0.5},
  bigIceCrab: {atkFx:'smash',weak:'fire',moves:['eatk','esmash','efocus','eflurry','eaoe'],enrage:0.35,name:'큰 얼음 게',...bos(23), hp:16000,atk:158,mag:138, color:'#5aa0c0',look:'scarab',big:2,palx:{g:'#5aa0c0',G:'#34708c',l:'#c8f0ff',w:'#ffffff',e:'#1a2a3a'}},
  /* 2장 — 멈춘 등대섬 */
  frostBat:   {weak:'arrow',name:'서리 박쥐',    ...reg(24,{hp:.75,spd:20}),      color:'#8ab0c8',look:'bat',palx:{b:'#8ab0c8',B:'#56788e',l:'#d0ecf8'}},
  lightShade: {weak:'fire', name:'등대 그림자',  ...reg(24,{hp:1.0,spd:15}),      color:'#3a5a78',look:'shade',palx:{g:'#3a5a78',G:'#22384e',e:'#8ff0ff'},aiMagic:0.35},
  sanaFoe:    {atkFx:'blade',weak:null,moves:['eatk','eflurry','echarge','eblast','eatk','esmash'],enrage:0.3,name:'사나',...bos(24,{spd:15}), hp:15000,atk:185,mag:160, color:'#7fd6d0',look:'raider',big:1,palx:{b:'#7fd6d0',B:'#3f858e',e:'#b98a5a'}},
  /* 5장 — 얼음 바다와 멈춘 선단 */
  iceWolf:    {weak:'fire', name:'빙판 늑대',    ...reg(25,{hp:.9,spd:17}),       color:'#a8c8dc',look:'wolf',palx:{f:'#a8c8dc',F:'#6a8ca4',l:'#f0fbff',e:'#8ff0ff'}},
  snowHare:   {weak:'fire', name:'뿔 눈토끼',    ...reg(25,{hp:.7,spd:22,atk:1.05}),color:'#f0f4f8',look:'wolf',palx:{f:'#f0f4f8',F:'#b0bcc8',l:'#ffffff',e:'#ff8aa0'}},
  frostHusk:  {weak:'fire', name:'서리 허물',    ...reg(26,{hp:1.2}),             color:'#b0d0e0',look:'phantom',palx:{p:'#b0d0e0',P:'#6e92a8',e:'#ffffff'},aiMagic:0.3},
  sailGhost:  {weak:'bolt', name:'돛 유령',      ...reg(26,{hp:.85,mag:1.15}),    color:'#d0d8e0',look:'wraith',palx:{g:'#d0d8e0',G:'#8a96a4',l:'#ffffff',e:'#8ff0ff'},aiMagic:0.55},
  collectorHound:{weak:'bolt',name:'수집관의 사냥개',...reg(26,{hp:1.0,spd:18,atk:1.08}),color:'#2a2a34',look:'wolf',palx:{f:'#34343e',F:'#1c1c24',l:'#c9a24a',e:'#8ff0ff'}},
  houndChief: {atkFx:'claw',weak:'bolt',moves:['eflurry','eatk','evenom','echarge','eblast'],enrage:0.35,name:'사냥개 대장',...bos(26,{spd:13}), hp:30000,atk:205,mag:172, color:'#22222c',look:'wolf',big:2,palx:{f:'#2c2c36',F:'#16161c',l:'#c9a24a',e:'#8ff0ff'}},
  /* 6장 — 눈보라와 고래 무덤, 바람벽 */
  blizzardWisp:{weak:'fire',resist:'ice',name:'눈보라 정령',...reg(27,{hp:.8,mag:1.18,spd:16}),color:'#d8f0fa',look:'gale',palx:{a:'#d8f0fa',A:'#94b8cc',l:'#ffffff',e:'#5ad0f0'},aiMagic:0.6},
  underIce:   {weak:'bolt', name:'얼음 밑 그림자',...reg(27,{hp:1.1,spd:15}),     color:'#1e3850',look:'shade',palx:{g:'#28486a',G:'#142638',e:'#8ff0ff'},aiMagic:0.3},
  boneCrab:   {weak:'fire',resist:'arrow',name:'뼈 게',...reg(27,{hp:1.3,def:1.35,spd:9}),color:'#d8d4c4',look:'scarab',palx:{g:'#d8d4c4',G:'#9a9684',l:'#ffffff',w:'#ffffff',e:'#1a2a3a'}},
  boneWarden: {weak:'bolt',resist:'arrow',name:'고래 뼈 수호상',...reg(27,{hp:1.45,def:1.3,spd:9}),color:'#c8c4b0',look:'sentinel',palx:{g:'#c8c4b0',G:'#8a8674',l:'#f4f0e0',e:'#8ff0ff'}},
  gustWisp:   {weak:'fire',resist:'ice',name:'문지기의 눈발',...reg(28,{hp:.6,mag:.8,spd:15}),color:'#e8f6fc',look:'gale',palx:{a:'#e8f6fc',A:'#a8c8d8',l:'#ffffff',e:'#5ad0f0'},aiMagic:0.5}, /* 보스전에만 나오는 약한 졸개 */
  windSwift:  {weak:'arrow',name:'바람 칼새',    ...reg(28,{hp:.75,spd:23}),      color:'#a0d0e4',look:'bat',palx:{b:'#a0d0e4',B:'#6494ac',l:'#e8fbff'}},
  frostGiant: {weak:'fire', name:'작은 서리 거인',...reg(28,{hp:1.55,atk:1.12,spd:8}),color:'#7aa4c0',look:'brute',palx:{b:'#7aa4c0',B:'#4a7088',l:'#d0ecf8',e:'#8ff0ff'}},
  windGate:   {atkFx:'wind',weak:'fire',resist:'ice',moves:['emagic','eaoe','echarge','eblast','ecurse','eflurry'],enrage:0.35,name:'바람벽의 문지기',...bos(28,{spd:12}), hp:32000,atk:188,mag:158, color:'#c8e8f8',look:'gale',big:2,palx:{a:'#c8e8f8',A:'#80a8c0',l:'#ffffff',e:'#5ad0f0'}},
  /* 7장 — 바다 끝 관문: 칼릭의 무리. 검정과 놋쇠색. 번개에 약하다 */
  collectorHand:{weak:'bolt',resist:'arrow',name:'수집 일꾼',...reg(29,{hp:1.25,def:1.3,atk:.78}),color:'#2a2a34',look:'raider',palx:{b:'#30303c',B:'#1a1a22',e:'#c9a24a'}},
  reapLantern:{weak:'bolt', name:'거둠 등롱',    ...reg(29,{hp:.85,mag:1.2,spd:15}),color:'#c9a24a',look:'phantom',palx:{p:'#c9a24a',P:'#8a6c28',e:'#8ff0ff'},aiMagic:0.6},
  scaleCollector:{atkFx:'dark',weak:'bolt',moves:['eatk','ecurse','echarge','eblast','edrain','esmash'],enrage:0.4,name:'저울의 수집관',...bos(29,{spd:11}), hp:40000,atk:185,mag:165, color:'#1e1e28',look:'gatekeeper',big:2,palx:{g:'#2a2a36',G:'#14141c',e:'#c9a24a'}},
},

members:{
  /* 창술사 — 기본 공격이 옆의 적도 함께 찌른다. 검사보다 무르고 궁수보다 단단하다 */
  '사나':{cls:'창술사', art:'sana', stats:[34,10,11,5,4,10], skills:[], color:SANA, set:{weapon:'oldHarpoon',armor:'mornPlate',head:'mornHelm'}},
},

traits:{
  pierceLine:{name:'꿰뚫기',     desc:'기본 공격이 옆의 적 하나도 함께 찌른다(절반 피해)'},
  reach:     {name:'간격',       desc:'창의 길이만큼 물러서 싸운다 — 받는 피해 10% 감소'},
  hunterEye: {name:'사냥꾼의 눈',desc:'꿰뚫기로 옆의 적에게 주는 피해가 절반에서 4분의 3으로'},
},

skills:{
  lineThrust: {name:'꿰뚫는 창',fx:'heavy',mp:6,kind:'phys',power:1.3,splash:0.62,target:'enemy',msg:'의 꿰뚫는 창!',desc:'단일 ×1.3 +양옆 ×0.8'},
  spearStance:{name:'창 세우기',mp:5,kind:'buff',buff:'stance',turns:4,target:'self',msg:'의 창 세우기!',note:'맞으면 반드시 되찌른다',desc:'3턴간 반드시 반격'},
  hamstring:  {name:'발목 걸기',fx:'double',mp:5,kind:'phys',power:1.0,slow:4,target:'enemy',msg:'의 발목 걸기!',desc:'단일 ×1 +3턴 둔화'},
  spinThrust: {name:'회전 찌르기',fx:'wide',mp:12,kind:'phys',power:1.1,target:'allEnemies',msg:'의 회전 찌르기!',desc:'적 전체 ×1.1'},
  harpoon:    {name:'작살 던지기',fx:'heavy',mp:10,kind:'phys',power:2.4,stun:0.25,target:'enemy',msg:'의 작살 던지기!',desc:'단일 ×2.4 +기절 25%'},
},

learn:{
  '창술사':[{lv:1,trait:'pierceLine'},{lv:3,id:'lineThrust'},{lv:5,trait:'reach'},{lv:7,id:'spearStance'},{lv:10,id:'hamstring'},{lv:15,id:'spinThrust'},{lv:17,trait:'hunterEye'},{lv:19,id:'harpoon'}],
},

items:{
  megaPotion:{name:'특급 물약',hp:420,price:200},
  megaEther: {name:'특급 마나약',mp:160,price:280},
},

equip:{
  /* 사나가 들고 오는 작살 */
  oldHarpoon:{name:'낡은 작살',     slot:'weapon',cls:['창술사'],atk:54,price:2600},
  /* 10단계(서리) — 곶 마을 「끝물」 */
  frostSword:{name:'서리검',        slot:'weapon',cls:['검사'],atk:60,price:4400},
  frostStaff:{name:'서리 지팡이',   slot:'weapon',cls:['주술사','치유사'],mag:60,price:4400},
  frostBow:  {name:'서리궁',        slot:'weapon',cls:['궁수'],atk:60,price:4400},
  frostSpear:{name:'서리 작살',     slot:'weapon',cls:['창술사'],atk:61,price:4400},
  frostPlate:{name:'서리 갑주',     slot:'armor',def:39,price:3900},
  frostRobe: {name:'서리 로브',     slot:'armor',def:25,mag:15,price:3700},
  frostHelm: {name:'서리 투구',     slot:'head',def:20,price:2400},
  /* 11단계(별서리) — 얼음 야영지 「작살터」 */
  rimeSword: {name:'별서리검',      slot:'weapon',cls:['검사'],atk:68,price:5600},
  rimeStaff: {name:'별서리 지팡이', slot:'weapon',cls:['주술사','치유사'],mag:68,price:5600},
  rimeBow:   {name:'별서리궁',      slot:'weapon',cls:['궁수'],atk:68,price:5600},
  rimeSpear: {name:'별서리 작살',   slot:'weapon',cls:['창술사'],atk:69,price:5600},
  rimePlate: {name:'별서리 갑주',   slot:'armor',def:44,price:5000},
  rimeRobe:  {name:'별서리 로브',   slot:'armor',def:28,mag:17,price:4800},
  rimeHelm:  {name:'별서리 투구',   slot:'head',def:23,price:3000},
  /* 마물 전리품(희귀) */
  iceShell:  {name:'얼음 등딱지',   slot:'head',def:21,fx:'aoeGuard',rare:1,price:2600},
  brassFang: {name:'놋쇠 송곳니',   slot:'ring',atk:11,fx:'critUp',rare:1,price:2800},
  /* 보스·숨은 강적의 고유 장비 */
  crabGauntlet:{name:'큰 게의 집게',  slot:'hands',def:14,atk:5,fx:'guardCounter',uniq:1,price:0},
  houndCollar: {name:'대장의 목걸이', slot:'ring',atk:10,spd:6,fx:'first',uniq:1,price:0},
  galeMantle:  {name:'바람벽의 망토', slot:'armor',def:30,spd:7,fx:'evade',uniq:1,price:0},
  brassScale:  {name:'놋쇠 저울추',   slot:'ring',atk:8,mag:8,def:4,fx:'goldUp',uniq:1,price:0},
  kingFang:    {name:'왕 늑대의 송곳니',slot:'weapon',cls:['창술사'],atk:72,fx:'critUp',uniq:1,price:0},
  whaleLamp:   {name:'고래의 등불',   slot:'ring',def:8,mag:8,fx:'regen',uniq:1,price:0},
},

drops:{
  bigIceCrab:{item:'crabGauntlet',done:'s2c1done',part:4}, houndChief:{item:'houndCollar',done:'s2c5done',part:4},
  windGate:{item:'galeMantle',done:'s2c6done',part:4}, scaleCollector:{item:'brassScale',done:'s2c7done',part:4},
  kingWolf:{item:'kingFang',part:4,elite:1}, whaleSoul:{item:'whaleLamp',part:4,elite:1},
  iceCrab:{item:'iceShell',rate:0.05,pity:20}, collectorHound:{item:'brassFang',rate:0.05,pity:20},
  frostGull:{item:'megaPotion',rate:0.12}, stillSpray:{item:'megaEther',rate:0.1}, sailGhost:{item:'megaEther',rate:0.1}, snowHare:{item:'megaPotion',rate:0.12},
},

areas:{
  /* ---- 제1장 ---- */
  wsalena:{ name:'살레나 항 (겨울)', theme:'town', tiles:'harbor', bgm:'town', hud:'시즌2 1장', pal:PAL.port,
    src:TOWN.slice(), enc:null, respawn:{x:3,y:5},
    npcs:[
      {x:6,y:3,color:'#8ab8c8',name:'항만 관리',look:'harborOfficer',lines:()=> storyFlags.sanaJoined ? [
          say('항만 관리','얼음 위를 걸어온 그 아가씨, 당신들과 함께 가는 거요? …세상일 모르겠군.',NPC),
          say('항만 관리','배는 못 띄우오. 물길이 필요하면 남쪽 ▣ 으로 가시오. 저편에서 온 사도가 길을 이어 놨소.',NPC) ] : [
          say('항만 관리','석 달 전이오. 북쪽 하늘에 푸른 빛이 깜빡이기 시작하더니, 그 빛이 닿은 바다부터 저렇게 됐소.',NPC),
          say('항만 관리','차가워서 언 게 아니오. 손을 대 보면 미지근하오. 그냥 — 멈춘 거요.',NPC),
          say('항만 관리','부두 끝 등대섬이 가장 먼저 멈췄소. 등대지기가 아직 그 안에 있소. 살아 있는지도 모르겠소.',NPC) ]},
      {x:10,y:3,color:'#c8a070',name:'늙은 어부',look:'oldFisher',lines:[
        say('늙은 어부','그물을 던졌더니 그물이 허공에 걸렸어. 던진 모양 그대로. 사십 년 고기 잡으면서 처음 보는 일이야.',NPC),
        say('늙은 어부','이상한 건, 그 안에 든 고기가 썩질 않아. 석 달째 그대로야. 좋은 건지 나쁜 건지.',NPC) ]},
      {x:12,y:7,color:'#d8c0a0',name:'살레나 상인',look:'salenaTrader',lines:[
        say('살레나 상인','배가 못 뜨니 장사가 말이 아니에요. 등대가 켜지고 한 해, 이제 좀 살 만했는데.',NPC),
        say('살레나 상인','그래도 밤에 저편 등대 셋이 보이면 마음이 놓여요. 넷째 것만 빼면요.',NPC) ]},
      {x:3,y:7,color:'#f0c27a',name:'상인',look:'merchant',glyph:'◇',shop:['hiPotion','hiEther','megaPotion','megaEther','revive','mornSword','mornStaff','mornBow','mornPlate','mornRobe','mornHelm','powerSeed','wisdomSeed','guardSeed','lifeSeed']} ],
    warps:[ {x:14,y:5,to:'frozenpier',tx:30,ty:5,label:'부두'},
            {x:8,y:9,to:'oathcourt2',tx:8,ty:8,label:'물길',need:'sanaJoined',block:'남쪽 물길은 저편으로 이어진다. 먼저 부두 끝 등대섬에서 푸른 빛이 닿은 자리를 확인하자.'} ] },

  frozenpier:{ name:'얼어붙은 부두', theme:'temple', tiles:'dock', bgm:'field', hud:'시즌2 1장', pal:PAL.pier, trapMsg:ICE_TRAP,
    src:[ "111111111111111111111111111111111","112222221100022111222221110000001","100002220007022200000222000000001",
          "100002220000022200000222000000001","100002221222222210000222100000001","100002251122222111000221110000001",
          "111111111110011111111111111111111","112222211100022112222222122222211","100002220000022200000222000002221",
          "100002220000022200000222000002221","100002221222222210000222100002221","110002251122222211000222110002221",
          "111111111110011111111111111001111","122222221220000011000001112222211","122000000220000010000000022700001",
          "122000000220000010006000022000001","122000001222222210000000122000001","122000051222222210000000122000011",
          "111111111111111111111111111111111" ], rev:2,
    loot:{'7,11':{gold:700,item:'megaPotion'},'7,17':{gold:600,item:'megaEther'}},
    enc:{ pool:['frostGull','iceCrab','stillSpray'], rate:0.2, pow:1.0, hpw:1.1 }, respawn:{x:30,y:5},
    npcs:[], warps:[ {x:31,y:5,to:'wsalena',tx:13,ty:5,label:'항구'},
            {x:23,y:17,to:'stilllight',tx:6,ty:11,label:'등대섬',event:'ev_s2_crab',eventFlag:'s2c1done'},
            {x:17,y:17,to:'capehome',tx:2,ty:5,label:'곶',need:'lordTold',block:'북쪽 곶으로 가는 얼음길이다. 그 전에 군주에게 알려야 한다 — 살레나 항 남쪽 ▣ 물길로.'} ],
    eventTile:'ev_s2_crab', eventDone:'s2c1done', onEnter:'ev_s2_pier_enter' },

  /* ---- 제2~3장 ---- */
  stilllight:{ name:'멈춘 등대섬', theme:'temple', tiles:'tower', bgm:'dungeon', hud:'시즌2 2장', pal:PAL.light,
    src:[ "111111111111111111111111111111111","122000051000022211222221112222221","122000000000022200000222000072221",
          "122000000000022200000222000002221","122222221222222210000222100002221","152222281122222111000222100002221",
          "111111111110011111111111111001111","110000011100022111000000122000001","100000001000022210000000122070001",
          "100000001000022210006000922000001","100000001222222210000000122203221","110000001222222211000001122222221",
          "111001111110011111111111111111111","110002221122222112222221100002251","100002220000722200000222000002221",
          "100002220000022200000222000002221","122222221000022210000222122222221","122222211100022211000222152222281",
          "111111111111111111111111111111111" ], rev:2,
    loot:{'31,13':{gold:800,item:'megaEther'},'7,1':{gold:700,item:'revive'}},
    enc:{ pool:['frostBat','lightShade','iceCrab'], rate:0.22, pow:1.0, hpw:1.12 }, respawn:{x:28,y:10},
    npcs:[], warps:[ {x:7,y:11,to:'frozenpier',tx:22,ty:17,label:'부두'} ],
    eventTile:'ev_s2_sana', eventDone:'sanaJoined', onEnter:'ev_s2_light_enter' },

  /* ---- 제4장 ---- */
  oathcourt2:{ name:'약속의 뜰', theme:'town', tiles:'town', bgm:'town', hud:'시즌2 4장', pal:PAL.court,
    src:TOWN.slice(), enc:null, respawn:{x:8,y:7},
    npcs:[
      {x:8,y:3,color:LORD,name:'그림자 군주',look:'lordNpc',lines:()=> storyFlags.s2c7done ? [
          say('그림자 군주','재상이라. 삼백 해를 곁에서 섬긴 자가 가장 깊이 속이는 법이다. …내가 할 말은 아니다만.',LORD) ] : [
          say('그림자 군주','등대는 끄지 않는다. 다만 — 가서 보고 오너라. 내 백성이 얼굴을 되찾은 값을, 다른 누가 치르고 있다면 나도 알아야 한다.',LORD),
          say('그림자 군주','현자의 아이야. 네 선조와 내가 한 셈을, 너희는 되풀이하지 마라.',LORD) ]},
      {x:11,y:3,color:'#70b0c0',name:'조수의 사도',look:'tideApostle',lines:[
        say('조수의 사도','살레나로 가는 물길은 내가 이어 놨어. 밀물이 있으면 썰물이 있어야지.',LORD),
        say('조수의 사도','북쪽 바다는 나도 못 건너. 물이 흐르질 않거든. 멈춘 물은 내 말을 안 들어.',LORD) ]},
      {x:5,y:7,color:'#8a88a4',name:'뜰지기',look:'shadeWarden',lines:[
        say('뜰지기','뜰이 밝아졌소. 한 해 전에는 내 손도 안 보였는데, 이제는 손금이 보이오.',NPC),
        say('뜰지기','그러니 그 불을 끄라는 말은 — 미안하오, 듣기만 해도 손이 떨리오.',NPC) ]} ],
    warps:[ {x:8,y:9,to:'wsalena',tx:8,ty:8,label:'물길'} ],
    onEnter:'ev_s2_court_enter' },

  /* ---- 제5장 ---- */
  capehome:{ name:'곶 마을 「끝물」', theme:'town', tiles:'abbey', bgm:'town', hud:'시즌2 5장', pal:PAL.cape,
    src:TOWN.slice(), enc:null, respawn:{x:3,y:5},
    npcs:[
      {x:6,y:3,color:'#a8845c',name:'곶지기',look:'elder',lines:()=> storyFlags.s2c5done ? [
          say('곶지기','선단을 넘었다고? 사십 해 전 아버지가 탄 배가 거기 있소. …멀쩡하던가. 그렇겠지. 멈췄으니.',NPC) ] : [
          say('곶지기','여기가 물의 끝이오. 이 너머는 전부 얼음이지. 아니, 얼음도 아니오. 멈춘 바다요.',NPC),
          say('곶지기','옛날부터 그랬소. 다만 그 끝이 해마다 한 뼘씩 이쪽으로 왔는데, 올해는 석 달 만에 항구까지 갔지.',NPC),
          say('곶지기','바다 한가운데 배들이 서 있소. 「멈춘 선단」이라 부르오. 그 너머로 간 사람은 — 저 아가씨가 처음 돌아온 사람이오.',NPC) ]},
      {x:10,y:3,color:'#b7a98f',name:'마을 사람',look:'villager',lines:[
        say('마을 사람','얼음 위를 걸을 땐 색을 봐요. 흰 데는 단단하고, 푸르스름한 데는 얇아요. 빠지면 뼛속까지 시려요.',NPC),
        say('마을 사람','사나가 그랬어요. 저 너머에선 아무도 안 늙는다고. 부러워했더니 화를 내더라고요.',NPC) ]},
      {x:3,y:7,color:'#f0c27a',name:'곶의 상인',look:'armsDealer',glyph:'◇',shop:['megaPotion','megaEther','revive','frostSword','frostStaff','frostBow','frostSpear','frostPlate','frostRobe','frostHelm','powerSeed','wisdomSeed','guardSeed','lifeSeed']} ],
    warps:[ {x:1,y:5,to:'frozenpier',tx:18,ty:17,label:'부두'},
            {x:14,y:5,to:'icesea1',tx:6,ty:5,label:'얼음 바다'} ],
    onEnter:'ev_s2_cape_enter' },

  icesea1:{ name:'얼음 바다 · 첫째 날', theme:'ash', tiles:'snow', bgm:'field', hud:'시즌2 5장', pal:PAL.sea, trapMsg:ICE_TRAP,
    src:[ "11111111111111111111111111111111111111111","11000000112222251100022112200000100000011","10000000122000000000022202200000100000001",
          "10000000122000000000022202200000100000001","10000000122000001222222212222222100000001","10000000152000001222222111222222100000001",
          "11100111111111111111111111100111111001111","12222221122000001100022211222222112000001","12200000022000001000722202270000122000001",
          "12200000022000001000022202200000122000001","12200000122222221222222212200000122222221","12200000152222251222222111200000122222221",
          "11100111111111111110011111100111111001111","11200001112222221120000111222221112222211","12200000022000000220000010000222000072221",
          "12207000022000000220000010000222000002221","12222222122000001222222210000222100002221","11222221112000011222222111000221110002221",
          "11111111111111111111111111111111111111111" ], rev:2,
    loot:{'9,11':{gold:900,item:'megaPotion'},'15,1':{gold:800,item:'megaEther'}},
    enc:{ pool:['iceWolf','snowHare','frostGull'], rate:0.2, pow:1.0, hpw:1.1 }, respawn:{x:6,y:5},
    npcs:[], warps:[ {x:7,y:5,to:'capehome',tx:13,ty:5,label:'곶'},
            {x:39,y:5,to:'stillfleet',tx:30,ty:5,label:'선단'} ],
    onEnter:'ev_s2_sea1_enter' },

  stillfleet:{ name:'멈춘 선단', theme:'temple', tiles:'dock', bgm:'dungeon', hud:'시즌2 5장', pal:PAL.fleet,
    src:[ "111111111111111111111111111111111","122222221100022111200000100000011","122000000000022212200000000000001",
          "122000000000022212200000000000001","122000001222222212222222100000001","112000011222222111222221100000001",
          "111001111110011111100111111111111","110002211122222111222222100002221","100072221220000000000222000002221",
          "100002221220700000000222000002221","122203221220000010000222122222221","122222211120000010000222112222211",
          "111191111110011111100111111001111","110000011220000111222221122222211","100000001220000012200000100002221",
          "100060001220000012200000100002221","100000001222222212200000100002221","110000001522222815200008150002251",
          "111111111111111111111111111111111" ], rev:2,
    loot:{'17,17':{gold:1000,item:'megaEther'},'25,17':{gold:900,item:'revive'}},
    enc:{ pool:['frostHusk','sailGhost','collectorHound'], rate:0.22, pow:1.0, hpw:1.12 }, respawn:{x:4,y:10},
    npcs:[], warps:[ {x:31,y:5,to:'icesea1',tx:38,ty:5,label:'얼음 바다'},
            {x:7,y:17,to:'harpooncamp',tx:2,ty:5,label:'야영지',event:'ev_s2_hound',eventFlag:'s2c5done'} ],
    eventTile:'ev_s2_hound', eventDone:'s2c5done', onEnter:'ev_s2_fleet_enter' },

  /* ---- 제6장 ---- */
  harpooncamp:{ name:'얼음 야영지 「작살터」', theme:'town', tiles:'abbey', bgm:'town', hud:'시즌2 6장', pal:PAL.camp,
    src:TOWN.slice(), enc:null, respawn:{x:3,y:5},
    npcs:[
      {x:6,y:3,color:'#a8845c',name:'늙은 작살잡이',look:'iceFisher',lines:()=> storyFlags.s2c6done ? [
          say('늙은 작살잡이','바람벽을 뚫었구나. 사나, 네 아비도 못 한 일이다.',NPC),
          say('늙은 작살잡이','관문에는 재상님의 수집관이 계신다. …「계신다」고 해야 하는지, 이제 나도 모르겠다만.',NPC) ] : [
          say('늙은 작살잡이','사나. 돌아왔구나. 끄러 간 불을 든 사람들을 데리고.',NPC),
          say('늙은 작살잡이','탓하는 게 아니다. 네 눈을 보니 뭔가 본 모양이지. 선단에서.',NPC),
          say('늙은 작살잡이','우리는 멈춘 땅의 끝자락에 산다. 별빛이 옅어서 조금씩은 늙지. 그래서 재상님은 우리를 「새는 그릇」이라 부르신다.',NPC) ]},
      {x:10,y:3,color:'#9ab0c4',name:'얼음낚시꾼',look:'oldFisher',lines:[
        say('얼음낚시꾼','이 앞은 눈보라가 한 번도 그친 적이 없어. 지도 같은 건 소용없지. 한 치 앞이 안 보이니까.',NPC),
        say('얼음낚시꾼','눈보라 속에 고래 무덤이 있어. 큰 고래가 멈춰서 뼈만 남은 곳. 그 안에 딱 하나, 안 멈춘 게 있다더라.',NPC) ]},
      {x:12,y:7,color:'#e0b890',name:'작살터 아이',look:'cityChild',child:true,lines:[
        say('작살터 아이','사나 언니 동생은 저 건너 첫서리 마을에 있어. 나랑 동갑이었는데, 난 컸고 걔는 그대로야.',NPC),
        say('작살터 아이','근데 요새 걔가 풀린대. 풀리면… 한꺼번에 늙는 거래. 삼백 해 치를.',NPC) ]},
      {x:3,y:7,color:'#f0c27a',name:'작살터 상인',look:'armsDealer',glyph:'◇',shop:['megaPotion','megaEther','revive','rimeSword','rimeStaff','rimeBow','rimeSpear','rimePlate','rimeRobe','rimeHelm','powerSeed','wisdomSeed','guardSeed','lifeSeed']} ],
    warps:[ {x:1,y:5,to:'stillfleet',tx:6,ty:17,label:'선단'},
            {x:14,y:5,to:'icesea2',tx:6,ty:5,label:'눈보라'} ],
    onEnter:'ev_s2_camp_enter' },

  icesea2:{ name:'얼음 바다 · 깊은 곳', theme:'ash', tiles:'snow', bgm:'field', hud:'시즌2 6장', pal:PAL.storm, trapMsg:ICE_TRAP, noMap:'눈보라 — 지도가 보이지 않는다',
    src:[ "11111111111111111111111111111111111111111","11000000100002221100022212200000122222211","10000000100002220000022202200000022000001",
          "10000000100002220007022202200000022070001","10000000122222221222222212222222122000001","10000000122222211222222212222222122000011",
          "11100111111001111111111111111111111001111","11222221112000001000022112222222122222221","12200000022700001000022202200000022000001",
          "12200000022000001000022202200000022000001","12200000122222221222222212200000122000001","11200000112222221522222512200001112000001",
          "11100111111001111111111111111111111001111","12222222122222211000000012222221122222221","10000222122000001000000000000222000002221",
          "10000222122000001000000000000222000002221","10000222122000001000000010000222100002221","15000200122000051000000011000222100002211",
          "11111111111111111111111111111111111111111" ], rev:2,
    loot:{'1,17':{gold:1100,item:'megaPotion'},'17,11':{gold:1000,item:'megaEther'}},
    enc:{ pool:['iceWolf','blizzardWisp','underIce'], rate:0.2, pow:1.0, hpw:1.1 }, respawn:{x:6,y:5},
    npcs:[], warps:[ {x:7,y:5,to:'harpooncamp',tx:13,ty:5,label:'야영지'},
            {x:7,y:17,to:'whalegrave',tx:14,ty:5,label:'고래 무덤'},
            {x:23,y:17,to:'windwall',tx:6,ty:5,label:'바람벽'} ],
    onEnter:'ev_s2_sea2_enter' },

  whalegrave:{ name:'고래 무덤', theme:'temple', tiles:'crypt', bgm:'dungeon', hud:'시즌2 6장', pal:PAL.whale,
    src:[ "111111111111111111111111111111111","122222221100000012200000112222251","100002220000000012200000022000001",
          "100002220000000012200000022000001","100002221000000012222222122000001","100002211000000012222221152000051",
          "111001111111111111100111111111111","100002211000022112222222112000011","100002220000022202200000022000001",
          "100002220000022202270000022000001","122222221222222212200000122222221","112222221222222111200000112222211",
          "111111111111111111100111111001111","110000001120000012222221110002251","100000000220000002200000100002221",
          "100000000220700002200000100002221","100000001222222212200000122222221","100000011122222211200000152222201",
          "111111111111111111111111111111111" ], rev:2,
    loot:{'31,13':{item:'lifeSeed'},'31,1':{gold:1400,item:'megaEther'}},
    enc:{ pool:['boneCrab','underIce','boneWarden'], rate:0.22, pow:1.0, hpw:1.12 }, respawn:{x:14,y:5},
    npcs:[], warps:[ {x:15,y:5,to:'icesea2',tx:6,ty:17,label:'눈보라'} ],
    onEnter:'ev_s2_whale_enter' },

  windwall:{ name:'바람벽', theme:'ash', tiles:'snow', bgm:'dungeon', hud:'시즌2 6장', pal:PAL.storm, noMap:'눈보라 — 지도가 보이지 않는다',
    src:[ "111111111111111111111111111111111","110000011220000012222222122222221","100000001220000002200000022000001",
          "100000001220000002207000022000001","100000001222222212200000122000001","110000001222222211200000152000081",
          "111001111111911111100111111111111","122222211100000110000221112000011","100002221000000010070222022000001",
          "100002221000600010000222022000001","100002221000000012222222122222221","110002221000000012222222152222281",
          "111001111111111111100111111111111","112000011122222111200000112222251","122000000220000002200000000002221",
          "122000000220000002207000000002221","122222221220000012222222100002221","112222221120000112222222150002281",
          "111111111111111111111111111111111" ], rev:2,
    loot:{'25,11':{gold:1200,item:'megaPotion'},'31,13':{gold:1100,item:'revive'}},
    enc:{ pool:['blizzardWisp','windSwift','frostGiant'], rate:0.22, pow:1.0, hpw:1.12 }, respawn:{x:6,y:5},
    npcs:[], warps:[ {x:7,y:5,to:'icesea2',tx:22,ty:17,label:'얼음 바다'},
            {x:15,y:11,to:'seagate',tx:14,ty:11,label:'관문',event:'ev_s2_wind',eventFlag:'s2c6done'} ],
    eventTile:'ev_s2_wind', eventDone:'s2c6done', onEnter:'ev_s2_wind_enter' },

  /* ---- 제7장 ---- */
  seagate:{ name:'바다 끝 관문', theme:'temple', tiles:'keep', bgm:'dungeon', hud:'시즌2 7장', pal:PAL.gate,
    src:[ "111111111111111111111111111111111","100002221100022211222222110002221","100002220000022212200000000002221",
          "100002220000022212200000000002221","122222221222222212200000122222221","122222221222222112200000152222251",
          "111001111110011111100111111111111","122222211100000012200001112000011","122700001000000012200000022000001",
          "122000001000000012200000022000001","122000001000000012222222122222221","112000001100000011222222122222211",
          "111001111111111111100111111001111","122222211100022211200001122000001","100002220007022202200000122000001",
          "100002220000022202200000122700001","100002221222222212222222122203221","100002211222222112222222112222211",
          "111001111111111111100111111191111","112000001120000512222225110000001","122000000220000012200000100000001",
          "122000000220000012200000100060001","122222221222222212200000100000001","112222221522222815200008110000001",
          "111111111111111111111111111111111" ], rev:2,
    loot:{'25,5':{gold:1400,item:'megaEther'},'15,19':{gold:1300,item:'revive'},'23,19':{item:'powerSeed'}},
    enc:{ pool:['collectorHound','collectorHand','reapLantern'], rate:0.22, pow:0.9, hpw:1.12 }, respawn:{x:28,y:16},
    npcs:[], warps:[ {x:15,y:11,to:'windwall',tx:14,ty:11,label:'바람벽'},
            {x:31,y:23,to:'stillshore',tx:2,ty:5,label:'기슭',event:'ev_s2_scale',eventFlag:'s2c7done'} ],
    eventTile:'ev_s2_scale', eventDone:'s2c7done', onEnter:'ev_s2_gate_enter' },

  stillshore:{ name:'멈춘 땅의 기슭', theme:'ash', tiles:'snow', bgm:'field', hud:'시즌2 7장', pal:PAL.shore,
    src:[ "1111111111111111","1000000000000001","1000000000000001","1000000000000001","1000000000000001","1000000000000001",
          "1000000000000001","1000000000000001","1000000000000001","1000000000000001","1111111111111111" ],
    enc:null, respawn:{x:2,y:5},
    npcs:[
      {x:9,y:4,color:'#9fb4c8',name:'멈춘 사람',look:'stillFolk',lines:[
        "걸어가다 멈춘 사람. 한 발이 앞에 나가 있고, 손은 누군가를 부르다 만 모양이다. 눈은 뜨고 있다.",
        "숨은 쉬지 않는다. 그런데 차갑지도 않다. 삼백 해 전 어느 저녁의 한 걸음이, 여기 그대로 서 있다." ]} ],
    warps:[ {x:1,y:5,to:'seagate',tx:30,ty:23,label:'관문'} ],
    onEnter:'ev_s2_end' },
},

starts:{
  /* 시즌 1을 끝낸 기록 없이 시즌 2부터 시작할 때의 일행: 2차 전직까지 마친 레벨 32. 장비는 ev_p4_start 가 가진 것 중 가장 좋은 것으로 채운다 */
  4:()=>{ const road={ '테리':'guardian', '카엘':'archsage', '미아':'highpriest', '코르':'sniper' };
    party=['테리','카엘','미아','코르'].map(n=>{ const p=MK[n](); while(p.lv<24) levelUp(p); changeJob(p,road[n]); while(p.lv<30) levelUp(p); advanceJob(p,inheritFor(p.job)[0]); while(p.lv<32) levelUp(p); p.hp=p.maxhp; p.mp=p.maxmp; return p; });
    gold=6000; inventory={hiPotion:8,hiEther:6,megaPotion:3,revive:4, mornSword:1,mornStaff:2,mornBow:1,mornPlate:2,mornRobe:2,mornHelm:4,runeGauntlet:2,stormBoots:2,heroRing:2,archRing:1,aegisRing:1}; sealsFixed=0; bossStage=3;
    storyFlags={introDone:true,part1Clear:true,part2Clear:true,part3Clear:true,s2Started:true,s2Fresh:true,p3Started:true,p3Keeper:'lord',p3Child:'share',p3Truth:'tell',ch22done:true}; },
},

events:{
  /* ================= 제1장 「얼어붙은 항구」 ================= */
  ev_p4_start:()=>{ const F=storyFlags; F.p4Started=true; F.s2Started=true;
    if(F.s2Fresh){ F.s2Fresh=false; party.forEach(p=>equipBest(p)); menuNoteT=0; } // 미리 갖춘 일행으로 시작했을 때만: 가진 것 중 가장 좋은 장비를 채운다
    loadArea('wsalena',3,5,'right');
    showMsg([
      "— 시즌 2 「떨어진 빛들」 · 제1부 「답하는 빛」 —",
      "봉인이 등대가 된 지 한 해. 밤이면 저편 하늘에 등대 셋이 숨 쉬듯 깜빡인다.",
      "그리고 석 달 전부터 — 북쪽 하늘 끝에서, 넷째 빛이 함께 깜빡이기 시작했다. 차갑고 푸른 빛이.",
      "살레나 항. 항만 관리의 급한 편지를 받고, 일행은 한 해 만에 다시 항구에 섰다.",
      say('코르','…바다가 왜 저래.',C),
      "앞바다가 얼어 있다. 물결이 솟다 만 모양 그대로. 갈매기 한 마리가 날개를 편 채 허공에 멈춰 있다.",
      say('카엘','얼음이 아니야. 차가워서 언 게 아니라 — 멈춘 거야. 저 푸른 빛이 닿은 데만.',K),
      say('미아','항구 사람들은요? 다친 사람은 없대요?',M),
      say('테리','물어보자. 그리고 부두 끝까지 가 봐야겠어.',T),
      "— 제1장 「얼어붙은 항구」 —",
      "항구 사람들과 이야기하고, 동쪽 ▣ 얼어붙은 부두로 나가 보자. 상인 ◇ 과 제단 ✦ 도 있다." ], ()=>{ saveGame(); }); },

  ev_s2_pier_enter:()=>{ if(storyFlags.s2PierIn) return; storyFlags.s2PierIn=true;
    showMsg([
      "얼어붙은 부두 — 파도가 부두를 넘다 말고 서 있다. 그 사이로 걸을 수 있다. 물보라 한 알 한 알이 허공에 박혀 있다.",
      say('미아','만져도 돼요? …정말이네요. 미지근해요.',M),
      say('카엘','봉인하고는 달라. 봉인은 가두는 거였어. 이건 가두지도 않아. 그냥 다음 순간으로 못 넘어가게 붙잡고 있어.',K),
      say('코르','멈춘 것 중에 움직이는 게 있어. 저건 뭐야.',C),
      "푸르스름한 얼음(▲)은 얇다 — 밟으면 꺼진다. 부두 끝 ▣ 이 등대섬으로 가는 길이다." ]); },

  ev_s2_crab:()=>{ if(storyFlags.s2c1done) return;
    showMsg([
      "부두 끝. 등대섬으로 건너가는 다리 앞에, 집채만 한 것이 웅크리고 있다.",
      "얼음 게다. 한쪽 집게에 얼어붙은 닻을 쥐고, 등딱지에는 부서진 부두 조각이 박혀 있다.",
      say('코르','멈춘 바다에서 저 혼자 안 멈췄네. 운이 좋은 건지 나쁜 건지.',C),
      say('테리','비켜 줄 것 같지는 않다. 간다!',T) ],
      ()=>{ startBattle(['bigIceCrab','stillSpray'],true,{onWin:'ev_s2_crab_win'}); }); },
  ev_s2_crab_win:()=>{ storyFlags.s2c1done=true;
    showMsg([
      "큰 얼음 게가 뒤집힌다. 쥐고 있던 닻이 얼음 위에 떨어져 — 떨어지다 만 채로 허공에 멈춘다.",
      say('카엘','봤어? 방금 그 닻. 푸른 빛이 지금도 닿고 있어. 저 등대섬 쪽에서.',K),
      say('미아','등대지기님이 아직 안에 계시다고 했어요. 서둘러요.',M),
      "— 제1장 완료 —",
      "다리 건너 ▣ 멈춘 등대섬으로 들어가자." ], ()=>{ saveGame(); }); },

  /* ================= 제2장 「멈춘 등대섬」 · 제3장 「작살을 든 사람」 ================= */
  ev_s2_light_enter:()=>{ if(storyFlags.s2LightIn) return; storyFlags.s2LightIn=true;
    showMsg([
      "— 제2장 「멈춘 등대섬」 —",
      "멈춘 등대섬 — 등대의 불이 켜진 채 멈춰 있다. 빛줄기가 돌다 만 자리에 그대로 걸려 있다.",
      say('카엘','옛 장치(○)가 둘 있어. 둘 다 눌러야 등실로 가는 문(▦)이 열릴 거야.',K),
      say('코르','누가 먼저 와 있어. 발자국이 있어 — 얼음 위에. 바다 쪽에서 걸어온 발자국이야.',C) ]); },

  ev_s2_sana:()=>{ if(storyFlags.sanaJoined) return;
    showMsg([
      "등실. 등대지기 노인이 등불에 손을 뻗은 채 멈춰 있다. 그 앞에 — 누가 서 있다.",
      "털 두건을 뒤로 젖힌 젊은 여자. 제 키보다 긴 작살을 들고, 등 뒤로 굵게 땋은 머리가 늘어져 있다.",
      say('???','너희구나. 저 빛을 켠 사람들.',SANA),
      say('테리','넌 누구야. 이 사람을 이렇게 만든 게 너야?',T),
      say('???','이 사람은 멈췄을 뿐이야. 멈춘 건 죽은 게 아니야. 내가 사는 땅은 삼백 해째 전부 이래.',SANA),
      say('???','죽는 건 — 풀릴 때야. 너희 빛이 닿은 뒤로, 내 땅 사람들이 풀리고 있어. 한꺼번에 삼백 해를 늙으면서.',SANA),
      say('미아','저희 빛이… 사람을요?',M),
      say('???','사나. 얼음 바다의 작살잡이. 석 달을 걸어서 왔어. 부탁하러 온 게 아니야.',SANA),
      say('사나','등대를 꺼. 셋 다. 안 끄겠다면 — 끄게 만들 거야.',SANA) ],
      ()=>{ startBattle(['sanaFoe'],true,{onWin:'ev_s2_sana_win'}); }); },
  ev_s2_sana_win:()=>{ const F=storyFlags; F.s2c2done=true; joinMember('사나'); F.sanaJoined=true;
    showMsg([
      "작살이 얼음 바닥에 꽂힌다. 사나는 한쪽 무릎을 꿇고도 창대를 놓지 않는다.",
      say('사나','…더 해. 아직 설 수 있어.',SANA),
      say('테리','그만하자. 넌 우릴 죽이러 온 게 아니잖아. 급소는 한 번도 안 노렸어.',T),
      say('사나','…고래는 죽이려고 쫓는 게 아니야. 지칠 때까지 쫓는 거지.',SANA),
      say('카엘','사나. 등대를 끄면 저편 사람들이 다시 얼굴을 잃어. 삼백 해 동안 그랬던 것처럼.',K),
      say('사나','알아. 재상님 포고에 다 적혀 있었어. 「저편의 빛이 우리를 죽인다. 꺼뜨려라.」 그러니까 고르라는 거잖아. 너희 사람이냐, 우리 사람이냐.',SANA),
      say('카엘','그 셈은 한 번 틀린 적이 있어. 우리 선조가 보지도 않고 했거든.',K),
      say('카엘','그러니까 이번엔 가서 볼게. 네 땅을. 풀린다는 게 뭔지. 정말 우리 빛 때문인지.',K),
      say('사나','…가서 본다고. 얼음 바다를 건너서? 거긴 내 동생이 있는 데야. 구경하러 가는 데가 아니야.',SANA),
      say('미아','구경이 아니에요. 동생분을 저희가 고칠 수 있을지도 몰라요. 못 고치면 — 그때 다시 작살을 드세요.',M),
      "사나는 한참 말이 없다. 그러다 작살을 뽑아 어깨에 멘다.",
      say('사나','길은 내가 알아. 나 없이는 선단도 못 넘어. …따라와. 대신 눈 똑바로 뜨고 봐.',SANA),
      "— 제2장 완료 —",
      "사나가 일행에 들어왔다! 창술사 — 기본 공격이 옆의 적도 함께 찌른다. 이제 다섯이 함께 싸운다.",
      "— 제3장 「작살을 든 사람」 —",
      say('테리','떠나기 전에 군주한테 알려야 해. 저편의 등대 얘기니까.',T),
      "살레나 항 남쪽 ▣ 물길이 약속의 뜰로 이어진다." ], ()=>{ party.forEach(p=>{ p.alive=true; p.hp=p.maxhp; p.mp=p.maxmp; }); saveGame(); }); },

  /* ================= 제4장 「끄지 않는 불」 ================= */
  ev_s2_court_enter:()=>{ const F=storyFlags; if(F.lordTold) return; F.lordTold=true; F.s2c3done=true;
    const turns=F.p3Keeper==='turns';
    showMsg([
      "— 제4장 「끄지 않는 불」 —",
      "약속의 뜰. 한 해 전보다 밝다. 돌바닥의 그릇 문양 세 개에, 이제는 빛이 고여 있다.",
      turns ? say('그림자 군주','올해는 내 차례인데 너희가 먼저 왔구나. 좋은 소식은 아니겠지.',LORD)
            : say('그림자 군주','근원은 잘 흐른다. 그런데 너희 얼굴은 그렇지 않구나.',LORD),
      say('카엘','북쪽에 떨어진 빛이 하나 더 있어요. 그 땅 사람들이, 우리 등대 때문에 죽어 간대요.',K),
      "사나가 앞으로 나선다. 군주를 똑바로 본다.",
      say('사나','당신이 저 불의 주인이야? 그럼 당신한테 말할게. 꺼 줘.',SANA),
      say('그림자 군주','…삼백 해 전의 나를 보는 것 같구나. 나도 그렇게 말했다. 현자의 집 문 앞에서.',LORD),
      say('그림자 군주','답은 같다, 작살잡이. 끄지 않는다. 내 백성은 한 해 전에야 제 손금을 보았다.',LORD),
      say('사나','그럼 내 동생은.',SANA),
      say('그림자 군주','그래서 묻는다. 정말 이 불 때문이냐. 너는 그것을 네 눈으로 보았느냐, 아니면 누가 그렇다고 일러 주었느냐.',LORD),
      say('사나','…재상님의 포고에.',SANA),
      say('그림자 군주','나는 삼백 해 동안 「저편이 우리 빛을 훔쳤다」는 말만 듣고 살았다. 절반은 맞았고, 절반은 내가 듣고 싶은 말이었다.',LORD),
      say('그림자 군주','가서 보아라. 이 아이들과 함께. 정말 이 불 때문이라면 — 그때는 내가 직접 그 땅에 가서 값을 묻겠다.',LORD),
      say('코르','끄겠다는 말은 끝까지 안 하네.',C),
      say('그림자 군주','끄겠다고 하면 거짓이니까. 거짓 약속은 삼백 해 전에 다 썼다.',LORD),
      "— 제4장 완료 —",
      "살레나 항으로 돌아가, 얼어붙은 부두 끝 ▣ 북쪽 곶으로 가자." ], ()=>{ saveGame(); }); },

  /* ================= 제5장 「멈춘 선단」 ================= */
  ev_s2_cape_enter:()=>{ if(storyFlags.s2CapeIn) return; storyFlags.s2CapeIn=true;
    showMsg([
      "— 제5장 「멈춘 선단」 —",
      "곶 마을 「끝물」 — 땅이 끝나는 곳의 작은 마을. 집마다 문 앞에 작살과 얼음 톱이 기대어 있다.",
      say('사나','여기가 물의 끝이야. 이 너머는 걸어서 가. 배는 소용없어.',SANA),
      say('사나','채비해. 선단까지 하루, 선단 넘어 야영지까지 또 하루야. 중간에 쉴 데는 없어.',SANA),
      "곶의 상인 ◇ 이 서리 무구와 창을 판다. 제단 ✦ 도 있다. 동쪽 ▣ 으로 얼음 바다에 나선다." ], ()=>{ saveGame(); }); },

  ev_s2_sea1_enter:()=>{ if(storyFlags.s2Sea1In) return; storyFlags.s2Sea1In=true;
    showMsg([
      "얼음 바다 — 끝이 보이지 않는 흰 벌판. 파도의 골과 마루가 그대로 굳어 언덕이 되었다.",
      say('사나','흰 데만 밟아. 푸르스름한 데(▲)는 얇아. 빠지면 내가 건져 줄 테니까 비명은 지르지 마. 늑대가 와.',SANA),
      say('코르','그 말, 빠지기 전에 해 줘서 고맙네.',C) ]); },

  ev_s2_fleet_enter:()=>{ if(storyFlags.s2FleetIn) return; storyFlags.s2FleetIn=true;
    showMsg([
      "멈춘 선단 — 배 수십 척이 바다 한가운데 서 있다. 돛은 바람을 받은 모양 그대로 부풀어 있고, 뱃머리는 파도를 가르다 멈췄다.",
      "갑판에는 사람들이 있다. 밧줄을 당기다, 키를 잡다, 뭍을 가리키다 — 멈춘 채로.",
      say('미아','이분들… 다 살아 계신 거예요?',M),
      say('사나','멈춘 거야. 사십 해 전 배도 있고 이백 해 전 배도 있어. 여기서는 갑판에서 갑판으로 건너가야 해.',SANA),
      "그때 — 저 앞 갑판에서 무언가 움직인다. 검은 옷에 놋쇠 가면. 멈춘 선원의 가슴께에 등롱을 대고 있다.",
      "등롱 안에 푸른 것이 조금 고인다. 가면 쓴 자는 등롱을 닫고, 사냥개를 끌고 다음 사람에게 간다.",
      say('코르','저게 뭘 하는 거야.',C),
      say('사나','…수집관의 일꾼들. 풀리지 않게 돌보는 거라고 — 배웠어.',SANA),
      say('카엘','돌보는 사람이 뭘 빼 가? 방금 저 등롱에 뭔가 담겼어.',K),
      say('사나','…몰라. 가까이서 본 건 나도 처음이야.',SANA),
      "옛 장치(○) 둘을 눌러야 가장 큰 배로 건너가는 문(▦)이 열린다." ]); },

  ev_s2_hound:()=>{ if(storyFlags.s2c5done) return;
    showMsg([
      "가장 큰 배의 갑판. 일꾼들은 사라지고, 사냥개 한 마리만 남아 길을 막는다.",
      "보통 사냥개의 세 배는 된다. 놋쇠 목걸이에 등롱 셋이 매달려 있고, 등에는 자루가 주렁주렁 묶여 있다.",
      say('사나','대장 개야. 저게 있으면 수집관이 가까이 있다는 뜻인데.',SANA),
      say('테리','우릴 본 걸 알리러 가기 전에 잡아야 해!',T) ],
      ()=>{ startBattle(['houndChief','collectorHound','collectorHound'],true,{onWin:'ev_s2_hound_win'}); }); },
  ev_s2_hound_win:()=>{ storyFlags.s2c5done=true;
    showMsg([
      "대장 개가 쓰러지며 목걸이의 등롱 하나가 깨진다. 푸른 것이 흘러나와 — 가장 가까운 선원에게로 스며든다.",
      "멈춰 있던 선원의 손가락이, 아주 조금 움직인다. 그리고 다시 멈춘다.",
      say('미아','돌아갔어요. 빼 갔던 게, 주인한테로.',M),
      say('사나','…………',SANA),
      say('사나','돌보는 거라면 왜 돌려주면 움직이지. 왜 숨어서 하지. 왜 개를 끌고 다니지.',SANA),
      say('카엘','사나. 포고를 쓴 재상이 누구라고 했지?',K),
      say('사나','칼릭 님. …가자. 야영지가 가까워. 물어볼 사람이 있어.',SANA),
      "— 제5장 완료 —",
      "선단 너머 ▣ 얼음 야영지 「작살터」로 가자." ], ()=>{ saveGame(); }); },

  /* ================= 제6장 「바람벽」 ================= */
  ev_s2_camp_enter:()=>{ if(storyFlags.s2CampIn) return; storyFlags.s2CampIn=true;
    showMsg([
      "— 제6장 「바람벽」 —",
      "얼음 야영지 「작살터」 — 얼음에 구멍을 뚫고 사는 사람들의 마을. 가죽 천막마다 연기가 오른다.",
      say('사나','내가 자란 데야. 멈춘 땅의 맨 끝. 별빛이 옅어서 우리는 조금씩 늙어.',SANA),
      say('코르','그럼 여긴 사람이 죽기도 해?',C),
      say('사나','응. 그래서 건너편 사람들은 우리를 불쌍하다고 해. 난 잘 모르겠어. 할머니 제사를 지낼 수 있는 건 우리뿐이거든.',SANA),
      "작살터 상인 ◇ 이 별서리 무구를 판다. 제단 ✦ 도 있다. 동쪽 ▣ 은 그치지 않는 눈보라다." ], ()=>{ saveGame(); }); },

  ev_s2_sea2_enter:()=>{ if(storyFlags.s2Sea2In) return; storyFlags.s2Sea2In=true;
    showMsg([
      "얼음 바다 깊은 곳 — 눈보라가 벽처럼 서 있다. 한 걸음 앞이 보이지 않는다.",
      say('사나','지도는 넣어 둬. 여기선 못 봐. 내 등만 보고 와.',SANA),
      say('카엘','이 눈보라도 멈춘 거야? 움직이는데.',K),
      say('사나','멈춘 땅과 안 멈춘 바다가 만나는 자리야. 둘이 부딪쳐서 삼백 해째 저래.',SANA),
      "눈보라 속에서는 지도가 보이지 않는다. 북쪽 어딘가에 ▣ 고래 무덤이, 동쪽 끝에 ▣ 바람벽이 있다." ]); },

  ev_s2_whale_enter:()=>{ if(storyFlags.s2WhaleIn) return; storyFlags.s2WhaleIn=true;
    showMsg([
      "고래 무덤 — 산만 한 고래가 솟구치다 멈춘 자리. 살은 삼백 해 동안 바람에 깎여, 갈비뼈가 기둥처럼 늘어서 있다.",
      say('미아','…따뜻해요. 여기만.',M),
      say('사나','이 안에 안 멈춘 게 하나 있대. 어릴 때는 무서운 얘긴 줄 알았어.',SANA),
      "뼈 사이 깊은 곳에, 숨은 강적(強)의 기척이 있다. 싸우지 않아도 길은 이어진다." ]); },

  ev_s2_wind_enter:()=>{ if(storyFlags.s2WindIn) return; storyFlags.s2WindIn=true;
    showMsg([
      "바람벽 — 눈보라가 가장 짙은 곳. 바람이 소리가 아니라 벽으로 온다.",
      say('사나','작살잡이들은 여기 등불을 세워서 길을 표시해. 등불 자리(○)가 셋 있어. 셋 다 켜야 바람이 갈라지는 틈(▦)이 보여.',SANA),
      say('코르','네 아버지도 여길 넘으려 했다며.',C),
      say('사나','넘으려다 돌아왔어. 그때 다친 다리로 평생 얼음낚시만 했지. …그래서 난 넘을 거야.',SANA) ]); },

  ev_s2_wind:()=>{ if(storyFlags.s2c6done) return;
    showMsg([
      "바람이 갈라진 틈. 그 한가운데에 눈보라가 문의 모양으로 서 있다. 기둥 둘, 그 위의 아치.",
      "문 안쪽 빈 곳에서 — 커다란 눈 하나가 뜬다.",
      say('사나','문지기야. 저게 삼백 해 동안 아무도 안 들여보냈어.',SANA),
      say('카엘','눈보라 정령이야. 불에 약해. 얼음은 통하지 않아!',K) ],
      ()=>{ startBattle(['windGate','gustWisp','gustWisp'],true,{onWin:'ev_s2_wind_win'}); }); },
  ev_s2_wind_win:()=>{ storyFlags.s2c6done=true;
    showMsg([
      "문지기가 흩어진다. 눈보라가 걷힌다 — 삼백 해 만에 처음으로, 바람벽 너머가 보인다.",
      "검은 돌로 쌓은 관문. 그 뒤로, 땅이 있다. 하늘에는 별이 하나. 차갑고 푸른, 십자 모양의 별.",
      say('사나','…넘었어. 아버지.',SANA),
      say('미아','저 별이 넷째 빛이군요. 여기서는 저렇게 가까워요.',M),
      say('사나','관문에는 수집관이 있어. 바다를 건너는 사람을 세는 자리야. 나갈 때는 인사하고 나갔는데.',SANA),
      say('코르','들어갈 때는?',C),
      say('사나','…이제 모르겠어.',SANA),
      "— 제6장 완료 —",
      "눈보라 너머 ▣ 바다 끝 관문으로 가자." ], ()=>{ saveGame(); }); },

  /* ================= 제7장 「저울의 수집관」 ================= */
  ev_s2_gate_enter:()=>{ if(storyFlags.s2GateIn) return; storyFlags.s2GateIn=true;
    showMsg([
      "— 제7장 「저울의 수집관」 —",
      "바다 끝 관문 — 검은 돌벽에 놋쇠 등롱이 줄지어 걸려 있다. 등롱마다 푸른 것이 조금씩 고여 있다.",
      say('카엘','저 등롱들… 선단에서 본 것과 같아. 수백 개야.',K),
      say('사나','나갈 때는 못 봤어. 아니 — 봤는데, 그냥 등불인 줄 알았어.',SANA),
      "옛 장치(○) 둘을 눌러야 안쪽 문(▦)이 열린다. 문 앞에 제단 ✦ 이 있다." ]); },

  ev_s2_scale:()=>{ if(storyFlags.s2c7done) return;
    showMsg([
      "관문 가장 안쪽. 낮고 뚱뚱한 자가 등을 돌리고 서 있다. 둥근 놋쇠 가면, 머리 위로 치켜든 큰 저울.",
      "저울의 한쪽 접시에는 푸른 빛 덩이가 얹혀 있고, 다른 쪽은 비어 기울어 있다.",
      say('저울의 수집관','작살잡이 사나. 나갈 때 무게는 열일곱 해. 돌아온 무게는 — 열일곱 해 석 달. 새는 그릇답게 늘었구나.',FOE),
      say('사나','수집관님. 선단에서 일꾼들이 사람들한테서 뭘 빼 가는 걸 봤어요. 그게 뭐예요.',SANA),
      say('저울의 수집관','흐르지 못한 시간이다. 멈춘 자에게는 쓸모가 없지. 쓸모없는 것을 거두는 것이 수집이다.',FOE),
      say('미아','쓸모없지 않았어요. 돌려주니까 손가락이 움직였어요!',M),
      say('저울의 수집관','그래서 돌려주지 않는 것이다.',FOE),
      "가면이 일행 쪽으로 돈다. 눈구멍의 가로로 긴 틈 하나가, 테리의 검과 카엘의 지팡이를 훑는다.",
      say('저울의 수집관','그리고 너희. 포고는 잘 읽혔구나. 「꺼뜨려라」고 쓰면 끄러 가는 대신 들고 올 줄을, 주인께서는 아셨다.',FOE),
      say('카엘','…들고 와? 뭘.',K),
      say('저울의 수집관','여명. 떨어진 빛의 둘째 조각. 주인께서 기다리신다. 너희가 들고 온 그것을.',FOE),
      say('사나','포고가 — 미끼였어? 내 동생이 풀리는 것도?',SANA),
      say('저울의 수집관','달아 보자. 여명의 주인 넷과, 새는 그릇 하나. 내 저울은 틀린 적이 없다.',FOE) ],
      ()=>{ startBattle(['scaleCollector','collectorHand','collectorHand'],true,{onWin:'ev_s2_scale_win'}); }); },
  ev_s2_scale_win:()=>{ storyFlags.s2c7done=true;
    showMsg([
      "저울이 부러진다. 접시 위의 푸른 빛 덩이가 굴러떨어져 — 벽에 걸린 등롱 수백 개가 한꺼번에 흔들린다.",
      say('저울의 수집관','…틀렸구나. 처음으로. 주인께 — 칼릭 님께 — 무게를 다시 달아야 한다고…',FOE),
      "수집관이 쓰러진다. 가면이 벗겨진다. 그 안에는 얼굴이 없다. 놋쇠 가면이 얼굴이었다.",
      say('코르','칼릭. 포고를 쓴 재상이잖아.',C),
      say('사나','삼백 해 동안 별지기님 곁을 지킨 분이야. 내가 태어나서 처음 배운 이름이 별지기님, 그다음이 칼릭 님이었어.',SANA),
      say('사나','그 사람이 — 내 동생을 풀고 있어. 너희를 부르려고.',SANA),
      say('테리','사나.',T),
      say('사나','등대를 끄라고 한 말, 거둘게. …미안. 석 달을 걸어서, 엉뚱한 사람들한테 작살을 겨눴어.',SANA),
      say('카엘','넌 가서 본 거야. 보고 나서 바꾼 거고. 우리 선조는 그걸 삼백 해 동안 못 했어.',K),
      say('미아','동생분한테 가요. 지금요.',M),
      "— 제7장 완료 —",
      "관문 너머 ▣ 멈춘 땅의 기슭으로 나가자." ], ()=>{ party.forEach(p=>{ p.alive=true; p.hp=p.maxhp; p.mp=p.maxmp; }); saveGame(); }); },

  ev_s2_end:()=>{ const F=storyFlags; if(F.part4Clear) return;
    showMsg([
      "관문을 나서자, 발밑이 얼음에서 흙으로 바뀐다.",
      "멈춘 땅의 기슭. 눈송이가 허공에 박혀 있다. 까마귀가 날개를 편 채 걸려 있다. 길가에, 걸어가다 멈춘 사람이 서 있다.",
      "하늘에는 해도 달도 없다. 푸른 십자 별 하나가, 숨 쉬듯 깜빡인다.",
      say('사나','어서 와. 내 고향이야. 아무것도 변하지 않는 땅.',SANA),
      say('사나','…아니, 이제 변하고 있지. 나쁜 쪽으로.',SANA),
      say('테리','동생이 있는 마을은?',T),
      say('사나','첫서리. 이 길로 반나절. 가자.',SANA),
      "— 시즌 2 「떨어진 빛들」 · 제1부 「답하는 빛」 끝 —",
      '걸린 시간 '+fmtTime(playSec)+' · 그중 전투 '+fmtTime(battleSec)+' · 전투 '+fights+'번',
      "제2부 「멈춘 땅」은 준비하고 있습니다. 지금까지의 기록은 저장되어 있습니다." ],
      ()=>{ F.part4Clear=true; saveGame(); }); },
},
});
})();
