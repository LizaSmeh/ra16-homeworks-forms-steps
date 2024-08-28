import { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface DataProps {
    date: string,
    distance: number
}

interface InputProps {
    data: DataProps | null,
    onSubmit: (date: string, distance: number) => void

}

const InputTable: React.FC<InputProps> = ({data, onSubmit}) => {
    const [date, setDate] = useState('');
    const [distance, setDistance] = useState('');

    useEffect(() => {
        if (data) {
          setDate(data.date);
          setDistance(data.distance.toString());
        }
      }, [data]);

      const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
      };

      const handleDistance = (e: ChangeEvent<HTMLInputElement>) => {
        const item = e.target.value;
        if (Number(item) >= 0) {
            setDistance(item);
        }
      };

      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (date && distance) {
          onSubmit(date, parseFloat(distance));
          setDate('');
          setDistance('');
        }
      };




    return (
        <form onSubmit={handleSubmit}>
        <label>
        Дата (ДД.ММ.ГГ):
        <input type="date" value={date} onChange={handleDate}/>
        </label>
        <label>
        Пройдено км:
        <input type="namber" value={distance} onChange={handleDistance}/>
        </label>
        <button type="submit">OK</button>
        </form>
    )
}

export default InputTable