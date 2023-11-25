import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import check from "../../assets/imgs/check.png"
import { Col, Container, Row, Card, ListGroup } from 'react-bootstrap';
import '../features/calender/Calender.css';

export default function CalendarPage() {
  const renderEventContent = (eventInfo) => {
    return (
      //<div>
          <img className="eventimage" src={eventInfo.event.url} alt="check" width="100%" height="100%"/>
      //</div>
    )
  }
  return (
    <Container className="calender-container">
      <Col className='calender-box'>
        <Row className='full-calendar'>
          <FullCalendar 
                  defaultView="dayGridMonth" 
                  plugins={[ dayGridPlugin ]}
                  eventContent={renderEventContent}
                  events={[
                    {title: 'event 1', date: "2023-11-12", url: "https://i.ibb.co/8zYwsR4/check.png"}
                  ]}
                />
        </Row>
        <Card className="calendar-text" style={{ width: '30rem' }}>
          <ListGroup variant="flush">
            <ListGroup.Item>텀블러 사용하기</ListGroup.Item>
            <ListGroup.Item>...</ListGroup.Item>
            <ListGroup.Item>...</ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Container>
    
  );
}

