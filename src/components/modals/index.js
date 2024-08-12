import { useState,useEffect } from 'react';
import {Button,Modal,Alert} from 'react-bootstrap';

//modelSearchShow
function BaseModals(props) {
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState('danger');
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if(props.isShow){
        handleShow();
    }else{
        handleClose();// 类型判断 validator，还是普通address 还是 特殊无值
    }
   setVariant(props.status)
},[props.isShow])


  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>

            <Alert key={variant} variant={variant}>
            {props.content}
            </Alert>
            
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default BaseModals;