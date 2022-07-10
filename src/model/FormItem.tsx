export interface FormItem {
  id: number;
  name: string;
  content: string;
  type: "text" | "number" | "email" | "date";
};

export interface FormItemProps {
  formItem: FormItem;
  editMode: boolean;
  updateItem?: (item: FormItem) => void;
  removeItem?: (index: number) => void;
  colorsTheme: 'light' | 'dark' | null;
}