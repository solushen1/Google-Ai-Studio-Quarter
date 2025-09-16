import React from 'react';
import { Section, StoredFile, ExampleFieldData } from '../types';
import Textarea from './ui/Textarea';
import ImageUploader from './ImageUploader';
import Button from './ui/Button';
import { PlusIcon, TrashIcon, InformationCircleIcon } from './icons/EditorIcons';
import Input from './ui/Input';

interface FormTableProps {
  section: Section;
  isEditMode: boolean;
  onDataChange: (sectionName: string, data: any) => void;
  tableData: any[];
  onSchemaChange: (updatedSection: Section) => void;
  exampleData?: ExampleFieldData;
  activeTooltip: string | null;
  setActiveTooltip: (id: string | null) => void;
}

const FormTable: React.FC<FormTableProps> = ({ section, isEditMode, onDataChange, tableData, onSchemaChange, exampleData, activeTooltip, setActiveTooltip }) => {
  const isGridTable = section.tableType === 'grid';
  const data = Array.isArray(tableData) ? tableData : (section.rows?.map(() => ({})) || []);

  // --- Data Change Handlers ---
  const handleCellChange = (rowIndex: number, columnName: string, value: string) => {
    const newData = [...data];
    if (!newData[rowIndex]) newData[rowIndex] = {};
    newData[rowIndex] = { ...newData[rowIndex], [columnName]: value };
    onDataChange(section.name, newData);
  };
  
  const handlePhotosChange = (rowIndex: number, files: StoredFile[]) => {
      const newData = [...data];
      if (!newData[rowIndex]) newData[rowIndex] = {};
      newData[rowIndex] = { ...newData[rowIndex], photos: files };
      onDataChange(section.name, newData);
  };

  // --- Row Handlers for DATA MODE (Grid Tables) ---
  const handleAddDataRow = () => {
    onDataChange(section.name, [...data, {}]);
  };

  const handleRemoveDataRow = (rowIndex: number) => {
    const newData = data.filter((_, index) => index !== rowIndex);
    onDataChange(section.name, newData);
  };

  // --- Row Handlers for SCHEMA EDIT MODE ---
  const handleAddSchemaRow = () => {
    const newLabel = isGridTable ? "" : `New Item ${(section.rows?.length || 0) + 1}`;
    const updatedRows = [...(section.rows || []), newLabel];
    onSchemaChange({ ...section, rows: updatedRows });

    if (!isGridTable) {
        const firstColumnName = section.columns?.[0];
        const newRowData = firstColumnName ? { [firstColumnName]: newLabel } : {};
        onDataChange(section.name, [...data, newRowData]);
    }
  };

  const handleRemoveSchemaRow = (rowIndex: number) => {
    const updatedRows = section.rows?.filter((_, index) => index !== rowIndex);
    onSchemaChange({ ...section, rows: updatedRows });
    
    const newData = data.filter((_, index) => index !== rowIndex);
    onDataChange(section.name, newData);
  };

  const handleRowLabelChange = (rowIndex: number, newLabel: string) => {
    if (!section.rows) return;
    const updatedRows = [...section.rows];
    updatedRows[rowIndex] = newLabel;
    onSchemaChange({ ...section, rows: updatedRows });

    const firstColumnName = section.columns?.[0];
    if (firstColumnName && !isGridTable) {
        const newData = [...data];
        if (!newData[rowIndex]) newData[rowIndex] = {};
        newData[rowIndex] = { ...newData[rowIndex], [firstColumnName]: newLabel };
        onDataChange(section.name, newData);
    }
  };

  const hasActionColumn = isEditMode || (isGridTable && !isEditMode);
  
  const tooltipWidthClasses = section.name === "General Information"
    ? "max-w-xs"
    : "w-[80vw] max-w-sm md:w-max md:min-w-[450px] md:max-w-xl";

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg">
        <thead className="bg-slate-50">
          <tr>
            {section.columns?.map((col, index) => (
              <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                {col}
              </th>
            ))}
            {hasActionColumn && (
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {(isGridTable ? (data.length > 0 ? data : [{}]) : (section.rows || [])).map((rowItem, rowIndex) => {
            const rowLabel = section.rows?.[rowIndex] || '';
            const tooltipId = `${section.name}-${rowLabel}`;
            const isTooltipVisible = activeTooltip === tooltipId;
            return (
            <React.Fragment key={rowIndex}>
              <tr className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                {section.columns?.map((colName, colIndex) => {
                    return (
                      <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 align-top">
                        {isGridTable || colIndex > 0 ? (
                          <Textarea
                            value={data[rowIndex]?.[colName] || ''}
                            onChange={(e) => handleCellChange(rowIndex, colName, e.target.value)}
                            placeholder={`Enter ${colName}`}
                            rows={2}
                            className="w-full"
                          />
                        ) : ( // Labeled table, first column
                          isEditMode ? (
                            <Input 
                               value={rowLabel}
                               onChange={(e) => handleRowLabelChange(rowIndex, e.target.value)}
                               className="font-medium"
                            />
                          ) : (
                             <div className="flex items-center gap-1.5">
                                <span className="font-medium">{rowLabel}</span>
                                {exampleData?.[rowLabel] && (
                                  <div className="relative flex items-center">
                                    <button
                                      type="button"
                                      onClick={() => setActiveTooltip(isTooltipVisible ? null : tooltipId)}
                                      className="text-slate-400 hover:text-blue-600 focus:outline-none"
                                      aria-label={`Show example for ${rowLabel}`}
                                    >
                                      <InformationCircleIcon className="h-4 w-4" />
                                    </button>
                                    {isTooltipVisible && (
                                      <div className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 p-3 ${tooltipWidthClasses} text-sm font-normal normal-case text-white bg-slate-800 rounded-md shadow-lg z-30 whitespace-normal text-left`}>
                                        <strong className="font-semibold block">Example:</strong> 
                                        <span>{exampleData[rowLabel]}</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                          )
                        )}
                      </td>
                    );
                })}
                {hasActionColumn && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 align-top text-center">
                    <Button
                      type="button"
                      onClick={() => isEditMode ? handleRemoveSchemaRow(rowIndex) : handleRemoveDataRow(rowIndex)}
                      className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded-full"
                      aria-label="Remove row"
                    >
                       <TrashIcon className="h-4 w-4" />
                    </Button>
                  </td>
                )}
              </tr>
              {section.allowPhotos && (
                 <tr className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td colSpan={hasActionColumn ? (section.columns?.length || 0) + 1 : section.columns?.length} className="px-6 py-4">
                        <ImageUploader 
                            onFilesChange={(files) => handlePhotosChange(rowIndex, files)} 
                            existingFiles={data[rowIndex]?.photos || []}
                            isEditMode={isEditMode}
                        />
                    </td>
                </tr>
              )}
            </React.Fragment>
          )})}
        </tbody>
        {(isEditMode || isGridTable) && (
          <tfoot>
            <tr>
              <td colSpan={(section.columns?.length || 0) + 1} className="px-6 py-4 text-left border-t border-slate-200">
                <Button
                  type="button"
                  onClick={isEditMode ? handleAddSchemaRow : handleAddDataRow}
                  className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 flex items-center gap-2"
                >
                  <PlusIcon />
                  Add Row
                </Button>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default FormTable;