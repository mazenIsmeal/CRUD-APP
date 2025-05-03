import React from 'react'

const Loading = ({loading, error, children}) => {
  // const cloneButton = children.type.render.displayName
  
  return (
    <>
        {
        loading ? 
            <p colSpan={3}>Loading Please Wait....</p> : 
        error ? 
            <p colSpan={3}>{error}</p>
        : children
        }
    </>
  )
}

export default Loading