import { GraphQLServer } from "graphql-yoga";

interface Hero {
  id: number;
  name: string;
}

let heroes: Hero[] = [
  { id: 11, name: "Dr Nice" },
  { id: 12, name: "Narco" },
  { id: 13, name: "Bombasto" },
  { id: 14, name: "Celeritas" },
  { id: 15, name: "Magneta" },
  { id: 16, name: "RubberMan" },
  { id: 17, name: "Dynama" },
  { id: 18, name: "Dr IQ" },
  { id: 19, name: "Magma" },
  { id: 20, name: "Tornado" },
];

const typeDefs = `
	type Hero {
		id: ID!
		name: String!
	}
	type Query {
		getHeroes: [Hero]!
	}
`;

const resolvers = {
  Query: {
    getHeroes: () => {
      return heroes;
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log("🚀 server is running on loccalhost:4000!"));
