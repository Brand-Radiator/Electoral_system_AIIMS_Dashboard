import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from "react";


function MyVerticallyCenteredModal(props:any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Guess you tried too many times
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4></h4>
        <p style={{color:"green", fontWeight:800}}> Please try After Some time
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function AuthModal() {
  const [modalShow, setModalShow] =useState(true);

//   setTimeout(() => {
//     // This function has access to variables and parameters
//     setModalShow(true)
//   }, 200);

if(!modalShow) {
  window.location.reload()
 }
  return (
    <>
      {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button> */}

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default AuthModal;
