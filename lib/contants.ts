import {
    aboutType,
    FAQSetType,
    ProjectCardType,
    TechStackType,
} from "@/app/types/types";

export const aboutData: aboutType[] = [
    {
        title: "Health",
        description:
            "One of my big goals is to work on my physique! I’m not aiming for a specific look, but I definitely want to be lean, strong, and healthy. It’s all about feeling good and being my best self!",
        size: "medium",
        imageUrl: "/images/bg2.jpg",
    },
    {
        title: "Entertainment",
        description:
            "Occasionally, I enjoy watching TV shows and movies. Personally, thrillers and supernatural series are my favorite genres. If I ever had the chance, I believe I would be the coldest vampire to ever exist.",
        size: "small",
        imageUrl: "/images/bg2.jpg",
    },
    {
        title: "Music",
        description:
            "While it's nothing special, I enjoy listening to music. My top three artists are Drake (Drizzy), Tory Lanez, and Brent Faiyaz, in no specific order. These three artists rarely have any misses.",
        size: "small",
        imageUrl: "/images/bg2.jpg",
    },
    {
        title: "Cooking",
        description:
            "I absolutely love cooking whenever I have some free time! There's something special about African and Asian cuisine that really excites me. They offer such a fantastic combination of flavors, and they’re perfect for someone like me who likes to stay active.",
        size: "medium",
        imageUrl: "/images/bg2.jpg",
    },
];

export const aboutMeMainSec = {
    title: "Full Stack Engineer",

    description:
        "Iam Ashley Abongwa, Iam a software Engineer seeking for an opportunity in the industry. Iam currently a student at Indian Hills Community College working towards a degree in Software development",
    size: "small",
    imageUrl: "/images/bg2.jpg",
};

export const tagOptions = {
    Java: {
        name: "Java",
        imgaeUrl: "/icons/icons8-java.svg",
        color: "#e56e00",
    },
    React: {
        name: "React",
        imgaeUrl: "/icons/icons8-react-40.png",
        color: "#2196f3",
    },
    Tailwind: {
        name: "Tailwind",
        imgaeUrl: "/icons/icons8-tailwind-css-48.png",
        color: "#07b6d3",
    },
    Python: {
        name: "Python",
        imgaeUrl: "/icons/icons8-python-48.png",
        color: "#366c99",
    },
    Dotnet: {
        name: ".Net",
        imgaeUrl: "/icons/icons8-.net-framework-48.png",
        color: "#5d2d92",
    },
    HTML: {
        name: "HTML",
        imgaeUrl: "/icons/icons8-html-48.png",
        color: "#f06629",
    },
    CSS: {
        name: "CSS",
        imgaeUrl: "/icons/icons8-css3-48.png",
        color: "#3fa4e4",
    },
    Flask: {
        name: "Flask",
        imgaeUrl: "/icons/icons8-flask-50.png",
        color: "#1c1c1d",
    },
    CSharp: {
        name: "C#",
        imgaeUrl: "/icons/icons8-c-sharp-logo-48.png",
        color: "#9a4a92",
    },
    Azure: {
        name: "Azure",
        imgaeUrl: "/icons/Azure.svg",
        color: "#fff",
    },
    GitHub: {
        name: "GitHub",
        imgaeUrl: "/icons/github.png",
        color: "#fff",
    },
};

export const projectData: ProjectCardType[] = [
    {
        title: "Instagram Redesign",
        imageUrl: "/insta2.png",
        subtext:
            "A redesign Instragram apllication allow users to access many more features than the current instagram",
        skills: [
            {
                name: "Flask",
                imageUrl: tagOptions.Flask.imgaeUrl,
                color: tagOptions.Flask.color,
            },
            {
                name: "React",
                imageUrl: tagOptions.React.imgaeUrl,
                color: tagOptions.React.color,
            },
            {
                name: "Tailwind",
                imageUrl: tagOptions.Tailwind.imgaeUrl,
                color: tagOptions.Tailwind.color,
            },
        ],
        githubUrl: "https://github.com/Ashley2n/InstagramRedesignApp",
    },
    {
        title: "Movie API",
        imageUrl: "/movieapi.png",
        subtext: "Java API Service that provides Movies Data",
        skills: [
            {
                name: "Java",
                imageUrl: tagOptions.Java.imgaeUrl,
                color: tagOptions.Java.color,
            },
            {
                name: "React",
                imageUrl: tagOptions.React.imgaeUrl,
                color: tagOptions.React.color,
            },
            {
                name: "Tailwind",
                imageUrl: tagOptions.Tailwind.imgaeUrl,
                color: tagOptions.Tailwind.color,
            },
        ],
        githubUrl: "https://github.com/Ashley2n/SpringBotMovieAPI",
    },
    {
        title: "Stock App",
        imageUrl: "/blackPlaceholder.png",
        subtext:
            "FullStack .Net Application allowing you to view Stock Information",
        skills: [
            {
                name: "C#",
                imageUrl: tagOptions.CSharp.imgaeUrl,
                color: tagOptions.CSharp.color,
            },
            {
                name: ".Net",
                imageUrl: tagOptions.Dotnet.imgaeUrl,
                color: tagOptions.Dotnet.color,
            },
            {
                name: "CSS",
                imageUrl: tagOptions.CSS.imgaeUrl,
                color: tagOptions.CSS.color,
            },
            {
                name: "HTML",
                imageUrl: tagOptions.HTML.imgaeUrl,
                color: tagOptions.HTML.color,
            },
        ],
        githubUrl: "https://github.com/Ashley2n/StockAppV2",
    },
    {
        title: "Bank Boutique",
        imageUrl: "/blackPlaceholder.png",
        subtext:
            "Simple java Flask application allowing user to manage and organize their Student Systems",
        skills: [
            {
                name: "Python",
                imageUrl: tagOptions.Python.imgaeUrl,
                color: tagOptions.Python.color,
            },
            {
                name: "Flask",
                imageUrl: tagOptions.Flask.imgaeUrl,
                color: tagOptions.Flask.color,
            },
            {
                name: "HTML",
                imageUrl: tagOptions.HTML.imgaeUrl,
                color: tagOptions.HTML.color,
            },
            {
                name: "CSS",
                imageUrl: tagOptions.CSS.imgaeUrl,
                color: tagOptions.CSS.color,
            },
        ],
        githubUrl: "https://github.com/Ashley2n/BankBoutique",
    },
];

