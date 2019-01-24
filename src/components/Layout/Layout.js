import React from 'react'

const layout = (props) => (
  // React.Fragment https://reactjs.org/docs/fragments.html
  <>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>
      {props.children}
    </main>
  </>
);

export default layout
