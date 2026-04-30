import Chip from "@mui/material/Chip";
import styles from "./Card.module.css";

function Card({ image, follows, title }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={image} alt={title} className={styles.image} />
        <Chip label={`${follows} Follows`} size="small" className={styles.chip} />
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
      </div>
    </article>
  );
}

export default Card;
