import { createSignal, Show } from "solid-js";
import styles from "./App.module.css";

interface IHero {
  id: string;
  name: string;
}

export const Hero = (props) => {
  const [editing, setEditing] = createSignal(false);
  const [name, setName] = createSignal(props.hero.name);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setEditing(false);
    props.onUpdate(props.hero.id, name());
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
        <form action="/" onSubmit={handleSubmit}>
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
