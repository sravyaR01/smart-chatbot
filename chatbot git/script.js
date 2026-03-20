const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const clearBtn = document.getElementById("clear-btn");
const suggestionButtons = document.querySelectorAll(".suggestion");

let userName = localStorage.getItem("chatbotUserName") || "";
let isAskingName = userName === "";

function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function saveChat() {
  localStorage.setItem("chatbotMessages", chatBox.innerHTML);
  localStorage.setItem("chatbotUserName", userName);
}

function loadChat() {
  const savedChat = localStorage.getItem("chatbotMessages");

  if (savedChat) {
    chatBox.innerHTML = savedChat;
    chatBox.scrollTop = chatBox.scrollHeight;
  } else {
    if (isAskingName) {
      chatBox.innerHTML = `
        <div class="message-row bot-row">
          <div class="avatar">🤖</div>
          <div>
            <div class="message bot">
              Hello! I’m Smart Chatbot. Before we begin, what is your name?
            </div>
            <div class="time">${getTime()}</div>
          </div>
        </div>
      `;
    } else {
      chatBox.innerHTML = `
        <div class="message-row bot-row">
          <div class="avatar">🤖</div>
          <div>
            <div class="message bot">
              Welcome back, ${userName}! How can I help you today?
            </div>
            <div class="time">${getTime()}</div>
          </div>
        </div>
      `;
    }
    saveChat();
  }
}

function addMessage(message, sender) {
  const row = document.createElement("div");
  row.classList.add("message-row");
  row.classList.add(sender === "user" ? "user-row" : "bot-row");

  if (sender === "bot") {
    row.innerHTML = `
      <div class="avatar">🤖</div>
      <div>
        <div class="message bot">${message}</div>
        <div class="time">${getTime()}</div>
      </div>
    `;
  } else {
    row.innerHTML = `
      <div>
        <div class="message user">${message}</div>
        <div class="time">${getTime()}</div>
      </div>
      <div class="avatar">🧑</div>
    `;
  }

  chatBox.appendChild(row);
  chatBox.scrollTop = chatBox.scrollHeight;
  saveChat();
}

function showTyping() {
  const row = document.createElement("div");
  row.classList.add("message-row", "bot-row");
  row.id = "typing-row";

  row.innerHTML = `
    <div class="avatar">🤖</div>
    <div>
      <div class="message bot typing">
        <span>.</span><span>.</span><span>.</span>
      </div>
      <div class="time">${getTime()}</div>
    </div>
  `;

  chatBox.appendChild(row);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  const typingRow = document.getElementById("typing-row");
  if (typingRow) {
    typingRow.remove();
  }
}

