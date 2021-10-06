import { Menu, Header } from 'semantic-ui-react';
import React from 'react';
// import { NavLink } from 'react-router-dom';

const Right = (activeItem) => (
  <div className="right-nav-menu">
    <Menu vertical>
      <Menu.Item
        name="promotions"
        active={activeItem === 'promotions'}
        onClick={this.handleItemClick}
      >
        <Header as="h4">CDC Guidance</Header>
        <p>Check out CDC Guidance webpage</p>
      </Menu.Item>

      <Menu.Item
        name="coupons"
        active={activeItem === 'coupons'}
        onClick={this.handleItemClick}
      >
        <Header as="h4">Hawaii Guidance</Header>
        <p>Check out Hawaii Guidance webpage</p>
      </Menu.Item>

      <Menu.Item
        name="rebates"
        active={activeItem === 'rebates'}
        onClick={this.handleItemClick}
      >
        <Header as="h4">Covid-19 Testing Center</Header>
        <p>Visit nearest Covid-19 Testing Center</p>
      </Menu.Item>
    </Menu>
  </div>
);

export default Right;
