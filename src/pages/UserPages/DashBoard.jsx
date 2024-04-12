/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { getUserPosts } from "../../services/PostService";
import Post from "../../components/Post";
import AddPost from "./AddPost";
import Pagination from "../../components/Pagination";


export default function DashBoard() {

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    function loadPosts(num) {

        getUserPosts(num).then(r => {
            console.log(r.data);
            setPosts(r.data.content.map((e) => { return <Post key={e.id} post={e} loadPosts={loadPosts}></Post> }));
            console.log(posts);
            setCurrentPage(r.data.currentPage);
            setTotalPages(r.data.totalPages);
        }).catch(e=>{
            console.error("error loading posts",e);
        });
    }

    useEffect(() => {
        loadPosts(currentPage);
    }, []);

    function onPageChange(num) {
        loadPosts(num);
    }

    return (
        <>
            <AddPost loadPosts={loadPosts}></AddPost>

            <Container>
                <Row>
                    <Col md={{ size: 8, offset: 2 }} className="mt-5">

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