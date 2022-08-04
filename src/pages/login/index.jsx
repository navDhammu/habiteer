import { useState } from 'react';
import { Navigate } from 'react-router';
import svg from '../../assets/illustration-running.svg';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function Login({ isLoggedIn, onLogin }) {
	const [isOpenSignupModal, setIsOpenSignupModal] = useState(false);

	const handleCloseModal = () => setIsOpenSignupModal(false);

	if (isLoggedIn) return <Navigate to='/dashboard' />;

	return (
		<div className='flex h-screen w-full'>
			<section className='flex w-3/5 flex-col items-center justify-center gap-4 bg-gray-200 font-mono text-xl font-bold text-white'>
				<img className='mt-4 w-3/5' src={svg} alt=''></img>
			</section>
			<section className='relative flex flex-1 flex-col items-center justify-center bg-white'>
				<h1 className='mr-20 self-end text-3xl font-bold text-sky-700'>
					Habitsio
				</h1>
				<LoginForm
					openSignUpForm={() => setIsOpenSignupModal(true)}
					onLogin={onLogin}
				/>
				<footer className='flex flex-col items-center gap-2'>
					<span>Don't have an account?</span>
					<Button
						onClick={(e) => {
							e.stopPropagation();
							setIsOpenSignupModal(true);
						}}
						variant='secondary'>
						Sign Up
					</Button>
				</footer>
			</section>
			{isOpenSignupModal && (
				<Modal onClose={handleCloseModal}>
					<SignupForm onSignUp={onLogin} />
				</Modal>
			)}
		</div>
	);
}
