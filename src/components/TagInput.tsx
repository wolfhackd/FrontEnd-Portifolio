import { X } from 'lucide-react';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export function TagInput({ value, onChange }: TagInputProps) {
  const addTag = (tag: string) => {
    if (!tag.trim()) return;
    onChange([...value, tag.trim()]);
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(e.currentTarget.value);
      e.currentTarget.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {value.map((tag, i) => (
          <span
            key={i}
            className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-full text-sm"
          >
            {tag}
            <button onClick={() => removeTag(tag)}>
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      {/* Input */}
      <input
        className="border rounded-md px-3 py-2 bg-background"
        placeholder="Digite e aperte Enter"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
