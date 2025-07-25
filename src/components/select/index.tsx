import Text from "@components/text";
import "./select.css";
import { SelectBaseProps, SelectProps } from "./types";

function SelectBase({
  placeholder,
  options,
  onOptionSelected,
}: SelectBaseProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const optionIndex = options.findIndex((option) => option.value === value);
    const selectedOption = options[optionIndex];
    if (selectedOption) {
      onOptionSelected(selectedOption, optionIndex);
    }
  };

  return (
    <select required defaultValue="" onChange={handleChange}>
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default function Select({ label, ...selectBaseProps }: SelectProps) {
  const base = "lds--select";

  return (
    <div className={base}>
      {label ? (
        <Text as="label">
          {label}
          <SelectBase {...selectBaseProps} />
        </Text>
      ) : (
        <SelectBase {...selectBaseProps} />
      )}
    </div>
  );
}
