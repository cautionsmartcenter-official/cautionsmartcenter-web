import { type WarrantyItem, getWarranties } from './warrantyStorage';

export interface CustomerUser {
  id: string;
  name: string;
  phone: string;
  email?: string;
  provider: 'kakao' | 'naver' | 'google';
  savedWarrantyNos: string[];
  createdAt: string;
  lastLoginAt: string;
}

const CUSTOMER_SESSION_KEY = 'caution_customer_session';
const CUSTOMER_USERS_KEY = 'caution_customer_users_db';

// 현재 로그인된 시공 고객 정보 가져오기
export const getCurrentCustomer = (): CustomerUser | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CUSTOMER_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read customer session:', err);
    return null;
  }
};

// 로그인 세션 저장
export const setCurrentCustomer = (user: CustomerUser | null): void => {
  if (typeof window === 'undefined') return;
  if (!user) {
    localStorage.removeItem(CUSTOMER_SESSION_KEY);
  } else {
    localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify(user));
    // 사용자 DB에도 저장/업데이트
    saveCustomerToDB(user);
  }
};

// 사용자 DB에 고객 저장 (기록 유지)
const saveCustomerToDB = (user: CustomerUser) => {
  try {
    const raw = localStorage.getItem(CUSTOMER_USERS_KEY);
    const users: CustomerUser[] = raw ? JSON.parse(raw) : [];
    const index = users.findIndex((u) => u.id === user.id || (u.phone && u.phone === user.phone));
    if (index >= 0) {
      users[index] = { ...users[index], ...user, lastLoginAt: new Date().toISOString() };
    } else {
      users.push(user);
    }
    localStorage.setItem(CUSTOMER_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save customer to DB:', err);
  }
};

// 전체 가입/인증 고객 명단 조회 (관리자용)
export const getAllCustomerUsers = (): CustomerUser[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOMER_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// 카카오 1초 간편 로그인
export const loginWithKakao = (name: string, phone: string, email?: string): CustomerUser => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const id = `kakao_${cleanPhone || Date.now()}`;
  const now = new Date().toISOString();

  // 기존 저장된 보증서 번호 확인
  const existingUsers = getAllCustomerUsers();
  const existing = existingUsers.find((u) => u.phone === cleanPhone);

  const newUser: CustomerUser = {
    id,
    name: name.trim() || '카카오 고객',
    phone: cleanPhone,
    email: email || `${cleanPhone}@kakao.com`,
    provider: 'kakao',
    savedWarrantyNos: existing ? existing.savedWarrantyNos : [],
    createdAt: existing ? existing.createdAt : now,
    lastLoginAt: now
  };

  setCurrentCustomer(newUser);
  return newUser;
};

// 네이버 간편 로그인
export const loginWithNaver = (name: string, phone: string, email?: string): CustomerUser => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const id = `naver_${cleanPhone || Date.now()}`;
  const now = new Date().toISOString();

  const existingUsers = getAllCustomerUsers();
  const existing = existingUsers.find((u) => u.phone === cleanPhone);

  const newUser: CustomerUser = {
    id,
    name: name.trim() || '네이버 고객',
    phone: cleanPhone,
    email: email || `${cleanPhone}@naver.com`,
    provider: 'naver',
    savedWarrantyNos: existing ? existing.savedWarrantyNos : [],
    createdAt: existing ? existing.createdAt : now,
    lastLoginAt: now
  };

  setCurrentCustomer(newUser);
  return newUser;
};

// 로그아웃
export const logoutCustomer = (): void => {
  setCurrentCustomer(null);
};

// 고객 계정에 보증서 번호 영구 등록/연동
export const linkWarrantyToCustomer = (
  customer: CustomerUser,
  carPlate: string,
  verificationCode: string // 휴대폰 번호 또는 뒷 4자리 또는 보증서 번호
): { success: boolean; message: string; warranty?: WarrantyItem } => {
  const allWarranties = getWarranties();
  const cleanPlate = carPlate.replace(/\s+/g, '');
  const cleanVerify = verificationCode.replace(/[^0-9a-zA-Z]/g, '').toLowerCase();

  // 1. 차량번호로 해당 차량의 보증서 찾기
  const matching = allWarranties.filter(
    (w) => w.carPlate.replace(/\s+/g, '') === cleanPlate
  );

  if (matching.length === 0) {
    return {
      success: false,
      message: '입력하신 차량번호로 발급된 정품 보증서가 없습니다. 차량번호를 다시 확인해 주세요.'
    };
  }

  // 2. 본인 확인 검증: 고객 연락처(전체 또는 뒷4자리) 또는 보증번호 일치 여부 확인
  const verified = matching.find((w) => {
    const phone = (w.customerPhone || '').replace(/[^0-9]/g, '');
    const warrantyNo = (w.warrantyNo || '').replace(/[^0-9a-zA-Z]/g, '').toLowerCase();

    // 고객 휴대폰 전체 일치
    if (phone && phone === cleanVerify) return true;
    // 고객 휴대폰 뒷 4자리 일치
    if (phone && phone.slice(-4) === cleanVerify) return true;
    // 보증서 번호 일치
    if (warrantyNo && warrantyNo === cleanVerify) return true;
    // 현재 로그인된 고객의 휴대폰 번호와 보증서 고객 번호가 같은 경우
    if (customer.phone && phone && phone === customer.phone) return true;

    return false;
  });

  if (!verified) {
    return {
      success: false,
      message: '본인 인증 정보(연락처 또는 보증서 번호)가 일치하지 않습니다. 시공 시 등록하신 연락처를 확인해 주세요.'
    };
  }

  // 3. 검증 성공 시 고객의 저장 목록에 추가
  const updatedNos = Array.from(new Set([...(customer.savedWarrantyNos || []), verified.warrantyNo]));
  const updatedCustomer = { ...customer, savedWarrantyNos: updatedNos };
  setCurrentCustomer(updatedCustomer);

  return {
    success: true,
    message: `${verified.carPlate} (${verified.carModel}) 정품 보증서가 고객님 계정에 안전하게 등록되었습니다.`,
    warranty: verified
  };
};

// 현재 고객이 열람 가능한 보증서 목록 조회 (본인 것만 필터링)
export const getCustomerVerifiedWarranties = (customer: CustomerUser): WarrantyItem[] => {
  const all = getWarranties();
  const cleanPhone = (customer.phone || '').replace(/[^0-9]/g, '');

  return all.filter((w) => {
    // 1) 고객 계정에 이미 등록/저장된 보증번호인 경우
    if (customer.savedWarrantyNos && customer.savedWarrantyNos.includes(w.warrantyNo)) {
      return true;
    }
    // 2) 로그인한 휴대폰 번호와 보증서에 등록된 고객 휴대폰 번호가 정확히 일치하는 경우 (자동 매칭)
    const wPhone = (w.customerPhone || '').replace(/[^0-9]/g, '');
    if (cleanPhone && wPhone && cleanPhone === wPhone) {
      return true;
    }
    return false;
  });
};
