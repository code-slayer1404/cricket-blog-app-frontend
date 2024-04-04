import { useEffect, useState } from "react"
import { getAllPosts } from "../services/PostService";
import Post from "../components/Post";
import { Col, Container, Row } from "reactstrap";

export default function Home() {

    const [posts, setPosts] = useState([]);

    function loadPosts() {
        getAllPosts().then(r => {
            setPosts(r.data.map(post => {
                return <Post key={post.id} post={post} loadPosts={loadPosts}></Post>
            }))
        })
    }

    useEffect(() => {
        loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <Container style={{ marginTop: "80px" }}>
                <Row>
                    <Col md={{ size: 8, offset: 2 }}>
                        <div className="my-5">
                            {posts}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}