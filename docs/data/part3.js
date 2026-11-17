/* 모두의 픽셀모험 — 제3부 「균열 너머」 데이터 (제작 중)
   지금 들어 있는 것: 1차 전직 직업 8개와 그 기술·특성. 이야기(15~22장)는 아직 없다. */
(function(){
"use strict";
definePart(3,{

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