export const HomePagePorjectData = projectData.slice(1, 4);

export const FAQSet: FAQSetType[] = [
    {
        Question: "Do you have professional software development experience?",
        Answer:
            "Yes. While I am early in my professional career, I have worked on both academic and real-world projects. My experience includes developing applications during my Software Development degree program and collaborating with clients to deliver functional solutions. These projects have allowed me to apply industry practices such as version control, requirements gathering, testing, debugging, and deployment.",
    },
    {
        Question: "Can you work as part of a team?",
        Answer:
            "Absolutely. Software development is a collaborative field, and I have experience working in team environments through coursework and project collaborations. I am familiar with Git workflows, code reviews, project management tools, and communicating technical concepts effectively.",
    },
    {
        Question: "Do you only work on web applications?",
        Answer:
            "No. While web development is my primary focus, the principles of software engineering apply across many domains. I am open to learning and working with different technologies and platforms depending on project needs.",
    },
    {
        Question: "How do you handle challenges during development?",
        Answer: `Challenges are a normal part of software development. When I encounter a problem, I;\n

\t * Research the issue thoroughly.\n
\t * Review documentation.\n
\t * Test potential solutions.\n
\t * Seek guidance from trusted resources when necessary.\n
\t * Document findings for future reference.\n`,
    },
    {
        Question: "What are your long-term career goals?",
        Answer:
            "My goal is to continue growing as a software developer, contribute to meaningful projects, and deepen my expertise in full-stack development, cloud technologies, and software architecture. I am committed to lifelong learning and continuous improvement.",
    },
    {
        Question: "How do you stay current with technology?",
        Answer:
            "I regularly follow industry news, technical blogs, official documentation, developer communities, and emerging technologies. I also build personal projects to gain hands-on experience with new tools and frameworks.",
    },
    {
        Question: "What makes you different from other junior developers?",
        Answer:
            "I combine formal education, lifelong interest in technology, practical project experience, and a commitment to continuous learning. I enjoy understanding both the technical and business sides of software development, allowing me to focus on solutions that create real value.",
    },
    {
        Question: "Can you work independently?",
        Answer:
            "Yes. Many of my projects required self-management, research, planning, and implementation from start to finish. I am comfortable breaking down complex problems into manageable tasks and seeking clarification when needed.",
    },
];

export const TechStackData: TechStackType[] = [
    {
        name: tagOptions.React.name,
        usage: "Frontend",
        imageURL: tagOptions.React.imgaeUrl,
        externalURL: "https://react.dev/",
    },
    {
        name: tagOptions.Python.name,
        usage: "Backend",
        imageURL: tagOptions.Python.imgaeUrl,
        externalURL: "https://www.python.org/",
    },
    {
        name: tagOptions.Flask.name,
        usage: "FullStack",
        imageURL: tagOptions.Flask.imgaeUrl,
        externalURL: "https://flask.palletsprojects.com/en/stable/",
    },
    {
        name: tagOptions.CSharp.name,
        usage: "FullStack",
        imageURL: tagOptions.CSharp.imgaeUrl,
        externalURL: "https://dotnet.microsoft.com/en-us/download",
    },
    {
        name: tagOptions.GitHub.name,
        usage: "Version Control",
        imageURL: tagOptions.GitHub.imgaeUrl,
        externalURL: "https://github.com/",
    },
    {
        name: tagOptions.Azure.name,
        usage: "Cloud",
        imageURL: tagOptions.Azure.imgaeUrl,
        externalURL: "https://azure.microsoft.com/en-us",
    },
];

