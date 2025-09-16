import React from 'react';
import { Field, Section, StoredFile, ExampleFieldData } from '../types';
import FormField from './FormField';
import FormTable from './FormTable';
import Card from './ui/Card';
import Input from './ui/Input';
import ImageUploader from './ImageUploader';
import Button from './ui/Button';
import { PlusIcon } from './icons/EditorIcons';

interface FormSectionProps {
  section: Section;
  isEditMode: boolean;
  onDataChange: (sectionName: string, data: any) => void;
  formData: any;
  onSchemaChange: (updatedSection: Section) => void;
  exampleData?: ExampleFieldData;
  activeTooltip: string | null;
  setActiveTooltip: (id: string | null) => void;
}

const FormSection: React.FC<FormSectionProps> = ({ section, isEditMode, onDataChange, formData, onSchemaChange, exampleData, activeTooltip, setActiveTooltip }) => {
  const handleSectionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSchemaChange({ ...section, name: e.target.value });
  };

  const handlePhotosChange = (files: StoredFile[]) => {
    onDataChange(section.name, { __photos: files });
  };

  const handleFieldSchemaChange = (indexToUpdate: number, updatedField: Field) => {
    if (!section.fields) return;
    const updatedFields = [...section.fields];
    updatedFields[indexToUpdate] = updatedField;
    onSchemaChange({ ...section, fields: updatedFields });
  };

  const handleRemoveField = (indexToRemove: number) => {
    if (!section.fields) return;
    const updatedFields = section.fields.filter((_, index) => index !== indexToRemove);
    onSchemaChange({ ...section, fields: updatedFields });
  };

  const handleAddField = () => {
    const newField = { label: `New Field ${(section.fields?.length || 0) + 1}`, type: 'text' as const };
    const updatedFields = [...(section.fields || []), newField];
    onSchemaChange({ ...section, fields: updatedFields });
  };
  
  return (
    <Card>
      <div className="p-6">
        {isEditMode ? (
          <Input 
            value={section.name} 
            onChange={handleSectionNameChange} 
            className="text-xl font-semibold mb-4 w-full"
          />
        ) : (
          <h3 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2 border-slate-200">{section.name}</h3>
        )}

        {section.fields && (
          <div className="space-y-4">
            {section.fields.map((field, index) => (
              <FormField 
                key={index} // Key is stable as long as we don't reorder
                field={field} 
                sectionName={section.name}
                isEditMode={isEditMode}
                onDataChange={onDataChange}
                value={formData?.[field.label]}
                onSchemaChange={(updatedField) => handleFieldSchemaChange(index, updatedField)}
                onRemove={() => handleRemoveField(index)}
                exampleValue={exampleData?.[field.label]}
                activeTooltip={activeTooltip}
                setActiveTooltip={setActiveTooltip}
              />
            ))}
            {isEditMode && (
              <div className="pt-2">
                <Button
                  type="button"
                  onClick={handleAddField}
                  className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 flex items-center gap-2"
                >
                  <PlusIcon />
                  Add Field
                </Button>
              </div>
            )}
          </div>
        )}
        
        {section.type === 'table' && section.columns && section.rows && (
          <FormTable 
            section={section} 
            isEditMode={isEditMode}
            onDataChange={onDataChange}
            tableData={formData}
            onSchemaChange={onSchemaChange}
            exampleData={exampleData}
            activeTooltip={activeTooltip}
            setActiveTooltip={setActiveTooltip}
          />
        )}
        
        {section.allowPhotos && section.type !== 'table' && (
          <div className="mt-6 pt-4 border-t border-slate-200">
            <h4 className="text-md font-medium text-slate-700 mb-2">Photos</h4>
            <ImageUploader
              onFilesChange={handlePhotosChange}
              existingFiles={formData?.__photos || []}
              isEditMode={isEditMode}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default FormSection;