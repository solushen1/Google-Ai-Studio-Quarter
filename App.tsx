
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import DepartmentSelector from './components/DepartmentSelector';
import ReportForm from './components/ReportForm';
import { Department, ReportData } from './types';
import { DEPARTMENT_SCHEMAS } from './constants/departmentSchemas';
import useLocalStorage from './hooks/useLocalStorage';
import SavedReportsList from './components/SavedReportsList';
import { ISavedReport, getAllReports, addReport, updateReport, deleteReport } from './db';
import { EXAMPLE_DATA } from './constants/exampleData';

type SortKey = 'savedAt' | 'departmentName';
type SortDirection = 'ascending' | 'descending';
export interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

const App: React.FC = () => {
  const [allSchemas, setAllSchemas] = useLocalStorage<Department[]>('department-schemas', DEPARTMENT_SCHEMAS);
  const [selectedDepartmentName, setSelectedDepartmentName] = useState<string>('');
  const [savedReports, setSavedReports] = useState<ISavedReport[]>([]);
  const [activeReport, setActiveReport] = useState<ISavedReport | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'savedAt', direction: 'descending' });

  const refreshSavedReports = useCallback(async () => {
    const reports = await getAllReports();
    setSavedReports(reports);
  }, []);

  useEffect(() => {
    refreshSavedReports();
  }, [refreshSavedReports]);

  const sortedReports = useMemo(() => {
    const sortableReports = [...savedReports];
    sortableReports.sort((a, b) => {
      let comparison = 0;
      if (sortConfig.key === 'departmentName') {
          comparison = a.departmentName.localeCompare(b.departmentName);
      } else {
          if (a.savedAt > b.savedAt) {
            comparison = 1;
          } else if (a.savedAt < b.savedAt) {
            comparison = -1;
          }
      }
      return sortConfig.direction === 'ascending' ? comparison : -comparison;
    });
    return sortableReports;
  }, [savedReports, sortConfig]);

  const departmentToDisplay = activeReport ? activeReport.departmentName : selectedDepartmentName;

  const selectedDepartmentSchema = useMemo(() => {
    return allSchemas.find(d => d.department === departmentToDisplay) || null;
  }, [departmentToDisplay, allSchemas]);
  
  const exampleDepartmentData = useMemo(() => {
      return EXAMPLE_DATA[departmentToDisplay] || null;
  }, [departmentToDisplay]);

  const departmentOptions = useMemo(() => 
    allSchemas.map(d => d.department).sort((a, b) => a.localeCompare(b)), 
  [allSchemas]);

  const handleSchemaUpdate = useCallback((updatedSchema: Department) => {
    setAllSchemas(prevSchemas => {
      const index = prevSchemas.findIndex(s => s.department === updatedSchema.department);
      if (index > -1) {
        const newSchemas = [...prevSchemas];
        newSchemas[index] = updatedSchema;
        return newSchemas;
      }
      return prevSchemas;
    });
  }, [setAllSchemas]);

  const handleSelectDepartment = (deptName: string) => {
    setSelectedDepartmentName(deptName);
    setActiveReport(null); // Start a new report
  };
  
  const handleLoadReport = (report: ISavedReport) => {
      setActiveReport(report);
      setSelectedDepartmentName(report.departmentName);
  };
  
  const handleDeleteReport = async (id: number) => {
      if (window.confirm("Are you sure you want to delete this report? This action cannot be undone.")) {
          await deleteReport(id);
          await refreshSavedReports();
          if (activeReport?.id === id) {
              setActiveReport(null);
              setSelectedDepartmentName('');
          }
      }
  };

  const handleSaveReport = async (formData: ReportData) => {
      if (activeReport?.id) { // Update existing report
          await updateReport(activeReport.id, formData);
          const updatedReport = { ...activeReport, formData, savedAt: Date.now() };
          setActiveReport(updatedReport);
          alert("Report updated successfully!");
      } else { // Create new report
          if (!selectedDepartmentName) {
              alert("Please select a department before saving.");
              return;
          }
          const newReport: ISavedReport = {
              departmentName: selectedDepartmentName,
              formData,
              savedAt: Date.now(),
          };
          const newId = await addReport(newReport);
          setActiveReport({ ...newReport, id: newId as number });
          alert("Report saved successfully!");
      }
      await refreshSavedReports();
  };
  
  const handleClearActiveReport = () => {
    setActiveReport(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <img src="https://picsum.photos/100/100?grayscale" alt="Church Logo" className="mx-auto h-20 w-20 rounded-full object-cover mb-4 shadow-md"/>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            SDA Church Quarterly Reports
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            An offline tool for departmental reporting.
          </p>
        </header>

        <main className="space-y-8">
           <SavedReportsList 
            reports={sortedReports}
            onLoad={handleLoadReport}
            onDelete={handleDeleteReport}
            activeReportId={activeReport?.id}
            sortConfig={sortConfig}
            onSortChange={setSortConfig}
          />

          <DepartmentSelector
            departments={departmentOptions}
            selectedDepartment={departmentToDisplay}
            onSelectDepartment={handleSelectDepartment}
          />

          {selectedDepartmentSchema ? (
            <div className="mt-8">
              <ReportForm 
                key={activeReport?.id || selectedDepartmentName} 
                schema={selectedDepartmentSchema}
                onSchemaChange={handleSchemaUpdate}
                initialData={activeReport?.formData}
                onSave={handleSaveReport}
                exampleData={exampleDepartmentData}
                onClear={handleClearActiveReport}
              />
            </div>
          ) : (
            !departmentToDisplay && (
              <div className="mt-8 text-center bg-white p-12 rounded-lg shadow-md border border-slate-200">
                <h2 className="text-xl font-medium text-slate-700">Please select a department to begin.</h2>
                <p className="text-slate-500 mt-2">Your report form will appear here once a department is chosen.</p>
              </div>
            )
          )}
        </main>
        
        <footer className="text-center mt-12 text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} SDA Quarterly Reports. Built for offline use.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;