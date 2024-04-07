import { useState, useEffect } from 'react';

const degree_vars = [
  [0,"Completed",'Green',[]],
  [5,"Requirements", 'OrangeRed',["CS 150","CS 211","CS 213","CS 214","Statistics"]],
  [3,"Advanced Electives", 'GreenYellow',["Adv El 1","Adv El 2","Adv El 3"]],
  [5,"Breadth Courses", 'Red',["Theory","Systems","AI","Interfaces","SD and PL"]],
  [2,"Project Courses", 'LimeGreen',["Project 1","Project 2"]],
  [6,"Technical Electives", 'FireBrick',["Tech El 1","Tech El 2","Tech El 3","Tech El 4","Tech El 5","Tech El 6",]],
  [4,"Math", 'Yellow',["Math 220-1","Math 220-2","Math 228-1","CS 212"]],
  [4,"General Engineering", 'Gold',["CS 111","EA 1","EA 2","EA 3"]],
  [4,"Basic Science", 'Orange',["Basic Sci w/ Lab","Basic Sci 1","Basic Sci 2","Basic Sci 3"]],
  [3,"Design and Communication", 'Lime',["DTC 1","DTC 2","Comm"]],
  [7,"Theme",'DarkRed',["Theme 1","Theme 2","Theme 3","Theme 4","Theme 5","Theme 6","Theme 7"]],
  [5,"Unrestricted", 'DarkOrange',["Unr El 1","Unr El 2","Unr El 3","Unr El 4","Unr El 5"]]
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