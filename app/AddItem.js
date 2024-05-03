import { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

function AddItem(props) {
  const [month, setMonth] = useState();
  const [week, setWeek] = useState();
  const [minute, setMinute] = useState();
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
  const [payItem] = useMutation(Payment_buyProductsByAdminV3, {
    context: {
      headers: {
        authorization: `Bearer ${props.adminToken}`, // 원하는 토큰 설정
      },
    },
  });
  const 결제통신 = async () => {
    try {
      const result = await payItem({
        variables: {
          input: {
            userId: props.currentUserId,
            installmentPeriod: null,
            lectures: [
              {
                month: parseInt(month),
                week: parseInt(week),
                minute: parseInt(minute),
                subjectCode: subjectCode,
              },
            ],
          },
        },
      });
      return result;
    } catch (error) {
      console.log(error);
    }
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
                onClick={async () => {
                  const 결제통신결과 = await 결제통신();
                  if (결제통신결과.data != null) {
                    alert('결제 성공');
                  } else if (결제통신결과.data == null) {
                    alert(결제통신결과);
                  }
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

export { AddItem };
