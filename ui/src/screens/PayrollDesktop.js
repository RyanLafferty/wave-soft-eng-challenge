import React from 'react';
import { bindActionCreators } from 'redux';  
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import FormData from 'form-data';


import * as PayrollActions from './../actions/PayrollActions'
import DesktopGrid from '../components/DesktopGrid';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});


class PayrollDesktop extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        errorResponse: '',
        errorModal: false,
      }

      this.handleClose = this.handleClose.bind(this);
      this.handleUpload = this.handleUpload.bind(this);
      this.props.actions.fetchPayrollData();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.uploadResponse !== this.props.uploadResponse) {
      if (this.props.uploadResponse.data.status === 'SUCCESS') {
        this.props.actions.fetchPayrollData();
      }
      else {
        this.setState({
          errorResponse: this.props.uploadResponse.data.status,
          errorModal: true,
        });
      }
    }
  }

  handleUpload(event) {
    let file = event.target.files[0];
    let data = new FormData();
    data.append('file', file);
    data.append('name', file.name);
          
    this.props.actions.uploadPayrollData(data);
  }

  handleClose = () => {
    this.setState({ errorModal: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.errorModal}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Failed To Upload File
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
              {this.state.errorResponse}
            </Typography>
          </div>
        </Modal>
        <div>
          <input
            accept=".csv"
            id="file-chooser"
            type="file"
            style={{ display: 'none' }}
            ref={(ref) => this.fileChooser = ref}
            onChange={this.handleUpload}
          />
          <Button
            variant="raised"
            color="primary"
            onClick={() => this.fileChooser.click() }
          >
            Upload
          </Button>
        </div>
        <br />
        <DesktopGrid />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {  
    return {
      payrollData: state.payrollData,
      fetching: state.fetching,
      uploadResponse: state.uploadResponse,
      responseTime: state.responseTime,
      ...ownProps
    }
  }
  
  function mapDispatchToProps(dispatch) {  
      return {
        actions: bindActionCreators(PayrollActions, dispatch)
      }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(PayrollDesktop));
