
import React from 'react';
import Card from './ui/Card';
import Select from './ui/Select';

interface DepartmentSelectorProps {
  departments: string[];
  selectedDepartment: string;
  onSelectDepartment: (department: string) => void;
}

const DepartmentSelector: React.FC<DepartmentSelectorProps> = ({ departments, selectedDepartment, onSelectDepartment }) => {
  return (
    <Card>
      <div className="p-6">
        <label htmlFor="department-select" className="block text-lg font-semibold text-slate-800 mb-3">
          Select a Department
        </label>
        <Select
          id="department-select"
          value={selectedDepartment}
          onChange={(e) => onSelectDepartment(e.target.value)}
        >
          <option value="">-- Choose a Department --</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </Select>
      </div>
    </Card>
  );
};

export default DepartmentSelector;
