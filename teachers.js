const Nightmare = require('nightmare');
const nightmare = Nightmare( {show: true} );
const fs = require('fs');

nightmare
  .goto('https://www.turing.io/our-team')

  .wait(2000)
  .evaluate(() => {
    const teacherDivs = [...document.querySelectorAll('.team-member-big-photo')];

    const teacherData = teacherDivs.map(teacherDiv => {
      let name = teacherDiv.querySelector('h2').innerText;
      let title = teacherDiv.querySelector('h4').innerText;
  
      return { name, title }
    });

    return teacherData

  })
  .end()
  .then((result) => {
    let output = JSON.stringify(result, null, 2);

    fs.writeFile('./teacher-data.json', output, 'utf8', err => {
      if (err) {
        return console.log(err)
      }
    })
    console.log(result);
  })
  .catch(error => {
    console.log('Something went wrong:', error)
  })