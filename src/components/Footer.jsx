const LINK_GROUPS = [
  {
    title: 'Platform',
    links: ['Markets', 'Analytics', 'Ecosystem', 'About'],
  },
];

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.24 2.5h3.3l-7.2 8.23 8.47 11.27h-6.63l-5.2-6.8-5.94 6.8H1.72l7.7-8.8L1.3 2.5h6.8l4.7 6.22L18.24 2.5Zm-1.16 17.6h1.83L7.03 4.3H5.06l12.02 15.8Z" />
    </svg>
  );
}

function DiscordIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.3 5.4A17.6 17.6 0 0 0 15.9 4l-.23.42a13 13 0 0 1 3.8 1.5 14.9 14.9 0 0 0-13.06 0 13 13 0 0 1 3.86-1.53L10 4a17.6 17.6 0 0 0-4.4 1.4C2.9 9.3 2.1 13.1 2.4 16.85a17.7 17.7 0 0 0 5.4 2.75l.86-1.4a11.4 11.4 0 0 1-1.86-.9c.16-.12.31-.24.46-.37a12.6 12.6 0 0 0 10.5 0c.15.13.3.25.46.37-.59.35-1.21.65-1.87.9l.86 1.4a17.6 17.6 0 0 0 5.4-2.75c.36-4.36-.73-8.12-3.31-11.45ZM9.68 14.6c-.98 0-1.78-.9-1.78-2s.79-2 1.78-2 1.8.91 1.78 2c0 1.1-.79 2-1.78 2Zm5.64 0c-.98 0-1.78-.9-1.78-2s.79-2 1.78-2 1.79.91 1.78 2c0 1.1-.78 2-1.78 2Z" />
    </svg>
  );
}

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.69-.1-.26-.45-1.29.1-2.68 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.9-1.3 2.75-1.03 2.75-1.03.55 1.39.2 2.42.1 2.68.64.7 1.03 1.59 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 5a2 2 0 1 1-4-.02 2 2 0 0 1 4 .02ZM3.2 8.75h3.5V21H3.2V8.75Zm6.2 0h3.36v1.68h.05c.47-.88 1.6-1.8 3.3-1.8 3.53 0 4.18 2.32 4.18 5.34V21h-3.5v-5.55c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.93V21H9.4V8.75Z" />
    </svg>
  );
}

const SOCIALS = [
  { icon: XIcon, label: 'X' },
  { icon: DiscordIcon, label: 'Discord' },
  { icon: GitHubIcon, label: 'GitHub' },
  { icon: LinkedInIcon, label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-void">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="max-w-xs">
            <p className="font-display text-xl font-semibold tracking-[0.2em] text-white">
              NEX<span className="text-cyan">ORA</span>
            </p>
            <p className="mt-3 text-sm text-white/40">The Future of Digital Assets.</p>

            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-cyan/40 hover:text-cyan"
                >
                  <Icon width={15} height={15} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-16">
            {LINK_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">{group.title}</p>
                <ul className="flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link}>
                      <button className="text-sm text-white/60 transition-colors hover:text-white">{link}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 text-center text-xs text-white/30">
          © 2026 NEXORA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
