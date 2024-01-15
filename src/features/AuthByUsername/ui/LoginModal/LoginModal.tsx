import { FC, Suspense } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import { classNames } from '@/shared/libs/classNames/classNames';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Modal } from '@/shared/ui/redesigned/Modal';

import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import cls from './LoginModal.module.scss';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({
    className,
    isOpen,
    onClose,
}) => (
    <>
        <BrowserView>
            <Modal
                className={classNames(cls.LoginModal, {}, [className])}
                isOpen={isOpen}
                onClose={onClose}
                lazy
            >
                <Suspense fallback={<Loader />}>
                    <LoginFormAsync />
                </Suspense>
            </Modal>
        </BrowserView>
        <MobileView>
            <Drawer
                className={classNames(cls.LoginModal, {}, [className])}
                isOpen={isOpen}
                onClose={onClose}
            >
                <Suspense fallback={<Loader />}>
                    <LoginFormAsync />
                </Suspense>
            </Drawer>
        </MobileView>
    </>
);
