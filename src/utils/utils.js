export function geekify(topic) {
  const topics = {
    javascript: {
      icon: "https://img.icons8.com/ios/50/000000/javascript.png",
      topic: "JavaScript"
    },
    data: {
      icon: "https://img.icons8.com/wired/64/000000/database.png",
      topic: "Data"
    },
    general: {
      icon: "https://img.icons8.com/ios/50/000000/stackoverflow.png",
      topic: "Full-stack"
    },
    python: {
      icon: "https://img.icons8.com/wired/64/000000/python.png",
      topic: "Python"
    },
    devops: {
      icon: "https://img.icons8.com/wired/64/000000/docker.png",
      topic: "DevOps"
    },
    leadership: {
      icon: "https://img.icons8.com/ios/50/000000/leadership.png",
      topic: "Leadership"
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
    ux: {
      icon: "https://img.icons8.com/wired/64/000000/paint.png",
      topic: "UX"
    },
    security: {
      icon: "https://img.icons8.com/ios/50/000000/security-time.png",
      topic: "Security"
    },
    android: {
      icon: "https://img.icons8.com/wired/64/000000/android.png",
      topic: "Android"
    },
    networking: {
      icon: "https://img.icons8.com/ios/50/000000/safety-collection-place.png",
      topic: "Networking"
    },
    ios: {
      icon: "https://img.icons8.com/wired/64/000000/ios-logo.png",
      topic: "iOS"
    },
    css: {
      icon: "https://img.icons8.com/wired/64/000000/css3.png",
      topic: "CSS"
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
  return topics[topic];
}
