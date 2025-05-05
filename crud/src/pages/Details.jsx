import Loading from "../components/Loading"
import usePostDetails from "../hooks/use-post-details"

const Details = () => {
  const {loading, post, error} = usePostDetails()
  console.log(post)

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