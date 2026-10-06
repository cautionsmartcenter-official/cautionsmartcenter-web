---
version: 1.0
name: Caution-Smart-Center
description: 코션스마트센터(CAUTION SMART CENTER) 웹·홍보물 디자인 시스템. 따뜻한 차콜 블랙 캔버스 위에 흰 타이포와 풀블리드 차량 사진, 그리고 간판과 같은 "코션 레드" 한 가지를 아껴 쓰는 시네마틱 오토모티브 에디토리얼. 모서리는 직각, 그림자·글로우 없음, 입체감은 사진이 담당한다.

colors:
  red: "#d7192a"          # 코션 레드 — 간판·로고와 동일. 주요 CTA, 히어로 강조어, 핵심 수치, 레드 밴드
  red-hi: "#e8323f"       # 다크 배경 위 강조 텍스트(가독성 보정)
  red-press: "#a8121f"    # 버튼 hover/press, 레드 밴드 워터마크
  red-deep: "#8f0f1a"     # 게이지 패턴 등 보조
  canvas: "#0c0c0e"       # 기본 바탕 — 순수 검정(#000) 금지
  canvas-2: "#121215"     # 교차 섹션 바탕
  canvas-3: "#19191d"     # 카드·패널
  ink: "#f2f0ec"          # 제목·본문 강조 (순백 대신 살짝 따뜻한 화이트)
  body: "#a9a6a1"         # 본문
  muted: "#6f6c68"        # 캡션·라벨
  hairline: "rgba(255,255,255,0.09)"
  hairline-strong: "rgba(255,255,255,0.16)"
  kakao: "#fee500"        # 카카오톡 버튼 전용

typography:
  ko: "Pretendard (SIL OFL) — 한글 제목·본문 전부"
  display-en: "Archivo, font-stretch 125% (Expanded) — 영문 차량명·숫자·워드마크"
  mono: "JetBrains Mono — 섹션 라벨, 스펙 수치, 캡션 (대문자 + 자간 0.08~0.16em)"
  hero: "700 / clamp(2.6rem, 6.2vw, 5.9rem) / lh 1.06 / ls -0.05em"
  h2: "700 / clamp(2.1rem, 4.8vw, 4.3rem) / lh 1.12 / ls -0.04em — 둘째 줄 <em>은 300 + body 색"
  body: "400 / 16px / lh 1.65~1.85 / ls -0.01em / word-break: keep-all"
  number: "Archivo Expanded 800 / 단위(µm, 회, 년)는 0.34~0.5em 레드 또는 body 색"
  label: "mono 0.72rem / uppercase / ls 0.14em / muted"
  button: "한글 600 0.95rem + 영문 보조 라벨(.en) Archivo 600 0.68rem uppercase ls 0.16em, 세로 헤어라인으로 구분"

rounded:
  default: 0px            # 버튼, 카드, 패널, 사진, 갤러리 — 전부 직각
  input: 4px              # 입력칸
  swatch: 2px             # 컬러칩(사각)
  pill: 9999px            # 배지(.tag)만
  circle: 50%             # 아이콘 전용 원형 버튼(캐러셀 화살표, SNS, 회전 토글), 페인트 스와치

spacing:
  base: 4px
  gutter: "clamp(16px, 4vw, 56px)"
  section: "clamp(88px, 10vw, 150px)"
  livery-band: "clamp(80px, 9vw, 128px)"
  max-width: 1440px

