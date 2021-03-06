import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from "@material-ui/core/TextField";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft:10,

  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },

  datepicker:{
    marginLeft:10,
    height: '50px',



  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));



const StudentsToolbar = props => {
  const { className, ...rest } = props;

  let date = new Date();



  const[selectedUser, setSelectedUser]=useState({value:''});
  const[selectedChart, setSelectedChart]=useState(0);
  const[selectedDate, setSelectedDate]=useState(new Date());

  const classes = useStyles();


  const up=[{id:"all",firstname:"**Tous**",lastname:""}];
  const usersOptions=up.concat(props.users);


  useEffect(()=>{
    setSelectedUser({value:usersOptions[0]})
  },[])

  const handleChangeChart = (event, v) => {
    setSelectedChart(v);

    props.changechart(v)
  };
  const handleDateChange=(event,v)=>{

    setSelectedDate(new Date(`${event.getMonth()+1}/${event.getDate()}/${event.getFullYear()}`));
    props.setDate(v);
  }
  return (
      <div
          {...rest}
          className={clsx(classes.root, className)}
      >
        <div className={classes.row}>
          <span className={classes.spacer} />
        </div>

        <div className={classes.row}>

          <Autocomplete
              id="students-list"
              onChange={(event, e) => {
                if(e) props.changestudent(e.id);
                setSelectedUser({value:e})

              }}
              options={usersOptions}
              getOptionLabel={(user) => user.firstname+" "+user.lastname}
              style={{ width: 300 }}
              value={selectedUser.value}
              getOptionSelected={(option, value) => option.id === value.id}
              renderInput={(params) => <TextField {...params} label="introduire un étudiant" variant="outlined" />}
          />
          <Paper className={classes.datepicker}>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                animateYearScrolling
                variant="inline"
                format="dd/MM/yyyy"
                id="date-picker-inline"
                label="Jusqu'au"
                value={selectedDate}
                onChange={handleDateChange}
                allowKeyboardControl
                autoOk
                KeyboardButtonProps = {{
                  'aria-label': 'change date',
                }}
            />
          </MuiPickersUtilsProvider>
          </Paper>

          <Paper className={classes.root}>
            <Tabs
                onChange={handleChangeChart}
                value={selectedChart}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
              {
                props.labelstabs.map(tab=>
                <Tab key={tab} label={tab}/>
                )
              }

            </Tabs>
          </Paper>
        </div>

      </div>
  );
};

StudentsToolbar.propTypes = {
  className: PropTypes.string
};

export default StudentsToolbar;
