import { useLoginRequiredServer } from '@/utils';
import SignUpForm from './components/SignUpForm'

/**
 * The SignUp page.
 */
const SignUp = async () => {
    return (
        <SignUpForm />
    );
}

export default SignUp;