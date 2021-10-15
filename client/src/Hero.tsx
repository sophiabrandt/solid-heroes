import { createSignal, Show } from "solid-js";
import styles from "./App.module.css";

interface Hero {
  id: number;
  name: string;
}

export const Hero = (props) => {
  const [editing, setEditing] = createSignal(false);
  const [name, setName] = createSignal(props.hero.name);

  const handleSubmit = (heroId, evt) => {
    evt.preventDefault();
    setEditing(false);
  };

  return (
    <li class={styles.hero}>
      <Show
        when={editing()}
        fallback={
          <>
            <span class={styles.hero_id}>{props.hero.id}</span> {name()}
            <div>
              <button
                class={styles.hero_button}
                onClick={() => setEditing(true)}
              >
                🖉
              </button>
              <button class={styles.hero_delete}>🗶</button>
            </div>
          </>
        }
      >
        <form action="/" onSubmit={[handleSubmit, props.hero.id]}>
          <label for="hero-name">Hero Name</label>
          <input
            id="hero-name"
            value={name()}
            type="text"
            onInput={(evt) => setName(evt.target.value)}
          />
        </form>
      </Show>
    </li>
  );
};
