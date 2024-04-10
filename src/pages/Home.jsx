import { useEffect, useState } from "react"
import { getAllPosts } from "../services/PostService";
import Post from "../components/Post";
import { Col, Container, Row } from "reactstrap";
import Pagination from "../components/Pagination";

export default function Home() {

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    function loadPosts(num=1) {
        getAllPosts(num).then(r => {
            setPosts(r.data.posts.map(post => {
                return <Post key={post.id} post={post} loadPosts={loadPosts}></Post>
            }));
            setCurrentPage(r.data.currentPage);
            setTotalPages(r.data.totalPages);
        })
    }

    useEffect(() => {
        loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    function onPageChange(num) {
        loadPosts(num);
    }


    return (
        <>
            <Container style={{ marginTop: "80px" }}>
                <Row>
                    <Col md={{ size: 8, offset: 2 }}>
                        <div className="my-5">
                            {posts}
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}></Pagination>
                    </Col>
                </Row>
                
            </Container>
        </>
    )
}