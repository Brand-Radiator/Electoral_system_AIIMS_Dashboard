import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { UseFormHandleSubmit, FieldErrors, Control } from "react-hook-form";

// components

import { FormInput } from "../../../../components/";

interface AddNewTaskProps {
  newTaskModal?: boolean;
  toggleNewTaskModal?: () => void;
  handleNewTask?: (values: any) => void;
  //   handleSubmit: UseFormHandleSubmit<any>;
  newTaskDetails?: any;
  //   handleDateChange: (date: Date) => void;
  errors?: FieldErrors;
  control?: Control<any>;
  register?: any;
}

const EditModal = ({ newTaskModal, toggleNewTaskModal }: AddNewTaskProps) => {
  return (
    <Modal show={newTaskModal} onHide={toggleNewTaskModal} size="lg" centered>
      <Modal.Header closeButton>
        <h4 className="modal-title">Create New Task</h4>
      </Modal.Header>
      <Modal.Body>
        <div className="text-end">
          <Button variant="light" className="me-1" onClick={toggleNewTaskModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
