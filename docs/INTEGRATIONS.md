# 서비스 보존 및 운영 환경

## 그대로 가져온 연결

| 기능 | 소스 | 별도 리뉴얼 상태 |
|---|---|---|
| 카카오 채널 | FloatingContactBar / Footer / Contact | 기존 `pf.kakao.com/_FxlNhX/chat` URL 유지 |
| 카카오 공유 SDK | index.html / lib/kakao.ts | 기존 SDK·초기화·공유 로직 유지, SDK 도메인 등록은 배포 환경 확인 필요 |
| YouTube | ReaddyYouTubeSection / Footer / FloatingContactBar | 공식 채널 URL, 8개 영상 ID 및 임베드 유지 |
| 네이버/카카오 길찾기, 지도 | ReaddyLocationSection / branchData | 기존 주소·링크·지도 유지 |
| Firebase Auth / Firestore | contexts/AuthContext / lib/firebase / api/_lib/firebase | 원본 그대로. Vercel 서버/빌드 환경변수는 Git 복제로 복사되지 않음 |
| 전자 보증서 | /w/:token, #warranty, api/warranty*.ts | 원본 API와 화면 그대로. 조회/발송의 실제 연동은 배포 환경 필요 |
| 작업사진/작업현황 | #work-status / #workphoto / lib/workPhotoStorage | 기존 저장·조회·공유 구현 유지 |
| SOLAPI 알림톡/이메일 | api/_lib/solapi.ts, email.ts | 원본 서버 코드 유지. 실제 메시지를 전송하는 테스트는 수행하지 않음 |
| PayPal / 토스 | components/payment, lib/paypal, lib/toss | 기존 제공자·설정·모듈 유지. 결제 테스트는 수행하지 않음 |
| Meta Pixel / Readdy AI 상담 | index.html | 원본 태그/식별자/위젯 유지 |
| 문구 편집 / 관리자 | InlineTextEditor / AdminDashboard | 동작 유지. 관리자 화면은 요청 시 로딩 |
| 상담 신청 | ReaddyContactSection / consultationStorage | 원래 localStorage에 저장하는 구조 그대로. 서버 상담 DB를 새로 연결한 것은 아님 |

## 운영 구분

이 결과물은 **새 로컬 복사본**이며 운영 Vercel을 덮어쓰지 않았다. Vercel 함수·서버 설정을 그대로 보존하기 위해 정적 Sites 배포로 옮기지 않았다.

원본 운영 환경의 비밀키는 저장소에 없으므로 이 리뉴얼의 완전한 서버 검증을 위해서는 Vercel Preview 프로젝트에 해당 환경변수를 등록해야 한다. 코드와 연결 유지 검증은 서버의 실제 발송·인증 성공을 의미하지 않는다.

서버 변수 이름: ADMIN_PASSWORD, FIREBASE_SERVICE_ACCOUNT, SOLAPI_API_KEY, SOLAPI_API_SECRET, SOLAPI_PFID, SOLAPI_TEMPLATE_ID, SOLAPI_SENDER_PHONE, SITE_URL, GMAIL_APP_PASSWORD 또는 EMAIL_APP_PASSWORD 등. 값은 문서나 프런트 코드에 적지 않는다.
브라우저 변수 이름: 원본 VITE_FIREBASE_* / VITE_PAYPAL_CLIENT_ID / VITE_TOSS_CLIENT_KEY. 원본 환경 정책을 유지한다.
공유 보증서/작업사진의 공개 링크는 원본 운영 URL을 그대로 사용한다.

## Vercel 확인 — 2026-10-15

- 프로젝트: `cautionsmartcenter-4033/cautionsmartcenter-web`
- 운영 배포: `main`, `8b9ab6e`, Ready. 리뉴얼의 기준 커밋과 일치한다.
- 프로젝트 환경 변수 목록에는 `GMAIL_APP_PASSWORD`가 Production 전용으로 등록되어 있다. 값은 열람하거나 복사하지 않았다.
- 연결된 Shared 환경 변수는 없다. 이 확인만으로 외부 서비스의 실제 작동 여부를 판정할 수는 없다.
- 리뉴얼은 `codex/caution-cinematic-renewal` 브랜치의 Preview 배포로 검토한다. 운영 브랜치와 도메인 설정은 변경하지 않는다.
- Preview에서 이메일 발송, 알림톡, 인증 및 결제의 실제 작동은 검증 완료로 표시하지 않는다.

## REA 활용

공식 저장소 morluto/rea 별도 다운로드 및 rea-agents@6.5.0의 `analyze-javascript-application`을 로컬 src에 실행했다. 72개 파일, 103,019개 AST 노드, 940개 정적 finding, 파싱 실패 0. 분석 요약: rea-analysis-summary.json.

정적 분석은 소스를 실행하거나 API에 데이터를 전송하지 않았다. REA 출력에도 동적 경로와 관계의 불완전성이 명시돼 있다. 따라서 442개 원본 자산과 API/설정 파일의 해시/내용 비교, 빌드, UI 검증을 함께 수행한다.
REA는 개발 분석 도구로 사용했으며 사이트 방문자용 번들에 설치하지 않았다.
