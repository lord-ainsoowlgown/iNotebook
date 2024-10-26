import React from 'react'
import Notes from './Notes'

function Home(props) {

  const { showAlert } = props;

  return (
    <div className="mt-5">
      <Notes showAlert={showAlert} />
    </div>
  )
}

export default Home