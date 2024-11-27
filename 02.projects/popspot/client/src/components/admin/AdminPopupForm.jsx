import React, { useState } from 'react';
import styled from 'styled-components';

const FormWrapper = styled.div`
    width: 100%;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    font-weight: bold;
    font-size: 14px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: #333;
    }
`;

const TextArea = styled.textarea`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-height: 150px;
    resize: vertical;
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: #333;
    }
`;

const ImageUploadSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const ImageUploadLabel = styled.label`
    font-weight: bold;
    margin-bottom: 4px;
`;

const ImageHelp = styled.small`
    color: #666;
    font-size: 12px;
    margin-top: 4px;
`;

const Button = styled.button`
    padding: 12px;
    background: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;

    &:hover {
        background: #444;
    }
`;

const AdminPopupForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        contentType: '',
        organizer: '',
        location: '',
        startDate: '',
        endDate: '',
        operationHours: '',
        description: '',
        mainImage: null,
        detailImages: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        // 텍스트 데이터 추가 - 서버 API 규격에 맞게 수정
        formDataToSend.append('title', formData.title);
        formDataToSend.append('content_type', formData.contentType);
        formDataToSend.append('organizer', formData.organizer);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('start_date', formData.startDate);
        formDataToSend.append('end_date', formData.endDate);
        formDataToSend.append('operation_hours', formData.operationHours);
        formDataToSend.append('description', formData.description);

        // 이미지 파일 추가
        if (formData.mainImage) {
            formDataToSend.append('main_image', formData.mainImage);
        }

        onSubmit(formDataToSend);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <FormWrapper>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Label>팝업스토어 명칭</Label>
                    <Input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </InputGroup>

                <InputGroup>
                    <Label>컨텐츠 종류</Label>
                    <Input
                        type="text"
                        name="contentType"
                        value={formData.contentType}
                        onChange={handleChange}
                        required
                    />
                </InputGroup>

                <InputGroup>
                    <Label>주관업체</Label>
                    <Input
                        type="text"
                        name="organizer"
                        value={formData.organizer}
                        onChange={handleChange}
                        required
                    />
                </InputGroup>

                <InputGroup>
                    <Label>위치</Label>
                    <Input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="예: 강남구 역삼동"
                        required
                    />
                </InputGroup>

                <InputGroup>
                    <Label>운영 기간</Label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </InputGroup>

                <InputGroup>
                    <Label>운영 시간</Label>
                    <Input
                        type="text"
                        name="operationHours"
                        value={formData.operationHours}
                        onChange={handleChange}
                        placeholder="예: 10:00 - 21:00"
                        required
                    />
                </InputGroup>

                <InputGroup>
                    <Label>상세 설명</Label>
                    <TextArea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </InputGroup>

                <ImageUploadSection>
                    <InputGroup>
                        <ImageUploadLabel>썸네일 이미지</ImageUploadLabel>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                mainImage: e.target.files[0]
                            }))}
                            required
                        />
                        <ImageHelp>* 목록에 표시될 대표 이미지입니다.</ImageHelp>
                    </InputGroup>

                    <InputGroup>
                        <ImageUploadLabel>상세 이미지</ImageUploadLabel>
                        <Input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                detailImages: Array.from(e.target.files)
                            }))}
                        />
                        <ImageHelp>* 상세 내용에 표시될 이미지들입니다. (여러 장 선택 가능)</ImageHelp>
                    </InputGroup>
                </ImageUploadSection>

                <Button type="submit">등록하기</Button>
            </Form>
        </FormWrapper>
    );
};

export default AdminPopupForm;