import { InformationCircleIcon } from '@heroicons/react/outline';

export default function HeadingWithCaption({ heading, caption }) {
	return (
		<div className=''>
			<h2 className='font-headings text-sm font-semibold uppercase'>
				{heading}
			</h2>
			<p className='flex items-center gap-1 text-sm text-gray-400'>
				{caption}
			</p>
		</div>
	);
}
