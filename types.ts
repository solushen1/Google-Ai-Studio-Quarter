export type FieldType = 'text' | 'number' | 'date' | 'textarea' | 'signature';

export interface Field {
  label: string;
  type: FieldType;
}

export interface StoredFile {
  name: string;
  type: string;
  dataUrl: string;
}

export interface Section {
  name: string;
  fields?: Field[];
  type?: 'table';
  tableType?: 'labeled' | 'grid'; // 'labeled' is default with first col as header, 'grid' is all-input
  columns?: string[];
  rows?: string[];
  allowPhotos?: boolean;
}

export interface Department {
  department: string;
  sections: Section[];
}

export interface ReportData {
  [sectionName: string]: {
    [fieldName: string]: any;
    __photos?: StoredFile[];
  } | Array<{ [columnName: string]: any; photos?: StoredFile[] }>;
}

export type ExampleFieldData = { [fieldNameOrColumnName: string]: string };
export type ExampleSectionData = { [sectionName: string]: ExampleFieldData };
export type ExampleData = { [departmentName: string]: ExampleSectionData };