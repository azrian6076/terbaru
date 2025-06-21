import React, { useState } from 'react';

const ProjectForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    technology: '',
    result: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log('Project submitted:', result);

      setFormData({ title: '', technology: '', result: '' });
    } catch (err) {
      console.error('Error submitting project:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Judul Proyek" value={formData.title} onChange={handleChange} />
      <input type="text" name="technology" placeholder="Teknologi" value={formData.technology} onChange={handleChange} />
      <input type="text" name="result" placeholder="Hasil Proyek" value={formData.result} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProjectForm;
