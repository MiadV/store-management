import * as yup from "yup";

const LoginFormSchema = yup
    .object()
    .shape({
        email: yup.string().email().defined(),
        password: yup.string().defined(),
    })
    .defined();

export default LoginFormSchema;
