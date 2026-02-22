import {TechnologiesAndSkills, WorkExperienceItem, Content} from '../types';

const technoligiesAndSkills: TechnologiesAndSkills = {
  proficient: [
    {
      skillName: 'JavaScript',
      src: 'images/javascript.png',
      link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      skillName: 'TypeScript',
      src: 'images/typescript.png',
      link: 'https://www.typescriptlang.org/docs/',
    },
    {
      skillName: 'React',
      src: 'images/react.png',
      link: 'https://reactjs.org/docs/getting-started.html',
    },
    {
      skillName: 'Node',
      src: 'images/node.svg',
      link: 'https://nodejs.org/en/docs/',
    },
    {
      skillName: 'Express',
      src: 'images/expressjs.png',
      link: 'https://expressjs.com/',
    },
    {
      skillName: 'Angular',
      src: 'images/angular.png',
      link: 'https://angular.io/',
    },
    {
      skillName: 'RxJS',
      src: 'images/rxjs.png',
      link: 'https://rxjs.dev/guide/overview',
    },
    {
      skillName: 'GitHub CI/CD',
      src: 'images/github.png',
      link: 'https://docs.github.com/en/actions',
    },
    {
      skillName: 'Docker',
      src: 'images/docker.png',
      link: 'https://docs.docker.com/',
    },
    {
      skillName: 'Kubernetes',
      src: 'images/kubernetes.png',
      link: 'https://kubernetes.io/docs/home/',
    },
    {
      skillName: 'Backstage',
      src: 'images/backstage.svg',
      link: 'https://backstage.io/docs/',
    },
    {
      skillName: 'AWS',
      src: 'images/aws.png',
      link: 'https://docs.aws.amazon.com/',
    },
    {
      skillName: 'Terraform',
      src: 'images/terraform.png',
      link: 'https://developer.hashicorp.com/terraform/docs',
    },
    {
      skillName: 'SQL',
      src: 'images/sql.png',
      link: 'https://www.w3schools.com/SQL/deFault.asp',
    },
    {
      skillName: 'HTML',
      src: 'images/html.png',
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    },
    {
      skillName: 'CSS',
      src: 'images/css.png',
      link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    },
    {
      skillName: 'D3',
      src: 'images/d3.png',
      link: 'https://d3js.org/',
    },
    {
      skillName: 'Git',
      src: 'images/git.png',
      link: 'https://git-scm.com/doc',
    },
    {
      skillName: 'Jest',
      src: 'images/jest.png',
      link: 'https://jestjs.io/docs/getting-started',
    },
    {
      skillName: 'Cypress',
      src: 'images/cypress.webp',
      link: 'https://docs.cypress.io/',
    },
    {
      skillName: 'Knex.js',
      src: 'images/knex.png',
      link: 'https://knexjs.org/',
    },
    {
      skillName: 'AI Tooling',
      src: 'images/ai.jpg',
      link: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
    },
    {
      skillName: 'RAG',
      src: 'images/rag.webp',
      link: 'https://en.wikipedia.org/wiki/Retrieval-augmented_generation',
    },
    {
      skillName: 'AI Agents',
      src: 'images/ai-agents.png',
      link: 'https://developers.openai.com/api/docs/guides/agents-sdk',
    },
    {
      skillName: 'DataDog',
      src: 'images/datadog.svg',
      link: 'https://docs.datadoghq.com/',
    },
    {
      skillName: 'Observability',
      src: 'images/observability.webp',
      link: 'https://www.honeycomb.io/what-is-observability',
    },
    {
      skillName: 'Slack Bots',
      src: 'images/slack.png',
      link: 'https://docs.slack.dev/tools/bolt-js/building-an-app',
    },
  ],
  familiar: [
    {
      skillName: 'Java',
      src: 'images/java.png',
      link: 'https://docs.oracle.com/en/java/',
    },
    {
      skillName: 'Python',
      src: 'images/python.webp',
      link: 'https://docs.python.org/3/',
    },
    {
      skillName: 'Jenkins',
      src: 'images/jenkins.jpg',
      link: 'https://www.jenkins.io/doc/',
    },
    {
      skillName: 'Webpack',
      src: 'images/webpack.png',
      link: 'https://webpack.js.org/',
    },
    {
      skillName: 'PostgreSQL',
      src: 'images/postgresql.png',
      link: 'https://www.postgresql.org/',
    },
    {
      skillName: 'jQuery',
      src: 'images/jquery.png',
      link: 'https://api.jquery.com/',
    },
    {
      skillName: 'A-Frame React',
      src: 'images/aframe.jpeg',
      link: 'https://www.npmjs.com/package/aframe-react',
    },
    {
      skillName: 'OAuth',
      src: 'images/oauth.png',
      link: 'https://oauth.net/',
    },
    {
      skillName: 'Socket.io',
      src: 'images/socketio.gif',
      link: 'https://socket.io/',
    },
    {
      skillName: 'Glue42',
      src: 'images/glue42.png',
      link: 'https://docs.glue42.com/reference/glue/latest/glue/index.html',
    },
  ],
  interestedIn: [
    {
      skillName: 'VR',
      src: 'images/vr.png',
      link: 'https://www.google.com/search?q=virtual+reality&oq=virtual+reality&aqs=chrome..69i57j0i433l2j0i457j0i433j0j69i60l2.4044j0j4&sourceid=chrome&ie=UTF-8',
    },
    {
      skillName: 'AR',
      src: 'images/ar.png',
      link: 'https://www.google.com/search?q=augmented+reality&sxsrf=ALeKk03vPmZmAXI8m9xmNhaGxtasPGCr1A%3A1618161916224&ei=_DBzYNSMDc2r5NoPrrGTiAM&oq=augmente&gs_lcp=Cgdnd3Mtd2l6EAMYADIHCAAQsQMQQzIFCAAQsQMyAggAMgUIABCxAzIECAAQQzIECAAQQzICCAAyBwgAEIcCEBQyBQgAELEDMgQIABBDOgcIIxCwAxAnOgcIABBHELADOgcIABCwAxBDOgQIIxAnOgoIABCxAxCDARBDOgsILhCxAxDHARCjAjoCCC46DgguELEDEIMBEMcBEK8BOggIABCxAxCDAToICC4QxwEQrwFQgiVY7C5g6jhoA3ACeACAAcwBiAGrCJIBBTMuNS4xmAEAoAEBqgEHZ3dzLXdpesgBCsABAQ&sclient=gws-wiz',
    },
    {
      skillName: 'Unity',
      src: 'images/unity.png',
      link: 'https://docs.unity3d.com/Manual/index.html',
    },
    {
      skillName: 'C#',
      src: 'images/csharp.png',
      link: 'https://docs.microsoft.com/en-us/dotnet/csharp/',
    },
  ],
};

