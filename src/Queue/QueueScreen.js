/**

1. Listed current customers within a queue.

2. Integrated and used the existing <Customer /> component to render the content.

3. Fetched and displayed customer profile images using the Gravatar Image request API.

4. Added a text input field to filter the list of customers.

5. Implemented an auto-refresh mechanism that updates the list of customers every 30 seconds.

6. Applied styling to ensure a neat and responsive layout.
 */
import React, { Component } from "react";
import { fetchQueueData } from "../mockApi";
import Customer from "./components/Customer";
import Input from "./components/Input";
import Content from "./components/Content";
import { formatExpectedTime } from "./Util/dateTime";
import { debounce } from "./Util/debounce";
import classes from "./queueScreens.module.css";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      filteredCustomers: [],
      searchInput: "",
    };
    this.refreshInterval = null;
  }

  componentDidMount() {
    this.fetchData();

    // Refresh customer data every 30 seconds
    this.refreshInterval = setInterval(() => {
      this.fetchData();
    }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  fetchData = async () => {
    try {
      const response = await fetchQueueData();
      const json = await response.json();
      const userData = json.queueData.queue.customersToday || [];
      this.setState({
        customers: userData,
        filteredCustomers: userData,
      });
    } catch (error) {
      console.log("Failed to fetch data:", error);
    }
  };

  updateInput = (value) => {
    this.setState({
      searchInput: value,
    });
    this.filterUser(value);
  };

  filterUser = debounce((value) => {
    let filteredInput = this.state.customers.filter((customer) => {
      let { name } = customer.customer;
      return name.toLowerCase().includes(value.toLowerCase());
    });
    this.setState({
      filteredCustomers: filteredInput,
    });
  }, 500);

  render() {
    const { searchInput, customers, filteredCustomers } = this.state;

    let userList =
      searchInput.trim().length > 0 ? filteredCustomers : customers;
    let users = userList.map((customer) => {
      const { expectedTime } = customer;
      const { name, emailAddress, id } = customer.customer;
      return (
        <Customer
          name={name}
          emailId={emailAddress}
          expectedDate={formatExpectedTime(expectedTime)}
          key={id}
        />
      );
    });

    return (
      <div className={classes.Container}>
        <div className={classes.SearchSection}>
          <Input
            value={searchInput}
            onChange={(event) => {
              this.updateInput(event.target.value);
            }}
            placeholder={"Search for name"}
            aria-label="Search user by name"
          />
        </div>
        <div
          className={classes.Wrapper}
          role={"user list"}
          aria-label="user list"
        >
          {userList.length > 0 ? (
            users
          ) : (
            <Content>No users found from the search query</Content>
          )}
        </div>
      </div>
    );
  }
}
