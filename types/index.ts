// Skill / Technologies
export interface Skill {
  skillName: string;
  src: string;
  link: string;
}

export interface TechnologiesAndSkills {
  proficient: Skill[];
  familiar: Skill[];
  interestedIn: Skill[];
}

// Work Experience
export interface WorkExperienceItem {
  image: string;
  header: string;
  meta: string;
  extra: string;
  bullets: string[];
}

// Site Content
export interface Content {
  technoligiesAndSkills: TechnologiesAndSkills;
  workExperience: WorkExperienceItem[];
}

// Client-side constants
export interface ClientConstants {
  routes: {
    aboutMe: string;
    resume: string;
    technicalSkills: string;
    workExperience: string;
  };
  menuItems: {
    aboutMe: string;
    resume: string;
    technicalSkills: string;
    workExperience: string;
  };
  shiftMaxWidth: number;
}

// Context
export interface ContentContextValue {
  content: Content;
}
