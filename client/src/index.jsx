import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import CommentList from "./components/commentList.jsx";
import PostComment from "./components/postComment.jsx"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
    this.getComments = this.getComments.bind(this)
    this.addComment = this.addComment.bind(this)
  }

  componentDidMount() {
    this.getComments()
  }

  getComments() {
    const path = window.location.pathname
    axios
      .get(`${path}messages`)
      .then(({data}) => {
        this.setState({comments: data})
      })
      .catch((err) => console.log(err))
  }

  addComment(comment) {
    let newState = this.state.comments.concat(comment)
    this.setState({comments: newState})
  }

  render() {
    return (
      <div>
        <CommentList comments={this.state.comments} />
        <PostComment addComment={this.addComment}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("commentRoot"));