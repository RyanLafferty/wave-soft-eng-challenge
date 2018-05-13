import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { filterBy, orderBy } from '@progress/kendo-data-query';

import '../../node_modules/@progress/kendo-theme-default/dist/all.css';

const styles = theme => ({});


class DesktopGrid extends Component {
  constructor(props) {
      super(props);

      const payrollData = this.getPayrollData([], [
        {
          dir: 'asc',
          field: 'eid',
        },
        {
          dir: 'asc',
          field: 'start_date',
        },
      ], null, null);

      /* payrollData.map(payment => Object.assign(payment, {
        start_date: new Date(payment.start_date),
        end_date: new Date(payment.end_date),
      })); */

      this.state = {
        data: payrollData.slice(0, 25),
        filter: [],
        sort: [],
        skip: 0,
        pageSize: 25,
      };

      this.filterChange = this.filterChange.bind(this);
      this.sortChange = this.sortChange.bind(this);
      this.pageChange = this.pageChange.bind(this);
  }

  componentDidUpdate(nextProps) {
    if (nextProps.payrollData !== this.props.payrollData) {
      console.log('Component Updated', nextProps.payrollData);
      
      const payrollData = this.getPayrollData([], [
        {
          dir: 'asc',
          field: 'eid',
        },
        {
          dir: 'asc',
          field: 'start_date',
        }
      ], null, null);

      /* payrollData.map(payment => Object.assign(payment, {
        start_date: new Date(payment.start_date),
        end_date: new Date(payment.end_date),
      })); */

      this.setState({
        data: payrollData,
        filter: [],
        sort: [],
        skip: 0,
        pageSize: 25,
      });
    }
  }

  getPayrollData(filter, sort, skip, take) {
    let data = this.props.payrollData.data ? this.props.payrollData.data.results : [];

    if (typeof (skip) !== 'undefined' && typeof (take) !== 'undefined' && skip !== null && take !== null) {
      data = data.slice(skip, skip + take);
    }

    data = filterBy(data, filter);
    data = orderBy(data, sort);

    return data;
  }

  filterChange = (event) => {
    this.setState({
      data: this.getPayrollData(event.filter, this.state.sort, this.state.skip, this.state.pageSize),
      filter: event.filter,
    });
  }

  sortChange = (event) => {
    this.setState({
      data: this.getPayrollData(this.state.filter, event.sort, this.state.skip, this.state.pageSize),
      sort: event.sort,
    });
  }

  pageChange(event) {
      console.log(event.page);
    this.setState({
      data: this.getPayrollData(this.state.filter, this.state.sort, event.page.skip, event.page.take),
      skip: event.page.skip,
      pageSize: event.page.take,
    });
  }

  render() {
    return (
      <div>
        <Grid
          style={{ maxHeight: '1000px' }}
          data={this.state.data}
            scrollable="scrollable"
            resizable
            
            filterable
            sortable={{
              allowUnsort: true,
              mode: 'multiple',
            }}
            pageable={{
              buttonCount: 5,
              info: true,
              type: 'numeric',
              pageSizes: [10, 25, 50, 100],
              previousNext: true,
            }}
            
            filter={this.state.filter}
            sort={this.state.sort}
            total={this.state.data.length}
            skip={this.state.skip}
            pageSize={this.state.pageSize}

            filterChange={this.filterChange}
            sortChange={this.sortChange}
            pageChange={this.pageChange}
        >
          <GridColumn field="eid" title="Employee ID" filter="numeric" />
          <GridColumn field="start_date" title="Pay Period Start" filterable={false} />
          <GridColumn field="end_date" title="Pay Period End" filterable={false} />
          <GridColumn field="amount" title="Amount Paid" filter="numeric" />
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {  
  return {
    payrollData: state.payrollData,
    fetching: state.fetching,
    ...ownProps
  }
}
  
  
export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(DesktopGrid));
