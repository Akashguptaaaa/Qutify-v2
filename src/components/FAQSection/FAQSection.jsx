import { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import styles from "./FAQSection.module.css";

function FAQSection() {
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    async function fetchFaq() {
      try {
        const response = await axios.get("https://qtify-backend.labs.crio.do/faq");
        setFaq(response.data?.data || []);
      } catch (error) {
        setFaq([]);
      }
    }

    fetchFaq();
  }, []);

  return (
    <section className={styles.section}>
      <h2>FAQs</h2>
      <div className={styles.list}>
        {faq.map((item) => (
          <Accordion key={item.id} className={styles.accordion}>
            <AccordionSummary expandIcon={<span className={styles.expand}>⌄</span>}>
              {item.question}
            </AccordionSummary>
            <AccordionDetails>{item.answer}</AccordionDetails>
          </Accordion>
        ))}
      </div>
    </section>
  );
}

export default FAQSection;
