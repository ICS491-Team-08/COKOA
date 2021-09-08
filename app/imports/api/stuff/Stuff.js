import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class StuffsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'StuffsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      dob: String,
      owner: String,
      gender: {
        type: String,
        allowedValues: ['Would rather not say', 'Male', 'Female', 'etc'],
        defaultValue: 'Would rather not say',
      },
      address: String,
      status: {
        type: String,
        allowedValues: ['Not Sure', 'Positive', 'Negative'],
        defaultValue: 'Negative',
      },
      vaccination: {
        type: String,
        allowedValues: ['Yes, I am fully vaccinated', 'No, I am not vaccinated', 'I only got 1st shot'],
        defaultValue: 'No, I am not vaccinated',
      },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {StuffsCollection}
 */
export const Stuffs = new StuffsCollection();
