import { useState } from "react";
import {Calendar as RNCalendar} from 'react-native-calendars'

export const Calendar = () => {
  const [selected, setSelected] = useState("");

  return (
    <>
      <RNCalendar
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "orange",
          },
        }}
      />
    </>
  );
};
