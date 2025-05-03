import React, {useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getPosts, deletePost} from '../state/postSlice'
import PostList from '../components/PostList'
import Loading from '../components/Loading'

const Index = () => {
  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  const deleteHandler = useCallback((id) => dispatch(deletePost(id)), [dispatch])

  return (
    <Loading loading={loading} error={error}>
      <PostList data={posts} deleteHandler={deleteHandler} />
    </Loading>
  )
}

export default Index