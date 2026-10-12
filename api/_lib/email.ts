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

    // 모든 이메일 클라이언트(Gmail, 네이버, 다음, 아이폰 등)에서 100% 렌더링되도록 100% 인라인 스타일 사용
    const htmlContent = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>코션스마트센터 정품 품질보증서</title>
</head>
<body style="margin: 0; padding: 24px 10px; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Malgun Gothic', 'Dotum', sans-serif;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
    <tr>
      <td align="center">
        <!-- 메인 카드 -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b; box-shadow: 0 10px 30px rgba(0,0,0,0.4);">
          
          <!-- 카드 헤더 (럭셔리 블랙) -->
          <tr>
            <td align="center" style="background-color: #0b0f19; padding: 36px 20px; text-align: center; border-bottom: 2px solid #dc2626;">
              <span style="display: inline-block; background-color: #dc2626; color: #ffffff; font-size: 11px; font-weight: bold; padding: 5px 14px; border-radius: 20px; letter-spacing: 1px; text-transform: uppercase;">
                독일 정품 CARDIP 시공 인증
              </span>
              <h1 style="color: #ffffff; margin: 14px 0 6px 0; font-size: 23px; font-weight: 800; letter-spacing: -0.5px;">
                코션스마트센터 정품 품질보증서
              </h1>
              <p style="color: #94a3b8; margin: 0; font-size: 11px; font-family: monospace; letter-spacing: 2px;">
                CAUTION SMART CENTER OFFICIAL WARRANTY
              </p>
            </td>
          </tr>

          <!-- 카드 본문 -->
          <tr>
            <td style="padding: 32px 24px; background-color: #ffffff;">
              <div style="font-size: 17px; font-weight: bold; color: #0f172a; margin-bottom: 8px;">
                안녕하세요, <span style="color: #dc2626;">${warranty.customerName}</span> 고객님.
              </div>
              <p style="font-size: 13.5px; color: #475569; line-height: 1.6; margin: 0 0 24px 0;">
                (주)코션스마트센터를 믿고 소중한 차량의 시공을 맡겨주셔서 진심으로 감사드립니다.<br />
                고객님의 차량에 <strong>독일 CARDIP 정품 시공 보증서</strong>가 정식 발급되었습니다.
              </p>

              <!-- 시공 정보 테이블 -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 28px;">
                <tr>
                  <td width="100" style="background-color: #f1f5f9; padding: 12px 16px; font-size: 13px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0;">
                    보증번호
                  </td>
                  <td style="padding: 12px 16px; font-size: 13.5px; font-weight: 800; color: #dc2626; font-family: monospace; border-bottom: 1px solid #e2e8f0;">
                    ${warranty.warrantyNo}
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f1f5f9; padding: 12px 16px; font-size: 13px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0;">
                    차량번호
                  </td>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: bold; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
                    ${warranty.carPlate} (${warranty.carModel})
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f1f5f9; padding: 12px 16px; font-size: 13px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0;">
                    시공내역
                  </td>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
                    ${ppsType}
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f1f5f9; padding: 12px 16px; font-size: 13px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0;">
                    보증기간
                  </td>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
                    시공일(${warranty.issueDate})로부터 ${warranty.warrantyPeriodYears}년
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f1f5f9; padding: 12px 16px; font-size: 13px; font-weight: bold; color: #475569;">
                    보증상태
                  </td>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: bold; color: #16a34a;">
                    ● 정품 인증 완료 (공식 보증 효력 적용)
                  </td>
                </tr>
              </table>

              <!-- 핵심 버튼: 보증서 확인 및 PDF 다운로드 -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px;">
                <tr>
                  <td align="center">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                      <tr>
                        <td align="center" bgcolor="#dc2626" style="border-radius: 12px;">
                          <a href="${viewUrl}" target="_blank" style="display: inline-block; background-color: #dc2626; color: #ffffff !important; font-size: 16px; font-weight: 800; text-decoration: none; padding: 16px 36px; border-radius: 12px; border: 1px solid #b91c1c; text-align: center;">
                            📄 온라인 정품 보증서 확인 &amp; PDF 다운로드
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- 직접 링크 안내 (버튼 차단 방지) -->
              <div style="text-align: center; margin-bottom: 28px;">
                <span style="font-size: 11.5px; color: #64748b;">버튼 클릭이 안 되시면 아래 링크를 클릭해 주세요:</span><br />
                <a href="${viewUrl}" target="_blank" style="font-size: 12px; color: #2563eb; text-decoration: underline; word-break: break-all;">
                  ${viewUrl}
                </a>
              </div>

              <!-- 보증서 보관 및 PDF 다운로드 안내 상자 -->
              <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 16px 18px; font-size: 12.5px; color: #991b1b; line-height: 1.65;">
                <strong style="color: #b91c1c; display: block; margin-bottom: 6px;">📌 보증서 보관 및 PDF 다운로드 안내</strong>
                • 위 <strong>[온라인 정품 보증서 확인 &amp; PDF 다운로드]</strong> 버튼을 누르시면 고객님 전용 모바일 전자보증서가 즉시 열립니다.<br />
                • 보증서 화면 상단의 <strong>[PDF 저장]</strong> 버튼을 누르시면 <strong>1면(상세) + 2면(약관) 총 2페이지가 합쳐진 공식 보증서 PDF</strong>를 다운로드하여 영구 보관하실 수 있습니다.<br />
                • 향후 사고나 보험 처리 시 본 전자보증서 링크 또는 PDF 파일을 제출하시면 코션 공식 보증 혜택을 받으실 수 있습니다.
              </div>
            </td>
          </tr>

          <!-- 푸터 (회사 정보) -->
          <tr>
            <td align="center" style="background-color: #0b0f19; padding: 24px; text-align: center; border-top: 1px solid #1e293b; color: #94a3b8; font-size: 11.5px; line-height: 1.6;">
              <strong style="color: #f8fafc; font-size: 12.5px;">(주)코션스마트센터</strong><br />
              대표전화: <strong style="color: #ffffff;">031-705-1888</strong> | 발송계정: ${SENDER_EMAIL}<br />
              독일 정품 CARDIP PPS 시공 및 보증 공식 센터<br />
              <span style="color: #64748b; font-size: 10.5px; margin-top: 6px; display: inline-block;">
                본 메일은 코션스마트센터 정품 품질보증서 발급 시스템에서 자동 발송되었습니다.
              </span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
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
