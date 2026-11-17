/* 모두의 픽셀모험 — 제3부 「균열 너머」 데이터 (제작 중)
   지금 들어 있는 것: 제15장, 1차 전직 직업 8개와 그 기술·특성. 16장부터는 아직 없다. */
(function(){
"use strict";
/* ---- 화자 색 ---- */
const T='#7cc4ff', K='#c79bff', M='#9fe8c4', C='#f0c27a', LORD='#c0708a', GARN='#d8b070', NPC='#d9cdb5', FOLK='#b8b0d8', RIN='#ffd9a0';
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
  tower:{ bg:'#06060a', floor:'#262630', wall:'#14141c', grass:'#34344a', altar:'#2a3a66', boss:'#4a2a3a', chest:'#3a2e1a', detail:'rgba(255,190,120,.07)', rock:'#34343e', rock2:'#2a2a34' },
};

definePart(3,{

/* ================= 제15장 「빛 없는 땅」 ================= */
goals:{3:[
  ['p3Child','동쪽으로 걸어 사람이 사는 곳을 찾자'],
  ['ch15done','잿등 마을 남쪽 ▣ 꺼진 등대의 「돌아오지 못한 자」를 만나자'],
  ['ch16done','제16장은 준비 중입니다 — 그동안 숨은 강적(強)과 전리품을 찾아보자'],
]},

enemies:{
  /* 15장 — 모습을 잃은 자들. 빛(holy)에 약한 것이 많다 */
  ashHound:   {weak:'ice',  name:'잿빛 사냥개',  ...reg(15,{hp:.9,spd:14}),      color:'#5a5a66',look:'wolf',palx:{f:'#5a5a66',F:'#3a3a44',l:'#9a9aa8',e:'#ffb060'}},
  ashWisp:    {weak:'holy', name:'재의 불티',    ...reg(15,{hp:.8,mag:1.12}),    color:'#8a7a70',look:'wraith',palx:{g:'#8a7a70',G:'#5a4e48',l:'#d8c8b8',e:'#ffb060'},aiMagic:0.5},
  formless:   {weak:'holy', name:'모습 잃은 자', ...reg(15,{hp:1.1}),            color:'#2a2a3a',look:'shade',palx:{g:'#3a3a52',G:'#22222e',e:'#fff3b8'},aiMagic:0.3},
  lampMoth:   {weak:'arrow',name:'등불 나방',    ...reg(15,{hp:.75,spd:17}),     color:'#b08a5a',look:'bat',palx:{b:'#b08a5a',B:'#7a5e3a',l:'#f0d0a0'}},
  hollowGuard:{weak:'bolt',resist:'arrow',name:'빈 갑주',...reg(15,{hp:1.35,def:1.3,spd:9}),color:'#5a5a70',look:'sentinel',palx:{g:'#5a5a70',G:'#3a3a4c',l:'#9a9ab0',e:'#ffb060'}},
  returner:   {atkFx:'dark',weak:'holy',moves:['eatk','efocus','edrain','eflurry','eaoe'],enrage:0.35,name:'돌아오지 못한 자',...bos(15), hp:7200,atk:96,mag:84, color:'#2a2a3a',look:'phantom',big:2,palx:{p:'#34344a',P:'#1c1c28',e:'#ffb060'}},
},

equip:{
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
            {x:14,y:5,to:'lamptown',tx:13,ty:5,label:'골짜기',need:'ch16ready',block:'동쪽 골짜기로 가는 길은 다음 이야기에서 이어진다. (제16장은 준비 중입니다)'} ],
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
          "등대에 불이 들어 마을이 조금 밝아졌다. 동쪽 골짜기로 가는 길은 다음 이야기에서 이어진다." ].filter(Boolean),
          ()=>{ storyFlags.ch15done=true; saveGame(); }); }); }); },
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
