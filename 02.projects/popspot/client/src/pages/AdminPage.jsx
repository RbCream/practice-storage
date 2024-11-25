import React, { useState } from 'react';
import styled from 'styled-components';
import AdminPopupForm from '../components/admin/AdminPopupForm';
import PopupList from '../components/popup/PopupList';
import { usePopup } from '../hooks/usePopup';

const AdminWrapper = styled.div`
  width: ${props => props.theme.sizes.maxWidth};
  margin: 0 auto;
  padding: 20px;
`;

const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
`;

const AdminPage = () => {
    const [showForm, setShowForm] = useState(false);
    const { popups } = usePopup();

    return (
        <AdminWrapper>
            <AdminHeader>
                <h2>팝업스토어 관리</h2>
                <Button onClick={() => setShowForm(!showForm)}>
                    {showForm ? '목록보기' : '새 팝업스토어 등록'}
                </Button>
            </AdminHeader>
            {showForm ? (
                <AdminPopupForm />
            ) : (
                <PopupList popups={popups} isAdmin={true} />
            )}
        </AdminWrapper>
    );
};

export default AdminPage;