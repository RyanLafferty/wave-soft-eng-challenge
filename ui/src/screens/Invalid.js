import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({});


class Invalid extends React.Component {
  render() {
    return (
      <div>
        <Typography>Invalid Path</Typography>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Invalid);
