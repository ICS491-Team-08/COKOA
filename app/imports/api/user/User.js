import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";

/**
 * The UserCollection. It encapsulates state and variable values for stuff.
 */
class UserCollection {
  constructor() {
    // The name of this collection.
    this.name = "UserCollection";
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema(
      {
        firstName: String,
        lastName: String,
        firstVaccineType: {
          type: String,
          allowedValues: ["Pfizer", "Moderna", "Janssen", "ETC", "No vaccine"],
        },
        firstVaccineLot: {
          type: Number,
          optional: true,
        },
        firstDate: {
          type: "String",
          optional: true,
        },
        firstSite: {
          type: "String",
          optional: true,
        },
        secondVaccineType: {
          type: String,
          allowedValues: ["Pfizer", "Moderna", "Janssen", "ETC", "No vaccine"],
        },
        secondVaccineLot: {
          type: Number,
          optional: true,
        },
        secondDate: {
          type: "String",
          optional: true,
        },
        secondSite: {
          type: "String",
          optional: true,
        },
        vaccineCard: String,
        owner: {
          type: "String",
          optional: true,
        },
      },
      { tracker: Tracker }
    );
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the UserCollection.
 * @type {UserCollection}
 */
export const User = new UserCollection();
