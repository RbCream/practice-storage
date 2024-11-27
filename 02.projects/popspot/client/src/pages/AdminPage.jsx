import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import AdminPopupForm from '../components/admin/AdminPopupForm';
import PopupList from '../components/popup/PopupList';
import { usePopup } from '../hooks/usePopup';

const AdminContainer = styled.div`
    width: 768px;
    margin: 0 auto;
    padding: 20px;
`;

const ActionButton = styled.button`
    padding: 12px 20px;
    background: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-bottom: 20px;

    &:hover {
        background: #444;
    }
`;

const AdminPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingPopup, setEditingPopup] = useState(null);
    const { popups, createPopup, updatePopup, deletePopup, fetchPopups } = usePopup();

    useEffect(() => {
        fetchPopups();
    }, []);

    const handleEdit = (popup) => {
        setEditingPopup(popup);
        setShowForm(true);
    };

    const handleDelete = async (popupId) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await deletePopup(popupId);
                fetchPopups();
            } catch (error) {
                console.error('삭제 실패:', error);
            }
        }
    };

    const handleSubmit = async (formData) => {
        try {
            if (editingPopup) {
                await updatePopup(editingPopup.id, formData);
            } else {
                await createPopup(formData);
            }
            setShowForm(false);
            setEditingPopup(null);
            fetchPopups();
        } catch (error) {
            console.error('저장 실패:', error);
        }
    };

    return (
        <>
            <Header />
            <AdminContainer>
                <ActionButton onClick={() => {
                    setShowForm(!showForm);
                    setEditingPopup(null);
                }}>
                    {showForm ? '목록으로 돌아가기' : '새 팝업스토어 등록'}
                </ActionButton>
                {showForm ? (
                    <AdminPopupForm
                        onSubmit={handleSubmit}
                        initialData={editingPopup}
                    />
                ) : (
                    <PopupList
                        popups={popups}
                        isAdmin={true}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </AdminContainer>
        </>
    );
};

export default AdminPage;