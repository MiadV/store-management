import * as yup from "yup";

const UserFormSchema = yup
    .object()
    .shape({
        name: yup.string().min(3).defined(),
        email: yup.string().email().defined(),
        phone: yup.string(),
        password: yup.string().defined(),
        password_confirmation: yup.string().defined(),
        permissions: yup.array().of(yup.number()).defined(),
        shops: yup.array().of(yup.number()).defined(),
    })
    .defined();

export default UserFormSchema;
