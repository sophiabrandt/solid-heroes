import { GraphQLServer, PubSub } from "graphql-yoga";

const HEROES_CHANNEL = "HEROES_CHANNEL";

const pubsub = new PubSub();

interface IHero {
  id: string;
  name: string;
}

let heroes: IHero[] = [
  { id: "1", name: "Dr Nice" },
  { id: "2", name: "Narco" },
  { id: "3", name: "Bombasto" },
  { id: "4", name: "Celeritas" },
  { id: "5", name: "Magneta" },
  { id: "6", name: "RubberMan" },
  { id: "7", name: "Dynama" },
  { id: "8", name: "Dr IQ" },
  { id: "9", name: "Magma" },
  { id: "10", name: "Tornado" },
];

const typeDefs = `
	type Hero {
		id: ID!
		name: String!
	}
	type Query {
		getHeroes: [Hero]!
	}
	type Mutation {
		updateHero(id: ID!, name: String!): Hero
	}
	type Subscription {
		heroes: [Hero]!
	}
`;

const resolvers = {
  Query: {
    getHeroes: () => {
      return heroes;
    },
  },
  Mutation: {
    updateHero: (
      _: unknown,
      { id, name }: { id: string; name: string },
      { pubsub }: { pubsub: PubSub }
    ) => {
      const hero = heroes.find((hero) => hero.id === id);
      if (!hero) {
        throw new Error("Hero not found");
      }
      hero.name = name;
      pubsub.publish(HEROES_CHANNEL, { heroes });
      return hero;
    },
  },
  Subscription: {
    heroes: {
      subscribe: () => {
        const iterator = pubsub.asyncIterator(HEROES_CHANNEL);
        pubsub.publish(HEROES_CHANNEL, { heroes });
        return iterator;
      },
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { pubsub },
});

server.start(() => console.log("🚀 Server is running on localhost:4000!"));
