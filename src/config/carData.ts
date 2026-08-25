export interface CarModelInfo {
  name: string;
  codeNames: string[];
}

export interface CarBrand {
  id: string;
  name: string;
  nameKr: string;
  models: CarModelInfo[];
}

export const CAR_DATABASE: CarBrand[] = [
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    nameKr: '메르세데스-벤츠',
    models: [
      {
        name: 'S-Class (S클래스 / 마이바흐)',
        codeNames: ['W223 (현행 2021~현재)', 'W222 (2014~2020)', 'W221 (2006~2013)', 'W220 / 이전 클래식', 'Z223 (마이바흐 S클래스)']
      },
      {
        name: 'E-Class (E클래스)',
        codeNames: ['W214 (현행 풀체인지 2024~현재)', 'W213 (2016~2023)', 'W212 (2009~2016)', 'W211 (2002~2009)']
      },
      {
        name: 'C-Class (C클래스)',
        codeNames: ['W206 (현행 2022~현재)', 'W205 (2014~2021)', 'W204 (2007~2014)', 'W203 / 이전 세대']
      },
      {
        name: 'G-Class (G바겐 / G63 AMG)',
        codeNames: ['W465 (신형 2024~현재)', 'W463A (2018~2024)', 'W463 (1990~2018 구형)']
      },
      {
        name: 'GLC / GLC 쿠페',
        codeNames: ['X254 / C254 (현행 2023~현재)', 'X253 / C253 (2015~2022)']
      },
      {
        name: 'GLE / GLE 쿠페',
        codeNames: ['V167 / C167 (현행 2019~현재)', 'W166 / C292 (2015~2019 ML/GLE)']
      },
      {
        name: 'GLS / 마이바흐 GLS',
        codeNames: ['X167 (현행 2020~현재)', 'X166 (2012~2019)', 'Z167 (마이바흐 GLS 600)']
      },
      {
        name: 'CLE / CLS / CLA',
        codeNames: ['C236 (현행 CLE 쿠페/카브리올레)', 'C257 (CLS 3세대)', 'C218 (CLS 2세대)', 'C118 (CLA 2세대)']
      },
      {
        name: 'AMG GT / SL 로드스터',
        codeNames: ['C192 (현행 2세대 AMG GT)', 'C190/R190 (1세대 AMG GT/GTR)', 'R232 (현행 SL 63 AMG)', 'R231 (이전 SL)']
      },
      {
        name: 'EQ 순수전기차 (EQE / EQS)',
        codeNames: ['V297 (EQS 세단)', 'V295 (EQE 세단)', 'X296 (EQS SUV)', 'X294 (EQE SUV)']
      }
    ]
  },
  {
    id: 'bmw',
    name: 'BMW',
    nameKr: 'BMW (비엠더블유)',
    models: [
      {
        name: '3시리즈 / M3',
        codeNames: ['G20 / G21 (현행 2019~현재)', 'G80 (현행 M3 / M3 투어링)', 'F30 (2012~2019)', 'F80 (이전 M3)', 'E90 / E92 (V8 M3)', 'E46 (클래식 M3)']
      },
      {
        name: '4시리즈 / M4',
        codeNames: ['G22 / G23 / G26 (현행 2021~현재)', 'G82 / G83 (현행 M4)', 'F32 / F36 (1세대 4시리즈)', 'F82 (1세대 M4)']
      },
      {
        name: '5시리즈 / M5',
        codeNames: ['G60 (현행 풀체인지 2024~현재)', 'G90 (신형 M5 V8 PHEV)', 'G30 (2017~2023)', 'F90 (이전 M5)', 'F10 (2010~2017)', 'E60 (V10 M5)']
      },
      {
        name: '7시리즈 / i7',
        codeNames: ['G70 (현행 7시리즈 / i7 전기차)', 'G11 / G12 (2015~2022)', 'F01 / F02 (2008~2015)', 'E65 / E66']
      },
      {
        name: '8시리즈 / M8',
        codeNames: ['G14 / G15 / G16 (현행 8시리즈)', 'F91 / F92 / F93 (M8 쿠페/그란쿠페)']
      },
      {
        name: 'X5 / X6 / X7 / XM',
        codeNames: ['G05 LCI / F95 LCI (현행 X5 / X5 M)', 'G06 LCI / F96 LCI (현행 X6 / X6 M)', 'G07 LCI (현행 X7 플래그십)', 'G09 (XM V8 M 하이브리드)']
      },
      {
        name: 'X3 / X4 / M2 / Z4',
        codeNames: ['G45 (신형 풀체인지 X3)', 'G01 / G02 (이전 X3 / X4)', 'G87 (현행 신형 M2)', 'F87 (이전 M2 컴페티션)', 'G29 (현행 Z4 로드스터)']
      }
    ]
  },
  {
    id: 'audi',
    name: 'Audi',
    nameKr: 'Audi (아우디)',
    models: [
      {
        name: 'A6 / A7 / RS6 / RS7',
        codeNames: ['C8 (현행 A6 / S6 / RS6 아반트)', '4K8 (현행 A7 / S7 / RS7)', 'C7 (2011~2018 A6/S6/RS6)', '4G8 (2010~2018 A7/RS7)']
      },
      {
        name: 'A8 / S8 (플래그십)',
        codeNames: ['D5 (현행 A8 L / S8)', 'D4 (2010~2017 A8/S8)', 'D3 (클래식 A8)']
      },
      {
        name: 'Q7 / Q8 / RS Q8',
        codeNames: ['4M LCI (현행 Q7 / SQ7)', '4MN (현행 Q8 / SQ8 / RS Q8)']
      },
      {
        name: 'R8 / e-tron GT',
        codeNames: ['4S (2세대 R8 V10 퍼포먼스)', '42 (1세대 R8 V8/V10)', 'FW (e-tron GT / RS e-tron GT)']
      },
      {
        name: 'A4 / A5 / RS3 / RS5',
        codeNames: ['B9 / B9.5 (현행 A4 / A5 / RS5)', '8Y (현행 신형 RS3 세단)', 'B8 (이전 세대 A4/A5)']
      }
    ]
  },
  {
    id: 'porsche',
    name: 'Porsche',
    nameKr: 'Porsche (포르쉐)',
    models: [
      {
        name: '911 (카레라 / 터보 / GT3 / GT3 RS)',
        codeNames: ['992.2 (신형 하이브리드 카레라/GTS)', '992.1 (2019~2024 카레라/터보S/GT3/GT3 RS)', '991.2 (2016~2019 터보/GT3/GT2 RS)', '991.1 (2012~2015 자연흡기)', '997.2 / 997.1 (2005~2012)', '996 (1998~2004 수랭식 초기)', '993 / 964 / 930 (공랭식 클래식)']
      },
      {
        name: '718 (박스터 / 카이맨)',
        codeNames: ['982 (718 박스터/카이맨 GTS 4.0 / GT4 / GT4 RS / 스파이더 RS)', '981 (2012~2016 6기통 자연흡기)', '987 (2005~2012 박스터/카이맨)']
      },
      {
        name: '파나메라 (Panamera)',
        codeNames: ['972 (3세대 현행 2024~현재)', '971.2 (2020~2023)', '971.1 (2016~2020)', '970 (1세대 파나메라)']
      },
      {
        name: '타이칸 (Taycan 전기차)',
        codeNames: ['J1 II (신형 페이스리프트 2024~현재)', 'J1 I (2019~2023 4S/GTS/터보S/크로스투리스모)']
      },
      {
        name: '카이엔 (Cayenne / 카이엔 쿠페)',
        codeNames: ['9YA II / 9YB II (현행 페이스리프트 터보GT/E-하이브리드)', '9YA / 9YB (2018~2023 3세대 카이엔)', '92A (2세대 카이엔)', '9PA (1세대 카이엔)']
      },
      {
        name: '마칸 (Macan)',
        codeNames: ['Macan EV (신형 순수전기차)', '95B.3 (현행 3차 F/L GTS/S)', '95B.2 / 95B.1 (1~2차 F/L)']
      }
    ]
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    nameKr: 'Ferrari (페라리)',
    models: [
      {
        name: '296 GTB / 296 GTS',
        codeNames: ['F171 (V6 트윈터보 PHEV 미드십)']
      },
      {
        name: 'SF90 스트라달레 / SF90 스파이더',
        codeNames: ['F173 (플래그십 V8 PHEV 하이퍼카)', 'SF90 XX (트랙 한정판)']
      },
      {
        name: '푸로산게 (Purosangue)',
        codeNames: ['F175 (6.5L V12 4도어 플래그십)']
      },
      {
        name: '로마 (Roma / Roma Spider)',
        codeNames: ['F169 (로마 스파이더)', 'F164 (로마 쿠페)']
      },
      {
        name: '12칠린드리 / 812 / F12 (V12 프론트 미드십)',
        codeNames: ['F167 (신형 12Cilindri)', 'F152M (812 슈퍼패스트 / 812 GTS / 컴페티치오네)', 'F152 (F12 베를리네타 / TdF)', 'F141 (599 GTB)']
      },
      {
        name: 'F8 / 488 / 458 (V8 미드십 헤리티지)',
        codeNames: ['F142MFL (F8 트리뷰토 / F8 스파이더)', 'F142M (488 GTB / 스파이더 / 488 피스타)', 'F142 (458 이탈리아 / 스파이더 / 스페치알레)', 'F131 (F430 / 스쿠데리아)']
      },
      {
        name: '포르토피노 / 캘리포니아',
        codeNames: ['F164BC (포르토피노 M)', 'F164 (포르토피노)', 'F149M (캘리포니아 T)', 'F149 (캘리포니아)']
      }
    ]
  },
  {
    id: 'lamborghini',
    name: 'Lamborghini',
    nameKr: 'Lamborghini (람보르기니)',
    models: [
      {
        name: '레부엘토 (Revuelto)',
        codeNames: ['LB634 (V12 자연흡기 HPEV 플래그십)']
      },
      {
        name: '테메라리오 (Temerario)',
        codeNames: ['신형 V8 트윈터보 10,000rpm 하이브리드']
      },
      {
        name: '우루스 (Urus SUV)',
        codeNames: ['Urus SE (PHEV 신형)', 'Urus Performante (퍼포만테)', 'Urus S (후기형)', 'Urus (초기형 2018~2022)']
      },
      {
        name: '아벤타도르 (Aventador V12)',
        codeNames: ['LP780-4 Ultimae (얼티메 마지막 한정판)', 'LP770-4 SVJ (슈퍼벨로체 요타)', 'LP750-4 SV (슈퍼벨로체)', 'LP740-4 S (후기형)', 'LP700-4 (초기형 2011~2016)']
      },
      {
        name: '우라칸 (Huracán V10)',
        codeNames: ['Huracán STO (슈퍼 트로페오 오몰로가타)', 'Huracán Tecnica (테크니카)', 'Huracán Sterrato (스테라토 오프로더)', 'Huracán EVO / EVO Spyder (후기형)', 'Huracán LP610-4 / LP580-2 (초기형)']
      },
      {
        name: '가야르도 / 무르시엘라고 (헤리티지)',
        codeNames: ['LP570-4 슈퍼레제라 / 퍼포만테', 'LP560-4 / LP550-2', 'LP670-4 SV', 'LP640']
      }
    ]
  },
  {
    id: 'astonmartin',
    name: 'Aston Martin',
    nameKr: 'Aston Martin (애스턴마틴)',
    models: [
      {
        name: 'DB12 / DB11',
        codeNames: ['DB12 쿠페 / 볼란테 (신형)', 'DB11 V8 / V12 AMR']
      },
      {
        name: 'DBS / 뱅퀴시 (V12 플래그십)',
        codeNames: ['신형 뱅퀴시 (2024 V12 835마력)', 'DBS 슈퍼레제라 / 770 얼티메이트', '2세대 뱅퀴시 (2012~2018)']
      },
      {
        name: '밴티지 (Vantage)',
        codeNames: ['신형 밴티지 (2024 풀체인지급 665마력)', '이전 밴티지 V8 / V12 (2018~2023)', 'V8/V12 밴티지 (2005~2017)']
      },
      {
        name: 'DBX (슈퍼 럭셔리 SUV)',
        codeNames: ['DBX 707 (707마력 최고성능)', 'DBX 550 (초기형 V8)']
      },
      {
        name: '발할라 / 발키리 (하이퍼카)',
        codeNames: ['Valhalla (V8 PHEV 하이퍼카)', 'Valkyrie (V12 Cosworth 극강 하이퍼카)']
      }
    ]
  },
  {
    id: 'rollsroyce',
    name: 'Rolls-Royce',
    nameKr: 'Rolls-Royce (롤스로이스)',
    models: [
      {
        name: '팬텀 (Phantom)',
        codeNames: ['Phantom VIII Series II (현행 시리즈 2)', 'Phantom VIII (2017~2022)', 'Phantom VII (2003~2016)']
      },
      {
        name: '고스트 (Ghost)',
        codeNames: ['Ghost Series II (신형)', 'Ghost II (2020~2024 / 블랙 배지)', 'Ghost I (2010~2020 시리즈 1/2)']
      },
      {
        name: '컬리넌 (Cullinan SUV)',
        codeNames: ['Cullinan Series II (2024 신형 페이스리프트)', 'Cullinan I (2018~2024 / 블랙 배지)']
      },
      {
        name: '스펙터 / 레이스 / 던',
        codeNames: ['Spectre (순수 전기 쿠페 현행)', 'Wraith (V12 쿠페 / 블랙 배지)', 'Dawn (V12 컨버터블 / 블랙 배지)']
      }
    ]
  },
  {
    id: 'bentley',
    name: 'Bentley',
    nameKr: 'Bentley (벤틀리)',
    models: [
      {
        name: '컨티넨탈 GT / GTC',
        codeNames: ['4세대 신형 GT (2024 V8 울트라 하이브리드 782마력)', '3세대 3S (2018~2024 W12/V8/스피드/뮬리너)', '2세대 3W (2011~2018)', '1세대 (2003~2011)']
      },
      {
        name: '플라잉스퍼 (Flying Spur)',
        codeNames: ['3세대 후기형 (2024 V8 하이브리드)', '3세대 전기형 (2019~2024 W12/V8)', '2세대 (2013~2019)']
      },
      {
        name: '벤테이가 (Bentayga)',
        codeNames: ['Bentayga EWB (롱휠베이스)', 'Bentayga Facelift (2020~현재)', 'Bentayga 1세대 (2015~2020)']
      }
    ]
  },
  {
    id: 'mclaren',
    name: 'McLaren',
    nameKr: 'McLaren (맥라렌)',
    models: [
      {
        name: '750S / 720S / 765LT (슈퍼 시리즈)',
        codeNames: ['750S (현행 2023~현재)', '765LT (롱테일 한정판)', '720S (2017~2023)', '650S / 675LT (2014~2017)', 'MP4-12C (2011~2014)']
      },
      {
        name: '아투라 / GT / GTS',
        codeNames: ['Artura / Artura Spider (V6 PHEV 신형)', 'GTS (2024 신형)', 'McLaren GT (2019~2023)', '600LT / 570S / 540C (스포츠 시리즈)']
      }
    ]
  },
  {
    id: 'tesla',
    name: 'Tesla',
    nameKr: 'Tesla (테슬라)',
    models: [
      {
        name: 'Model 3',
        codeNames: ['Highland (2024~현재 신형 하이랜드 RWD/LR/퍼포먼스)', 'Model 3 리프레시 (2021~2023)', 'Model 3 초기형 (2017~2020)']
      },
      {
        name: 'Model Y',
        codeNames: ['Juniper (신형 주니퍼)', 'Model Y HW4 (2023~현재 RWD/LR/퍼포먼스)', 'Model Y 초기형 (2020~2022)']
      },
      {
        name: 'Model S / Model X',
        codeNames: ['Model S Plaid / LR (2021~현재 요크스티어링 리프레시)', 'Model X Plaid / LR (2021~현재 6인승/7인승)', 'Model S/X 세로 디스플레이 (2012~2020)']
      },
      {
        name: 'Cybertruck',
        codeNames: ['Cyberbeast (트라이모터 845마력)', 'All-Wheel Drive (듀얼모터 스테인리스)']
      }
    ]
  },
  {
    id: 'landrover',
    name: 'Land Rover',
    nameKr: 'Land Rover (랜드로버 / 레인지로버)',
    models: [
      {
        name: '올 뉴 레인지로버 (보그 / SV)',
        codeNames: ['L460 (현행 5세대 2022~현재 SWB/LWB/SV)', 'L405 (4세대 2012~2021)', 'L322 (3세대 클래식)']
      },
      {
        name: '레인지로버 스포츠 (RRS)',
        codeNames: ['L461 (현행 3세대 2022~현재 / SV)', 'L494 (2세대 2013~2022 / SVR)']
      },
      {
        name: '디펜더 (Defender)',
        codeNames: ['L663 (현행 90 / 110 / 130 / V8 / OCTA)', '클래식 디펜더']
      },
      {
        name: '벨라 / 이보크 / 디스커버리',
        codeNames: ['L560 (레인지로버 벨라)', 'L551 (레인지로버 이보크 2세대)', 'L462 (디스커버리 5)']
      }
    ]
  },
  {
    id: 'maserati',
    name: 'Maserati',
    nameKr: 'Maserati (마세라티)',
    models: [
      {
        name: 'MC20 (슈퍼 스포츠카)',
        codeNames: ['MC20 쿠페 (네투노 V6 트윈터보)', 'MC20 첼로 (컨버터블)']
      },
      {
        name: '그란투리스모 / 그레칼레',
        codeNames: ['M92 (신형 그란투리스모 모데나/트로페오/폴고레)', 'M182 (그레칼레 GT/모데나/트로페오)', 'M145 (구형 그란투리스모 4.7 V8)']
      },
      {
        name: '기블리 / 콰트로포르테 / 르반떼',
        codeNames: ['M157 (기블리 페이스리프트)', 'M156 (콰트로포르테 VI)', 'M161 (르반떼 SUV / 트로페오)']
      }
    ]
  },
  {
    id: 'other',
    name: 'Other',
    nameKr: '기타 수입차 / 국산 프리미엄',
    models: [
      {
        name: '제네시스 (Genesis)',
        codeNames: ['RS4 (현행 G90 / G90 블랙)', 'RG3 (현행 G80 / G80 F/L / 일렉트리파이드)', 'JX1 (현행 GV80 / GV80 쿠페)', 'JK1 (현행 GV70 / GV70 F/L)', 'JW (GV60)']
      },
      {
        name: '볼보 (Volvo)',
        codeNames: ['XC90 II (현행 B6 / T8 리차지)', 'XC60 II (현행 B5 / T8)', 'S90 II (현행 B5 / B6 / T8)', 'EX90 / EX30']
      },
      {
        name: '기타 브랜드 및 직접 입력',
        codeNames: ['상세 차종 및 코드명 직접 입력']
      }
    ]
  }
];
