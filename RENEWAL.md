# 코션스마트센터 별도 리뉴얼

원본: https://github.com/cautionsmartcenter-official/cautionsmartcenter-web
기준 커밋: `8b9ab6efc5d17a65a580afc3fc856f07cb9f51ce`
작업 브랜치: `codex/caution-cinematic-renewal`

```sh
npm ci
npm run dev -- --port 5186
```

미리보기: http://localhost:5186

```sh
node scripts/verify-preservation.mjs
npm run build
```

- 디자인 기준: docs/DESIGN.md
- 자동차 사이트 조사: docs/automotive-research.md
- 연동 기능/배포 환경: docs/INTEGRATIONS.md
- 검증 결과: docs/QA.md

기존 폰트/문구/구성/이미지와 모든 서비스 코드를 유지했다. 원본 폴더와 운영 Vercel은 수정하지 않았다. 디자인은 src/renewal.css 중심으로 분리했다. 런타임 자격 증명과 외부서비스 도메인 허용은 Git 복제와 별개이며 운영 배포 전에 원래 Vercel 설정을 이어서 확인해야 한다.
