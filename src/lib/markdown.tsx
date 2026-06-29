import type { ReactNode } from 'react';

function inlineMarkdown(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`|[^\s@]+@[^\s@]+\.[^\s@]+)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**')) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i}`} className="font-bold text-white">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith('[')) {
      const linkMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(token);
      if (linkMatch) {
        const href = linkMatch[2];
        const external = href.startsWith('http');
        nodes.push(
          <a
            key={`${keyPrefix}-a-${i}`}
            href={href}
            className="text-trtkat-blue hover:text-white underline-offset-2 hover:underline"
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {linkMatch[1]}
          </a>,
        );
      }
    } else if (token.startsWith('`')) {
      nodes.push(
        <code key={`${keyPrefix}-c-${i}`} className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-trtkat-pink">
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.includes('@')) {
      nodes.push(
        <a
          key={`${keyPrefix}-e-${i}`}
          href={`mailto:${token}`}
          className="text-trtkat-blue hover:text-white underline-offset-2 hover:underline"
        >
          {token}
        </a>,
      );
    }
    lastIndex = match.index + token.length;
    i += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length ? nodes : [text];
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function isTableSeparator(line: string): boolean {
  return /^\|?[\s:-]+\|[\s|:-]+\|?$/.test(line.trim());
}

export function MarkdownContent({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks: ReactNode[] = [];
  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (trimmed.startsWith('# ')) {
      blocks.push(
        <h1 key={blockKey++} className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
          {trimmed.slice(2)}
        </h1>,
      );
      i += 1;
      continue;
    }

    if (trimmed.startsWith('## ')) {
      blocks.push(
        <h2 key={blockKey++} className="text-xl sm:text-2xl font-black text-white mt-10 mb-3 first:mt-0">
          {trimmed.slice(3)}
        </h2>,
      );
      i += 1;
      continue;
    }

    if (trimmed.startsWith('### ')) {
      blocks.push(
        <h3 key={blockKey++} className="text-lg font-black text-white mt-6 mb-2">
          {trimmed.slice(4)}
        </h3>,
      );
      i += 1;
      continue;
    }

    if (trimmed.startsWith('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const header = parseTableRow(trimmed);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rows.push(parseTableRow(lines[i]));
        i += 1;
      }
      blocks.push(
        <div key={blockKey++} className="my-6 overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                {header.map((cell) => (
                  <th key={cell} className="px-4 py-3 text-left font-bold text-white">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-white/5 last:border-0">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3 text-slate-300 align-top">
                      {inlineMarkdown(cell, `t-${blockKey}-${rowIndex}-${cellIndex}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (trimmed.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2));
        i += 1;
      }
      blocks.push(
        <ul key={blockKey++} className="my-4 list-disc space-y-2 pl-6 text-slate-300">
          {items.map((item, itemIndex) => (
            <li key={itemIndex} className="leading-relaxed">
              {inlineMarkdown(item, `li-${blockKey}-${itemIndex}`)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    const paragraphLines: string[] = [trimmed];
    i += 1;
    while (i < lines.length) {
      const next = lines[i].trim();
      if (!next || next.startsWith('#') || next.startsWith('- ') || next.startsWith('|')) break;
      paragraphLines.push(next);
      i += 1;
    }

    blocks.push(
      <p key={blockKey++} className="text-slate-300 leading-relaxed mb-4">
        {inlineMarkdown(paragraphLines.join(' '), `p-${blockKey}`)}
      </p>,
    );
  }

  return <div className="legal-markdown">{blocks}</div>;
}
