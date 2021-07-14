import React, { Component } from "react"

class DynamicCitiesSelect extends Component {
  constructor() {
    super();
    this.onChangeCity = this.onChangeCity.bind(this);
  }

  onChangeCity(event) {
    console.log(event.target.value);
  }

  render() {
    let { contacts } = this.props;
    contacts = [{ "city": "City", "id": "0" }, ...contacts];
    return (
      <div>
        {contacts && contacts.length > 0 && (
          <select className="select header-main-item header-filter-city" onChange={this.onChangeCity} name="city">
            {contacts.map((contact) => {
              return <option key={contact.id}>{contact.city}</option>;
            })}
          </select>
        )}
      </div>
    );
  }
}

export default DynamicCitiesSelect;