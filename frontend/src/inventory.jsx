import React from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';

import { GeneralTable } from './generalTable.jsx';
import { SearchBar } from './searchBar.jsx'

//Main Inventory Page for the Website

export class Inventory extends React.Component {
  state = {
    names: [],
    itemType: "",
    searchText: ""
  };

  constructor(props) {
    super(props);
    { this.getInventory() }
    { this.restock() }
    this.state = {
      values: [],
      restock: []
    };
  }
  getInventory() {
    axios.get('http://localhost:8000/inventory').then(
      res => {
        const values = res.data;
        console.log(values.data);
        this.setState({ values: values.data })
      });
  }

  getType() {
    axios.get('http://localhost:8000/category', {
      params: {
        itemType: this.state.itemType
      }
    }
    ).then(
      res => {
        const values = res.data;
        console.log(values.data);
        this.setState({ values: values.data })
      });
  }

  onSearch() {
    axios.get('http://localhost:8000/search', {
      params: {
        search: this.state.searchText
      }
    }
    ).then(
      res => {
        const values = res.data;
        console.log(values.data);
        this.setState({ values: values.data })
      });
  }
  familySafe() {
    axios.get('http://localhost:8000/familySafe', {
      params: {
        search: this.state.searchText
      }
    }
    ).then(
      res => {
        const values = res.data;
        console.log(values.data);
        this.setState({ values: values.data })
      });
  }

  package() {
    axios.get('http://localhost:8000/package', {
      params: {
        search: this.state.searchText
      }
    }
    ).then(
      res => {
        const values = res.data;
        console.log(values.data);
        this.setState({ values: values.data })
      });
  }
  priceasc() {
    axios.get('http://localhost:8000/priceasc', {
      params: {
        search: this.state.searchText
      }
    }
    ).then(
      res => {
        const values = res.data;
        console.log(values.data);
        this.setState({ values: values.data })
      });
  }
  pricedesc() {
    axios.get('http://localhost:8000/pricedesc', {
      params: {
        search: this.state.searchText
      }
    }
    ).then(
      res => {
        const values = res.data;
        console.log(values.data);
        this.setState({ values: values.data })
      });
  }
  restock() {
    axios.get('http://localhost:8000/restock', {
      params: {
        search: this.state.searchText
      }
    }
    ).then(
      res => {
        const restock = res.data;
        console.log(restock.data);
        this.setState({ restock: restock.data })
      });
  }

  render() {
    return (
      <>
        <h1 id="header">Inventory</h1>
        <div>
          <p>You need to restock the following items:</p>
          <ul>
            <GeneralTable
              items={this.state.restock}
              tableClass="table table-bordered table-hover table-sm"
              emptyMessage="No items to restock"
              emptyClass="alert alert-primary"
              showRowHeader={true}
            />
          </ul>
        </div>

        <div className="container">
          <Link to='/warehouseProfile' className="btn btn-primary">Warehouse Profile</Link>
          <Link to='/login' className="btn btn-primary">Logout</Link>
          <Link to='/orders' className="btn btn-primary">Orders</Link>
          <Link to='/itemDetails' className="btn btn-primary">Add Item to Warehouse</Link>
          <Link to='/update' className="btn btn-primary">Update Item</Link>
        </div>

        <form class="4">
          <label for="textInput">Search</label>
          <div className="row">
            <div className="form-group col-9">
              <input type="text"
                className="form-control"
                id="textInput"
                placeholder="Item name or keyword"
                value={this.state.searchText}
                onChange={e => this.setState({ searchText: e.target.value })}
              ></input>
            </div>
            <button type="button"
              className="btn btn-primary col-3"
              onClick={() => this.onSearch()}>Search</button>
          </div>

          <div>Filter</div>
          <div className="container row">
            <button type="button" className="btn btn-primary col" onClick={() => this.familySafe()}>Family Safe</button>
            <button type="button" className="btn btn-primary col" onClick={() => this.package()}>Packageable</button>
            <button type="button" className="btn btn-primary col" onClick={() => this.priceasc()}>Price: Low to High</button>
            <button type="button" className="btn btn-primary col" onClick={() => this.pricedesc()}>Price: High to Low</button>
            <button type="button" className="btn btn-primary col" onClick={() => this.getInventory()}>Full Inventory</button>
            <select
              id="itemType"
              name="itemType"
              className="form-control col"
              value={this.state.itemType}
              onChange={e => this.setState({ itemType: e.target.value })}>
              <option value="Unspecified"></option>
              <option value="Living">Living</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Dining">Dining</option>
              <option value="Office">Office</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Storage">Storage</option>
              <option value="COVID">COVID</option>
            </select>
            <button type="button" className="btn btn-primary col" onClick={() => this.getType()}>Apply Tag</button>
          </div>
        </form>

        <ul>
          <GeneralTable
            items={this.state.values}
            tableClass="table table-bordered table-hover table-sm"
            emptyMessage=""
            emptyClass="alert alert-primary"
            showRowHeader={true}
          />
        </ul>
      </>
    );
  }
}
