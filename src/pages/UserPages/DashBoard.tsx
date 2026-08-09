/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { getUserPosts } from "@/services/PostService";
import Post from "@/components/Post";
import AddPost from "@/pages/UserPages/AddPost";
import Pagination from "@/components/Pagination";
import { PostReadDTO } from "@/types/dto/PostDTO";


export default function DashBoard() {

    const [posts, setPosts] = useState<PostReadDTO[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    function loadPosts(num?:number) {

        getUserPosts(num).then(data => {
            console.log(data);
            setPosts(data.content);
            console.log(posts);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
        }).catch(e=>{
            console.error("error loading posts",e);
        });
    }

    useEffect(() => {
        loadPosts(currentPage);
    }, []);

    function onPageChange(num:number) {
        loadPosts(num);
    }

    return (
        <>
            <AddPost loadPosts={loadPosts}></AddPost>

            <Container>
                <Row>
                    <Col md={{ size: 8, offset: 2 }} className="mt-5">

                        <div className="my-5">
                            {posts.map((post) => { return <Post key={post.id} post={post} loadPosts={loadPosts}></Post> })}
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}></Pagination>
                    </Col>
                </Row>
            </Container>
        </>
    )
}