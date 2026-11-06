# 앱 아이콘 설정 (AAB 빌드 시)

앱 **런처 아이콘**을 적응형(Adaptive) 아이콘으로 넣어주세요.

## 전경(Foreground)
- `store-assets/icon-maskable-512.png`
  - 레포 경로: `share-pixel-adventure/store-assets/icon-maskable-512.png`
  - 이미 **안전영역(중앙 약 70%)** 에 맞춰 full-bleed로 제작됨 → 원형/둥근네모로 잘려도 로고가 잘리지 않음

## 배경(Background)
- 단색 `#0a0c14`

## Android Studio 방법
1. `res`(app) 우클릭 → **New → Image Asset**
2. Icon Type: **Launcher Icons (Adaptive and Legacy)**
3. **Foreground Layer**: Image = `icon-maskable-512.png` (필요 시 Resize로 안전영역 맞춤)
4. **Background Layer**: Color = `#0a0c14`
5. Next → Finish → `mipmap-*` 적응형 아이콘 생성 → **AAB 재빌드**

## 참고
- Play **스토어 등록정보 → 앱 아이콘**(512×512)에는 `store-assets/icon-512.png` 사용 (런처 아이콘과 별개).
- `appId`(com.moduseries.pixeladventure) · `webDir`(www) · 가로 모드 등 기존 설정은 그대로 유지.
- 기타 스토어 에셋: `store-assets/feature-graphic-1024x500.png`, `store-assets/screenshot-*.png`.