components:
  button-primary: "레드 배경, 흰 글씨, 52px, 좌우 28px, 직각. hover 시 red-press가 아래에서 차오름. 글로우/그림자 없음"
  button-ghost: "투명 + 1px hairline-strong, 직각"
  button-line: "레드 밴드 위 전용 — 투명 + 1px 흰 테두리, hover 시 흰 배경 + 레드 글씨"
  hero: "풀블리드 차량 사진(자동 전환 + 켄번즈) + 좌하단 헤드라인. 슬라이드 정보는 우하단 반투명 밴드(직각, 상단 헤어라인)"
  livery-band: "화면 폭 전체 레드 밴드 1개. 흰 제목 + 우측 설명/라인 버튼 + 배경에 CARDIP 워터마크(red-press)"
  spec-cell: "큰 Archivo 숫자 + mono 대문자 라벨"
  card: "canvas-3 + 1px hairline, 직각, hover 시 흰색 4.5% 스포트라이트만"
  tag: "필 배지, #26262b 배경, 흰 글씨 — 레드 사용 안 함"
  list-tick: "10px 가로 헤어라인 (다이아몬드·체크 아이콘 대신)"
  form-input: "canvas-2, 1px hairline, 4px 모서리, 라벨은 입력칸 위"
  mobile-bar: "하단 고정 3칸 — 전화 / 카카오톡 / 무료 견적(레드)"
---

## Overview

코션스마트센터의 화면은 **밤의 도장 부스**처럼 읽혀야 한다. 따뜻한 차콜 블랙 위에 차량 사진이 빛을 받고, 흰 한글 타이포가 조용히 설명하며, **코션 레드는 딱 필요한 곳에만** 켜진다. 이 레드는 센터 간판·로고와 같은 색이다.

참고 계보: Ferrari(단일 레드, 직각 CTA, 시네마틱 에디토리얼), BMW M(대문자 라벨 자간, 사진↔스펙 교차 리듬), Bugatti/Lamborghini(그림자 없음, 사진이 곧 깊이). 원칙만 가져오고 각 브랜드의 폰트·로고·레이아웃은 복제하지 않는다.

## Do
- 레드는 주요 CTA, 히어로 강조어("흔적 없는"), 핵심 수치 단위, 레드 밴드, 진행선에만 쓴다.
- 버튼·카드·사진·패널은 모두 직각(0px). 원형은 아이콘 버튼과 페인트 스와치만.
- 사진 밴드 → 텍스트/스펙 → 사진 밴드 순으로 섹션 표면을 번갈아 배치한다. 텍스트만 있는 섹션을 두 번 연속 두지 않는다.
- 섹션 머리는 `(번호) ENGLISH LABEL` mono 라벨 + 두 줄 한글 제목(둘째 줄은 가는 300).
- 수치·스펙은 출처 있는 것만: CARDIP® PPS 250µm+ (실측 최대 428µm), DIN ISO 20567-1, 투명PPS 9회 / 컬러PPS 11회 도포, 24년, 1,000대+.
- 용어는 CARDIP / PPS / 컬러PPS / Peelable Paint. "PPCS", "Paint Protection Color Spray"는 사용 금지.

## Don't
- 버튼에 붉은 글로우·드롭섀도 금지. 입체감은 사진과 밝기 단계로만.
- 레드 외의 채도 높은 색 추가 금지(카카오 옐로는 카카오 버튼에만).
- 순수 검정 #000 바탕 금지 — canvas #0c0c0e.
- 둥근 알약 CTA 금지(배지만 필 형태).
- 확인되지 않은 시공 기간·보증 기간·가격·타사 비교 수치를 쓰지 않는다.
- 제목을 800 이상으로 과하게 굵히지 않는다(히어로 700).

## Responsive
- ≤1024px: 햄버거 메뉴, 모든 2단 그리드 → 1단(`minmax(0,1fr)`), 서비스 우측 이미지 숨김.
- ≤767px: 하단 고정 액션 바, 히어로 사진 우측 크롭, 섹션 여백 88px.
- ≤480px: 버튼의 영문 보조 라벨(.en) 숨김.

## Files
- `assets/css/style.css` 맨 위 `:root` 가 이 문서의 토큰과 1:1 대응한다.
- AI에게 작업을 맡길 때: "이 폴더의 DESIGN.md를 먼저 읽고 그 규칙대로 만들어줘."
