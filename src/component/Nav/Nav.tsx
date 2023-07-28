import { Link } from 'react-router-dom';
import React from 'react';
import './Nav.css';

const Nav: React.FC = () => {
    return (
        <div>
            <div className='NavBar'>
                <Link className='NavBarHome' to={'/'}>홈</Link>
                <Link className='NavBarMyPage' to={'/MyPage'}>마이페이지</Link>
                <Link className='NavBarFriend' to={'/Friend'}>친구</Link>
                <Link className='NavBarMenu' to={'/Menu'}>더보기</Link>
            </div>
        </div>
    );
};

export default Nav;