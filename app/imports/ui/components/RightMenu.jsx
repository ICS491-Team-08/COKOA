import { Menu, Header } from 'semantic-ui-react';
import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';

const Right = (activeItem) => (
  <div className="right-nav-menu">
    <Menu vertical>
      <Menu.Item
        name="promotions"
        active={activeItem === 'promotions'}
        onClick={this.handleItemClick}
      >
        <Header as="h4">CDC Guidance</Header>
        <a href="https://www.cdc.gov/coronavirus/2019-ncov/vaccines/keythingstoknow.html?s_cid=10496:cdc%20vaccine%20guidelines:sem.ga:p:RG:GM:gen:PTN:FY21">Check out CDC Guidance webpage</a>
      </Menu.Item>

      <Menu.Item
        name="coupons"
        active={activeItem === 'coupons'}
        onClick={this.handleItemClick}
      >
        <Header as="h4">Hawaii Guidance</Header>
        <a href="https://hawaiicovid19.com/">Check out Hawaii Guidance webpage</a>
      </Menu.Item>

      <Menu.Item
        name="rebates"
        active={activeItem === 'rebates'}
        onClick={this.handleItemClick}
      >
        <Header as="h4">Covid-19 Testing Center</Header>
        <a href="https://www.oneoahu.org/covid19-testing">Visit nearest Covid-19 Testing Center</a>
      </Menu.Item>
    </Menu>
  </div>
);

export default Right;
