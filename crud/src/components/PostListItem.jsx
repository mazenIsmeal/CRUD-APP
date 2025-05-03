import React from 'react'
import {
    Button,
    ButtonGroup,
  } from "react-bootstrap";

const PostListItem = ({data, deleteHandler}) => {
    const askDelete = (item) => {
        if (window.confirm(`Do you want to delete item post: ${item.title}?`)) {
            deleteHandler(item.id)
        }
    }

    const posts = data.map((el, idx) => (
        <tr key={el.id}>
          <td>#{++idx}</td>
          <td>{el.title}</td>
          <td>
            <ButtonGroup aria-label="Basic example">
              <Button variant="success">Edit</Button>
              <Button variant="danger" onClick={() => askDelete(el)}>Delete</Button>
            </ButtonGroup>
          </td>
        </tr>
      ))
  return (
    <>
        {posts}
    </>
  )
}

export default PostListItem