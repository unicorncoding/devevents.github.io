const topics = {
  architeture: {
    icon: "https://img.icons8.com/wired/64/000000/brick-wall.png",
    topic: "Software architecture"
  },
  scala: {
    icon: "https://img.icons8.com/wired/64/000000/scala.png",
    topic: "Scala"
  },
  javascript: {
    icon: "https://img.icons8.com/ios/50/000000/javascript.png",
    topic: "JavaScript"
  },
  elixir: {
    icon: "https://img.icons8.com/wired/64/000000/mana.png",
    topic: "Elixir"
  },
  cpp: {
    icon: "https://img.icons8.com/wired/64/000000/c-plus-plus.png",
    topic: "C/C++"
  },
  clojure: {
    icon: "https://img.icons8.com/wired/64/000000/lambda.png",
    topic: "Clojure"
  },
  data: {
    icon: "https://img.icons8.com/wired/64/000000/database.png",
    topic: "Data science"
  },
  fullstack: {
    icon: "https://img.icons8.com/ios/50/000000/stackoverflow.png",
    topic: "Full-stack"
  },
  python: {
    icon: "https://img.icons8.com/wired/64/000000/python.png",
    topic: "Python"
  },
  iot: {
    icon: "https://img.icons8.com/ios/50/000000/bios--v1.png",
    topic: "IoT"
  },
  devops: {
    icon: "https://img.icons8.com/wired/64/000000/docker.png",
    topic: "DevOps"
  },
  leadership: {
    icon: "https://img.icons8.com/ios/50/000000/leadership.png",
    topic: "Leadership"
  },
  management: {
    icon: "https://img.icons8.com/ios/50/000000/leadership.png",
    topic: "Management"
  },
  dotnet: {
    icon: "https://img.icons8.com/ios/50/000000/microsoft.png",
    topic: ".NET"
  },
  php: {
    icon: "https://img.icons8.com/wired/64/000000/php.png",
    topic: "PHP"
  },
  java: {
    icon: "https://img.icons8.com/wired/64/000000/java-coffee-cup-logo.png",
    topic: "Java"
  },
  kotlin: {
    icon: "https://img.icons8.com/wired/64/000000/java-coffee-cup-logo.png"
  },
  ux: {
    icon: "https://img.icons8.com/wired/64/000000/paint.png",
    topic: "UX"
  },
  security: {
    icon: "https://img.icons8.com/ios/50/000000/security-time.png",
    topic: "Security"
  },
  mobile: {
    icon: "https://img.icons8.com/wired/50/000000/two-smartphones.png",
    topic: "Mobile"
  },
  ios: {
    icon: "https://img.icons8.com/wired/64/000000/ios-logo.png",
    topic: "iOS"
  },
  web: {
    icon: "https://img.icons8.com/wired/64/000000/html-5.png",
    topic: "Web"
  },
  product: {
    icon: "https://img.icons8.com/wired/64/000000/idea.png",
    topic: "Product"
  },
  ruby: {
    icon:
      "https://img.icons8.com/wired/64/000000/ruby-programming-language.png",
    topic: "Ruby"
  },
  golang: {
    icon: "https://img.icons8.com/ios/50/000000/golang.png",
    topic: "Golang"
  }
};

export function prettyIcon(topic) {
  return topics[topic] ? topics[topic].icon : "";
}
