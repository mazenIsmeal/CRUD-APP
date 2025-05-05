import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getItem} from '../state/postSlice'
import { useParams } from 'react-router-dom'

const usePostDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams()
    const {loading, error, post} = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(getItem(id))
  }, [dispatch, id])

  return {loading, error, post}
}

export default usePostDetails;