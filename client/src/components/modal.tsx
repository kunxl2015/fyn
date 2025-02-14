import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

interface ModalProps {
	isOpen: boolean;
	title: string;
	children: ReactNode;
	closeModal: () => void;
}

export default function Modal({ isOpen, closeModal, title, children }: ModalProps) {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={closeModal}>
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
					<Dialog.Panel className="bg-white p-6 rounded-lg max-w-sm w-full">
						<Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
						<div className="mt-2">{children}</div>
						<button className="mt-4 px-4 py-2 bg-red-500 text-white rounded w-full" onClick={closeModal}>
							Close
						</button>
					</Dialog.Panel>
				</div>
			</Dialog>
		</Transition>
	);
}