function capitalizeName(name) {
  return name
    .trim()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function randomReply(replies) {
  return replies[Math.floor(Math.random() * replies.length)];
}

function getBotReply(message) {
  const msg = message.toLowerCase().trim();
  const displayName = userName ? userName : "there";

  const knowledgeBase = [
    {
      keywords: ["hi", "hello", "hey", "hii", "heyy"],
      replies: [
        `Hello ${displayName}!`,
        `Hey ${displayName}! How can I help you today?`,
        `Hi ${displayName}! Nice to chat with you.`
      ]
    },
    {
      keywords: ["how are you", "how r u", "how are u", "hw r u"],
      replies: [
        `I am doing great, ${displayName}. How about you?`,
        `I'm good and ready to help, ${displayName}.`,
        `Doing well, ${displayName}! What would you like to know?`
      ]
    },
    {
      keywords: ["my name", "what is my name", "do you know my name"],
      replies: [
        `Your name is ${displayName}.`,
        `You told me your name is ${displayName}.`,
        `Of course, you are ${displayName}.`
      ]
    },
    {
      keywords: ["your name", "who are you", "what are you"],
      replies: [
        "I’m Smart Chatbot, a rule-based chatbot built using HTML, CSS, and JavaScript.",
        "I’m your chatbot assistant.",
        "You can call me Smart Chatbot."
      ]
    },
    {
      keywords: ["how to prepare mern", "prepare mern", "mern roadmap", "how can i learn mern"],
      replies: [
        "To prepare MERN, start with HTML, CSS, and JavaScript. Then learn React for frontend, Node.js and Express.js for backend, and MongoDB for database. After that, build small projects and then full-stack apps.",
        "A good MERN roadmap is: HTML -> CSS -> JavaScript -> React -> Node.js -> Express.js -> MongoDB -> REST APIs -> full-stack projects.",
        "For MERN preparation, first build strong JavaScript basics, then learn React, backend with Node and Express, and finally MongoDB. Practice by building projects."
      ]
    },
    {
      keywords: ["mern resources", "resources for mern", "where to learn mern", "best resource for mern"],
      replies: [
        "For MERN, use free resources like Traversy Media, CodeWithHarry, Apna College, and freeCodeCamp. For practice, build mini projects after each topic.",
        "Good MERN resources are freeCodeCamp, Traversy Media, Apna College, CodeWithHarry, and the official docs of React, Node.js, Express, and MongoDB.",
        "To learn MERN, combine YouTube tutorials with documentation and project practice. The official docs are very useful once your basics are clear."
      ]
    },
    {
      keywords: ["mongodb"],
      replies: [
        "MongoDB is a NoSQL database that stores data in JSON-like documents.",
        "MongoDB is used in the MERN stack as the database layer.",
        "MongoDB is flexible because it stores data in collections and documents instead of tables."
      ]
    },
    {
      keywords: ["express"],
      replies: [
        "Express.js is a backend framework for Node.js used to build APIs and web servers.",
        "Express makes backend development easier in Node.js.",
        "In the MERN stack, Express.js helps handle routes, requests, and responses."
      ]
    },
    {
      keywords: ["backend"],
      replies: [
        "Backend is the server-side part of an application that handles logic, database operations, and APIs.",
        "Backend development involves servers, databases, authentication, and APIs.",
        "In MERN, Node.js and Express.js are used for backend development."
      ]
    },
    {
      keywords: ["frontend"],
      replies: [
        "Frontend is the user-facing part of a website or app.",
        "Frontend development focuses on UI using HTML, CSS, JavaScript, and frameworks like React.",
        "In MERN, React is used for frontend development."
      ]
    },
    {
      keywords: ["java"],
      replies: [
        "Java is a popular object-oriented programming language used in web, mobile, and enterprise applications.",
        "Java is a secure and platform-independent programming language.",
        "Java is widely used for backend development, Android apps, and enterprise software."
      ]
    },
    {
      keywords: ["python"],
      replies: [
        "Python is a simple and powerful programming language used in automation, AI, web development, and data science.",
        "Python is beginner-friendly and very popular.",
        "Python is widely used because of its easy syntax and huge libraries."
      ]
    },
    {
      keywords: ["html"],
      replies: [
        "HTML stands for HyperText Markup Language. It is used to structure web pages.",
        "HTML is the skeleton of a webpage.",
        "HTML helps define headings, paragraphs, images, links, and more on websites."
      ]
    },
    {
      keywords: ["css"],
      replies: [
        "CSS stands for Cascading Style Sheets. It is used to style web pages.",
        "CSS is used for colors, spacing, layouts, and animations.",
        "CSS makes websites look attractive and responsive."
      ]
    },
    {
      keywords: ["javascript", "js"],
      replies: [
        "JavaScript is used to make websites interactive.",
        "JavaScript handles logic, events, DOM manipulation, and dynamic content.",
        "JavaScript is one of the core technologies of web development."
      ]
    },
    {
      keywords: ["dbms", "database"],
      replies: [
        "DBMS stands for Database Management System. It is used to store, manage, and retrieve data.",
        "A DBMS helps organize data efficiently.",
        "Examples of DBMS are MySQL, Oracle, PostgreSQL, and SQL Server."
      ]
    },
    {
      keywords: ["sql"],
      replies: [
        "SQL stands for Structured Query Language.",
        "SQL is used to retrieve, insert, update, and delete data in relational databases.",
        "SQL is very important for working with databases."
      ]
    },
    {
      keywords: ["os", "operating system"],
      replies: [
        "An operating system manages hardware and software resources of a computer.",
        "Examples of operating systems are Windows, Linux, and macOS.",
        "The operating system acts as an interface between user and hardware."
      ]
    },
    {
      keywords: ["cn", "computer networks", "network"],
      replies: [
        "Computer Networks is the study of communication between connected devices.",
        "Networking involves protocols, routing, switching, and data transfer.",
        "A computer network allows devices to share data and resources."
      ]
    },
    {
      keywords: ["dsa", "data structures", "algorithm", "algorithms"],
      replies: [
        "DSA stands for Data Structures and Algorithms.",
        "Data structures organize data, and algorithms solve problems efficiently.",
        "DSA is very important for coding interviews and problem solving."
      ]
    },
    {
      keywords: ["oops", "oop", "object oriented programming"],
      replies: [
        "OOPS stands for Object-Oriented Programming System.",
        "The main OOPS concepts are class, object, inheritance, polymorphism, abstraction, and encapsulation.",
        "OOPS helps organize code in a reusable and modular way."
      ]
    },
    {
      keywords: ["mern"],
      replies: [
        "MERN stands for MongoDB, Express.js, React, and Node.js.",
        "MERN is a popular full-stack JavaScript technology stack.",
        "MERN helps build modern web applications using JavaScript for both frontend and backend."
      ]
    },
    {
      keywords: ["react,resources"],
      replies: [
        "React is a JavaScript library used for building user interfaces.",
        "React helps create reusable UI components.",
        "React is widely used for modern frontend web development."
      ]
    },
    {
      keywords: ["node", "nodejs", "node.js"],
      replies: [
        "Node.js allows JavaScript to run outside the browser.",
        "Node.js is commonly used for backend development.",
        "Node.js is fast and event-driven, making it useful for scalable applications."
      ]
    },
    {
      keywords: ["git"],
      replies: [
        "Git is a version control system used to track code changes.",
        "Git helps developers manage projects and collaborate easily.",
        "Common Git commands include git init, git add, git commit, and git push."
      ]
    },
    {
      keywords: ["github"],
      replies: [
        "GitHub is a platform used to host and manage Git repositories.",
        "GitHub is useful for collaboration, version control, and project deployment.",
        "You can use GitHub Pages to deploy static websites."
      ]
    },
    {
      keywords: ["resume"],
      replies: [
        "A resume should clearly show your skills, projects, education, and achievements.",
        "Add strong projects, relevant skills, and clean formatting to improve your resume.",
        "This chatbot project is a nice project to include on your resume."
      ]
    },
    {
      keywords: ["linkedin"],
      replies: [
        "LinkedIn is great for showcasing your projects, skills, and achievements.",
        "You can post this chatbot project on LinkedIn with screenshots and a live link.",
        "A good LinkedIn post should mention what you built, technologies used, and what you learned."
      ]
    },
    {
      keywords: ["interview"],
      replies: [
        "For interviews, focus on DSA, DBMS, OS, CN, OOPS, and projects.",
        "Practice coding, revise core subjects, and prepare project explanations for interviews.",
        "Mock interviews and aptitude practice can also help a lot."
      ]
    },
    {
      keywords: ["internship"],
      replies: [
        "To get an internship, build projects, improve coding skills, and apply consistently.",
        "A strong resume, LinkedIn profile, and project portfolio help a lot in internships.",
        "Practice DSA and CS core subjects for technical internship interviews."
      ]
    },
    {
      keywords: ["project"],
      replies: [
        "This is an interactive chatbot project built using HTML, CSS, and JavaScript.",
        "This project demonstrates frontend development, DOM manipulation, and chatbot logic.",
        "It is a rule-based chatbot with a modern user interface."
      ]
    },
    {
      keywords: ["time"],
      replies: [
        "Current time is " + new Date().toLocaleTimeString()
      ]
    },
    {
      keywords: ["date"],
      replies: [
        "Today's date is " + new Date().toLocaleDateString()
      ]
    },
    {
      keywords: ["thank you", "thanks"],
      replies: [
        `You're welcome, ${displayName}!`,
        `Glad to help, ${displayName}!`,
        `Anytime, ${displayName}!`
      ]
    },
    {
      keywords: ["fine", "good", "i am fine", "i'm fine"],
      replies: [
        `That’s great to hear, ${displayName}!`,
        `Nice, ${displayName}!`,
        `Awesome, ${displayName}!`
      ]
    },
    {
      keywords: ["sad", "not good", "bad"],
      replies: [
        `I’m sorry to hear that, ${displayName}. I hope things get better soon.`,
        `That sounds tough, ${displayName}. Take care of yourself.`,
        `Sending good vibes your way, ${displayName}.`
      ]
    },
    {
      keywords: ["bye", "goodbye"],
      replies: [
        `Goodbye ${displayName}! Have a wonderful day.`,
        `Bye ${displayName}! Take care.`,
        `See you again, ${displayName}!`
      ]
    }
  ];

  for (let item of knowledgeBase) {
    for (let keyword of item.keywords) {
      if (msg.includes(keyword)) {
        return randomReply(item.replies);
      }
    }
  }

  return `Sorry ${displayName}, I’m still learning. Try asking me about MERN, Java, Python, HTML, CSS, JavaScript, DBMS, SQL, OS, CN, DSA, OOPS, React, Node.js, Git, GitHub, resume, internship, date, or time.`;
}

function extractName(input) {
  const text = input.trim();

  const patterns = [
    /my name is\s+(.+)/i,
    /i am\s+(.+)/i,
    /i'm\s+(.+)/i,
    /im\s+(.+)/i,
    /this is\s+(.+)/i
  ];

  for (let pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return capitalizeName(match[1].trim());
    }
  }

  return capitalizeName(text);
}

