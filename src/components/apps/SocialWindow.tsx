'use client';

const SOCIAL_LINKS = [
  {
    icon: '🐙',
    name: 'GitHub',
    handle: '@yourusername',
    description: 'My open source projects and contributions',
    href: 'https://github.com/yourusername',
    color: 'bg-gray-800 hover:bg-gray-700',
    textColor: 'text-white',
  },
  {
    icon: '💼',
    name: 'LinkedIn',
    handle: 'Your Name',
    description: 'Professional profile and work history',
    href: 'https://linkedin.com/in/yourprofile',
    color: 'bg-blue-700 hover:bg-blue-600',
    textColor: 'text-white',
  },
  {
    icon: '🐦',
    name: 'Twitter / X',
    handle: '@yourhandle',
    description: 'Thoughts on web dev and tech',
    href: 'https://twitter.com/yourhandle',
    color: 'bg-sky-500 hover:bg-sky-400',
    textColor: 'text-white',
  },
  {
    icon: '📧',
    name: 'Email',
    handle: 'your.email@example.com',
    description: 'Reach me directly',
    href: 'mailto:your.email@example.com',
    color: 'bg-red-500 hover:bg-red-400',
    textColor: 'text-white',
  },
  {
    icon: '📺',
    name: 'YouTube',
    handle: '@yourchannel',
    description: 'Tutorials and dev content',
    href: 'https://youtube.com/@yourchannel',
    color: 'bg-red-600 hover:bg-red-500',
    textColor: 'text-white',
  },
  {
    icon: '💬',
    name: 'Discord',
    handle: 'yourname#0000',
    description: 'Chat with me on Discord',
    href: '#',
    color: 'bg-indigo-600 hover:bg-indigo-500',
    textColor: 'text-white',
  },
];

export default function SocialWindow() {
  return (
    <div className="h-full overflow-y-auto bg-[#ECE9D8] p-4 space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">🔗</span>
        <h2 className="text-sm font-bold text-gray-800">Social Links</h2>
      </div>

      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-3 p-3 rounded shadow-sm transition-colors ${link.color} ${link.textColor}`}
        >
          <span className="text-2xl">{link.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold">{link.name}</p>
            <p className="text-xs opacity-90">{link.handle}</p>
            <p className="text-xs opacity-75 truncate">{link.description}</p>
          </div>
          <span className="text-lg opacity-70">→</span>
        </a>
      ))}
    </div>
  );
}
