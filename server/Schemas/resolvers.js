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
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      const corrPass = await user.isCorrectPassword(password);
      // user validation
      if (!user || !corrPass) {
        throw new AuthenticationError("Incorrect user or password!");
      }

      // assignes token to user
      const token = signToken(user);
      return { user, token };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { user, token };
    },
    saveBook: async (parent, { addBook }, context) => {
      if (context.user) {
        const savedBook = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: { bookId } } },
          { new: true }
        );
        return savedBook;
      }
    },
    removeBook: async () => {},
  },
};
