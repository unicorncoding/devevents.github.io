const courses = [
  "principal-developer",
  "agile-architecture",
  "crafting-code",
  "effective-java",
  "xa"
];

function requireCourse(codename) {
  const { attributes, html } = require(`./${codename}.md`);
  return { ...attributes, html, codename };
}

module.exports.courses = courses.map(requireCourse);
module.exports.courseByCodename = codename => requireCourse(codename);
