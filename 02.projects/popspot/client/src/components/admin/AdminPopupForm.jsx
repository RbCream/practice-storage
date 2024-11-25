import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 12px;
  background: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AdminPopupForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        title: '',
        contentType: '',
        location: '',
        period: '',
        description: '',
        mainImage: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="팝업스토어 제목"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                <Input
                    type="text"
                    placeholder="컨텐츠 종류"
                    value={formData.contentType}
                    onChange={(e) => setFormData({...formData, contentType: e.target.value})}
                />
                <Input
                    type="text"
                    placeholder="위치"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
                <Input
                    type="text"
                    placeholder="기간"
                    value={formData.period}
                    onChange={(e) => setFormData({...formData, period: e.target.value})}
                />
                <TextArea
                    placeholder="상세 설명"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, mainImage: e.target.files[0]})}
                />
                <Button type="submit">저장</Button>
            </Form>
        </FormContainer>
    );
};

export default AdminPopupForm;