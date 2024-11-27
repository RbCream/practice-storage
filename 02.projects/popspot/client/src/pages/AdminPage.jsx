import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import AdminPopupForm from '../components/admin/AdminPopupForm';
import PopupList from '../components/popup/PopupList';
import { usePopup } from '../hooks/usePopup';
import { useNavigate } from 'react-router-dom';

const AdminContainer = styled.div`
    width: 768px;
    margin: 0 auto;
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
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [editingPopup, setEditingPopup] = useState(null);
    const { popups, createPopup, updatePopup, deletePopup, fetchPopups } = usePopup();

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/admin/login');
            return;
        }
        fetchPopups();
    }, [navigate]);

    const handleEdit = (popup) => {
        console.log('Edit popup:', popup);  // 디버깅용
        setEditingPopup(popup);
        setShowForm(true);
    };

    const handleDelete = async (popupId) => {
        console.log('Delete popup:', popupId);  // 디버깅용
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await deletePopup(popupId);
                await fetchPopups();  // 삭제 후 목록 새로고침
                alert('삭제되었습니다.');
            } catch (error) {
                console.error('삭제 실패:', error);
                alert('삭제에 실패했습니다.');
            }
        }
    };

    const handleSubmit = async (formData) => {
        try {
            if (editingPopup) {
                await updatePopup(editingPopup.id, formData);
                alert('수정되었습니다.');
            } else {
                await createPopup(formData);
                alert('등록되었습니다.');
            }
            setShowForm(false);
            setEditingPopup(null);
            await fetchPopups();  // 저장 후 목록 새로고침
        } catch (error) {
            console.error('저장 실패:', error);
            alert('저장에 실패했습니다.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin/login');
    };

    return (
        <>
            <Header />
            <AdminContainer>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <ActionButton onClick={() => {
                        setShowForm(!showForm);
                        setEditingPopup(null);
                    }}>
                        {showForm ? '목록으로 돌아가기' : '새 팝업스토어 등록'}
                    </ActionButton>
                    <ActionButton onClick={handleLogout}>로그아웃</ActionButton>
                </div>
                {showForm ? (
                    <AdminPopupForm
                        onSubmit={handleSubmit}
                        initialData={editingPopup}
                    />
                ) : (
                    <PopupList
                        popups={popups}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </AdminContainer>
        </>
    );
};

export default AdminPage;