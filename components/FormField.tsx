
import React from 'react';
import { Field, FieldType } from '../types';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Select from './ui/Select';
import Button from './ui/Button';
import { TrashIcon, InformationCircleIcon } from './icons/EditorIcons';
import SignatureInput from './SignatureInput';

interface FormFieldProps {
  field: Field;
  sectionName: string;
  isEditMode: boolean;
  onDataChange: (sectionName: string, data: any) => void;
  value: any;
  onSchemaChange: (updatedField: Field) => void;
  onRemove: () => void;
  exampleValue?: string;
  activeTooltip: string | null;
  setActiveTooltip: (id: string | null) => void;
}

const FIELD_TYPE_OPTIONS: { value: FieldType; label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'signature', label: 'Signature' },
];

const FormField: React.FC<FormFieldProps> = ({ field, sectionName, isEditMode, onDataChange, value, onSchemaChange, onRemove, exampleValue, activeTooltip, setActiveTooltip }) => {
  const tooltipId = `${sectionName}-${field.label}`;
  const isTooltipVisible = activeTooltip === tooltipId;
  const signatureTooltipId = `${tooltipId}-signature-info`;
  const isSignatureTooltipVisible = activeTooltip === signatureTooltipId;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onDataChange(sectionName, { [field.label]: e.target.value });
  };

  if (isEditMode) {
    return (
      <div className="p-3 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <Input
              type="text"
              value={field.label}
              onChange={(e) => onSchemaChange({ ...field, label: e.target.value })}
              placeholder="Field Label"
            />
            <div className="flex items-center gap-2">
              <Select
                value={field.type}
                onChange={(e) => onSchemaChange({ ...field, type: e.target.value as FieldType })}
                className="flex-grow"
              >
                {FIELD_TYPE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Select>
              <Button
                type="button"
                onClick={onRemove}
                className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded-full"
                aria-label="Remove field"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
        </div>
      </div>
    );
  }

  const renderField = () => {
    switch (field.type) {
      case 'textarea':
        return <Textarea id={field.label} value={value || ''} onChange={handleChange} rows={4} />;
      case 'signature':
        return <SignatureInput 
                  value={value || null} 
                  onChange={(dataUrl) => onDataChange(sectionName, { [field.label]: dataUrl })} 
               />;
      default:
        return <Input id={field.label} type={field.type} value={value || ''} onChange={handleChange} />;
    }
  };
  
  const tooltipWidthClasses = sectionName === "General Information"
    ? "max-w-xs"
    : "w-[80vw] max-w-sm md:w-max md:min-w-[450px] md:max-w-xl";

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <label htmlFor={field.label} className="block text-sm font-medium text-slate-700">
          {field.label}
        </label>
        {exampleValue && !isEditMode && (
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => setActiveTooltip(isTooltipVisible ? null : tooltipId)}
              className="text-slate-400 hover:text-blue-600 focus:outline-none"
              aria-label="Show example"
            >
              <InformationCircleIcon className="h-4 w-4" />
            </button>
            {isTooltipVisible && (
              <div className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 p-3 ${tooltipWidthClasses} text-sm font-normal text-white bg-slate-800 rounded-md shadow-lg z-20 whitespace-normal text-left`}>
                <strong className="font-semibold block">Example:</strong> 
                <span>{exampleValue}</span>
              </div>
            )}
          </div>
        )}
        {field.type === 'signature' && !isEditMode && (
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => setActiveTooltip(isSignatureTooltipVisible ? null : signatureTooltipId)}
              className="text-slate-400 hover:text-blue-600 focus:outline-none"
              aria-label="Show signature name instruction"
            >
              <InformationCircleIcon className="h-4 w-4" />
            </button>
            {isSignatureTooltipVisible && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 p-5 max-w-md text-sm font-normal text-white bg-slate-800 rounded-lg shadow-lg z-20 whitespace-normal text-left leading-relaxed">
                To add your name and title (e.g., 'Prepared by: John Doe'), toggle 'Edit Template' mode and edit this label directly.
              </div>
            )}
          </div>
        )}
      </div>
      {renderField()}
    </div>
  );
};

export default FormField;
