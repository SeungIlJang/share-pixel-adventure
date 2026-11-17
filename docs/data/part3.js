/* 모두의 픽셀모험 — 제3부 「균열 너머」 데이터 (제작 중)
   지금 들어 있는 것: 제15~18장, 1차 전직 직업 8개와 그 기술·특성, 임시 동료 가른. 19장부터는 아직 없다. */
(function(){
"use strict";
/* ---- 화자 색 ---- */
const T='#7cc4ff', K='#c79bff', M='#9fe8c4', C='#f0c27a', LORD='#c0708a', GARN='#d8b070', NPC='#d9cdb5', FOLK='#b8b0d8', RIN='#ffd9a0', ROWAN='#9ad0e8', OATH='#c8b8ff';
const say=(n,t,c)=>({n,t,c});
/* ---- 적 능력치: 2부와 같은 곡선을 이어 쓴다(장이 오를수록 일정 비율로 강해진다). 보스의 hp/atk/mag 는 시뮬레이션으로 맞춘 값을 직접 적는다 ---- */
const pw=(b,k)=>Math.pow(b,k);
function reg(ch,m){ m=m||{}; const k=ch-7; return {
  hp:Math.round(230*pw(1.14,k)*(m.hp||1)), atk:Math.round(60*pw(1.085,k)*(m.atk||1)), mag:Math.round(44*pw(1.085,k)*(m.mag||1)),
  def:Math.round((18+2*k)*(m.def||1)), spd:(m.spd||11)+Math.floor(k/2), exp:Math.round(115*pw(1.15,k)*(m.exp||1)), gold:Math.round(60*pw(1.1,k)*(m.gold||1)) }; }
function bos(ch,m){ m=m||{}; const k=ch-7; return {
  hp:Math.round(2400*pw(1.2,k)*(m.hp||1)/10)*10, atk:Math.round(84*pw(1.085,k)*(m.atk||1)), mag:Math.round(72*pw(1.085,k)*(m.mag||1)),
  def:Math.round(22+2*k), spd:(m.spd||10)+Math.floor(k/2), exp:Math.round(800*pw(1.15,k)), gold:Math.round(600*pw(1.1,k)), boss:true }; }
/* ---- 지역 팔레트: 빛이 없는 땅 — 잿빛 바탕에 등불의 주황만 따뜻하다 ---- */
const PAL={
  ash:  { bg:'#08080c', floor:'#2c2c34', wall:'#1a1a22', grass:'#3a3a48', altar:'#2a3a66', boss:'#4a2a3a', chest:'#3a2e1a', detail:'rgba(200,200,220,.07)', rock:'#3a3a46', rock2:'#30303c', tuft:'#6a6a80' },
  lamp: { bg:'#0a0908', floor:'#34302c', wall:'#1e1a16', grass:'#3a3a48', altar:'#2a3a66', boss:'#4a2a3a', chest:'#3a2e1a', detail:'rgba(255,200,140,.08)', roof:'#6a5a4a', roof2:'#5a4c3e' },
  vale: { bg:'#07080c', floor:'#282c36', wall:'#161a24', grass:'#343c50', altar:'#2a3a66', boss:'#4a2a3a', chest:'#3a2e1a', detail:'rgba(180,200,240,.07)', rock:'#343a48', rock2:'#2a303c', tuft:'#5a6a8a' },
  rest: { bg:'#090808', floor:'#302c2a', wall:'#1c1816', grass:'#3a3a48', altar:'#2a3a66', boss:'#4a2a3a', chest:'#3a2e1a', detail:'rgba(255,190,130,.07)', roof:'#5a5048', roof2:'#4a423c' },
  deep: { bg:'#050508', floor:'#22242e', wall:'#101218', grass:'#2e3246', altar:'#2a3a66', boss:'#4a2a3a', chest:'#3a2e1a', detail:'rgba(160,170,220,.07)', rock:'#2e303c', rock2:'#262832' },
  city: { bg:'#0c0a08', floor:'#3a342c', wall:'#221c16', grass:'#3a3a48', altar:'#2a3a66', boss:'#4a2a3a', chest:'#3a2e1a', detail:'rgba(255,210,150,.10)', roof:'#7a6248', roof2:'#6a543c' },
  cinder:{ bg:'#0a0808', floor:'#302a28', wall:'#1c1614', grass:'#44383a', altar:'#2a3a66', boss:'#4a2a3a', chest:'#3a2e1a', detail:'rgba(255,170,120,.07)', rock:'#3e3432', rock2:'#322a28', tuft:'#7a5a50' },
  glow: { bg:'#080706', floor:'#2e2a24', wall:'#18140e', grass:'#3e3828', altar:'#2a3a66', boss:'#5a3a1a', chest:'#3a2e1a', detail:'rgba(255,200,120,.09)', rock:'#3a3428', rock2:'#2e2a20' },
  book: { bg:'#07070b', floor:'#2a2834', wall:'#17151f', grass:'#383450', altar:'#2a3a66', boss:'#3a2a5a', chest:'#3a2e1a', detail:'rgba(200,184,255,.08)', rock:'#35324a', rock2:'#2a283a' },
  tower:{ bg:'#06060a', floor:'#262630', wall:'#14141c', grass:'#34344a', altar:'#2a3a66', boss:'#4a2a3a', chest:'#3a2e1a', detail:'rgba(255,190,120,.07)', rock:'#34343e', rock2:'#2a2a34' },
};

definePart(3,{

/* ================= 제15장 「빛 없는 땅」 ================= */
goals:{3:[
  ['p3Child','동쪽으로 걸어 사람이 사는 곳을 찾자'],
  ['ch15done','잿등 마을 남쪽 ▣ 꺼진 등대의 「돌아오지 못한 자」를 만나자'],
  ['garnJoined','잿등 마을 동쪽 골짜기로 가자'],
  ['ch16done','쉼터 남쪽 ▣ 골짜기 밑바닥의 「잊힌 무리」를 막자'],
  ['cityEntered','쉼터 동쪽으로 나가 등불 도시를 찾자'],
  ['ch17done','등불 도시 남쪽 ▣ 대등탑의 나방 떼를 몰아내자'],
  ['ch18done','등불 도시 북쪽 ▣ 선조들의 서고 — 동쪽 끝 기록실로 가자'],
  ['ch19done','제19장은 준비 중입니다 — 그동안 숨은 강적(強)과 전리품을 찾아보자'],
]},

enemies:{
  /* 15장 — 모습을 잃은 자들. 빛(holy)에 약한 것이 많다 */
  ashHound:   {weak:'ice',  name:'잿빛 사냥개',  ...reg(15,{hp:.9,spd:14}),      color:'#5a5a66',look:'wolf',palx:{f:'#5a5a66',F:'#3a3a44',l:'#9a9aa8',e:'#ffb060'}},
  ashWisp:    {weak:'holy', name:'재의 불티',    ...reg(15,{hp:.8,mag:1.12}),    color:'#8a7a70',look:'wraith',palx:{g:'#8a7a70',G:'#5a4e48',l:'#d8c8b8',e:'#ffb060'},aiMagic:0.5},
  formless:   {weak:'holy', name:'모습 잃은 자', ...reg(15,{hp:1.1}),            color:'#2a2a3a',look:'shade',palx:{g:'#3a3a52',G:'#22222e',e:'#fff3b8'},aiMagic:0.3},
  lampMoth:   {weak:'arrow',name:'등불 나방',    ...reg(15,{hp:.75,spd:17}),     color:'#b08a5a',look:'bat',palx:{b:'#b08a5a',B:'#7a5e3a',l:'#f0d0a0'}},
  hollowGuard:{weak:'bolt',resist:'arrow',name:'빈 갑주',...reg(15,{hp:1.35,def:1.3,spd:9}),color:'#5a5a70',look:'sentinel',palx:{g:'#5a5a70',G:'#3a3a4c',l:'#9a9ab0',e:'#ffb060'}},
  returner:   {atkFx:'dark',weak:'holy',moves:['eatk','efocus','edrain','eflurry','eaoe'],enrage:0.35,name:'돌아오지 못한 자',...bos(15), hp:7200,atk:96,mag:84, color:'#2a2a3a',look:'phantom',big:2,palx:{p:'#34344a',P:'#1c1c28',e:'#ffb060'}},
  /* 16장 — 이름까지 잊은 자들 */
  faceless:  {weak:'holy', name:'얼굴 없는 자', ...reg(16,{hp:1.05}),           color:'#30304a',look:'shade',palx:{g:'#40405e',G:'#26263a',e:'#cfd8ff'},aiMagic:0.3},
  griefHowl: {weak:'holy', name:'울음 그림자',  ...reg(16,{hp:.8,mag:1.15}),    color:'#5a6088',look:'wraith',palx:{g:'#5a6088',G:'#3a3e5c',l:'#b0b8e0',e:'#cfd8ff'},aiMagic:0.55},
  cliffBat:  {weak:'arrow',name:'벼랑 박쥐',    ...reg(16,{hp:.75,spd:18}),     color:'#4a5068',look:'bat',palx:{b:'#4a5068',B:'#30344a',l:'#8a94b8'}},
  valeBrute: {weak:'fire', name:'엉긴 덩이',    ...reg(16,{hp:1.45,atk:1.1,spd:8}),color:'#3a3450',look:'brute',palx:{b:'#3a3450',B:'#241f36',l:'#6a6490',e:'#cfd8ff'}},
  lampEater: {weak:'ice',  name:'등불 먹는 것', ...reg(16,{hp:.95,spd:13}),     color:'#6a5a4a',look:'creeper',palx:{g:'#6a5a4a',G:'#463a2e',l:'#b09a7a',e:'#ffb060'}},
  throng:    {atkFx:'dark',weak:'holy',moves:['eatk','ecurse','eflurry','edrain','eaoe'],enrage:0.35,name:'잊힌 무리',...bos(16), hp:11000,atk:118,mag:102, color:'#2a2840',look:'brute',big:2,palx:{b:'#34324e',B:'#1c1a2c',l:'#5a5880',e:'#cfd8ff'}},
  /* 17장 — 불을 탐하는 것들 */
  cinderWolf:{weak:'ice',  name:'불티 늑대',    ...reg(17,{hp:.9,spd:15}),      color:'#7a4a3a',look:'wolf',palx:{f:'#7a4a3a',F:'#4e2e24',l:'#c08a6a',e:'#ffd060'}},
  mirrorWisp:{weak:'holy', name:'거울빛 도깨비',...reg(17,{hp:.8,mag:1.15}),    color:'#b0a888',look:'wraith',palx:{g:'#b0a888',G:'#7a745c',l:'#f0e8c8',e:'#ffffff'},aiMagic:0.55},
  mothKin:   {weak:'arrow',name:'등불 나방 떼', ...reg(17,{hp:.75,spd:18}),     color:'#c09a5a',look:'bat',palx:{b:'#c09a5a',B:'#86683a',l:'#f6dca6'}},
  waxGuard:  {weak:'fire',resist:'arrow',name:'밀랍 파수',...reg(17,{hp:1.4,def:1.3,spd:9}),color:'#a89878',look:'sentinel',palx:{g:'#a89878',G:'#746850',l:'#e0d4b0',e:'#ffb060'}},
  sootCreep: {weak:'ice',  name:'그을음 덩굴',  ...reg(17,{hp:1.0,spd:12}),     color:'#3a3430',look:'creeper',palx:{g:'#4a423c',G:'#2c2622',l:'#7a6e62',e:'#ffb060'}},
  mothQueen: {atkFx:'dark',weak:'arrow',moves:['eatk','evenom','eflurry','efocus','eaoe'],enrage:0.35,name:'대등의 여왕나방',...bos(17,{spd:14}), hp:13000,atk:126,mag:110, color:'#c09a5a',look:'bat',big:2,palx:{b:'#d0a860',B:'#8a6a3a',l:'#fff0c0'}},
  /* 18장 — 기록이 깨어난 것들 */
  inkWraith: {weak:'holy', name:'먹물 망령',    ...reg(18,{hp:.85,mag:1.15}),   color:'#3a3860',look:'wraith',palx:{g:'#3a3860',G:'#24223e',l:'#8a86c0',e:'#c8b8ff'},aiMagic:0.55},
  pageBat:   {weak:'fire', name:'책장 박쥐',    ...reg(18,{hp:.75,spd:19}),     color:'#b8b098',look:'bat',palx:{b:'#b8b098',B:'#807a66',l:'#f0ead0'}},
  oathGuard: {weak:'bolt',resist:'arrow',name:'서약의 갑주',...reg(18,{hp:1.4,def:1.3,spd:9}),color:'#5a5488',look:'sentinel',palx:{g:'#5a5488',G:'#3a3660',l:'#a8a0d8',e:'#c8b8ff'}},
  dustGolem: {weak:'ice',  name:'먼지 거인',    ...reg(18,{hp:1.5,atk:1.1,spd:8}),color:'#8a8478',look:'golem',palx:{g:'#8a8478',G:'#5c584e',l:'#c0baa8',e:'#c8b8ff'}},
  quillShade:{weak:'holy', name:'깃펜 그림자',  ...reg(18,{hp:1.0,spd:14}),     color:'#2c2a44',look:'shade',palx:{g:'#3c3a5c',G:'#222038',e:'#c8b8ff'},aiMagic:0.35},
  oathEcho:  {atkFx:'dark',weak:'bolt',moves:['emagic','ecurse','echarge','eblast','eatk'],enrage:0.35,name:'첫 관리인의 서약',...bos(18), hp:10500,atk:120,mag:102, color:'#5a4a9a',look:'archivist',big:2,palx:{g:'#5a4a9a',G:'#3a2e6a',l:'#c8b8ff',e:'#fff3b8'}},
},

members:{
  /* 16장의 임시 동료. 장비 없이도 제 몫을 하도록 기본 능력치를 높게 잡았다(장비를 끼우면 그만큼 더 세지고, 떠날 때 돌려받는다) */
  '가른':{cls:'궁수', stats:[150,30,62,36,10,24], skills:['garnVolley'], color:GARN, set:{guest:true,title:'화살의 사도',learnKey:'garn',palx:{a:'#5a6480',A:'#3c445c',l:'#8e9ab8'}}},
},

equip:{
  /* 8단계(등불) — 등불 도시 */
  lampSword: {name:'등불검',        slot:'weapon',cls:['검사'],atk:46,price:2400},
  lampStaff: {name:'등불 지팡이',   slot:'weapon',cls:['주술사','치유사'],mag:46,price:2400},
  lampBow:   {name:'등불궁',        slot:'weapon',cls:['궁수'],atk:46,price:2400},
  lampPlate: {name:'등불 갑주',     slot:'armor',def:30,price:2200},
  lampRobe:  {name:'등불 로브',     slot:'armor',def:19,mag:11,price:2000},
  lampHelm:  {name:'등불 투구',     slot:'head',def:15,price:1300},
  /* 17~18장 전리품 */
  cinderClaw:{name:'불티 발톱',     slot:'ring', atk:8,fx:'venomEdge',rare:1,price:1200},
  waxShield: {name:'밀랍 손방패',   slot:'hands',def:8,fx:'stunWard',rare:1,price:1200},
  oathHelm:  {name:'서약의 투구',   slot:'head', def:17,fx:'poisonWard',rare:1,price:1400},
  inkRing:   {name:'먹물 반지',     slot:'ring', mag:8,fx:'weakUp',rare:1,price:1400},
  queenWing: {name:'여왕나방의 날개',slot:'feet', spd:6,def:3,fx:'evade',uniq:1,price:0},
  oathSeal:  {name:'첫 서약의 인장',slot:'ring', mag:8,def:3,fx:'mpSave',uniq:1,price:0},
  /* 16장 전리품 */
  facelessMask:{name:'얼굴 없는 가면', slot:'head',def:15,fx:'evade',rare:1,price:1100},
  clumpCore:   {name:'엉긴 덩이의 심', slot:'ring',def:6,fx:'thorns',rare:1,price:1000},
  eaterFang:   {name:'불 먹는 이빨',   slot:'ring',atk:8,fx:'lifeSteal',rare:1,price:1100},
  nameLamp:    {name:'이름들의 등불',  slot:'ring',mag:5,def:5,spd:2,fx:'mpRegen',uniq:1,price:0},
  /* 7단계(잿빛) — 잿등 마을 */
  ashSword: {name:'잿빛검',        slot:'weapon',cls:['검사'],atk:40,price:1600},
  ashStaff: {name:'잿빛 지팡이',   slot:'weapon',cls:['주술사','치유사'],mag:40,price:1600},
  ashBow:   {name:'잿빛궁',        slot:'weapon',cls:['궁수'],atk:40,price:1600},
  ashPlate: {name:'잿빛 갑주',     slot:'armor',def:26,price:1500},
  ashRobe:  {name:'잿빛 로브',     slot:'armor',def:16,mag:9,price:1300},
  ashHelm:  {name:'잿빛 투구',     slot:'head',def:13,price:900},
  /* 마물 전리품(희귀) */
  ashFang:    {name:'잿빛 송곳니',  slot:'ring', atk:7,fx:'critUp',rare:1,price:900},
  hollowCloak:{name:'빈 자의 외투', slot:'armor',def:22,fx:'curseWard',rare:1,price:1200},
  hollowHelm: {name:'빈 갑주의 투구',slot:'head',def:14,fx:'aoeGuard',rare:1,price:1000},
  /* 보스 고유 */
  halenBird:  {name:'할렌의 목각 새',slot:'ring', atk:3,def:5,mag:3,spd:3,fx:'allWard',uniq:1,price:0},
},
drops:{
  returner:{item:'halenBird',done:'ch15done',part:3},
  ashHound:{item:'ashFang',rate:0.05,pity:20}, formless:{item:'hollowCloak',rate:0.05,pity:20}, hollowGuard:{item:'hollowHelm',rate:0.05,pity:20},
  ashWisp:{item:'hiEther',rate:0.1}, lampMoth:{item:'hiPotion',rate:0.12},
  throng:{item:'nameLamp',done:'ch16done',part:3},
  faceless:{item:'facelessMask',rate:0.05,pity:20}, valeBrute:{item:'clumpCore',rate:0.05,pity:20}, lampEater:{item:'eaterFang',rate:0.05,pity:20},
  griefHowl:{item:'hiEther',rate:0.1}, cliffBat:{item:'hiPotion',rate:0.12},
  mothQueen:{item:'queenWing',done:'ch17done',part:3}, oathEcho:{item:'oathSeal',done:'ch18done',part:3},
  cinderWolf:{item:'cinderClaw',rate:0.05,pity:20}, waxGuard:{item:'waxShield',rate:0.05,pity:20}, oathGuard:{item:'oathHelm',rate:0.05,pity:20}, inkWraith:{item:'inkRing',rate:0.05,pity:20},
  mothKin:{item:'hiPotion',rate:0.12}, mirrorWisp:{item:'hiEther',rate:0.1}, pageBat:{item:'hiPotion',rate:0.12}, quillShade:{item:'hiEther',rate:0.1},
},

areas:{
  ashfield:{ name:'재의 들판', theme:'ash', bgm:'rift', hud:'3부 15장', pal:PAL.ash,
    src:[ "111111111111111111111111","100000220000000002200001","102200220011000002200501","102200000110022000000001",
          "100000000000002200011001","100000110006000000011001","100000110000007000000001","102200000220000000220001",
          "102200000220011000220001","100000050000011000000001","111111111111111111111111" ],
    enc:{ pool:['ashHound','ashWisp','formless'], rate:0.2, pow:0.95, hpw:1.1 }, respawn:{x:2,y:5},
    npcs:[], warps:[ {x:1,y:5,to:'riftgate',tx:8,ty:8,label:'균열의 문'},
            {x:22,y:5,to:'lamptown',tx:2,ty:5,label:'불빛',event:'ev_child',eventFlag:'p3Child'} ],
    loot:{'21,2':{item:'powerSeed'},'7,9':{gold:800,item:'hiPotion'}},
    eventTile:'ev_child', eventDone:'p3Child' },

  lamptown:{ name:'잿등 마을', theme:'town', bgm:'town', hud:'3부 15장', pal:PAL.lamp,
    src:[ "1111111111111111","1000000000000001","1011100100111101","1000000000000001",
          "1000000000030001","1000000000000001","1011001100110001","1000000000000001",
          "1000000000000001","1111111101111111","1111111111111111" ],
    enc:null, respawn:{x:3,y:5},
    npcs:[
      {x:6,y:3,color:'#8a86a8',shade:true,name:'등불지기',lines:()=> storyFlags.ch15done ? [
          say('등불지기','할렌이 돌아왔소. 제 발로, 제 얼굴로. 이 마을에서 그런 일은 처음이오.',FOLK),
          say('등불지기','동쪽으로 더 가면 「모습을 잃은 자들」이 모이는 골짜기가 있소. 군주의 사도 하나가 그곳을 지킨다 하더이다.',FOLK) ] : [
          say('등불지기','할렌이라는 사내요. 딸아이에게 줄 빛을 구하겠다며 균열을 넘었지.',FOLK),
          say('등불지기','돌아왔을 땐 이름을 잊은 뒤였소. 지금은 남쪽 등대 한가운데서, 꺼진 불씨만 끌어안고 있소.',FOLK),
          say('등불지기','그 사내의 딸이 린이오. 아이는 아직 아비가 돌아올 거라 믿고 있소.',FOLK) ]},
      {x:10,y:3,color:'#7a7694',shade:true,name:'마을 사람',lines:[
        say('마을 사람','저편 하늘에는 「해」라는 게 뜬다며? 등불을 몇 개나 모아야 그만큼 밝아?',FOLK),
        say('마을 사람','…셀 수 없다고. 그런 걸, 너희끼리만 보고 있었구나.',FOLK) ]},
      {x:12,y:7,color:'#c8a070',shade:()=>storyFlags.p3Child!=='share'&&!storyFlags.ch15done,name:'린',lines:()=> storyFlags.ch15done ? [
          say('린','아빠가 돌아왔어! 나를 알아봐! …어깨는 아프대. 그래도 웃었어.',RIN),
          say('린','오빠 검에서 나던 빛, 등대에 옮겨 붙었지? 마을에서도 보여. 고마워.',RIN) ]
        : storyFlags.p3Child==='share' ? [
          say('린','아빠는 등대에 있어. 나를 못 알아봐. …그래도 아빠야.',RIN),
          say('린','언니가 준 빛, 아직 손바닥에 남아 있어. 이걸 아빠한테도 줄 수 있으면 좋겠다.',RIN) ]
        : [ "린은 등불 뒤로 숨는다. 검을 든 손만 뚫어지게 본다.",
            say('린','…아빠도, 그렇게 쫓겨났어?',RIN) ]},
      {x:3,y:7,color:'#f0c27a',shade:true,name:'그림자 상인',glyph:'◇',shop:['hiPotion','hiEther','revive','ashSword','ashStaff','ashBow','ashPlate','ashRobe','ashHelm','powerSeed','wisdomSeed','guardSeed','lifeSeed']} ],
    warps:[ {x:1,y:5,to:'ashfield',tx:21,ty:5,label:'들판'},
            {x:8,y:9,to:'deadlight',tx:2,ty:1,label:'등대'},
            {x:14,y:5,to:'valeroad',tx:2,ty:5,label:'골짜기',need:'ch15done',block:'동쪽 골짜기는 등불지기가 막아선다. 「먼저 남쪽 등대의 일을 봐 주시오.」'} ],
    onEnter:'ev_lamp_enter' },

  /* 나선 등대: 바깥 고리 → 안쪽 고리 → 한가운데 등실. 장치 둘은 바깥 고리의 양 끝 */
  deadlight:{ name:'꺼진 등대', theme:'temple', bgm:'dungeon', hud:'3부 15장', pal:PAL.tower,
    src:[ "1111111111111111","1000022000000081","1011111111111101","1010000022000101",
          "1010111111110101","1010100600590101","1010111111110101","1010000000220101",
          "1011101111111101","1800000700000051","1111111111111111" ],
    enc:{ pool:['formless','lampMoth','hollowGuard'], rate:0.22, pow:1.0, hpw:1.15 }, respawn:{x:2,y:1},
    npcs:[], warps:[ {x:1,y:1,to:'lamptown',tx:8,ty:8,label:'마을'} ],
    loot:{'10,5':{item:'ashRobe'},'14,9':{gold:1500,item:'hiEther'}},
    eventTile:'ev_returner', eventDone:'ch15done', onEnter:'ev_dead_enter' },

  /* ---- 제16장 ---- */
  valeroad:{ name:'잃은 자들의 골짜기', theme:'ash', bgm:'rift', hud:'3부 16장', pal:PAL.vale,
    src:[ "1111111111111111111111","1000022000001000000051","1011022000001002200001","1011000011000002200101",
          "1000000011000000000101","1000000000060000000001","1001100000000110000001","1001100220000110022001",
          "1000000220070000022001","1050000000000000000001","1111111111111111111111" ],
    enc:{ pool:['faceless','griefHowl','cliffBat'], rate:0.2, pow:1.04, hpw:1.12 }, respawn:{x:2,y:5},
    npcs:[], warps:[ {x:1,y:5,to:'lamptown',tx:13,ty:5,label:'마을'},
            {x:20,y:5,to:'hollowrest',tx:2,ty:5,label:'쉼터',event:'ev_garn_meet',eventFlag:'garnMet'} ],
    loot:{'20,1':{item:'wisdomSeed'},'2,9':{gold:1200,item:'hiEther'}},
    eventTile:'ev_garn_meet', eventDone:'garnMet' },

  hollowrest:{ name:'이름 없는 쉼터', theme:'town', bgm:'town', hud:'3부 16장', pal:PAL.rest,
    src:[ "1111111111111111","1000000000000001","1011100000111001","1000000300000001",
          "1000000000000001","1000000000000001","1011000000011001","1000000000000001",
          "1000000000000001","1111111101111111","1111111111111111" ],
    enc:null, respawn:{x:3,y:5},
    npcs:[
      {x:8,y:5,color:GARN,name:'가른',when:'ch16done',lines:[
        say('가른','팔은 조금씩 돌아오고 있다. 불 옆에 앉아 있으면 윤곽이 다시 선다.',GARN),
        say('가른','코르에게 전해라. 겨눌 것을 스스로 정한 궁수는, 나보다 멀리 쏜다고.',GARN) ]},
      {x:5,y:3,color:'#6a6884',shade:true,name:'이름 없는 이',lines:()=> storyFlags.ch16done ? [
          say('이름 없는 이','…이름이… 하나 돌아왔어… 「소라」… 그게 나였어…',FOLK) ] : [
          say('이름 없는 이','…불… 따뜻해… 내 이름이… 뭐였더라…',FOLK) ]},
      {x:10,y:3,color:'#7a7896',shade:true,name:'얼굴만 남은 이',lines:()=> storyFlags.p3Child==='share' ? [
          say('얼굴만 남은 이','잿등 마을 아이가 얼굴을 돌려받았다는 소문이 여기까지 왔어. 너희지?',FOLK),
          say('얼굴만 남은 이','빛을 나눠 받는다는 게 어떤 건지, 우리는 잊은 지 오래야. 고맙다는 말도.',FOLK) ] : [
          say('얼굴만 남은 이','검 든 저편 사람이 아이를 쫓았다더군. …너희는 아니겠지.',FOLK),
          say('얼굴만 남은 이','가른도 처음엔 활을 겨누고 왔어. 사람은, 보고 나면 바뀌기도 하더라.',FOLK) ]},
      {x:12,y:7,color:'#f0c27a',shade:true,name:'빛 줍는 이',glyph:'◇',shop:['hiPotion','hiEther','revive','ashSword','ashStaff','ashBow','ashPlate','ashRobe','ashHelm','powerSeed','wisdomSeed','guardSeed','lifeSeed']} ],
    warps:[ {x:1,y:5,to:'valeroad',tx:19,ty:5,label:'골짜기'},
            {x:8,y:9,to:'valedeep',tx:2,ty:1,label:'밑바닥'},
            {x:14,y:5,to:'cinderpath',tx:2,ty:5,label:'등불 도시',need:'ch16done',block:'가른이 고개를 젓는다. 「밑바닥 일이 먼저다.」'} ],
    onEnter:'ev_rest_enter' },

  /* 갈지자 벼랑길: 층마다 끝에서 끝까지 걸어야 다음 층으로 내려간다. 장치는 두 층의 막다른 끝 */
  valedeep:{ name:'골짜기 밑바닥', theme:'temple', bgm:'dungeon', hud:'3부 16장', pal:PAL.deep,
    src:[ "111111111111111111","100022000007000001","111111111111111101","180000220000050001",
          "110111111111111111","100002200070000081","111111111111101111","150000022000000001",
          "111111111111911111","150006000000000001","111111111111111111" ],
    enc:{ pool:['faceless','valeBrute','lampEater'], rate:0.22, pow:1.35, hpw:1.3 }, respawn:{x:2,y:1},
    npcs:[], warps:[ {x:1,y:1,to:'hollowrest',tx:8,ty:8,label:'쉼터'} ],
    loot:{'13,3':{item:'guardSeed'},'1,7':{gold:1800,item:'hiPotion'},'1,9':{item:'lifeSeed'}},
    eventTile:'ev_throng', eventDone:'ch16done', onEnter:'ev_deep_enter' },

  /* ---- 제17장 ---- */
  cinderpath:{ name:'불티 날리는 길', theme:'ash', bgm:'rift', hud:'3부 17장', pal:PAL.cinder,
    src:[ "1111111111111111111111","1500002200000000220001","1011002200110000220001","1011000000110011000001",
          "1000000110000011000101","1000000110000000000101","1002200000001100000001","1002200011001100220001",
          "1000000011000000220701","1000070000000050000001","1111111111111111111111" ],
    enc:{ pool:['cinderWolf','mirrorWisp','mothKin'], rate:0.2, pow:1.05, hpw:1.12 }, respawn:{x:2,y:5},
    npcs:[], warps:[ {x:1,y:5,to:'hollowrest',tx:13,ty:5,label:'쉼터'}, {x:20,y:5,to:'lampcity',tx:2,ty:5,label:'도시'} ],
    loot:{'1,1':{item:'powerSeed'},'14,9':{gold:1500,item:'hiEther'}} },

  lampcity:{ name:'등불 도시', theme:'town', bgm:'town', hud:'3부 17장', pal:PAL.city,
    src:[ "111111111111111111","100000000000000001","101110011001110101","100000000000000001",
          "100000003000000001","100000000000000001","101100110011001101","100000000000000001",
          "100000000000000001","111111111011111111","111111111111111111" ],
    enc:null, respawn:{x:3,y:5},
    npcs:[
      {x:5,y:3,color:ROWAN,name:'로완',lines:()=> storyFlags.ch17done ? ( storyFlags.p3Truth==='tell' ? [
          say('로완','사람들이 제 집 등불을 줄여 탑에 보탠다. 어두워졌지만, 아무도 속고 있지 않다.',ROWAN),
          say('로완','미아에게 전해 다오. 신전이 나를 쫓아낸 날보다, 오늘이 더 오래 기억날 거라고.',ROWAN) ] : [
          say('로완','도시는 평온하다. 거울빛 아래서. …그 평온의 값은 미아와 내가 나눠 들고 있다.',ROWAN),
          say('로완','근원을 되찾으면, 그때는 덮을 것이 없어지겠지. 서둘러 다오.',ROWAN) ] ) : [
          say('로완','대등탑은 남쪽이다. 나방이 남은 불을 갉아 먹고 있다.',ROWAN),
          say('로완','내 얼음으로는 불까지 꺼뜨린다. 너희의 손이 필요하다.',ROWAN) ]},
      {x:12,y:3,color:'#c8a070',name:'도시 사람',lines:()=> storyFlags.p3Truth==='tell' ? [
          say('도시 사람','불이 그렇게 작은 줄 몰랐어. 무섭지. 그래도 모르고 웃던 어제보다는 나아.',FOLK) ] : [
          say('도시 사람','대등 덕에 우린 얼굴을 지니고 살아. 들판 사람들은 안됐지만… 탑의 불이 꺼질 리는 없잖아?',FOLK) ]},
      {x:14,y:7,color:'#b8a0d0',name:'등불 의원',lines:()=> storyFlags.p3Truth==='tell' ? [
          say('등불 의원','…의회는 반대했소. 하지만 흩어진 건 몇 집뿐이었소. 우리가 사람들을 얕봤던 게지.',FOLK) ] : [
          say('등불 의원','알리지 않는 것도 다스리는 일이오. 불이 작다는 걸 알면, 오늘 밤 이 도시는 비오.',FOLK) ]},
      {x:10,y:7,color:'#ffd9a0',name:'아이',lines:[
          say('아이','들판에서 온 애가 그러는데, 거기선 얼굴이 흐려진대. 거짓말이지? 그치?',RIN) ]},
      {x:3,y:7,color:'#f0c27a',name:'등불 상인',glyph:'◇',shop:['hiPotion','hiEther','revive','lampSword','lampStaff','lampBow','lampPlate','lampRobe','lampHelm','powerSeed','wisdomSeed','guardSeed','lifeSeed']} ],
    warps:[ {x:1,y:5,to:'cinderpath',tx:19,ty:5,label:'길'},
            {x:9,y:9,to:'lamptower',tx:2,ty:1,label:'대등탑'},
            {x:9,y:1,to:'archivehall',tx:2,ty:4,label:'서고',need:'ch17done',block:'북쪽 서고의 문은 닫혀 있다. 먼저 대등탑의 일을 끝내자.'} ],
    onEnter:'ev_city_enter' },

  /* 빗살 구조: 위쪽 복도에서 가지 셋이 아래로 뻗고, 가지 끝마다 장치. 동쪽 끝 문 너머가 불씨 그릇 */
  lamptower:{ name:'대등탑', theme:'temple', bgm:'dungeon', hud:'3부 17장', pal:PAL.glow,
    src:[ "111111111111111111","100002200000220001","110111101111011101","110111101111011191",
          "112111101111211101","110111171111011101","180001500100081101","111111101111111101",
          "111110008111111101","111111111150060001","111111111111111111" ],
    enc:{ pool:['mothKin','waxGuard','sootCreep'], rate:0.22, pow:1.1, hpw:1.15 }, respawn:{x:2,y:1},
    npcs:[], warps:[ {x:1,y:1,to:'lampcity',tx:9,ty:8,label:'도시'} ],
    loot:{'6,6':{item:'lampRobe'},'10,9':{gold:2000,item:'lifeSeed'}},
    eventTile:'ev_queen', eventDone:'ch17done', onEnter:'ev_tower_enter' },

  /* ---- 제18장 ---- */
  archivehall:{ name:'선조들의 서고', theme:'temple', bgm:'dungeon', hud:'3부 18장', pal:PAL.book,
    src:[ "11111111111111111111","10000002200000000051","10110110110110110101","10110110110110110101",
          "10000000000220000001","10110110110110110101","10110110110110110101","10022000000000002201",
          "10110110110110110101","15000000000000000001","11111111111111111111" ],
    enc:{ pool:['inkWraith','pageBat','quillShade'], rate:0.2, pow:1.0, hpw:1.1 }, respawn:{x:2,y:4},
    npcs:[], warps:[ {x:1,y:4,to:'lampcity',tx:9,ty:2,label:'도시'},
            {x:18,y:4,to:'archivevault',tx:2,ty:1,label:'기록실',event:'ev_arch_lore',eventFlag:'archLore'} ],
    loot:{'18,1':{item:'wisdomSeed'},'1,9':{gold:2000,item:'hiEther'}},
    onEnter:'ev_arch_enter' },

  /* 세 겹 복도: 가운데 복도는 가시투성이. 장치는 첫 복도 동쪽 끝과 셋째 복도 서쪽 끝 */
  archivevault:{ name:'봉인 기록실', theme:'temple', bgm:'dungeon', hud:'3부 18장', pal:PAL.book,
    src:[ "111111111111111111","100000022000000081","101111111111111111","100707070002200001",
          "111111111111111101","180000005000220001","111111111911111111","111100000000000111",
          "111100000600005111","111111111111111111","111111111111111111" ],
    enc:{ pool:['oathGuard','dustGolem','inkWraith'], rate:0.22, pow:1.0, hpw:1.0 }, respawn:{x:2,y:1},
    npcs:[], warps:[ {x:1,y:1,to:'archivehall',tx:17,ty:4,label:'서고'} ],
    loot:{'8,5':{item:'guardSeed'},'14,8':{gold:2500,item:'powerSeed'}},
    eventTile:'ev_oath', eventDone:'ch18done', onEnter:'ev_vault_enter' },
},

starts:{
  3:()=>{ const gear={ '테리':{weapon:'dawnSword',armor:'dawnPlate',head:'runeHelm',hands:'runeGauntlet',feet:'stormBoots',ring:'heroRing'},
                       '카엘':{weapon:'dawnStaff',armor:'starRobe',head:'starCirclet',ring:'archRing'},
                       '미아':{weapon:'dawnStaff',armor:'starRobe',head:'starCirclet',ring:'aegisRing'},
                       '코르':{weapon:'dawnBow',armor:'runeMail',head:'runeHelm',hands:'runeGauntlet',feet:'stormBoots',ring:'heroRing'} };
    party=['테리','카엘','미아','코르'].map(n=>{ const p=MK[n](); while(p.lv<23) levelUp(p); Object.assign(p,gear[n]); return p; });
    gold=3000; inventory={hiPotion:6,hiEther:4,revive:3}; sealsFixed=0; bossStage=3; storyFlags={introDone:true,part1Clear:true,part2Clear:true}; },
},

events:{
  ev_p3_start:()=>{ storyFlags.p3Started=true; loadArea('ashfield',2,5,'right');
    showMsg([
      "— 모두의 픽셀모험 · 제3부 「균열 너머」 —",
      "문을 넘자, 등 뒤의 빛이 실처럼 가늘어진다. 하늘에는 해도 별도 없다.",
      "발밑은 재처럼 고운 흙. 멀리 동쪽에, 희미한 불빛 몇 점이 떨고 있다.",
      say('미아','…춥지는 않은데, 몸이 자꾸 움츠러들어요. 빛이 없다는 게 이런 거군요.',M),
      say('카엘','기록에는 「저편」이라고만 적혀 있었어. 땅이 있고 길이 있고… 누가 산다는 말은 없었지.',K),
      say('코르','길이 있으면 걷는 놈도 있는 법이야. 형도 이 길을 갔겠지.',C),
      say('테리','가 보자. 우리가 뭘 가뒀는지 — 눈으로 보러 온 거니까.',T),
      "— 제15장 「빛 없는 땅」 —" ], ()=>{ saveGame(); }); },

  /* 첫 선택: 모습을 잃은 아이 */
  ev_child:()=>{ if(storyFlags.p3Child) return;
    const share=()=>{ storyFlags.p3Child='share'; inventory.lifeSeed=(inventory.lifeSeed||0)+1; showMsg([
        "미아가 손바닥에 작은 빛을 피워 내민다. 그림자의 윤곽이 물러나고 — 그 안에서, 여자아이의 얼굴이 드러난다.",
        say('린','…보여. 내 손이 보여! 언니 오빠들, 저편 사람이지? 빛 냄새가 나.',RIN),
        say('미아','사람… 이었어요. 처음부터.',M),
        say('테리','……',T),
        say('린','난 린이야. 이거 줄게, 재꽃 열매. 마을은 동쪽이야 — 불빛 보이지? 따라와!',RIN),
        "「생명의 열매」를 받았다." ], ()=>{ saveGame(); }); };
    const chase=()=>{ storyFlags.p3Child='chase'; showMsg([
        "테리가 검을 뽑아 땅을 긋는다. 그림자는 비명 같은 소리를 내며 동쪽으로 달아난다.",
        say('미아','테리…! 저건 달려들지도 않았는데.',M),
        say('테리','…마물이야. 그렇게 배웠어.',T),
        say('카엘','(낮게) 그렇게 가르친 건, 우리 쪽이지.',K) ], ()=>{ saveGame(); }); };
    askMsg([
      "길 한복판에, 작은 그림자가 웅크리고 있다. 지금까지 베어 온 마물과 똑같은 윤곽이다.",
      say('코르','…작군. 새끼인가.',C),
      "그림자가 고개를 든다. 달려들지 않는다. 떨고 있다.",
      say('???','…빛… 따뜻해…','#8a93ad'),
      "테리의 손이 검자루로 간다. 마을이 습격당한 밤에 본 것도, 이런 윤곽이었다." ],'빛을 나눈다','검으로 쫓는다',share,chase); },

  ev_lamp_enter:()=>{ if(storyFlags.lampEntered) return; storyFlags.lampEntered=true;
    showMsg([
      "잿등 마을 — 집집마다 꺼져 가는 등불 하나씩. 그 불빛 아래를 오가는 것은, 모두 그림자다.",
      say('코르','…전부 마물이잖아. 아니, 잠깐. 저쪽은 빨래를 널고 있는데.',C),
      storyFlags.p3Child==='share' ? say('린','할아버지! 저편 사람들이야! 나 얼굴 돌려받았어!',RIN) : "아까 달아난 작은 그림자가, 노인의 뒤에 숨어 이쪽을 노려본다.",
      say('등불지기','검을 거두시오, 저편의 손님. 우리는 빛이 모자라 모습을 잃었을 뿐, 사람이오.',FOLK),
      say('등불지기','빛이 아주 떨어지면 이름도 잊소. 그런 이들은 들판을 헤매다 균열로 흘러가지. 따뜻한 쪽으로.',FOLK),
      say('카엘','…균열에서 흘러나온 「그림자 마물」.',K),
      say('테리','그럼, 우리가 벤 건—',T),
      say('등불지기','묻지 않겠소. 그쪽도 살려고 한 일일 테니. 다만 하나만 부탁하오. 남쪽 꺼진 등대에, 돌아오지 못한 자가 하나 있소.',FOLK),
      "마을 사람들과 이야기해 보자. 그림자 상인 ◇ 과 제단 ✦ 도 있다. 등대는 남쪽 ▣ 이다." ]); },

  ev_dead_enter:()=>{ if(storyFlags.deadEntered) return; storyFlags.deadEntered=true;
    showMsg([
      "꺼진 등대 — 복도가 나선으로 감겨 들어간다. 한가운데에, 불이 꺼진 등실이 있다.",
      say('카엘','바깥 고리의 양 끝에 장치(○)가 둘. 둘 다 눌러야 등실 문(▦)이 열려.',K),
      say('미아','…누가 울고 있어요. 저 안쪽에서.',M) ]); },

  ev_returner:()=>{ if(storyFlags.ch15done) return; if(storyFlags.returnerDown){ runEvent('ev_returner_after'); return; } // 이긴 뒤 전직을 고르기 전에 꺼졌다면 다시 싸우지 않고 이어서
    showMsg([
      "등실 한가운데. 커다란 그림자가 꺼진 불씨 그릇을 끌어안고 있다.",
      "그 왼쪽 어깨에 — 깊게 베인 자국이 있다.",
      say('테리','…저 상처. 내가 냈어. 마을이 습격당한 밤에.',T),
      say('테리','문 앞까지 온 놈이었어. 화덕 불을 향해 기어 오길래… 벴어. 그게, 저 사람이었구나.',T),
      say('돌아오지 못한 자','…린… 빛을… 가져가야…','#8a93ad'),
      say('미아','우리를 못 알아봐요. 빛 냄새에 달려들 거예요!',M) ],
      ()=>{ startBattle(['returner','ashWisp','ashWisp'],true,{onWin:'ev_returner_after'}); }); },

  ev_returner_after:()=>{ storyFlags.returnerDown=true; saveGame();
    showMsg([
      "그림자가 무릎을 꿇는다. 테리의 검끝이 그 목에 닿는다.",
      say('테리','…그날 밤엔 망설이지 않았어. 지키려면 베어야 한다고 믿었으니까.',T),
      say('테리','그런데 이 사람도, 지키려고 온 거였잖아.',T),
      "테리는 검을 내린다. 그리고 꺼진 불씨 그릇에 — 자기 검에 남은 여명의 빛을 옮겨 붙인다.",
      "등실에 불이 든다. 그림자의 윤곽이 걷히고, 지친 사내의 얼굴이 드러난다.",
      say('할렌','…여긴… 린은? 린은 무사합니까.',FOLK),
      say('미아','무사해요. 마을에서 기다리고 있어요.',M),
      say('할렌','그 검… 당신이군요. 원망하지 않습니다. 저도 당신 집의 불을 훔치러 갔으니.',FOLK),
      say('테리','…내 검이 무엇을 위한 건지, 이제 정해야겠어.',T) ],
      ()=>{ openJobPick('테리',(id,got)=>{
        const line = id==='guardian' ? say('테리','지키는 검이다. 이쪽도, 저쪽도. 베기 전에 먼저 막아서는 검.',T)
                   : id==='blademaster' ? say('테리','길을 여는 검이다. 빛이 지나갈 길을 막는 것만, 남김없이 베어 낸다.',T)
                   : say('테리','…가자.',T);
        showMsg([ line,
          id ? '테리는 「'+jobName(party.find(q=>q.name==='테리'))+'」(으)로 전직했다!  '+(got||[]).join(' · ') : '',
          say('카엘','(…다음은 내 차례겠지. 내가 숨긴 것의 값을 치를 차례.)',K),
          "— 제15장 「빛 없는 땅」 완료 —",
          "등대에 불이 들어 마을이 조금 밝아졌다. 마을 동쪽으로 골짜기 가는 길이 열렸다." ].filter(Boolean),
          ()=>{ storyFlags.ch15done=true; saveGame(); }); }); }); },

  /* ================= 제16장 「모습을 잃은 자들」 ================= */
  ev_garn_meet:()=>{ if(storyFlags.garnMet) return; storyFlags.garnMet=true;
    showMsg([
      "— 제16장 「모습을 잃은 자들」 —",
      "발 앞에 화살 한 대가 꽂힌다. 깃은 — 코르의 것과 같은 매의 깃.",
      say('코르','…형.',C),
      say('가른','거기까지다. 이 골짜기 아래엔 이름을 잊은 자들이 모여 있다. 검 든 손님은 받지 않는다.',GARN),
      say('코르','5년이야. 5년을 찾았어. 쐐기 앞에서 그림자로 녹아 사라지고는 — 이번에도 그 말부터 해?',C),
      storyFlags.p3Child==='share' ? say('테리','우린 이제 알아. 저들이 사람이라는 걸. 베러 온 게 아니야.',T) : say('테리','…알아. 저들이 사람이라는 걸. 늦게 알았지만.',T),
      say('가른','(활을 내린다) …남쪽 등대에 불이 든 걸 봤다. 너희가 한 일이냐.',GARN),
      say('가른','따라와라. 내가 왜 저쪽 활을 들었는지, 말로는 못 한다. 보여 주마.',GARN),
      "가른을 따라 동쪽 끝으로 가자." ], ()=>{ saveGame(); }); },

  ev_rest_enter:()=>{ if(storyFlags.garnJoined) return; storyFlags.garnJoined=true; joinMember('가른');
    showMsg([
      "벼랑에 기대어 지은 쉼터. 등불은 단 하나 — 그 둘레에, 윤곽조차 흐려진 그림자들이 겹겹이 앉아 있다.",
      say('가른','이름을 잊은 자들이다. 마을에서도 받아 주지 못한다. 불빛에서 떨어지면 들판을 헤매다 균열로 흘러간다.',GARN),
      say('가른','5년 전에 내가 쫓던 그림자도 그랬다. 따라와 보니 이 등불 앞에서 쓰러지더군. 제 아이 이름을 부르면서.',GARN),
      say('코르','…그래서 안 돌아온 거야? 편지 한 장 없이.',C),
      say('가른','돌아가면 다시 쏴야 했다. 넘어오는 것마다. 그럴 바엔 이쪽에서 불을 지키는 편이 나았다.',GARN),
      say('카엘','이 등불의 빛… 쐐기에서 온 거군. 네 개의 쐐기가 우리 쪽 빛을 끌어다, 이런 곳에 대고 있었어.',K),
      say('가른','그래. 그걸 너희가 뽑았지. 원망은 않는다 — 너희 마을도 말라 가고 있었으니까. 다만 그날부터 이 불은 줄고 있다.',GARN),
      say('가른','불이 줄자 밑바닥의 것들이 뭉치기 시작했다. 이름도 얼굴도 없는 것들이 한 덩이가 되어, 마지막 불빛을 향해 기어오른다.',GARN),
      say('가른','저게 여기 닿으면 이 사람들까지 삼켜진다. 혼자서는 못 막는다. …코르. 활을 빌려 다오.',GARN),
      say('코르','빌려주는 거야. 준 게 아니고. 끝나면 5년 치 얘기를 다 들을 거니까.',C),
      "가른이 동료가 되었다! 이 장에서는 다섯 명이 함께 싸운다.  "+skillNames('가른'),
      "쉼터 남쪽 ▣ 으로 내려가면 골짜기 밑바닥이다. 제단 ✦ 과 빛 줍는 이 ◇ 도 있다." ], ()=>{ saveGame(); }); },

  ev_deep_enter:()=>{ if(storyFlags.deepEntered) return; storyFlags.deepEntered=true;
    showMsg([
      "골짜기 밑바닥 — 벼랑길이 갈지자로 꺾이며 내려간다. 아래에서, 수십 명이 한꺼번에 중얼거리는 소리가 올라온다.",
      say('가른','층마다 끝까지 걸어야 다음 층으로 내려간다. 막다른 끝의 옛 장치(○) 둘을 눌러야 맨 아래 문(▦)이 열린다.',GARN),
      say('코르','…형은 여길 혼자 오르내린 거야?',C),
      say('가른','매일.',GARN) ]); },

  ev_throng:()=>{ if(storyFlags.ch16done) return; if(storyFlags.throngDown){ runEvent('ev_throng_after'); return; } // 이긴 뒤 전직을 고르기 전에 꺼졌다면 이어서
    showMsg([
      "밑바닥. 그림자들이 서로 엉겨, 집채만 한 덩이가 되어 벼랑을 긁고 있다.",
      "덩이 속에서 얼굴들이 떠올랐다 가라앉는다. 하나같이 위쪽 — 쉼터의 불빛을 보고 있다.",
      say('미아','저 안에… 전부 사람이에요. 몇 명인지도 모르겠어요.',M),
      say('코르','어딜 쏴야 해, 형. 급소가 없어.',C),
      say('가른','없다. 그래서 5년을 못 쐈다. …오늘은 쏜다. 엉긴 데를 풀어 놓기만 해라. 죽이는 게 아니다.',GARN) ],
      ()=>{ startBattle(['throng','faceless','faceless'],true,{onWin:'ev_throng_after'}); }); },

  ev_throng_after:()=>{ storyFlags.throngDown=true; saveGame();
    showMsg([
      "덩이가 풀린다. 엉겨 있던 그림자들이 하나씩 떨어져 나와, 바닥에 주저앉는다.",
      "가른이 한쪽 무릎을 꿇는다. 활을 쥔 팔이 덩이에 스쳐, 윤곽을 잃었다.",
      say('코르','형, 팔이—!',C),
      say('가른','괜찮다. 불 옆에 있으면 돌아온다. …당분간 시위는 못 당기겠지만.',GARN),
      say('가른','코르. 너는 5년 동안 무엇을 겨눴느냐.',GARN),
      say('코르','…형을 데려간 그림자. 그놈만 맞히면 다 끝날 줄 알았어.',C),
      say('코르','근데 그 그림자는, 여기서 제 아이 이름을 부르다 쓰러졌다며. 난 5년을 없는 과녁에 겨눈 거야.',C),
      say('미아','코르…',M),
      say('코르','됐어. 이제 뭘 겨눌지는 내가 정해.',C) ],
      ()=>{ openJobPick('코르',(id,got)=>{
        const line = id==='sniper' ? say('코르','한 발이면 돼. 꼭 맞혀야 하는 것 하나만 겨눈다. 다시는 엉뚱한 걸 쏘지 않게.',C)
                   : id==='ranger' ? say('코르','한자리에 서서 겨누는 건 그만둘래. 형처럼 뛰어다니면서, 닿는 데까지 다 막을 거야.',C)
                   : say('코르','…가자.',C);
        const left=leaveMember('가른');
        showMsg([ line,
          id ? '코르는 「'+jobName(party.find(q=>q.name==='코르'))+'」(으)로 전직했다!  '+(got||[]).join(' · ') : '',
          say('가른','…좋은 눈이 됐구나. 나는 여기 남는다. 이 팔이 돌아올 때까지는 불이나 지키마.',GARN),
          say('가른','골짜기를 벗어나 동쪽으로 더 가면 등불 도시가 있다. 로완이 거기 있다 — 미아, 네 신전에서 쫓겨난 그 사제다.',GARN),
          say('미아','(…서리의 사도. 저에게 「덮지 마라」 하신 분.)',M),
          say('코르','형. 다 끝나면 데리러 올게. 이번엔 내가 찾으러 오는 거니까, 어디 가지 마.',C),
          left ? "가른이 파티를 떠났다. (끼워 준 장비는 가방으로 돌아왔다)" : '',
          "— 제16장 「모습을 잃은 자들」 완료 —",
          "밑바닥의 그림자들이 쉼터로 올라와 불 곁에 앉았다. 등불 도시로 가는 길은 다음 이야기에서 이어진다." ].filter(Boolean),
          ()=>{ storyFlags.ch16done=true; saveGame(); }); }); }); },

  /* ================= 제17장 「등불 도시」 ================= */
  ev_city_enter:()=>{ if(storyFlags.cityEntered) return; storyFlags.cityEntered=true;
    showMsg([
      "— 제17장 「등불 도시」 —",
      "언덕을 넘자 눈이 부시다. 도시 한가운데 탑 꼭대기에, 저편에 와서 처음 보는 큰 불 — 「대등」이 타고 있다.",
      "거리의 사람들은 그림자가 아니다. 얼굴이 있고, 웃고, 값을 흥정한다.",
      say('코르','…여긴 멀쩡하네. 빛이 모자란 땅 맞아?',C),
      say('로완','멀쩡해 보이도록 하고 있는 거다.',ROWAN),
      "사제복의 사내 — 얼음 묘지에서 눈처럼 흩어졌던, 서리의 사도다.",
      say('미아','…로완 님. 살아 계셨군요.',M),
      say('로완','군주께서 빛을 나눠 다시 세워 주셨다. 사도는 넷 다 그렇다. …미아, 덮지 말라고 했지. 그 말을 한 내가, 지금 이 도시에서 덮고 있다.',ROWAN),
      say('로완','대등은 거의 꺼졌다. 의회는 거울을 둘러 밝아 보이게만 하고 있지. 알려지면 사람들은 불을 찾아 들판으로 흩어질 테고 — 흩어지면 얼굴을 잃는다.',ROWAN),
      say('로완','게다가 탑 안에 나방 떼가 들었다. 남은 불마저 갉아 먹고 있어. 내 얼음으로는 불까지 꺼뜨릴 판이다. 부탁한다.',ROWAN),
      "도시 남쪽 ▣ 이 대등탑이다. 상인 ◇ 과 제단 ✦ 도 있다." ], ()=>{ saveGame(); }); },

  ev_tower_enter:()=>{ if(storyFlags.towerEntered) return; storyFlags.towerEntered=true;
    showMsg([
      "대등탑 — 벽마다 거울이 붙어 있다. 그 한가운데를 올려다보면, 불은 촛불만 하다.",
      say('미아','…이렇게 작았다니. 밖에서 본 건 전부 거울빛이었어요.',M),
      say('카엘','장치(○)가 셋. 가지처럼 뻗은 막다른 길 끝마다 하나씩이야. 다 눌러야 동쪽 문(▦)이 열려.',K) ]); },

  /* 보스 → (이김) → 두 번째 선택 → 미아의 전직. 어느 단계에서 꺼져도 그 단계부터 이어진다 */
  ev_queen:()=>{ if(storyFlags.ch17done) return; if(storyFlags.queenDown){ runEvent('ev_queen_after'); return; }
    showMsg([
      "불씨 그릇. 사람 키만 한 불꽃이어야 할 자리에, 촛불만 한 불이 떨고 있다.",
      "그 위에 — 날개를 펼친 거대한 나방이, 불을 품듯 덮고 앉아 있다.",
      say('미아','저것도 빛이 고팠던 거겠죠. 하지만 저 불은, 도시 사람 모두의 얼굴이에요.',M) ],
      ()=>{ startBattle(['mothQueen','mothKin','mothKin'],true,{onWin:'ev_queen_after'}); }); },

  ev_queen_after:()=>{ storyFlags.queenDown=true; saveGame();
    const pick=()=>{ openJobPick('미아',(id,got)=>{
        const line = id==='highpriest' ? say('미아','아는 사람도 모르는 사람도, 제 앞에서는 쓰러지지 않게 할 거예요. 그게 제가 서는 자리예요.',M)
                   : id==='judge' ? say('미아','빛은 고치기만 하는 게 아니었어요. 드러내는 것이기도 해요. 저는 둘 다 하겠어요.',M)
                   : say('미아','…가요.',M);
        showMsg([ line,
          id ? '미아는 「'+jobName(party.find(q=>q.name==='미아'))+'」(으)로 전직했다!  '+(got||[]).join(' · ') : '',
          say('로완','도시 북쪽에, 봉인을 세운 이들의 서고가 있다. 카엘 — 그 문에 새겨진 것은 네 가문의 문장이다.',ROWAN),
          say('카엘','(…알아. 언젠가 와야 했던 곳이야.)',K),
          "— 제17장 「등불 도시」 완료 —",
          "도시 북쪽 ▣ 서고로 가는 문이 열렸다." ].filter(Boolean),
          ()=>{ storyFlags.ch17done=true; saveGame(); }); }); };
    if(storyFlags.p3Truth){ pick(); return; }
    const tell=()=>{ storyFlags.p3Truth='tell'; inventory.wisdomSeed=(inventory.wisdomSeed||0)+2; saveGame(); showMsg([
        "미아가 탑의 종을 친다. 광장에 모인 사람들에게, 불이 얼마나 작아졌는지를 있는 그대로 말한다.",
        "웅성임. 울음. 몇몇은 성문 쪽으로 달린다. 그때 — 한 아이가 제 집 등불을 들고 탑으로 걸어온다.",
        "하나, 둘. 집집의 등불이 탑으로 모인다. 대등이 조금, 아주 조금 커진다.",
        say('미아','덮어서 지키는 평화는, 불이 꺼지는 날 한꺼번에 무너져요. 알고서 같이 버티는 쪽이 더 오래 가요.',M),
        say('로완','…내가 신전에서 하려다 못 한 일을, 네가 여기서 해냈구나.',ROWAN),
        "사람들이 모아 준 「지혜의 열매」 2개를 받았다." ], pick); };
    const hide=()=>{ storyFlags.p3Truth='hide'; gold+=3000; saveGame(); showMsg([
        "미아는 종 줄에서 손을 뗀다. 광장의 사람들은 오늘도 거울빛 아래서 웃고 있다.",
        say('미아','지금 알리면 오늘 밤에 흩어질 거예요. 근원을 되찾을 때까지만… 제가 대신 알고 있을게요.',M),
        say('로완','그 무게는 내가 안다. 오래 들고 있으면 사람이 언다. 너는 얼지 마라.',ROWAN),
        say('미아','(…원장님도, 이런 마음이셨을까.)',M),
        "의회가 사례로 ◆3000 을 건넸다." ], pick); };
    askMsg([
      "여왕나방이 재가 되어 흩어진다. 불씨는 남았다. 여전히, 촛불만 하다.",
      say('로완','…막았군. 하지만 보았을 거다. 이것이 이 도시의 전부다.',ROWAN),
      say('로완','나는 신전에서 진실을 말하다 쫓겨났고, 여기서는 진실을 덮어 사람을 살리고 있다. 어느 쪽이 옳았는지, 이제는 나도 모르겠다.',ROWAN),
      say('로완','미아. 너라면 어찌하겠느냐.',ROWAN) ],'도시에 알린다','덮어 둔다',tell,hide); },

  /* ================= 제18장 「선조들의 서고」 ================= */
  ev_arch_enter:()=>{ if(storyFlags.archEntered) return; storyFlags.archEntered=true;
    showMsg([
      "— 제18장 「선조들의 서고」 —",
      "문 위에 새겨진 문장 — 카엘의 지팡이 머리에 달린 것과 같은, 별과 고리.",
      say('카엘','우리 가문의 서고야. 봉인을 「관리」해 온 집안의. …이쪽 땅에 있을 줄은 몰랐지만.',K),
      say('테리','이쪽에? 봉인은 우리 쪽에 있잖아.',T),
      say('카엘','그러니까. 왜 열쇠 쥔 집의 서고가, 자물쇠 반대편에 있을까.',K),
      "기록실은 동쪽 끝이다." ], ()=>{ saveGame(); }); },

  ev_arch_lore:()=>{ if(storyFlags.archLore) return; storyFlags.archLore=true;
    showMsg([
      "서가 끝의 석판. 카엘이 먼지를 쓸고 읽는다.",
      say('카엘','「근원이 기울어 두 땅을 다 밝히지 못하게 된 해에, 저편의 왕과 이편의 현자가 약속하였다.」',K),
      say('카엘','「빛을 세 그릇에 모아 한 땅씩 번갈아 밝힌다. 그릇은 왕이 빚고, 열쇠는 현자의 집이 맡는다. 서른 해마다 문을 연다.」',K),
      say('코르','번갈아? 그럼 봉인은 가두는 게 아니라… 돌려 가며 쓰는 그릇이었다는 거야?',C),
      say('카엘','그 「왕」이 그림자 군주야. 봉인을 처음 세운 건 자기라고 했지. 그리고 「현자의 집」이 — 내 가문.',K),
      say('미아','서른 해마다 연다면서요. 그런데 저편은…',M),
      say('카엘','한 번도 안 열었어. 기록이 여기서 끊겨. 첫 차례가 왔을 때, 우리 집안은 문을 열지 않은 거야.',K),
      "안쪽 기록실에서, 종이 넘어가는 소리가 난다." ], ()=>{ saveGame(); }); },

  ev_vault_enter:()=>{ if(storyFlags.vaultEntered) return; storyFlags.vaultEntered=true;
    showMsg([
      "봉인 기록실 — 복도가 세 겹이다. 책장마다 같은 문장이 삼백 번쯤 되풀이되어 있다. 「서른 해만 더.」",
      say('카엘','장치(○)는 둘. 가운데 복도는 가시투성이야 — 서두르지 말고 밟아.',K) ]); },

  ev_oath:()=>{ if(storyFlags.ch18done) return; if(storyFlags.oathDown){ runEvent('ev_oath_after'); return; }
    showMsg([
      "기록실 한가운데. 책장에서 흘러나온 글자들이 사람의 모양으로 뭉친다. 별과 고리의 문장을 가슴에 달고.",
      say('첫 관리인의 서약','열쇠를 쥔 자여. 문을 열러 왔느냐, 닫으러 왔느냐.',OATH),
      say('카엘','…첫 관리인. 내 선조가 남긴 서약이야.',K),
      say('첫 관리인의 서약','우리는 열지 않았다. 열면 이편의 아이들이 어두워진다. 서른 해만, 서른 해만 더 — 그렇게 삼백 해를 미뤘다.',OATH),
      say('카엘','그 빚을 저편 사람들이 얼굴로 갚았어. 비켜. 당신이 못 연 문, 내가 열 거야.',K) ],
      ()=>{ startBattle(['oathEcho','quillShade','quillShade'],true,{onWin:'ev_oath_after'}); }); },

  ev_oath_after:()=>{ storyFlags.oathDown=true; saveGame();
    showMsg([
      "글자들이 흩어져 책장으로 돌아간다. 마지막 한 줄이 카엘의 손바닥에 내려앉는다.",
      "「열쇠는 현자의 피에 있다. 그릇은 열쇠 쥔 자의 뜻으로만 열리고, 닫힌다.」",
      say('카엘','…그래서 석 달 전에 봉인이 다시 섰던 거야. 내가 거기 있었으니까. 내가 닫은 거야, 또 한 번.',K),
      say('테리','몰랐잖아.',T),
      say('카엘','절반은 알았어. 저편에 사람이 있다는 것도. 모른 척한 값이 삼백 해 치 쌓였는데, 「몰랐다」로는 못 갚아.',K),
      say('카엘','갚는 방법은, 내가 고른다.',K) ],
      ()=>{ openJobPick('카엘',(id,got)=>{
        const line = id==='archsage' ? say('카엘','전부 알아야겠어. 숨긴 것도, 숨겨진 것도. 다시는 「몰랐다」고 말하지 않게.',K)
                   : id==='shadowmage' ? say('카엘','저편의 어둠을 내 몸으로 배우겠어. 삼백 해 동안 그들이 견딘 걸, 나도 알아야 하니까.',K)
                   : say('카엘','…가자.',K);
        showMsg([ line,
          id ? '카엘은 「'+jobName(party.find(q=>q.name==='카엘'))+'」(으)로 전직했다!  '+(got||[]).join(' · ') : '',
          say('코르','이걸로 넷 다 정했네. 뭘 위해 싸울지.',C),
          "서고 밖, 동쪽 하늘 아래 검은 성이 보인다. 군주의 성이다. 그 앞뜰에 — 네 개의 그림자가 서 있다.",
          "— 제18장 「선조들의 서고」 완료 —",
          "군주의 성으로 가는 길은 다음 이야기에서 이어진다." ].filter(Boolean),
          ()=>{ storyFlags.ch18done=true; saveGame(); }); }); }); },
},


/* ================= 1차 전직 =================
   base = 처음 직업(무기·그림·장비 제한은 그대로). bonus = 전직하는 순간 오르는 능력치. grow = 그 뒤 레벨당 성장.
   직업 기술·특성은 아래 learn[직업 id]. lv:0 = 전직하자마자 */
jobs:{
  guardian:   {base:'검사',  name:'수호기사',   col:'#ffe9a8', role:'앞에 서서 대신 맞고 버틴다',       bonus:{hp:40,def:8,atk:4},        grow:{hp:10,mp:2,atk:2,def:3,mag:1,spd:1}},
  blademaster:{base:'검사',  name:'검호',       col:'#ff9a6a', role:'치명타와 연속 베기로 몰아친다',     bonus:{atk:14,spd:4},        grow:{hp:7,mp:3,atk:3,def:1,mag:1,spd:2}},
  archsage:   {base:'주술사',name:'대현자',     col:'#9fd0ff', role:'약점을 골라 찌르고 한 방을 모은다', bonus:{mag:11,mp:20},        grow:{hp:6,mp:5,atk:1,def:1,mag:3,spd:1}},
  shadowmage: {base:'주술사',name:'그림자술사', col:'#b98cff', role:'적을 약하게 만들고 생명을 빼앗는다', bonus:{mag:9,hp:25},        grow:{hp:8,mp:3,atk:1,def:2,mag:3,spd:1}},
  highpriest: {base:'치유사',name:'대사제',     col:'#9fe8c4', role:'더 크게 고치고 아무도 쓰러지지 않게 한다', bonus:{mp:25,mag:5,def:3}, grow:{hp:7,mp:5,atk:1,def:2,mag:2,spd:1}},
  judge:      {base:'치유사',name:'심판관',     col:'#fff3b8', role:'빛으로 치면서 그 힘으로 고친다',     bonus:{mag:11,spd:3},        grow:{hp:6,mp:4,atk:1,def:1,mag:3,spd:2}},
  sniper:     {base:'궁수',  name:'저격수',     col:'#f0c27a', role:'한 발에 모든 것을 건다',           bonus:{atk:14},              grow:{hp:6,mp:3,atk:3,def:1,mag:1,spd:2}},
  ranger:     {base:'궁수',  name:'유격수',     col:'#8fdc6e', role:'빠르게 여러 번 쏘고 적을 묶는다',   bonus:{spd:8,atk:9},        grow:{hp:7,mp:2,atk:2,def:1,mag:1,spd:4}},
},

traits:{
  cover:  {name:'수호',     desc:'적의 단일 공격을 30% 확률로 대신 끌어온다'},
  keen:   {name:'예리함',   desc:'치명타 확률 +15%, 치명타 피해가 1.5배 대신 1.9배'},
  attune: {name:'원소 조율',desc:'내성이 있는 적에게도 피해가 줄지 않는다'},
  siphon: {name:'흡수의 술',desc:'공격 마법으로 준 피해의 15%만큼 HP 회복'},
  grace:  {name:'은총',     desc:'회복량 +15%, 회복 기술이 상태이상도 푼다'},
  zeal:   {name:'단죄의 빛',desc:'공격 마법으로 준 피해의 25%만큼 가장 약한 아군 회복'},
  deadeye:{name:'매의 눈',  desc:'HP가 가득한 적에게 주는 피해 1.5배'},
  twice:  {name:'연사',     desc:'평타가 30% 확률로 한 번 더 나간다'},
},

skills:{
  /* 가른(임시 동료) */
  garnVolley:{name:'사도의 연사',  fx:'rain',  el:'arrow',mp:7, kind:'phys',power:1.3,hits:3,target:'enemy',msg:'의 연사!',desc:'단일 ×1.3 3회'},
  garnPierce:{name:'꿰뚫는 화살',  fx:'pierce',el:'arrow',mp:9, kind:'phys',power:3.2,pen:0.5,target:'enemy',msg:'의 꿰뚫는 화살!',desc:'단일 ×3.2 방어 절반 무시'},
  garnMark:  {name:'급소 짚기',    fx:'pierce',el:'arrow',mp:6, kind:'phys',power:1.4,mark:4,target:'enemy',msg:'의 급소 짚기!',desc:'단일 ×1.4 +표식(받는 피해↑)'},
  /* 수호기사 */
  shieldBash:{name:'방패 강타',  fx:'heavy',el:'holy',mp:6, kind:'phys',power:2.4,stun:0.5,target:'enemy',msg:'의 방패 강타!',desc:'단일 빛 ×2.4 +기절 50%'},
  aegis:     {name:'수호의 맹세',mp:10,kind:'buff',buff:'veil',turns:4,target:'allAllies',msg:'의 수호의 맹세!',note:'전원이 받는 피해가 줄어든다',desc:'아군 전체 피해↓ 3턴'},
  holyBlade: {name:'성광참',     fx:'crush',el:'holy',mp:12,kind:'phys',power:3.4,selfHeal:0.1,target:'enemy',msg:'의 성광참!',desc:'단일 빛 ×3.4 +자신 회복'},
  /* 검호 */
  tripleSlash:{name:'삼연참',    fx:'double',mp:8, kind:'phys',power:1.35,hits:3,target:'enemy',msg:'의 삼연참!',desc:'단일 ×1.35 3회'},
  crescent:  {name:'초승달 베기',fx:'wide',  mp:14,kind:'phys',power:2.1,target:'allEnemies',msg:'의 초승달 베기!',desc:'전체 ×2.1'},
  iai:       {name:'일섬',       fx:'crush', mp:15,kind:'phys',power:3.0,pri:1,sure:1,target:'enemy',msg:'의 일섬!',desc:'단일 ×3 선제·확정 치명'},
  /* 대현자 */
  prism:     {name:'삼원소탄',   fx:'judgment',el:'tri',mp:10,kind:'magic',power:4.6,target:'enemy',msg:'의 삼원소탄!',desc:'단일 ×4.6 약점 자동'},
  focus:     {name:'마력 집중',  mp:5, kind:'buff',buff:'focus',turns:1,target:'self',msg:'의 마력 집중!',note:'다음 공격 마법이 크게 강해진다',desc:'다음 공격 마법 3배'},
  meteor:    {name:'유성우',     fx:'firestorm',el:'fire',mp:20,kind:'magic',power:2.9,target:'allEnemies',msg:'의 유성우!',desc:'전체 불 ×2.9'},
  /* 그림자술사 */
  shadowLance:{name:'그림자 창', fx:'ice',  el:'dark',mp:9, kind:'magic',power:4.8,weaken:3,target:'enemy',msg:'의 그림자 창!',desc:'단일 어둠 ×4.8 +약화'},
  lifeDrain: {name:'생명 흡수',  fx:'staff',el:'dark',mp:10,kind:'magic',power:3.4,leech:0.5,target:'enemy',msg:'의 생명 흡수!',desc:'단일 어둠 ×3.4 +HP 흡수'},
  doom:      {name:'저주의 장막',mp:14,kind:'debuff',debuff:['sapT','weakT'],turns:4,target:'allEnemies',msg:'의 저주의 장막!',note:'적 전체가 쇠약해지고 약해진다',desc:'적 전체 공격↓·약화 3턴'},
  /* 대사제 */
  renew:     {name:'재생의 기도',mp:12,kind:'buff',buff:'regenT',turns:4,target:'allAllies',msg:'의 재생의 기도!',note:'전원이 매 턴 회복한다',desc:'아군 전체 턴마다 회복'},
  fullRevive:{name:'완전 소생',  fx:'revive',mp:20,kind:'revive',power:1.0,target:'allyDead',msg:'의 완전 소생!',desc:'쓰러진 아군 HP 가득 소생'},
  sanctuary: {name:'성역',       fx:'veil',mp:24,kind:'healAll',power:4.6,veil:3,target:'allAllies',msg:'의 성역!',desc:'아군 전체 대회복 +장막'},
  /* 심판관 */
  smite:     {name:'심판의 빛',  fx:'judgment',el:'holy',mp:8, kind:'magic',power:3.2,target:'enemy',msg:'의 심판의 빛!',desc:'단일 빛 ×3.2'},
  verdict:   {name:'단죄',       fx:'bolt',el:'holy',mp:12,kind:'magic',power:2.2,stun:0.4,mark:4,target:'enemy',msg:'의 단죄!',desc:'단일 빛 ×2.2 +기절·표식'},
  radiance:  {name:'광휘',       fx:'bolt',el:'holy',mp:15,kind:'magic',power:2.3,target:'allEnemies',msg:'의 광휘!',desc:'전체 빛 ×2.3'},
  /* 저격수 */
  aimed:     {name:'조준 사격',  fx:'pierce',el:'arrow',mp:10,kind:'phys',power:3.8,pen:0.5,target:'enemy',msg:'의 조준 사격!',desc:'단일 ×3.8 방어 절반 무시'},
  headshot:  {name:'급소 저격',  fx:'pierce',el:'arrow',mp:12,kind:'phys',power:3.2,sure:1,target:'enemy',msg:'의 급소 저격!',desc:'단일 ×3.2 확정 치명'},
  execShot:  {name:'처형 사격',  fx:'pierce',el:'arrow',mp:14,kind:'phys',power:3.0,exec:0.3,target:'enemy',msg:'의 처형 사격!',desc:'단일 ×3 빈사 적 2배'},
  /* 유격수 */
  volley:    {name:'연속 사격',  fx:'rain', el:'arrow',mp:10,kind:'phys',power:1.35,hits:4,target:'enemy',msg:'의 연속 사격!',desc:'단일 ×1.35 4회'},
  snare:     {name:'덫 놓기',    fx:'venom',el:'arrow',mp:12,kind:'phys',power:1.5,poison:3,stun:0.45,target:'allEnemies',msg:'의 덫!',desc:'전체 ×1.5 +독·기절'},
  windGrace: {name:'바람의 가호',mp:12,kind:'buff',buff:'evadeT',turns:4,target:'allAllies',msg:'의 바람의 가호!',note:'전원이 적의 평타를 피하기 쉬워진다',desc:'아군 전체 회피↑ 3턴'},
},

learn:{
  garn:       [{lv:1,trait:'twice'},  {lv:1,id:'garnPierce'}, {lv:1,id:'garnMark'}],
  guardian:   [{lv:0,trait:'cover'},  {lv:0,id:'shieldBash'}, {lv:26,id:'aegis'},     {lv:29,id:'holyBlade'}],
  blademaster:[{lv:0,trait:'keen'},   {lv:0,id:'tripleSlash'},{lv:26,id:'crescent'},  {lv:29,id:'iai'}],
  archsage:   [{lv:0,trait:'attune'}, {lv:0,id:'prism'},      {lv:26,id:'focus'},     {lv:29,id:'meteor'}],
  shadowmage: [{lv:0,trait:'siphon'}, {lv:0,id:'shadowLance'},{lv:26,id:'lifeDrain'}, {lv:29,id:'doom'}],
  highpriest: [{lv:0,trait:'grace'},  {lv:0,id:'renew'},      {lv:26,id:'fullRevive'},{lv:29,id:'sanctuary'}],
  judge:      [{lv:0,trait:'zeal'},   {lv:0,id:'smite'},      {lv:26,id:'verdict'},   {lv:29,id:'radiance'}],
  sniper:     [{lv:0,trait:'deadeye'},{lv:0,id:'aimed'},      {lv:26,id:'headshot'},  {lv:29,id:'execShot'}],
  ranger:     [{lv:0,trait:'twice'},  {lv:0,id:'volley'},     {lv:26,id:'snare'},     {lv:29,id:'windGrace'}],
},
});
})();