const workExperience: WorkExperienceItem[] = [
  {
    image: 'images/peloton.png',
    header:
      'Peloton Interactive, Senior Software Engineer - SRE Developer Experience',
    meta: 'Aug. 2023 - Feb. 2026',
    extra: 'New York, NY',
    bullets: [
      'Developed a multimodal agentic Slack AI assistant using RAG/MCP to synthesize technical knowledge across siloed datasets',
      'Engineered Looker developer insights dashboards utilizing custom event handlers, Airflow, S3, Glue crawlers, and Athena',
      'Engineered incident management dashboard via AWS and Looker to ingest and visualize FireHydrant and Jira telemetry',
      'Led the migration from AWS CloudHSM1 to CloudHSM2M, modernizing secure APK signing infrastructure for production and updated associated Go-based tooling',
      'Tech Lead for Backstage developer portal, driving full-stack development via Node.js, TypeScript, React, and PostgreSQL',
      'Orchestrated scalable GitHub runner fleets on AWS via ARSS and Kubernetes for containerized build environments',
      'Engineered enterprise CI/CD tooling, creating reusable/callable GitHub workflows and custom actions',
      'Managed Jenkins infrastructure via AWS, leveraging Auto Scaling Groups to provision scalable EC2 controller and agent nodes',
      'Developed custom Slack integration to automate on-call discovery for PagerDuty managed services',
      'Founding member of the Peloton AI Working Group, defining org standards for AI governance and technical knowledge sharing',
      'Managed the enterprise Terraform/Scalr platform, supporting distributed IaC implementation across org wide repositories',
      'Drove organizational velocity via best-practice education while providing structural project guidance to junior team engineers',
      'Provided technical consultation for cross-functional AWS resource integration, guiding engineers through cloud architecture and IAM implementation',
      'Orchestrated 200+ complex CI/CD migrations to a resilient Github ARSS runner system on AWS EKS, managing secure IAM provisioning and authoring migration playbooks to avert legacy cluster EOL disruptions',
    ],
  },
  {
    image: 'images/peloton.png',
    header: 'Peloton Interactive, Software Engineer',
    meta: 'July 2021 - July 2023',
    extra: 'New York, NY',
    bullets: [
      'Built developer portal utilizing Backstage; featuring custom plugins, scaffolding, cross-service auth, and a unified dev homepage',
      'Foundational engineer on greenfield dev portal; iteratively refined functionality to meet evolving org and product requirements',
      'Contributed to Backstage open source community for bug fixes and enhancements',
      'Led modular Backstage template campaign, eliminating redundancy to ensure consistent downstream microservice creation',
      'Developed a GitHub Action enabling engineering teams to instrument custom DataDog gauge metrics within CI/CD',
      'Reduced data engineering toil by centralizing Kafka cluster and broker visibility within the developer portal',
      'Presented at company-wide microservices series, highlighting Backstage template impact on standardized service scaffolding and developer velocity',
      'Supported company wide hackathons via Backstage, managing project registration and event workflows to drive organizational innovation',
      'Engineered a centralized Service Registry using field-completeness metrics to drive organizational data integrity and discoverability',
    ],
  },
  {
    image: 'images/jpmorganchase.png',
    header: 'JP Morgan Chase & Co, Senior Associate Software Engineer',
    meta: 'Feb. 2021 - July 2021',
    extra: 'Jersey City, NJ',
    bullets: [
      'Mentored junior engineers while overseeing technical standards and delivery for established project work-streams',
    ],
  },
  {
    image: 'images/jpmorganchase.png',
    header: 'JP Morgan Chase & Co, Associate Software Engineer',
    meta: 'Feb. 2019 - Jan. 2021',
    extra: 'Jersey City, NJ',
    bullets: [
      'Led UI development of a high-impact goals based financial planning application',
      'Developed internal RESTful Java APIs to facilitate data exchange between team owned microservices',
      'Contributed to enterprise-scale architectural design, data modeling, and internal service implementations',
      'Partnered cross-functionally with Product/UX to influence technical strategy and deliver intuitive user-journey improvements',
      'Ensured architectural integrity by guiding the code approval lifecycle and facilitating collaborative, joint technical reviews',
      'Participated in the technical interview process to evaluate and select high quality engineering talent',
    ],
  },
  {
    image: 'images/jpmorganchase.png',
    header: 'JP Morgan Chase & Co, Software Engineer',
    meta: 'Nov. 2017 - Jan. 2019',
    extra: 'Jersey City, NJ',
    bullets: [
      'Engineered and supported enterprise grade advisor wealth planning applications leveraging Angular and React/Redux',
      'Added connection between applications in advisor platform via Glue42',
      'Developed Selenium based tool to quantify user journey load times, providing actionable telemetry for performance optimization',
      'Created Protractor E2E test suites, automating quality validation within the CI/CD deployment pipeline',
    ],
  },
  {
    image: 'images/fullstack.png',
    header: 'Fullstack Academy, Teaching Fellow and Software Engineer Intern',
    meta: 'June 2017 - Sept. 2017',
    extra: 'New York, NY',
    bullets: [
      'Helped students debug Javascript / TypeScript code',
      'Conducted code reviews, graded exams and provided constructive feedback to students',
      'Worked in an Agile engineering team implementing new features and maintained the web-based learning platform, LearnDot',
      'Led review sessions on Node/Express/Sequelize/React/Redux',
      'Conducted technical interviews for Fullstack Academy applicants',
    ],
  },
  {
    image: 'images/praxis.png',
    header: 'Praxis Electronic Medical Records, Director of Interfaces',
    meta: 'May 2013 - July 2016',
    extra: 'Buenos Aires, Argentina',
    bullets: [
      'Led team as head technician in English and Spanish to build, test and repair interfaces for medical documents between laboratories, practice management systems and clinics',
    ],
  },
  {
    image: 'images/praxis.png',
    header: 'Praxis Electronic Medical Records, Implementation Manager',
    meta: 'Mar. 2013 - Apr. 2013',
    extra: 'Buenos Aires, Argentina',
    bullets: [
      'Aided and supervised clinics during first six months of use of the software',
    ],
  },
  {
    image: 'images/praxis.png',
    header:
      'Praxis Electronic Medical Records, Customer Service Representative',
    meta: 'June 2012 - Feb. 2013',
    extra: 'Buenos Aires, Argentina',
    bullets: ["Managed clinics' cases for technical complications"],
  },
  {
    image: 'images/group-living.png',
    header: 'Group Living Incorporation, Volunteer',
    meta: 'Feb. 2012 - May 2012',
    extra: 'Arkadelphia, AR',
    bullets: [
      'Empowered adults with intellectual and developmental disabilities to foster social inclusion and achieve greater independence within their communities',
    ],
  },
  {
    image: 'images/colegio.png',
    header: 'Colegio Santísima Trinidad',
    meta: 'Aug. 2011 - Dec. 2011',
    extra: 'Mar del Plata, Argentina',
    bullets: [
      'Created and led a course in information technology in Spanish for students of all ages',
    ],
  },
  {
    image: 'images/capitol.jpeg',
    header: 'Former Representative Mike Ross, Intern',
    meta: 'July 2010 - Aug. 2010',
    extra: 'Washington, DC',
    bullets: [
      'Aided in the organization of constituent correspondence',
      'Researched and drafted letters responding to constituent concerns',
      "Developed a spreadsheet of Acts allocating funds to benefit the congressman's district",
      'Observed the representative in multiple meetings and in the process of forming legislation',
    ],
  },
  {
    image: 'images/capitol.jpeg',
    header: 'Former Senator Blanche Lincoln, Intern',
    meta: 'June 2010 - July 2010',
    extra: 'Washington, DC',
    bullets: [
      'Observed the senator in meetings and gained a behind the scenes view of the legislative process',
      'Attended and drafted summaries on congressional hearings',
      'Guided constituents through capitol grounds while explaining governmental processes',
    ],
  },
];

export const content: Content = {
  technoligiesAndSkills,
  workExperience,
};
