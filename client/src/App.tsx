import type { Component } from "solid-js";
import { createResource, For } from "solid-js";
import { createClient } from "@urql/core";
import { Hero } from "./Hero";

import styles from "./App.module.css";

const client = createClient({
  url: "http://localhost:4000",
});

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

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <ul class={styles.heroes_list}>
          <For each={heroes()}>{(hero) => <Hero hero={hero} />}</For>
        </ul>
      </header>
    </div>
  );
};

export default App;
