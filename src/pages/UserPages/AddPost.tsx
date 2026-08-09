import { useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, Input, Label, Row } from "reactstrap";
import { addPost } from "@/services/PostService";
import { PostWriteDTO } from "@/types/dto/PostDTO";

interface AddPostsProps{
    refreshPosts : (num?:number) => void
}

export default function AddPost({ refreshPosts }:AddPostsProps) {

    const [postData, setPostData] = useState<PostWriteDTO>({
        title: "",
        content: ""
    });

    function handleChange(event : React.ChangeEvent<HTMLInputElement>) {
        setPostData(
            (prev) => {
                return {
                    ...prev,
                    [event.target.name]: event.target.value
                }
            }
        )
    }


    async function handleSubmit(event:React.FormEvent) {
        event.preventDefault();
        const result = await addPost(postData);

        if(result.ok) {
            
            setPostData({ title: "", content: "" });
            refreshPosts(); // Reload posts after successful submission
            
        } else {
            console.error("Failed to add post:", result.error);
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