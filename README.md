# 🐢 TURTINE: 플라스택 사용을 줄이는 환경 습관 형성앱


  **TURTINE**은 turtle과 routine의 합성어로, 거북이처럼 느려도 환경을 위한 습관을 형성해 나가자는 뜻입니다.<br/>
  진화하는 거북이 캐릭터를 통한 재미 요소로 지속적인 참여를 유도, 환경 보호에 기여할 수 있도록 하는 프로젝트입니다.

 🚀  [**turtine 앱으로 바로가기**](http://ec2-3-36-68-102.ap-northeast-2.compute.amazonaws.com/)


## 프로젝트 구성 안내
### **목차**<br/>
[1. 프로젝트 소개](#1-프로젝트-소개)<br/>
[2. 프로젝트 사용도구 및 데이터](#2-프로젝트-사용도구-및-데이터)<br/>
[3. 프로젝트 기능 설명](#3-프로젝트-기능-설명)<br/>
[4. 프로젝트 팀원 역할 분담](#5-프로젝트-팀원-역할-분담)<br/>
[5. 버전](#6-버전)<br/>

<br/>

## 1. 프로젝트 소개
### 1) turtine이란? 
- 국내 플라스틱 사용량을 줄이기위한, 환경습관형성 앱
### 2) 해결하고자 하는 과제 및 목표
- 플라스틱 배출량을 줄이는 환경습관을 형성할 수 있도록 도와주는 서비스 구현하기
### 3) 프로젝트 차별점
- **캐릭터 활용**: 플라스틱에 고통받는 해양생물 중 바다거북을 메인 캐릭터로 채용하여 진입장벽 최소화 및 친근감 형성
- **챌린지 형식**: 최근 트렌드인  "GOD生"살기, 챌린지등의 컨텐츠와 접목하여 환경 보호도 갓생의 일부로 정착할 수 있도록 시도

<br/>

## 2. 프로젝트 사용도구 및 데이터
### 사용 도구 <br/>
 - 데이터분석: <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=Python&logoColor=white"/>
  
 - Front-end: <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>

 - Back-end: <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/> <img src="https://img.shields.io/badge/mysql-4479A1?style=flat-square&logo=mysql&logoColor=white"/>

### 사용 라이브러리
 - 데이터분석: <img src="https://img.shields.io/badge/pandas-150458?style=flat-square&logo=pandas&logoColor=white"/> <img src="https://img.shields.io/badge/matplotlib-0ABF53?style=flat-square&logo=multer&logoColor=white"/>

 - Front-end: <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=Bootstrap&logoColor=white"/> <img src="https://img.shields.io/badge/fullcalendar-7F2B7B?style=flat-square&logo=fullcalendar&logoColor=white"/>

 - Back-end: <img src="https://img.shields.io/badge/multer-FF9E0F?style=flat-square&logo=multer&logoColor=white"/> <img src="https://img.shields.io/badge/amazons3-569A31?style=flat-square&logo=amazons3&logoColor=white"/>
  
### 데이터셋
 세계 플라스틱 폐기물 발생량 순위 (한국 순위 초점), 국내 전체 폐기물 중, 플라스틱 폐기물 비중

<br/>

## 3. 프로젝트 기능 설명
### 주요 기능 (주된 활용성) 및 서브 기능
#### **1. 메인페이지**
- offset 기반 스크롤 애니메이션 설정
<img src="./demo_img/intro_page.gif" width="800px">

#### **2. 회원가입 & 로그인**
- 이메일, 닉네임 중복 확인
- 로컬로그인, JWT토큰을 cookie로 저장
<img src="./demo_img/login_page.gif" width="800px">

#### **3. 프로필**
- 회원 탈퇴 기능
- 닉네임 변경 가능 및 중복 확인
- multer-s3를 이용한 프로필 이미지 업로드, filereader api를 이용한 미리보기 구현
<img src="./demo_img/myinfo_page.gif" width="800px">

#### **4. 습관페이지**
- 상태관리를 통한 습관 create, update 및 read, checked 구현
- Query문으로 데이터 취합, 유저 등급 책정 및 캐릭터화
<img src="./demo_img/dailyHabit_page.gif" width="800px">

#### **5. 캘린더**
- FullCalendar 라이브러리 이용하여 습관 완료 일자 시각화
- Recharts 라이브러리 이용하여 주간 달성 현황 차트화
<img src="./demo_img/calender_page.gif" width="800px">

#### **6. 커뮤니티**
- 랜덤 유저의 등급을 캐릭터로 노출
<img src="./demo_img/community_page.gif" width="800px">

<br/>

## 4. 프로젝트 팀원 역할 분담
| 이름 | 담당 업무 | 상세 | 
| ------ | ------ | ---- | 
| 양민정 | 팀장/프론트엔드 개발 | 캐릭터디자인 / 개인정보페이지 구현 / 이미지업로드기능구현 / 커뮤니티페이지 구현 |
| 전성혜 | 프론트엔드 개발 | 로그인페이지구현 |
| 최유림 | 프론트엔드 개발/데이터 분석 | 습관선택페이지 구현 / 달성습관조회페이지 구현 |
| 김명지 | 백엔드 개발 | 로컬로그인 구현 / userMVP 구현 / planned_habits_MVP구현 / RDS생성및 연결 / 트랜젝션 추가 / 커뮤니티페이지 쿼리최적화 / VM배포 |
| 김혜연| 백엔드 개발/데이터 분석 | fulfilled_habits_MVP구현 / S3이미지업로드 기능 구현 |

## 5. 버전
  - 0.0.1


