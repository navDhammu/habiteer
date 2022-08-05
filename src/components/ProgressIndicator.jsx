export default function ProgressIndicator({ percent }) {
	return (
		<div className='relative h-3 w-full rounded-full bg-neutral-200'>
			<div
				style={{
					width: percent,
				}}
				className={`absolute h-full rounded-full bg-indigo-300 transition-all`}></div>
		</div>
	);
}
