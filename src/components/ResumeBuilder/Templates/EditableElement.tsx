import { useState, useRef, useEffect } from 'react';

interface EditableElementProps {
    value: string;
    onChange: (newValue: string) => void;
    tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
    className?: string;
    placeholder?: string;
    multiline?: boolean;
}

const EditableElement = ({
    value,
    onChange,
    tagName = 'p',
    className = '',
    placeholder = 'Click to edit',
    multiline = false
}: EditableElementProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleBlur = () => {
        setIsEditing(false);
        if (localValue !== value) {
            onChange(localValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !multiline) {
            e.preventDefault();
            inputRef.current?.blur();
        }
    };

    const Tag = tagName as any;

    return (
        <Tag
            ref={inputRef}
            contentEditable
            suppressContentEditableWarning
            className={`${className} ${isEditing ? 'outline-none ring-2 ring-purple-500/50 rounded bg-purple-50/10' : 'hover:outline-dashed hover:outline-1 hover:outline-gray-400 cursor-text'}`}
            onFocus={() => setIsEditing(true)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onInput={(e: React.FormEvent<HTMLElement>) => setLocalValue(e.currentTarget.textContent || '')}
        >
            {value || placeholder}
        </Tag>
    );
};

export default EditableElement;
