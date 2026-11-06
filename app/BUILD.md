# AAB 빌드 가이드 (Capacitor · 오프라인 번들)

게임(`../docs/`)을 앱에 **내장**해 `.aab` 를 만듭니다. 호스팅 불필요.

## 구조
```
share-pixel-adventure/
├─ docs/      게임 본체 (index.html 등) — Capacitor webDir = "../docs"
└─ app/       이 폴더 (Capacitor 프로젝트)
    ├─ package.json
    ├─ capacitor.config.json   (appId: com.seungiljang.pixeladventure)
    └─ BUILD.md
```

## 사전 준비
- Node.js (LTS), Android Studio + Android SDK + JDK 17(Studio 내장)

## 빌드 절차 (`app/` 폴더에서)
```bat
npm install
npx cap add android
npx cap sync android
npx cap open android
```
Android Studio에서: **Build → Generate Signed Bundle / APK → Android App Bundle**
→ 키스토어 생성(또는 기존 사용) → Release → `.aab` 생성
(결과: `android/app/build/outputs/bundle/release/app-release.aab`)

> `@capacitor/*` 를 `latest` 로 받으므로 현재 Play 요구 target API 를 충족합니다.
> webDir 가 `../docs` (프로젝트 밖)입니다. 만약 CLI가 webDir를 못 찾으면
> `docs/` 내용을 `app/www/` 로 복사하고 `capacitor.config.json` 의 webDir를 `www` 로 바꿔도 됩니다.

## 권장 설정
- 가로 고정: `android/app/src/main/AndroidManifest.xml` 의 MainActivity에 `android:screenOrientation="landscape"`
- 아이콘: Android Studio **Image Asset** 에 `../docs/icon-maskable.svg`(또는 PNG) 사용
- 버전: `android/app/build.gradle` 의 `versionCode` / `versionName`

## 서명 키
⚠️ 키스토어 파일·비밀번호는 **안전하게 백업**(분실 시 업데이트 불가). Play 앱 서명 사용 권장.

## Play Console
- $25 개발자 계정 / AAB 업로드(내부 테스트 → 프로덕션)
- 개인정보처리방침 URL: `https://seungiljang.github.io/share-pixel-adventure/privacy-policy.html`
- 데이터 보안: "수집 없음" / 콘텐츠 등급 설문 / 광고 "아니요"
- 아이콘 512, 피처 그래픽 1024×500, 가로 스크린샷 2장+
