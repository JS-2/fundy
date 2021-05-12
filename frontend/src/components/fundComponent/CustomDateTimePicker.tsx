import React, { useState } from "react";
import SnoozeIcon from "@material-ui/icons/Snooze";
import AlarmIcon from "@material-ui/icons/AddAlarm";
import { IconButton, InputAdornment } from "@material-ui/core";
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";

function CustomDateTimePicker(props: any) {
  const [clearedDate, handleClearedDateChange] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date("2019-01-01T18:54"));

  return (
    <>
      <KeyboardDateTimePicker
        value={selectedDate}
        onChange={handleDateChange}
        label="Keyboard with error handler"
        onError={console.log}
        minDate={new Date("2018-01-01T00:00")}
        format="yyyy/MM/dd hh:mm a"
      />
    </>
  );
}

export default CustomDateTimePicker;