"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function PriceInput({ value, onChange, placeholder, required, className = "" }: Props) {
  const formatted = value ? Number(value).toLocaleString("es-AR") : "";

  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888] text-sm pointer-events-none">
        $
      </span>
      <input
        type="text"
        inputMode="numeric"
        value={formatted}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
        placeholder={placeholder}
        required={required}
        className={`pl-7 ${className}`}
      />
    </div>
  );
}
