import React from 'react'
import {
    Button,
    ButtonGroup,
  } from "react-bootstrap";
  import { Link, useNavigate } from 'react-router-dom';

const PostListItem = ({data, deleteHandler}) => {
  const navigate = useNavigate()
    const askDelete = (item) => {
        if (window.confirm(`Do you want to delete item post: ${item.title}?`)) {
            deleteHandler(item.id)
        }
    }

    const posts = data.map((el, idx) => (
        <tr key={el.id}>
          <td>#{++idx}</td>
          <td>
            <Link to={`${el.id}/details`}>{el.title}</Link>
          </td>
          <td>
            <ButtonGroup aria-label="Basic example">
              <Button variant="success" onClick={() => navigate(`${el.id}/edit`)}>Edit</Button>
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