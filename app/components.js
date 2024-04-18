'use client';
import { Container, Nav, Navbar } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { addAccount } from '@/store';

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
          onClick={() => {
            dispatch(addAccount(newAccount));
            props.setViewList(true);
            alert('계정 생성 완료');
          }}
        >
          계정생성
        </button>
      </div>
    </div>
  );
}

function ViewAccount(props) {
  let state = useSelector((state) => {
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
              <div>{`${time} : ${a.email} // ${props.userToken}이 생성되었습니다`}</div>
            );
          })
        : null}
    </div>
  );
}

export { Navbars, Account2, ViewAccount };
