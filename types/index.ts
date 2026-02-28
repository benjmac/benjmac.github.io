// ---------------------------------------------------------------------------
// Chat Proxy API
// ---------------------------------------------------------------------------

/** Shape of a single message sent to the proxy worker. */
export interface ChatProxyMessage {
  role: 'user' | 'assistant';
  content: string;
}

/** Top-level request body sent to the proxy worker. */
export interface ChatProxyRequestBody {
  messages: ChatProxyMessage[];
}

/** Callbacks held while a Turnstile challenge promise is in-flight. */
export interface PendingTurnstileChallenge {
  // eslint-disable-next-line no-unused-vars
  resolve: (token: string) => void;
  // eslint-disable-next-line no-unused-vars
  reject: (err: unknown) => void;
}

/** A text block returned in the worker response. */
export interface ChatProxyTextBlock {
  type: 'text';
  text: string;
}

/**
 * Represents any non-text content block (tool use, etc.).
 * Typed as a discriminated union so exhaustive checks remain possible later.
 */
export interface ChatProxyOtherBlock {
  type: Exclude<string, 'text'>;
  [key: string]: unknown;
}

export type ChatProxyContentBlock = ChatProxyTextBlock | ChatProxyOtherBlock;

/** Successful response from the worker's POST /  endpoint. */
export interface ChatProxySuccessResponse {
  role: 'assistant';
  content: ChatProxyContentBlock[];
  stop_reason: string;
}

/** Error response body returned with 4xx / 5xx status codes. */
export interface ChatProxyErrorResponse {
  error: string;
}

// ---------------------------------------------------------------------------
// Skill / Technologies
// ---------------------------------------------------------------------------

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
