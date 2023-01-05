import Helmet from "../components/Helmet/Helmet";

import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase.config";
import { storage } from "../firebase.config";
import { toast } from "react-toastify";

import "../styles/login.css";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, Setpassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURl) => {
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURl,
            });

            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURl,
            });
          });
        }
      );
      console.log(user);
      setLoading(false);
      navigate("/login");
      toast.success("signup successfull");
    } catch (error) {
      setLoading(false);
      toast.error("something went wrong");
    }
  };

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h6 className="fw-bold">Loading.....</h6>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold fs-4">SignUp</h3>
                <Form className="auth__form " onSubmit={signup}>
                  <FormGroup className="signup__form">
                    <input
                      type="text"
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="signup__form">
                    <input
                      type="email"
                      placeholder="enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="signup__form">
                    <input
                      type="password"
                      placeholder="enter your password"
                      value={password}
                      onChange={(e) => Setpassword(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="file__group">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.file[0])}
                    />
                  </FormGroup>

                  <button type="submit" className="buy_btn auth__btn">
                    Create an Account
                  </button>
                  <p>
                    already have an account?
                    <Link to="/login">Login</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
