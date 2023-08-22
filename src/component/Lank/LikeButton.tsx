import React from 'react';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';

class LikeButton extends React.Component {
    state = {
      isChecked: false,
      loading: false,
      responseData: {},
    };
  
    componentDidMount() {
      this.fetchLikeStatus();
    }
  
    fetchLikeStatus = async (codyId = 0) => {
      this.setState({ loading: true });
  
      try {
        const response = await fetch(
          `http://13.209.15.210:8080/cody/like?codyId=${codyId}`
        );
        const data = await response.json();
  
        if (data.success) {
          this.setState({
            responseData: data.data,
          });
        }
      } catch (error) {
        console.error("좋아요 오류:", error);
      } finally {
        this.setState({ loading: false });
      }
    };
  
    onClick = () => {
      this.state.isChecked
        ? this.setState({
            isChecked: false,
          })
        : this.setState({
            isChecked: true,
          });
    };
    render() {
      return (
        <React.Fragment>
          <div className="icons-list">
            {this.state.isChecked ? (
              <HeartFilled
                style={{ color: "red", fontSize: "2rem" }}
                onClick={this.onClick}
                disabled={this.state.loading}
              />
            ) : (
              <HeartOutlined
                style={{ color: "white", fontSize: "2rem" }}
                onClick={this.onClick}
                disabled={this.state.loading}
              />
            )}
          </div>
        </React.Fragment>
      );
    }
  }
  export default LikeButton;