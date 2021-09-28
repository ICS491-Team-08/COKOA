import { Menu } from 'semantic-ui-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Left = ({ activeItem, handleItemClick }) => (
  <div className="left-nav-menu">
    <Menu vertical>
      {/* <Menu.Item>
          <Menu.Header>Home</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name="Virtual ID"
              active={activeItem === "Virtual ID"}
              onClick={handleItemClick}
              as={NavLink}
              exact
              to="/home"
            />
            <Menu.Item
              name="Usage"
              active={activeItem === "Usage"}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item> */}

      <Menu.Item>
        <Menu.Header>Health Status</Menu.Header>

        <Menu.Menu>
          <Menu.Item
            name="Daily Check Up"
            active={activeItem === 'Daily Check Up'}
            onClick={handleItemClick}
            as={NavLink}
            exact
            to="/dailyCheckUP"
          />
          {/* <Menu.Item
              name="History"
              active={activeItem === "History"}
              onClick={handleItemClick}
            /> */}
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>My Information</Menu.Header>

        <Menu.Menu>
          <Menu.Item
            name="Profile"
            active={activeItem === 'Profile'}
            onClick={handleItemClick}
            as={NavLink}
            exact
            to="/userprofile"
          />
          <Menu.Item
            name="Vaccine Record"
            active={activeItem === 'Vaccine'}
            onClick={handleItemClick}
            as={NavLink}
            exact
            to="/vaccinerecord"
          />
          {/* <Menu.Item
              name="Personal Record"
              active={activeItem === "Personal Record"}
              onClick={handleItemClick}
              as={NavLink}
              exact
              to="/edit/:_id"
            /> */}
        </Menu.Menu>
      </Menu.Item>

      {/* <Menu.Item>
          <Menu.Header>Support</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name="email"
              active={activeItem === "email"}
              onClick={handleItemClick}
            >
              E-mail Support
            </Menu.Item>

            <Menu.Item
              name="faq"
              active={activeItem === "faq"}
              onClick={handleItemClick}
            >
              FAQs
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item> */}
    </Menu>
  </div>
);

export default Left;
