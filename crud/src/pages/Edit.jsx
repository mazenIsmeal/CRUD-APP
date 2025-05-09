import {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { editPost } from '../state/postSlice';
import Loading from "../components/Loading"
import usePostDetails from "../hooks/use-post-details"
import {Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import WithGuard from '../util/WithGuard';
import { useFormik } from 'formik';
import { postSchema } from '../util/validationSchema';

const Edit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading, post, error} = usePostDetails()

  useEffect(() => {
    return () => {
      dispatch({type: 'posts/cleanRecord'})
    }
  }, [dispatch])

    // Formik
      const formik = useFormik({
        initialValues: {
          title: post ? post?.title : '',
          description: post ? post?.description : '',
        },
        validationSchema: postSchema,
        enableReinitialize: true,
        onSubmit: values => {
          dispatch(editPost({id: post.id, title: values.title, description: values.description})).unwrap().then(() => navigate('/'))
        }
      });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter Title"
        name='title' 
        onChange={formik.handleChange} 
        value={formik.values.title}
        isInvalid={!!formik.errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control 
        as="textarea" 
        rows={3} 
        name='description' 
        onChange={formik.handleChange} 
        value={formik.values.description}
        isInvalid={!!formik.errors.description}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.description}
        </Form.Control.Feedback>
      </Form.Group>
    <Loading loading={loading} error={error}>
        <Button variant="primary" type='submit'>Submit</Button>
    </Loading>
    </Form>
  )
}

export default WithGuard(Edit)