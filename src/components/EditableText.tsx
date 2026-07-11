import React, { useRef, useEffect } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  isEditMode: boolean;
  className?: string;
  multiline?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div' | 'b' | 'span';
  style?: React.CSSProperties;
}

export default function EditableText({
  value,
  onChange,
  isEditMode,
  className = '',
  multiline = false,
  as: Element = 'span',
  style,
}: EditableTextProps) {
  const elementRef = useRef<any>(null);

  // Sync value from props to contentEditable element
  useEffect(() => {
    if (elementRef.current && elementRef.current.innerText !== value) {
      elementRef.current.innerText = value;
    }
  }, [value]);

  const Tag = Element as any;

  if (!isEditMode) {
    return <Tag className={className} style={style}>{value}</Tag>;
  }

  const handleBlur = () => {
    if (elementRef.current) {
      const newValue = elementRef.current.innerText.trim();
      onChange(newValue || value); // Fallback to original value if left blank
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      elementRef.current?.blur();
    }
  };

  return (
    <Tag
      ref={elementRef}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      style={style}
      className={`
        inline-block relative rounded transition-all duration-200 cursor-text outline-none
        hover:bg-amber-500/10 hover:ring-1 hover:ring-amber-500/40 focus:bg-amber-500/10 focus:ring-2 focus:ring-amber-500
        ${className}
      `}
      title="Clique para editar este texto"
    />
  );
}
