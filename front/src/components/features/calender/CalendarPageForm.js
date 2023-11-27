import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import check from "../../../assets/imgs/check.png"
import white from "../../../assets/imgs/white.png"
import { Col, Container, Row, Card, ListGroup } from 'react-bootstrap';
import './Calendar.css';

const CalendarForm = ( habitlist ) => {
  const [habitList, setHabitList] = useState(habitlist.habitlist);
  const eventData = [
    {title: 'event 1', date: "2023-10-12"},
    {title: 'event 2', date: "2023-11-04"},
    {title: 'event 1', date: "2023-11-12"},
    {title: 'event 2', date: "2023-11-14"},
    {title: 'event 3', date: "2023-11-21"}
  ]

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

  const handleCheckClick = (event) => {
    const startDate = event._instance.range.start
    const month = startDate.getMonth().toString();
    const date = startDate.getDate().toString();
    const clickMonth = (month.length <2 ? '0'+month : month);
    const clickDate = (date.length <2 ? '0'+date : date);
    const clickFullDate = `${startDate.getFullYear()}-${clickMonth}-${clickDate}`
    if (event.title === 'event 1') {
      setHabitList(() => ({
        date: clickFullDate,
        habit1: "배달 시 일회용품 안쓰기",
        habit2: "마트에서 비닐 안쓰기"
      }));
    } else if (event.title === 'event 2') {
      setHabitList(() => ({
        date: clickFullDate,
        habit1: "빨대 안쓰기"
      }));
    }
  };

  // today 버튼 클릭하면 오늘 날짜 기준의 습관 출력하도록
  // 🤔 setState로 변경하는 방식보다 더 효율적인 방법이 있을까?
  const handleDatesSet = (e) => {
    const startDate = new Date(e.startStr);
    const endDate = new Date(e.endStr);
    const middleDate = new Date(startDate.getTime() + (endDate.getTime() - startDate.getTime()) / 2);
    const middleMonth = middleDate.getMonth() + 1;

    if (middleMonth === new Date().getMonth() + 1) {
        setHabitList(habitlist.habitlist)
    }
  };

  return (
    <Container className="calendar-container">
      <Col className='calendar-box'>
        <Row className='full-calendar'>
          <FullCalendar
                  defaultView="dayGridMonth" 
                  plugins={[ dayGridPlugin ]}
                  eventContent={renderEventContent}
                  titleFormat={function(date) {
                        return date.date.year +"년 "+(date.date.month +1)+"월"; 
                        }}
                  eventBackgroundColor='transparent'
                  eventBorderColor='transparent'
                  events={eventData}
                  datesSet={(e) => handleDatesSet(e)}
                />
                
        </Row>
        <Card className="calendar-text" style={{ width: '30rem' }}>
          <ListGroup variant="flush">
            <HabitListGroup/>
          </ListGroup>
        </Card>
      </Col>
    </Container>
  );
}

export default CalendarForm;