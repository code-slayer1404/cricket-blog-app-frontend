import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, Input, Label, Row } from 'reactstrap';
import { getPost, updatePost } from '@/services/PostService';
import { useAuth } from '@/hooks/auth';


export default function UpdatePost() {
    const { id } = useParams();
    const initialFormState = {
        title: "",
        content: ""
    }
    const { loggedUser } = useAuth();
    const navigate = useNavigate();
    const [postData, setPostData] = useState(initialFormState);

    useEffect(() => {
        // Fetch the post with the given ID and update postData
        async function wrapper() {
            const result = await getPost(Number(id));
            if (result.ok) {
                const data = result.data;
                console.log(data);
                setPostData({
                    title: data.title,
                    content: data.content,
                })
            } else {
                console.log(result.error);
            }
        }
        wrapper();

    }, [id]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPostData(
            (prev) => {
                return {
                    ...prev,
                    [event.target.name]: event.target.value
                }
            }
        )
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!loggedUser) {
            throw new Error("could not update! Not logged in!")
        }
        const result = await updatePost(loggedUser.id, Number(id), postData);
        if (result.ok) {
            console.log(result.data);
            navigate(`/user/dashboard`);
        }else{
            console.log(result.error);
            
        }
    }

    return (
        <>
            <Container>
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
                                        <Button color='primary' className="me-2">Update</Button>
                                        <Button color='danger' className='me-2' onClick={() => { setPostData(initialFormState) }}>Reset</Button>
                                        <Button color='secondary' onClick={() => navigate(-1)}>Go Back</Button>
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

