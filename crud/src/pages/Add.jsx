import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { insertPost } from '../state/postSlice';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';

const Add = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading, error} = useSelector((state) => state);
  const formHandler = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 500)
    dispatch(insertPost({id, title, description})).unwrap()
    .then((originalPromiseResult) => {
      // handle result here
      navigate('/')
    }).catch((error) => {
      // handle error here
      console.log(error)
    })
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

export default Add