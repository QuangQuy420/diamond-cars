'use client'
import { SubmitButtonProps } from '@/interfaces';
import { useFormStatus } from 'react-dom'

/**
 * The submit button.
 */
export const SubmitButton: React.FC<SubmitButtonProps> = ({ typeSubmit }) => {
    const { pending } = useFormStatus()

    return (
        <button type="submit" className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            disabled={pending} aria-disabled={pending}
        >
            {typeSubmit}
        </button>
    )
}