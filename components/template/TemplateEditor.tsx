interface TemplateEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export function TemplateEditor({ value, onChange }: TemplateEditorProps) {
    const exampleTemplate = `Head & Neck:
-

Torso:
-

Extremities:
-`;

    return (
        <div className="flex-1 flex flex-col min-h-[300px]">
            <textarea
                className="flex-1 w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-zinc-300 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-shadow placeholder:text-zinc-600 shadow-inner"
                placeholder={exampleTemplate}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                spellCheck={false}
            />
        </div>
    );
}
