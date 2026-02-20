import React from 'react'

import {Header, Image} from 'semantic-ui-react'

import '../styles/about.scss'

/**
 * ABOUT COMPONENT
 */
export const AboutMe = () => {
  return (
    <div className="ui main text container" style={{paddingBottom: '15px'}}>
      <Header as="h2" icon textAlign="center">
        {/* <Icon name='users' circular /> */}
        <Image className="about-img" centered size="large" src="bjm.png" />
        <Header.Content>Benjamin McCain</Header.Content>
      </Header>
      <p style={{fontSize: '1.1em'}}>
        I'm a software engineer with a passion for problem solving and a desire
        to move the world forward through technology and innovation. I began
        programming after the realization that I could no longer surf the web
        without analyzing every site. Since then I haven’t stopped learning...
      </p>
      <p style={{fontSize: '1.1em'}}>
        I first became intrigued with learning more about software when working
        for an electronic medical records company in Buenos Aires. Daily I was
        running .bat scripts for installations and maintenance. Then came the
        time to edit and customize my own. Opening the file that day in turn
        opened a new world to me. Finding out I could run simple commands in the
        dev shell drove me to google and discover what all could be done. In the
        process, I came across blogs and articles regarding how to become a
        developer. Before then I never knew there was such a large and
        supportive community around software and learning how to code. At that
        point, I found Fullstack Academy.
      </p>
      <p style={{fontSize: '1.1em'}}>
        Upon attending Fullstack, I gained the fundamentals to set me on my
        journey of constant learning and improvement. Post my time as a teaching
        fellow at Fullstack I began my job as a software engineer at J.P. Morgan
        Chase. Having the opportunity to be surrounded by quality engineers has
        only further allowed me to pursue my goal of always evolving and
        bettering myself and any products on which I work. I couldn’t be happier
        having a career where every day I get to tackle something new and
        challenging.
      </p>
    </div>
  )
}

export default AboutMe
