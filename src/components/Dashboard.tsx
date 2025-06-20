import React from 'react';
import ChartComponent from './ChartComponent';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Trading Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.email}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>
      
      <div className="dashboard-content">
        <div className="chart-container">
          <ChartComponent 
            height="600px"
            className="main-chart"
          />
        </div>
        
        <div className="dashboard-sidebar">
          <div className="widget market-stats">
            <h3>Market Statistics</h3>
            <div className="stat-item">
              <span className="stat-label">Symbol:</span>
              <span className="stat-value">ES</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Exchange:</span>
              <span className="stat-value">CME</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Timeframe:</span>
              <span className="stat-value">5m</span>
            </div>
          </div>
          
          <div className="widget user-stats">
            <h3>User Info</h3>
            <div className="stat-item">
              <span className="stat-label">Email:</span>
              <span className="stat-value">{user?.email}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Last Sign In:</span>
              <span className="stat-value">
                {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 