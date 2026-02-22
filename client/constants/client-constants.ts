import {ClientConstants} from '../../types';

export const MAX_CHAT_INPUT_LENGTH = 500;

const constants: ClientConstants = {
  routes: {
    aboutMe: '/about',
    resume: '/resume',
    technicalSkills: '/technical-skills',
    workExperience: '/work-experience',
  },
  menuItems: {
    aboutMe: 'about-me',
    resume: 'resume',
    technicalSkills: 'technical-skills',
    workExperience: 'work-experience',
  },
  shiftMaxWidth: 660,
};

export default constants;
