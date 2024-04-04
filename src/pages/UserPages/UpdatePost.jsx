import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, Input, Label, Row } from 'reactstrap';
import { getPost, updatePost } from '../../services/PostService';


export default function UpdatePost() {
    const { id } = useParams();
    const initialFormState = {
        title: "",
        content: ""
    }
    const navigate = useNavigate();
    const [postData, setPostData] = useState(initialFormState);

    useEffect(() => {
        // Fetch the post with the given ID and update postData
        getPost(id).then(
            r => {
                console.log(r);
                setPostData({
                    title: r.data.title,
                    content: r.data.content,
                })
            }
        );
    }, [id]);

    function handleChange(event) {
        setPostData(
            (prev) => {
                return {
                    ...prev,
                    [event.target.name]: event.target.value
                }
            }
        )
    }

    function handleSubmit(event) {
        event.preventDefault();

        updatePost(id, postData).then(response => {
            console.log(response);
            console.log(response.data);
            navigate(`/user/dashboard`);
        });
    }

    return (
        <>
            <Container style={{ marginTop: "80px" }}>
                <Row>
                    <Col md={{ size: 8, offset: 2 }} className="mt-5">
                        <Form onSubmit={handleSubmit}>
                            <Card>
                                <CardHeader>
                                    Update Post
                                </CardHeader>
                                <CardBody>

                                    <div className="mb-3">
                                        <Label for="title">Title</Label>
                                        <Input id="title" name="title" onChange={handleChange} value={postData.title} required></Input>
                                    </div>

                                    <div className="mb-3">
                                        <Label for="content">Content</Label>
                                        <Input id="content" name="content" type="textarea" onChange={handleChange} value={postData.content} required></Input>
                                    </div>


                                </CardBody>
                                <CardFooter>
                                    <div className="text-center">
                                        <Button className="me-2">Update</Button>
                                        <Button onClick={()=>{setPostData(initialFormState)}}>Reset</Button>
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

