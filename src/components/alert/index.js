import { useState } from 'react';
import { Alert } from 'react-bootstrap'


function Alertinfo() {
  const [show, setShow] = useState(true);
  let variant = 'success';
  return (
    <Alert key={variant} variant={variant} onClose={() => setShow(false)} dismissible style={{fontSize:'14px',marginTop:'15px'}}>
    Announcement: Welcome to Aurascan.
    </Alert>
  );
}

export default Alertinfo;