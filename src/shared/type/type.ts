export interface RequestData {
  id: string;
  packsNumber: any;
  packageType: string;
  isArchived: boolean;
  description: string | null;
  createdAt: string;
}

export interface TableData {
  number: number;
  packsNumber: any;
  packageType: string;
  createdAt: string;
  isArchived: boolean;
  description: string;
  actions: () => void;
  id: string;
}

export interface Product {
  id: string;
  packsNumber: any;
  packageType: string;
  isArchived: boolean;
  description: string | null;
  createdAt: string;
}

export interface DataEdit {
  packsNumber: any;
  packageType: string;
  isArchived: boolean;
  description: string | null;
}
