import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='bg-gradient-to-br from-[#2b0d54] via-[#865c9d] to-[#b77fcd] min-h-screen w-full font-nunito '>
      {children}
    </div>
  )
}

export default Layout
