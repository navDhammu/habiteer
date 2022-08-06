import { IconHourglassEmpty } from '@tabler/icons';

export default function ComingSoon() {
	return (
		<div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center'>
			<div className='flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 p-3'>
				<IconHourglassEmpty size='30px' />
			</div>
			<p className='mt-4 text-center'>
				This section is coming soon. Stay tuned
			</p>
		</div>
	);
}
