import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, Input, Label, Row } from "reactstrap";
import signup from "../services/UserServices";

export default function Signup() {
    const initialState = {
        name: "",
        email: "",
        password: ""
    }

    const [formData, setFormData] = useState(initialState);
    const [joke, setJoke] = useState("")

    useEffect(() => {
        fetch("https://v2.jokeapi.dev/joke/Any?type=single").then(respone => respone.json()).then(data => { setJoke(data.joke) })
},[])
    

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

        signup({...formData,username:formData.email})
        .then(response=>{console.log(response); console.log(response.data);})
        .catch(error=>console.error(error,"try with a different email"));
    }


    return (
        <>
            <Container>
                <Row>
                    <Col md={{ size: 6, offset: 3 }}>
                        <Form onSubmit={handleSubmit}>
                            <Card>
                                <CardHeader>
                                    Register here
                                </CardHeader>
                                <CardBody>

                                    <div className="mb-3">
                                        <Label for="name">Name</Label>
                                        <Input id="name" name="name" value={formData.name} onChange={handleChange}></Input>
                                    </div>

                                    <div className="mb-3">
                                        <Label for="email">Email</Label>
                                        <Input id="email" name="email" value={formData.email} type="email" onChange={handleChange}></Input>
                                    </div>

                                    <div className="mb-3">
                                        <Label for="password">Password</Label>
                                        <Input id="password" name="password" value={formData.password} type="password" onChange={handleChange}></Input>
                                    </div>


                                </CardBody>
                                <CardFooter>
                                    <div className="text-center">
                                        <Button className="me-2">Register</Button>
                                        <Button type="reset" onClick={()=>{setFormData(initialState)}}>Reset</Button>
                                        <br />
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