import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, Input, Label, Row } from "reactstrap";
import { saveTokenAndUser } from "../auth/loginHelper";
import { login } from "../services/UserServices";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Login({ updateLoginStatus }) {

    const navigate = useNavigate();

    const initialState = {
        email: "",
        password: ""
    }

    const [formData, setFormData] = useState(initialState);


    // a common funtion to update all fields
    function handleChange(event) {
        setFormData((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        });
    }

    function handleSubmit(event) {
        event.preventDefault(); // to prevent refresh
        // submit logic here
        login({ ...formData, username: formData.email })
            .then(response => {
                console.log(response);
                saveTokenAndUser(response.data, () => {
                    setFormData(initialState);
                    updateLoginStatus();
                    navigate("/user/dashboard");
                });
            })
            .catch(e => { console.error(e) })

    }

    // just for me to see 
    useEffect(() => { console.log(formData); }, [formData]);

    return (
        <>
            <Container>
                <Row>
                    <Col md={{ size: 6, offset: 3 }}>
                        <Form onSubmit={handleSubmit}>
                            <Card>
                                <CardHeader>
                                    Login here
                                </CardHeader>
                                <CardBody>

                                    <div className="mb-3">
                                        <Label for="email">Email</Label>
                                        <Input id="email" type="email" onChange={handleChange} name="email" value={formData.email}></Input>
                                    </div>

                                    <div className="mb-3">
                                        <Label for="password">Password</Label>
                                        <Input id="password" type="password" onChange={handleChange} name="password" value={formData.password}></Input>
                                    </div>


                                </CardBody>
                                <CardFooter>
                                    <div className="text-center">
                                        <Button className="me-2">Login</Button>
                                        <Button type="reset" onClick={() => { setFormData(initialState) }}>Reset</Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}


Login.propTypes = {
    updateLoginStatus: PropTypes.func
}