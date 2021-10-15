import styles from "./App.module.css";

interface Hero {
  id: number;
  name: string;
}

export const Hero = (props) => {
  return (
    <li>
      <span class={styles.hero_id}>{props.hero.id}</span> {props.hero.name}
    </li>
  );
};
