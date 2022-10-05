import notFoundSvg from 'assets/404.svg';
import { useNavigate } from 'react-router';
import Button from '../components/ui/Button';

export default function PageNotFound() {
	const navigate = useNavigate();
	return (
		<div className='flex h-screen flex-col items-center justify-center gap-6'>
			<img src={notFoundSvg} className='w-1/2' />
			<p className='text-3xl'>Page Not Found</p>
			<Button variant='primary' onClick={() => navigate(-1)}>
				Go Back
			</Button>
		</div>
	);
}
