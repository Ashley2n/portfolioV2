import { LucideProps } from "lucide-react";

export interface NavLink {
  path: string;
  label: string;
}

export const headerLinks: NavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Project' },
  { path: '/contact', label: 'Contact' },
];

export interface footerLink{
  path: string;
  label: string;
  icon: string;
}

export const footerLinks: footerLink[] = [
  {
    path: 'https://www.linkedin.com/in/ashley-abongwa-1567822b2/',
    label: 'Linkedin',
    icon: '/icons/linkedin.svg'
  },
  {
    path:'https://instagram.com',
    label:'Instagram',
    icon: '/icons/instagram.svg'
  },
  {
    path: "https://open.spotify.com/playlist/37i9dQZF1DX2UgsUIg75Vg",
    label: "Spotify",
    icon: "/icons/list-music.svg"
  },
  {
    path: "https://facebook.com",
    label: "Facebook",
    icon: "/icons/facebook.svg"
  }
]