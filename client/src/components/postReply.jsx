import React from "react";
import axios from "axios";

class PostReply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Post A Reply...'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const text = this.state.value
    const path = window.location.pathname;
    axios.post(`${path}reply/${this.props.messageId}`, {
      text: text
    })
      .then(
        axios.get(`${path}newreply`).then(({data}) => {
          this.props.addReply(data)
        })
      )
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Reply" />
      </form>
    );
  }
}

export default PostReply;
