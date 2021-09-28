import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The VaccineCollection. It encapsulates state and variable values for stuff.
 */
class VaccineCollection {
  constructor() {
    // The name of this collection.
    this.name = 'VaccineCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema(
      {
        firstVaccineType: {
          type: String,
          allowedValues: ['Pfizer', 'Moderna', 'Janssen', 'ETC', 'No vaccine'],
        },
        firstVaccineLot: {
          type: Number,
          optional: true,
        },
        firstDate: {
          type: Date,
          optional: true,
        },
        firstSite: {
          type: 'String',
          optional: true,
        },
        secondVaccineType: {
          type: String,
          allowedValues: ['Pfizer', 'Moderna', 'Janssen', 'ETC', 'No vaccine'],
        },
        secondVaccineLot: {
          type: Number,
          optional: true,
        },
        secondDate: {
          type: 'String',
          optional: true,
        },
        secondSite: {
          type: 'String',
          optional: true,
        },
        vaccineCard: {
          type: 'String',
          defaultValue:
            'https://bloximages.chicago2.vip.townnews.com/greenevillesun.com/content/tncms/assets/v3/editorial/9/f5/9f58c8e7-41c2-58d7-99a8-90bddda28675/60cc8afe6a1e0.image.png',
        },
        owner: {
          type: 'String',
          optional: true,
        },
        imgType: {
          type: 'String',
          optional: true,
        },
      },
      { tracker: Tracker },
    );
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.vaccinePublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the UserCollection.
 * @type {UserCollection}
 */
export const Vaccine = new VaccineCollection();
