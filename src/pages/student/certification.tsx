import React, { useState } from 'react';

const CertificationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    certificateName: '',
    issuer: '',
    date: '',
    file: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('certificateName', formData.certificateName);
    data.append('issuer', formData.issuer);
    data.append('date', formData.date);
    if (formData.file) data.append('file', formData.file);

    try {
      const res = await fetch('http://localhost:5000/api/certifications', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      console.log('Success:', result);
      setFormData({ certificateName: '', issuer: '', date: '', file: null });
    } catch (err) {
      console.error('Error submitting certification:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="certificateName" placeholder="Certificate Name" value={formData.certificateName} onChange={handleChange} />
      <input type="text" name="issuer" placeholder="Issuer" value={formData.issuer} onChange={handleChange} />
      <input type="date" name="date" value={formData.date} onChange={handleChange} />
      <input type="file" name="file" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CertificationForm;
