import * as yup from 'yup';

const UserEditFormSchema = yup
  .object()
  .shape({
    phone: yup.string().nullable(),
    permissions: yup.array().min(1).defined(),
    shops: yup.array().min(1).defined(),
    new_password: yup.string().nullable(),
    new_password_confirmation: yup
      .string()
      .oneOf([yup.ref('new_password'), null], 'Passwords must match'),
  })
  .defined();

export default UserEditFormSchema;
