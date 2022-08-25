import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Button from '../../components/Button/Button';
import InputField from '../../components/Input/InputField';
import { auth } from '../../firebase';
import { errorCodes } from '../../firebase/errorCodes';
import useForm from '../../hooks/useForm';

const signup = (name, email, password) =>
	createUserWithEmailAndPassword(auth, email, password).then(
		(userCredential) =>
			updateProfile(userCredential.user, { displayName: name }).catch(
				(err) => console.log(err)
			)
	);

const formData = {
	initialValues: {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	},
	validations: {
		name: {
			required: true,
		},
		email: {
			required: true,
			pattern: {
				value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
				message: 'Invalid email address',
			},
		},
		password: {
			required: true,
			pattern: {
				value: /^(?=.*).{8,}$/,
				message: 'Password must be atleast 8 characters',
			},
		},
		confirmPassword: {
			required: true,
			custom: {
				isValid: (formData) =>
					formData.password === formData.confirmPassword,
				message: 'Passwords must match',
			},
		},
	},

	onSubmit: (data) => signup(data.name, data.email, data.password),
};

export default function SignupForm() {
	const {
		data,
		errors,
		errorCode,
		isSubmitting,
		handleChange,
		handleInvalid,
		handleSubmit,
	} = useForm(formData);

	return (
		<form
			onSubmit={handleSubmit}
			className='flex max-w-md flex-col gap-4 rounded-lg p-8'>
			<h1 className='text-2xl font-bold text-slate-600'>Sign Up</h1>

			<InputField
				label='Name'
				value={data.name}
				onChange={handleChange('name')}
				onInvalid={handleInvalid('name')}
				placeholder='Enter your name'
				id='name'
				required
				errorMsg={errors.name}
			/>

			<InputField
				label='Email'
				type='email'
				value={data.email}
				onChange={handleChange('email')}
				onInvalid={handleInvalid('email')}
				placeholder='Enter your email'
				id='email'
				required
				errorMsg={errors.email}
			/>

			<div className='flex gap-4'>
				<InputField
					label='Password'
					type='password'
					id='password'
					value={data.password}
					onChange={handleChange('password')}
					onInvalid={handleInvalid('password')}
					placeholder='Password'
					required
					errorMsg={errors.password}
				/>

				<InputField
					type='password'
					label='Confirm Password'
					id='confirmPassword'
					value={data.confirmPassword}
					onChange={handleChange('confirmPassword')}
					onInvalid={handleInvalid('confirmPassword')}
					placeholder='confirm password'
					required
					errorMsg={errors.confirmPassword}
				/>
			</div>
			{errorCode && (
				<div className='rounded-xl bg-red-100 py-2 px-4 text-red-600'>
					<ExclamationCircleIcon className='mr-2 inline w-5' />
					<span>
						{' '}
						{errorCodes[errorCode] ||
							'Unable to create account'}{' '}
					</span>
				</div>
			)}
			<Button variant='primary' type='submit' disabled={isSubmitting}>
				Signup
			</Button>
		</form>
	);
}
