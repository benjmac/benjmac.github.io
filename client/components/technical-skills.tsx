import React, {useContext} from 'react';

import {ContentContext} from '../state/content';
import {Skill} from '../../types';

import '../styles/technoligies.scss';

/**
 * SKILL IMAGE COMPONENT
 */
export const skillContent = (skill: Skill) => {
  return (
    <div key={skill.skillName} className="skill-container">
      <a href={skill.link} target="_blank" rel="noreferrer">
        <img className="ui small image skill-img" src={skill.src} />
      </a>
      <div className="skill-text">{skill.skillName}</div>
    </div>
  );
};

/**
 * SKILLS CONTAINER COMPONENT
 */
export const TechnicalSkills = () => {
  const contentValue = useContext(ContentContext);

  const {content} = contentValue;
  const {technoligiesAndSkills} = content;
  return (
    <div className="ui main text container">
      <div className="skills-container">
        <h2>Proficient</h2>
        <div className="skills-content-container">
          {technoligiesAndSkills.proficient.map(skillContent)}
        </div>
        <hr />
        <h2>Familiar</h2>
        <div className="skills-content-container">
          {technoligiesAndSkills.familiar.map(skillContent)}
        </div>
        <hr />
        <h2>Technologies interested in</h2>
        <div className="skills-content-container">
          {technoligiesAndSkills.interestedIn.map(skillContent)}
        </div>
      </div>
    </div>
  );
};

export default TechnicalSkills;
