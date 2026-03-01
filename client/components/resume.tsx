import React from 'react';

import '../styles/resume.scss';

/**
 * RESUME CONTAINER COMPONENT
 */
export const Resume = () => {
  return (
    <div className="resume-container">
      <div className="resume">
        <embed
          src="BenjaminMcCainResume.pdf"
          type="application/pdf"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

export default Resume;
