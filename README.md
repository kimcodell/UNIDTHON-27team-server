# UNIDTHON 해커톤 27팀 백엔드

## 스택
Node.js (Express.js), MySQL, Sequelize

## 소개
제1회 유니드톤 해커톤에 참여한 27팀의 백엔드

회사 견학 플랫폼 개발

회사 데이터 제공, 견학 데이터 제공, 예약 요청 API 개발

## API DOCS
### GET  /company/list
기능: 전체 회사 리스트 데이터 요청  

<포함 데이터>

company_id(회사 고유 ID) : integer

name(회사명): string

explanation(회사 소개): string

logo_url(로고 이미지 링크): string

has_visit(가능한 견학 유무): boolean

<예시>
```
[{
  company_id: 1,
  name: 'Naver',
  explanation: '포털 회사입니다.',
  logo_url: 'https://image.com/image1',
  has_visit: true
}, {
  company_id: 2,
  name: '카카오',
  explanation: '포털 회사입니다.',
  logo_url: 'https://image.com/image2',
  has_visit: true
}, {
  company_id: 3,
  name: '크래프톤',
  explanation: '게임 회사입니다.',
  logo_url: 'https://image.com/image3',
  has_visit: false
}]
```
---

### GET /company/:id/:user_id
기능: 특정 회사의 상세 정보 요청

(:id 위치에 회사 고유 ID, :user_id 위치에 유저 고유 ID 넣으면 됨.)

<포함 데이터>

company_id(회사 고유 ID): integer

name(회사명): string

explanation(회사 설명): string

website_url(회사 홈페이지 주소): string

logo_url(로고 이미지 주소): string

is_reservation(유저가 이미 예약했는지 여부): boolean

video_list(해당 회사의 비디오 데이터들): array

video_id(비디오 고유 ID): integer

thumbnails_image(섬네일 이미지 주소): string

video_url(영상 주소): string

visit(견학 데이터): object

visit_id(견학 고유 ID): integer,

start_at(견학일): string

detail(견학 상세정보): string,

capacity(참여 가능 인원 수): integer,

num_of_subscriber(지금까지 예약자 수): integer

<예시>
```
{
  company_id: 4,
  name: '크래프톤',
  explanation: '게임 개발하는 회사입니다.',
  website_url: 'krafton.com',
  logo_url: 'https://image.com/image2',
  is_reservation: false,
  video_list: [{
    video_id: 7,
    thumbnails_image: 'https://image.com/111111',
    video_url: 'https://youtube.com/1111',
  }, {
    video_id: 8,
    thumbnails_image: 'https://image.com/121212',
    video_url: 'https://youtube.com/2222',
  }],
  visit: {
  visit_id: 4,
  start_at: '2021-11-28 14:00:00',
  detail: '사내 탐방 및 회의 참여',
  capacity: 30,
  num_of_subscriber: 10,
}}
```
---

### GET /video/list
기능: 모든 영상 데이터 요청

<포함 데이터>

video_id(영상 고유 ID): integer,

thumbnails_image(섬네일 이미지 주소): 'https:image.com/5555',

video_url(영상 주소): 'https:youtube.com/5555'

<예시>
```
[{
  video_id: 1,
  thumbnails_image: 'https:image.com/5555',
  video_url: 'https:youtube.com/5555'
}, {
  video_id: 2,
  thumbnails_image: 'https:image.com/6666',
  video_url: 'https:youtube.com/6666'
}, {
  video_id: 3,
  thumbnails_image: 'https:image.com/7777',
  video_url: 'https:youtube.com/7777'
}]
```
---

### GET /reservation/list/:user_id
기능: 특정 유저의 예약 내역 정보 요청

(:user_id 위치에 유저 고유 ID 넣으면 됨.)

<포함 데이터>
visit_id(견학 고유 ID): integer

start_at(견학 일시): string

company_id(회사 고유 ID): integer

company_name(회사명): string

status(예약 상태): ENUM (reserved, cancelled, done)

<예시>
```
[{
  "visit_id": 1,
  "start_at": "2021-11-04T14:00:00.000Z",
  "company_id": 1,
  "company_name": "Naver",
  "status": "done"
}, {
  "visit_id": 2,
  "start_at": "2021-11-02T14:00:00.000Z",
  "company_id": 2,
  "company_name": "카카오",
  "status": "done"
}, {
  "visit_id": 3,
  "start_at": "2021-11-24T14:00:00.000Z",
  "company_id": 3,
  "company_name": "비바리퍼블리카",
  "status": "reserved"
}, {
  "visit_id": 4,
  "start_at": "2021-11-15T14:00:00.000Z",
  "company_id": 4,
  "company_name": "크래프톤",
  "status": "cancelled"
}]
```
---

### POST /reservation
기능: 예약 신청

(body에 visit_id와 user_id 데이터 넘겨줘야 함.)

visit_id와 user_id 안 넘긴 경우(에러) - "visit_id와 user_id를 입력해주세요."

정상적으로 예약된 경우 - "예약 완료"


## 실행 
로컬에 .env파일을 생성한 뒤 "DB_PASSWORD=비밀번호"를 추가해주세요.

mysql을 실행 /sql/init.sql 을 source 명령어로 실행시켜 데이터를 추가해주세요.

터미널에서 npm start로 서버를 실행시켜주세요.
