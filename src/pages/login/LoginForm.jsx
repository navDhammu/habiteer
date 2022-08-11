import { signInWithEmailAndPassword } from '@firebase/auth';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { BiLogIn } from 'react-icons/bi';
import Button from '../../components/Button/Button';
import InputField from '../../components/Input/InputField';
import { auth } from '../../firebase';
import useForm from '../../hooks/useForm';

export default function LoginForm() {
	const { data, errorCode, isSubmitting, handleChange, handleSubmit } =
		useForm({
			onSubmit: (data) =>
				signInWithEmailAndPassword(auth, data.email, data.password),
		});

	return (
		<form onSubmit={handleSubmit} className='flex w-4/5 flex-col gap-6'>
			<h2 className='text-3xl font-bold'>Login</h2>
			<InputField
				value={data.email || ''}
				onChange={handleChange('email')}
				label='Email'
				placeholder='name@domain.com'
				id='username'
				isRequired
			/>
			<InputField
				value={data.password || ''}
				onChange={handleChange('password')}
				type='password'
				label='Password'
				placeholder='atleast 8 characters'
				id='password'
				isRequired
			/>
			{errorCode?.includes('auth') && (
				<div className='rounded-xl bg-red-100 py-2 px-4 text-red-600'>
					<ExclamationCircleIcon className='mr-2 inline w-5' />
					<span>Invalid username or password</span>
				</div>
			)}
			<Button
				variant='primary'
				type='submit'
				disabled={isSubmitting}
				IconRight={BiLogIn}>
				Login
			</Button>
		</form>
	);
}
