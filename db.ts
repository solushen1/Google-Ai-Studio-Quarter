import Dexie, { Table } from 'dexie';
import { ReportData } from './types';

export interface ISavedReport {
  id?: number;
  departmentName: string;
  savedAt: number;
  formData: ReportData;
}

export class ReportDatabase extends Dexie {
  reports!: Table<ISavedReport>; 

  constructor() {
    super('SdaQuarterlyReportsDB');
    // FIX: Cast `this` to Dexie to resolve a TypeScript type inference issue with the .version() method.
    (this as Dexie).version(1).stores({
      reports: '++id, departmentName, savedAt'
    });
  }
}

export const db = new ReportDatabase();

// --- API Functions ---

export async function getAllReports() {
  return await db.reports.orderBy('savedAt').reverse().toArray();
}

export async function addReport(report: ISavedReport) {
  return await db.reports.add(report);
}

export async function updateReport(id: number, reportData: ReportData) {
    const savedAt = Date.now();
    return await db.reports.update(id, { formData: reportData, savedAt });
}

export async function deleteReport(id: number) {
  return await db.reports.delete(id);
}
