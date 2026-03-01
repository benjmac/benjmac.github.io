import React from 'react';

type Layout = 'mobile' | 'desktop';

const URL_REGEX = /https?:\/\/[^\s]+/g;

export function getTextContent(
  content:
    | ReadonlyArray<{type: string; [key: string]: unknown}>
    | null
    | undefined,
): string {
  if (!content) return '';
  return content
    .filter((p) => p.type === 'text')
    .map((p) => (p as {type: 'text'; text: string}).text)
    .join('');
}

export function extractUrls(
  content:
    | ReadonlyArray<{type: string; [key: string]: unknown}>
    | null
    | undefined,
): string[] {
  const text = getTextContent(content);
  const matches = text.match(URL_REGEX) ?? [];
  const cleaned = matches.map((u) => u.replace(/[.,;!?)"']+$/, ''));
  return [...new Set(cleaned)];
}

export function stripUrls(text: string): string {
  return text
    .split('\n')
    .filter((line) => !line.trim().match(/^https?:\/\/\S+$/))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

interface LinkCardProps {
  url: string;
  layout: Layout;
}

export const LinkCard: React.FC<LinkCardProps> = ({url, layout}) => {
  let hostname = url;
  try {
    hostname = new URL(url).hostname;
  } catch {
    // fall through — use raw url as label
  }

  const label = hostname.replace(/^www\./, '');

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`tw-flex tw-items-center tw-gap-2 tw-bg-white/[0.06] tw-border tw-border-white/[0.08] tw-rounded-xl tw-no-underline tw-transition-colors tw-duration-150 hover:tw-bg-white/[0.1] hover:tw-border-white/[0.15] tw-overflow-hidden ${layout === 'mobile' ? 'tw-px-3.5 tw-py-2.5' : 'tw-px-3 tw-py-2'}`}
    >
      <img
        src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=32`}
        alt=""
        className="tw-w-4 tw-h-4 tw-rounded-sm tw-shrink-0"
      />
      <span
        className={`tw-text-white/70 tw-truncate ${layout === 'mobile' ? 'tw-text-[15px]' : 'tw-text-[12px]'}`}
      >
        {label}
      </span>
    </a>
  );
};
