import {memo} from 'react'
import {
    Table
  } from "react-bootstrap";
import PostListItem from './PostListItem';

export const PostList = ({data, deleteHandler}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th style={{ width: "70%" }}>Title</th>
          <th style={{ width: "10%" }}></th>
        </tr>
      </thead>
      <tbody>
        <PostListItem data={data} deleteHandler={deleteHandler} />
      </tbody>
    </Table>
  )
}

export default memo(PostList)