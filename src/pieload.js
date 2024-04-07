import { useState, useEffect } from 'react';

const degree_vars = [
  [0,"Completed"],
  [5,"Requirements"],
  [3,"Advanced Electives"],
  [5,"Breadth Courses"],
  [2,"Project Courses"],
  [6,"Technical Electives"],
  [4,"Math"],
  [4,"General Engineering"],
  [4,"Basic Science"],
  [3,"Design and Communication"],
  [7,"Theme"],
  [5,"Unrestricted"]
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