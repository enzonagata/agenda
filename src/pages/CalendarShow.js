import React, { Component, Fragment, useState } from 'react';
//Config
import { firebaseRDB } from '../config/firebase';

//Material UI
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
//Date picker
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { connect } from 'react-redux'

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/pt-br';
import axios from 'axios';

moment.locale('pt-BR');
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer


class CalendarShow extends Component {

  constructor(props) {
    super(props);
    this.interval = null
    this.state = {
      events: [],
      counter: 0,
      open: false,
      documentData: [],
      initialDate: new Date(),
      finalDate: new Date(),
    }
  }

  componentDidMount() {
    //console.log(this.props.state.session)
    let { session } = this.props.state;
    //console.log(session);
    document.title = "Calendário";
    let query = firebaseRDB.collection('schedule').where('created_by', '==', session.user.email);
    let observer = query.onSnapshot(querySnapshot => {
      var beforeList = [];
      //console.log(`Received query snapshot of size ${querySnapshot.size}`);
      //console.log(querySnapshot.docs)
      querySnapshot.docs.map(item => {
        let doc = item.data();
        let dataEvent = {};
        //console.log(item.id)
        dataEvent['id'] = item.id;
        dataEvent['title'] = doc.title;
        dataEvent['start'] = new Date(doc.start_date.replace(/-/g, "/"));
        dataEvent['end'] = new Date(doc.end_date.replace(/-/g, "/"));
        dataEvent['allDay'] = false;
        dataEvent['resource'] = doc.description;
        beforeList.push(dataEvent);
      });
      this.setState({ events: beforeList })
    }, err => {
      //console.log(`Encountered error: ${err}`);
    });
  }


  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    console.log(start)
    console.log(end)
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }

  handleClickOpen = ({ start, end }) => {
    console.log(start)
    console.log(end)
    this.setState({ open: true })
    this.setState({ initialDate: start })
    this.setState({ finalDate: end })
  };

  handleClose = () => {
    this.setState({ open: false })
  };

  render() {
    let { open } = this.state;
    return (
      <Box component="span" m={1}>
        <BigCalendar
          selectable
          localizer={localizer}
          events={this.state.events}
          startAccessor="start"
          endAccessor="end"
          culture="pt-BR"
          onSelectSlot={this.handleClickOpen}
          onSelectEvent={event => console.log(event)}
        />
        <Dialog open={open} fullWidth={true}
          maxWidth="sm" onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Novo Agendamento</DialogTitle>
          <DialogContent>
            <Grid container justify="space-around" spacing={5}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker ampm={false} label="Data Início" format="DD/MM/YYYY H:mm:ss" value={this.state.initialDate} onChange={e => this.setState({ initialDate: e.format() })} />
                <DateTimePicker ampm={false} label="Data Final" format="DD/MM/YYYY H:mm:ss" value={this.state.finalDate} onChange={e => this.setState({ finalDate: e.format() })} />
              </MuiPickersUtilsProvider>
              <Grid item xs={6}>
                <TextField margin="normal"
                  required
                  autoComplete="email"
                  fullWidth id="standard-basic" label="E-mail:" name='email' value={this.state.email} onChange={e => this.setState({ [e.target.name]: e.target.value })} disable={this.state.disable} />
              </Grid>
              <Grid item xs={6}>
                <TextField margin="normal"
                  required
                  fullWidth id="standard-basic" label="Tipo:" name='tipo' value={this.state.email} onChange={e => this.setState({ [e.target.name]: e.target.value })} disable={this.state.disable} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="Descrição"
                  multiline
                  rows="4"
                  variant="outlined"
                  name="description"
                  value={this.state.description} onChange={e => this.setState({ [e.target.name]: e.target.value })}
                />
              </Grid>

              <TextField margin="normal"
                required
                autoComplete="email"
                fullWidth id="standard-basic" label="E-mail:" name='email' value={this.state.email} onChange={e => this.setState({ [e.target.name]: e.target.value })} disable={this.state.disable} />
              <TextField margin="normal"
                required
                autoComplete="email"
                fullWidth id="standard-basic" label="E-mail:" name='email' value={this.state.email} onChange={e => this.setState({ [e.target.name]: e.target.value })} disable={this.state.disable} />
              <TextField margin="normal"
                required
                autoComplete="email"
                fullWidth id="standard-basic" label="E-mail:" name='email' value={this.state.email} onChange={e => this.setState({ [e.target.name]: e.target.value })} disable={this.state.disable} />
              <TextField margin="normal"
                required
                autoComplete="email"
                fullWidth id="standard-basic" label="E-mail:" name='email' value={this.state.email} onChange={e => this.setState({ [e.target.name]: e.target.value })} disable={this.state.disable} />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state
  }
}
// const mapDispatchToProps = dispatch => {
//   return {
//     userInfo: (data) => {
//       dispatch(userInfo(data))
//     },
//   }
// }

export default connect(mapStateToProps)(CalendarShow)
