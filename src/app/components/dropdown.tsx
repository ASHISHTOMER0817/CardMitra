import React, { ChangeEvent, useState } from "react";

import Select, { GroupBase, StylesConfig } from "react-select";
import { dropdown } from "../(admin)/adminAddProduct/[_id]/page";

const Checkbox = ({ children, ...props }: JSX.IntrinsicElements["input"]) => (
	<label style={{ marginRight: "1em" }}>
		<input type="checkbox" {...props} />
		{children}
	</label>
);

export const defaultStyles: StylesConfig<
	dropdown,
	boolean,
	GroupBase<dropdown>
> = {
	control: (provided) => ({
		...provided,
		borderRadius: "25px",
	}),
	menu: (provided) => ({
		...provided,
		borderRadius: "25px",
	}),
	option: (provided) => ({
		...provided,
		borderRadius: "25px",
	}),
	//     singleValue: (provided) => ({
	//       ...provided,
	//       borderRadius: '25px',
	//     }),
	indicatorSeparator: () => ({
		display: "none",
	}),
};
function Dropdown({
	// defaultValue,
	options,
	onChange,
	// value,
	className,
	customStyles,
}: {
	//  defaultValue:dropdown
	options: dropdown[];
	onChange: any;
	// value: dropdown;
	className?: string;
	customStyles?: StylesConfig<dropdown, boolean, GroupBase<dropdown>>;
}) {
	const [isClearable, setIsClearable] = useState(true);
	const [isSearchable, setIsSearchable] = useState(true);
	const [isDisabled, setIsDisabled] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isRtl, setIsRtl] = useState(false);
	//   const [selected, setSelected] = useState()

	const handleChange = (selectedOption: any) => {
		if (onChange) {
			const option = "hello";
			// setSelected(e.target.value)
			onChange(selectedOption); // Pass selected option to parent component
		}
	};
	return (
		<Select
			className={`basic-single rounded-full ${className}`}
			classNamePrefix="select"
			// defaultValue={defaultValue}
			isDisabled={isDisabled}
			isLoading={isLoading}
			isClearable={isClearable}
			isRtl={isRtl}
			isSearchable={isSearchable}
			name="color"
			options={options}
			styles={{ ...defaultStyles, ...customStyles }}
			onChange={handleChange}
			// value={value}
			// styles={style}
		/>
	);
}

export default Dropdown;
