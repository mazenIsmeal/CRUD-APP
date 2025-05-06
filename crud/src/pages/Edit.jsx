import {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { editPost } from '../state/postSlice';
import Loading from "../components/Loading"
import usePostDetails from "../hooks/use-post-details"
import {Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading, post, error} = usePostDetails()

  // State
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setDescription(post.description)
    }
  }, [post])

  useEffect(() => {
    return () => {
      dispatch({type: 'posts/cleanRecord'})
    }
  }, [dispatch])

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(editPost({id: post.id, title: title, description: description})).unwrap().then(() => navigate('/'))
  }

  return (
    <Form onSubmit={formHandler}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>
    <Loading loading={loading} error={error}>
        <Button variant="primary" type='submit'>Submit</Button>
    </Loading>
    </Form>
  )
}

export default Edit