import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, Input, Label, Row } from "reactstrap";
import {signup} from "../services/UserServices";

export default function Signup() {
    const initialState = {
        name: "",
        email: "",
        password: ""
    }

    const [formData, setFormData] = useState(initialState);
    const [message, setMessage] = useState({
        type: "",
        content: ""
    })
    const [joke, setJoke] = useState("")

    useEffect(() => {
        fetch("https://v2.jokeapi.dev/joke/Any?type=single").then(respone => respone.json()).then(data => { setJoke(data.joke) })
    }, [])


    // a common funtion to update all fields
    function handleChange(event) {
        setFormData((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
                // dynamic key es6 syntax
            }
        });
    }


    function handleSubmit(event) {
        event.preventDefault(); // to prevent refresh

        //may add validation logic here later

        // submit logic here⬇️

        // because my api expects username as the field name instead of email
        signup({ ...formData, username: formData.email })
            .then(response => {
                console.log('response is :');
                console.log(response);
                console.log(response.data);
                setMessage(() => {
                    return {
                        type: "alert-success",
                        content: "registered successfully!"
                    }
                });
            })
            .catch(error => {
                console.error(error, "try with a different email");
                setMessage(() => {
                    return {
                        type: "alert-danger",
                        content: "registeration failed! try with a different email"
                    }
                });
            });
    }

    return (
        <>
            <Container>
                <Row>
                    <Col md={{ size: 6, offset: 3 }}>
                        <Form onSubmit={handleSubmit} onChange={() => { setMessage({type:"",content:""}) }}>
                            <Card className="pb-3">
                                <CardHeader>
                                    <p className={`alert ${message.type}`}>{message.content}</p>
                                </CardHeader>
                                <CardBody>

                                    {/* using div with mb-3 instead of deprecated form-group */}
                                    {/* Name field */}
                                    <div className="mb-3">
                                        <Label for="name">Name</Label>
                                        <Input id="name" name="name" value={formData.name} onChange={handleChange}></Input>
                                    </div>

                                    {/* Email field */}
                                    <div className="mb-3">
                                        <Label for="email">Email</Label>
                                        <Input id="email" name="email" value={formData.email} type="email" onChange={handleChange}></Input>
                                    </div>

                                    {/* Password field */}
                                    <div className="mb-3">
                                        <Label for="password">Password</Label>
                                        <Input id="password" name="password" value={formData.password} type="password" onChange={handleChange}></Input>
                                    </div>


                                </CardBody>
                                <CardFooter>
                                    <div className="text-center">
                                        <Button className="me-2">Register</Button>
                                        <Button type="reset" onClick={() => { setFormData(initialState) }}>Reset</Button>
                                        <br />
                                        {/* for debugging only. Remove it later */}
                                        {JSON.stringify(formData)}
                                        <br />
                                        {joke}
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