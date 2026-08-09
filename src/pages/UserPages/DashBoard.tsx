import {  useEffect, useState } from "react";
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

    async function loadPosts (num : number) {
        const result = await getUserPosts(num)
        if (result.ok) {
            const data = result.data
            // console.log(data);
            setPosts(data.content);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
        } else {
            console.error("error loading posts", result.error);
        }
    }

    useEffect(() => {
        loadPosts(currentPage);
    }, [currentPage]);

    function onPageChange(num: number) {
        setCurrentPage(num)
    }

    function refreshPosts(){
        loadPosts(currentPage)
    }

    return (
        <>
            <AddPost refreshPosts={refreshPosts}></AddPost>

            <Container>
                <Row>
                    <Col md={{ size: 8, offset: 2 }} className="mt-5">

                        <div className="my-5">
                            {posts.map((post) => { return <Post key={post.id} post={post} refreshPosts={refreshPosts}></Post> })}
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}></Pagination>
                    </Col>
                </Row>
            </Container>
        </>
    )
}