import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  const getStyle = ({ isActive }) => ({
    color: isActive ? 'blue' : 'black',
    textDecoration: isActive ? 'underline' : 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    marginRight: '15px'
  });

  return (
    <nav style={{ padding: '10px 0', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
      <NavLink to="/" end style={getStyle}>Trang chủ</NavLink>
      <NavLink to="/questions" style={getStyle}>Ngân hàng câu hỏi</NavLink>
      <NavLink to="/history" style={getStyle}>Lịch sử</NavLink>
    </nav>
  );
};