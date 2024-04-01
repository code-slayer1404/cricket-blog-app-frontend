import { Button, Card, CardBody, CardHeader, Form, Input, Label } from "reactstrap";

export default function LoginTest() {
    function name(event) {
        event.preventDefault();
        window.location.href = "https://www.google.com"
    }
    return (
        <>
            <Card className='mycard'>
                <CardHeader className='text-center fw-bold h4'>Welcome</CardHeader>
                <CardBody>
                    <Form onSubmit={name}>
                        <Label>Enter your email</Label>
                        <Input></Input>
                        <Label>Enter your password</Label>
                        <Input type='password' className='mb-3'></Input>

                        <Button type='submit' color='success' >Submit</Button>

                    </Form>
                </CardBody>
            </Card>
        </>
    )
}