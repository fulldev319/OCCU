import React, { useState } from "react";
import DataTable, { Data } from "../components/DataTable";
import DataForm from "../components/DataForm";

const DataPage: React.FC = () => {
  const [editingData, setEditingData] = useState<Data | null>(null);

  const handleEdit = (data: Data) => {
    setEditingData(data);
  };

  return (
    <>
      <DataTable onEdit={handleEdit} />
      <DataForm data={editingData} onSubmit={() => setEditingData(null)} />
    </>
  );
};

export default DataPage;
