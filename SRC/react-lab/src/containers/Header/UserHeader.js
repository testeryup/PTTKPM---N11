import './UserHeader.scss';
import { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { path } from "../../ultils";
import { logout } from "../../features/auth/authSlice";
import { fetchUserProfile } from '../../features/user/userSlice';

export default function UserHeader() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    const { profile, loading, error } = useSelector(state => state.user);

    useEffect(() => {
        
    }, [profile]);
    
    const handleLogout = async () => {
        await dispatch(logout());
        navigate(path.HOME);
    }
    const handleGoHome = () => {
        navigate(path.HOME);
    }

    
    return (
        <div className="header-container">
            <div className="header-wrapper">
                <div className="header-content">
                    <div className='content-left'>
                        <div className="logo" onClick={handleGoHome}>OCTOPUS</div>
                        <div className="route-section">

                            <ul className='route-list'>
                                <li className='route'>Tất cả sản phẩm</li>
                                <li className='route'>Sản phẩm mua nhiều</li>
                                <li className='route'>Sản phẩm khuyến mại</li>
                                <li className='route'>Nạp tiền</li>
                            </ul>
                        </div>
                    </div>
                    <div className='content-right'>
                        {
                            profile ?
                                (
                                    <div className="user-section">

                                        <div className='cart-section'>
                                            <div className='add-to-cart'>
                                                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                                            </div>
                                        </div>
                                        <div className='user-avatar'></div>
                                        <div className='user-info'>
                                            <div className='user-menu'>
                                                <div className="user-trigger">
                                                    <span>{profile.username ? profile.username : 'undefined'}</span>
                                                    <FontAwesomeIcon icon="chevron-down" />
                                                </div>
                                                <div className="dropdown-content">
                                                    <Link to={path.PROFILE}>
                                                        <FontAwesomeIcon icon="user" />
                                                        Trang cá nhân
                                                    </Link>
                                                    <Link to="/orders">
                                                        <FontAwesomeIcon icon="shopping-bag" />
                                                        Đơn hàng
                                                    </Link>
                                                    <Link to="/settings">
                                                        <FontAwesomeIcon icon="cog" />
                                                        Cài đặt
                                                    </Link>
                                                    <Link onClick={handleLogout} className="logout">
                                                        <FontAwesomeIcon icon="sign-out-alt" />
                                                        Đăng xuất
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className='balance-section'><span>{profile.balance >= 0 ? profile.balance : 'not defined!'}</span><FontAwesomeIcon icon="fa-solid fa-wallet" /></div>
                                        </div>

                                    </div>
                                )
                                :
                                (<div className='login-route'>
                                    <button className='btn-login' ><Link to={path.LOGIN}>Đăng nhập</Link></button>
                                </div>)
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}