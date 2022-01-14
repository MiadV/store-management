import * as yup from 'yup';

const UserEditFormSchema = yup
  .object()
  .shape({
    name: yup.string().min(3).defined(),
    email: yup.string().email().defined(),
    phone: yup.string().nullable(),
    permissions: yup.array(),
    shops: yup.array(),
    isActive: yup.boolean().defined(),
    new_password: yup.string().nullable(),
    new_password_confirmation: yup
      .string()
      .oneOf([yup.ref('new_password'), null], 'Passwords must match'),
  })
  .defined();

export default UserEditFormSchema;
