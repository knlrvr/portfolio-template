// Function to edit existing HTML elements
function editExistingElements(data) {

    // Section One
    const sectionOne = document.querySelector('.section__one');

    sectionOne.querySelector('h1').innerText = data[0].name;
    sectionOne.querySelector('h2').innerText = data[0].currentTitle;
    sectionOne.querySelector('.intro-text').innerText = data[0].statement;
    sectionOne.querySelector('.intro-location').innerText = data[0].location;

    const introIcons = sectionOne.querySelector('.intro-icons');
    const iconLinks = introIcons.querySelectorAll('.intro-icon-links');

    iconLinks[0].href = 'https://' + data[0].links.github;
    iconLinks[1].href = 'https://' + data[0].links.twitter;
    iconLinks[2].href = 'https://' + data[0].links.linkedin;

    const profilePicture = sectionOne.querySelector('.intro__right img');
    profilePicture.src = data[0].picture;


    // Section Two
    const sectionTwo = document.querySelector('.section__two');
    sectionTwo.querySelector('.about-text').innerText = data[0].about;


    // Section Three
    const sectionThree = document.querySelector('.section__three');

    // Clear existing job cards
    sectionThree.innerHTML = '<h2>Work Experience &mdash;</h2>';

    // Loop through the job data and create new job cards
    data[0].work.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job__card';

        // Create job details element
        const jobDetails = document.createElement('div');
        jobDetails.className = 'job-details';
        jobDetails.innerHTML = `
            <div class='job-details__left'>
                <p class='job-company'>${job.company}</p>
                <p class='job-location'>${job.location}</p>
            </div>
            <span class='job-dates'>${job.dates}</span>
        `;
        jobCard.appendChild(jobDetails);

        // Create job title element
        const jobTitle = document.createElement('p');
        jobTitle.className = 'job-title';
        jobTitle.textContent = job.title;
        jobCard.appendChild(jobTitle);

        // Create job description element
        const jobDescription = document.createElement('p');
        jobDescription.className = 'job-description';
        jobDescription.textContent = job.description;
        jobCard.appendChild(jobDescription);

        // Append the job card to the section
        sectionThree.appendChild(jobCard);
    });

    // Section Four
    const sectionFour = document.querySelector('.section__four');

    // Clear existing edu cards
    sectionFour.innerHTML = '<h2>Education &mdash;</h2>';
    
    // Loop through the education data and create new edu cards
    const education = data[0].education;
    const eduCard = document.createElement('div');
    eduCard.className = 'edu__card';
    
    // Create edu details element
    const eduDetails = document.createElement('div');
    eduDetails.className = 'edu-details';
    eduDetails.innerHTML = `
        <p class="edu-school">${education['school-name']}</p>
        <span class="edu-dates">${education.attended}</span>
    `;
    eduCard.appendChild(eduDetails);
    
    // Create edu degree element
    const eduDegree = document.createElement('p');
    eduDegree.className = 'edu-degree';
    eduDegree.textContent = education.degree;
    eduCard.appendChild(eduDegree);
    
    // Append the edu card to the section
    sectionFour.appendChild(eduCard);

    // Section Five
    // Edit existing elements within the "section__five" section
    const sectionFive = document.querySelector('.section__five');

    // Clear existing skills list
    const skillsList = sectionFive.querySelector('.skills__list');
    
    // Loop through the skills data and create new skill list items
    const skills = data[0].skills;
    skills.forEach(skill => {
        const skillItem = document.createElement('li');
        skillItem.className = 'skill';
        skillItem.textContent = skill;
        skillsList.appendChild(skillItem);
    });

    // Section Six
    const sectionSix = document.querySelector('.section__six');

    // Clear existing project cards
    const projectColumns = sectionSix.querySelector('.project__columns');
    projectColumns.innerHTML = ''; // Clear existing content

    // Loop through the projects data and create new project cards
    const projects = data[0].projects;
    for (const key in projects) {
        if (Object.hasOwnProperty.call(projects, key)) {
            const project = projects[key];

            // Create project card
            const projectCard = document.createElement('article');
            projectCard.className = 'project__card';

            // Create project title with indicator
            const projectTitle = document.createElement('p');
            projectTitle.className = 'project-title';

            // Create span element with dynamic background color
            const projectIndicator = document.createElement('span');
            projectIndicator.className = 'project-indicator';

            // Set background color based on the project status
            if (project.status === "online") {
                projectIndicator.style.backgroundColor = '#22c55e'; // Set the desired color for "online"
            } else if (project.status === "offline") {
                projectIndicator.style.backgroundColor = '#ef4444'; // Set the desired color for "offline"
            } else {
                projectIndicator.style.backgroundColor = '#737373'; // Default color for other statuses
            }

            projectTitle.innerHTML = `${project.title} `;
            projectTitle.appendChild(projectIndicator);
            projectCard.appendChild(projectTitle);

            // Create project description
            const projectDescription = document.createElement('p');
            projectDescription.className = 'project-description';
            projectDescription.textContent = project.description;
            projectCard.appendChild(projectDescription);

            // Create tech list
            const techList = document.createElement('ul');
            techList.className = 'tech-list';
            project.stack.forEach(tech => {
                const techItem = document.createElement('li');
                techItem.className = 'tech';
                techItem.textContent = tech;
                techList.appendChild(techItem);
            });
            projectCard.appendChild(techList);

            // Append the project card to the project columns
            projectColumns.appendChild(projectCard);
        }
    }

    // populate footer name 
    const footerName = document.querySelector('footer .footer-text');
    footerName.innerText = data[0].footerName;
}

// Fetch JSON data
fetch('/data.json')
    .then(response => response.json())
    .then(data => editExistingElements(data))
    .catch(error => console.error('Error fetching data:', error));
