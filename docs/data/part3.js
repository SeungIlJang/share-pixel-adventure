/* 모두의 픽셀모험 — 제3부 「균열 너머」 데이터 (15~22장, 결말까지)
   1차·2차 전직 직업 16개와 그 기술·특성, 임시 동료 가른이 여기 들어 있다. */
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
  road: { bg:'#08070a', floor:'#2e2a32', wall:'#1a161e', grass:'#3c3448', altar:'#2a3a66', boss:'#4a2a3a', chest:'#3a2e1a', detail:'rgba(192,112,138,.08)', rock:'#3a3440', rock2:'#2e2a34', tuft:'#6a5a78' },
  court:{ bg:'#09080b', floor:'#34303a', wall:'#1e1a24', grass:'#3a3a48', altar:'#2a3a66', boss:'#4a2a3a', chest:'#3a2e1a', detail:'rgba(192,112,138,.08)', roof:'#4a4054', roof2:'#3c3446' },
  keep: { bg:'#050406', floor:'#241f2a', wall:'#120e16', grass:'#32283c', altar:'#2a3a66', boss:'#5a1a34', chest:'#3a2e1a', detail:'rgba(192,112,138,.09)', rock:'#30283a', rock2:'#261f2e' },
  dusk: { bg:'#0a0907', floor:'#3a342a', wall:'#221c14', grass:'#4a4430', altar:'#2a3a66', boss:'#5a3a1a', chest:'#3a2e1a', detail:'rgba(255,220,150,.09)', rock:'#463e2e', rock2:'#3a3426', tuft:'#8a7a4a' },
  core: { bg:'#0c0a06', floor:'#3e3826', wall:'#241e10', grass:'#504828', altar:'#2a3a66', boss:'#6a4a1a', chest:'#3a2e1a', detail:'rgba(255,230,160,.12)', rock:'#4a4230', rock2:'#3e3828' },
  stair:{ bg:'#030305', floor:'#1e1e2a', wall:'#0c0c14', grass:'#2a2a40', altar:'#2a3a66', boss:'#3a1a4a', chest:'#3a2e1a', detail:'rgba(255,230,160,.06)', rock:'#28283a', rock2:'#20202e' },
  tower:{ bg:'#06060a', floor:'#262630', wall:'#14141c', grass:'#34344a', altar:'#2a3a66', boss:'#4a2a3a', chest:'#3a2e1a', detail:'rgba(255,190,120,.07)', rock:'#34343e', rock2:'#2a2a34' },
};

