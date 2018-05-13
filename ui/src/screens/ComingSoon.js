import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({});


class ComingSoon extends React.Component {
  render() {
    return (
      <div>
        <Typography>Coming Soon</Typography>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ComingSoon);
