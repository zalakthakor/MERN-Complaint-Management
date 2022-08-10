import * as React from "react";

import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";

import {
  FormGroup,
  Button,
  FormControl,
  InputLabel,
  Input,
  TextField,
  MenuItem,
} from "@material-ui/core";

import { createComplaint } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";

import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

export default function Complaint() {
  const [userold] = useState(JSON.parse(localStorage.getItem("profile")));

  const user = JSON.parse(localStorage.getItem("profile"));
  let Navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [name, setName] = useState(user?.result?.name);

  const [email, setEmail] = useState(user?.result?.email);
  const [problem, setProblem] = useState("");
  const [action, setAction] = useState("");
  const [checked, setChecked] = useState();
  const [complaint_des, setComplaint_des] = useState("");
  const [pic, setPic] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addComplaintDetails = async () => {
    if (
      problem !== "" &&
      complaint_des !== "" &&
      action !== "" &&
      checked !== " " &&
      pic !== " "
    ) {
      const a = {
        name: user?.result?.name,
        problem: problem,
        email: user?.result?.email,
        complaint_des: complaint_des,
        action: action,
        citizen: checked,
        pic: pic,
      };
      

      await createComplaint(a);
      handleClose();
      Navigate("/close");
    } else {
      alert("Please fill all the feilds");
    }
  };

  useEffect(() => {
    if (!user) {
      Navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const postDetails = (pics) => {
    if (pics === undefined) {
      alert("Select the picture");
      return;
    }
    
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "kcs");
      fetch("https://api.cloudinary.com/v1_1/kcs/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())

        .then((data) => {
         

          setPic(data.url.toString());

          
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Button
        variant="primary"
        style={{
          background: "#3d8bdb",
          color: "#fff",
          padding: "10px",
          margin: "10px",
        }}
        onClick={handleShow}
      >
        Add Complaint
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#a5cdf0", color: "-moz-initial" }}>
          <FormGroup>
            <FormControl>
              <InputLabel htmlFor="my-input">Name</InputLabel>
              <Input
                onChange={(e) => setName(e.target.value)}
                disabled
                name="name"
                value={name}
                id="my-input"
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="my-input">Email</InputLabel>
              <Input
                disabled
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                value={email}
                id="my-input"
              />
            </FormControl>

            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    required
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                    name="Ck"
                  />
                }
                label="Citizenship?"
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="my-input">Complaint description</InputLabel>
              <Input
                required={true}
                onChange={(e) => setComplaint_des(e.target.value)}
                name="complaint_des"
                value={complaint_des}
                id="my-input"
              />
            </FormControl>

            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Take Action
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={action}
                onChange={(e) => setAction(e.target.value)}
              >
                <FormControlLabel
                  value="Instant"
                  control={<Radio />}
                  label="Instant"
                />
                <FormControlLabel
                  value="Smooth"
                  control={<Radio />}
                  label="Smooth"
                />
              </RadioGroup>
            </FormControl>

            <FormControl>
              <select
                class="form-select form-select-lg mb-3"
                aria-label=".form-select-lg example"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              >
                <option selected>Complaint relate to</option>
                <option value="Road">Road</option>
                <option value="Building">Building</option>
                <option value="Drainage">Drainage</option>
                <option value="Water supply">Water supply</option>
                <option value="Cleaning">Cleaning</option>
              </select>
            </FormControl>

            <FormControl id="pic">
              <InputLabel htmlFor="my-input">Image</InputLabel>
              <Input
                type="file"
                id="my-input"
                name="pic"
                p={1.5}
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
              />
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ background: "#3d8bdb", color: "#fff" }}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            style={{ background: "#3d8bdb", color: "#fff" }}
            onClick={addComplaintDetails}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
