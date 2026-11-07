'use client';

import { useRef, useState } from 'react';
import { BookOpen, Check, Copy, ExternalLink, FileText, LoaderCircle, RotateCcw, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export type LabGuide = {
  title: string;
  repository: string;
  sourceUrl: string;
  markdown: string;
  files: Array<{ path: string; url: string }>;
};

type ConfigFile = { path: string; name: string; sourceUrl: string; content: string };

export function LabGuideWindow({ guide, mode, gatewayBase, onNavigate, onClose, onReset }: {
  guide: LabGuide;
  mode: 'popup' | 'split';
  gatewayBase: string;
  onNavigate: (url: string) => Promise<void>;
  onClose: () => void;
  onReset: () => void;
}) {
  const articleRef = useRef<HTMLElement>(null);
  const [configFile, setConfigFile] = useState<ConfigFile | null>(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileError, setFileError] = useState('');
  const [copied, setCopied] = useState(false);
  const resolveLink = (href = '') => { try { return new URL(href, guide.sourceUrl).toString(); } catch { return href; } };
  const isMarkdown = (url: string) => /\.md(?:[#?]|$)/i.test(url);
  const isConfig = (url: string) => /\.(?:conf|cfg|config|txt)(?:[#?]|$)/i.test(url);
  const openConfig = async (url: string) => {
    setFileLoading(true); setFileError(''); setCopied(false);
    try {
      const response = await fetch(`${gatewayBase}/api/github/file?url=${encodeURIComponent(url)}`, { credentials: 'include' });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message || 'Unable to open this configuration file.');
      setConfigFile(payload.data);
    } catch (error) {
      setFileError(error instanceof Error ? error.message : 'Unable to open this configuration file.');
    } finally { setFileLoading(false); }
  };
  const handleLink = (event: React.MouseEvent<HTMLAnchorElement>, href = '') => {
    if (href.startsWith('#')) {
      event.preventDefault();
      articleRef.current?.querySelector<HTMLElement>(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const resolved = resolveLink(href);
    if (isMarkdown(resolved)) { event.preventDefault(); void onNavigate(resolved); }
    else if (isConfig(resolved)) { event.preventDefault(); void openConfig(resolved); }
  };
  const copyAll = async () => {
    if (!configFile) return;
    await navigator.clipboard.writeText(configFile.content);
    setCopied(true); window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <section className={mode === 'split'
      ? 'absolute bottom-0 right-0 top-0 z-40 flex w-1/2 flex-col overflow-hidden border-l border-white/15 bg-[#0b1118]'
      : 'absolute bottom-4 right-4 top-4 z-40 flex w-[min(620px,calc(100%-2rem))] flex-col overflow-hidden rounded-lg border border-white/15 bg-[#0b1118]/97 shadow-2xl shadow-black/70 backdrop-blur'}>
      <header className="flex h-11 shrink-0 items-center gap-2 border-b border-white/10 px-3">
        <BookOpen className="size-4 text-[#55d68b]" />
        <div className="min-w-0"><b className="block truncate text-[11px] text-[#dce4ed]">{guide.title}</b><span className="block truncate text-[9px] text-[#657386]">{guide.repository}</span></div>
        <a href={guide.sourceUrl} target="_blank" rel="noreferrer" className="ml-auto flex items-center gap-1 rounded px-2 py-1 text-[9px] text-[#8392a5] hover:bg-white/5 hover:text-white">GitHub <ExternalLink className="size-3" /></a>
        <button onClick={onReset} className="flex items-center gap-1 rounded px-2 py-1 text-[9px] text-[#d47773] hover:bg-[#d95757]/10 hover:text-[#ff9691]" aria-label="Reset lab guide"><RotateCcw className="size-3" /> Reset Lab</button>
        <button onClick={onClose} className="text-[#718095] hover:text-white" aria-label="Close lab guide"><X className="size-4" /></button>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
        {fileLoading && <div className="mb-3 flex items-center gap-2 text-[10px] text-[#8fa0b2]"><LoaderCircle className="size-3 animate-spin" /> Opening file…</div>}
        {fileError && <p className="mb-3 rounded border border-red-400/20 bg-red-400/5 px-3 py-2 text-[10px] text-[#ff9691]">{fileError}</p>}
        <article ref={articleRef} className="lab-markdown text-[12px] leading-6 text-[#c5cfda]">
          <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml components={{
            a: ({ href, children }) => <a href={resolveLink(href)} onClick={(event) => handleLink(event, href)} target={href?.startsWith('#') ? undefined : '_blank'} rel="noreferrer" className="text-[#62d993] underline decoration-[#62d993]/35 underline-offset-2">{children}</a>,
            h1: ({ children }) => <h1 className="mb-4 border-b border-white/10 pb-3 text-xl font-bold text-white">{children}</h1>,
            h2: ({ children }) => <h2 className="mb-2 mt-7 text-base font-bold text-[#e4ebf3]">{children}</h2>,
            h3: ({ children }) => <h3 className="mb-2 mt-5 text-sm font-bold text-[#d6e0ea]">{children}</h3>,
            p: ({ children }) => <p className="mb-3">{children}</p>,
            ul: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-5">{children}</ul>,
            ol: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-5">{children}</ol>,
            blockquote: ({ children }) => <blockquote className="my-4 border-l-2 border-[#55d68b] bg-[#55d68b]/5 px-4 py-2 text-[#aebbc9]">{children}</blockquote>,
            code: ({ children, className }) => className ? <code className={`${className} block overflow-x-auto rounded-md border border-white/10 bg-[#06090d] p-3 font-mono text-[11px] text-[#cfe6d7]`}>{children}</code> : <code className="rounded bg-white/[.07] px-1.5 py-0.5 font-mono text-[11px] text-[#cfe6d7]">{children}</code>,
            table: ({ children }) => <div className="my-4 overflow-x-auto"><table className="w-full border-collapse text-left text-[11px]">{children}</table></div>,
            th: ({ children }) => <th className="border border-white/10 bg-white/[.04] px-2 py-1.5 text-[#e2e8ef]">{children}</th>,
            td: ({ children }) => <td className="border border-white/10 px-2 py-1.5">{children}</td>, img: () => null,
          }}>{guide.markdown}</ReactMarkdown>
        </article>
        {guide.files.length > 0 && <section className="mt-8 border-t border-white/10 pt-5">
          <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8f9dad]"><FileText className="size-4" /> Configuration files ({guide.files.length})</h2>
          <div className="grid gap-1.5">{guide.files.map((file) => <button key={file.path} onClick={() => void openConfig(file.url)} className="flex items-center gap-2 rounded border border-white/[.07] bg-[#080d12] px-3 py-2 text-left font-mono text-[10px] text-[#9fabb9] hover:border-[#55d68b]/30 hover:text-[#dce5ee]"><FileText className="size-3 shrink-0 text-[#55d68b]" /><span className="truncate">{file.path}</span><ExternalLink className="ml-auto size-3 shrink-0" /></button>)}</div>
        </section>}
      </div>
      {configFile && <section className="absolute inset-5 z-[70] flex flex-col overflow-hidden rounded-lg border border-white/20 bg-[#080d12] shadow-2xl shadow-black">
        <header className="flex h-11 shrink-0 items-center gap-2 border-b border-white/10 px-3">
          <FileText className="size-4 text-[#55d68b]" /><div className="min-w-0"><b className="block truncate text-[11px] text-white">{configFile.name}</b><span className="block truncate text-[9px] text-[#657386]">{configFile.path}</span></div>
          <button onClick={() => void copyAll()} className="ml-auto flex items-center gap-1 rounded border border-white/10 px-2 py-1 text-[9px] text-[#aebac7] hover:border-[#55d68b]/40 hover:text-white">{copied ? <Check className="size-3 text-[#55d68b]" /> : <Copy className="size-3" />}{copied ? 'Copied' : 'Copy all'}</button>
          <a href={configFile.sourceUrl} target="_blank" rel="noreferrer" className="rounded px-2 py-1 text-[9px] text-[#8392a5] hover:text-white">GitHub</a><button onClick={() => setConfigFile(null)} className="text-[#718095] hover:text-white" aria-label="Close configuration file"><X className="size-4" /></button>
        </header>
        <pre className="min-h-0 flex-1 select-text overflow-auto whitespace-pre p-4 font-mono text-[11px] leading-5 text-[#cfe6d7]"><code>{configFile.content}</code></pre>
      </section>}
    </section>
  );
}
