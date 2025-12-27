import isEmail from 'validator/es/lib/isEmail';

export const useValidation = () => {

    const validateEmail = (email: string) => {
        if (email !== '' && isEmail(email)) { return true; }
        return false;
    }

    return { validateEmail }
}