# 모두의 픽셀모험 (Pixel Adventure)

오리지널 턴제 픽셀 RPG — 대륙 아르겐의 세 봉인을 되살려 여명을 되찾는 모험.
HTML5 Canvas 단일 파일, 외부 의존성·네트워크·광고 없음. 전부 오리지널 창작물입니다.

## 플레이
- 웹: `docs/index.html` 을 브라우저로 열거나, GitHub Pages로 배포 시
  **https://seungiljang.github.io/share-pixel-adventure/**
- 조작: 화면 터치/드래그(이동), 버튼 탭(전투·메뉴). 세이브는 기기 내 저장(localStorage).

## 특징
- 6개 지역(마을·숲·동굴·고원/상인마을·신전·균열/제단), 파티 4인 점진 합류(테리·미르·셀루·코르)
- 봉인 보스 3 + 미니보스 3, 던전 퍼즐(함정·스위치·봉인문), 장비 티어
- 전원 픽셀아트 스프라이트(영웅 4 + 적 17종), 합성 BGM/효과음(WebAudio)
- PWA 지원(오프라인 캐시, 설치 가능)

## 폴더 구조
```
.
├─ docs/      게임 본체 (GitHub Pages 소스) — index.html, PWA 파일, 아이콘, privacy-policy.html
├─ app/       Android 패키징(Capacitor) — AAB 빌드는 app/BUILD.md 참고
├─ STORY.md   파트1 스토리·설계 문서
└─ README.md
```

## 웹 배포 (GitHub Pages)
저장소 **Settings → Pages → Branch: `main` / Folder: `/docs`** 선택
→ 위 Pages 주소로 게시됩니다. (개인정보처리방침도 같은 사이트에서 서빙)

## Android 앱(AAB) 빌드
`app/BUILD.md` 참고. 요약:
```bat
cd app
npm install
npx cap add android
npx cap sync android
npx cap open android   # Android Studio에서 서명된 AAB 생성
```
appId: `com.seungiljang.pixeladventure` (변경 가능)

## 라이선스 / 저작권
캐릭터·몬스터·아트·세계관·음악·스토리 모두 **오리지널 창작물**입니다.
개인정보처리방침: `docs/privacy-policy.html` (연락용 이메일을 채워 사용).
