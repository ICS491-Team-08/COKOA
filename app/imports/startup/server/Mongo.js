import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { User } from '../../api/user/User';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// Initialize the database with a default data document.
function addName(name) {
  console.log(`  Adding: ${name.firstName} ${name.lastName} (${name.owner})`);
  User.collection.insert(name);
}

// Initialize the UserNamesCollection if empty.
if (User.collection.find().count() === 0) {
  if (Meteor.settings.defaultUsers) {
    console.log('Creating default names.');
    Meteor.settings.defaultUsers.map(data => addName(data));
  }
}
