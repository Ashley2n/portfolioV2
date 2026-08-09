import {SiFacebook, SiGithub, SiIndeed, SiInstagram, SiSpotify} from "@icons-pack/react-simple-icons"

export interface NavLink {
  path: string;
  label: string;
}

export const headerLinks: NavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Project' },
  { path: '/contact', label: 'Contact' },
  { path: '/', label: 'Resume' },
];

export interface FooterLink {
  path: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

export const footerLinks: FooterLink[] = [
  {
    path: "https://www.linkedin.com/in/ashley-abongwa-1567822b2/",
    label: "LinkedIn",
    icon: SiIndeed,
    color: "group-hover:text-[#0A66C2]",
  },
  {
    path: "https://github.com/ashley2n",
    label: "GitHub",
    icon: SiGithub,
    color: "group-hover:text-[#FFFFFF]",
  },
  {
    path: "https://instagram.com",
    label: "Instagram",
    icon: SiInstagram,
    color: "group-hover:text-[#E4405F]",
  },
  {
    path: "https://open.spotify.com/playlist/37i9dQZF1DX2UgsUIg75Vg",
    label: "Spotify",
    icon: SiSpotify,
    color: "group-hover:text-[#1DB954]",
  },
  {
    path: "https://facebook.com",
    label: "Facebook",
    icon: SiFacebook,
    color: "group-hover:text-[#1877F2]",
  },
];