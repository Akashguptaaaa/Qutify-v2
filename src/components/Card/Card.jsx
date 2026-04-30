import Chip from "@mui/material/Chip";
import styles from "./Card.module.css";

function Card({ image, title, count = 0, countLabel = "Follows", className = "" }) {
  return (
    <article className={`${styles.card} ${className}`.trim()}>
      <div className={styles.imageWrap}>
        <img src={image} alt={title} className={styles.image} />
        <Chip label={`${count} ${countLabel}`} size="small" className={styles.chip} />
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
      </div>
    </article>
  );
}

export default Card;
