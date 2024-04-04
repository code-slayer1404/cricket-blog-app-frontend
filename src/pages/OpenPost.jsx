import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, CardHeader, CardBody, CardText, CardFooter } from 'reactstrap';
import { getPost } from '../services/PostService';

function OpenPost() {
    const { id } = useParams();
    const [post, setPost] = useState({
        title: "",
        content: "",
        user : {}
    });

    useEffect(() => {
        // Fetch the post with the given ID and update post state
        getPost(id).then(
            r => {
                console.log(r);
                setPost({
                    title: r.data.title,
                    content: r.data.content,
                    user : r.data.user
                })
            }
        );
    }, [id]);

    return (
        <Container style={{ marginTop: "80px" }}>
            <Row>
                <Col md={{ size: 8, offset: 2 }} className="mt-5">
                    <Card>
                        <CardHeader>
                            <h2>{post.title}</h2>
                        </CardHeader>
                        <CardBody>
                            <CardText>
                                {post.content}
                            </CardText>
                        </CardBody>
                        <CardFooter>
                            <div className='d-flex'><div className='ms-auto'>{post.user.name}</div></div>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default OpenPost;
