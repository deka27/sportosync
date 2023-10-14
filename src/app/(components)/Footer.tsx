import React from 'react';
import Image from 'next/image';
import {BsFacebook} from 'react-icons/bs';
import {BsInstagram} from 'react-icons/bs';
import {BsTwitter} from 'react-icons/bs';

// SocialLink component
const SocialLink = ({ href, label, icon }:any) => (
  <a
    href={href}
    rel="noreferrer"
    target="_blank"
    className="text-gray-700 transition hover:opacity-75"
    aria-label={label}
  >
    {icon}
  </a>
);

// FooterLinks component for lists of links (unchanged)
const FooterLinks = ({ title, links }:any) => (
  <div>
    <p className="font-medium text-gray-600">{title}</p>
    <ul className="mt-6 space-y-4 text-sm">
      {links.map((link:any, index:any) => (
        <li key={index}>
          <a href={link.href} className="text-gray-400 transition hover:opacity-75 no-underline">
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// Services component
const Services = () => {
  const servicesLinks = [
    { href: '#', text: 'Home' },
    { href: '#', text: 'About' },
    { href: '#', text: 'Live Matches' },
    { href: '#', text: 'All Matches' },
    { href: '#', text: 'All Teams' },
  ];

  return <FooterLinks title="Links" links={servicesLinks} />;
};

// Company component
const Company = () => {
  const companyLinks = [
    { href: '#', text: 'Admin Panel' },
    { href: '#', text: 'Meet the Team' },
    { href: '#', text: 'Modubix' },
  ];

  return <FooterLinks title="Extra" links={companyLinks} />;
};

export default function Footer() {
  // Define your social media links here
  const socialLinks = [
    {
      href: 'https://www.facebook.com/example',
      label: 'Facebook',
      icon: (
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <BsFacebook/>
        </svg>
      ),
    },
    {
      href: 'https://www.instagram.com/example',
      label: 'Instagram',
      icon: (
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <BsInstagram/>
        </svg>
      ),
    },
    {
      href: 'https://twitter.com/example',
      label: 'Twitter',
      icon: (
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <BsTwitter/>
        </svg>
      ),
    },
    
  ];

  return (
    <footer className="bg-gradient-to-b from-[#000423] to-[black] lg:grid lg:grid-cols-5">
      <div className="relative block h-32 lg:col-span-2 lg:h-full">
        <Image
          src="https://source.unsplash.com/3_JwPJwq6CI"
          alt=""
          width={1500}
          height={1500}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <p>
              <span className="text-xs uppercase tracking-wide text-gray-500">
                Call us
              </span>
              <a
                href="#"
                className="block text-2xl font-medium text-gray-400 hover:opacity-75 sm:text-3xl no-underline"
              >
                0123456789
              </a>
            </p>

            <ul className="mt-8 space-y-1 text-sm text-gray-400">
              <li>Monday to Friday: 10am - 5pm</li>
              <li>Weekend: 10am - 3pm</li>
            </ul>

            <ul className="mt-8 flex gap-6">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <SocialLink {...link} />
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">          
            <Services />
            <Company />
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-12">
          <div className="sm:flex sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-4 text-xs">
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition hover:opacity-75 no-underline"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition hover:opacity-75 no-underline"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition hover:opacity-75 no-underline"
                >
                  Cookies
                </a>
              </li>
            </ul>

            <p className="mt-8 text-sm text-gray-400 sm:mt-0">
              &copy; 2023. Powered by Modubix. ⚡
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
