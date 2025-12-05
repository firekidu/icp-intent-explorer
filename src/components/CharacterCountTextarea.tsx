import { cn } from "@/lib/utils";

interface CharacterCountTextareaProps {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export function CharacterCountTextarea({
  value,
  onChange,
  maxLength,
  placeholder,
  rows = 5,
  className,
}: CharacterCountTextareaProps) {
  const charCount = value.length;
  const isNearLimit = charCount > maxLength * 0.9;
  const isOverLimit = charCount > maxLength;

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          "w-full px-4 py-3 rounded-lg border bg-card text-foreground resize-none",
          "input-focus-ring border-input",
          "placeholder:text-muted-foreground",
          isOverLimit && "border-destructive focus:border-destructive",
          className
        )}
      />
      <div
        className={cn(
          "absolute bottom-3 right-3 text-xs font-medium",
          isOverLimit
            ? "text-destructive"
            : isNearLimit
            ? "text-amber-500"
            : "text-muted-foreground"
        )}
      >
        {charCount.toLocaleString()}/{maxLength.toLocaleString()} characters
      </div>
    </div>
  );
}
