import React from 'react';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';

interface LikeButtonState {
    isChecked: boolean;
}

class LikeButton extends React.Component<{}, LikeButtonState> {
    state: LikeButtonState = {
        isChecked: false,
    };
    
    onClick = () => {
        
        fetch('/cody/like', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isChecked: !this.state.isChecked }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.setState(prevState => ({
                        isChecked: !prevState.isChecked,
                    }));
                }
            })
            .catch(error => {
                console.error('좋아요 오류:', error);
            });
    };

    render(){
        return(
            <React.Fragment>
                <div className="icons-list">
                    {this.state.isChecked ? 															
                    <HeartFilled style={{ color: 'red', fontSize: '2rem'}} onClick={this.onClick}/> :	
                    <HeartOutlined style={{ color: 'white', fontSize: '2rem'}} onClick={this.onClick}/>}				
                </div>
            </React.Fragment> 
        )
    }
}
export default LikeButton;