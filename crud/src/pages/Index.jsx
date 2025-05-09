import React, {useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getPosts, deletePost} from '../state/postSlice'
import PostList from '../components/PostList'
import Loading from '../components/Loading'

const Index = () => {
  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector((state) => state.posts);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  const deleteHandler = useCallback((id) => dispatch(deletePost(id)), [dispatch])

  return (
    <Loading loading={loading} error={error}>
      <PostList data={posts} deleteHandler={deleteHandler} isLoggedIn={isLoggedIn} />
    </Loading>
  )
}

export default Index