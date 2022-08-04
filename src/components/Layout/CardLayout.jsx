export default function CardLayout({ children, heading, className }) {
	return (
		<div className={`rounded-md bg-white p-4 shadow-lg ${className}`}>
			{heading && (
				<h2 className='mb-2 text-lg font-semibold text-slate-800'>
					{heading}
				</h2>
			)}
			{children}
		</div>
	);
}
