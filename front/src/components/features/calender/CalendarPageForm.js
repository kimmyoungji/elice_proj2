import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import check from "../../../assets/imgs/check.png"
import { Col, Container, Row, Card, ListGroup } from 'react-bootstrap';
import './Calendar.css';
import axios from 'axios';


// fullfilledDate만 받아올 것 //
const CalendarForm = ( habitlist, checkdata ) => {
  const [habitList, setHabitList] = useState(habitlist.habitlist);
  // const checkData = [{date:'2023-10-12'}, {date:'2023-11-04'},
  //                   {date:'2023-11-06'}, {date:'2023-11-15'}];
  const [ checkData, setCheckData ] = useState(checkdata);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scroll, setScroll] = useState(false);

  // get api로 기본 정보 가져오기
  // 달마다 습관 완료한 날짜만 받아옴 -> fullfilledDate : date 배열
  useEffect(() => {
    axios({
        method: 'get',
        url: "http://"+ window.location.hostname +":5001/fulfilled_habits",
        params: {date: '2023-11'}, // 임의
        withCredentials: true,
        headers: {
        "Content-Type": "application/json",
        }
    })
    .then((res) => {
      // 백에 수정 요청함
        console.log(res.data.habitIds);
        const { habit_id } = res.data.habitIds;
        setCheckData();
    }).catch((error) => {
        // 추후 수정예정
        console.log(error)
    }).then(() => {
    });
  }, [checkData])

  const renderEventContent = (eventInfo) => {
    return (
        <img className="check-image" src={check} alt="check"
        onClick={() => handleCheckClick(eventInfo.event)}
        width="40%"
        style={{ display: 'block', margin: '0 auto' }}
        />
    )
  }

  const HabitListGroup = () => {
    return Object.keys(habitList).map((key) => (
          <ListGroup.Item key={key}>
            {habitList[key]}
          </ListGroup.Item>
    ))
  }

  // 체크한 이미지 클릭
  const handleCheckClick = (event) => {
    const startDate = event._instance.range.start
    const month = startDate.getMonth().toString().padStart(2, '0');;
    const date = startDate.getDate().toString().padStart(2, '0');;
    const clickFullDate = `${startDate.getFullYear()}-${month}-${date}`
    
    // api 요청으로 받은 데이터로 변경
    axios({
        method: 'get',
        url: "http://"+ window.location.hostname +":5001/fulfilled_habits",
        params: {date: clickFullDate},
        withCredentials: true,
        headers: {
        "Content-Type": "application/json",
        }
    })
    .then((res) => {
        // 백에 수정 요청함
        console.log(res.data.habitIds);
        // const { habit_id } = res.data.habitIds;
        setHabitList(() => ({
          date: clickFullDate,
          habit1: "😊😊"
        }))
    }).catch((error) => {
        // 추후 수정예정
        console.log(error)
    }).then(() => {
    });

    
  };

  // 월 전환 버튼 클릭하다가 이번달에 오면, 오늘 날짜 기준의 습관 출력하도록
  // 🤔 setState로 변경하는 방식보다 더 효율적인 방법이 있을까?
  const handleDatesSet = (e) => {
    const startDate = new Date(e.startStr);
    const endDate = new Date(e.endStr);
    const middleDate = new Date(startDate.getTime() 
                        + (endDate.getTime() - startDate.getTime()) / 2);
    const middleMonth = middleDate.getMonth() + 1;

    if (middleMonth === new Date().getMonth() + 1) {
        setHabitList(habitlist.habitlist)
    }
  };

  const MyHabitData = () => {
    return (
      <>
        <Card style={{ height: "200px" }}>
          <Card.Title>
            <h2>데이터 서비스</h2>
          </Card.Title>
        </Card>
      </>
    )
  }

  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
  }, []);


  // 추후 작업 - 데이터 서비스 부분
  // 한 번만 API 요청하도록
  useEffect(() => {
    const { offsetHeight } = document.documentElement;
    if (!scroll && window.innerHeight >= Math.floor(offsetHeight - scrollPosition)) {
      console.log('API 요청');
      setScroll(true);
    }
  }, [scroll, scrollPosition]);
  

  return (
    <>
      <Container className="calendar-container">
        <Col className='calendar-box'>
          <Row className='full-calendar'>
            <FullCalendar
                  defaultView="dayGridMonth" 
                  plugins={[ dayGridPlugin, interactionPlugin ]}
                  eventContent={renderEventContent}
                  titleFormat={(date) => {
                        return date.date.year +"년 "+(date.date.month +1)+"월" }}
                  eventBackgroundColor='transparent'
                  eventBorderColor='transparent'
                  events={checkData}
                  dateClick={(info) => {
                    setHabitList(() => ({
                      date: info.dateStr,
                      habit1: "달성한 습관이 없습니다😭"
                    }))
                  }}
                  datesSet={(e) => handleDatesSet(e)}
                  height="550px"
                />
                  
          </Row>
          <Card className="calendar-text" style={{ width: '30rem', height: "300px" }}>
            <ListGroup variant="flush">
              <HabitListGroup/>
            </ListGroup>
          </Card>
        </Col>
      </Container>
      <Container
        className='text-center'
        style={{ marginTop: '30px'}}>
        <h3>지난 주 *회 달성 ! 0회 남았어요😊</h3>

        <h6 style={{ color: "grey", marginTop: '30px', marginBottom: '50px' }}>
            ▼ 아래로 내려서 나만의 Data를 확인해보세요
        </h6><br />
        {scroll && <MyHabitData/>}
    </Container>
    </>
  );
}

// 데이터 서비스 진행하면, 컴포넌트로 따로 뺄 것.

export default CalendarForm;