import { useState } from 'react';
import { Navigate } from 'react-router';
import svg from '../../assets/illustration-running.svg';
import Button from '../../components/Button/Button';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function Login({ isLoggedIn }) {
	const [mode, setMode] = useState('login');

	const handleSwitchMode = () =>
		setMode(mode === 'login' ? 'signup' : 'login');

	if (isLoggedIn) return <Navigate to='/dashboard' />;

	return (
		<div className='flex h-screen w-full'>
			<section className='hidden w-3/5 flex-col items-center justify-center gap-4 bg-gray-200 font-mono text-xl font-bold text-white lg:flex'>
				<img className='mt-4 w-3/5' src={svg} alt=''></img>
			</section>
			<section className='relative flex flex-1 flex-col items-center justify-center bg-white'>
				<h1 className='absolute top-0 left-0 ml-10 mt-10 text-3xl font-bold text-indigo-500'>
					Habiterr
				</h1>
				{mode === 'login' ? <LoginForm /> : <SignupForm />}
				<footer className='flex items-center'>
					<p>
						{mode === 'login'
							? 'Dont have an account?'
							: 'Already have an account?'}
					</p>
					<Button onClick={handleSwitchMode} variant='text'>
						{mode === 'login' ? 'Sign up' : 'Sign in'}
					</Button>
				</footer>
			</section>
		</div>
	);
}
