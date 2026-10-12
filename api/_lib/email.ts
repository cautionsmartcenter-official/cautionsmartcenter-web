// Gmail(cautionsmartcenter@gmail.com) 기반 보증서 이메일 발송 모듈
import nodemailer from 'nodemailer';

export const SENDER_EMAIL = 'cautionsmartcenter@gmail.com';
export const SENDER_NAME = '코션스마트센터';

export function isEmailConfigured(): boolean {
  return Boolean(process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_APP_PASSWORD);
}

export interface WarrantyEmailPayload {
  customerName: string;
  customerEmail?: string;
  carPlate: string;
  carModel: string;
  warrantyNo: string;
  issueDate: string;
  warrantyPeriodYears: number;
  hasClearPps: boolean;
  clearPpsDetail?: string;
  hasColorPps: boolean;
  colorPpsDetail?: string;
}

export async function sendWarrantyEmail(
  warranty: WarrantyEmailPayload,
  viewUrl: string
): Promise<{ success: boolean; message: string }> {
  if (!warranty.customerEmail || !warranty.customerEmail.includes('@')) {
    return { success: false, message: '유효한 고객 이메일 주소가 없습니다.' };
  }

  const pass = (process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_APP_PASSWORD || '').trim().replace(/\s+/g, '');
  if (!pass) {
    return {
      success: false,
      message: 'GMAIL_APP_PASSWORD 환경 변수가 설정되지 않았습니다. Gmail 2단계 인증 후 생성한 16자리 앱 비밀번호를 등록해 주세요.'
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SENDER_EMAIL,
        pass: pass
      }
    });

    const ppsType = [
      warranty.hasClearPps ? `투명PPS(${warranty.clearPpsDetail || '전체'})` : '',
      warranty.hasColorPps ? `컬러PPS(${warranty.colorPpsDetail || '전체'})` : ''
    ].filter(Boolean).join(', ') || '독일 정품 CARDIP PPS';

    const subject = `[코션스마트센터] ${warranty.customerName} 고객님 차량(${warranty.carPlate}) 정품 보증서 발급 안내`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>코션스마트센터 정품 보증서</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Malgun Gothic', sans-serif; background-color: #f1f5f9; color: #1e293b; margin: 0; padding: 24px 12px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 36px 24px; text-align: center; color: #ffffff; }
    .badge { display: inline-block; background: #ef4444; color: #ffffff; padding: 5px 12px; border-radius: 9999px; font-size: 11px; font-weight: bold; margin-bottom: 12px; letter-spacing: 0.5px; }
    .header h1 { margin: 0; font-size: 22px; color: #ffffff; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0; font-size: 12px; color: #94a3b8; font-family: monospace; letter-spacing: 1px; }
    .body { padding: 32px 24px; }
    .greeting { font-size: 17px; font-weight: 800; color: #0f172a; margin-bottom: 12px; }
    .intro { font-size: 13.5px; line-height: 1.6; color: #475569; margin: 0 0 24px; }
    .table-box { background: #f8fafc; border-radius: 14px; border: 1px solid #e2e8f0; overflow: hidden; margin-bottom: 28px; }
    .table-row { display: flex; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
    .table-row:last-child { border-bottom: none; }
    .table-label { width: 110px; background: #f1f5f9; padding: 12px 16px; font-weight: 700; color: #475569; shrink-0; }
    .table-val { padding: 12px 16px; color: #0f172a; font-weight: 600; flex: 1; }
    .btn-wrap { text-align: center; margin: 32px 0 24px; }
    .btn { display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #ffffff !important; text-decoration: none; padding: 16px 36px; border-radius: 14px; font-weight: 800; font-size: 15px; box-shadow: 0 6px 20px rgba(220,38,38,0.35); }
    .notice-box { background: #fef2f2; border: 1px solid #fecaca; border-radius: 14px; padding: 18px 20px; font-size: 12.5px; color: #991b1b; line-height: 1.65; }
    .notice-box strong { color: #b91c1c; }
    .footer { background: #f8fafc; padding: 24px; text-align: center; font-size: 11.5px; color: #64748b; border-top: 1px solid #e2e8f0; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="badge">독일 정품 CARDIP 시공 인증</div>
      <h1>코션스마트센터 정품 품질보증서</h1>
      <p>CAUTION SMART CENTER OFFICIAL WARRANTY</p>
    </div>
    <div class="body">
      <div class="greeting">안녕하세요, ${warranty.customerName} 고객님.</div>
      <p class="intro">
        (주)코션스마트센터를 믿고 소중한 차량의 시공을 맡겨주셔서 진심으로 감사드립니다.<br>
        고객님의 차량에 <strong>독일 CARDIP 정품 시공 보증서</strong>가 정상 발급되었습니다.
      </p>

      <div class="table-box">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="width: 100px; background: #f1f5f9; padding: 12px 16px; font-weight: 700; color: #475569; font-size: 13px;">차량번호</td>
            <td style="padding: 12px 16px; color: #0f172a; font-weight: 700; font-size: 13px;">${warranty.carPlate} (${warranty.carModel})</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="background: #f1f5f9; padding: 12px 16px; font-weight: 700; color: #475569; font-size: 13px;">시공내역</td>
            <td style="padding: 12px 16px; color: #0f172a; font-weight: 600; font-size: 13px;">${ppsType}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="background: #f1f5f9; padding: 12px 16px; font-weight: 700; color: #475569; font-size: 13px;">보증기간</td>
            <td style="padding: 12px 16px; color: #0f172a; font-weight: 600; font-size: 13px;">시공일(${warranty.issueDate})로부터 ${warranty.warrantyPeriodYears}년</td>
          </tr>
          <tr>
            <td style="background: #f1f5f9; padding: 12px 16px; font-weight: 700; color: #475569; font-size: 13px;">보증번호</td>
            <td style="padding: 12px 16px; color: #dc2626; font-weight: 800; font-family: monospace; font-size: 13px;">${warranty.warrantyNo}</td>
          </tr>
        </table>
      </div>

      <div class="btn-wrap">
        <a href="${viewUrl}" class="btn" target="_blank">온라인 정품 보증서 확인 및 PDF 다운로드</a>
      </div>

      <div class="notice-box">
        <strong>📌 보증서 보관 및 PDF 다운로드 안내</strong><br>
        • 위 [온라인 정품 보증서 확인 및 PDF 다운로드] 버튼을 누르시면 고객님 전용 모바일 전자보증서를 언제든 확인하실 수 있습니다.<br>
        • 화면 내 [PDF 다운로드] 버튼을 누르시면 <strong>1면(상세) + 2면(약관) 총 2페이지가 합쳐진 공식 보증서 PDF</strong>를 다운로드하여 영구 보관하실 수 있습니다.<br>
        • 향후 사고나 보험 처리 시 본 전자보증서 링크 또는 PDF 파일을 제출하시면 공식 보증 혜택이 적용됩니다.
      </div>
    </div>
    <div class="footer">
      <strong>(주)코션스마트센터</strong> | 대표전화: 031-705-1888<br>
      발송 계정: ${SENDER_EMAIL} (발신 전용)<br>
      본 메일은 코션스마트센터 공식 품질보증서 발급 시스템에서 자동 발송되었습니다.
    </div>
  </div>
</body>
</html>
    `;

    await transporter.sendMail({
      from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
      to: warranty.customerEmail,
      subject: subject,
      html: htmlContent
    });

    return { success: true, message: `${warranty.customerEmail} 주소로 이메일 발송 완료` };
  } catch (err: any) {
    console.error('[sendWarrantyEmail]', err);
    return { success: false, message: `이메일 발송 실패: ${err?.message || String(err)}` };
  }
}
