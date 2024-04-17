'use client';
import { Container, Nav, Navbar } from 'react-bootstrap';
import React, { useState, useRef } from 'react';
import axios from 'axios';

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

function Account() {
  return (
    <form action="/api/post/create" method="POST">
      <div style={{ margin: '5px' }}>
        <h4>계정생성</h4>
        <div className="input-box">
          <label for="email">Email</label>
          <input type="text" name="email" placeholder="e-mail"></input>
        </div>
        <div className="input-box">
          <label for="password">Password</label>
          <input type="text" name="password" placeholder="password"></input>
        </div>
        <div className="input-box">
          <label for="name">이름</label>
          <input type="text" name="name" placeholder="name"></input>
        </div>
        <div className="input-box">
          <label for="phonenumber">핸드폰 번호</label>
          <input
            type="number"
            name="phonenumber"
            placeholder="010-0000-0000"
            defaultValue="01000000000"
          ></input>
        </div>
        <div className="input-box">
          <label>성별</label>
          <div>
            <span>남자</span>
            <input name="gender" type="radio" value="male" />
            <span style={{ marginLeft: '10px' }}>여자</span>
            <input name="gender" type="radio" value="female" />
          </div>
        </div>
        <div className="input-box">
          <label for="birth">생년월일</label>
          <input type="number" name="birth" placeholder="YYYYMMDD"></input>
        </div>
        <div className="input-box" style={{ display: 'none' }}>
          <label for="ci">ci</label>
          <input
            type="text"
            name="ci"
            placeholder="test"
            defaultValue="test"
          ></input>
        </div>
        <div className="input-box">
          <label>Actor</label>
          <div>
            <span>Student</span>
            <input name="actor" type="radio" value="student" />
            <span style={{ marginLeft: '10px' }}>Teacher</span>
            <input name="actor" type="radio" value="teacher" />
          </div>
        </div>
        <div className="input-box" style={{ display: 'none' }}>
          <label for="terms">terms</label>
          <input
            type="text"
            name="terms"
            placeholder="DEFAULT (NOT UPDATE)"
            defaultValue="DEFAULT (NOT UPDATE)"
          ></input>
        </div>
        <div className="input-box">
          <button type="submit" className="register-button">
            계정생성
          </button>
        </div>
      </div>
    </form>
  );
}

function Account2() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [name, setName] = useState('');
  let [phonenumber, setPhonenumber] = useState('');
  let [gender, setGender] = useState('');
  let [birth, setBirth] = useState('');
  let [ci, setCi] = useState('test');
  let [actor, setActor] = useState('');
  let [terms, setTerms] = useState('DEFAULT (NOT UPDATE)');
  let [created, setCreated] = useState([]);

  let newAccount = [
    {
      email: `${email}`,
      password: `${password}`,
      name: `${name}`,
      phonenumber: `${phonenumber}`,
      gender: `${gender}`,
      birth: `${birth}`,
      ci: `${ci}`,
      actor: `${actor}`,
      terms: `${terms}`,
    },
  ];

  let [list, setList] = useState(false);

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
          // type="submit"
          className="register-button"
          onClick={() => {
            let copy = [...created];
            copy.push(newAccount);
            console.log(created);
            alert('gkd');
            setCreated(copy);
            setList(true);
          }}
        >
          계정생성
        </button>
      </div>
      {list == true
        ? created.map((a, i) => {
            return <div>{`${newAccount[i].email}이 생성되었습니다`}</div>;
          })
        : null}
    </div>
  );
}

export { Navbars, Account, Account2 };
