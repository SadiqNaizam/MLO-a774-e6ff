import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';
import SalesCharts from '../components/Dashboard/SalesCharts';
import BalanceOverview from '../components/Dashboard/BalanceOverview';
import DealsStatusTable from '../components/Dashboard/DealsStatusTable';
import TasksWidget from '../components/Dashboard/TasksWidget';

/**
 * CRMDashboardPage displays the main CRM dashboard view.
 * It uses AdminLayout to provide the overall page structure (sidebar, header)
 * and arranges various dashboard widgets like StatsCardGrid, SalesCharts,
 * BalanceOverview, DealsStatusTable, and TasksWidget in the main content area.
 */
const CRMDashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      {/* Main content wrapper providing vertical spacing between major sections */}
      <div className="space-y-6">
        {/* Statistics cards grid, typically spans full width */}
        {/* Based on its own definition, StatsCardGrid will arrange its cards in multiple columns */}
        <StatsCardGrid />
        
        {/* Grid container for the main dashboard widgets like charts and tables */}
        {/* Arranges items in 1 column by default, and 2 columns on large (lg) screens */}
        {/* The items will flow into this grid: 
            On lg screens: 
            Row 1: SalesCharts (col 1) | BalanceOverview (col 2)
            Row 2: DealsStatusTable (col 1) | TasksWidget (col 2)
            On smaller screens, they stack vertically.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales related charts (e.g., Sales Forecast, Deal Type) */}
          <SalesCharts />
          
          {/* Overview of financial balance (e.g., Revenue, Expenses chart) */}
          <BalanceOverview />
          
          {/* Table displaying status of various deals */}
          <DealsStatusTable />
          
          {/* Widget for managing and displaying tasks */}
          <TasksWidget />
        </div>
      </div>
    </AdminLayout>
  );
};

export default CRMDashboardPage;