function handleUserMessage(message) {
  if (isAskingName) {
    userName = extractName(message);
    isAskingName = false;
    localStorage.setItem("chatbotUserName", userName);
    return `Nice to meet you, ${userName}! You can ask me anything about programming, MERN, web development, projects, resume, internships, and more.`;
  }

  return getBotReply(message);
}

function sendMessage(customMessage = null) {
  const message = customMessage || userInput.value.trim();

  if (message === "") return;

  addMessage(message, "user");
  userInput.value = "";

  showTyping();

  setTimeout(() => {
    removeTyping();
    const botReply = handleUserMessage(message);
    addMessage(botReply, "bot");
  }, 800);
}

sendBtn.addEventListener("click", () => sendMessage());

userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

clearBtn.addEventListener("click", function () {
  userName = "";
  isAskingName = true;
  localStorage.removeItem("chatbotMessages");
  localStorage.removeItem("chatbotUserName");

  chatBox.innerHTML = `
    <div class="message-row bot-row">
      <div class="avatar">🤖</div>
      <div>
        <div class="message bot">
          Chat cleared. Hi! What is your name?
        </div>
        <div class="time">${getTime()}</div>
      </div>
    </div>
  `;

  saveChat();
});

suggestionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    sendMessage(button.textContent);
  });
});

window.addEventListener("load", function () {
  loadChat();
});