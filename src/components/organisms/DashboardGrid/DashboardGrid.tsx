import React from 'react';
import { Card } from '../../atoms';

export const DashboardGrid: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {['Stats', 'Recent Activity', 'Quick Links'].map((title) => (
      <Card key={title}>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p>Placeholder content for {title}.</p>
      </Card>
    ))}
  </div>
);