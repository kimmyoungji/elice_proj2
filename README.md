# 🐢 TURTINE


  **TURTINE**은 turtle과 routine의 합성어로, 거북이처럼 느려도 환경을 위한 습관을 형성해 나가자는 뜻입니다.<br/>
  진화하는 거북이 캐릭터를 통한 재미 요소로 지속적인 참여를 유도, 환경 보호에 기여할 수 있도록 하는 프로젝트입니다.


## 프로젝트 구성 안내
### **목차**<br/>
[1. 프로젝트 소개](#1-프로젝트-소개)<br/>
[2. 프로젝트 목표](#2-프로젝트-목표)<br/>
[3. 프로젝트 기능 설명](#3-프로젝트-기능-설명)<br/>
[4. 프로젝트 구성도](#4-프로젝트-구성도)<br/>
[5. 프로젝트 팀원 역할 분담](#5-프로젝트-팀원-역할-분담)<br/>
[6. 버전](#6-버전)<br/>

## 1. 프로젝트 소개

### 기술 스택 <br/>
 - 데이터분석 <br/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=Python&logoColor=white"/>
 - Front-end <br/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
 - Back-end <br/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/> <br/>

### 라이브러리 <br/>
  <img src="https://img.shields.io/badge/NumPy-013243?style=flat-square&logo=NumPy&logoColor=white"/>
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=Bootstrap&logoColor=white"/>
  <img src="https://img.shields.io/badge/multer-FF9E0F?style=flat-square&logo=multer&logoColor=white"/>
  <img src="https://img.shields.io/badge/matplotlib-0ABF53?style=flat-square&logo=multer&logoColor=white"/>
  <img src="https://img.shields.io/badge/fullcalendar-7F2B7B?style=flat-square&logo=fullcalendar&logoColor=white"/><br/>

### 데이터셋
 세계 플라스틱 폐기물 발생량 순위 (한국 순위 초점), 국내 전체 폐기물 중, 플라스틱 폐기물 비중 <br/>



## 2. 프로젝트 목표

  ### 데이터를 통해 도출된 인사이트
  - 세계 플라스틱 배출량 데이터: 우리나라가 인구수 및 국가 면적 대비 상위권(n위)에 위치함을 확인
  - 국내 쓰레기 분류별 배출량 데이터: 국내에서 배출되는 쓰레기 중 플라스틱이 n%을 차지함을 확인

  ### 해결하고자 하는 과제 및 목표
  **국내 플라스틱 폐기물 배출량의 감소**<br/>
  - 최대한 많은 사람들이 해당 앱을 통해 국내 플라스틱 배출량 감소에 동참할 수 있도록 함
  - 보다 친환경적인 행위들이 자연스레 습관으로 굳어질 수 있도록 함

  ### 프로젝트 아이디어
  - 플라스틱에 고통받는 해양생물 중 바다거북을 메인 캐릭터로 채용하여 진입장벽 최소화 및 친근감 형성
  - 최근 트렌드인  "GOD生"살기, 챌린지등의 컨텐츠와 접목하여 환경 보호도 갓생의 일부로 정착할 수 있도록 시도



## 3. 프로젝트 기능 설명

  ### 주요 기능 (주된 활용성) 및 서브 기능
  **1. 메인페이지**<br/>
    - offset 기반 스크롤 애니메이션 설정

  **2. 회원가입 & 로그인**<br/>
    - 이메일, 닉네임 중복 확인<br/>
    - 로그인 시, token 및 cookie로 유저 인증

  **3. 프로필**<br/>
    - 회원 탈퇴 기능<br/>
    - 닉네임 변경 가능 및 중복 확인<br/>
    - multer-s3를 이용한 프로필 이미지 업로드, filereader api를 이용한 미리보기 구현

  **4. 습관페이지**<br/>
    - 상태관리를 통한 습관 create, update 및 read, checked 구현<br/>
    - Query문으로 데이터 취합, 유저 등급 책정 및 캐릭터화

  **5. 캘린더**<br/>
    - FullCalendar 라이브러리 이용하여 습관 완료 일자 시각화<br/>
    - Recharts 라이브러리 이용하여 주간 달성 현황 차트화

  **6. 커뮤니티**<br/>
    - 랜덤 유저의 등급을 캐릭터로 노출<br/><br/>

  
  ### 프로젝트만의 차별점, 기대 효과
  - 쉽게 실천 가능한 습관 예시 제공으로 진입장벽 해소<br/>
  - 습관 달성 정도에 따른 등급 상승으로 동기 부여<br/>
  - 지속 기간 설정으로 습관 형성 유도<br/>


## 4. 프로젝트 구성도
### 메인페이지
![서비스소개](/uploads/13688b812645cdd86d8f85e267386a0a/서비스소개.png)<br/>
### 회원가입 & 로그인 & 프로필
![login](/uploads/9198a4d834ac532964c96b301480a9aa/login.png)<br/>
### 습관페이지
![traking](/uploads/29735e5b9315364f427333a79f57e30a/traking.png)<br/>
### 캘린더 / 커뮤니티
![etc](/uploads/cc183557cf56009e1788ccfb7e47cae0/etc.png)<br/>


## 5. 프로젝트 팀원 역할 분담
| 이름 | 담당 업무 |
| ------ | ------ |
| 양민정 | 팀장/프론트엔드 개발 |
| 전성혜 | 프론트엔드 개발 |
| 최유림 | 프론트엔드 개발/데이터 분석 |
| 김명지 | 백엔드 개발 |
| 김혜연| 백엔드 개발/데이터 분석 |

**멤버별 responsibility**

1. 팀장 

- 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
- 개발 단계: 팀원간의 일정 등 조율 + 프론트 개발
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정

2. 프론트엔드 

- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 데이터 수집, 와이어프레임 작성
- 개발 단계: 와이어프레임을 기반으로 구현, 데이터 처리 및 시각화 담당, UI 디자인 완성
- 수정 단계: 피드백 반영해서 프론트 디자인 수정

 3. 백엔드 & 데이터 담당  

- 기획 단계: 기획 데이터 분석을 통해 해결하고자 하는 문제를 정의
- 개발 단계: 웹 서버 사용자가 직접 백엔드에 저장할수 있는 기능 구현, 데이터 베이스 구축 및 API 활용, 데이터 분석 개념 총동원하기
- 수정 단계: 코치님 피드백 반영해서 분석 / 시각화 방식 수정<br/>

## 6. 버전
  - 0.0.1


