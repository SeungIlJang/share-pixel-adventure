"use strict";
/* ===== 모두의 픽셀모험 — 제1부 「세 봉인」 콘텐츠 =====
   지역(areas)·적(enemies)·적 스프라이트(enemyPx)·스토리 이벤트(events)·보스 등장 대사(bossScenes).
   엔진(index.html)보다 먼저 로드되고, definePart()로 CONTENT 레지스트리에 합쳐진다.
   이벤트 함수는 실행 시점에 엔진의 전역(showMsg, startBattle, storyFlags …)을 사용한다. */
definePart(1, {
enemies:{
  wolf:  {name:'그림자 늑대',hp:46, atk:13,def:4,mag:2, spd:9, exp:9, gold:8, color:'#6a7290'},
  slime: {name:'균열 슬라임',hp:56, atk:11,def:6,mag:3, spd:4, exp:10,gold:9, color:'#5fae8a',aiPoison:0.4},
  bat:   {name:'어둠 박쥐',  hp:34, atk:12,def:3,mag:2, spd:12,exp:8, gold:7, color:'#8a6aa0'},
  wraith:{name:'망령',       hp:78, atk:15,def:5,mag:12,spd:10,exp:18,gold:16,color:'#aab0d6',aiMagic:0.5},
  shade: {name:'그림자',     hp:70, atk:17,def:6,mag:10,spd:11,exp:22,gold:16,color:'#5a5570'},
  creeper:{name:'동굴 포식귀',hp:100,atk:19,def:11,mag:4,spd:6, exp:30,gold:22,color:'#6a7a6a'},
  raider:{name:'그림자 약탈자',hp:120,atk:24,def:10,mag:6,spd:11,exp:40,gold:30,color:'#7a6a80'},
  gale:  {name:'돌풍 정령',    hp:84, atk:18,def:6, mag:6,spd:15,exp:36,gold:26,color:'#8fb0c4'},
  warden:{name:'고원의 파수꾼',hp:700,atk:50,def:14,mag:38,spd:9,exp:170,gold:200,color:'#9a8c6a',boss:true},
  sentinel:{name:'석상 파수병',hp:130,atk:26,def:16,mag:8, spd:7,exp:46, gold:34, color:'#8a94a0'},
  golem: {name:'신전 수호상',hp:1240,atk:60,def:18,mag:45,spd:6,exp:240,gold:260,color:'#9aa6b4',boss:true},
  phantom:{name:'그림자 환영',hp:150,atk:26,def:10,mag:16,spd:14,exp:55,gold:40,color:'#6a5a80'},
  brute: {name:'균열 거수',  hp:240,atk:34,def:16,mag:8, spd:6, exp:70,gold:52,color:'#7a4a4a'},
  herald:{name:'군주의 전조',hp:2280,atk:62,def:16,mag:52,spd:11,exp:320,gold:340,color:'#a05a6a',boss:true},
  seal1:{name:'균열의 수호물',hp:520,atk:22,def:9, mag:18,spd:7,exp:90, gold:100,color:'#d88',boss:true},
  seal2:{name:'심연의 수호물',hp:950,atk:37,def:13,mag:32,spd:9,exp:200,gold:220,color:'#b96',boss:true},
  seal3:{name:'종언의 수호물',hp:2640,atk:73,def:18,mag:65,spd:12,exp:500,gold:500,color:'#caa',boss:true},
  /* 심층 맵 적·중간 보스 — look: 기존 스프라이트 재사용, palx: 팔레트 덮어쓰기, big: 확대 */
  thornling:{name:'가시 덩굴귀',hp:58, atk:15,def:6, mag:3, spd:7, exp:14,gold:12,color:'#4f8a4a',look:'creeper',palx:{g:'#4f8a4a',G:'#356a34',l:'#7ab86a'}},
  rootguard:{name:'결계의 뿌리',hp:340,atk:16,def:7, mag:11,spd:5, exp:60,gold:70,color:'#3f7a3a',boss:true,look:'creeper',big:2,palx:{g:'#3f7a3a',G:'#28552a',l:'#6aa85a',e:'#ffd54a'}},
  geode:    {name:'수정 갑충',  hp:110,atk:21,def:13,mag:4, spd:5, exp:34,gold:24,color:'#8a6ac0',look:'slime',palx:{g:'#8a6ac0',G:'#5f4a92',l:'#d8c8ff',w:'#f4eeff'}},
  crystalmaw:{name:'수정 포식자',hp:560,atk:25,def:12,mag:20,spd:8, exp:150,gold:160,color:'#8a6ac0',boss:true,look:'brute',palx:{b:'#7a5ab0',B:'#523a82',l:'#b89ae0',e:'#9fe8ff'}},
  harrier:  {name:'능선 매',    hp:100,atk:26,def:8, mag:6, spd:16,exp:48,gold:32,color:'#c4a878',look:'gale',palx:{a:'#c4a878',A:'#92784e',l:'#f0e0c0'}},
  galelord: {name:'돌풍의 주인',hp:1120,atk:54,def:13,mag:45,spd:14,exp:230,gold:240,color:'#9fc4d8',boss:true,look:'gale',big:2,palx:{a:'#9fc4d8',A:'#5f8aa6',e:'#ffe9a0'}},
  voidling: {name:'심부의 그림자',hp:190,atk:34,def:12,mag:20,spd:13,exp:95,gold:60,color:'#a04a5a',look:'phantom',palx:{p:'#a04a5a',P:'#6a2e3a',e:'#ffb0a0'}},
  voidmaw:  {name:'심부의 아귀',hp:1350,atk:78,def:17,mag:66,spd:10,exp:420,gold:420,color:'#8a2a3a',boss:true,look:'brute',big:1,palx:{b:'#8a2a3a',B:'#5a1622',l:'#c05a5a',e:'#ffd54a'}},
},
enemyPx:{
  wolf:{ px:2, pal:{o:'#141019',f:'#6a7290',F:'#474f6a',l:'#8a92b0',e:'#ff5a5a',t:'#e8edf7'},
    rows:["..o......o..",".ofo....ofo.",".offo..offo.",".offffffffo.","offffffffffo","ofeffffffefo","offffffffffo","offtffftffo.",".offttttffo.",".oFffffffFo.","..offffffo..",".o.oo.oo.o.."] },
  slime:{ px:2, pal:{o:'#141019',g:'#5fae8a',G:'#3f8a6a',l:'#bff0d8',e:'#0c2a1e',w:'#eafff5'},
    rows:["....oooo....","..oollllgo..",".ogllllllGo.",".oglllgggGo.","oggwgggggGGo","ogeggggggeGo","oggggggggGGo","oGgggggggGGo",".oGGgggGGGo.","..oGGGGGGo..",".oooooooooo."] },
  bat:{ px:2, pal:{o:'#141019',b:'#8a6aa0',B:'#5f4675',e:'#ff5a5a',l:'#b79ad0'},
    rows:[".o........o.",".oo......oo.","oBooo..oooBo","oBBboooobBBo",".oBbbeebbBo.","..obbbbbbo..","...obbbbo...","....o..o...."] },
  wraith:{ px:2, pal:{o:'#141019',g:'#aab0d6',G:'#7e85ad',l:'#d8dcef',e:'#8fdc6e'},
    rows:["...oooo...","..olllgo..",".ogllllgo.",".ogeggego.",".oggggggo.",".oggggggo.",".oGgggGgo.",".oGgGgGgo.",".o.o.o.o.."] },
  shade:{ px:2, pal:{o:'#0c0a12',g:'#5a5570',G:'#3a3550',e:'#c7b8ff'},
    rows:["...oooo...","..oggggo..",".oggggggo.",".ogeggego.","oggggggggo","oggggggggo",".oGggggGo.",".oG.oo.Go.",".o.o..o.o."] },
  creeper:{ px:2, pal:{o:'#141019',g:'#6a7a6a',G:'#48544a',l:'#8a9a86',e:'#e0ff6a',t:'#e8edf7'},
    rows:[".o........o.",".ogo....ogo.",".oggggggggo.","oggggggggggo","ogeggggggego","oggttttttggo","oggggggggggo",".oGgggggggo.",".oGg.oo.gGo.","..o.o..o.o.."] },
  raider:{ px:2, pal:{o:'#141019',b:'#7a6a80',B:'#574a5f',s:'#caa882',e:'#ff8a6a',m:'#cfd6e8'},
    rows:["...oooo....","..obbbbo...","..obsseo...","..obbbbo...",".obBbbBbom.",".obBbbBbmo.",".obbbbbbo..","..ob..bo...","..oo..oo..."] },
  gale:{ px:2, pal:{o:'#141019',a:'#8fb0c4',A:'#5f7e92',l:'#cfe4f0',e:'#ffffff'},
    rows:["..oooo....",".oallllo..",".oaellaeo.","oallllllo.","o.oaaaao.o",".o.oaao.o.","...o..o...",".o..oo..o.","o..o..o..o"] },
  sentinel:{ px:2, pal:{o:'#141019',g:'#8a94a0',G:'#5f6670',l:'#b4bcc6',e:'#9fd0ff'},
    rows:["..oooo..",".olllgo.",".ogeego.",".oggggo.","oGggggGo","oGggggGo","oGggggGo",".o.oo.o."] },
  phantom:{ px:2, pal:{o:'#0c0a12',p:'#6a5a80',P:'#463a57',e:'#c79bff'},
    rows:["...oooo...","..oppppo..",".oppppppo.",".opeppepo.","oppppppppo","oppppppppo",".oPpppppPo.",".oP.PP.Po.",".o.o..o.o."] },
  brute:{ px:3, pal:{o:'#141019',b:'#7a4a4a',B:'#542f2f',l:'#9a6a5a',e:'#ff7a5a',t:'#e8d0c0'},
    rows:["..o......o..",".obo....obo.",".obbbbbbbbo.","obbbbbbbbbbo","obebbbbbbebo","obbtttttttbo","obbbbbbbbbbo","oBbbbbbbbbBo","oBBbbbbbbBBo",".oBb.oo.bBo.",".o.oo..oo.o."] },
  warden:{ px:3, pal:{o:'#141019',a:'#9a8c6a',A:'#6e6248',l:'#c2b488',e:'#ff6a4a',m:'#caa44a'},
    rows:["...oooooo...","..olaaaalo..","..oaeaaeao..","..oaaaaaao..",".oaAaaaaAao.","oamAaaaaAmao","oaaAaaaaAaao",".oaAaaaaAao.",".oaaaaaaaao.",".oaa.oo.aao.",".o.oo..oo.o."] },
  golem:{ px:3, pal:{o:'#141019',g:'#9aa6b4',G:'#5f6b7a',l:'#c0ccd8',e:'#7fd0ff'},
    rows:["..oggggggo..",".oggggggggo.",".ogeggggego.",".oggggggggo.","ogGgggggggGo","ogGgggggggGo","ogGgggggggGo","ogGgggggggGo",".oggggggggo.",".ogg.oo.ggo."] },
  herald:{ px:3, pal:{o:'#0c0a12',p:'#a05a6a',P:'#6e3a48',e:'#ff5a6a',l:'#c77a8a'},
    rows:["....oooo....","...olllpo...","..oppppppo..","..opeooepo..","..oppppppo..",".opppppppo..",".oPppppppPo.",".oPpppppppo.",".oPpppppppo.",".oP.oooo.Po.",".o.oo..oo.o."] },
  seal1:{ px:3, pal:{o:'#0c0a12',g:'#dd8888',G:'#a85a5a',e:'#ffdd55'},
    rows:["..o......o..",".ogo....ogo.",".oggggggggo.","oggggggggggo","ogeeggggeego","oggggggggggo","oggggggggggo","oGgggggggggo","oGGgggggggGo",".oGgggggggGo.",".oGg.oo.gGo.",".o.oo..oo.o."] },
  seal2:{ px:3, pal:{o:'#0c0a12',g:'#bb9966',G:'#8a6a46',e:'#ff8a44'},
    rows:["..o......o..",".ogo....ogo.",".oggggggggo.","oggggggggggo","ogeeggggeego","oggggggggggo","oggggggggggo","oGgggggggggo","oGGgggggggGo",".oGgggggggGo.",".oGg.oo.gGo.",".o.oo..oo.o."] },
  seal3:{ px:3, pal:{o:'#0c0a12',g:'#ccaaaa',G:'#9a8a7a',e:'#ff4466'},
    rows:["..oo....oo..",".ogoo..oogo.",".oggggggggo.","oggggggggggo","ogeeggggeego","oggggggggggo","oggggggggggo","oGgggggggggo","oGGgggggggGo","oGGGgggggGGo",".oGg.oo.gGo.",".o.oo..oo.o."] },
},
areas:{
  village:{ name:'아르겐 마을', theme:'town', bgm:'field',
    pal:{ bg:'#140f0c', floor:'#38302a', wall:'#241b14', grass:'#3a5a34', altar:'#2a3a66', boss:'#5a2a3a', chest:'#3a2e1a', detail:'rgba(220,200,160,.10)' },
    src:[ "1111111111111111","1000000000000001","1011100100111101","1000000000000001",
          "1000000000000001","1011000100011001","1000000000003001","1000000000000001",
          "1000000000000001","1111111001111111","1111111111111111" ],
    enc:null, respawn:{x:3,y:3},
    npcs:[
      {x:5,y:3,color:'#c79bff',name:'카엘',lines:[
        {n:'카엘',t:'테리, 준비됐어? 마을 남쪽 길(아래)로 나가면 아르겐 숲이야.',c:'#c79bff'},
        {n:'카엘',t:'풀숲(균열 지대)에선 마물이 나와. 제단 ✦ 에서 쉬고 저장해.',c:'#c79bff'},
        {n:'카엘',t:'상인 ◇ 에게서 장비를 사 두면 든든할 거야.',c:'#c79bff'} ]},
      {x:10,y:4,color:'#b7a98f',name:'주민',lines:[
        {n:'주민',t:'마을이 그림자에게 당했어… 부디 봉인을 되살려줘.',c:'#d9cdb5'} ]},
      {x:3,y:7,color:'#f0c27a',name:'상인',glyph:'◇',shop:true} ],
    warps:[ {x:8,y:9,to:'forest',tx:8,ty:2,label:'숲'} ],
    onEnter:'ev_village_intro' },
  forest:{ name:'아르겐 숲', theme:'forest', bgm:'field',
    pal:{ bg:'#10131f', floor:'#233a2c', wall:'#1b2a22', grass:'#2a5234', altar:'#2a3a66', boss:'#5a2a3a', chest:'#3a2e1a', detail:'rgba(130,180,130,.12)' },
    src:[ "1111111111111111","1000000000000001","1022200000222001","1022200000222001",
          "1000000000000001","1001110001110001","1000000000000001","1050003000000001",
          "1000000000222001","1000000000000401","1111111111111111" ],
    enc:{ pool:['wolf','slime','bat'], rate:0.22 }, respawn:{x:6,y:8},
    npcs:[
      {x:8,y:4,color:'#9ab0c4',name:'이정표',lines:[
        "이정표: 숲 깊은 곳(남동쪽)에 봉인 封 이 잠들어 있다.",
        "이정표: 봉인석은 뿌리 결계에 감싸여 있다 — 서쪽 ▣ 속삭이는 수림에서 결계를 끊어라.",
        "이정표: 봉인 앞에 서면 수호물이 깨어난다 — 레벨과 장비를 갖추고 가라." ]} ],
    warps:[ {x:8,y:1,to:'village',tx:8,ty:8,label:'마을'},
            {x:1,y:6,to:'grove',tx:13,ty:4,label:'수림'},
            {x:14,y:8,to:'cave',tx:8,ty:2,label:'동굴',need:'sealDone_forest',block:'봉인의 기운이 길을 막는다. 먼저 이 숲의 봉인을 되살려라.'} ],
    boss:{ id:'seal1', chapter:1, need:'key_forest', block:'봉인석이 뿌리 결계에 감싸여 있다. 서쪽 ▣ 속삭이는 수림에서 결계의 뿌리를 끊어야 한다.' }, onEnter:'ev_forest_enter' },
  cave:{ name:'메아리 동굴', theme:'cave', bgm:'field',
    pal:{ bg:'#0a0a12', floor:'#2a2838', wall:'#16141f', grass:'#2e2a44', altar:'#2a3a66', boss:'#3a2030', chest:'#3a2e1a', detail:'rgba(150,150,200,.10)' },
    src:[ "1111111111111111","1000000000000001","1011100100111101","1000000000000001",
          "1022001001002201","1000000000000001","1011100000111101","1050003000000001",
          "1000220000220001","1000000000000401","1111111111111111" ],
    enc:{ pool:['bat','wraith','shade','creeper'], rate:0.24 }, respawn:{x:6,y:8},
    npcs:[], warps:[ {x:8,y:1,to:'forest',tx:13,ty:8,label:'숲'},
            {x:1,y:5,to:'cavern',tx:2,ty:1,label:'공동'},
            {x:14,y:8,to:'highlands',tx:8,ty:2,label:'고원',need:'sealDone_cave',block:'두 번째 봉인을 되살리기 전에는 길이 열리지 않는다.'} ],
    boss:{ id:'seal2', chapter:2, need:'key_cave', block:'봉인석이 검은 수정에 뒤덮여 있다. 서쪽 ▣ 수정 공동의 포식자를 쓰러뜨려야 한다.' }, onEnter:'ev_cave_enter' },
  highlands:{ name:'잿빛 고원', theme:'ash', bgm:'field',
    pal:{ bg:'#14120f', floor:'#403a30', wall:'#2a2620', grass:'#5a4e38', altar:'#2a3a66', boss:'#4a2a2a', chest:'#3a2e1a', detail:'rgba(200,190,160,.08)' },
    src:[ "1111111111111111","1000000000000001","1022000000002201","1000000000000001",
          "1011000000001101","1002200000022001","1000000060000001","1050000000000001",
          "1022003000002201","1000000000000001","1111111111111111" ],
    enc:{ pool:['raider','gale','shade'], rate:0.22 }, respawn:{x:6,y:8},
    npcs:[], warps:[ {x:8,y:1,to:'cave',tx:14,ty:8,label:'동굴'},
            {x:14,y:9,to:'ridge',tx:2,ty:1,label:'능선',event:'ev_kor_encounter',eventFlag:'ch3done'} ],
    eventTile:'ev_kor_encounter', eventDone:'ch3done', onEnter:'ev_highlands_enter' },
  merchant:{ name:'바람맞이 상인 마을', theme:'town', bgm:'field',
    pal:{ bg:'#141009', floor:'#3c342a', wall:'#2a2016', grass:'#3a5a34', altar:'#2a3a66', boss:'#5a2a3a', chest:'#3a2e1a', detail:'rgba(220,200,160,.10)' },
    src:[ "1111111111111111","1000000000000001","1011011001101101","1000000000000001",
          "1000000000003001","1011000100011001","1000000000000001","1000000000000001",
          "1000000000000001","1111111001111111","1111111111111111" ],
    enc:null, respawn:{x:3,y:3},
    npcs:[
      {x:3,y:7,color:'#f0c27a',name:'상인',glyph:'◇',shop:['potion','ether','revive','steelSword','mithrilSword','crystalStaff','sageStaff','longBow','stormBow','ironHelm','mageHat','chainMail','plateArmor','gauntlet','windBoots','powerRing','guardRing','sageRing','swiftRing']}, /* 최상급(기사검·용옥·신궁·수호 로브)은 신전·균열·심부 보물상자 */
      {x:10,y:3,color:'#b7a98f',name:'마을 장로',lines:[
        {n:'장로',t:'여명이 옅어진 뒤로 바람조차 잿빛이오. 봉인을 되살려 주시게.',c:'#d9cdb5'},
        {n:'장로',t:'북쪽 잊혀진 신전에 봉인의 비밀이 잠들어 있다 하오.',c:'#d9cdb5'} ]} ],
    warps:[ {x:8,y:9,to:'ridge',tx:13,ty:9,label:'능선'},
            {x:14,y:1,to:'temple',tx:8,ty:2,label:'신전',need:'ch3done',block:'북쪽 신전의 문은 굳게 닫혀 있다. 고원에서 아직 매듭짓지 못한 일이 있는 듯하다 — 잿빛 고원(남쪽 ▣)으로 돌아가 보자.'} ],
    onEnter:'ev_merchant_enter' },
  temple:{ name:'잊혀진 신전', theme:'temple', bgm:'field',
    pal:{ bg:'#0b0c16', floor:'#2c2e40', wall:'#1a1c2c', grass:'#242a44', altar:'#2a3a66', boss:'#3a2a40', chest:'#3a2e1a', detail:'rgba(150,170,220,.09)' },
    src:[ "1111111111111111","1000000000000001","1020000700002001","1000000000000001",
          "1011100000011101","1050080000080031","1111111191111111","1000000000000001",
          "1000007007000001","1000000060000001","1111111111111111" ],
    enc:{ pool:['wraith','shade','sentinel'], rate:0.22 }, respawn:{x:14,y:5},
    npcs:[
      {x:3,y:3,color:'#9ab0c4',name:'비문',lines:[
        "비문: 『세 봉인은 여명의 빛을 가두어 균열을 봉하였노라.』",
        "비문: 『허나 빛은 영원하지 않으니, 때가 되면 수호자가 봉인을 다시 세우리라.』" ]},
      {x:13,y:7,color:'#9ab0c4',name:'비문',lines:[
        "비문: 『여명의 근원은 봉인 너머 — 균열의 심장에 잠들어 있다.』" ]} ],
    warps:[ {x:8,y:1,to:'merchant',tx:14,ty:2,label:'마을'},
            {x:14,y:8,to:'rift',tx:8,ty:3,label:'균열',event:'ev_temple_guardian',eventFlag:'ch4done'} ],
    eventTile:'ev_temple_guardian', eventDone:'ch4done', loot:{'2,5':{item:'knightSword'}}, onEnter:'ev_temple_enter' },
  rift:{ name:'균열의 입구', theme:'rift', bgm:'battle',
    pal:{ bg:'#0c0608', floor:'#241820', wall:'#160b12', grass:'#3a1c22', altar:'#2a3a66', boss:'#4a1a28', chest:'#3a2e1a', detail:'rgba(224,90,80,.10)' },
    src:[ "1111111111111111","1000000000000001","1022000000002201","1000000000000001",
          "1011100000011101","1002200220022001","1000000060000001","1050000000000031",
          "1022000000002201","1000000000000001","1111111111111111" ],
    enc:{ pool:['phantom','brute','raider','wraith'], rate:0.3 }, respawn:{x:14,y:7},
    npcs:[], warps:[ {x:8,y:1,to:'temple',tx:13,ty:8,label:'신전'},
            {x:14,y:9,to:'abyss',tx:2,ty:1,label:'심부',event:'ev_rift_herald',eventFlag:'ch5done'} ],
    eventTile:'ev_rift_herald', eventDone:'ch5done', loot:{'2,7':{item:'dragonStaff'}}, onEnter:'ev_rift_enter' },
  altar:{ name:'종언의 제단', theme:'rift', bgm:'battle',
    pal:{ bg:'#0a0406', floor:'#2a1620', wall:'#180a12', grass:'#3a1c22', altar:'#2a3a66', boss:'#5a1a2a', chest:'#3a2e1a', detail:'rgba(255,100,90,.12)' },
    src:[ "1111111111111111","1000000000000001","1000000000000001","1011100000011101",
          "1000000000000001","1000003000000001","1000000000000001","1011100000011101",
          "1000000040000001","1000000000000001","1111111111111111" ],
    enc:null, respawn:{x:6,y:5},
    npcs:[], warps:[ {x:8,y:1,to:'abyss',tx:13,ty:9,label:'심부'} ],
    boss:{ id:'seal3', chapter:6 }, onEnter:'ev_altar_enter' },
  /* ---- 심층 맵(1부 밀도 보강): 퍼즐 + 중간 보스 + 보물 장비 ---- */
  grove:{ name:'속삭이는 수림', theme:'forest', bgm:'field',
    src:[ "1111111111111111","1050000060000001","1000220000220001","1111111911111111",
          "1000000000000001","1022007000022001","1022000110022001","1000000110000001",
          "1870000000000781","1000022002200001","1111111111111111" ],
    enc:{ pool:['wolf','slime','bat','thornling'], rate:0.24 }, respawn:{x:13,y:5},
    npcs:[], warps:[ {x:14,y:4,to:'forest',tx:2,ty:6,label:'숲'} ],
    loot:{'2,1':{item:'guardRing'}},
    eventTile:'ev_grove_root', eventDone:'key_forest', onEnter:'ev_grove_enter' },
  cavern:{ name:'수정 공동', theme:'cave', bgm:'field',
    src:[ "1111111111111111","1000001000100051","1022001080100001","1022000000102201",
          "1000117000002201","1800110000000001","1111111111911111","1000000700000001",
          "1022000000022001","1050000060000001","1111111111111111" ],
    enc:{ pool:['wraith','shade','creeper','geode'], rate:0.26 }, respawn:{x:2,y:1},
    npcs:[], warps:[ {x:1,y:1,to:'cave',tx:2,ty:5,label:'동굴'} ],
    loot:{'14,1':{item:'crystalStaff'},'2,9':{gold:120,item:'ether'}},
    eventTile:'ev_cavern_maw', eventDone:'key_cave', onEnter:'ev_cavern_enter' },
  ridge:{ name:'바람 능선', theme:'ash', bgm:'field',
    src:[ "1111111111111111","1000001000000051","1002201022011001","1002201022010001",
          "1100001000010701","1000111000010001","1070000011000001","1022000011002201",
          "1522000000002201","1000001100060001","1111111111111111" ],
    enc:{ pool:['raider','gale','harrier'], rate:0.24 }, respawn:{x:2,y:2},
    npcs:[], warps:[ {x:1,y:1,to:'highlands',tx:13,ty:9,label:'고원'},
            {x:14,y:9,to:'merchant',tx:8,ty:2,label:'마을',event:'ev_ridge_lord',eventFlag:'ridgeDone'} ],
    loot:{'14,1':{item:'longBow'},'1,8':{item:'powerRing'}},
    eventTile:'ev_ridge_lord', eventDone:'ridgeDone', onEnter:'ev_ridge_enter' },
  abyss:{ name:'균열 심부', theme:'rift', bgm:'battle',
    src:[ "1111111111111111","1000220000220081","1011101111011101","1080700000070001",
          "1022000000002201","1022011001102201","1111111911111111","1000000000000051",
          "1022007007002201","1500000000060001","1111111111111111" ],
    enc:{ pool:['phantom','brute','voidling'], rate:0.28 }, respawn:{x:2,y:1},
    npcs:[], warps:[ {x:1,y:1,to:'rift',tx:13,ty:9,label:'균열'},
            {x:14,y:9,to:'altar',tx:8,ty:2,label:'제단',event:'ev_abyss_maw',eventFlag:'abyssDone'} ],
    loot:{'14,7':{item:'divineBow'},'1,9':{item:'guardianRobe'}},
    eventTile:'ev_abyss_maw', eventDone:'abyssDone', onEnter:'ev_abyss_enter' },
},
events:{
  ev_village_intro:()=>{ if(storyFlags.introDone) return; storyFlags.introDone=true;
    showMsg([
      "— 모두의 픽셀모험 · 제1부 —",
      "대륙 아르겐. 오래전 세 봉인이 '균열'을 막아 세계를 지켜왔다.",
      "허나 봉인이 약해지며, 균열에서 그림자 마물이 흘러나오기 시작했다.",
      "테리의 고향 아르겐 마을도 그림자에게 할퀴었다.",
      {n:'카엘',t:'테리, 네 마을을 덮친 그림자… 균열에서 나온 거야.',c:'#c79bff'},
      {n:'테리',t:'그럼 그 봉인을 다시 세우면 막을 수 있는 거지?',c:'#7cc4ff'},
      {n:'카엘',t:'봉인 수호물을 쓰러뜨려 여명의 빛을 되돌려야 해. 셋 다.',c:'#c79bff'},
      {n:'테리',t:'…좋아. 가자. 여명을 되찾으러.',c:'#7cc4ff'},
      "마을 사람들과 이야기하고, 상인 ◇·제단 ✦ 을 둘러본 뒤 남쪽 길로 나가자." ]); },
  ev_forest_enter:()=>{ if(storyFlags.forestEntered) return; storyFlags.forestEntered=true;
    showMsg([
      "아르겐 숲 — 공기마저 서늘하다.",
      {n:'카엘',t:'여기부터 균열의 기운이 짙어. 풀숲을 밟으면 마물이 나올 거야.',c:'#c79bff'},
      {n:'테리',t:'봉인까지 뚫고 간다. 바짝 붙어.',c:'#7cc4ff'} ]); },
  ev_after_seal1:()=>{
    showMsg([
      {n:'카엘',t:'봉인 하나가 빛을 되찾았어! 첫 번째야.',c:'#c79bff'},
      "균열의 수호물이 스러지자, 봉인석에서 따뜻한 여명의 빛이 번진다.",
      {n:'테리',t:'…좋아, 몸이 가벼워. 다음 봉인으로 가자.',c:'#7cc4ff'},
      {n:'카엘',t:'숲 동쪽에 동굴 입구가 열렸어. 두 번째 봉인은 그 아래야.',c:'#c79bff'},
      "— 제1장 「여명이 스러진 날」 완료 —",
      "숲 동쪽의 동굴 ▣ 로 들어가면 제2장이 시작된다." ], ()=>{ saveGame(); }); },
  ev_cave_enter:()=>{ if(storyFlags.caveEntered) return; storyFlags.caveEntered=true;
    showMsg([
      "메아리 동굴 — 발소리가 깊은 어둠 속으로 메아리친다.",
      "제단 곁에 지친 사제 한 명이 기대앉아 있다.",
      {n:'미아',t:'…여행자님? 저는 빛의 신전의 미아. 봉인을 되살리러 왔어요.',c:'#9fe8c4'},
      {n:'카엘',t:'치유술을 쓰는 사제라니 — 큰 힘이 되겠어.',c:'#c79bff'},
      {n:'미아',t:'함께 가게 해주세요. 두 번째 봉인은 이 아래 깊은 곳에 있어요.',c:'#9fe8c4'} ],
      ()=>{ joinMember('미아'); showMsg([{n:'미아',t:'미아가 합류했다! (치유·치유의 바람·소생)',c:'#9fe8c4'}]); }); },
  ev_after_seal2:()=>{
    showMsg([
      {n:'미아',t:'두 번째 봉인도 여명을 되찾았어요!',c:'#9fe8c4'},
      "심연의 수호물이 흩어지고, 동굴 깊은 곳에 희미한 아침빛이 스민다.",
      {n:'카엘',t:'남은 건 마지막 하나. 더 험한 길이 될 거야.',c:'#c79bff'},
      "— 제2장 「메아리 동굴」 완료 —",
      "동굴 동쪽 길 ▣ 로 나가면 잿빛 고원 — 제3장이 시작된다." ], ()=>{ saveGame(); }); },
  ev_highlands_enter:()=>{ if(storyFlags.hiEntered) return; storyFlags.hiEntered=true;
    showMsg([
      "잿빛 고원 — 여명이 옅어져 바람마저 잿빛이다.",
      {n:'카엘',t:'마물의 무리가 짙어. 더 사나운 것들이 돌아다녀.',c:'#c79bff'},
      {n:'미아',t:'동쪽 능선에 사람 마을이 있다고 들었어요. 장비를 보강해요.',c:'#9fe8c4'} ]); },
  ev_kor_encounter:()=>{
    if(storyFlags.ch3done) return; // 이미 완료면 재발동 금지('6' 타일/길목 중복 방지)
    showMsg([
      "고원 한복판 — 그림자 무리에 둘러싸인 사내가 단검을 휘두르고 있다.",
      {n:'???',t:'쳇, 수가 너무 많잖아… 거기 당신들! 구경만 할 거야?!',c:'#f0c27a'},
      {n:'테리',t:'(도울 수밖에!) 카엘, 미아 — 갑니다!',c:'#7cc4ff'} ],
      ()=>{ startBattle(['warden','raider','raider'],true,{onWin:'ev_kor_join'}); }); },
  ev_kor_join:()=>{
    showMsg([
      {n:'코르',t:'…살았군. 고맙다. 난 코르, 그림자를 쫓는 떠돌이지.',c:'#f0c27a'},
      {n:'카엘',t:'그림자를 쫓는다고? 그럼 우리와 길이 같네.',c:'#c79bff'},
      {n:'코르',t:'봉인이라… 재밌겠어. 끝까지 따라가 주지.',c:'#f0c27a'},
      "— 제3장 「잿빛 고원」 코르 합류 —",
      "동쪽 상인 마을 ◇ 에서 장비를 보강하고 다음 봉인을 준비하자." ],
      ()=>{ joinMember('코르'); storyFlags.ch3done=true; showMsg([{n:'코르',t:'코르가 합류했다! (연격·독침)',c:'#f0c27a'}], ()=>{ saveGame(); }); }); },
  ev_merchant_enter:()=>{ if(storyFlags.merchEntered) return; storyFlags.merchEntered=true;
    showMsg([
      "바람맞이 상인 마을 — 고원의 바람을 등진 작은 교역 마을.",
      {n:'코르',t:'여긴 내 단골이지. 좋은 물건 많아 — 미스릴·판금까지.',c:'#f0c27a'} ]); },
  ev_temple_enter:()=>{ if(storyFlags.templeEntered) return; storyFlags.templeEntered=true;
    showMsg([
      "잊혀진 신전 — 식어버린 돌기둥 사이로 희미한 룬빛이 맥동한다.",
      {n:'미아',t:'여기… 빛의 신전과 같은 양식이에요. 봉인의 근원에 관한 기록이 있을 거예요.',c:'#9fe8c4'},
      {n:'코르',t:'바닥 조심해. 함정(▲)이 깔려 있어. 장치(○) 둘을 모두 눌러야 안쪽 문(▦)이 열린다.',c:'#f0c27a'} ]); },
  ev_temple_guardian:()=>{
    if(storyFlags.ch4done) return; // 이미 완료면 재발동 금지
    showMsg([
      "안쪽 제단 — 거대한 석상이 천천히 눈을 뜬다.",
      {n:'카엘',t:'봉인의 비밀을 지키는 수호상이야. 넘어야 안으로 들어갈 수 있어.',c:'#c79bff'} ],
      ()=>{ startBattle(['golem','sentinel','sentinel'],true,{onWin:'ev_temple_secret'}); }); },
  ev_temple_secret:()=>{
    showMsg([
      "수호상이 멈추자, 제단의 룬이 일제히 빛난다.",
      "『여명의 빛은 본디 하나 — 세 봉인으로 나뉘어 균열을 눌러왔다.』",
      {n:'미아',t:'세 봉인이 다시 세워지면… 여명이 하나로 돌아온다는 뜻이에요.',c:'#9fe8c4'},
      {n:'카엘',t:'근원은 균열 너머. 누군가 그걸 노리고 봉인을 약하게 만든 거라면…',c:'#c79bff'},
      {n:'코르',t:'…그림자 군주. 소문이 사실이었군.',c:'#f0c27a'},
      "— 제4장 「잊혀진 신전」 완료 —",
      "마지막 봉인으로 향하는 길 — 신전 안쪽에 균열로 통하는 문 ▣ 이 열렸다." ],
      ()=>{ storyFlags.ch4done=true; saveGame(); }); },
  ev_rift_enter:()=>{ if(storyFlags.riftEntered) return; storyFlags.riftEntered=true;
    showMsg([
      "균열의 입구 — 공기가 검붉게 일렁이고, 마물의 기척이 사방에 가득하다.",
      {n:'???',t:'…여기까지 오다니. 가상하군. 허나 봉인은 이미 늦었다.',c:'#c0708a'},
      {n:'카엘',t:'이 목소리… 균열 너머의 존재. 그림자 군주야.',c:'#c79bff'},
      {n:'코르',t:'쫄 거 없어. 길을 막는 건 전부 베고 나간다!',c:'#f0c27a'} ]); },
  ev_rift_herald:()=>{
    if(storyFlags.ch5done) return; // 이미 완료면 재발동 금지
    showMsg([
      "균열이 꿈틀대며, 군주의 힘 일부가 형상을 이룬다.",
      {n:'???',t:'내 전조를 넘을 수 있다면, 제단으로 가 보아라.',c:'#c0708a'} ],
      ()=>{ startBattle(['herald','phantom','phantom'],true,{onWin:'ev_rift_after'}); }); },
  ev_rift_after:()=>{
    showMsg([
      "군주의 전조가 흩어지며, 안쪽 제단으로 통하는 길 ▣ 이 드러난다.",
      {n:'테리',t:'마지막 봉인이 저 너머야. 가자 — 끝을 보러.',c:'#7cc4ff'} ],
      ()=>{ storyFlags.ch5done=true; saveGame(); }); },
  ev_altar_enter:()=>{ if(storyFlags.altarEntered) return; storyFlags.altarEntered=true;
    showMsg([
      "종언의 제단 — 세 번째 봉인이 검붉은 빛 속에 잠들어 있다.",
      {n:'미아',t:'마지막이에요. 여명을 되돌릴 마지막 봉인.',c:'#9fe8c4'},
      {n:'카엘',t:'제단 ✦ 에서 충분히 쉬고, 봉인 封 앞에 서자.',c:'#c79bff'} ]); },
  /* ---- 심층 맵 이벤트 ---- */
  ev_grove_enter:()=>{ if(storyFlags.groveEntered) return; storyFlags.groveEntered=true;
    showMsg([
      "속삭이는 수림 — 나뭇잎 사이로 누군가의 속삭임 같은 바람이 분다.",
      {n:'카엘',t:'봉인석을 감싼 결계의 뿌리가 이 안쪽에 있어. 덩굴문(▦)이 길을 막고 있네.',c:'#c79bff'},
      {n:'카엘',t:'고대 장치(○) 둘을 모두 밟으면 문이 열려. 가시 함정(▲)은 피해서 가.',c:'#c79bff'},
      {n:'테리',t:'…카엘, 넌 봉인에 대해 어떻게 그렇게 잘 알아?',c:'#7cc4ff'},
      {n:'카엘',t:'…책에서 읽었어. 가자.',c:'#c79bff'} ]); },
  ev_grove_root:()=>{ if(storyFlags.key_forest) return;
    showMsg([
      "거대한 뿌리 덩어리가 봉인석 쪽으로 뻗은 결계를 붙들고 있다.",
      {n:'테리',t:'저게 결계의 뿌리군. 끊어 낸다!',c:'#7cc4ff'} ],
      ()=>{ startBattle(['rootguard','thornling'],true,{onWin:'ev_grove_after'}); }); },
  ev_grove_after:()=>{
    showMsg([
      "결계의 뿌리가 말라붙으며 흩어진다. 그 순간 — 희미한 목소리가 섞여 들린다.",
      {n:'???',t:'…집에… 돌아가고 싶어…',c:'#8a93ad'},
      {n:'테리',t:'방금… 사람 목소리 아니었어?',c:'#7cc4ff'},
      {n:'카엘',t:'…바람 소리일 거야. 결계가 풀렸어. 숲의 봉인 封 으로 가자.',c:'#c79bff'} ],
      ()=>{ storyFlags.key_forest=true; saveGame(); }); },
  ev_cavern_enter:()=>{ if(storyFlags.cavernEntered) return; storyFlags.cavernEntered=true;
    showMsg([
      "수정 공동 — 검은 수정이 벽과 천장을 뒤덮고 희미하게 맥동한다.",
      {n:'미아',t:'이 수정이 봉인석까지 자라난 거예요. 뿌리가 되는 마물이 안쪽에 있어요.',c:'#9fe8c4'},
      {n:'카엘',t:'장치(○)는 둘. 수정문(▦) 너머가 그놈의 둥지야.',c:'#c79bff'} ]); },
  ev_cavern_maw:()=>{ if(storyFlags.key_cave) return;
    showMsg([
      "수정을 씹어 삼키던 거대한 마물이 천천히 고개를 든다.",
      {n:'미아',t:'수정 포식자… 저걸 쓰러뜨리면 봉인석의 수정도 부서질 거예요!',c:'#9fe8c4'} ],
      ()=>{ startBattle(['crystalmaw','geode','geode'],true,{onWin:'ev_cavern_after'}); }); },
  ev_cavern_after:()=>{
    showMsg([
      "수정 포식자가 쓰러지자, 동굴 전체의 검은 수정에 금이 간다.",
      {n:'???',t:'…춥다… 빛이… 보고 싶어…',c:'#8a93ad'},
      {n:'미아',t:'…들으셨어요? 마물이 쓰러질 때마다 목소리가….',c:'#9fe8c4'},
      {n:'카엘',t:'지금은 봉인이 먼저야. 동굴의 봉인 封 으로 돌아가자.',c:'#c79bff'} ],
      ()=>{ storyFlags.key_cave=true; saveGame(); }); },
  ev_ridge_enter:()=>{ if(storyFlags.ridgeEntered) return; storyFlags.ridgeEntered=true;
    showMsg([
      "바람 능선 — 상인 마을로 이어지는 좁은 산길. 돌풍이 몸을 밀어낸다.",
      {n:'코르',t:'이 능선엔 주인이 있어. 돌풍을 부리는 놈이지. 마을 앞 길목(동남쪽)을 막고 있을 거다.',c:'#f0c27a'},
      {n:'코르',t:'상자도 몇 개 숨겨 놨다는 소문이야. 내 활이 될 만한 것도 있으면 좋겠군.',c:'#f0c27a'} ]); },
  ev_ridge_lord:()=>{ if(storyFlags.ridgeDone) return;
    showMsg([
      "길목 한가운데, 회오리가 사람 형상으로 뭉친다.",
      {n:'코르',t:'나왔군, 돌풍의 주인. 화살이 휘니까 가까이서 끝내자!',c:'#f0c27a'} ],
      ()=>{ startBattle(['galelord','harrier','harrier'],true,{onWin:'ev_ridge_after'}); }); },
  ev_ridge_after:()=>{
    showMsg([
      "돌풍이 잦아들고, 능선 아래로 상인 마을의 지붕이 보인다.",
      {n:'코르',t:'…형도 이 길을 지나갔을까.',c:'#f0c27a'},
      {n:'미아',t:'형이요?',c:'#9fe8c4'},
      {n:'코르',t:'아니, 혼잣말이야. 가자 — 마을에서 장비부터 보강하지.',c:'#f0c27a'} ],
      ()=>{ storyFlags.ridgeDone=true; saveGame(); }); },
  ev_abyss_enter:()=>{ if(storyFlags.abyssEntered) return; storyFlags.abyssEntered=true;
    showMsg([
      "균열 심부 — 땅과 하늘의 구분이 사라지고, 검붉은 빛이 맥박처럼 뛴다.",
      {n:'카엘',t:'제단은 이 너머야. 장치(○) 둘로 안쪽 문(▦)을 열어야 해.',c:'#c79bff'},
      {n:'미아',t:'이곳의 그림자들… 울고 있는 것처럼 들려요.',c:'#9fe8c4'} ]); },
  ev_abyss_maw:()=>{ if(storyFlags.abyssDone) return;
    showMsg([
      "제단으로 가는 길목을, 입만 남은 거대한 그림자가 틀어막고 있다.",
      {n:'테리',t:'마지막 관문이군. 전원, 간다!',c:'#7cc4ff'} ],
      ()=>{ startBattle(['voidmaw','voidling','voidling'],true,{onWin:'ev_abyss_after'}); }); },
  ev_abyss_after:()=>{
    showMsg([
      "심부의 아귀가 흩어지며, 수많은 목소리가 한꺼번에 스쳐 지나간다.",
      {n:'???',t:'…빛을… 돌려줘…',c:'#8a93ad'},
      {n:'테리',t:'…카엘. 저 그림자들, 대체 뭐야.',c:'#7cc4ff'},
      {n:'카엘',t:'…마지막 봉인을 세우고 나면, 전부 말할게. 약속해.',c:'#c79bff'} ],
      ()=>{ storyFlags.abyssDone=true; saveGame(); }); },
  ev_after_seal3:()=>{ playBGM('field');
    showMsg([
      "세 봉인이 모두 여명의 빛을 되찾았다.",
      "흩어졌던 빛이 하나로 모이며, 균열이 서서히 닫힌다.",
      "잿빛에 잠겼던 아르겐에 — 오랜만의 아침이 밝아온다.",
      {n:'미아',t:'…해냈어요. 여명이 돌아왔어요.',c:'#9fe8c4'},
      {n:'테리',t:'모두의 힘으로. 우리 넷이 함께였으니까.',c:'#7cc4ff'},
      {n:'코르',t:'근데 카엘 — 봉인 너머의 그 기운, 아직 사라지지 않았어.',c:'#f0c27a'},
      {n:'카엘',t:'…그래. 여명의 근원은 균열 너머. 그리고 그걸 노리는 자도.',c:'#c79bff'},
      "먼 어둠 속, 거대한 그림자가 천천히 눈을 뜬다.",
      {n:'그림자 군주',t:'봉인을 되세운 자들이라… 흥미롭군. 다음엔 내가 직접 가지.',c:'#c0708a'},
      "— 모두의 픽셀모험 · 제1부 「세 봉인」 끝 —",
      "플레이해 주셔서 감사합니다!  타이틀에서 「이어하기」를 누르면 제2부가 시작됩니다." ],
      ()=>{ storyFlags.part1Clear=true; saveGame(); // 엔딩 후에도 최종 기록 유지(이어하기 가능, 2부 인계용)
        stopBGM(); bgm.started=false; state='title'; titleSel=1; }); },
},
bossScenes:{
    seal1:{ intro:[
      {n:'카엘',t:'첫 번째 봉인의 수호물이야. 시험을 통과해야 봉인이 여명에 응답해.',c:'#c79bff'},
      "봉인석이 검게 물들며, 거대한 그림자가 몸을 일으킨다 — 균열의 수호물!"] },
    seal2:{ intro:[
      {n:'미아',t:'두 번째 봉인의 수호물… 심연 그 자체예요. 조심해요.',c:'#9fe8c4'},
      {n:'테리',t:'미아, 뒤는 맡길게. 간다!',c:'#7cc4ff'},
      "어둠이 소용돌이치며 거대한 형상이 솟아오른다 — 심연의 수호물!"] },
    seal3:{ intro:[
      {n:'카엘',t:'마지막 봉인의 수호물 — 종언의 수호물이야. 전력을 다해!',c:'#c79bff'},
      {n:'테리',t:'여기까지 왔어. 모두… 끝내자!',c:'#7cc4ff'},
      "제단이 검붉게 타오르며 거대한 그림자가 솟구친다 — 종언의 수호물!"] },
},
});
/* 심층 맵은 본 지역의 팔레트를 공유 */
for(const [a,b] of [['grove','forest'],['cavern','cave'],['ridge','highlands'],['abyss','rift']]) CONTENT.areas[a].pal=CONTENT.areas[b].pal;
