import React, { ChangeEvent, useState } from "react";

import Select, { StylesConfig } from "react-select";
import { dropdown } from "../(admin)/adminAddProduct/[_id]/page";

const Checkbox = ({ children, ...props }: JSX.IntrinsicElements["input"]) => (
	<label style={{ marginRight: "1em" }}>
		<input type="checkbox" {...props} />
		{children}
	</label>
);

export const customStyles: StylesConfig = {
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
	options,
	onChange,
	value
}: {
	options: dropdown[];
	onChange: any;
	value:dropdown
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
		<>
			<Select
				className="basic-single rounded-full"
				classNamePrefix="select"
				defaultValue={ options[0]}
				isDisabled={isDisabled}
				isLoading={isLoading}
				isClearable={isClearable}
				isRtl={isRtl}
				isSearchable={isSearchable}
				name="color"
				options={options}
				styles={customStyles}
				onChange={handleChange}
				value={value}
			/>

			<div
				style={{
					color: "hsl(0, 0%, 40%)",
					display: "inline-block",
					fontSize: 12,
					fontStyle: "italic",
					marginTop: "1em",
				}}
			>
				{/* <Checkbox
          checked={isClearable}
          onChange={() => setIsClearable((state) => !state)}
        >
          Clearable
        </Checkbox>
        <Checkbox
          checked={isSearchable}
          onChange={() => setIsSearchable((state) => !state)}
        >
          Searchable
        </Checkbox>
        <Checkbox
          checked={isDisabled}
          onChange={() => setIsDisabled((state) => !state)}
        >
          Disabled
        </Checkbox>
        <Checkbox
          checked={isLoading}
          onChange={() => setIsLoading((state) => !state)}
        >
          Loading
        </Checkbox>
        <Checkbox checked={isRtl} onChange={() => setIsRtl((state) => !state)}>
          RTL
        </Checkbox> */}
			</div>
		</>
	);
}

export default Dropdown;
