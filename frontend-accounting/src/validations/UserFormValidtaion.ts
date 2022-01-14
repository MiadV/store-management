import * as yup from 'yup';

const UserFormSchema = yup
  .object()
  .shape({
    name: yup.string().min(3).defined(),
    email: yup.string().email().defined(),
    phone: yup.string().nullable(),
    password: yup.string().defined(),
    password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    permissions: yup.array(),
    shops: yup.array(),
  })
  .defined();

export default UserFormSchema;
