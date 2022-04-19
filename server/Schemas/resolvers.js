//imports
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");

const resolvers = {
  Query: {
    // find one user by id
    me: async (parent, args, context) => {
      if (context.user) {
        const uData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return uData;
      }
      // validation error handle
      throw new AuthenticationError("Must be logged in!");
    },
  },
  Mutation: {
    login: async () => {},
    addUser: async () => {},
    saveBook: async () => {},
    removeBook: async () => {},
  },
};
