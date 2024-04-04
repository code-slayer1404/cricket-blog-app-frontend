/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { getUserPosts } from "../../services/PostService";
import Post from "../../components/Post";
import AddPost from "./AddPost";


export default function DashBoard() {

    const [posts, setPosts] = useState([]);

    function loadPosts() {
        getUserPosts().then(r => {
            console.log(r.data);
            setPosts(r.data.map((e) => { return <Post key={e.id} post={e} loadPosts={loadPosts}></Post> }))
            console.log(posts);
        });
    }

    useEffect(() => {
        loadPosts();
    }, [])

    return (
        <>
            <AddPost loadPosts={loadPosts}></AddPost>

            <Container>
                <Row>
                    <Col md={{ size: 8, offset: 2 }} className="mt-5">

                        <div className="my-5">
                            {posts}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}