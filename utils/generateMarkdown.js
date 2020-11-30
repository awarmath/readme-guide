// function to generate markdown for README
function generateMarkdown(userResponses, userInfo) {

  // Generate Table of Contents conditionally based on userResponses
  let draftToC = `## Table of Contents`;

  if (userResponses.installation !== '') { draftToC += `
  * [Installation](#installation)` };

  if (userResponses.usage !== '') { draftToC += `
  * [Usage](#usage)` };

  if (userResponses.credits !== '') { draftToC += `
  * [Credits](#credits)` };

  if (userResponses.license !== '') { draftToC += `
  * [License](#license)` };

  if (userResponses.contributing !== '') { draftToC += `
  * [Contributing](#contributing)` };

  if (userResponses.tests !== '') { draftToC += `
  * [Tests](#tests)` };


  // Generate markdown for the top required portions of the README
  let draftMarkdown = 
  `# ${userResponses.title}
  ![Badge for GitHub repo top language](https://img.shields.io/github/languages/top/${userResponses.username}/${userResponses.repo}?style=flat&logo=appveyor) ![Badge for GitHub last commit](https://img.shields.io/github/last-commit/${userResponses.username}/${userResponses.repo}?style=flat&logo=appveyor)
  
  Check out the badges hosted by [shields.io](https://shields.io/).
  
  
  ## Description 
    
  ${userResponses.description}
  `

  // Add Table of Contents to markdown
  draftMarkdown += draftToC;
   

  // Optional Installation section
  if (userResponses.installation !== '') {
  
  draftMarkdown +=
  `
  
  ## Installation
    
  ${userResponses.installation}`
  };
  

  // Optional Usage section
  if (userResponses.usage !== '') {
  
  draftMarkdown +=
  `
  
  ## Usage 
    
  ${userResponses.usage}`
  };  

  // Optional Credit section
  if (userResponses.credits !== '') {
  
  draftMarkdown +=
  `
    
  ## Credit
        
  ${userResponses.credits}`
  };  

  // License section is required
  if (userResponses.license !== '') {

  draftMarkdown +=
  `
  
  ## License
  
  ${userResponses.license}`
  };

  // Optional Contributing section
  if (userResponses.contributing !== '') {
    
  draftMarkdown +=
  `
    
  ## Contributing
        
  ${userResponses.contributing}`
  };

  // Optional Tests section
  if (userResponses.tests !== '') {
    
    draftMarkdown +=
    `
      
  ## Tests
            
  ${userResponses.tests}`
  };

  // Questions / About Developer section
  let draftDev = 
  `
  ---
  
  ## Questions?
  
  ![Developer Profile Picture](${userInfo.avatar_url}) 
  
  For any questions, please contact me with the information below:
 
  GitHub: [@${userInfo.login}](${userInfo.url})
  `;

  // If GitHub email is not null, add to Developer section
  if (userInfo.email !== null) {
  
  draftDev +=
  `
  Email: ${userInfo.email}
  `};

  // Add developer section to markdown
  draftMarkdown += draftDev;

  // Return markdown
  return draftMarkdown;
  
}

module.exports = generateMarkdown;
