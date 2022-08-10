import { Button, Modal } from "react-bootstrap";
import React, { useState, useEffect, ngOnInit } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  makeStyles,
  Typography,
} from "@material-ui/core";

import {
 
  updateComplaint,
  getComplaint,
} from "../../api/api";

import { useParams, useNavigate } from "react-router-dom";
import { validName, validEmail } from "../../js/RegEx";

const initialValue = {
  name: "",
  email: "",
  problem: " ",
  complaint_des: "",
  citizen: "",
  createdAt: "",
};

const initialIsValidValue = {
  isname: "",
  isemail: "",
};

function Edituser() {
  let Navigate = useNavigate();
  const [complaints, setComplaint] = useState(initialValue);

  const { email, problem, name, complaint_des, citizen, createdAt } =
    complaints;
  const [isValid, setIsValid] = useState(initialIsValidValue);
  const { isname, isemail } = isValid;
  const validationMessageCSS = { color: "red", marginBottom: "20px" };
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    handleShow();
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getComplaint(id);
    setComplaint(response.data);
  };

  const onValueChange = (e) => {
    setComplaint({ ...complaints, [e.target.name]: e.target.value });
  };

  const EditUser = async (id) => {
    await updateComplaint(id, complaints);

    handleClose();
    Navigate("/user");
  };

  const handleClose1 = () => {
    handleClose();
    Navigate("/user");
  };

  const onChangeSetState = (e) => {
    setComplaint({ ...complaints, [e.target.name]: e.target.value });
  };

  const onValidate = (e, regEx) => {
    const RegExObj = new RegExp(regEx);
    const isValidKey = "is" + e.target.name;

    if (e.target.value === "" || RegExObj.test(e.target.value)) {
      setIsValid({ ...isValid, [isValidKey]: "" });
      setComplaint({ ...complaints, [e.target.name]: e.target.value });
    } else {
      setIsValid({ ...isValid, [isValidKey]: "Invalid input..!!" });
    }
  };

  var flag = true;
  const validateDetailsFlag = Object.values(isValid).every((value) => {
    if (value !== null && value !== "") {
      flag = false;
    }
    return flag;
  });

  function validateDetails(id) {
    if (validateDetailsFlag) {
      EditUser(id);
    } else {
      alert("Invalid input..!!");
    }
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#a5cdf0", color: "-moz-initial" }}>
          <FormGroup>
            <FormControl>
              <InputLabel htmlFor="my-input">Name</InputLabel>
              <Input
                onChange={(e) => onChangeSetState(e)}
                onBlur={(e) => onValidate(e, validName)}
                name="name"
                value={name}
                id="my-input"
                inputProps={{ maxLength: 40 }}
              />
              <div style={validationMessageCSS}>{isname}</div>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="my-input">Email</InputLabel>
              <Input
                onChange={(e) => onChangeSetState(e)}
                onBlur={(e) => onValidate(e, validEmail)}
                name="email"
                value={email}
                id="my-input"
                inputProps={{ maxLength: 50 }}
              />
              <div style={validationMessageCSS}>{isemail}</div>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="my-input">Complaint</InputLabel>
              <Input
                onChange={(e) => onValueChange(e)}
                name="problem"
                disabled
                value={problem}
                id="my-input"
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="my-input">Complaint-DESC</InputLabel>
              <Input
                onChange={(e) => onValueChange(e)}
                name="complaint_des"
                disabled
                value={complaint_des}
                id="my-input"
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="my-input">CitizenShip</InputLabel>
              <Input
                onChange={(e) => onValueChange(e)}
                name="citizen"
                disabled
                value={citizen}
                id="my-input"
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="my-input">Created At</InputLabel>
              <Input
                onChange={(e) => onValueChange(e)}
                name="createdAt"
                disabled
                value={createdAt}
                id="my-input"
              />
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            style={{ background: "#3d8bdb", color: "#fff" }}
            onClick={() => validateDetails(id)}
          >
            Edit User
          </Button>

          <Button
            variant="secondary"
            onClick={() => handleClose1()}
            style={{ background: "#3d8bdb", color: "#fff", marginLeft: "60%" }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edituser;
