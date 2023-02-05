import React, { useState, useEffect } from 'react'

function Error(props) {
    const [showError, setShowError] = useState(true);
    // console.log(props.error)
  useEffect(() => {
    console.log('inside useeffect')
    const timeoutId = setTimeout(() => {
      setShowError(false);
    }, 5000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [props.error]);

  if (!showError) {
    return null;
  }
  return (
    <div className={`z-50 fixed top-4 right-4 p-4 bg-red-500 text-white rounded-md ${showError ? 'block' : 'hidden'} transform delay-150`}>
      {props.error}
    </div>
  );
}

export default Error