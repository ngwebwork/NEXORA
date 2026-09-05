import { Github, Linkedin, MessageCircle, Twitter } from 'lucide-react';

const LINK_GROUPS = [
  {
    title: 'Platform',
    links: ['Markets', 'Analytics', 'Ecosystem', 'About'],
  },
];

const SOCIALS = [
  { icon: Twitter, label: 'X' },
  { icon: MessageCircle, label: 'Discord' },
  { icon: Github, label: 'GitHub' },
  { icon: Linkedin, label: 'LinkedIn' },
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
                  <Icon size={15} />
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
