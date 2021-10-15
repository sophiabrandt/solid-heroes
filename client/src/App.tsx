import type { Component } from "solid-js";
import { createResource, createSignal, For } from "solid-js";
import { createClient } from "@urql/core";
import { Hero } from "./Hero";

import styles from "./App.module.css";

const client = createClient({
  url: "http://localhost:4000",
});

const App: Component = () => {
  const [heroes] = createResource(() =>
    client
      .query(
        `
	query allHeroes {
	  getHeroes {
		id
		name
	  }
	}
`
      )
      .toPromise()
      .then(({ data }) => data.getHeroes)
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
