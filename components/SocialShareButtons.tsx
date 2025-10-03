import React from 'react';

interface SocialShareButtonsProps {
  shareUrl: string;
  title: string;
  description: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ shareUrl, title, description }) => {
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      href: shareLinks.facebook,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" />
        </svg>
      ),
      className: 'bg-[#1877F2] hover:bg-[#166fe5]',
    },
    {
      name: 'Twitter',
      href: shareLinks.twitter,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.791 4.649-.69.188-1.423.23-2.164.083.608 1.881 2.373 3.256 4.465 3.293-1.786 1.4-4.033 2.24-6.467 2.24-.42 0-.834-.025-1.242-.073 2.3 1.468 5.041 2.321 8.016 2.321 9.584 0 14.822-7.82 14.5-14.636.993-.715 1.85-1.611 2.536-2.625z" />
        </svg>
      ),
      className: 'bg-[#1DA1F2] hover:bg-[#1a91da]',
    },
    {
      name: 'LinkedIn',
      href: shareLinks.linkedin,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </svg>
      ),
      className: 'bg-[#0077B5] hover:bg-[#00669c]',
    },
  ];

  return (
    <div className="flex justify-center items-center gap-4">
      {socialPlatforms.map(platform => (
        <a
          key={platform.name}
          href={platform.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${platform.name}`}
          className={`text-white p-3 rounded-full flex items-center justify-center transition-colors duration-300 ${platform.className}`}
        >
          {platform.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialShareButtons;
