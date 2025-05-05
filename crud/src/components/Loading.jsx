import React from 'react'

const Loading = ({loading, error, children}) => {
  const elementType = children?.type?.displayName || children?.type?.name;

  const renderHandler = () => {
    if(elementType === "Button") {
      const cloneButton = React.cloneElement(
        children,
        { disabled: true },
        "Loading..."
      );
      return (
        <>
        {
        loading ? cloneButton: 
        error ? 
            <>
              {children}
              <p>{error}</p>
            </>
        : children
        }
    </>
      )
    }
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
  
  return (
    <>
      {renderHandler()}
    </>
  )
}

export default Loading