const topics = {
  softskills: {
    name: "Soft skills"
  },
  it: {
    name: "General IT/Tech"
  },
  clojure: {
    name: "Clojure"
  },
  cpp: {
    name: "C and C++"
  },
  mobile: {
    name: "Mobile"
  },
  iot: {
    name: "IoT"
  },
  web: {
    name: "Frontend & web"
  },
  data: {
    name: "Data science"
  },
  database: {
    name: "Databases"
  },
  devops: {
    name: "DevOps"
  },
  dotnet: {
    name: ".NET"
  },
  elixir: {
    name: "Elixir"
  },
  react: {
    name: "React"
  },
  fullstack: {
    name: "Full-stack"
  },
  golang: {
    name: "Golang"
  },
  java: {
    name: "Java"
  },
  kotlin: {
    name: "Kotlin"
  },
  scala: {
    name: "Scala"
  },
  javascript: {
    name: "JavaScript"
  },
  leadership: {
    name: "Leadership & management"
  },
  game: {
    name: "Game development"
  },
  architecture: {
    name: "Software architecture"
  },
  agile: {
    name: "Agile"
  },
  php: {
    name: "PHP"
  },
  product: {
    name: "Product development"
  },
  python: {
    name: "Python"
  },
  ruby: {
    name: "Ruby and Rails"
  },
  security: {
    name: "Security"
  },
  ux: {
    name: "UX"
  },
  qa: {
    name: "Testing and QA"
  },
  blockchain: {
    name: "Blockchain"
  },
  cloud: {
    name: "Cloud"
  },
  docker: {
    name: "Docker and Kubernetes"
  },
  fp: {
    name: "Functional programming"
  },
  fsharp: {
    name: "F sharp"
  },
  fintech: {
    name: "Fintech"
  },
  rust: {
    name: "Rust"
  },
  ml: {
    name: "Machine learning & AI"
  }
};

module.exports.topics = topics;
module.exports.topicsOrdered = Object.keys(topics)
  .map(code => ({ code: code, name: topics[code].name }))
  .sort((it, that) => it.name.localeCompare(that.name));
