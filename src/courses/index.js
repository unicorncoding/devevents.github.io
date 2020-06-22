const courses = [
  "principal-developer",
  "agile-architecture",
  "crafting-code",
  "crafted-design",
  "cpp-tests",
  "effective-java",
  "xa"
];

function requireCourse(codename) {
  const { attributes, html } = require(`./${codename}.md`);
  return { ...attributes, html, codename };
}

module.exports.courses = courses
  .map(requireCourse)
  .sort((it, that) => it.title.localeCompare(that.title));
module.exports.courseByCodename = codename => requireCourse(codename);
