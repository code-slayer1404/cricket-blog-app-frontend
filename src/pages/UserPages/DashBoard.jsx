/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, Input, Label, Row } from "reactstrap";
import { addPost, getUserPosts } from "../../services/PostService";
import Post from "../../components/Post";

export default function DashBoard() {

    const [postData, setPostData] = useState({
        title: "",
        content: ""
    });

    const [posts, setPosts] = useState([]);

    const [postsUpdated, setPostsUpdated] = useState(0);

    function updatePostContainer() {
        setPostsUpdated(postsUpdated + 1);
    }

    function loadPosts() {
        getUserPosts().then(r => {
            console.log(r.data);
            setPosts(r.data.map((e) => { return <Post key={e.id} post={e} updatePostContainer={updatePostContainer}></Post> }))
            console.log(posts);
        });
    }




    useEffect(() => {
        // try to make a load posts function and pass it to update delete functions
        loadPosts();
    }, [postsUpdated])



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

        addPost(postData).then(response => {
            console.log(response);
            console.log(response.data);
            setPostData({ title: "", content: "" });
            setPostsUpdated((prev) => prev + 1);
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
                                        <Button className="me-2">Post</Button>
                                        <Button>Reset</Button>
                                        <br />
                                        {postData.title + " " + postData.content}
                                    </div>
                                </CardFooter>
                            </Card>
                        </Form>

                        <div className="my-5">
                            {posts}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}