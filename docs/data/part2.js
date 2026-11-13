"use strict";
/* ===== 모두의 픽셀모험 — 제2부 「그림자 군주」 콘텐츠 (7~14장) =====
   엔진(index.html)보다 먼저 로드되고, definePart()로 CONTENT 레지스트리에 합쳐진다.
   이벤트 함수는 실행 시점에 엔진의 전역(showMsg, startBattle, storyFlags …)을 사용한다.
   적 그림은 1부 스프라이트를 look/palx(팔레트 덮어쓰기)/big(확대)로 재사용한다. */
(function(){
/* ---- 화자 색 ---- */
const T='#7cc4ff', K='#c79bff', M='#9fe8c4', C='#f0c27a', LORD='#c0708a', GARN='#d8b070', NPC='#d9cdb5';
const say=(n,t,c)=>({n,t,c});

/* ---- 적 능력치: 장(ch)이 오를수록 일정 비율로 강해진다. m = 개체별 배율 ----
   경험치는 '장당 일반 전투 8회 + 보스 = 1레벨' 기준. 보스의 hp/atk/mag 는 전투 시뮬레이션(자동전투, 적정 레벨에서 8~12턴)으로
   맞춘 값을 개체에 직접 적어 덮어쓴다. */
const pw=(b,k)=>Math.pow(b,k);
function reg(ch,m){ m=m||{}; const k=ch-7; return {
  hp:Math.round(230*pw(1.14,k)*(m.hp||1)), atk:Math.round(60*pw(1.085,k)*(m.atk||1)), mag:Math.round(44*pw(1.085,k)*(m.mag||1)),
  def:Math.round((18+2*k)*(m.def||1)), spd:(m.spd||11)+Math.floor(k/2), exp:Math.round(115*pw(1.15,k)*(m.exp||1)), gold:Math.round(60*pw(1.1,k)*(m.gold||1)) }; }
function bos(ch,m){ m=m||{}; const k=ch-7; return {
  hp:Math.round(2400*pw(1.2,k)*(m.hp||1)/10)*10, atk:Math.round(84*pw(1.085,k)*(m.atk||1)), mag:Math.round(72*pw(1.085,k)*(m.mag||1)),
  def:Math.round(22+2*k), spd:(m.spd||10)+Math.floor(k/2), exp:Math.round(800*pw(1.15,k)), gold:Math.round(600*pw(1.1,k)), boss:true }; }

/* ---- 지역 팔레트 ---- */
const PAL={
  town:  { bg:'#140f0c', floor:'#38302a', wall:'#241b14', grass:'#3a5a34', altar:'#2a3a66', boss:'#5a2a3a', chest:'#3a2e1a', detail:'rgba(220,200,160,.10)' },
  forest:{ bg:'#10131f', floor:'#233a2c', wall:'#1b2a22', grass:'#2a5234', altar:'#2a3a66', boss:'#5a2a3a', chest:'#3a2e1a', detail:'rgba(130,180,130,.12)' },
  harbor:{ bg:'#0c1218', floor:'#34383c', wall:'#1c242a', grass:'#2a4a5a', altar:'#2a3a66', boss:'#5a2a3a', chest:'#3a2e1a', detail:'rgba(160,200,220,.10)', roof:'#3a6a8a', roof2:'#32607e' },
  docks: { bg:'#080d12', floor:'#243038', wall:'#141c22', grass:'#1e3444', altar:'#2a3a66', boss:'#3a2a40', chest:'#3a2e1a', detail:'rgba(140,190,220,.09)', rock:'#2a3a48', rock2:'#22323e' },
  dunes: { bg:'#16110a', floor:'#5a4c30', wall:'#3a3020', grass:'#6a5a34', altar:'#2a3a66', boss:'#4a2a2a', chest:'#3a2e1a', detail:'rgba(240,220,160,.10)', rock:'#6a5636', rock2:'#5a482c', tuft:'#a89454' },
  archive:{ bg:'#0e0c08', floor:'#3a3426', wall:'#221e14', grass:'#4a4028', altar:'#2a3a66', boss:'#3a2a40', chest:'#3a2e1a', detail:'rgba(230,210,150,.09)', rock:'#4a4030', rock2:'#403626' },
  canyon:{ bg:'#140a08', floor:'#4a2c24', wall:'#2e1a14', grass:'#5a3428', altar:'#2a3a66', boss:'#4a2a2a', chest:'#3a2e1a', detail:'rgba(240,160,120,.10)', rock:'#6a3428', rock2:'#5a2c22', tuft:'#b0623e' },
  snow:  { bg:'#141a22', floor:'#55606e', wall:'#3a4450', grass:'#6a7888', altar:'#2a3a66', boss:'#4a2a2a', chest:'#3a2e1a', detail:'rgba(255,255,255,.14)', rock:'#aab6c4', rock2:'#96a2b2', tuft:'#e4ecf4' },
  abbey: { bg:'#10141a', floor:'#4a5260', wall:'#2a303a', grass:'#5a6878', altar:'#2a3a66', boss:'#5a2a3a', chest:'#3a2e1a', detail:'rgba(230,240,255,.10)', roof:'#8a94a8', roof2:'#7a8498' },
  crypt: { bg:'#080c12', floor:'#2a3442', wall:'#161e2a', grass:'#2c3c52', altar:'#2a3a66', boss:'#3a2a40', chest:'#3a2e1a', detail:'rgba(170,210,255,.10)', rock:'#3a4a5e', rock2:'#324052' },
  capital:{ bg:'#120f0a', floor:'#3e3a34', wall:'#26201a', grass:'#3a5a34', altar:'#2a3a66', boss:'#5a2a3a', chest:'#3a2e1a', detail:'rgba(240,220,170,.10)', roof:'#a8843a', roof2:'#96742e' },
  palace:{ bg:'#0c0a12', floor:'#2e2838', wall:'#1a1624', grass:'#3a2e52', altar:'#2a3a66', boss:'#3a2a40', chest:'#3a2e1a', detail:'rgba(200,170,240,.10)', rock:'#4a3a5e', rock2:'#40324f' },
  sealgrove:{ bg:'#0a0e12', floor:'#1c2a26', wall:'#141e1c', grass:'#243e34', altar:'#2a3a66', boss:'#5a2a3a', chest:'#3a2e1a', detail:'rgba(120,160,150,.10)', tree:'#24403a', tree2:'#1e3632', treeTop:'#2c5046', tuft:'#3a6a58' },
  rift:  { bg:'#0c0608', floor:'#241820', wall:'#160b12', grass:'#3a1c22', altar:'#2a3a66', boss:'#4a1a28', chest:'#3a2e1a', detail:'rgba(224,90,80,.10)' },
};

definePart(2, {
/* ================= 스킬·아이템·장비 ================= */
skills:{
  crush:    {name:'분쇄격',  mp:8, kind:'phys', power:2.6,target:'enemy',msg:'의 분쇄격!'},
  whirl:    {name:'회전참',  mp:12,kind:'phys', power:1.5,target:'allEnemies',msg:'의 회전참!'},
  firestorm:{name:'화염폭풍',mp:14,kind:'magic',power:2.0,target:'allEnemies',msg:'의 화염폭풍!'},
  judgment: {name:'심판뢰',  mp:13,kind:'magic',power:3.8,target:'enemy',msg:'의 심판뢰!'},
  greatHeal:{name:'대치유',  mp:9, kind:'heal', power:5.0,target:'ally',msg:'의 대치유!'},
  lightVeil:{name:'빛의장막',mp:16,kind:'healAll',power:3.4,target:'allAllies',msg:'의 빛의 장막!'},
  pierce:   {name:'관통사격',mp:6, kind:'phys', power:2.3,target:'enemy',msg:'의 관통사격!'},
  arrowRain:{name:'화살비',  mp:10,kind:'phys', power:1.4,target:'allEnemies',msg:'의 화살비!'},
},
/* 레벨업 스킬 습득 */
learn:{
  '검사':  [{lv:15,id:'crush'},{lv:19,id:'whirl'}],
  '주술사':[{lv:15,id:'firestorm'},{lv:19,id:'judgment'}],
  '치유사':[{lv:15,id:'greatHeal'},{lv:19,id:'lightVeil'}],
  '궁수':  [{lv:15,id:'pierce'},{lv:19,id:'arrowRain'}],
},
items:{
  hiPotion:{name:'상급 물약',hp:160,price:60},
  hiEther: {name:'상급 마나약',mp:70,price:90},
},
equip:{
  /* 5단계(룬·별빛) — 살레나 항 */
  runeSword:{name:'룬검',        slot:'weapon',cls:['검사'],atk:26,price:600},
  starStaff:{name:'별빛 지팡이', slot:'weapon',cls:['주술사','치유사'],mag:26,price:600},
  galeBow:  {name:'질풍궁',      slot:'weapon',cls:['궁수'],atk:26,price:600},
  runeMail: {name:'룬 사슬갑옷', slot:'armor',def:15,price:520},
  runeHelm: {name:'룬 투구',     slot:'head',def:8,price:360},
  runeGauntlet:{name:'룬 건틀릿',slot:'hands',def:5,atk:3,price:360},
  starRobe: {name:'별빛 로브',   slot:'armor',def:12,mag:7,price:650},
  starCirclet:{name:'별빛 서클릿',slot:'head',mag:6,def:3,price:420},
  stormBoots:{name:'폭풍 부츠',  slot:'feet',spd:7,def:2,price:380},
  /* 6단계(여명) — 왕도 아르센 */
  dawnSword:{name:'여명검',      slot:'weapon',cls:['검사'],atk:33,price:1000},
  dawnStaff:{name:'여명의 지팡이',slot:'weapon',cls:['주술사','치유사'],mag:33,price:1000},
  dawnBow:  {name:'여명궁',      slot:'weapon',cls:['궁수'],atk:33,price:1000},
  dawnPlate:{name:'여명 판금갑옷',slot:'armor',def:21,price:900},
  heroRing: {name:'용사의 반지', slot:'ring',atk:6,price:520},
  aegisRing:{name:'방벽의 반지', slot:'ring',def:6,price:520},
  archRing: {name:'대현자의 반지',slot:'ring',mag:6,price:520},
  zephyrRing:{name:'서풍의 반지',slot:'ring',spd:6,price:520},
},

/* ================= 적 ================= */
enemies:{
  /* 7장 옛 대로 */
  p2wolf:  {name:'쐐기 늑대',   ...reg(7,{hp:.9,spd:13}),  color:'#7a5a9a',look:'wolf',palx:{f:'#7a5a9a',F:'#54407a',l:'#a88ac8'}},
  p2scout: {name:'그림자 척후', ...reg(7,{atk:1.05}),      color:'#5a5070',look:'raider',palx:{b:'#5a5070',B:'#3e3652',e:'#c79bff'}},
  p2bat:   {name:'재의 박쥐',   ...reg(7,{hp:.75,spd:15}), color:'#8a8a94',look:'bat',palx:{b:'#8a8a94',B:'#5e5e68',l:'#c0c0cc'}},
  wedgeguard:{name:'쐐기 파수대장',...bos(7,{hp:.8}), hp:1920,atk:63,mag:54,      color:'#6a5a8a',look:'warden',palx:{a:'#6a5a8a',A:'#483e62',l:'#9a8ac0',e:'#c79bff'}},
  /* 8장 살레나 부두 */
  tideSlime:{name:'조수 슬라임',...reg(8,{hp:1.1,spd:8}),  color:'#4a8ac0',look:'slime',palx:{g:'#4a8ac0',G:'#346a9a',l:'#bfe0ff'},aiPoison:0.3},
  drowned: {name:'익사한 망령', ...reg(8,{hp:.9,mag:1.1}), color:'#6ab0b0',look:'wraith',palx:{g:'#6ab0b0',G:'#4a8686',l:'#c8f0f0',e:'#ffe9a0'},aiMagic:0.5},
  hullCreeper:{name:'선창 포식귀',...reg(8,{hp:1.2,atk:1.05,spd:9}),color:'#5a7a8a',look:'creeper',palx:{g:'#5a7a8a',G:'#3e5866',l:'#8aaabc'}},
  tidecaller:{name:'조수의 사도',...bos(8), hp:2300,atk:68,mag:59,                color:'#3a6aa0',look:'herald',palx:{p:'#3a6aa0',P:'#284a74',l:'#7ab0e0',e:'#9fe8ff'}},
  /* 9장 모래 바다·기록고 */
  sandGale:{name:'모래 정령',   ...reg(9,{hp:.85,spd:15}), color:'#c8a868',look:'gale',palx:{a:'#c8a868',A:'#96784a',l:'#f0e0b0'}},
  scarab:  {name:'기록고 갑충', ...reg(9,{hp:1.15,def:1.3,spd:8}),color:'#b89a3a',look:'slime',palx:{g:'#b89a3a',G:'#8a7228',l:'#f0e0a0',w:'#fff8e0'}},
  dustShade:{name:'먼지 그림자',...reg(9,{mag:1.1}),       color:'#8a7a5a',look:'shade',palx:{g:'#8a7a5a',G:'#5e5238',e:'#ffe9a0'},aiMagic:0.4},
  archGuard:{name:'기록고 파수상',...reg(9,{hp:1.3,def:1.3,spd:8}),color:'#a89058',look:'sentinel',palx:{g:'#a89058',G:'#786438',l:'#d8c088',e:'#ffe9a0'}},
  archivist:{name:'기록고 수호기',...bos(9), hp:2250,atk:84,mag:72,               color:'#b89a4a',look:'golem',palx:{g:'#b89a4a',G:'#7a6630',l:'#e8d08a',e:'#ffd54a'}},
  /* 10장 붉은 협곡 */
  canyonRaider:{name:'협곡 약탈자',...reg(10,{atk:1.08}),  color:'#9a4a3a',look:'raider',palx:{b:'#9a4a3a',B:'#6e3228',e:'#ffd54a'}},
  emberBat:{name:'불씨 박쥐',   ...reg(10,{hp:.75,spd:16}),color:'#c05a3a',look:'bat',palx:{b:'#c05a3a',B:'#8a3e28',l:'#f0a070',e:'#ffe9a0'}},
  rockBrute:{name:'바위 거수',  ...reg(10,{hp:1.5,atk:1.1,spd:8,exp:1.3}),color:'#8a5a4a',look:'brute',palx:{b:'#8a5a4a',B:'#5e3c30',l:'#b08070'}},
  garnShade:{name:'가른의 그림자',...reg(10,{hp:.9,spd:15}),color:'#6a5a3a',look:'phantom',palx:{p:'#6a5a3a',P:'#463c26',e:'#ffd54a'}},
  garn:    {name:'화살의 사도 가른',...bos(10,{spd:16}), hp:3320,atk:80,mag:69,   color:'#a8843a',look:'raider',big:2,palx:{b:'#3a3040',B:'#262030',s:'#d8b070',e:'#ffd54a',m:'#e8d8a8'}},
  /* 11장 설산·빙고 */
  frostWolf:{name:'서리 늑대',  ...reg(11,{hp:.9,spd:14}), color:'#a8c0d8',look:'wolf',palx:{f:'#a8c0d8',F:'#7a94ae',l:'#e0f0ff',e:'#7fd0ff'}},
  iceWraith:{name:'얼음 망령',  ...reg(11,{mag:1.12}),     color:'#9ad0e8',look:'wraith',palx:{g:'#9ad0e8',G:'#6aa0ba',l:'#e0f8ff',e:'#ffffff'},aiMagic:0.5},
  snowSentinel:{name:'빙결 파수병',...reg(11,{hp:1.3,def:1.3,spd:8}),color:'#8aa8c0',look:'sentinel',palx:{g:'#8aa8c0',G:'#5e7a92',l:'#c0dcf0',e:'#ffffff'}},
  frostApostle:{name:'서리의 사도',...bos(11), hp:3240,atk:87,mag:75,             color:'#7ab0d0',look:'seal2',palx:{g:'#7ab0d0',G:'#4a80a0',e:'#ffffff'}},
  /* 12장 왕궁 지하 */
  royalShade:{name:'왕관의 그림자',...reg(12,{mag:1.1}),   color:'#a88a4a',look:'shade',palx:{g:'#a88a4a',G:'#786030',e:'#ffe9a0'},aiMagic:0.4},
  palaceGuard:{name:'타락한 근위병',...reg(12,{hp:1.3,def:1.25,spd:9}),color:'#7a5aa0',look:'sentinel',palx:{g:'#7a5aa0',G:'#543e74',l:'#b09ad0',e:'#ffd54a'}},
  crownPhantom:{name:'왕좌의 환영',...reg(12,{hp:.9,spd:16}),color:'#8a6ab0',look:'phantom',palx:{p:'#8a6ab0',P:'#5e4680',e:'#ffd54a'}},
  crownApostle:{name:'왕관의 사도',...bos(12), hp:2990,atk:95,mag:81,             color:'#b89a4a',look:'seal1',palx:{g:'#b89a4a',G:'#7a5aa0',e:'#ffffff'}},
  /* 13장 봉인의 숲 */
  wedgeBrute:{name:'쐐기 거수', ...reg(13,{hp:1.5,atk:1.1,spd:8,exp:1.3}),color:'#5a4a7a',look:'brute',palx:{b:'#5a4a7a',B:'#3c3056',l:'#8a7ab0',e:'#c79bff'}},
  nightWolf:{name:'밤의 늑대',  ...reg(13,{hp:.9,spd:15}), color:'#3a3a5a',look:'wolf',palx:{f:'#3a3a5a',F:'#26263e',l:'#6a6a9a',e:'#c79bff'}},
  lostVoice:{name:'잃어버린 목소리',...reg(13,{mag:1.15}), color:'#b0a8d0',look:'wraith',palx:{g:'#b0a8d0',G:'#807aa6',l:'#e8e4ff',e:'#ffb0c0'},aiMagic:0.6},
  lord:    {name:'그림자 군주', hp:999999,atk:420,mag:380,def:60,spd:30,exp:0,gold:0,boss:true,color:'#3a2040',look:'seal3',big:1,palx:{g:'#3a2a4a',G:'#221830',e:'#ff4466'}},
  /* 14장 균열의 문 */
  gateShade:{name:'문의 그림자',...reg(14,{hp:.9,spd:16}), color:'#7a3a5a',look:'phantom',palx:{p:'#7a3a5a',P:'#52263c',e:'#ffb0a0'}},
  riftBrute:{name:'문턱의 거수',...reg(14,{hp:1.5,atk:1.1,spd:8,exp:1.3}),color:'#7a2a3a',look:'brute',palx:{b:'#7a2a3a',B:'#521a26',l:'#b05a6a',e:'#ffd54a'}},
  voidHerald:{name:'전조의 잔재',...reg(14,{mag:1.15}),    color:'#a05a6a',look:'shade',palx:{g:'#a05a6a',G:'#6e3a48',e:'#ff5a6a'},aiMagic:0.5},
  gatekeeper:{name:'문지기 — 군주의 그림자',...bos(14,{hp:1.1}), hp:4260,atk:82,mag:70,color:'#5a3a7a',look:'seal3',palx:{g:'#6a4a8a',G:'#40285a',e:'#ff4466'}},
},

/* ================= 지역 ================= */
areas:{
  arg2:{ name:'아르겐 마을', theme:'town', bgm:'field', hud:'2부 7장', pal:PAL.town,
    src:[ "1111111111111111","1000000000000001","1011100100111101","1000000000000001",
          "1000000000000001","1011000100011001","1000000000003001","1000000000000001",
          "1000000000000001","1111111111111111","1111111111111111" ],
    enc:null, respawn:{x:3,y:3},
    npcs:[
      {x:5,y:3,color:'#b7a98f',name:'촌장',lines:[
        say('촌장','여명이 돌아온 뒤로 밭에 싹이 다시 났다네. 모두 자네들 덕이야.',NPC),
        say('촌장','헌데 동쪽 항구 살레나에서 온 상인이 이상한 말을 하더군. 그쪽 하늘이 다시 어두워진다고.',NPC) ]},
      {x:10,y:4,color:'#d9a0a0',name:'살레나 상인',lines:[
        say('살레나 상인','항구 한복판에 검은 쐐기가 박혔어요. 그 뒤로 등대 불빛까지 빨려 들어가요.',NPC),
        say('살레나 상인','옛 대로(동쪽 ▣)를 따라가면 살레나예요. 길에 마물이 늘었으니 조심하세요.',NPC) ]},
      {x:3,y:7,color:'#f0c27a',name:'상인',glyph:'◇',shop:['potion','ether','revive','mithrilSword','sageStaff','stormBow','plateArmor','chainMail','ironHelm','mageHat','gauntlet','windBoots','powerRing','guardRing','sageRing','swiftRing']} ],
    warps:[ {x:14,y:4,to:'oldroad',tx:2,ty:5,label:'대로'} ] },

  oldroad:{ name:'옛 대로', theme:'forest', bgm:'field', hud:'2부 7장', pal:PAL.forest,
    src:[ "111111111111111111111111","100002200000500002200001","102202200110000002200001","102200000110022000000001",
          "100000000000022000011001","100001100000000000000601","100001100220007000011001","102200000220000000220001",
          "102200700000011000220001","100000000000011000000001","111111111111111111111111" ],
    enc:{ pool:['p2wolf','p2scout','p2bat'], rate:0.2 }, respawn:{x:2,y:5},
    npcs:[], warps:[ {x:1,y:5,to:'arg2',tx:13,ty:4,label:'마을'},
            {x:22,y:5,to:'salena',tx:2,ty:5,label:'살레나',event:'ev_wedge',eventFlag:'ch7done'} ],
    loot:{'12,1':{gold:300,item:'hiPotion'}},
    eventTile:'ev_wedge', eventDone:'ch7done', onEnter:'ev_oldroad_enter' },

  salena:{ name:'살레나 항', theme:'town', bgm:'field', hud:'2부 8장', pal:PAL.harbor,
    src:[ "1111111111111111","1000000000000001","1011100110011101","1000000000000001",
          "1000000000030001","1000000000000001","1011001100110001","1000000000000001",
          "1000000000000001","1111111101111111","1111111111111111" ],
    enc:null, respawn:{x:3,y:5},
    npcs:[
      {x:6,y:3,color:'#8ab0d0',name:'항만 관리',lines:[
        say('항만 관리','쐐기는 부두 창고(남쪽 ▣) 깊숙이 박혀 있소. 그 주변엔 물에서 올라온 것들이 득실거려.',NPC),
        say('항만 관리','쐐기를 지키는 자가 스스로를 "조수의 사도"라 부르더이다.',NPC) ]},
      {x:12,y:7,color:'#d9cdb5',name:'늙은 선원',lines:[
        say('늙은 선원','먼바다에 나가면 말이야, 밤에 수평선 너머로 다른 색 빛이 보일 때가 있어.',NPC),
        say('늙은 선원','젊을 땐 다들 헛것이라 했지. 난 아직도 그게 뭔지 궁금하다네.',NPC) ]},
      {x:3,y:7,color:'#f0c27a',name:'무구상',glyph:'◇',shop:['potion','hiPotion','ether','hiEther','revive','runeSword','starStaff','galeBow','runeMail','runeHelm','runeGauntlet']} ],
    warps:[ {x:1,y:5,to:'oldroad',tx:21,ty:4,label:'대로'},
            {x:8,y:9,to:'docks',tx:2,ty:1,label:'부두'},
            {x:14,y:5,to:'dunes',tx:2,ty:5,label:'사막',need:'ch8done',block:'쐐기가 뿜는 어둠이 동쪽 성문까지 덮고 있다. 먼저 부두 창고의 쐐기를 뽑아야 한다.'} ],
    onEnter:'ev_salena_enter' },

  docks:{ name:'부두 창고', theme:'temple', bgm:'field', hud:'2부 8장', pal:PAL.docks,
    src:[ "1111111111111111","1000002200000051","1011102200111101","1000000000000001",
          "1022011811022001","1022000000022081","1111111191111111","1000700000070001",
          "1022000000002201","1500000060000001","1111111111111111" ],
    enc:{ pool:['tideSlime','drowned','hullCreeper'], rate:0.24 }, respawn:{x:2,y:1},
    npcs:[], warps:[ {x:1,y:1,to:'salena',tx:8,ty:8,label:'항구'} ],
    loot:{'14,1':{item:'starCirclet'},'1,9':{gold:500,item:'hiEther'}},
    eventTile:'ev_tide', eventDone:'ch8done', onEnter:'ev_docks_enter' },

  dunes:{ name:'모래 바다', theme:'ash', bgm:'field', hud:'2부 9장', pal:PAL.dunes,
    src:[ "111111111111111111111111","100000000000000002200001","102201100001100002200001","102201100001100000000501",
          "100000000220000011000001","100000000220007011000001","101100000000000000002201","101100220001100000002201",
          "100000220001100220000001","100000000000000220000001","111111111111111111111111" ],
    enc:{ pool:['sandGale','scarab','dustShade'], rate:0.2 }, respawn:{x:2,y:5},
    npcs:[], warps:[ {x:1,y:5,to:'salena',tx:13,ty:5,label:'살레나'},
            {x:12,y:1,to:'archive',tx:2,ty:1,label:'기록고'},
            {x:22,y:5,to:'canyon',tx:2,ty:5,label:'협곡',need:'ch9done',block:'모래 폭풍이 길을 지운다. 폭풍의 근원은 기록고(북쪽 ▣) 안에 있는 듯하다.'} ],
    loot:{'21,3':{item:'stormBoots'}},
    onEnter:'ev_dunes_enter' },

  archive:{ name:'모래의 기록고', theme:'temple', bgm:'field', hud:'2부 9장', pal:PAL.archive,
    src:[ "1111111111111111","1000000100000051","1022080100220001","1022000100220001",
          "1000000000000001","1011100700111081","1111191111111111","1000000000000001",
          "1022007007002201","1500000060000001","1111111111111111" ],
    enc:{ pool:['scarab','dustShade','archGuard'], rate:0.24 }, respawn:{x:2,y:1},
    npcs:[
      {x:13,y:7,color:'#c8b070',name:'기록판',lines:[
        "기록판: 『하늘 바다에서 떨어진 빛은 하나가 아니었다.』",
        "기록판: 『우리는 그중 하나를 찾았고, 여명이라 불렀다.』" ]} ],
    warps:[ {x:1,y:1,to:'dunes',tx:11,ty:1,label:'사막'} ],
    loot:{'14,1':{item:'archRing'},'1,9':{gold:600,item:'hiPotion'}},
    eventTile:'ev_archivist', eventDone:'ch9done', onEnter:'ev_archive_enter' },

  canyon:{ name:'붉은 협곡', theme:'ash', bgm:'field', hud:'2부 10장', pal:PAL.canyon,
    src:[ "111111111111111111111111","100022000008100000220001","100022000110100000220001","100000000110100700000001",
          "100000000000100001100001","100000000000900001100601","100000220000100000000001","107000220000100220000001",
          "180000000110100220005001","100030000110100000000001","111111111111111111111111" ],
    enc:{ pool:['canyonRaider','emberBat','rockBrute'], rate:0.22 }, respawn:{x:2,y:5},
    npcs:[], warps:[ {x:1,y:5,to:'dunes',tx:21,ty:5,label:'사막'},
            {x:22,y:5,to:'snowpass',tx:2,ty:5,label:'설산',event:'ev_garn',eventFlag:'ch10done'} ],
    loot:{'20,8':{item:'heroRing'}},
    eventTile:'ev_garn', eventDone:'ch10done', onEnter:'ev_canyon_enter' },

  snowpass:{ name:'설산 고갯길', theme:'ash', bgm:'field', hud:'2부 11장', pal:PAL.snow,
    src:[ "111111111111111111111111","100000220000000022000001","101100220011000022001101","101100000011007000001101",
          "100000000000000000000001","100022000110002200000001","100022000110002200110001","107000000000000000110051",
          "100001100022000000000001","100001100022000000000001","111111111111111111111111" ],
    enc:{ pool:['frostWolf','iceWraith','snowSentinel'], rate:0.2 }, respawn:{x:2,y:5},
    npcs:[], warps:[ {x:1,y:5,to:'canyon',tx:21,ty:4,label:'협곡'},
            {x:22,y:5,to:'abbey',tx:2,ty:5,label:'수도원'} ],
    loot:{'22,7':{item:'aegisRing'}},
    onEnter:'ev_snow_enter' },

  abbey:{ name:'설산 수도원', theme:'town', bgm:'field', hud:'2부 11장', pal:PAL.abbey,
    src:[ "1111111111111111","1000000000000001","1011100000011101","1000000300000001",
          "1000000000000001","1000000000000001","1011001001001101","1000000000000001",
          "1000000000000001","1111111101111111","1111111111111111" ],
    enc:null, respawn:{x:3,y:5},
    npcs:[
      {x:10,y:3,color:'#e0e4f0',name:'수도원장 엘다',lines:[
        say('엘다','미아… 네가 올 줄 알았다. 그리고 무엇을 물을지도.',NPC),
        say('엘다','그래. 나는 알고 있었다. 봉인이 빛을 가두는 그릇이라는 것을. 신전은 대대로 그것을 감춰 왔지.',NPC),
        say('엘다','지하 빙고(남쪽 ▣)에 쐐기가 박혔다. 그걸 뽑고 돌아오거라. 그때 전부 말해 주마.',NPC) ]},
      {x:3,y:7,color:'#f0c27a',name:'수도사',glyph:'◇',shop:['hiPotion','hiEther','revive','starRobe','starCirclet','stormBoots']} ],
    warps:[ {x:1,y:5,to:'snowpass',tx:21,ty:5,label:'설산'},
            {x:8,y:9,to:'crypt',tx:2,ty:1,label:'빙고'},
            {x:14,y:5,to:'capital',tx:2,ty:5,label:'왕도',need:'ch11done',block:'눈보라가 왕도로 가는 길을 막고 있다. 지하 빙고의 쐐기를 먼저 뽑아야 한다.'} ],
    onEnter:'ev_abbey_enter' },

  crypt:{ name:'수도원 지하 빙고', theme:'temple', bgm:'field', hud:'2부 11장', pal:PAL.crypt,
    src:[ "1111111111111111","1000022000022001","1011022011022081","1000000011000001",
          "1807000000007001","1000011001100051","1111111911111111","1000000000000001",
          "1022070000702201","1500000060000001","1111111111111111" ],
    enc:{ pool:['frostWolf','iceWraith','snowSentinel'], rate:0.24 }, respawn:{x:2,y:1},
    npcs:[], warps:[ {x:1,y:1,to:'abbey',tx:8,ty:8,label:'수도원'} ],
    loot:{'14,5':{item:'starRobe'},'1,9':{gold:800,item:'hiEther'}},
    eventTile:'ev_frost', eventDone:'ch11done', onEnter:'ev_crypt_enter' },

  capital:{ name:'왕도 아르센', theme:'town', bgm:'field', hud:'2부 12장', pal:PAL.capital,
    src:[ "1111111111111111","1000000000000001","1011101001011101","1000000000000001",
          "1000000000030001","1000000000000001","1011011001101101","1000000000000001",
          "1000000000000001","1111111111111111","1111111111111111" ],
    enc:null, respawn:{x:3,y:5},
    npcs:[
      {x:6,y:3,color:'#c0a868',name:'근위대장',lines:[
        say('근위대장','폐하께서는 쐐기를 받아들이셨다. 쐐기가 있는 한 그림자가 왕도를 건드리지 않는다는 약조였지.',NPC),
        say('근위대장','허나 왕궁 지하(북쪽 ▣)로 내려간 병사들이 돌아오지 않는다. …부탁이다. 확인해 다오.',NPC) ]},
      {x:12,y:7,color:'#d9cdb5',name:'시민',lines:[
        say('시민','밤이 길어졌어요. 그래도 여긴 마물이 안 들어오니까… 다들 모른 척하는 거죠.',NPC) ]},
      {x:3,y:7,color:'#f0c27a',name:'왕실 무구상',glyph:'◇',shop:['hiPotion','hiEther','revive','dawnSword','dawnStaff','dawnBow','dawnPlate','heroRing','aegisRing','archRing','zephyrRing']} ],
    warps:[ {x:1,y:5,to:'abbey',tx:13,ty:5,label:'수도원'},
            {x:8,y:1,to:'palace',tx:2,ty:1,label:'왕궁'},
            {x:14,y:5,to:'sealgrove',tx:2,ty:5,label:'숲',need:'ch12done',block:'성문이 굳게 닫혀 있다. 왕궁 지하의 일을 먼저 매듭지어야 한다.'} ],
    onEnter:'ev_capital_enter' },

  palace:{ name:'왕궁 지하 회랑', theme:'temple', bgm:'field', hud:'2부 12장', pal:PAL.palace,
    src:[ "1111111111111111","1000000022000051","1011011022011001","1080000000000001",
          "1000111001110001","1022100000012201","1022100700012281","1111111191111111",
          "1000000000000001","1500000060000001","1111111111111111" ],
    enc:{ pool:['royalShade','palaceGuard','crownPhantom'], rate:0.24 }, respawn:{x:2,y:1},
    npcs:[], warps:[ {x:1,y:1,to:'capital',tx:8,ty:2,label:'왕도'} ],
    loot:{'14,1':{item:'zephyrRing'},'1,9':{gold:1000,item:'hiPotion'}},
    eventTile:'ev_crown', eventDone:'ch12done', onEnter:'ev_palace_enter' },

  sealgrove:{ name:'봉인의 숲', theme:'forest', bgm:'battle', hud:'2부 13장', pal:PAL.sealgrove,
    src:[ "111111111111111111111111","100220000000022000000001","100220011000022001100001","100000011000000001100001",
          "100000000002200000000001","100000000002200000000601","100002200000000110000001","100002200110000110022001",
          "150000000110000000022001","100030000000000000000001","111111111111111111111111" ],
    enc:{ pool:['wedgeBrute','nightWolf','lostVoice'], rate:0.22 }, respawn:{x:2,y:5},
    npcs:[], warps:[ {x:1,y:5,to:'capital',tx:13,ty:5,label:'왕도'},
            {x:22,y:5,to:'riftgate',tx:2,ty:1,label:'균열',event:'ev_lord',eventFlag:'ch13done'} ],
    loot:{'1,8':{gold:900,item:'hiEther'}},
    eventTile:'ev_lord', eventDone:'ch13done', onEnter:'ev_seal_enter' },

  riftgate:{ name:'균열의 문', theme:'rift', bgm:'battle', hud:'2부 14장', pal:PAL.rift,
    src:[ "1111111111111111","1000022000022001","1011022011022001","1080000011000081",
          "1000070000700001","1022011801102201","1111111191111111","1000000300000001",
          "1022007007002201","1500000060000051","1111111111111111" ],
    enc:{ pool:['gateShade','riftBrute','voidHerald'], rate:0.26 }, respawn:{x:2,y:1},
    npcs:[], warps:[ {x:1,y:1,to:'sealgrove',tx:21,ty:4,label:'숲'} ],
    loot:{'1,9':{gold:1200,item:'revive'},'14,9':{item:'hiPotion'}},
    eventTile:'ev_gateboss', eventDone:'ch14done', onEnter:'ev_gate_enter' },
},

/* ================= 2부 시작(타이틀 "2부부터 시작") — 1부를 마친 표준 파티 ================= */
starts:{
  2:()=>{ const gear={ '테리':{weapon:'mithrilSword',armor:'plateArmor',head:'ironHelm',hands:'gauntlet',feet:'leatherBoots',ring:'guardRing'},
                       '카엘':{weapon:'sageStaff',armor:'chainMail',head:'mageHat',ring:'sageRing'},
                       '미아':{weapon:'sageStaff',armor:'chainMail',head:'mageHat',ring:'guardRing'},
                       '코르':{weapon:'stormBow',armor:'chainMail',head:'ironHelm',ring:'powerRing'} };
    party=['테리','카엘','미아','코르'].map(n=>{ const p=MK[n](); while(p.lv<13) levelUp(p); Object.assign(p,gear[n]); return p; });
    gold=800; inventory={potion:6,ether:3,revive:2}; sealsFixed=0; bossStage=3; storyFlags={introDone:true,part1Clear:true}; },
},

/* ================= 이벤트 (7~14장) ================= */
events:{
  /* ---- 7장 다시 온 아침 ---- */
  ev_p2_start:()=>{ storyFlags.p2Started=true; loadArea('arg2',3,3,'down');
    showMsg([
      "— 모두의 픽셀모험 · 제2부 「그림자 군주」 —",
      "세 봉인이 다시 선 지 석 달. 아르겐에는 오랜만의 아침이 이어졌다.",
      say('테리','밭에 싹이 났어. 마을이 정말 돌아오고 있구나.',T),
      say('카엘','…응. 그런데 테리, 제단에서 본 그 그림자 — 잊지 않았지?',K),
      say('코르','"다음엔 내가 직접 가지"였던가. 그런 말 하는 놈은 꼭 온다고.',C),
      "그때, 숨을 헐떡이며 마을로 뛰어든 상인이 외친다.",
      say('살레나 상인','살레나에 — 항구에 검은 쐐기가 떨어졌어요! 빛이, 빛이 빨려 들어가요!',NPC),
      say('미아','쐐기… 여명의 빛을 빨아들이는 거라면, 봉인까지 닿을 거예요.',M),
      say('테리','가자. 동쪽 옛 대로 ▣ 로.',T),
      "— 제7장 「다시 온 아침」 —" ], ()=>{ saveGame(); }); },
  ev_oldroad_enter:()=>{ if(storyFlags.oldroadEntered) return; storyFlags.oldroadEntered=true;
    showMsg([
      "옛 대로 — 살레나로 이어지는 큰길. 길가 곳곳에 보랏빛 쐐기 조각이 박혀 있다.",
      say('코르','마물이 달라졌어. 예전 놈들보다 훨씬 사납다. 풀숲은 조심해.',C),
      say('카엘','길 끝(동쪽)에 큰 기척이 있어. 길목을 지키는 놈일 거야.',K) ]); },
  ev_wedge:()=>{ if(storyFlags.ch7done) return;
    showMsg([
      "길 한복판에 박힌 쐐기 조각 앞을, 갑옷 입은 그림자가 막아선다.",
      say('쐐기 파수대장','군주께서 이르셨다. 봉인을 세운 자들을 이 길로 들이지 말라고.',LORD),
      say('테리','그 군주라는 자에게 전해. 우리가 간다고!',T) ],
      ()=>{ startBattle(['wedgeguard','p2scout','p2scout'],true,{onWin:'ev_wedge_after'}); }); },
  ev_wedge_after:()=>{
    showMsg([
      "파수대장이 흩어지며, 길에 박힌 쐐기 조각이 가루가 된다.",
      say('???','…돌려줘… 우리의 아침을…',  '#8a93ad'),
      say('미아','또 그 목소리예요. 봉인을 세울 때도 들렸던.',M),
      say('카엘','……살레나가 코앞이야. 서두르자.',K),
      "— 제7장 완료 — 동쪽 ▣ 로 나가면 살레나 항이다." ], ()=>{ storyFlags.ch7done=true; saveGame(); }); },

  /* ---- 8장 살레나 항 ---- */
  ev_salena_enter:()=>{ if(storyFlags.salenaEntered) return; storyFlags.salenaEntered=true;
    showMsg([
      "— 제8장 「살레나 항」 —",
      "살레나 항 — 한낮인데도 저녁처럼 어둡다. 등대의 불빛이 실처럼 가늘게 부두 쪽으로 끌려간다.",
      say('코르','무구상 ◇ 이 있군. 룬 장비라… 값은 나가도 지금 우리한텐 필요해.',C),
      say('테리','쐐기는 남쪽 부두 창고 ▣ 야. 준비되면 내려가자.',T) ]); },
  ev_docks_enter:()=>{ if(storyFlags.docksEntered) return; storyFlags.docksEntered=true;
    showMsg([
      "부두 창고 — 바닥에 바닷물이 발목까지 차 있고, 안쪽에서 낮은 노랫소리가 들린다.",
      say('카엘','장치(○) 둘. 수문(▦) 너머에 쐐기가 있어.',K) ]); },
  ev_tide:()=>{ if(storyFlags.ch8done) return;
    showMsg([
      "창고 바닥에 사람 키만 한 검은 쐐기가 박혀 있다. 그 곁에서 푸른 형상이 돌아본다.",
      say('조수의 사도','어서 와. 봉인을 세운 영웅들. 너희가 가둔 빛을, 조금 돌려받는 중이야.',LORD),
      say('테리','가둬? 우린 여명을 되찾은 거야!',T),
      say('조수의 사도','…아무것도 모르는구나. 그럼 몸으로 배워.',LORD) ],
      ()=>{ startBattle(['tidecaller','drowned','drowned'],true,{onWin:'ev_tide_after'}); }); },
  ev_tide_after:()=>{
    showMsg([
      "사도가 물거품으로 흩어지고, 쐐기에 금이 간다. 등대의 빛이 제자리로 돌아온다.",
      say('조수의 사도','쐐기는… 넷이야. 다 뽑아 봐. 그래도 군주께선… 멈추지 않으셔…',LORD),
      say('미아','"가둔 빛"이라고 했어요. 봉인이 빛을 가둔다는 건… 무슨 뜻일까요.',M),
      say('카엘','…동쪽 사막에 옛 기록고가 있어. 봉인에 관한 기록이라면 거기 있을 거야.',K),
      say('코르','넌 그런 걸 참 잘 알아, 카엘.',C),
      "— 제8장 완료 — 살레나 동쪽 성문 ▣ 이 열렸다." ], ()=>{ storyFlags.ch8done=true; saveGame(); }); },

  /* ---- 9장 모래의 기록고 ---- */
  ev_dunes_enter:()=>{ if(storyFlags.dunesEntered) return; storyFlags.dunesEntered=true;
    showMsg([
      "— 제9장 「모래의 기록고」 —",
      "모래 바다 — 끝없는 모래 언덕. 북쪽에 반쯤 묻힌 석조 건물이 보인다.",
      say('카엘','저게 기록고야. 봉인을 세운 현자들이 남긴 곳.',K),
      say('테리','동쪽 협곡으로 가는 길은 모래 폭풍에 막혔어. 기록고부터 가 보자.',T) ]); },
  ev_archive_enter:()=>{ if(storyFlags.archiveEntered) return; storyFlags.archiveEntered=true;
    showMsg([
      "모래의 기록고 — 벽마다 글자가 새겨진 석판이 늘어서 있다.",
      say('미아','기록판이 아직 읽혀요. 안쪽에도 더 있을 거예요.',M),
      say('카엘','장치(○) 둘로 안쪽 문(▦)을 열어야 해. …두 번째 쐐기도 이 안에 있어.',K) ]); },
  ev_archivist:()=>{ if(storyFlags.ch9done) return;
    showMsg([
      "가장 깊은 방. 거대한 석판 앞에 쐐기가 박혀 있고, 금빛 수호기가 눈을 뜬다.",
      "석판: 『세 봉인은 균열을 막는 문이 아니다. 여명을 이 땅에만 머물게 하는 그릇이다.』",
      say('미아','…그릇? 그럼 빛을 받지 못하는 쪽은—',M),
      say('카엘','미아, 뒤로! 수호기가 움직여!',K) ],
      ()=>{ startBattle(['archivist','archGuard','archGuard'],true,{onWin:'ev_archivist_after'}); }); },
  ev_archivist_after:()=>{
    showMsg([
      "수호기가 멈추고 쐐기가 부서진다. 모래 폭풍이 잦아든다.",
      say('테리','카엘. 석판에 적힌 말, 넌 놀라지 않았어.',T),
      say('카엘','……지금은 쐐기가 먼저야. 남은 건 둘. 다 끝나면 — 말할게.',K),
      say('코르','(…저 녀석도 뭔가 쫓고 있군. 나처럼.)',C),
      "— 제9장 완료 — 사막 동쪽 ▣ 붉은 협곡으로 가는 길이 열렸다." ], ()=>{ storyFlags.ch9done=true; saveGame(); }); },

  /* ---- 10장 형의 화살 ---- */
  ev_canyon_enter:()=>{ if(storyFlags.canyonEntered) return; storyFlags.canyonEntered=true;
    showMsg([
      "— 제10장 「형의 화살」 —",
      "붉은 협곡 — 절벽 사이로 난 외길. 바위에 화살 한 대가 깊이 박혀 있다.",
      say('코르','……이 깃. 이 매듭.',C),
      say('미아','코르?',M),
      say('코르','형의 화살이야. 가른 — 5년 전, 그림자를 쫓다 사라진 내 형.',C),
      say('코르','암벽문(▦)은 장치(○) 둘로 열려. 형은… 저 너머에 있어.',C) ]); },
  ev_garn:()=>{ if(storyFlags.ch10done) return;
    showMsg([
      "협곡의 끝. 검은 외투의 궁수가 활을 든 채 서 있다.",
      say('가른','많이 컸구나, 코르.',GARN),
      say('코르','형…! 살아 있었어. 그런데 그 모습은 뭐야. 왜 쐐기 곁에 서 있어!',C),
      say('가른','나는 그림자를 쫓다가, 그림자가 무엇인지 봤다. 그리고 스스로 사도가 되었다.',GARN),
      say('가른','돌아가라. 너만은 쏘고 싶지 않다.',GARN),
      say('코르','…못 돌아가. 형을 데리러 왔으니까!',C) ],
      ()=>{ startBattle(['garn','garnShade','garnShade'],true,{onWin:'ev_garn_after'}); }); },
  ev_garn_after:()=>{
    showMsg([
      "가른이 한쪽 무릎을 꿇는다. 그러나 화살은 끝까지 코르의 급소를 비켜 갔다.",
      say('가른','…강해졌구나. 쐐기는 가져가라. 하지만 코르, 너희가 세운 봉인 너머에 무엇이 있는지 — 직접 봐라.',GARN),
      "가른의 모습이 그림자 속으로 녹아 사라진다.",
      say('코르','형!! …젠장.',C),
      say('테리','코르. 같이 찾자. 네 형도, 그 "너머"도.',T),
      say('코르','……그래. 고맙다.',C),
      "— 제10장 완료 — 협곡 동쪽 ▣ 은 설산으로 이어진다." ], ()=>{ storyFlags.ch10done=true; saveGame(); }); },

  /* ---- 11장 설산 수도원 ---- */
  ev_snow_enter:()=>{ if(storyFlags.snowEntered) return; storyFlags.snowEntered=true;
    showMsg([
      "— 제11장 「설산 수도원」 —",
      "설산 고갯길 — 눈보라 너머로 종소리가 들린다.",
      say('미아','제가 자란 수도원이에요. 엘다 원장님이라면 봉인의 진실을 아실 거예요.',M) ]); },
  ev_abbey_enter:()=>{ if(storyFlags.abbeyEntered) return; storyFlags.abbeyEntered=true;
    showMsg([
      "설산 수도원 — 미아가 자란 곳. 마당의 눈이 치워져 있지 않다.",
      say('미아','원장님은 예배당(북쪽)에 계실 거예요. 먼저 인사드릴게요.',M) ]); },
  ev_crypt_enter:()=>{ if(storyFlags.cryptEntered) return; storyFlags.cryptEntered=true;
    showMsg([
      "수도원 지하 빙고 — 얼음벽 속에 옛 사제들의 석상이 줄지어 서 있다.",
      say('미아','세 번째 쐐기가 이 아래에… 장치(○)는 셋이에요. 전부 눌러야 얼음문(▦)이 열려요.',M) ]); },
  ev_frost:()=>{ if(storyFlags.ch11done) return;
    showMsg([
      "얼음 제단에 쐐기가 박혀 있다. 그 앞에 선 사도는 — 사제복을 입고 있다.",
      say('서리의 사도','미아구나. 원장은 여전히 입을 다물고 있더냐.',LORD),
      say('미아','그 목소리… 로완 사제님? 십 년 전에 실종되신—',M),
      say('서리의 사도','나는 진실을 알리려다 쫓겨났다. 저편의 아이들이 빛 없이 스러지는 것을, 신전은 알고도 덮었지.',LORD),
      say('미아','…그래도 쐐기는 뽑아야 해요. 이쪽 사람들까지 어둠에 잠기게 둘 순 없어요!',M) ],
      ()=>{ startBattle(['frostApostle','iceWraith','iceWraith'],true,{onWin:'ev_frost_after'}); }); },
  ev_frost_after:()=>{
    showMsg([
      "사도가 눈처럼 흩어진다. 마지막 순간, 그는 미아에게 고개를 숙인다.",
      say('서리의 사도','너는… 덮지 마라, 미아.',LORD),
      "수도원으로 돌아오자, 엘다 원장이 기다리고 있다.",
      say('엘다','로완의 말이 옳다. 균열 너머에는 또 하나의 땅이 있고, 그곳 사람들은 빛을 잃었다. 신전은 그것을 죄로 여기면서도 감췄지.',NPC),
      say('미아','…그럼 우리가 세운 봉인은—',M),
      say('엘다','이쪽을 살리고, 저쪽을 버린 것이다. 방금 전갈이 왔다. 빛의 본신전이 함락되었다고.',NPC),
      say('테리','남은 쐐기는 하나. 왕도 아르센이야.',T),
      "— 제11장 완료 — 수도원 동쪽 ▣ 은 왕도로 이어진다." ], ()=>{ storyFlags.ch11done=true; saveGame(); }); },

  /* ---- 12장 왕도 아르센 ---- */
  ev_capital_enter:()=>{ if(storyFlags.capitalEntered) return; storyFlags.capitalEntered=true;
    showMsg([
      "— 제12장 「왕도 아르센」 —",
      "왕도 아르센 — 거리는 멀쩡하다. 그러나 왕궁 첨탑 위에, 가장 큰 쐐기가 박혀 있다.",
      say('코르','마물이 한 마리도 없어. 오히려 그게 더 꺼림칙하군.',C),
      say('카엘','왕이 쐐기를 받아들인 거야. 왕도를 지키는 대가로.',K),
      say('테리','왕실 무구상 ◇ 에서 여명 장비를 판대. 갖추고 왕궁(북쪽 ▣)으로 가자.',T) ]); },
  ev_palace_enter:()=>{ if(storyFlags.palaceEntered) return; storyFlags.palaceEntered=true;
    showMsg([
      "왕궁 지하 회랑 — 돌아오지 않은 근위병들이, 그림자가 되어 복도를 지키고 있다.",
      say('카엘','장치(○) 둘. 옥좌 아래의 문(▦)을 열어야 해.',K) ]); },
  ev_crown:()=>{ if(storyFlags.ch12done) return;
    showMsg([
      "옥좌 아래 깊은 방. 왕관을 쓴 형상이 쐐기에 손을 얹고 있다.",
      say('왕관의 사도','짐은 백성을 지켰다. 쐐기 하나로 왕도가 평안하다면, 그것이 왕의 일이 아니냐.',LORD),
      say('테리','왕도 밖의 사람들은? 살레나는, 수도원은!',T),
      say('왕관의 사도','…왕은 모두를 구할 수 없다. 너희도 그러지 않았더냐. 봉인을 세울 때.',LORD) ],
      ()=>{ startBattle(['crownApostle','palaceGuard','palaceGuard'],true,{onWin:'ev_crown_after'}); }); },
  ev_crown_after:()=>{
    showMsg([
      "왕관이 바닥에 떨어져 구른다. 네 번째 쐐기가 부서진다.",
      say('코르','넷 다 뽑았어. 이걸로 끝인가?',C),
      "그 순간 — 땅이 울리고, 서쪽 하늘이 검게 갈라진다.",
      say('카엘','…아니야. 쐐기는 미끼였어. 우리가 쐐기를 쫓는 동안 그자는—',K),
      say('미아','숲이에요! 첫 번째 봉인이 있는 숲 쪽이에요!',M),
      "— 제12장 완료 — 왕도 동쪽 성문 ▣ 이 열렸다. 봉인의 숲으로!" ], ()=>{ storyFlags.ch12done=true; saveGame(); }); },

  /* ---- 13장 무너지는 봉인 ---- */
  ev_seal_enter:()=>{ if(storyFlags.sealEntered) return; storyFlags.sealEntered=true;
    showMsg([
      "— 제13장 「무너지는 봉인」 —",
      "봉인의 숲 — 석 달 전 되세운 첫 봉인의 숲. 나무들이 검게 물들어 있다.",
      say('테리','봉인석은 숲 끝(동쪽)이야. 서둘러!',T),
      say('카엘','제단 ✦ 이 아직 살아 있어. …쉬어 둬. 이번엔 정말 위험해.',K) ]); },
  ev_lord:()=>{ if(storyFlags.ch13done) return;
    showMsg([
      "봉인석 앞에, 한 사람이 등을 보이고 서 있다. 그림자가 아니다 — 사람의 모습이다.",
      say('그림자 군주','왔구나. 봉인을 되세운 아이들.',LORD),
      say('테리','당신이… 그림자 군주!',T),
      say('그림자 군주','이 봉인을 처음 세운 것은 나다. 그러니 부수는 것도 내 몫이지.',LORD),
      say('카엘','…최초의 수호자.',K),
      say('그림자 군주','막고 싶다면 막아 보아라.',LORD) ],
      ()=>{ startBattle(['lord'],true,{onWin:'ev_lord_after',onLose:'ev_lord_after'}); }); },
  ev_lord_after:()=>{
    showMsg([
      "…검도, 주문도, 화살도 닿지 않았다. 일행은 쓰러진 채 올려다볼 수밖에 없다.",
      "군주가 봉인석에 손을 얹는다. 석 달 전 되찾은 여명의 빛이 — 깨진다.",
      say('그림자 군주','미워서가 아니다. 저편에는 내 백성이 있다. 빛 없이 사람의 모습을 잃어 가는.',LORD),
      say('그림자 군주','근원을 되찾으러 간다. 따라오려거든 오너라. 그리고 보아라 — 너희가 무엇을 가두었는지.',LORD),
      "군주가 갈라진 하늘 속으로 사라진다. 숲 너머에, 균열이 문처럼 열려 있다.",
      say('테리','……졌어. 처음으로, 완전히.',T),
      say('미아','그래도 살아 있어요. 일으켜 드릴게요.',M),
      "— 제13장 완료 — 숲 동쪽 ▣ 에 균열의 문이 열렸다." ], ()=>{ storyFlags.ch13done=true; party.forEach(p=>{p.alive=true;p.hp=p.maxhp;p.mp=p.maxmp;}); saveGame(); }); },

  /* ---- 14장 균열로 ---- */
  ev_gate_enter:()=>{ if(storyFlags.gateEntered) return; storyFlags.gateEntered=true;
    showMsg([
      "— 제14장 「균열로」 —",
      "균열의 문 — 하늘이 찢어진 자리. 문 앞에 군주가 남긴 그림자가 버티고 있다.",
      say('카엘','…다들, 들어 줘. 약속했지. 전부 말하겠다고.',K),
      say('카엘','내 가문은 봉인을 관리해 온 집안이야. 봉인이 빛을 가두는 그릇이라는 것도, 저편에 사람이 있다는 것도 — 난 처음부터 알고 있었어.',K),
      say('테리','……왜 말하지 않았어.',T),
      say('카엘','말하면 네가 봉인을 세우지 못할 것 같았어. 네 마을이 눈앞에서 죽어 가는데. …미안해.',K),
      say('코르','(한숨) 다들 뭔가 하나씩은 숨기고 살지. 지금 중요한 건 저 문이야.',C),
      say('테리','…나중에 한 대만 맞아. 지금은 같이 가자, 카엘.',T),
      say('카엘','…응.',K),
      "장치(○) 셋을 눌러 안쪽 문(▦)을 열자. 제단 ✦ 은 문 바로 뒤에 있다." ]); },
  ev_gateboss:()=>{ if(storyFlags.ch14done) return;
    showMsg([
      "균열 바로 앞. 군주와 똑같은 윤곽의 그림자가 길을 막는다.",
      say('문지기','주인께서 이르셨다. 따라올 자격이 있는지, 내가 가늠하라고.',LORD),
      say('테리','자격은 우리가 정해. 전원 — 간다!',T) ],
      ()=>{ startBattle(['gatekeeper','gateShade','gateShade'],true,{onWin:'ev_gate_after'}); }); },
  ev_gate_after:()=>{ playBGM('field');
    showMsg([
      "문지기가 흩어지고, 균열이 일행 앞에 온전히 열린다. 그 너머는 — 빛 한 점 없는 하늘.",
      say('미아','저편에도 땅이 있어요. 집도… 길도 보여요.',M),
      say('코르','형이 말한 "너머"가 저기군.',C),
      say('카엘','들어가면 돌아올 길은 없을지도 몰라.',K),
      say('테리','봉인을 세운 건 우리야. 그게 뭘 가뒀는지 — 우리 눈으로 봐야 해.',T),
      "네 사람은 서로를 돌아보고, 균열 안으로 걸음을 내디딘다.",
      "— 모두의 픽셀모험 · 제2부 「그림자 군주」 끝 —",
      "제3부 「균열 너머」에서 계속…   (제3부는 준비 중입니다)" ],
      ()=>{ storyFlags.ch14done=true; storyFlags.part2Clear=true; saveGame(); stopBGM(); bgm.started=false; state='title'; titleSel=1; }); },
},
});
})();
