import {
  createClient,
  defaultExchanges,
  subscriptionExchange,
} from "@urql/core";
import type { Component } from "solid-js";
import { createSignal, For } from "solid-js";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { pipe, subscribe } from "wonka";
import styles from "./App.module.css";
import { Hero, IHero } from "./Hero";

const subscriptionClient = new SubscriptionClient("ws://localhost:4000", {
  reconnect: true,
});

const client = createClient({
  url: "http://localhost:4000",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (op) => subscriptionClient.request(op) as any,
    }),
  ],
});

const App: Component = () => {
  const [heroes, setHeroes] = createSignal<IHero[]>([]);

  const { unsubscribe } = pipe(
    client.subscription(
      `
		subscription heroes {
  heroes {
    id
    name
  }
}
		`
    ),
    subscribe((result) => {
      setHeroes(result.data.heroes);
    })
  );

  const onUpdate = async (id: number, name: string) => {
    await client
      .mutation(
        `
mutation updateHero($id: ID!, $name: String!) {
  updateHero(id: $id, name: $name) {
    id
    name
  }
}
`,
        {
          id,
          name,
        }
      )
      .toPromise();
  };

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <ul class={styles.heroes_list}>
          <For each={heroes()}>
            {(hero) => <Hero hero={hero} onUpdate={onUpdate} />}
          </For>
        </ul>
      </header>
    </div>
  );
};

export default App;
