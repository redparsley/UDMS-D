interface Document {
  name: string;
  status: string;
  id: number;
}

export const documents: Document[] = [
  {
    name: "Служебная записка №123141",
    status: "Не подписан",
    id: 1
  },
  {
    name: "Служебная записка №1421241441",
    status: "Подписан",
    id: 2
  },
];