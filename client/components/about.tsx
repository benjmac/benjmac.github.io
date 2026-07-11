import React from 'react';

import {Header, Image} from 'semantic-ui-react';

import '../styles/about.scss';

/**
 * ABOUT COMPONENT
 */
export const AboutMe = () => {
  return (
    <div className="ui main text container about-container">
      <Header as="h2" icon textAlign="center">
        {/* <Icon name='users' circular /> */}
        <Image className="about-img" centered size="large" src="bjm.png" />
        <Header.Content>Benjamin McCain</Header.Content>
      </Header>
      <p className="about-text">
        I’m a software engineer with a passion for problem solving and a desire
        to move the world forward through technology and innovation. I began
        programming after the realization that I could no longer surf the web
        without analyzing every site. Since then, I haven’t stopped learning.
      </p>
      <p className="about-text">
        My path into software really started when I was working abroad for an
        electronic medical records company in Buenos Aires. Daily, I was running
        .bat scripts for installations and maintenance, but eventually,
        curiosity took over and I had to edit and customize my own. Opening the
        file that day in turn opened a new world to me. Finding out I could run
        simple commands in the dev shell drove me to Google and discover what
        all could be done. In the process, I came across the massive, supportive
        community behind software and knew I had to be a part of it.
      </p>
      <p className="about-text">
        After attending Fullstack Academy and serving as a teaching fellow, I
        began my career as a software engineer at J.P. Morgan Chase. Being
        surrounded by quality engineers allowed me to pursue my goal of always
        evolving, not just as a developer, but as a person who wants to better
        every product I touch.
      </p>
      <p className="about-text">
        During my time at Peloton, that drive to improve things took on a more
        structural dimension. As the organization scaled and the technical
        landscape grew more complex, I found myself instinctively drawn to the
        foundations, focusing on developer experience and the internal systems
        that empower an entire engineering culture. I realized my passion for
        problem solving didn't stop at the end user; it evolved into a
        commitment to the health and velocity of the entire organization. I
        became a hybrid engineer, melding the product-focused roots of a SWE
        with the systems thinking of an SRE. Whether I was architecting a
        developer portal or refining a deployment pipeline, my approach was
        driven by the idea that bettering the environment for the engineer
        ultimately results in a better product for the world.
      </p>

      <p className="about-text">
        That same conviction now shapes my work at Betterment, where I continue
        to focus on developer experience and internal systems. I’m deeply
        invested in creating a seamless, efficient, and empowering environment
        for engineers, recognizing that the tools and processes we build
        directly influence the quality of the products we deliver. My work is
        guided by the principle that when engineers are equipped with the right
        resources and support, they can innovate more freely, solve problems
        more effectively, and ultimately contribute to a more robust and
        user-centric product.
      </p>

      <p className="about-text">
        I’ve discovered that I’m at my best where product engineering meets
        organizational scale, collaborating across teams to build the impactful,
        high-utility tools that define a modern tech stack. My dedication to the
        craft goes beyond just shipping code; it’s about the constant
        exploration of new libraries and architectural patterns that challenge
        my perspective and push the boundaries of what we can build. I find
        genuine inspiration in the balance between technical rigor and
        human-centric design. There is nothing more rewarding than a career
        where I can tackle high-stakes challenges daily while knowing my work
        creates a more efficient, innovative, and resilient future.
      </p>
    </div>
  );
};

export default AboutMe;
