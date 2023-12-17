import { createContext, useState, useMemo } from "react";

export const HabitContext = createContext();
//   habit: [{
//       id: "habit1",
//       text: "장바구니(에코백) 사용하기",
//       select: false,
//       done: false
//   },
//   {
//       id: "habit2",
//       text: "음식 포장 시 다회용기 사용하기",
//       select: false,
//       done: false
//   },
//   {
//       id: "habit3",
//       text: "텀블러나 머그컵 사용하기",
//       select: false,
//       done: false
//   },
//   {
//       id: "habit4",
//       text: "플라스틱 빨대 안 쓰기",
//       select: false,
//       done: false
//   },
//   {
//       id: "habit5",
//       text: "플라스틱 세척해서 분리배출하기",
//       select: false,
//       done: false
//   },
//   {
//       id: "habit6",
//       text: "무라벨 제품 구매하기",
//       select: false,
//       done: false
//   }]
// });

export const HabitActionContext = createContext();

export const HabitProvider = ({ children }) => {
  const [ habit, setHabit ] = useState({
    habit: [{
        id: "habit1",
        text: "장바구니(에코백) 사용하기",
        select: false,
        done: false
    },
    {
        id: "habit2",
        text: "음식 포장 시 다회용기 사용하기",
        select: false,
        done: false
    },
    {
        id: "habit3",
        text: "텀블러나 머그컵 사용하기",
        select: false,
        done: false
    },
    {
        id: "habit4",
        text: "플라스틱 빨대 안 쓰기",
        select: false,
        done: false
    },
    {
        id: "habit5",
        text: "플라스틱 세척해서 분리배출하기",
        select: false,
        done: false
    },
    {
        id: "habit6",
        text: "무라벨 제품 구매하기",
        select: false,
        done: false
    }]
  });

  const actions = useMemo(
    () => ({
      select (id) {
        setHabit((prev) => {
          if (prev) {
          const updatedHabit = prev.habit.map((item) => 
              item.id === id
                ? {
                    ...item,
                    select: true
                  }
                : item
          );
          return { ...prev, habit: updatedHabit } // 이것 때문이었음 !!
      }})
      },
      fulfill(id) {
        setHabit((prev) => {
        if (prev) {
          const updatedHabit = prev.habit.map((item) =>
            item.id === id
              ? {
                  ...item,
                  done: true
                }
              : item
          );
          return { ...prev, habit: updatedHabit }
        }})
      }
    }), [])

  return (
    <HabitActionContext.Provider value={actions}>
      <HabitContext.Provider value={habit}>
        {children}
      </HabitContext.Provider>
    </HabitActionContext.Provider>
  );
};
