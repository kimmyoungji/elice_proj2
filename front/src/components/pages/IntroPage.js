import React from 'react';

import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const IntroPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div>IntroPage입니다
            </div>
            <Button variant="secondary" type="submit" size="sm" onClick={() => navigate('/userpage')}>
                userpage로 이동
            </Button>
        </>
    )
}

export default IntroPage;