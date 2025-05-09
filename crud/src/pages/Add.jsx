import { useDispatch } from 'react-redux';
import { insertPost } from '../state/postSlice';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import WithGuard from '../util/WithGuard'
import { useFormik } from 'formik';
import { postSchema } from '../util/validationSchema';

const Add = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {loading, error} = useSelector((state) => state.posts);

  // Formik
    const formik = useFormik({
      initialValues: {
        title: '',
        description: '',
      },
      validationSchema: postSchema,
      onSubmit: values => {
        const id = Math.floor(Math.random() * 500)
        dispatch(insertPost({id, title: values.title, description: values.description})).unwrap()
        .then((originalPromiseResult) => {
          // handle result here
          navigate('/')
        }).catch((error) => {
          // handle error here
          console.log(error)
        })
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

export default WithGuard(Add)