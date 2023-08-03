import React from 'react';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import styled from 'styled-components';

class LikeButton extends React.Component{
    state = {
        isChecked: false,		
    };

    onClick = () => {				
        this.state.isChecked ?		
        this.setState({
            isChecked: false,		
        })
        :
        this.setState({				
            isChecked: true,		
        });
    }

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