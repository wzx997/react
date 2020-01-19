import React from 'react';
import './assets/css/App.css';

class  App extends React.Component{

  render() {
    return (
        <div>
            {this.props.children}
        </div>
    );
  }
}

export default App;
