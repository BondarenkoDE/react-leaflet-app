import React from 'react';

import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginBottom: '20px',
      width: '100%',
    },
  },
}));

export default function Menu({ calculate }) {
  const classes = useStyles();

  return (
    <div className="wrapper">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          label="Скорость ветра"
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: <InputAdornment position="end">м/с</InputAdornment>,
          }}
          variant="outlined"
        />
        <TextField
          label="Направление ветра"
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: <InputAdornment position="end">градусов</InputAdornment>,
          }}
          variant="outlined"
        />
      </form>

      <div className="flex">
        <Box textAlign="left">Зона по ПДКсс:</Box>
        <FormControlLabel control={<Checkbox color="primary" />} label="Secondary" />
        <FormControlLabel control={<Checkbox color="primary" />} label="Secondary" />
        <Box textAlign="left" marginTop="20px">
          Зона по ПДКмр:
        </Box>
        <FormControlLabel control={<Checkbox color="primary" />} label="Secondary" />
        <FormControlLabel control={<Checkbox color="primary" />} label="Secondary" />
      </div>

      <div className="btns">
        <Button onClick={calculate} variant="contained" color="primary">
          Применить
        </Button>
        <Button variant="contained">Сбросить</Button>
      </div>
    </div>
  );
}
