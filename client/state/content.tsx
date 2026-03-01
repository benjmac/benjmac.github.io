import React, {createContext, useState} from 'react';
import {content as initialContent} from '../../shared/constants';
import {Content, ContentContextValue} from '../../types';

/**
 * DEFINE CONTEXT
 */
export const ContentContext = createContext<ContentContextValue>(
  {} as ContentContextValue,
);

/**
 * CONTENT PROVIDER
 * Data is inlined from shared/constants — no network request needed.
 */
export const ContentContextProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [content] = useState<Content>(initialContent);

  return (
    <ContentContext.Provider value={{content}}>
      {children}
    </ContentContext.Provider>
  );
};
