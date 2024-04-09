import { useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, Input, Label, Row } from "reactstrap";
import { addPost } from "../../services/PostService";
import PropTypes from "prop-types"

export default function AddPost({ loadPosts }) {

    const [postData, setPostData] = useState({
        title: "",
        content: ""
    });

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

    // function handleSubmit(event) {
    //     event.preventDefault();

    //     addPost(postData).then(response => {
    //         console.log(response);
    //         console.log(response.data);
    //         setPostData({ title: "", content: "" });
    //         loadPosts();
    //     });
    // }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await addPost(postData);
            console.log(response);
            console.log(response.data);

            setPostData({ title: "", content: "" });
            loadPosts(); // Reload posts after successful submission
            
        } catch (error) {
            // Handle errors here, for example:
            console.error("Failed to add post:", error);
            // Update state to display error message to the user
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
                                    Add Post
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
                                        <Button color="success" className="me-2">Post</Button>
                                        <Button>Reset</Button>
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

AddPost.propTypes = {
    loadPosts: PropTypes.func
}