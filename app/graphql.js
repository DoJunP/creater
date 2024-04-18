// api를 위한 파일

import { gql, useMutation, useQuery } from '@apollo/client';

// 계정 생성 api 'auth_SignUpInputV2'
const createAccount = () => {
  const auth_SignUpInputV2 = gql`
    mutation Mutation($input: auth_SignUpInputV2) {
      auth_signUpV2(input: $input)
    }
  `;
  const [createUser] = useMutation(auth_SignUpInputV2);
  async () => {
    try {
      let result = await createUser({
        variables: {
          input: {
            email: email,
            password: password,
            name: name,
            phoneNumber: phonenumber,
            gender: gender,
            birthDate: birth,
            ci: ci,
            actor: actor,
            terms: terms,
          },
        },
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  };
};

// 로그인 api 'Auth_signIn'
const login = () => {
  const Auth_signIn = gql`
    mutation Auth_signIn($input: auth_SignInInput!) {
      auth_signIn(input: $input) {
        token
      }
    }
  `;
  const [loginWithAccount] = useMutation(Auth_signIn);
  async () => {
    try {
      let result = await loginWithAccount({
        variables: {
          input: {
            email: email,
            password: password,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
