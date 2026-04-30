import styles from "./FeedbackModal.module.css";

function FeedbackModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Feedback</h3>
          <button type="button" onClick={onClose}>
            ×
          </button>
        </div>
        <form className={styles.form}>
          <input type="text" placeholder="Full name" />
          <input type="email" placeholder="Email ID" />
          <input type="text" placeholder="Subject" />
          <textarea rows={6} placeholder="Description" />
          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackModal;
