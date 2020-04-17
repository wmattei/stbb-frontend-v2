import { withStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../../store/selectors/authSelector';
import { UserRoleEnum } from '../../constants/types';
import TeacherHome from './TeacherHome';
import { setTitle, setBackButtonVisibility } from '../../store/actions/appActions';

type HomeProps = {
    classes: {};
};

function HomeView({ classes }: HomeProps) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTitle('STBB'));
        dispatch(setBackButtonVisibility(false));
    });
    
    const currentUser = useSelector(getCurrentUser);
    switch (currentUser.role) {
        case UserRoleEnum.TEACHER:
            return <TeacherHome teacher={currentUser} />;

        default:
            return <div>Home</div>;
    }
}

export default withStyles(styles)(HomeView);
