import { Dialog } from '@headlessui/react';
import { IconX } from '@tabler/icons';
import { useContext } from 'react';
import IconButton from '../Button/IconButton';
import { ModalContext, MODAL_TYPES } from './GlobalModal';

export default function Modal({ title, description, children }) {
	const { modal, handleHideModal } = useContext(ModalContext);

	return (
		<Dialog
			open={MODAL_TYPES[modal.type] !== undefined}
			onClose={handleHideModal}
			className='fixed inset-0 z-50 bg-black/30'>
			<Dialog.Panel className='absolute left-1/2 top-1/2 h-full w-full -translate-y-1/2 -translate-x-1/2 transform overflow-scroll rounded-md bg-white p-6 sm:h-fit sm:w-96 md:w-2/5'>
				<Dialog.Title className='-mx-6 -mt-3 flex items-center justify-between border-b px-6'>
					<span className='text-lg capitalize'>{title}</span>
					<IconButton Icon={IconX} onClick={handleHideModal} />
				</Dialog.Title>
				<Dialog.Description>{description}</Dialog.Description>
				{children}
			</Dialog.Panel>
		</Dialog>
	);
}
