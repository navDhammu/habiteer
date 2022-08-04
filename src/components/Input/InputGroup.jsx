import { Bottomtext } from './BottomText';
import Label from './Label';

export default function InputGroup({
	heading,
	errorMsg,
	helperText,
	children,
	isRequired,
}) {
	return (
		<fieldset className='flex flex-col'>
			<Label as='legend' isRequired={isRequired}>
				{heading}
			</Label>
			<div
				className={`flex flex-wrap gap-4${
					errorMsg ? 'border border-red-400' : ''
				}`}>
				{children}
			</div>
			<Bottomtext errorMsg={errorMsg} helperText={helperText} />
		</fieldset>
	);
}
