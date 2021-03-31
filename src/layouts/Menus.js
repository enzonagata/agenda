import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

class Menus extends Component {
    render() {
        return (
            <List>
                <ListItem button component={Link} to="/calendario">
                    <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
                    <ListItemText primary='Calendario' />
                </ListItem>
                <ListItem button component={Link} to="/calendario/cadastro">
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Calendário Cadastrar' />
                </ListItem>
                <ListItem button component={Link} to="/evento/cadastrar">
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Cadastrar Eventos' />
                </ListItem>
            </List>
        );
    }
}
export default Menus;  