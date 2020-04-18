import * as _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useSelector } from 'react-redux';
import ClassApi from '../../api/classApi';
import { Class, UserRoleEnum } from '../../constants/types';
import { getCurrentUser } from '../../store/selectors/authSelector';
import SubjectList from './SubjectList';

export default function SubjectView() {
    const [subjects, setSubjects] = useState([]);
    const currentUser = useSelector(getCurrentUser);

    useEffect(() => {
        if (currentUser && currentUser.role === UserRoleEnum.ADMIN) {
            trackPromise(ClassApi.findAll().then(mapSubjects));
            return;
        }
        if (currentUser && currentUser.role === UserRoleEnum.STUDENT) {
            trackPromise(
                ClassApi.findByStudent(currentUser.id).then(mapSubjects)
            );
            return;
        }
    }, [currentUser]);

    const mapSubjects = (classes: Class[]) => {
        const subIds = _.uniqBy(classes.map((c) => c.subject.id));
        setSubjects(
            subIds.map((subId) => {
                return {
                    ...classes.find((c) => c.subject.id === subId)?.subject,
                    classes: classes.filter((c) => c.subject.id === subId),
                };
            })
        );
    };

    return <SubjectList subjects={subjects} />;
}
