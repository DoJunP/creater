'use client';
import { Container, Nav, Navbar } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';

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

// function Account() {
//   return (
//     <form action="/api/post/create" method="POST">
//       <div style={{ margin: '5px' }}>
//         <h4>계정생성</h4>
//         <div className="input-box">
//           <label for="email">Email</label>
//           <input type="text" name="email" placeholder="e-mail"></input>
//         </div>
//         <div className="input-box">
//           <label for="password">Password</label>
//           <input type="text" name="password" placeholder="password"></input>
//         </div>
//         <div className="input-box">
//           <label for="name">이름</label>
//           <input type="text" name="name" placeholder="name"></input>
//         </div>
//         <div className="input-box">
//           <label for="phonenumber">핸드폰 번호</label>
//           <input
//             type="number"
//             name="phonenumber"
//             placeholder="010-0000-0000"
//             defaultValue="01000000000"
//           ></input>
//         </div>
//         <div className="input-box">
//           <label>성별</label>
//           <div>
//             <span>남자</span>
//             <input name="gender" type="radio" value="male" />
//             <span style={{ marginLeft: '10px' }}>여자</span>
//             <input name="gender" type="radio" value="female" />
//           </div>
//         </div>
//         <div className="input-box">
//           <label for="birth">생년월일</label>
//           <input type="number" name="birth" placeholder="YYYYMMDD"></input>
//         </div>
//         <div className="input-box" style={{ display: 'none' }}>
//           <label for="ci">ci</label>
//           <input
//             type="text"
//             name="ci"
//             placeholder="test"
//             defaultValue="test"
//           ></input>
//         </div>
//         <div className="input-box">
//           <label>Actor</label>
//           <div>
//             <span>Student</span>
//             <input name="actor" type="radio" value="student" />
//             <span style={{ marginLeft: '10px' }}>Teacher</span>
//             <input name="actor" type="radio" value="teacher" />
//           </div>
//         </div>
//         <div className="input-box" style={{ display: 'none' }}>
//           <label for="terms">terms</label>
//           <input
//             type="text"
//             name="terms"
//             placeholder="DEFAULT (NOT UPDATE)"
//             defaultValue="DEFAULT (NOT UPDATE)"
//           ></input>
//         </div>
//         <div className="input-box">
//           <button type="submit" className="register-button">
//             계정생성
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }

// 계정 생성 통신
const CREATE_USER = gql`
  mutation Mutation($input: auth_SignUpInputV2) {
    auth_signUpV2(input: $input)
  }
`;

function Account2() {
  // 계정 생성통신의 인풋 데이터
  const [createUser] = useMutation(CREATE_USER);
  const submit = async () => {
    try {
      let result = await createUser({
        variables: {
          input: {
            email: 'louis_0403@seoltab.test',
            password: 'asdfasdf',
            name: '루이루이',
            phoneNumber: '01000000000',
            gender: 'MAN',
            birthDate: '19881231',
            ci: 'test',
            actor: 'STUDENT',
            terms: [
              'MARKETING_COLLECT',
              'PRIVATE_ETC_COLLECT',
              'TERMS_OF_SERVICE',
              'PRIVATE_COLLECT',
            ],
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  // store에 있는 데이터 불러오기
  let state = useSelector((state) => {
    return state;
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [ci, setCi] = useState('test');
  const [actor, setActor] = useState('');
  const [terms, setTerms] = useState('DEFAULT (NOT UPDATE)');
  const [created, setCreated] = useState([]);
  let [list, setList] = useState(false);

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
            console.log(email);
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
          defaultValue="01000000000"
          value="01000000000"
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
            value="male"
            onChange={(event) => {
              setGender(event.target.value);
            }}
          />
          <span style={{ marginLeft: '10px' }}>여자</span>
          <input
            name="gender"
            type="radio"
            value="female"
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
            value="student"
            onChange={(event) => {
              setActor(event.target.value);
            }}
          />
          <span style={{ marginLeft: '10px' }}>Teacher</span>
          <input
            name="actor"
            type="radio"
            value="teacher"
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
          defaultValue="DEFAULT (NOT UPDATE)"
          onChange={(event) => {
            setTerms(event.target.value);
          }}
        ></input>
      </div>
      <div className="input-box">
        <button
          className="register-button"
          onClick={() => {
            let copy = [...created];
            copy.push(newAccount);

            alert('계정 생성 완료');
            setCreated(copy);
            setList(true);
            console.log(created);
          }}
        >
          계정생성
        </button>
      </div>
      {list == true
        ? created.map((a, i) => {
            return <div>{`${a.email}이 생성되었습니다`}</div>;
          })
        : null}
      <div>
        <button onClick={() => submit()}>통신버튼</button>
      </div>
      <div>{state.user}</div>
    </div>
  );
}

export { Navbars, Account2 };
