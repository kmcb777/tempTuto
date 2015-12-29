import React from 'react';
 
class Hello extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    setInterval(this.increaseCount.bind(this), 1000)
  }

  increaseCount() {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return <h1>{this.state.count} !</h1>
  }
}
 
React.render(<Hello/>, document.getElementById('hello'))