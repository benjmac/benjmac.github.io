import React, {useContext} from 'react';

import {Item, List} from 'semantic-ui-react';

import {ContentContext} from '../state/content';
import {WorkExperienceItem} from '../../types';

import '../styles/work-experience.scss';

/**
 * WORK EXPERIENCE ITEM COMPONENT
 */
export const workExperienceItemContent = (role: WorkExperienceItem) => {
  return (
    <Item key={`${role.header}-${role.meta}`}>
      <Item.Image size="tiny" src={role.image} />
      <Item.Content>
        <Item.Header>{role.header}</Item.Header>
        <Item.Meta>{role.meta}</Item.Meta>
        <Item.Extra>{role.extra}</Item.Extra>
        <Item.Description>
          <List as="ul">
            {role.bullets.map((bullet, index) => (
              <List.Item key={index} as="li">
                {bullet}
              </List.Item>
            ))}
          </List>
        </Item.Description>
      </Item.Content>
    </Item>
  );
};

/**
 * WORK EXPERIENCE COMPONENT
 */
export const WorkExperience = () => {
  const contentValue = useContext(ContentContext);

  const {content} = contentValue;
  const {workExperience} = content;

  return (
    <div className="ui main text container work-experience">
      <div className="header-container">
        <div className="header-content">
          <h2>Experience</h2>
        </div>
      </div>
      <Item.Group>{workExperience.map(workExperienceItemContent)}</Item.Group>
    </div>
  );
};

export default WorkExperience;
