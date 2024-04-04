import { useEffect, useState } from "react"
import { getAllPosts } from "../services/PostService";
import Post from "../components/Post";
import { Col, Container, Row } from "reactstrap";

export default function Home(){

    const [posts,setPosts] = useState([]);

    const [postsUpdated, setPostsUpdated] = useState(0);

    function updatePostContainer() {
        setPostsUpdated(postsUpdated + 1);
    }

    useEffect(()=>{
        getAllPosts().then(r=>{
            setPosts(r.data.map(post => {
                return <Post key={post.id} post={post} updatePostContainer={updatePostContainer}></Post>
            }))
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[postsUpdated])
    return(
        <>
            <Container style={{ marginTop: "80px" }}>
                <Row>
                    <Col md={{size:8,offset:2}}>
                        <div className="my-5">
                            {posts}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}