import React, { Component } from 'react';



class ItemList extends Component {
  state = {
    text: '',
  };

  handleSubmit = () => {

    this.setState({
      text: '',
    });
  };
  render() {
    const { text } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>a
          <input value={text} name="text" placeholder="..입력"> </input>
          <button type="submit">추가</button>
        </form>
      </div>
    );
  }
}

export default ItemList;