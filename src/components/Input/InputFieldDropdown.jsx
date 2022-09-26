import InputField from './InputField';

export default function InputFieldDropdown({ listName, options, ...props }) {
	return (
		<>
			<InputField list={listName} {...props} id={listName} />
			<datalist id={listName}>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</datalist>
		</>
	);
}