definePart(3,{

quests:{
  q7:{area:'lamptown',x:13,y:3,name:'등불 깁는 이',color:'#9a94b4',shade:true,title:'심지가 될 불티',kill:{ashWisp:6},
    ask:['등 심지가 다 닳았소. 들판의 불티를 흩으면 재 속에 불씨가 남는데, 그걸로 심지를 꼬지.','우리는 들판에 오래 못 있소. 대신 좀 흩어 주겠소?'],
    doing:'불씨가 아직 모자라오. 등 둘은 오늘 밤을 못 넘길 게요.',
    thanks:['이만하면 집집마다 심지를 갈겠소. 들판에서 주운 것이오. 우리한텐 쓸모없지만, 당신들에겐 다르겠지.'],
    after:'새 심지는 오래 타오. 저편 사람 손을 빌릴 줄은 몰랐소.',reward:{gold:1000,items:{lifeSeed:1}}},
  q8:{area:'hollowrest',x:3,y:3,name:'이름을 적는 이',color:'#8a88a4',shade:true,title:'돌아올 이름들',kill:{faceless:8},
    ask:['나는 여기 사람들의 이름을 적어 두는 일을 해. 잊기 전에. 잊어도 다시 읽어 줄 수 있게.','골짜기의 얼굴 없는 자들은, 흩어 놓으면 가끔 이름 하나를 흘리고 가. 그걸 주워 오고 싶어.'],
    doing:'오늘은 이름이 두 개 돌아왔어. 아직 빈 줄이 많아.',
    thanks:['여덟 줄을 채웠어. 「도윤」, 「새벽이」… 읽어 주니까, 저쪽에서 둘이 고개를 들었어. 이건 고맙다는 뜻이야.'],
    after:'공책이 두꺼워졌어. 언젠가 다 읽어 줄 날이 오겠지.',reward:{items:{wisdomSeed:1,guardSeed:1}}},
  q9:{area:'lampcity',x:7,y:3,name:'거울 닦는 이',color:'#d0c0a0',title:'거울에 앉는 나방',kill:{mothKin:8},
    ask:['나방 떼가 거울마다 앉아서 닦아도 닦아도 뿌옇습니다. 탑 안에서 계속 나와요.','의회는 쉬쉬하지만, 닦는 사람은 압니다. 좀 줄여 주시겠습니까.'],
    doing:'오늘도 거울 셋을 다시 닦았습니다. 아직 많아요.',
    thanks:['거울이 맑습니다. …맑아지니까 알겠네요. 불이 얼마나 작은지. 그래도 고맙습니다. 받으세요.'],
    after:'거울은 제가 닦겠습니다. 불은 — 당신들에게 부탁합니다.',reward:{gold:2000,items:{powerSeed:1}}},
  q10:{area:'oathcourt',x:3,y:4,name:'뜰지기',color:'#8a8098',shade:true,title:'약속을 깬 기사',flag:'elite_kingsroad',goal:'왕의 길의 숨은 강적(強)을 쓰러뜨리자',
    ask:['삼백 해 전 약속의 날, 이 뜰을 지키던 기사 하나가 달아났소. 문이 열리지 않으리란 걸 먼저 알아챈 게지.','그자가 아직 왕의 길을 떠도오. 부끄러움이 굳어 저리 된 게요. 쉬게 해 주시오.'],
    doing:'길목에서 아직 갑주 소리가 나오.',
    thanks:['갔구려. 삼백 해 만에 뜰이 조용하오. 그자가 두고 간 것이오. 가져가시오.'],
    after:'약속의 자리를 지키는 건 이제 나 하나요. 문이 열리는 걸 보고 싶소.',reward:{gold:3000,items:{lifeSeed:2}}},
},

/* 제단의 동료 대화(3부). 선택과 전직에 따라 달라지는 것은 함수로 적는다 */
talks:{
  t15:{ch:15,when:'ch15done',title:'할렌의 어깨',lines:()=>{ const j=(party.find(q=>q.name==='테리')||{}).job; return [
    ['테리','그날 밤 벤 게 사람이었어. 딸한테 줄 빛을 구하러 온.'],
    ['미아','테리는 몰랐어요.'],
    ['테리','카엘한테는 「몰랐다」가 변명이 안 된다고 생각했거든. 나한테만 된다고 하면 이상하잖아.'],
    ['카엘','……'],
    j==='guardian' ? ['테리','그래서 막는 쪽을 골랐어. 베기 전에, 한 번은 볼 수 있게.']
      : j==='blademaster' ? ['테리','그래서 벨 것을 고르기로 했어. 빛이 지나갈 길을 막는 것만.'] : ['테리','다음엔, 베기 전에 볼 거야.'],
    ['코르','검사가 생각이 많아졌네. 나쁘지 않아.'] ]; }},
  t16:{ch:16,when:'ch16done',title:'5년 치 이야기',lines:[
    ['코르','형이 편지 한 장 안 쓴 이유가 뭐였는지 알아? 「쓰면 네가 올 테니까」래.'],
    ['미아','그래도 오셨잖아요.'],
    ['코르','그러게. 5년 걸렸지만.'],
    ['테리','가른은 저 사람들을 혼자 지켰어. 매일 저 벼랑을 오르내리면서.'],
    ['코르','…형은 원래 그래. 말을 안 해서 그렇지.'],
    ['카엘','닮았네, 형제가.'],
    ['코르','뭐가.'],
    ['카엘','말 안 하는 거.'] ]},
  t17:{ch:17,when:'ch17done',title:'종 줄 앞에서',lines:()=> storyFlags.p3Truth==='tell' ? [
    ['미아','종을 칠 때 손이 떨렸어요. 사람들이 흩어지면 제 탓이니까요.'],
    ['테리','안 흩어졌잖아.'],
    ['미아','몇 집은 떠났어요. 그건 제가 기억할 거예요.'],
    ['카엘','그래도 남은 사람들은, 이제 속고 있지 않아.'],
    ['미아','네. 그게… 생각보다 훨씬 가벼워요.'] ] : [
    ['미아','말하지 않기로 한 건 저예요. 그러니까 이 무게는 제 거예요.'],
    ['테리','혼자 들지 마. 우리도 알고 있잖아.'],
    ['미아','…그러네요. 넷이서 알고 있는 거네요.'],
    ['카엘','근원을 되찾으면 네 입으로 말해. 그때는 내가 옆에 있을게.'],
    ['미아','약속이에요.'] ]},
  t18:{ch:18,when:'ch18done',title:'삼백 해의 빚',lines:[
    ['카엘','서른 해마다 열기로 한 문을, 삼백 해 동안 한 번도 안 열었어. 우리 집안이.'],
    ['코르','넌 태어나지도 않았을 때잖아.'],
    ['카엘','석 달 전에는 태어나 있었어. 그리고 닫았지.'],
    ['테리','그럼 이번엔 열면 돼.'],
    ['카엘','…그렇게 간단히 말해도 돼?'],
    ['테리','간단한 건 아니지. 근데 할 일은 그거 하나잖아.'],
    ['미아','같이 열어요. 넷이서.'] ]},
  t19:{ch:19,when:'ch19done',title:'사도들의 선물',lines:[
    ['코르','형이 「이자까지 쳐서 갚는다」래. 빌려준 건 활인데, 갚은 건 더 큰 거야.'],
    ['미아','로완 님 빛이 제 안에 있어요. 따뜻한데, 조금 서늘해요.'],
    ['테리','왕관의 사도는 「모두를 지는 무게」라고 했어. 무겁긴 무거워.'],
    ['카엘','조수의 사도가 그러더라. 빛은 오가야 한다고. …그 말이 계속 걸려.'],
    ['코르','뭐가 걸려.'],
    ['카엘','아직 모르겠어. 근원에 가면 알 것 같아.'] ]},
  t20:{ch:20,when:'ch20done',title:'군주와 걷는 길',lines:[
    ['미아','저 사람, 성에 등불 하나 안 켜고 살았어요. 자기 몫까지 나눠 주느라.'],
    ['테리','그런 사람이, 우리 쪽 빛을 다 가져가려고 했어.'],
    ['코르','둘 다 맞는 말이지. 착한 사람이 나쁜 셈을 한 거야.'],
    ['카엘','우리 선조처럼.'],
    ['테리','그러니까 이번엔 셈을 다시 하자. 넷… 아니, 다섯이서.'],
    ['코르','군주도 끼워 주는 거야?'],
    ['테리','같이 걷고 있잖아.'] ]},
  t21:{ch:21,when:'ch21done',title:'마지막 밤',lines:()=>[
    storyFlags.p3Keeper==='turns' ? ['테리','해마다 번갈아 지키기로 했어. 내년엔 우리 차례야.'] : ['테리','근원은 군주한테 맡겼어. 삼백 해를 기다린 사람이니까.'],
    ['코르','그 전에 저 밑의 굶주림부터.'],
    ['미아','무섭지 않아요? 저는 조금 무서워요.'],
    ['코르','무섭지. 근데 형한테 데리러 간다고 했거든.'],
    ['카엘','난 서고에 적을 말을 정해 놨어.'],
    ['테리','뭐라고?'],
    ['카엘','이기면 알려 줄게.'],
    ['테리','그럼 이겨야겠네.'] ]},
  t22:{ch:22,when:'part3Clear',title:'등대가 보이는 밤',lines:[
    ['코르','눈이 익으니까 이 정도 밝기도 괜찮네.'],
    ['미아','저편 등대가 깜빡여요. 누가 손을 흔드는 것 같아요.'],
    ['카엘','빛이 오가는 거야. 숨 쉬듯이.'],
    ['테리','처음엔 봉인만 고치면 끝인 줄 알았는데.'],
    ['코르','끝이 어딨어. 내일은 형한테 가야 하고.'],
    ['미아','저는 원장님께요.'],
    ['카엘','난 서고.'],
    ['테리','그럼 모레, 여기서 다시 보자. 넷이서.'] ]},
},

/* ================= 제15장 「빛 없는 땅」 ================= */
goals:{3:[
  ['p3Child','동쪽으로 걸어 사람이 사는 곳을 찾자'],
  ['ch15done','잿등 마을 남쪽 ▣ 꺼진 등대의 「돌아오지 못한 자」를 만나자'],
  ['garnJoined','잿등 마을 동쪽 골짜기로 가자'],
  ['ch16done','쉼터 남쪽 ▣ 골짜기 밑바닥의 「잊힌 무리」를 막자'],
  ['cityEntered','쉼터 동쪽으로 나가 등불 도시를 찾자'],
  ['ch17done','등불 도시 남쪽 ▣ 대등탑의 나방 떼를 몰아내자'],
  ['ch18done','등불 도시 북쪽 ▣ 선조들의 서고 — 동쪽 끝 기록실로 가자'],
  ['courtEntered','등불 도시 동쪽 성문으로 나가 군주의 성을 향하자'],
  ['ch19done','약속의 뜰 동쪽 성문에서 네 사도의 시험을 받자'],
  ['ch20done','군주의 성 한가운데 — 옥좌의 방으로 가자'],
  ['ch21done','약속의 뜰 북쪽 길로 빛의 근원에 가자'],
  ['ch22done','근원 안쪽 계단을 내려가 굶주림을 막자'],
  ['p3After','이야기를 모두 마쳤다 — 숨은 강적(強)과 전리품, 도감을 채워 보자'],
]},

/* 숨은 강적(3부) — 길에서 벗어난 곳. 싸우지 않아도 이야기는 진행된다. lv = 권장 레벨(이보다 높으면 강해진다) */
elites:{ ashfield:{x:20,y:9,id:'firstLost',lv:24}, cinderpath:{x:20,y:9,id:'mirrorKing',lv:27}, kingsroad:{x:1,y:9,id:'oathBreaker',lv:30}, sourcepath:{x:20,y:1,id:'firstDark',lv:32} },
enemies:{
  firstLost:  {elite:'ashfield',  name:'처음 길 잃은 자', hp:9000,atk:150,mag:137,def:37,spd:15,exp:4600,gold:2600,color:'#3a3a52',boss:true,weak:'holy',look:'phantom',big:2,palx:{p:'#44445e',P:'#24243a',e:'#fff3b8'},atkFx:'dark',moves:['eflurry','edrain','ecurse','efocus','eaoe']},
  mirrorKing: {elite:'cinderpath',name:'거울 속의 왕',    hp:14000,atk:216,mag:200,def:44,spd:16,exp:5400,gold:3000,color:'#d8d0b0',boss:true,weak:'holy',resist:'fire',look:'wraith',big:2,palx:{g:'#d8d0b0',G:'#9a9478',l:'#ffffff',e:'#7cc4ff'},atkFx:'dark',moves:['emagic','echarge','eblast','ecurse','efocus']},
  oathBreaker:{elite:'kingsroad', name:'약속을 깬 기사',  hp:19000,atk:256,mag:215,def:48,spd:17,exp:6400,gold:3400,color:'#6a2a3a',boss:true,weak:'bolt',look:'raider',big:2,palx:{b:'#6a2a3a',B:'#421824',e:'#ffe27a'},atkFx:'smash',moves:['esmash','eflurry','echarge','eblast'],enrage:0.4},
  firstDark:  {elite:'sourcepath',name:'첫 번째 어둠',    hp:28000,atk:300,mag:268,def:54,spd:18,exp:7600,gold:4000,color:'#1a1024',boss:true,weak:'holy',look:'gatekeeper',big:2,palx:{g:'#2a1a3a',G:'#120a1c',e:'#ffe9a0'},atkFx:'dark',moves:['ecurse','eflurry','echarge','eblast','edrain','efocus'],enrage:0.5},
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
  /* 19~20장 — 군주의 성을 지키는 것들 */
  roadKnight:{weak:'bolt', name:'길목의 기사',  ...reg(19,{hp:1.2,def:1.2}),    color:'#5a4a6a',look:'raider',palx:{b:'#5a4a6a',B:'#3c3048',e:'#ff8aa0'}},
  crownHound:{weak:'ice',  name:'왕의 사냥개',  ...reg(19,{hp:.9,spd:16}),      color:'#4a3a4a',look:'wolf',palx:{f:'#4a3a4a',F:'#2e222e',l:'#8a7a8a',e:'#ff8aa0'}},
  oathWisp:  {weak:'holy', name:'약속의 불티',  ...reg(19,{hp:.8,mag:1.15}),    color:'#a07088',look:'wraith',palx:{g:'#a07088',G:'#6a4658',l:'#e0b8c8',e:'#ffffff'},aiMagic:0.55},
  keepKnight:{weak:'bolt',resist:'arrow',name:'성의 갑주',...reg(20,{hp:1.35,def:1.3,spd:9}),color:'#4a405a',look:'sentinel',palx:{g:'#4a405a',G:'#2e2838',l:'#8a80a0',e:'#ff4466'}},
  keepMage:  {weak:'holy', name:'성의 술사',    ...reg(20,{hp:.85,mag:1.18}),   color:'#6a3a5a',look:'wraith',palx:{g:'#6a3a5a',G:'#42243a',l:'#c080a8',e:'#ff4466'},aiMagic:0.6},
  throneGolem:{weak:'ice', name:'옥좌의 석상',  ...reg(20,{hp:1.5,atk:1.1,spd:8}),color:'#5a5060',look:'golem',palx:{g:'#5a5060',G:'#3a3440',l:'#9a90a4',e:'#ff4466'}},
  keepShade:{weak:'holy', name:'왕의 그림자',  ...reg(20,{hp:1.0,spd:15}),     color:'#2a2030',look:'shade',palx:{g:'#3a2a44',G:'#20162a',e:'#ff4466'},aiMagic:0.35},
  lord2:     {atkFx:'dark',weak:'holy',moves:['eatk','ecurse','eflurry','echarge','eblast','esmash'],enrage:0.4,name:'그림자 군주',...bos(20,{spd:14}), hp:22000,atk:160,mag:140, color:'#3a2040',look:'gatekeeper',big:2,palx:{g:'#3a2a4a',G:'#221830',e:'#ff4466'}},
  /* 21~22장 — 근원에 모여든 것들 */
  paleHound: {weak:'ice',  name:'빛바랜 사냥개',...reg(21,{hp:.9,spd:17}),      color:'#b0a888',look:'wolf',palx:{f:'#b0a888',F:'#7a745c',l:'#f0e8c8',e:'#ff8a3a'}},
  emberWisp: {weak:'ice',resist:'fire',name:'첫 빛의 불티',...reg(21,{hp:.8,mag:1.18}),color:'#f0c060',look:'wraith',palx:{g:'#f0c060',G:'#b08030',l:'#fff0c0',e:'#ffffff'},aiMagic:0.6},
  lightEater:{weak:'fire', name:'빛 갉는 뿌리', ...reg(21,{hp:1.1,spd:12}),     color:'#4a3a2a',look:'creeper',palx:{g:'#5a4630',G:'#38281a',l:'#8a7450',e:'#ffe9a0'}},
  fadedGuard:{weak:'bolt',resist:'arrow',name:'빛바랜 파수',...reg(21,{hp:1.4,def:1.3,spd:9}),color:'#8a8470',look:'sentinel',palx:{g:'#8a8470',G:'#5c5848',l:'#c8c2a8',e:'#ffe9a0'}},
  gnawer:    {atkFx:'dark',weak:'fire',moves:['eatk','evenom','edrain','eflurry','eaoe'],enrage:0.35,name:'근원을 좀먹는 것',...bos(21), hp:24000,atk:168,mag:146, color:'#4a3a2a',look:'creeper',big:2,palx:{g:'#5a4630',G:'#38281a',l:'#8a7450',e:'#ffe9a0'}},
  famineBit: {weak:'holy', name:'굶주림의 조각',...reg(22,{hp:.9,spd:14}),      color:'#2a2440',look:'slime',palx:{g:'#3a3058',G:'#221a38',l:'#6a5a98',w:'#c8b8ff'}},
  famineMaw: {weak:'holy', name:'굶주린 아가리',...reg(22,{hp:1.5,atk:1.12,spd:9}),color:'#30203a',look:'brute',palx:{b:'#3a2848',B:'#22162c',l:'#6a5080',e:'#ffe9a0'}},
  famineShade:{weak:'holy',name:'굶주린 그림자',...reg(22,{hp:1.0,spd:16}),     color:'#1e1a2c',look:'shade',palx:{g:'#2c2640',G:'#16121e',e:'#ffe9a0'},aiMagic:0.4},
  famineEye: {weak:'arrow',name:'굶주린 눈',    ...reg(22,{hp:.8,mag:1.2,spd:15}),color:'#4a3a6a',look:'gale',palx:{a:'#4a3a6a',A:'#2e2444',l:'#9a80d0',e:'#ffe9a0'},aiMagic:0.6},
  famine:    {atkFx:'dark',weak:'holy',moves:['eatk','ecurse','eflurry','edrain','eaoe'],enrage:0.35,name:'삼백 해의 굶주림',...bos(22), hp:24000,atk:176,mag:152, color:'#221a30',look:'brute',big:2,palx:{b:'#2e2440',B:'#181224',l:'#5a4a80',e:'#ffe9a0'}},
  famineCore:{atkFx:'dark',weak:'holy',moves:['emagic','echarge','eblast','ecurse','eflurry','esmash'],enrage:0.4,name:'굶주림의 알맹이',...bos(22,{spd:15}), hp:28000,atk:184,mag:164, color:'#3a2a5a',look:'gale',big:2,palx:{a:'#3a2a5a',A:'#20163a',l:'#8a70c8',e:'#ffffff'}},
},

members:{
  /* 16장의 임시 동료. 장비 없이도 제 몫을 하도록 기본 능력치를 높게 잡았다(장비를 끼우면 그만큼 더 세지고, 떠날 때 돌려받는다) */
  '가른':{cls:'궁수', art:'garn', stats:[150,30,62,36,10,24], skills:['garnVolley'], color:GARN, set:{guest:true,title:'화살의 사도',learnKey:'garn',palx:{a:'#5a6480',A:'#3c445c',l:'#8e9ab8'}}},
},

equip:{
  /* 숨은 강적의 고유 장비(3부) */
  lostLantern:{name:'길 잃은 자의 등불',slot:'ring', mag:7,def:6,spd:3,fx:'first',uniq:1,price:0},
  mirrorGuard:{name:'거울 손방패',     slot:'hands',def:11,mag:5,fx:'guardCounter',uniq:1,price:0},
  oathBlade:  {name:'깨진 약속의 검',  slot:'weapon',cls:['검사'],atk:58,fx:'pierce',uniq:1,price:0},
  firstLight: {name:'첫 빛의 관',      slot:'head', def:16,atk:8,mag:8,spd:4,fx:'weakUp',uniq:1,price:0},
  /* 21~22장 전리품 */
  paleFang:  {name:'빛바랜 송곳니', slot:'ring', atk:10,fx:'critUp',rare:1,price:2000},
  fadedHelm: {name:'빛바랜 투구',   slot:'head', def:19,fx:'aoeGuard',rare:1,price:2000},
  mawRing:   {name:'아가리의 반지', slot:'ring', atk:6,mag:6,fx:'lifeSteal',rare:1,price:2200},
  sourceShard:{name:'근원의 조각',  slot:'ring', atk:8,mag:8,def:4,fx:'regen',uniq:1,price:0},
  sharedDawn:{name:'나눈 새벽',     slot:'ring', atk:7,mag:7,def:7,spd:7,fx:'dawn',uniq:1,price:0},
  /* 9단계(샛별) — 약속의 뜰 */
  mornSword: {name:'샛별검',        slot:'weapon',cls:['검사'],atk:52,price:3400},
  mornStaff: {name:'샛별 지팡이',   slot:'weapon',cls:['주술사','치유사'],mag:52,price:3400},
  mornBow:   {name:'샛별궁',        slot:'weapon',cls:['궁수'],atk:52,price:3400},
  mornPlate: {name:'샛별 갑주',     slot:'armor',def:34,price:3000},
  mornRobe:  {name:'샛별 로브',     slot:'armor',def:22,mag:13,price:2800},
  mornHelm:  {name:'샛별 투구',     slot:'head',def:17,price:1800},
  /* 19~20장 전리품 */
  knightCrest:{name:'기사의 문장',  slot:'ring', atk:9,def:4,fx:'guardCounter',rare:1,price:1600},
  keepOrb:   {name:'성의 보주',     slot:'ring', mag:10,fx:'mpRegen',rare:1,price:1600},
  throneFist:{name:'석상의 주먹',   slot:'hands',atk:6,def:8,fx:'thorns',rare:1,price:1600},
  lordMantle:{name:'군주의 망토',   slot:'armor',def:30,mag:10,atk:6,fx:'endure',uniq:1,price:0},
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
  firstLost:{item:'lostLantern',part:3,elite:1}, mirrorKing:{item:'mirrorGuard',part:3,elite:1}, oathBreaker:{item:'oathBlade',part:3,elite:1}, firstDark:{item:'firstLight',part:3,elite:1},
  lord2:{item:'lordMantle',done:'ch20done',part:3}, gnawer:{item:'sourceShard',done:'ch21done',part:3}, famineCore:{item:'sharedDawn',done:'ch22done',part:3},
  paleHound:{item:'paleFang',rate:0.05,pity:20}, fadedGuard:{item:'fadedHelm',rate:0.05,pity:20}, famineMaw:{item:'mawRing',rate:0.05,pity:20},
  emberWisp:{item:'hiEther',rate:0.1}, lightEater:{item:'hiPotion',rate:0.12}, famineBit:{item:'hiPotion',rate:0.12}, famineEye:{item:'hiEther',rate:0.1},
  roadKnight:{item:'knightCrest',rate:0.05,pity:20}, keepMage:{item:'keepOrb',rate:0.05,pity:20}, throneGolem:{item:'throneFist',rate:0.05,pity:20},
  crownHound:{item:'hiPotion',rate:0.12}, oathWisp:{item:'hiEther',rate:0.1}, keepShade:{item:'hiEther',rate:0.1},
  mothKin:{item:'hiPotion',rate:0.12}, mirrorWisp:{item:'hiEther',rate:0.1}, pageBat:{item:'hiPotion',rate:0.12}, quillShade:{item:'hiEther',rate:0.1},
},

areas:{
  ashfield:{ name:'재의 들판', theme:'ash', tiles:'ash', bgm:'rift', hud:'3부 15장', pal:PAL.ash,
    src:[ "111111111111111111111111","100000220000000002200001","102200220011000002200501","102200000110022000000001",
          "100000000000002200011001","100000110006000000011001","100000110000007000000001","102200000220000000220001",
          "102200000220011000220001","100000050000011000000001","111111111111111111111111" ],
    enc:{ pool:['ashHound','ashWisp','formless'], rate:0.2, pow:0.95, hpw:1.1 }, respawn:{x:2,y:5},
    npcs:[], warps:[ {x:1,y:5,to:'riftgate',tx:8,ty:8,label:'균열의 문'},
            {x:22,y:5,to:'lamptown',tx:2,ty:5,label:'불빛',event:'ev_child',eventFlag:'p3Child'} ],
    loot:{'21,2':{item:'powerSeed'},'7,9':{gold:800,item:'hiPotion'}},
    eventTile:'ev_child', eventDone:'p3Child' },

  lamptown:{ name:'잿등 마을', theme:'town', tiles:'town', bgm:'town', hud:'3부 15장', pal:PAL.lamp,
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
      {x:12,y:7,color:'#c8a070',look:'rin',child:true,shade:()=>storyFlags.p3Child!=='share'&&!storyFlags.ch15done,name:'린',lines:()=> storyFlags.ch15done ? [
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
  deadlight:{ name:'꺼진 등대', theme:'temple', tiles:'tower', bgm:'dungeon', hud:'3부 15장', pal:PAL.tower,
    src:[ "1111111111111111","1000022000000081","1011111111111101","1010000022000101",
          "1010111111110101","1010100600590101","1010111111110101","1010000000220101",
          "1011101111111101","1800000700000051","1111111111111111" ],
    enc:{ pool:['formless','lampMoth','hollowGuard'], rate:0.22, pow:1.0, hpw:1.15 }, respawn:{x:2,y:1},
    npcs:[], warps:[ {x:1,y:1,to:'lamptown',tx:8,ty:8,label:'마을'} ],
    loot:{'10,5':{item:'ashRobe'},'14,9':{gold:1500,item:'hiEther'}},
    eventTile:'ev_returner', eventDone:'ch15done', onEnter:'ev_dead_enter' },

  /* ---- 제16장 ---- */
  valeroad:{ name:'잃은 자들의 골짜기', theme:'ash', tiles:'vale', bgm:'rift', hud:'3부 16장', pal:PAL.vale,
    src:[ "1111111111111111111111","1000022000001000000051","1011022000001002200001","1011000011000002200101",
          "1000000011000000000101","1000000000060000000001","1001100000000110000001","1001100220000110022001",
          "1000000220070000022001","1050000000000000000001","1111111111111111111111" ],
    enc:{ pool:['faceless','griefHowl','cliffBat'], rate:0.2, pow:1.04, hpw:1.12 }, respawn:{x:2,y:5},
    npcs:[], warps:[ {x:1,y:5,to:'lamptown',tx:13,ty:5,label:'마을'},
            {x:20,y:5,to:'hollowrest',tx:2,ty:5,label:'쉼터',event:'ev_garn_meet',eventFlag:'garnMet'} ],
    loot:{'20,1':{item:'wisdomSeed'},'2,9':{gold:1200,item:'hiEther'}},
    eventTile:'ev_garn_meet', eventDone:'garnMet' },

  hollowrest:{ name:'이름 없는 쉼터', theme:'town', tiles:'town', bgm:'town', hud:'3부 16장', pal:PAL.rest,
    src:[ "1111111111111111","1000000000000001","1011100000111001","1000000300000001",
          "1000000000000001","1000000000000001","1011000000011001","1000000000000001",
          "1000000000000001","1111111101111111","1111111111111111" ],
    enc:null, respawn:{x:3,y:5},
    npcs:[
      {x:8,y:5,color:GARN,name:'가른',look:'garn',when:'ch16done',lines:[
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
  valedeep:{ name:'골짜기 밑바닥', theme:'temple', tiles:'cliff', bgm:'dungeon', hud:'3부 16장', pal:PAL.deep,
    src:[ "111111111111111111","100022000007000001","111111111111111101","180000220000050001",
          "110111111111111111","100002200070000081","111111111111101111","150000022000000001",
          "111111111111911111","150006000000000001","111111111111111111" ],
    enc:{ pool:['faceless','valeBrute','lampEater'], rate:0.22, pow:1.35, hpw:1.3 }, respawn:{x:2,y:1},
    npcs:[], warps:[ {x:1,y:1,to:'hollowrest',tx:8,ty:8,label:'쉼터'} ],
    loot:{'13,3':{item:'guardSeed'},'1,7':{gold:1800,item:'hiPotion'},'1,9':{item:'lifeSeed'}},
    eventTile:'ev_throng', eventDone:'ch16done', onEnter:'ev_deep_enter' },

  /* ---- 제17장 ---- */
  cinderpath:{ name:'불티 날리는 길', theme:'ash', tiles:'cinder', bgm:'rift', hud:'3부 17장', pal:PAL.cinder,
    src:[ "1111111111111111111111","1500002200000000220001","1011002200110000220001","1011000000110011000001",
          "1000000110000011000101","1000000110000000000101","1002200000001100000001","1002200011001100220001",
          "1000000011000000220701","1000070000000050000001","1111111111111111111111" ],
    enc:{ pool:['cinderWolf','mirrorWisp','mothKin'], rate:0.2, pow:1.05, hpw:1.12 }, respawn:{x:2,y:5},
    npcs:[], warps:[ {x:1,y:5,to:'hollowrest',tx:13,ty:5,label:'쉼터'}, {x:20,y:5,to:'lampcity',tx:2,ty:5,label:'도시'} ],
    loot:{'1,1':{item:'powerSeed'},'14,9':{gold:1500,item:'hiEther'}} },

  lampcity:{ name:'등불 도시', theme:'town', tiles:'town', bgm:'town', hud:'3부 17장', pal:PAL.city,
    src:[ "111111111111111111","100000000000000001","101110011001110101","100000000000000001",
          "100000003000000001","100000000000000001","101100110011001101","100000000000000001",
          "100000000000000001","111111111011111111","111111111111111111" ],
    enc:null, respawn:{x:3,y:5},
    npcs:[
      {x:5,y:3,color:ROWAN,name:'로완',look:'rowan',lines:()=> storyFlags.ch17done ? ( storyFlags.p3Truth==='tell' ? [
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
            {x:16,y:5,to:'kingsroad',tx:2,ty:5,label:'성',need:'ch18done',block:'동쪽 성문은 닫혀 있다. 먼저 북쪽 서고의 일을 끝내자.'},
            {x:9,y:9,to:'lamptower',tx:2,ty:1,label:'대등탑'},
            {x:9,y:1,to:'archivehall',tx:2,ty:4,label:'서고',need:'ch17done',block:'북쪽 서고의 문은 닫혀 있다. 먼저 대등탑의 일을 끝내자.'} ],
    onEnter:'ev_city_enter' },

  /* 빗살 구조: 위쪽 복도에서 가지 셋이 아래로 뻗고, 가지 끝마다 장치. 동쪽 끝 문 너머가 불씨 그릇 */
  lamptower:{ name:'대등탑', theme:'temple', tiles:'tower', bgm:'dungeon', hud:'3부 17장', pal:PAL.glow,
    src:[ "111111111111111111","100002200000220001","110111101111011101","110111101111011191",
          "112111101111211101","110111171111011101","180001500100081101","111111101111111101",
          "111110008111111101","111111111150060001","111111111111111111" ],
    enc:{ pool:['mothKin','waxGuard','sootCreep'], rate:0.22, pow:1.1, hpw:1.15 }, respawn:{x:2,y:1},
    npcs:[], warps:[ {x:1,y:1,to:'lampcity',tx:9,ty:8,label:'도시'} ],
    loot:{'6,6':{item:'lampRobe'},'10,9':{gold:2000,item:'lifeSeed'}},
    eventTile:'ev_queen', eventDone:'ch17done', onEnter:'ev_tower_enter' },

  /* ---- 제18장 ---- */
  archivehall:{ name:'선조들의 서고', theme:'temple', tiles:'archive', bgm:'dungeon', hud:'3부 18장', pal:PAL.book,
    src:[ "11111111111111111111","10000002200000000051","10110110110110110101","10110110110110110101",
          "10000000000220000001","10110110110110110101","10110110110110110101","10022000000000002201",
          "10110110110110110101","15000000000000000001","11111111111111111111" ],
    enc:{ pool:['inkWraith','pageBat','quillShade'], rate:0.2, pow:1.0, hpw:1.1 }, respawn:{x:2,y:4},
    npcs:[], warps:[ {x:1,y:4,to:'lampcity',tx:9,ty:2,label:'도시'},
            {x:18,y:4,to:'archivevault',tx:2,ty:1,label:'기록실',event:'ev_arch_lore',eventFlag:'archLore'} ],
    loot:{'18,1':{item:'wisdomSeed'},'1,9':{gold:2000,item:'hiEther'}},
    onEnter:'ev_arch_enter' },

  /* 세 겹 복도: 가운데 복도는 가시투성이. 장치는 첫 복도 동쪽 끝과 셋째 복도 서쪽 끝 */
  archivevault:{ name:'봉인 기록실', theme:'temple', tiles:'archive', bgm:'dungeon', hud:'3부 18장', pal:PAL.book,
    src:[ "111111111111111111","100000022000000081","101111111111111111","100707070002200001",
          "111111111111111101","180000005000220001","111111111911111111","111100000000000111",
          "111100000600005111","111111111111111111","111111111111111111" ],
    enc:{ pool:['oathGuard','dustGolem','inkWraith'], rate:0.22, pow:1.0, hpw:1.0 }, respawn:{x:2,y:1},
    npcs:[], warps:[ {x:1,y:1,to:'archivehall',tx:17,ty:4,label:'서고'} ],
    loot:{'8,5':{item:'guardSeed'},'14,8':{gold:2500,item:'powerSeed'}},
    eventTile:'ev_oath', eventDone:'ch18done', onEnter:'ev_vault_enter' },

  /* ---- 제19장 ---- */
  kingsroad:{ name:'왕의 길', theme:'ash', tiles:'road', bgm:'rift', hud:'3부 19장', pal:PAL.road,
    src:[ "1111111111111111111111","1000220000000011000051","1000220011000011002201","1011000011000000002201",
          "1011000000002200000001","1000000000002200110001","1000110000000000110001","1050110022000110000001",
          "1000000022000110022001","1000007000000000022001","1111111111111111111111" ],
    enc:{ pool:['roadKnight','crownHound','oathWisp'], rate:0.2, pow:1.0, hpw:1.1 }, respawn:{x:2,y:5},
    npcs:[], warps:[ {x:1,y:5,to:'lampcity',tx:15,ty:5,label:'도시'}, {x:20,y:5,to:'oathcourt',tx:2,ty:5,label:'뜰'} ],
    loot:{'20,1':{item:'lifeSeed'},'2,7':{gold:2500,item:'hiEther'}}, onEnter:'ev_road19' },

  oathcourt:{ name:'약속의 뜰', theme:'town', tiles:'town', bgm:'town', hud:'3부 19장', pal:PAL.court,
    src:[ "1111111111111111","1000000000000001","1000000000000001","1001000000001001",
          "1000000300000001","1000000000000001","1001000000001001","1000000000000001",
          "1000000000000001","1111111111111111","1111111111111111" ],
    enc:null, respawn:{x:3,y:5},
    npcs:[
      {x:11,y:2,color:GARN,name:'가른',look:'garn',lines:()=> storyFlags.ch19done ? [
          say('가른','코르에게 준 건 내 활의 전부다. 이제 저 녀석이 나보다 멀리 본다.',GARN) ] : [
          say('가른','팔은 돌아왔다. 그러니 봐주지 않는다. 채비가 끝나면 성문으로 와라.',GARN) ]},
      {x:12,y:4,color:ROWAN,name:'로완',look:'rowan',lines:()=> storyFlags.ch19done ? [
          say('로완','군주께서도 덮고 계신 것이 하나 있다. 근원에 가면 알게 될 것이다.',ROWAN) ] : [
          say('로완','시험은 넷이 한꺼번에 한다. 사정은 봐주지 않는다.',ROWAN) ]},
      {x:12,y:7,color:'#6aa0d8',name:'조수의 사도',look:'tideApostle',lines:()=> storyFlags.ch19done ? [
          say('조수의 사도','밀물이 있으면 썰물이 있어. 빛도 그래야 했던 거야. 한쪽에 고이면 썩어.',LORD) ] : [
          say('조수의 사도','죽이려는 건 아니야. 군주 앞에 설 만한지 보려는 거지.',LORD) ]},
      {x:11,y:8,color:'#d8b860',name:'왕관의 사도',look:'crownApostle',lines:()=> storyFlags.ch19done ? [
          say('왕관의 사도','모두를 구하겠다는 왕은 어리석다고 배웠다. 어리석은 쪽이 옳았으면, 하고 지금은 바란다.',LORD) ] : [
          say('왕관의 사도','왕은 모두를 구할 수 없다. 너희는 다르다는 것을, 힘으로 보여 다오.',LORD) ]},
      {x:3,y:7,color:'#f0c27a',shade:true,name:'뜰의 상인',glyph:'◇',shop:['hiPotion','hiEther','revive','mornSword','mornStaff','mornBow','mornPlate','mornRobe','mornHelm','powerSeed','wisdomSeed','guardSeed','lifeSeed']} ],
    warps:[ {x:1,y:5,to:'kingsroad',tx:19,ty:5,label:'길'},
            {x:14,y:5,to:'lordkeep',tx:2,ty:1,label:'성문',event:'ev_trial',eventFlag:'ch19done'},
            {x:7,y:1,to:'sourcepath',tx:2,ty:9,label:'근원',need:'ch20done',block:'성 뒤로 난 길은 군주만이 열 수 있다. 먼저 옥좌의 방으로 가자.'} ],
    onEnter:'ev_court_enter' },

  /* ---- 제20장 ---- 세 겹 고리: 바깥 복도 → 가운데 복도 → 옥좌의 방. 장치는 바깥에 둘, 가운데에 하나 */
  lordkeep:{ name:'군주의 성', theme:'temple', tiles:'keep', bgm:'dungeon', hud:'3부 20장', pal:PAL.keep,
    src:[ "11111111111111111111","10000220000000700081","10111111111111111101","10100000220000000101",
          "10101111111111110101","10001500000600090101","10101111111111110101","10100000002200008101",
          "10111111111111111101","18000002200007000001","11111111111111111111" ],
    enc:{ pool:['keepKnight','keepMage','throneGolem','keepShade'], rate:0.22, pow:1.0, hpw:1.1 }, respawn:{x:2,y:1},
    npcs:[], warps:[ {x:1,y:1,to:'oathcourt',tx:13,ty:5,label:'뜰'} ],
    loot:{'5,5':{item:'powerSeed'}},
    eventTile:'ev_lord2', eventDone:'ch20done', onEnter:'ev_keep_enter' },

  /* ---- 제21장 ---- */
  sourcepath:{ name:'처음 빛의 길', theme:'ash', tiles:'source', bgm:'rift', hud:'3부 21장', pal:PAL.dusk,
    src:[ "1111111111111111111111","1500000220000000000001","1011100220001110022001","1000000000001110022001",
          "1002200011000000000101","1002200011000000000101","1000000000002200110001","1011000000002200110001",
          "1011000700000000000051","1000000000030000000001","1111111111111111111111" ],
    enc:{ pool:['paleHound','emberWisp','lightEater'], rate:0.2, pow:1.2, hpw:1.25 }, respawn:{x:2,y:9},
    npcs:[], warps:[ {x:1,y:9,to:'oathcourt',tx:7,ty:2,label:'뜰'}, {x:20,y:5,to:'sourcecore',tx:2,ty:1,label:'근원'} ],
    loot:{'1,1':{item:'wisdomSeed'},'20,8':{gold:3000,item:'hiEther'}}, onEnter:'ev_source_path' },

  /* 세 겹: 바깥 복도 → 안쪽 복도 → 근원. 장치는 바깥 둘, 안쪽 하나 */
  sourcecore:{ name:'빛의 근원', theme:'temple', tiles:'source', bgm:'dungeon', hud:'3부 21장', pal:PAL.core,
    src:[ "111111111111111111","100002200000000081","101111111111111101","101000008000000101",
          "101011111111110101","100015000600090001","101011111111110101","101000022000000101",
          "101111111111111101","180000002200070001","111111111111111111" ],
    enc:{ pool:['lightEater','fadedGuard','emberWisp'], rate:0.22, pow:1.22, hpw:1.3 }, respawn:{x:2,y:1},
    npcs:[ {x:5,y:3,color:LORD,name:'그림자 군주',look:'lordNpc',when:'ch22done',lines:()=> storyFlags.p3Keeper==='turns' ? [
          say('그림자 군주','올해는 내 차례다. 내년 이맘때, 문 앞에서 기다리마. 늦지 마라.',LORD) ] : [
          say('그림자 군주','빛은 잘 흐르고 있다. 삼백 해 만에, 지킬 것이 있는 자리에 앉았구나.',LORD) ]} ],
    warps:[ {x:1,y:1,to:'sourcepath',tx:19,ty:5,label:'길'},
            {x:7,y:5,to:'dawnstair',tx:3,ty:1,label:'계단',when:'ch21done'} ],
    loot:{'5,5':{item:'lifeSeed'}},
    eventTile:'ev_gnaw', eventDone:'ch21done', onEnter:'ev_core_enter' },

  /* ---- 제22장 ---- 장치 없이 내려가기만 하는 마지막 길. 들머리에 제단 */
  dawnstair:{ name:'여명의 계단', theme:'temple', tiles:'stair', bgm:'dungeon', hud:'3부 22장', pal:PAL.stair,
    src:[ "111111111111111111","103000220000070001","111111111111111101","150002200000220001",
          "101111111111111111","100022000700000051","111111111111111101","100000002200000001",
          "101111111111111111","100000060000000001","111111111111111111" ],
    enc:{ pool:['famineBit','famineMaw','famineShade','famineEye'], rate:0.22, pow:1.25, hpw:1.3 }, respawn:{x:3,y:1},
    npcs:[], warps:[ {x:1,y:1,to:'sourcecore',tx:8,ty:5,label:'근원'} ],
    loot:{'1,3':{item:'powerSeed'},'16,5':{gold:3000,item:'guardSeed'}},
    eventTile:'ev_famine', eventDone:'ch22done', onEnter:'ev_stair_enter' },
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

  /* ================= 제19장 「돌아온 네 사도」 ================= */
  ev_road19:()=>{ if(storyFlags.road19) return; storyFlags.road19=true;
    showMsg([
      "— 제19장 「돌아온 네 사도」 —",
      "검은 성으로 이어진 돌길. 길가의 기둥마다 꺼진 등이 걸려 있다.",
      say('테리','저 성 앞에 넷이 서 있었지. 사도들이야.',T),
      say('코르','형도 있겠네. 팔은 나았으려나.',C) ], ()=>{ saveGame(); }); },

  ev_court_enter:()=>{ if(storyFlags.courtEntered) return; storyFlags.courtEntered=true;
    showMsg([
      "약속의 뜰 — 삼백 해 전, 왕과 현자가 약속을 맺은 자리. 돌바닥에 세 개의 그릇 문양이 새겨져 있다.",
      "성문 앞에 네 사람이 서 있다. 조수의 사도, 왕관의 사도, 로완, 그리고 가른.",
      say('가른','왔구나, 코르. 팔은 돌아왔다. 덕분에.',GARN),
      say('왕관의 사도','군주께서는 안에 계신다. 허나 그냥은 못 지나간다. 내가 묻겠다 — 너희는 모두를 구하겠다는 것이냐.',LORD),
      say('테리','그럴 생각이야.',T),
      say('왕관의 사도','나는 못 했다. 그러니 보여 다오. 말이 아니라 힘으로.',LORD),
      say('조수의 사도','죽이려는 건 아니야. 군주 앞에 설 만한지 보는 거지. 채비가 되면 동쪽 성문으로 와.',LORD),
      "제단 ✦ 과 상인 ◇ 에서 채비를 하자." ], ()=>{ saveGame(); }); },

  /* 시험 → (이김) → 네 사람이 차례로 2차 전직. 도중에 꺼져도 아직 전직하지 않은 사람부터 이어진다 */
  ev_trial:()=>{ if(storyFlags.ch19done) return; if(storyFlags.trialDown){ runEvent('ev_trial_after'); return; }
    showMsg([
      "네 사도가 성문 앞에 늘어선다.",
      say('로완','넷이 한꺼번에 간다. 사정은 봐주지 않는다.',ROWAN),
      say('가른','코르. 5년 치 얘기는 화살로 듣겠다.',GARN) ],
      ()=>{ startBattle(['tidecaller','garn','frostApostle','crownApostle'],true,{scale:{pow:0.9,hpw:0.9},onWin:'ev_trial_after'}); }); },

  ev_trial_after:()=>{ const first=!storyFlags.trialDown; storyFlags.trialDown=true; saveGame();
    const give=[
      ['테리',()=>say('왕관의 사도','검 든 아이야. 모두를 지려는 자의 무게를, 지는 법을 가르치마.',LORD)],
      ['카엘',()=>say('조수의 사도','봉인 집안의 아이. 빛은 밀물과 썰물처럼 오가야 해. 그걸 다루는 법을 줄게.',LORD)],
      ['미아',()=>storyFlags.p3Truth==='tell' ? say('로완','덮지 않은 사제여. 네 빛은 이제 나보다 멀리 간다. 내 몫을 보탠다.',ROWAN)
                                            : say('로완','무게를 대신 든 사제여. 네가 얼지 않도록, 내 몫의 빛을 보탠다.',ROWAN)],
      ['코르',()=>say('가른','빌린 활값이다. 이자까지 쳐서 갚는다.',GARN)] ];
    const next=i=>{ if(i>=give.length){ showMsg([
          say('왕관의 사도','가라. 군주께서는 옥좌의 방에 계신다. 우리가 드리지 못한 답을, 너희가 드려라.',LORD),
          "— 제19장 「돌아온 네 사도」 완료 —",
          "성문이 열렸다. 궁극기는 전투 중 ★ 게이지가 가득 차면 스킬에서 쓸 수 있다." ], ()=>{ storyFlags.ch19done=true; saveGame(); }); return; }
      const [name,line]=give[i], q=party.find(x=>x.name===name);
      if(!q||q.job2||!job2For(q)){ next(i+1); return; }
      showMsg([ line() ], ()=>{ openJob2Pick(name,(id,got)=>{ saveGame();
        showMsg([ id ? name+(name==='카엘'?'은':'는')+' 「'+jobName(q)+'」(으)로 나아갔다!  '+(got||[]).join(' · ') : '…' ], ()=>next(i+1)); }); }); };
    if(first) showMsg([
      "네 사도가 무기를 내린다.",
      say('왕관의 사도','…졌다. 깨끗이. 왕이 못 한 것을, 너희는 하려 하는구나.',LORD),
      say('조수의 사도','하지만 군주는 우리 넷보다 훨씬 강해. 지금 그대로는 안 돼. 그러니까 — 줄게. 우리가 군주께 받은 것.',LORD),
      "네 사도가 저마다 한 사람 앞에 선다." ], ()=>next(0));
    else next(0); },

  /* ================= 제20장 「그림자 군주」 ================= */
  ev_keep_enter:()=>{ if(storyFlags.keepEntered) return; storyFlags.keepEntered=true;
    showMsg([
      "— 제20장 「그림자 군주」 —",
      "군주의 성 — 복도가 세 겹으로 옥좌를 둘러싸고 있다. 벽에는 등이 하나도 없다.",
      say('미아','성 안이 마을보다 어두워요. …자기 몫의 빛도 쓰지 않는 거예요, 이 사람.',M),
      say('카엘','장치(○)가 셋. 바깥 복도에 둘, 가운데 복도에 하나. 다 눌러야 옥좌의 방(▦)이 열려.',K) ], ()=>{ saveGame(); }); },

  ev_lord2:()=>{ if(storyFlags.ch20done) return; if(storyFlags.lordDown){ runEvent('ev_lord2_after'); return; }
    showMsg([
      "옥좌의 방. 군주는 옥좌에 앉아 있지 않다. 그 옆 바닥에 지도처럼 늘어놓은, 꺼진 등불 수백 개를 내려다보고 있다.",
      say('그림자 군주','왔구나. 보았느냐. 너희가 무엇을 가두었는지.',LORD),
      say('테리','봤어. 마을도, 골짜기도, 도시도. 그리고 서고도.',T),
      say('카엘','약속을 깬 건 내 집안이야. 그러니 내가 열게. 세 그릇을.',K),
      say('그림자 군주','삼백 해 늦었다, 현자의 아이야. 이제는 나눠 쓸 만큼 남지 않았다. 나는 남은 빛을 전부 이쪽으로 돌린다.',LORD),
      say('미아','그러면 저희 쪽이—',M),
      say('그림자 군주','어두워지겠지. 너희 선조가 우리에게 한 그대로. 막고 싶다면, 이번에는 막아 보아라.',LORD) ],
      ()=>{ startBattle(['lord2'],true,{onWin:'ev_lord2_after'}); }); },

  ev_lord2_after:()=>{ storyFlags.lordDown=true; saveGame();
    showMsg([
      "군주가 한쪽 무릎을 꿇는다. 그 몸에서 빛이 새어 나온다 — 사도들에게 나눠 주고 남은, 얼마 안 되는 빛이.",
      say('그림자 군주','…강해졌구나. 석 달 전에는 내 그림자조차 버거워하더니.',LORD),
      say('테리','당신을 베러 온 게 아니야. 같이 가자고 온 거야. 근원으로.',T),
      say('그림자 군주','근원을 보면 그 말이 나오지 않을 것이다. 나는 보았다. 그릇을 열든 닫든 — 근원 자체가 꺼져 가고 있다.',LORD),
      say('그림자 군주','그래서 셈을 했다. 둘 다 살리지 못한다면 내 백성을. …너희 선조와 똑같은 셈이지. 삼백 해를 원망하고서, 내가 한 것이 그것이었다.',LORD),
      say('카엘','그 셈이 맞는지 틀렸는지는, 가서 보고 정하자. 우리 선조는 보지도 않고 닫았어.',K),
      say('그림자 군주','…좋다. 길을 열어 주마. 근원은 성 뒤, 빛이 처음 솟은 자리에 있다.',LORD),
      "그림자 군주가 길동무가 되었다. (전투에는 나서지 않는다)",
      "— 제20장 「그림자 군주」 완료 —",
      "약속의 뜰 북쪽으로, 근원에 이르는 길이 열린다." ],
      ()=>{ storyFlags.ch20done=true; saveGame(); }); },

  /* ================= 제21장 「빛의 근원」 ================= */
  ev_source_path:()=>{ if(storyFlags.sourcePath) return; storyFlags.sourcePath=true;
    showMsg([
      "— 제21장 「빛의 근원」 —",
      "성 뒤로 난 길. 걸을수록 발밑의 재가 옅어지고, 흙빛이 돌아온다.",
      say('그림자 군주','삼백 해 전에는, 이 길 끝이 눈을 뜨지 못할 만큼 밝았다.',LORD),
      say('코르','지금은 저녁 무렵 같은데.',C),
      say('그림자 군주','그래서 서두른 것이다.',LORD) ], ()=>{ saveGame(); }); },

  ev_core_enter:()=>{ if(storyFlags.coreEntered) return; storyFlags.coreEntered=true;
    showMsg([
      "빛의 근원 — 땅이 그릇처럼 패인 자리. 한가운데에서 빛이 솟는다. 모닥불만 한 크기로.",
      say('미아','이게… 두 세상을 밝히던 빛이에요?',M),
      say('카엘','둘레에 뭔가 붙어 있어. 빛을 갉아 먹고 있어. 장치(○) 셋을 눌러야 한가운데(▦)로 갈 수 있어.',K) ]); },

  /* 보스 → (이김) → 세 번째 선택. 선택 전에 꺼져도 선택부터 이어진다 */
  ev_gnaw:()=>{ if(storyFlags.ch21done) return; if(storyFlags.gnawDown){ runEvent('ev_gnaw_after'); return; }
    showMsg([
      "근원의 가장자리. 뿌리 같은 것이 빛에 이빨을 박고 있다. 갉을 때마다 근원이 움츠러든다.",
      say('그림자 군주','저것이다. 내가 처음 보았을 때는 손가락만 했다.',LORD),
      say('테리','크기는 상관없어. 떼어 낸다!',T) ],
      ()=>{ startBattle(['gnawer','lightEater','lightEater'],true,{onWin:'ev_gnaw_after'}); }); },

  ev_gnaw_after:()=>{ storyFlags.gnawDown=true; saveGame();
    const done=()=>{ showMsg([
        "그때 — 땅이 운다. 근원 너머, 빛이 닿은 적 없는 틈에서 무언가가 올라온다.",
        say('그림자 군주','굶주림이다. 삼백 해 동안 고인 빛의 냄새를 맡고 모여든 것. 그릇이 열리려는 것을 아는 게다.',LORD),
        say('카엘','저게 근원을 덮으면 열쇠를 돌릴 수 없어. 먼저 막아야 해!',K),
        "— 제21장 「빛의 근원」 완료 —",
        "근원 안쪽에, 아래로 내려가는 계단이 드러났다." ], ()=>{ storyFlags.ch21done=true; saveGame(); }); };
    const lord=()=>{ storyFlags.p3Keeper='lord'; saveGame(); showMsg([
        say('테리','당신이 맡아 줘. 삼백 해를 기다린 사람이니까. 이번엔 우리가 약속을 지킬 차례고.',T),
        say('그림자 군주','…현자의 집은 약속을 깼고, 그 집의 아이와 벗들은 나에게 근원을 맡긴다. 묘한 일이다. 받겠다.',LORD) ], done); };
    const turns=()=>{ storyFlags.p3Keeper='turns'; saveGame(); showMsg([
        say('테리','혼자 지키게 두면 또 삼백 해 전처럼 돼. 해마다 번갈아 지키자. 올해는 당신, 내년엔 우리.',T),
        say('그림자 군주','…서른 해마다 열겠다던 문은 한 번도 열리지 않았다. 해마다 오겠다는 말을, 믿어 보마. 올해는 내가 지킨다.',LORD) ], done); };
    if(storyFlags.p3Keeper){ done(); return; }
    askMsg([
      "좀먹던 것이 떨어져 나간다. 그런데도 근원은 커지지 않는다.",
      say('미아','…왜죠? 갉아 먹던 게 없어졌는데.',M),
      say('카엘','(근원에 손을 댄다) …알겠어. 빛은 고여 있으면 줄어. 흘러야 다시 솟아. 샘처럼.',K),
      say('카엘','삼백 해 동안 세 그릇에 가둬만 뒀으니 근원이 마른 거야. 저쪽으로 보내지도, 이쪽으로 돌려보내지도 않았으니까.',K),
      say('그림자 군주','…그렇다면 내 셈도 틀렸구나. 전부 이쪽으로 돌려도, 고이면 똑같이 마른다.',LORD),
      say('코르','그럼 답은 하나잖아. 양쪽으로 다 열어. 계속 오가게.',C),
      say('카엘','그릇을 등대로 바꾸는 거야. 열쇠는 내가 돌릴 수 있어. 다만 흐름이 한쪽으로 쏠리지 않게, 근원 곁에서 누군가 지켜봐야 해. 계속.',K),
      say('그림자 군주','…누가 남을 것이냐.',LORD) ],'군주에게 맡긴다','번갈아 지키자고 한다',lord,turns); },

  /* ================= 제22장 「새벽을 나누다」 ================= */
  ev_stair_enter:()=>{ if(storyFlags.stairEntered) return; storyFlags.stairEntered=true;
    showMsg([
      "— 제22장 「새벽을 나누다」 —",
      "여명의 계단 — 근원 아래로 꺾여 내려가는 길. 들머리에 제단 ✦ 이 하나, 마지막으로 놓여 있다.",
      say('테리','끝이야. 여기만 넘으면, 양쪽에 다 아침이 와.',T),
      say('미아','다들… 여기까지 같이 와 줘서 고마워요.',M),
      say('코르','그런 말은 이기고 나서 해.',C),
      say('카엘','이기고 나서 하자. 꼭.',K) ], ()=>{ saveGame(); }); },

  /* 두 번 이어 싸운다. 첫 싸움을 이긴 뒤 지거나 꺼지면 둘째 싸움부터 다시 */
  ev_famine:()=>{ if(storyFlags.ch22done) return; if(storyFlags.famine2Down){ runEvent('ev_ending'); return; } if(storyFlags.famine1Down){ runEvent('ev_famine2'); return; }
    showMsg([
      "계단 끝. 어둠이 숨을 쉰다. 눈도 입도 없이, 다만 빛 쪽으로 기울어 있다.",
      say('그림자 군주','(위에서 목소리가 내려온다) 저것은 미움이 아니다. 삼백 해 치의 배고픔이다. 이쪽도 저쪽도 아닌 곳에 고인.',LORD),
      say('테리','그럼 베는 게 아니라 — 밀어내는 거야. 빛이 흐를 자리에서!',T) ],
      ()=>{ startBattle(['famine','famineShade','famineShade'],true,{onWin:'ev_famine2'}); }); },

  ev_famine2:()=>{ const first=!storyFlags.famine1Down; storyFlags.famine1Down=true; saveGame(); party.forEach(q=>{ if(q.alive){ q.hp=Math.min(q.maxhp,q.hp+Math.round(q.maxhp*0.5)); q.mp=Math.min(q.maxmp,q.mp+Math.round(q.maxmp*0.5)); } });
    showMsg([
      first ? "어둠이 갈라진다. 그 속에서 — 더 짙은 것이 눈을 뜬다." : "갈라진 어둠 속에서, 짙은 것이 아직 눈을 뜨고 있다.",
      say('카엘','저게 알맹이야! 저걸 흩어야 그릇을 열 수 있어!',K),
      "위에서 근원의 빛이 한 줄기 내려와 일행을 감싼다. (HP·MP 절반 회복)" ],
      ()=>{ startBattle(['famineCore'],true,{onWin:'ev_ending'}); }); },

  ev_ending:()=>{ storyFlags.famine2Down=true; saveGame(); playBGM('field');
    const F=storyFlags;
    showMsg([
      "알맹이가 흩어진다. 어둠은 사라지지 않는다 — 다만, 더는 굶주리지 않는다. 빛이 흐를 자리를 비켜 줄 뿐이다.",
      "근원으로 돌아온 카엘이 빛 위에 손바닥을 얹는다.",
      say('카엘','삼백 해 늦었지만 — 엽니다. 양쪽으로.',K),
      "멀리 저편에서, 세 개의 봉인이 처음으로 양쪽을 향해 열린다. 봉인은 더 이상 그릇이 아니다. 등대다.",
      "빛이 이쪽에서 저쪽으로, 저쪽에서 이쪽으로 흐른다. 흐르기 시작하자 — 근원이 숨을 쉰다. 모닥불이 화톳불로, 화톳불이 새벽으로.",
      F.p3Keeper==='turns' ? say('그림자 군주','가거라. 올해는 내가 지킨다. 내년 이맘때, 이 자리에서 보자.',LORD)
                           : say('그림자 군주','가거라. 여기는 내가 지킨다. 삼백 해 만에, 지킬 것이 생겼으니.',LORD),
      "— 돌아가는 길 —",
      F.p3Child==='share' ? "잿등 마을. 린이 등대 꼭대기에서 손을 흔든다. 할렌의 얼굴에도, 마을 사람들의 얼굴에도 윤곽이 돌아와 있다."
                          : "잿등 마을. 테리는 린 앞에 한쪽 무릎을 꿇고, 검을 바닥에 내려놓는다. 린은 한참 보다가 — 그 손에 재꽃 열매를 쥐여 준다.",
      "이름 없는 쉼터. 가른의 등불 둘레에, 자기 이름을 되찾은 사람들이 서로를 부르고 있다.",
      say('가른','코르. 다 끝났으니 5년 치 얘기를 해 주마. …길다. 앉아라.',GARN),
      F.p3Truth==='tell' ? "등불 도시. 거울은 치워졌다. 대등은 이제 거울 없이도, 도시 끝까지 닿는다."
                         : "등불 도시. 미아는 광장에서, 그동안 덮어 둔 것을 제 입으로 말한다. 대등이 커진 뒤라서, 사람들은 끝까지 들어 준다.",
      say('로완','신전으로 돌아가거든 원장에게 전해라. 이제는 덮을 것이 없다고.',ROWAN),
      "— 그리고, 균열 이편 —",
      "아르그 마을. 해는 전보다 조금 옅다. 그 대신 밤이 되면, 저편 하늘에 등대 세 개가 별처럼 보인다.",
      say('코르','좀 어두워졌네. 뭐, 눈은 금방 익어.',C),
      say('미아','저쪽에서도 지금, 우리 쪽 불빛을 보고 있겠죠.',M),
      say('카엘','서고에 한 줄 적어 두고 왔어. 「문은 열려 있다. 닫지 말 것.」',K),
      say('테리','가자. 내일은 저쪽 아침을 보러.',T),
      "— 모두의 픽셀모험 · 제3부 「균열 너머」 끝 —",
      "세 봉인의 이야기는 여기까지입니다. 끝까지 함께해 주셔서 고맙습니다.",
      "이어하기를 누르면 근원에서 계속됩니다 — 숨은 강적과 전리품, 도감이 남아 있습니다." ],
      ()=>{ F.ch22done=true; F.part3Clear=true; loadArea('sourcecore',8,5); saveGame(); stopBGM(); bgm.started=false; state='title'; titleSel=1; }); },
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

/* ================= 2차 전직 =================
   from = 이어지는 1차 직업. 1차 직업마다 하나씩이라 고를 것은 「가지 않은 길의 기술 하나」뿐이다.
   learn[id] 의 첫 기술은 궁극기(ult): MP 대신 게이지로 쓴다 */
jobs2:{
  paladin:    {from:'guardian',   name:'성기사',       col:'#fff3b8', role:'쓰러지지 않는 벽 — 모두를 지고 선다',   bonus:{hp:60,def:10,atk:6},  grow:{hp:12,mp:2,atk:2,def:3,mag:1,spd:1}},
  swordsaint: {from:'blademaster',name:'검성',         col:'#ffb08a', role:'한 호흡에 다섯 번 벤다',               bonus:{atk:18,spd:6},        grow:{hp:8,mp:3,atk:4,def:1,mag:1,spd:2}},
  archmage:   {from:'archsage',   name:'대마도사',     col:'#bfe0ff', role:'세 원소를 한꺼번에 부린다',             bonus:{mag:16,mp:30},        grow:{hp:6,mp:6,atk:1,def:1,mag:4,spd:1}},
  nightsage:  {from:'shadowmage', name:'밤의 현자',    col:'#d0b0ff', role:'어둠을 알고, 어둠으로 살린다',           bonus:{mag:14,hp:40},        grow:{hp:9,mp:4,atk:1,def:2,mag:4,spd:1}},
  saint:      {from:'highpriest', name:'성자',         col:'#c8ffe4', role:'쓰러진 모두를 다시 일으킨다',           bonus:{mp:35,mag:8,def:5},   grow:{hp:8,mp:6,atk:1,def:2,mag:3,spd:1}},
  arbiter:    {from:'judge',      name:'빛의 집행자',  col:'#ffffff', role:'심판의 빛으로 전장을 덮는다',           bonus:{mag:16,spd:4},        grow:{hp:6,mp:5,atk:1,def:1,mag:4,spd:2}},
  deadshot:   {from:'sniper',     name:'마탄의 사수',  col:'#ffd890', role:'빗나가지 않는 한 발',                   bonus:{atk:20},              grow:{hp:6,mp:3,atk:4,def:1,mag:1,spd:2}},
  stormarcher:{from:'ranger',     name:'폭풍 사수',    col:'#b0f090', role:'화살로 폭풍을 부른다',                 bonus:{spd:10,atk:12},       grow:{hp:7,mp:3,atk:3,def:1,mag:1,spd:4}},
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
  /* ---- 2차 전직: 궁극기(ult — 게이지로 쓴다) 와 Lv32 기술 ---- */
  ultBulwark: {name:'불굴의 성벽',   fx:'veil',ult:1,mp:0,kind:'healAll',pct:0.6,veil:4,target:'allAllies',msg:'의 불굴의 성벽!',desc:'전원 HP 60% 회복 +장막'},
  judgeBlade: {name:'단죄의 검',     fx:'crush',el:'holy',mp:16,kind:'phys',power:4.4,stun:0.5,target:'enemy',msg:'의 단죄의 검!',desc:'단일 빛 ×4.4 +기절 50%'},
  ultThousand:{name:'천 갈래 베기',  fx:'double',ult:1,mp:0,kind:'phys',power:1.9,hits:5,sure:1,target:'enemy',msg:'의 천 갈래 베기!',desc:'단일 ×1.9 5회 확정 치명'},
  voidCut:    {name:'허공참',        fx:'wide',mp:18,kind:'phys',power:2.9,pen:0.5,target:'allEnemies',msg:'의 허공참!',desc:'전체 ×2.9 방어 절반 무시'},
  ultNova:    {name:'삼원소 대폭발', fx:'firestorm',el:'tri',ult:1,mp:0,kind:'magic',power:6.0,target:'allEnemies',msg:'의 삼원소 대폭발!',desc:'전체 ×6 약점 자동'},
  starfall:   {name:'별 내림',       fx:'judgment',el:'tri',mp:22,kind:'magic',power:6.4,target:'enemy',msg:'의 별 내림!',desc:'단일 ×6.4 약점 자동'},
  ultEclipse: {name:'일식',          fx:'ice',el:'dark',ult:1,mp:0,kind:'magic',power:4.6,leech:0.4,weaken:3,target:'allEnemies',msg:'의 일식!',desc:'전체 어둠 ×4.6 +흡수·약화'},
  soulRend:   {name:'혼 가르기',     fx:'staff',el:'dark',mp:20,kind:'magic',power:6.2,leech:0.3,target:'enemy',msg:'의 혼 가르기!',desc:'단일 어둠 ×6.2 +HP 흡수'},
  ultMiracle: {name:'기적',          fx:'revive',ult:1,mp:0,kind:'healAll',pct:1.0,raise:1,cleanse:1,target:'allAllies',msg:'의 기적!',desc:'쓰러진 동료까지 전원 완전 회복'},
  lightLance: {name:'빛의 창',       fx:'judgment',el:'holy',mp:10,kind:'magic',power:3.8,target:'enemy',msg:'의 빛의 창!',desc:'단일 빛 ×3.8'},
  ultJudgment:{name:'최후의 심판',   fx:'bolt',el:'holy',ult:1,mp:0,kind:'magic',power:5.0,stun:0.5,mark:4,target:'allEnemies',msg:'의 최후의 심판!',desc:'전체 빛 ×5 +기절·표식'},
  condemn:    {name:'단죄의 빛기둥', fx:'judgment',el:'holy',mp:16,kind:'magic',power:5.4,target:'enemy',msg:'의 빛기둥!',desc:'단일 빛 ×5.4'},
  ultOneShot: {name:'필중의 일격',   fx:'pierce',el:'arrow',ult:1,mp:0,kind:'phys',power:7.5,pen:1.0,sure:1,target:'enemy',msg:'의 필중의 일격!',desc:'단일 ×7.5 방어 무시·확정 치명'},
  pierceLine: {name:'일렬 관통',     fx:'pierce',el:'arrow',mp:16,kind:'phys',power:2.8,pen:0.5,target:'allEnemies',msg:'의 일렬 관통!',desc:'전체 ×2.8 방어 절반 무시'},
  ultStorm:   {name:'화살 폭풍',     fx:'rain',el:'arrow',ult:1,mp:0,kind:'phys',power:1.7,hits:3,poison:3,target:'allEnemies',msg:'의 화살 폭풍!',desc:'전체 ×1.7 3회 +독'},
  galeShot:   {name:'질풍 연사',     fx:'rain',el:'arrow',mp:14,kind:'phys',power:1.6,hits:5,target:'enemy',msg:'의 질풍 연사!',desc:'단일 ×1.6 5회'},
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
  paladin:    [{lv:0,id:'ultBulwark'}, {lv:31,id:'judgeBlade'}],
  swordsaint: [{lv:0,id:'ultThousand'},{lv:31,id:'voidCut'}],
  archmage:   [{lv:0,id:'ultNova'},    {lv:31,id:'starfall'}],
  nightsage:  [{lv:0,id:'ultEclipse'}, {lv:31,id:'soulRend'}],
  saint:      [{lv:0,id:'ultMiracle'}, {lv:31,id:'lightLance'}],
  arbiter:    [{lv:0,id:'ultJudgment'},{lv:31,id:'condemn'}],
  deadshot:   [{lv:0,id:'ultOneShot'}, {lv:31,id:'pierceLine'}],
  stormarcher:[{lv:0,id:'ultStorm'},   {lv:31,id:'galeShot'}],
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
