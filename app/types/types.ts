export type TextFlipButtonProps = {
  text: string;
};

export type aboutType = {
  title: string;
  imageUrl: string;
  description: string;
  size: "small" | "medium" | "large";
};

export type ProjectCardType = {
  title: string;
  subtext: string;
  skills: projectSkillType[];
  imageUrl: string;
  githubUrl: string;
};

type projectSkillType = {
  name:
    | "React"
    | "Tailwind"
    | "Python"
    | "Java"
    | ".Net"
    | "HTML"
    | "CSS"
    | "Flask"
    | "C#";

  imageUrl?: string;
  color?: string;
};

export type TruncatedTextType = {
  text: string;
  maxWords: number;
};


export type FAQSetType = {
  Question: string,
  Answer: string
}

export type TechStackType = {
  name: string;
  usage: string;
  imageURL: string;
  externalURL: string;  
}