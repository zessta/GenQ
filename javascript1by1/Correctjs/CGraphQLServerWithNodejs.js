const { ApolloServer, gql } = require('apollo-server');

// Sample data
let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
];

// GraphQL schema
const typeDefs = gql`
    type User {
        id: ID!
        name: String!
    }

    type Query {
        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        addUser(name: String!): User
        updateUser(id: ID!, name: String!): User
    }
`;

// GraphQL resolvers
const resolvers = {
    Query: {
        users: () => users,
        user: (_, { id }) => users.find(user => user.id === parseInt(id)),
    },
    Mutation: {
        addUser: (_, { name }) => {
            const newUser = { id: users.length + 1, name };
            users.push(newUser);
            return newUser;
        },
        updateUser: (_, { id, name }) => {
            const user = users.find(user => user.id === parseInt(id));
            if (user) {
                user.name = name;
                return user;
            }
            return null;
        },
    },
};

// Creating the GraphQL server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});

// Usage example
// Query: { users { id, name } }
// Mutation: mutation { addUser(name: "Charlie") { id, name } }
