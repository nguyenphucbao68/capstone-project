function getValue(items) {
  return items.map((item) => ({
    ...item,
    date_posted:
      item.date_posted.split("/").reverse().join("-") + "T14:43:55.772Z",
  }));
}

console.log(
  getValue([
    {
      id: 1,
      company_id: 1,
      job_name: "Senior Software Engineer",
      salary: 35000000,
      skills: ["Java", "Spring Framework", "Database Management"],
      workType: "Hybrid",
      top_3_reason:
        "<ul><li>Exciting projects with cutting-edge technologies.</li><li>Flexible work environment for better work-life balance.</li><li>Opportunities for career advancement.</li></ul>",
      skill_demand:
        "<ul><li>5+ years of experience in Java development.</li><li>Expertise in the Spring Framework.</li><li>Strong database management skills.</li></ul>",
      why_you_love_working_here:
        "<p>I love working at TechSolutions because of the challenging projects, flexible work environment, and the opportunities for career growth. It's a dynamic place where innovation thrives.</p>",
      date_posted: "15/02/2024",
    },
    {
      id: 2,
      company_id: 1,
      job_name: "UX/UI Designer",
      salary: 25000000,
      skills: ["UI/UX Design", "Adobe Creative Suite", "Wireframing"],
      workType: "At office",
      top_3_reason:
        "<ul><li>Creative and collaborative design projects.</li><li>Supportive team and mentoring programs.</li><li>Competitive salary and benefits.</li></ul>",
      skill_demand:
        "<ul><li>Proficient in UI/UX design principles.</li><li>Experience with Adobe Creative Suite.</li><li>Strong skills in wireframing and prototyping.</li></ul>",
      why_you_love_working_here:
        "<p>At TechSolutions, I have the opportunity to work on creative and collaborative design projects. The supportive team and mentoring programs contribute to a positive work environment.</p>",
      date_posted: "20/02/2024",
    },
    {
      id: 3,
      company_id: 2,
      job_name: "Senior Android Developer",
      salary: null,
      skills: ["Android Development", "Kotlin", "RESTful APIs"],
      workType: "Remote",
      top_3_reason:
        "<ul><li>Fascinating Android development projects.</li><li>Fully remote work for flexibility.</li><li>Opportunity to contribute to cutting-edge mobile applications.</li></ul>",
      skill_demand:
        "<ul><li>Proven experience in Android app development.</li><li>Proficient in Kotlin programming language.</li><li>Experience with RESTful APIs and mobile application architecture.</li></ul>",
      why_you_love_working_here:
        "<p>InnovateTech provides the perfect environment for Android developers. The fascinating projects and fully remote work option give me the flexibility to excel in my role.</p>",
      date_posted: "10/02/2024",
    },
    {
      id: 4,
      company_id: 2,
      job_name: "Data Scientist",
      salary: 45000000,
      skills: ["Data Analysis", "Machine Learning", "Python"],
      workType: "Hybrid",
      top_3_reason:
        "<ul><li>Exciting data science projects with real-world impact.</li><li>Hybrid work model for a balanced lifestyle.</li><li>Competitive salary and benefits.</li></ul>",
      skill_demand:
        "<ul><li>Strong background in data analysis and interpretation.</li><li>Experience with machine learning techniques.</li><li>Proficient in Python programming.</li></ul>",
      why_you_love_working_here:
        "<p>InnovateTech's data science projects have a real-world impact. The hybrid work model allows for a balanced lifestyle, and the competitive salary and benefits make it a great place to grow professionally.</p>",
      date_posted: "18/02/2024",
    },
    {
      id: 5,
      company_id: 3,
      job_name: "Recruitment Specialist",
      salary: 20000000,
      skills: ["Talent Acquisition", "Interviewing", "Communication"],
      workType: "At office",
      top_3_reason:
        "<ul><li>Opportunity to connect top talent with leading organizations.</li><li>Supportive team and continuous learning opportunities.</li><li>Competitive salary and benefits.</li></ul>",
      skill_demand:
        "<ul><li>Experience in talent acquisition and recruitment.</li><li>Strong interviewing and communication skills.</li><li>Ability to build strong relationships with candidates and clients.</li></ul>",
      why_you_love_working_here:
        "<p>TalentSearch provides a fulfilling experience where I can connect top talent with leading organizations. The supportive team and continuous learning opportunities make it a great place to work.</p>",
      date_posted: "22/02/2024",
    },
    {
      id: 6,
      company_id: 3,
      job_name: "HR Generalist",
      salary: 18000000,
      skills: ["Human Resources", "Employee Relations", "Conflict Resolution"],
      workType: "Hybrid",
      top_3_reason:
        "<ul><li>Varied responsibilities in human resources.</li><li>Hybrid work model for flexibility.</li><li>Opportunity for professional development in HR.</li></ul>",
      skill_demand:
        "<ul><li>Experience in human resources functions.</li><li>Strong knowledge of employee relations and conflict resolution.</li><li>Excellent interpersonal and communication skills.</li></ul>",
      why_you_love_working_here:
        "<p>Working as an HR Generalist at TalentSearch is rewarding due to the varied responsibilities and opportunities for professional development. The hybrid work model adds to the flexibility I appreciate.</p>",
      date_posted: "25/02/2024",
    },
    {
      id: 7,
      company_id: 4,
      job_name: "IT Consultant",
      salary: 38000000,
      skills: ["IT Consulting", "Project Management", "Client Communication"],
      workType: "At office",
      top_3_reason:
        "<ul><li>Diverse and challenging IT consulting projects.</li><li>Professional growth through mentorship programs.</li><li>Competitive salary and benefits.</li></ul>",
      skill_demand:
        "<ul><li>Proven experience in IT consulting.</li><li>Strong project management skills.</li><li>Excellent communication skills for client interactions.</li></ul>",
      why_you_love_working_here:
        "<p>ConsultTech offers a diverse range of challenging IT consulting projects. The mentorship programs contribute to my professional growth, and the competitive salary and benefits make it an ideal workplace.</p>",
      date_posted: "12/02/2024",
    },
    {
      id: 8,
      company_id: 4,
      job_name: "Software Tester",
      salary: 22000000,
      skills: ["Manual Testing", "Automated Testing", "Quality Assurance"],
      workType: "Remote",
      top_3_reason:
        "<ul><li>Remote work option for flexibility.</li><li>Engaging software testing projects.</li><li>Opportunities for skill development in quality assurance.</li></ul>",
      skill_demand:
        "<ul><li>Experience in manual and automated testing.</li><li>Strong knowledge of quality assurance processes.</li><li>Attention to detail and excellent problem-solving skills.</li></ul>",
      why_you_love_working_here:
        "<p>At ConsultTech, I enjoy the flexibility of remote work and engaging software testing projects. The opportunities for skill development in quality assurance make it a fulfilling role.</p>",
      date_posted: "28/02/2024",
    },
    {
      id: 9,
      company_id: 5,
      job_name: "Environmental Analyst",
      salary: 30000000,
      skills: ["Environmental Science", "Data Analysis", "Sustainability"],
      workType: "Remote",
      top_3_reason:
        "<ul><li>Contribute to environmental initiatives.</li><li>Hybrid work model for a balanced lifestyle.</li><li>Competitive salary and benefits.</li></ul>",
      skill_demand:
        "<ul><li>Degree in Environmental Science or related field.</li><li>Experience in data analysis related to environmental issues.</li><li>Knowledge of sustainability practices.</li></ul>",
      why_you_love_working_here:
        "<p>GreenInnovations allows me to contribute to important environmental initiatives. The hybrid work model and competitive salary and benefits make it an ideal workplace for those passionate about sustainability.</p>",
      date_posted: "17/02/2024",
    },
    {
      id: 10,
      company_id: 5,
      job_name: "Community Engagement Coordinator",
      salary: 18000000,
      skills: ["Community Outreach", "Event Planning", "Communication"],
      workType: "At office",
      top_3_reason:
        "<ul><li>Coordinate impactful community engagement initiatives.</li><li>Collaborative and supportive team environment.</li><li>Opportunities for career growth in community outreach.</li></ul>",
      skill_demand:
        "<ul><li>Experience in community outreach and event planning.</li><li>Strong communication and interpersonal skills.</li><li>Ability to coordinate and execute impactful community engagement initiatives.</li></ul>",
      why_you_love_working_here:
        "<p>GreenInnovations provides a fulfilling role where I can coordinate impactful community engagement initiatives. The collaborative and supportive team environment makes it a great place to work.</p>",
      date_posted: "23/02/2024",
    },
  ]),
);
