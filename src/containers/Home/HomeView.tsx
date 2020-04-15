import { withStyles } from '@material-ui/core';
import React from 'react';
import styles from './styles';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/selectors/authSelector';
import { UserRoleEnum } from '../../constants/types';
import TeacherHome from './TeacherHome';

type HomeProps = {
    classes: {};
};

function HomeView({ classes }: HomeProps) {
    const currentUser = useSelector(getCurrentUser);
    switch (currentUser.role) {
        case UserRoleEnum.TEACHER:
            return <TeacherHome teacher={currentUser} />;

        default:
            return <div>Home</div>;
    }
}

export default withStyles(styles)(HomeView);
