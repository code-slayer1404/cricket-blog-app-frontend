import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, CardHeader, CardBody, CardText, CardFooter } from 'reactstrap';
import { getPost, myDateFormatter } from '../services/PostService';
import CommentBox from '../components/CommentBox';

function OpenPost() {
    const { id } = useParams();
    const [post, setPost] = useState({
        title: "",
        content: "",
        user: {},
        date: ""
    });

    function loadPost(arg) {
        // Fetch the post with the given ID and update post state
        getPost(arg).then(
            r => {
                console.log(r);
                setPost({
                    title: r.data.title,
                    content: r.data.content,
                    user: r.data.user,
                    date: myDateFormatter(r.data.date)
                })
            }
        );
    }

    useEffect(() => {
        loadPost(id);
        console.log(typeof id);
    }, [id]);

    return (
        <Container style={{ marginTop: "80px" }}>
            <Row>
                <Col md={{ size: 8, offset: 2 }} className="mt-5">
                    <Card className='mb-3'>
                        <CardHeader>
                            <h2 className='d-flex justify-content-between  align-items-center m-0'><span>{post.title}</span><span className='h5 m-0'>{post.date}</span></h2>
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
                    <Card>
                        <CardBody>
                            <CommentBox postId={id}></CommentBox>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default OpenPost;
