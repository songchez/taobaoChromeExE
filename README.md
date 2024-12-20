# Tmall Image Downloader (티몰 이미지 다운로더)

## 소개

이 크롬 확장 프로그램은 Tmall 웹사이트에서 JPG/JPEG 이미지를 자동으로 다운로드하는 도구입니다.

## 기능

- 현재 페이지의 모든 JPG/JPEG 이미지 자동 감지
- 이미지 일괄 다운로드 (ZIP 파일 형태)
- 다운로드 진행률 표시
- 에러 처리 및 사용자 알림

## 설치 방법

1. 프로젝트 다운로드
2. Chrome 브라우저에서 `chrome://extensions` 접속
3. 우측 상단의 '개발자 모드' 활성화
4. '압축해제된 확장 프로그램을 로드합니다' 클릭
5. 다운로드한 프로젝트 폴더 선택

## 사용 방법

1. Tmall 웹사이트 접속
2. 크롬 브라우저 상단의 확장 프로그램 아이콘 클릭
3. 'Download Images' 버튼 클릭
4. 자동으로 이미지가 ZIP 파일로 다운로드됨

## 프로젝트 구조

├── manifest.json # 확장 프로그램 설정 파일
├── background.js # 백그라운드 스크립트
├── content.js # 콘텐츠 스크립트 (이미지 다운로드 로직)
├── popup.html # 팝업 UI
├── popup.js # 팝업 동작 제어
├── styles.css # UI 스타일
└── icon.png # 확장 프로그램 아이콘

## 기술 스택

- HTML5
- CSS3
- JavaScript (ES6+)
- Chrome Extension API
- JSZip 라이브러리

## 주요 기능 설명

### 이미지 탐지

- `content.js`에서 페이지 내의 모든 이미지 요소를 검색
- JPG/JPEG 확장자를 가진 이미지만 필터링

### 다운로드 처리

- JSZip 라이브러리를 사용하여 이미지들을 ZIP 파일로 압축
- 진행 상황을 실시간으로 표시
- 네트워크 오류 등에 대한 예외 처리

### UI/UX

- 직관적인 버튼 인터페이스
- 진행 상황 표시 바
- 상태 메시지 표시
- 에러 발생 시 사용자 알림

## 제한 사항

- JPG/JPEG 형식의 이미지만 다운로드 가능
- Tmall 도메인에서만 작동
- 이미지 URL에 직접 접근이 가능해야 함

## 향후 개선 계획

- [ ] 다양한 이미지 형식 지원 (PNG, WebP 등)
- [ ] 다운로드 취소 기능
- [ ] 이미지 미리보기 기능
- [ ] 다운로드 히스토리 관리
- [ ] 다국어 지원

## 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 기여 방법

1. 이 저장소를 포크합니다.
2. 새로운 브랜치를 생성합니다.
3. 변경사항을 커밋합니다.
4. 브랜치에 푸시합니다.
5. Pull Request를 생성합니다.
