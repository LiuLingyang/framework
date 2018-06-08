import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <div>welcome！</div>,
  document.getElementById('root')
)

// if (module.hot) {
//   module.hot.accept('./component', () => {
//     const nextComponent = component()
//     document.body.replaceChild(nextComponent, demoComponent)
//     demoComponent = nextComponent
//   })
// }

if (module.hot) {
  module.hot.accept()
}
