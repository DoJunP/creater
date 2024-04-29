'use client';
import { Container, Nav, Navbar } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { addAccount } from '@/store';

import { gql, useMutation, useQuery } from '@apollo/client';

// 최상단에 위치하는 네브바 컴포넌트
function Navbars() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Account Creater</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Create</Nav.Link>
          <Nav.Link href="#features">Not yet</Nav.Link>
          <Nav.Link href="#pricing">Not yet</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

function Account2(props) {
  // store에 있는 데이터 불러오기
  const state = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [ci, setCi] = useState('test');
  const [actor, setActor] = useState('');
  const [terms, setTerms] = useState([
    'MARKETING_COLLECT',
    'PRIVATE_ETC_COLLECT',
    'TERMS_OF_SERVICE',
    'PRIVATE_COLLECT',
  ]);

  // 인풋에 입력한 값들은 newAccount 변수에 담긴다
  const newAccount = {
    email: email,
    password: password,
    name: name,
    phonenumber: phonenumber,
    gender: gender,
    birth: birth,
    ci: ci,
    actor: actor,
    terms: terms,
  };

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
  const Auth_signIn = gql`
    mutation Auth_signIn($input: auth_SignInInput!) {
      auth_signIn(input: $input) {
        token
      }
    }
  `;
  const [loginWithAccount] = useMutation(Auth_signIn);
  const 로그인통신 = async () => {
    try {
      const result = await loginWithAccount({
        variables: {
          input: {
            email: email,
            password: password,
          },
        },
      });
      if (result != null) {
        const token = result.data.auth_signIn.token;

        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join(''),
        );
        const decodedToken = JSON.parse(jsonPayload);

        newAccount.token = decodedToken;
        props.setCurrentEmail(email);
        props.setCurrentUserId(decodedToken.id);
        return true;
      }
    } catch (error) {
      if (error == 'ApolloError: Invalid Password') {
        alert('비밀번호가 틀렸습니다');
      } else {
        alert(error);
      }
    }
  };

  return (
    <div style={{ margin: '5px' }}>
      <h4>계정생성</h4>
      <div className="input-box">
        <label for="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="e-mail"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        ></input>
      </div>
      <div className="input-box">
        <label for="password">Password</label>
        <input
          type="text"
          name="password"
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
      </div>
      <div className="input-box">
        <label for="name">이름</label>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>
      </div>
      <div className="input-box">
        <label for="phonenumber">핸드폰 번호</label>
        <input
          type="number"
          name="phonenumber"
          placeholder="010-0000-0000"
          onChange={(event) => {
            setPhonenumber(event.target.value);
          }}
        ></input>
      </div>
      <div className="input-box">
        <label>성별</label>
        <div>
          <span>남자</span>
          <input
            name="gender"
            type="radio"
            value="MAN"
            onChange={(event) => {
              setGender(event.target.value);
            }}
          />
          <span style={{ marginLeft: '10px' }}>여자</span>
          <input
            name="gender"
            type="radio"
            value="WOMAN"
            onChange={(event) => {
              setGender(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="input-box">
        <label for="birth">생년월일</label>
        <input
          type="number"
          name="birth"
          placeholder="YYYYMMDD"
          onChange={(event) => {
            setBirth(event.target.value);
          }}
        ></input>
      </div>
      <div className="input-box" style={{ display: 'none' }}>
        <label for="ci">ci</label>
        <input
          type="text"
          name="ci"
          placeholder="test"
          defaultValue="test"
          onChange={(event) => {
            setCi(event.target.value);
          }}
        ></input>
      </div>
      <div className="input-box">
        <label>Actor</label>
        <div>
          <span>Student</span>
          <input
            name="actor"
            type="radio"
            value="STUDENT"
            onChange={(event) => {
              setActor(event.target.value);
            }}
          />
          <span style={{ marginLeft: '10px' }}>Teacher</span>
          <input
            name="actor"
            type="radio"
            value="TEACHER"
            onChange={(event) => {
              setActor(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="input-box" style={{ display: 'none' }}>
        <label for="terms">terms</label>
        <input
          type="text"
          name="terms"
          placeholder="DEFAULT (NOT UPDATE)"
          defaultValue="[
            MARKETING_COLLECT,
            PRIVATE_ETC_COLLECT,
            TERMS_OF_SERVICE,
            PRIVATE_COLLECT,
          ]"
          onChange={(event) => {
            setTerms(event.target.value);
          }}
        ></input>
      </div>
      <div className="input-box">
        <button
          className="register-button"
          onClick={async () => {
            const 계정생성통신결과 = await 계정생성통신();
            if (계정생성통신결과 == true) {
              const 로그인통신결과 = await 로그인통신();
              if (로그인통신결과 == true) {
                alert('로그인성공');

                dispatch(addAccount(newAccount));
                props.setViewList(true);
              } else {
                alert('로그인실패');
              }
            }
          }}
        >
          계정생성
        </button>
        <button
          className="register-button"
          style={{ marginTop: '10px' }}
          onClick={async () => {
            const 로그인통신결과 = await 로그인통신();
            if (로그인통신결과 == true) {
              alert('로그인성공');

              dispatch(addAccount(newAccount));
              props.setViewList(true);
            } else {
              alert('로그인실패');
            }
          }}
        >
          로그인
        </button>
      </div>
    </div>
  );
}

// 생성된 계정 정보를 노출시키는 컴포넌트
function ViewAccount(props) {
  const state = useSelector((state) => {
    return state;
  });
  let date = new Date();
  let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  return (
    <div style={{ margin: '5px' }}>
      <h4>계정 목록</h4>
      {props.viewList == true
        ? state.createdUser.map((a, i) => {
            return (
              <div>{`${time} : ${state.createdUser[i].email} // ${state.createdUser[i].token.id}`}</div>
            );
          })
        : null}
    </div>
  );
}

// 카드 등록을 할 수 있는 컴포넌트
function AddCard(props) {
  const [adminToken, setAdminToken] = useState('');
  const testCard = {
    number: '4140-0307-9904-4953',
    birth: '4618800348',
    expiry: '2026-12',
    halfPwd: '10',
  };

  // 카드 등록 api 'Payment_registerMainBillingCardByAdmin'
  const Payment_registerMainBillingCardByAdmin = gql`
    mutation Payment_registerMainBillingCardByAdmin(
      $input: payment_RegisterMainBillingCardByAdminInput!
    ) {
      payment_registerMainBillingCardByAdmin(input: $input)
    }
  `;
  const [addCard] = useMutation(Payment_registerMainBillingCardByAdmin, {
    context: {
      headers: {
        authorization: `Bearer ${adminToken}`, // 원하는 토큰 설정
      },
    },
  });
  const 카드등록통신 = async () => {
    try {
      const result = await addCard({
        variables: {
          input: {
            userId: props.currentUserId,
            number: testCard.number, // 왜 카드 유효기간 범위를 초과했다고 나올까
            birth: testCard.birth,
            expiry: testCard.expiry,
            halfPwd: testCard.halfPwd,
          },
        },
      });
      // if (result == !null) {
      //   console.log(result);
      //   return true;
      // }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  // 어드민 계정 로그인 api ''
  const Auth_signIn = gql`
    mutation Auth_signIn($input: auth_SignInInput!) {
      auth_signIn(input: $input) {
        token
      }
    }
  `;
  const [loginWithAccount] = useMutation(Auth_signIn);
  const 로그인통신 = async () => {
    try {
      const result = await loginWithAccount({
        variables: {
          input: {
            email: 'qa.louis@seoltab.com',
            password: 'asdfasdf',
          },
        },
      });
      if (result != null) {
        const token = result.data.auth_signIn.token;
        console.log(token);
        setAdminToken(token);
        return true;
      }
    } catch (error) {
      if (error == 'ApolloError: Invalid Password') {
        alert('비밀번호가 틀렸습니다');
      } else {
        alert(error);
      }
    }
  };
  return (
    <div className="container">
      <div className="card-area">
        <div>
          <h5 style={{ margin: '5px', fontSize: '15px' }}>
            현재 로그인 계정 :{' '}
            {`${props.currentEmail} / ${props.currentUserId}`}
          </h5>
        </div>
        <div style={{ margin: '5px' }}>
          <button
            className="register-button"
            style={{ width: '100px', marginRight: '3px' }}
            onClick={async () => {
              await 로그인통신();
              if (로그인통신()) {
                alert('어드민 계정 로그인 성공');
              } else {
                alert('어드민 계정 로그인 실패');
              }
            }}
          >
            어드민로그인
          </button>
          <button
            className="register-button"
            style={{ width: '100px' }}
            onClick={async () => {
              await 카드등록통신();
              // if (카드등록통신()) {
              //   alert(`${props.currentUserId}에 카드 등록되었습니다.`);
              // } else {
              //   alert('카드 등록중 에러 발생');
              // }
            }}
          >
            카드 등록
          </button>
        </div>
      </div>
    </div>
  );
}

function AddItem(props) {
  const [month, setMonth] = useState('');
  const [week, setWeek] = useState('');
  const [minute, setMinute] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const paymentInfo = {
    userId: props.currentUserId,
    installmentPeriod: null,
    lectures: [
      {
        month: month,
        week: week,
        minute: minute,
        subjectCode: subjectCode,
      },
    ],
  };

  const Payment_buyProductsByAdminV3 = gql`
    mutation Payment_buyProductsByAdminV3(
      $input: payment_BuyProductsByAdminV3Input!
    ) {
      payment_buyProductsByAdminV3(input: $input) {
        userId
      }
    }
  `;
  const [payItem] = useMutation(Payment_buyProductsByAdminV3);
  const 결제통신 = async () => {
    try {
      const result = await payItem({
        variables: {
          input: {
            userId: props.currentUserId,
            installmentPeriod: '',
            lectures: [
              {
                month: '',
                week: '',
                minute: '',
                subjectCode: '',
              },
            ],
          },
        },
      });
      return result;
    } catch {}
  };

  return (
    <div className="container">
      <div className="item-area">
        <div style={{ margin: '5px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <h4>상품 결제</h4>
            </div>
            <div
              style={{
                width: '10%',
              }}
            >
              <button
                className="register-button"
                onClick={() => {
                  console.log(paymentInfo);
                }}
              >
                상품 결제
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
            }}
          >
            <div className="input-item-box">
              <label htmlFor="month">Month</label>
              <input
                type="text"
                name="month"
                placeholder="Month"
                onChange={(event) => {
                  setMonth(event.target.value);
                }}
              ></input>
            </div>
            <div className="input-item-box">
              <label htmlFor="week">Week</label>
              <input
                type="text"
                name="week"
                placeholder="Week"
                onChange={(event) => {
                  setWeek(event.target.value);
                }}
              ></input>
            </div>
            <div className="input-item-box">
              <label htmlFor="minute">Time</label>
              <input
                type="text"
                name="minute"
                placeholder="Time"
                onChange={(event) => {
                  setMinute(event.target.value);
                }}
              ></input>
            </div>
            <div className="input-item-box">
              <label htmlFor="subjectCode">Code</label>
              <input
                type="text"
                name="subjectCode"
                placeholder="Code"
                onChange={(event) => {
                  setSubjectCode(event.target.value);
                }}
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export { Navbars, Account2, ViewAccount, AddCard, AddItem };
