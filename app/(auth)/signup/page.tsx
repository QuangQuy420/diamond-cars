import { NextPage } from 'next';
import SignUpForm from './components/SignUpForm'

/**
 * The SignUp page.
 */
const SignUp: NextPage = async () => {
    return (
        <SignUpForm />
    );
}

export default SignUp;