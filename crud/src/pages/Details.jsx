import Loading from "../components/Loading"
import usePostDetails from "../hooks/use-post-details"

import {useEffect} from 'react'
import { useDispatch } from 'react-redux';

const Details = () => {
  const {loading, post, error} = usePostDetails()
  const dispatch = useDispatch()

    useEffect(() => {
      return () => {
        dispatch({type: 'posts/cleanRecord'})
      }
    }, [dispatch])

  return (
    <div>
      <div className="record">
      <Loading loading={loading} error={error}>
        <p>Title: {post?.title}</p>
        <p>Description: {post?.description}</p>
      </Loading>
      </div>
    </div>
  )
}

export default Details