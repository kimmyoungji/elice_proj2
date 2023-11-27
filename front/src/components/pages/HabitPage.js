import React, { useState } from 'react';
import { HabitForm, HabitListForm } from '../features/habit/HabitPageForm';

export default function HabitPage() {
  const [isEditing, setIsEditing] = useState(true);
  const userInfo = {
    userName : "거북잉",
    turtleLevel: 2
  }

  const habitList = {
    habit1: "배달 시 안쓰는 플라스틱 거절하기",
    habit2: "플라스틱 빨대 사용 줄이기",
    habit3: "무라벨 제품 구매하기",
    habit4: "음식 포장 시 다회용기 사용하기",
    habit5: "플라스틱 깨끗하게 씻어서 분리배출"
  }

  return (
    <>
      <HabitForm userInfo={userInfo} habitList={habitList} />
      {isEditing === true && <HabitListForm habitlist={habitList} />}
    </>
  );
}

