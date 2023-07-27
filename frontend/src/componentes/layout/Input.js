import style from "./Input.module.css";

export default function Input({
  type,
  text,
  name,
  placeholder,
  value,
  className,
  onChange,
}) {
  return (
    <div className={style.father}>
      <label htmlFor={name}>{text}</label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className={className}
        onChange={onChange}
      />
    </div>
  );
}
