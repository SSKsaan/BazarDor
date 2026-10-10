type AuthFieldProps = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export default function AuthField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
}: AuthFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-base text-black">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="input w-full border-black/40 bg-white shadow-none focus:border-black/40 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.08)] focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
