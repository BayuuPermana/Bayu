import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
    children: React.ReactNode;
    className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
    const [copied, setCopied] = useState(false);
    
    // Extract language from className (e.g., 'language-javascript')
    const language = className ? className.replace(/language-/, '') : '';
    
    const onCopy = () => {
        const text = React.Children.toArray(children).join('');
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="relative group/code my-6">
            <div className="absolute right-3 top-3 z-10">
                <button
                    onClick={onCopy}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all backdrop-blur-sm"
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
                <div className="absolute left-4 -top-3 px-2 py-0.5 rounded-md bg-gray-200 dark:bg-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-white/10 z-10">
                    {language}
                </div>
            )}
            <pre className={`!mt-0 !mb-0 rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden ${className}`}>
                <code className={className}>
                    {children}
                </code>
            </pre>
        </div>
    );
};

export default CodeBlock;
