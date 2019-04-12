import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import CommentList from "./components/commentList.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
    this.getMessages = this.getMessages.bind(this)
  }

  componentDidMount() {
    this.getMessages()
  }

  getMessages() {
    const path = window.location.pathname
    axios
      .get(`/messages${path}`)
      .then(({data}) => {
        this.setState({comments: data})
      })
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div>
        <CommentList comments={this.state.comments} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("commentRoot"));
