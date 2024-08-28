import InputTable from './components/inputTable';
import OutputTable from './components/outputTable';
import { useState } from 'react';

interface DataItem {
  date: string;
  distance: number;
} 

function App() {
  const [data, setData] = useState<DataItem[]>([]);
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);

  const handleSubmit = (date: string, distance: number) => {
    if (editingItem) {
      const updatedData = data.map((item) =>
        item.date === editingItem.date ? { ...item, date, distance } : item
      );
      setData(updatedData);
      setEditingItem(null);
    } else {
      const existingItem = data.find((item) => item.date === date);

      if (existingItem) {
        const newData = data.map((item) =>
          item.date === date ? { ...item, distance: item.distance + distance } : item
        );
        setData(newData);
      } else {
        setData([...data, { date, distance }]);
      }
    }

  };

  const handleDelete = (date: string) => {
    const newData = data.filter((item) => item.date !== date);
    setData(newData);
  };

    return (
    <div>
      <h1>Учёт тренировок</h1>
      <InputTable data={editingItem} onSubmit={handleSubmit} />
      <OutputTable data={data} onDelete={handleDelete}/>
    </div>
  );
}

export default App
