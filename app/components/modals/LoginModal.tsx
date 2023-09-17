'use client';

import {signIn} from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../navbar/Heading';
import Input from '../inputs/Input';
import {toast} from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log("dfd");
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,

        }).
        then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success("Logged in");
                router.refresh();
                loginModal.onClose();
            }

            if(callback?.error) {
                toast.error(callback.error);
            }
        })
    }

    const bodyContent = (
        <div className= 'flex flex-col gap-4'>
            <Heading 
                title="Welcome Back" 
                subtitle="Login Your Account!"
            />
            <Input
                id="email"
                label='email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            
            <Input
                id="password"
                label='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );
        
    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')} 
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')} 
            />
            <div 
                className="
                    text-netural-500
                    text-center
                    mt-4
                    font-light
                    "
                >
                    <div className="justify-center flex flex-row items-center gap-2">
                        <div>
                            Already have a account? 
                        </div>
                        <div
                            onClick={loginModal.onClose}
                            className="
                                text-neutral-800
                                cursor-pointer
                                hover:underline
                            "
                        >
                            Log in
                        </div>
                    </div>
            </div>
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />

    );
}
export default LoginModal;