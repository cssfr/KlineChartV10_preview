import ChartComponent from './ChartComponent';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Trading Dashboard</h1>
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 