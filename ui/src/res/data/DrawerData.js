import React from 'react';
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';


export const listItems = (
  <div>
    <Link to="/" style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
  </div>
);