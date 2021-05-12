import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300,
    },
  }),
);

export default function DatePickers() {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());


  return (
    <form className="input" noValidate>
      <TextField
        id="date"
        label="펀딩 마감 기한"
        type="date"
        defaultValue="2021-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />

    </form>
  );
}