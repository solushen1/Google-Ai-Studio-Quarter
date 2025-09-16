
import React, { useState, useCallback, useEffect } from 'react';
import { Department, ReportData, Section, ExampleSectionData } from '../types';
import FormSection from './FormSection';
import Button from './ui/Button';
import { generatePdf } from '../utils/pdfGenerator';
import { SpinnerIcon } from './icons/EditorIcons';

interface ReportFormProps {
  schema: Department;
  onSchemaChange: (updatedSchema: Department) => void;
  initialData?: ReportData;
  onSave: (formData: ReportData) => void;
  exampleData?: ExampleSectionData | null;
  onClear: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ schema, onSchemaChange, initialData, onSave, exampleData, onClear }) => {
  const [formData, setFormData] = useState<ReportData>(initialData || {});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  useEffect(() => {
    if (!activeTooltip) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if the click was on any info button. If so, let that button's own onClick handle it.
      const isInfoButton = target.closest('button[aria-label*="Show"]');
      if (!isInfoButton) {
        setActiveTooltip(null);
      }
    };

    // Use 'click' event. 'click' is not fired when interacting with a scrollbar
    // or when scrolling via touch-drag, which gracefully handles the user's request.
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeTooltip, setActiveTooltip]);


  const handleDataChange = useCallback((sectionName: string, data: any) => {
    setFormData(prev => {
      const existingSectionData = prev[sectionName];
      let newSectionData;

      if (Array.isArray(data)) {
        // Data from FormTable is an array, so replace it directly.
        newSectionData = data;
      } else {
        // Data from FormField is an object, merge with existing.
        newSectionData = {
          ...(Array.isArray(existingSectionData) ? {} : (existingSectionData as object)),
          ...data,
        };
      }

      return {
        ...prev,
        [sectionName]: newSectionData,
      };
    });
  }, []);

  const handleGeneratePdf = () => {
    setIsGeneratingPdf(true);
    try {
      generatePdf(schema, formData);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("An error occurred while generating the PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleClearForm = () => {
    if (window.confirm("Are you sure you want to clear the data in this form? This will not delete a saved report.")) {
      onClear();
    }
  };
  
  const handleSaveClick = () => {
    onSave(formData);
  };

  if (schema.sections.length === 0) {
    return (
       <div className="mt-8 text-center bg-white p-12 rounded-lg shadow-md border border-slate-200">
          <h2 className="text-xl font-medium text-slate-700">Template Coming Soon</h2>
          <p className="text-slate-500 mt-2">The report template for '{schema.department}' has not been configured yet.</p>
        </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-4 z-10 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">{schema.department} Report</h2>
        <div className="flex items-center space-x-4">
          <label htmlFor="edit-mode-toggle" className="flex items-center cursor-pointer">
            <span className="mr-3 text-sm font-medium text-slate-700">Edit Template</span>
            <div className="relative">
              <input
                type="checkbox"
                id="edit-mode-toggle"
                className="sr-only"
                checked={isEditMode}
                onChange={() => setIsEditMode(!isEditMode)}
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
            </div>
          </label>
        </div>
      </div>
      
      {schema.sections.map((section, index) => (
        <FormSection
          key={`${section.name}-${index}`}
          section={section}
          isEditMode={isEditMode}
          onDataChange={handleDataChange}
          formData={formData[section.name]}
          onSchemaChange={(updatedSection: Section) => {
            const newSections = [...schema.sections];
            newSections[index] = updatedSection;
            onSchemaChange({...schema, sections: newSections});
          }}
          exampleData={exampleData?.[section.name]}
          activeTooltip={activeTooltip}
          setActiveTooltip={setActiveTooltip}
        />
      ))}

      <div className="flex justify-end items-center pt-4 space-x-2">
        <Button onClick={handleClearForm} className="bg-red-600 hover:bg-red-700 text-white">
          Clear Form
        </Button>
        <Button onClick={handleSaveClick} className="bg-green-600 hover:bg-green-700 text-white">
          Save Report
        </Button>
        <Button 
          onClick={handleGeneratePdf} 
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 disabled:opacity-75"
          disabled={isGeneratingPdf}
        >
          {isGeneratingPdf ? (
            <>
              <SpinnerIcon />
              Generating...
            </>
          ) : (
            'Generate PDF'
          )}
        </Button>
      </div>
    </div>
  );
};

export default ReportForm;
