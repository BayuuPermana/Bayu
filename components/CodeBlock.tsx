import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
    children: React.ReactNode;
    className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
    const [copied, setCopied] = useState(false);

    // Extract language from className (e.g., 'language-javascript')
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';

    const onCopy = () => {
        const text = String(children).replace(/\n$/, '');
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="relative group/code my-6">
            <div className="absolute right-3 top-3 z-10 transition-opacity opacity-0 group-hover/code:opacity-100">
                <button
                    onClick={onCopy}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all backdrop-blur-sm"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <>
                            <Check size={14} className="text-green-500" />
                            <span className="text-green-500">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy size={14} />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            {language && (
                <div className="absolute left-4 -top-3 px-2 py-0.5 rounded-md bg-gray-200 dark:bg-zinc-800 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-zinc-700 z-10 shadow-sm">
                    {language}
                </div>
            )}
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden text-sm">
                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        backgroundColor: '#1E1E1E', // VS Code Dark background
                    }}
                    wrapLines={true}
                    showLineNumbers={false} // Clean look by default
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeBlock;
