import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Account, Account2 } from './components';

export default function Home() {
  return (
    <div className="container">
      <div
        className="big-area"
        style={{ border: '2px solid black', borderRadius: '5px', width: '50%' }}
      >
        <Account />
      </div>
      <div
        className="big-area"
        style={{ border: '2px solid black', borderRadius: '5px', width: '50%' }}
      >
        <Account2 />
      </div>
    </div>
  );
}
