import React, { memo } from 'react';
import styles from './Resume.module.css';

const Resume = memo(() => {
  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h2 className={styles.heading}>Resume / CV</h2>
        <a
          href="/Duarte_Fernandes_CV.pdf"
          download="Duarte_Fernandes_CV.pdf"
          className={styles.downloadButton}
          aria-label="Download CV as PDF"
        >
          📥 Download PDF
        </a>
      </div>
      <div className={styles.pdfContainer}>
        <iframe
          src="/Duarte_Fernandes_CV.pdf"
          title="Duarte Fernandes CV"
          className={styles.pdfFrame}
        />
      </div>
    </div>
  );
});

Resume.displayName = 'Resume';

export default Resume;
