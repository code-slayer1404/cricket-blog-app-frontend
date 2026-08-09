import {  useEffect, useState } from "react"
import { getAllPosts } from "@/services/PostService";
import Post from "@/components/Post";
import { Col, Container, Row } from "reactstrap";
import Pagination from "@/components/Pagination";
import { PostReadDTO } from "@/types/dto/PostDTO";

export default function Home() {
    const [posts, setPosts] = useState<PostReadDTO[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    async function loadPosts (num:number) {
        const result = await getAllPosts(num);
        if (result.ok) {
            const data = result.data
            setPosts(data.content);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
        } else {
            console.log(result.error);
        }
    }

    useEffect(() => {
        loadPosts(currentPage);
    }, [currentPage]);


    function onPageChange(num: number) {
        setCurrentPage(num);
    }

    function refreshPosts(){
        loadPosts(currentPage)
        // loadPosts(1) if you want redirect to page 1
    }

    return (
        <>
            <Container style={{ marginTop: "80px" }}>
                <Row>
                    <Col md={{ size: 8, offset: 2 }}>
                        <div className="my-5">
                            {posts.map(post => <Post key={post.id} post={post} refreshPosts={refreshPosts}></Post>)}
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}></Pagination>
                    </Col>
                </Row>

            </Container>
        </>
    )
}