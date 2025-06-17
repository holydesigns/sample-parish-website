
fetch('/.netlify/functions/fetch-sheet')
  .then(res => res.json())
  .then(data => {
    const home = data.home;
    const sectionMap = {};
    home.forEach(item => {
      sectionMap[item.section] = item.content;
    });

    document.getElementById("content").innerHTML = `
      <h1>${sectionMap["welcome_message"]}</h1>
      <blockquote>${sectionMap["verse_of_the_day"]}</blockquote>
      <p><strong>Announcement:</strong> ${sectionMap["announcement"]}</p>
    `;
  })
  .catch(err => {
    document.getElementById("content").innerHTML = "<p>Error loading content.</p>";
    console.error(err);
  });
