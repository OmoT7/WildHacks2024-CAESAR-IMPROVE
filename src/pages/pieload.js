import { useState, useEffect } from 'react';

const degree_vars = [
  [0,"Completed",'Green'],
  [5,"Requirements", 'OrangeRed'],
  [3,"Advanced Electives", 'GreenYellow'],
  [5,"Breadth Courses", 'Red'],
  [2,"Project Courses", 'LimeGreen'],
  [6,"Technical Electives", 'FireBrick'],
  [4,"Math", 'Yellow'],
  [4,"General Engineering", 'Gold'],
  [4,"Basic Science", 'Orange'],
  [3,"Design and Communication", 'Lime'],
  [7,"Theme",'DarkRed'],
  [5,"Unrestricted", 'DarkOrange']
];

export function useDegreeData() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= degree_vars.length) return;

    const timer = setTimeout(() => {
      setData(currentData => [...currentData, degree_vars[index]]);
      setIndex(currentIndex => currentIndex + 1);
    }, 7);

    return () => clearTimeout(timer);
  }, [index, data]);

  return data;
}