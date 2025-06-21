import React, { createContext, useContext, useState, useEffect } from 'react';

interface StudentData {
  certificates: number;
  projects: number;
  activities: number;
}

const defaultData: StudentData = {
  certificates: 0,
  projects: 0,
  activities: 0,
};

const StudentDataContext = createContext<{
  data: StudentData;
  setData: React.Dispatch<React.SetStateAction<StudentData>>;
}>({
  data: defaultData,
  setData: () => {},
});

export const StudentDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<StudentData>(defaultData);

  useEffect(() => {
    fetch('http://localhost:5000/api/student-summary') 
      .then(res => res.json())
      .then(result => {
        setData({
          certificates: result.certificates,
          projects: result.projects,
          activities: result.activities,
        });
      })
      .catch(err => {
        console.error('Gagal fetch data mahasiswa:', err);
      });
  }, []);

  return (
    <StudentDataContext.Provider value={{ data, setData }}>
      {children}
    </StudentDataContext.Provider>
  );
};

export const useStudentData = () => useContext(StudentDataContext);
