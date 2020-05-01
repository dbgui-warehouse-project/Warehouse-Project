import React from 'react';
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';

export class UpdateItem extends React.Component {

  state = {
    itemID: '',
    itemName: '',
    itemDescription: '',
    numInStock: '',
    price: '',
    availableToPackage: '',
    familySafe: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      values: []
    };
  }

  update = (e) => {
    axios.put('http://localhost:8000/inventory', {
      itemID: this.state.itemID,
      itemName: this.state.itemName,
      itemDescription: this.state.itemDescription,
      numInStock: this.state.numInStock,
      price: this.state.price,
      availableToPackage: this.state.availableToPackage,
      familySafe: this.state.familySafe
    }).then(
      res => {
        console.log(res);
      });
  }

  getItemDetails() {
    axios.get('http://localhost:8000/item', {
      params: {
        itemID: this.state.itemID
      }
    }
    ).then(
      res => {
        const values = res.data;
        console.log(values.data);
        if(values.data.length > 0)
        {
          this.setState({ values: values.data })
          this.setState({ itemName: values.data[0].itemName })
          this.setState({ itemDescription: values.data[0].itemDescription })
          this.setState({ numInStock: values.data[0].numInStock })
          this.setState({ price: values.data[0].price })
          this.setState({ familySafe: values.data[0].familySafe })
          this.setState({ availableToPackage: values.data[0].availableToPackage })
        }
      });
  }

  render() {
    return (
      <form className="container">
        <h3 className="container list-group-item bg-secondary text-white">Update Item - Input Item ID</h3>
        <div className="list-group-item">
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="itemID">Item ID</label>
              <input type="text"
                id="itemID"
                name="itemID"
                className="form-control"
                value={this.state.itemID}
                onChange={e => this.setState({ itemID: e.target.value })}
              />
            </div>
            <button type="button" className="btn btn-primary col" onClick={() => this.getItemDetails()}>Find Item</button>
          </div>
          <div className="form-group row">
            <label htmlFor="itemName">Item Name</label>
            <input type="text"
              id="itemName"
              name="itemName"
              className="form-control"
              value={this.state.itemName}
              onChange={e => this.setState({ itemName: e.target.value })} />
          </div>

          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="numInStock">Number in Stock</label>
              <input type="text"
                id="numInStock"
                name="numInStock"
                className="form-control"
                value={this.state.numInStock}
                onChange={e => this.setState({ numInStock: e.target.value })} />
            </div>

            <div className="form-group col">
              <label htmlFor="price">Price</label>
              <input type="text"
                id="price"
                name="price"
                className="form-control"
                value={this.state.price}
                onChange={e => this.setState({ price: e.target.value })} />
            </div>

            <div className="form-group col">
              <label htmlFor="state">Family Safe (yes/no)</label>
              <input type="text"
                id="familySafe"
                name="familySafe"
                className="form-control"
                value={this.state.familySafe}
                onChange={e => this.setState({ familySafe: e.target.value })} />
            </div>

            <div className="form-group col">
              <label htmlFor="availableToPackage">Package? (yes/no)</label>
              <input type="text"
                id="availableToPackage"
                name="availableToPackage"
                className="form-control"
                value={this.state.availableToPackage}
                onChange={e => this.setState({ availableToPackage: e.target.value })} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-12">
              <label htmlFor="itemDescription">Description</label>
              <textarea id="itemDescription"
                name="itemDescription"
                className="form-control"
                value={this.state.itemDescription}
                onChange={e => this.setState({ itemDescription: e.target.value })} />
            </div>
          </div>

          <div className="row">
            <button type="button" className="btn btn-primary col" onClick={() => this.update()}>Save</button>
            <Link to='/inventory' className="btn btn-primary col">Return</Link>
          </div>
        </div>
      </form>
    );
  }
}
