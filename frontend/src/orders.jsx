import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { GeneralTable } from './generalTable.jsx';

export class Orders extends React.Component {
  //should start with values of what is currently in the table
  state = {
    orderID: ""
  };


  constructor(props) {
    super(props);
    { this.getOrders() }
    this.state = {
      values: [],
      details: [],
      customer: [],
      display: ""
    };
  }

  getOrders() {
    axios.get('http://localhost:8000/orders').then(
      res => {
        const values = res.data;
        console.log(values.data);
        this.setState({ values: values.data })
      });
  }

  getOrderDetails() {
    axios.get('http://localhost:8000/orderdetails', {
      params: {
        orderID: this.state.orderID
      }
    }
    ).then(
      res => {
        const details = res.data;
        console.log(details.data);
        if(details.data.length>0)
        {this.setState({ details: details.data })
        this.getCustomerDetails()
        }
      });
    this.setState({ display: "yes" })
  }

  getCustomerDetails() {
    axios.get('http://localhost:8000/customer', {
      params: {
        customerID: this.state.values[this.state.values.length-this.state.orderID].customerID
      }
    }
    ).then(
      res => {
        const customer = res.data;
        console.log(customer.data);
        this.setState({ customer: customer.data })
      });
  }
  render() {
    return (

      <form className="container">
        <h1 id="header">Orders</h1>

        <Link to='/inventory' className="btn btn-primary">Return</Link>

        <GeneralTable
          items={this.state.values}
          tableClass="table table-bordered table-hover table-sm"
          emptyMessage=""
          emptyClass="alert alert-primary"
          showRowHeader={true}
        />

        <label for="orderID">Order ID:</label>
        <div className="row">
          <div className="form-group col-9">
            <input type="text"
              id="orderID"
              name="orderID"
              className="form-control"
              value={this.state.orderID}
              onChange={e => this.setState({ orderID: e.target.value })}
            />
          </div>
          <button type="button" className="btn btn-primary col-3" onClick={() => this.getOrderDetails()}>View Details</button>
        </div>

        <GeneralTable
          items={this.state.customer}
          tableClass="table table-bordered table-hover table-sm"
          emptyMessage=""
          emptyClass="alert alert-primary"
          showRowHeader={false}
        />
        <GeneralTable
          items={this.state.details}
          tableClass="table table-bordered table-hover table-sm"
          emptyMessage=""
          emptyClass="alert alert-primary"
          showRowHeader={true}
        />
      </form>
    );
  }
}
