import React, {createContext, useState} from 'react'
import {content as initialContent} from '../../shared/constants'

/**
 * DEFINE CONTEXT
 */
export const ContentContext = createContext()

/**
 * CONTENT PROVIDER
 * Data is inlined from shared/constants — no network request needed.
 */
export const ContentContextProvider = (props) => {
  const [content] = useState(initialContent)

  return (
    <ContentContext.Provider value={{content}}>
      {props.children}
    </ContentContext.Provider>
  )
}
