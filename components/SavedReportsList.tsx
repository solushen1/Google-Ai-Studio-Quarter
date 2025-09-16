import React from 'react';
import { ISavedReport } from '../db';
import Card from './ui/Card';
import Button from './ui/Button';
import { TrashIcon } from './icons/EditorIcons';
import { SortConfig } from '../App';

interface SavedReportsListProps {
  reports: ISavedReport[];
  onLoad: (report: ISavedReport) => void;
  onDelete: (id: number) => void;
  activeReportId?: number;
  sortConfig: SortConfig;
  onSortChange: (config: SortConfig) => void;
}

const SavedReportsList: React.FC<SavedReportsListProps> = ({ reports, onLoad, onDelete, activeReportId, sortConfig, onSortChange }) => {
  if (reports.length === 0) {
    return (
      <Card>
        <div className="p-6 text-center text-slate-500">
          <h3 className="text-lg font-semibold text-slate-700 mb-2">No Saved Reports</h3>
          <p>Your saved reports will appear here. Fill out a form and click "Save Report" to get started.</p>
        </div>
      </Card>
    );
  }

  const getButtonClass = (key: SortConfig['key'], direction: SortConfig['direction']) => {
    const isActive = sortConfig.key === key && sortConfig.direction === direction;
    const baseClasses = 'text-sm px-3 py-1.5';
    if (isActive) {
      return `${baseClasses} bg-blue-600 hover:bg-blue-700 text-white`;
    }
    return `${baseClasses} bg-slate-100 hover:bg-slate-200 text-slate-700`;
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b pb-3 border-slate-200">
          <h3 className="text-xl font-semibold text-slate-800">Saved Reports</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-slate-500 shrink-0">Sort by:</span>
            <div className="flex items-center space-x-2">
               <Button onClick={() => onSortChange({ key: 'savedAt', direction: 'descending' })} className={getButtonClass('savedAt', 'descending')}>
                  Newest
                </Button>
                <Button onClick={() => onSortChange({ key: 'savedAt', direction: 'ascending' })} className={getButtonClass('savedAt', 'ascending')}>
                  Oldest
                </Button>
                <Button onClick={() => onSortChange({ key: 'departmentName', direction: 'ascending' })} className={getButtonClass('departmentName', 'ascending')}>
                  A-Z
                </Button>
            </div>
          </div>
        </div>
        <ul className="space-y-3">
          {reports.map((report) => (
            <li 
              key={report.id} 
              className={`p-4 rounded-lg flex items-center justify-between transition-colors ${activeReportId === report.id ? 'bg-blue-100 border-blue-300 border' : 'bg-slate-50 border-slate-200 border'}`}
            >
              <div>
                <p className="font-semibold text-slate-800">{report.departmentName}</p>
                <p className="text-sm text-slate-500">
                  Saved on: {new Date(report.savedAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={() => onLoad(report)}
                  className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-sm px-3 py-1"
                  disabled={activeReportId === report.id}
                >
                  {activeReportId === report.id ? 'Loaded' : 'Load'}
                </Button>
                <Button 
                  onClick={() => onDelete(report.id!)}
                  className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded-full" 
                  aria-label="Delete report"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default SavedReportsList;