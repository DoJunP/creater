// api를 위한 파일

import { gql, useMutation, useQuery } from '@apollo/client';

// 계정 생성 api 'auth_SignUpInputV2'
const auth_SignUpInputV2 = gql`
  mutation Mutation($input: auth_SignUpInputV2) {
    auth_signUpV2(input: $input)
  }
`;
const [createUser] = useMutation(auth_SignUpInputV2);
const 계정생성통신 = async () => {
  try {
    const result = await createUser({
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

    if (result.data.auth_signUpV2 == true) {
      alert('계정 생성 및 저장 완료');
      return true;
    }
  } catch (error) {
    if (error == 'ApolloError: Duplicate email') {
      alert('중복된 이메일입니다');
    } else {
      alert(error);
    }
    return false;
  }
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
