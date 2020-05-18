import * as _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useSelector } from 'react-redux';
import ClassApi from '../../api/classApi';
import { UserRoleEnum } from '../../constants/types';
import { getCurrentUser } from '../../store/selectors/authSelector';
import SubjectList from './SubjectList';

export default function SubjectView() {
    const [subjects, setSubjects] = useState([]);
    const currentUser = useSelector(getCurrentUser);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        if (currentUser && currentUser.role === UserRoleEnum.ADMIN) {
            trackPromise(
                ClassApi.findAll().then((classes) => {
                    mapSubjects(classes);
                    setIsLoading(false);
                })
            );
            return;
        }
        if (currentUser && currentUser.role === UserRoleEnum.STUDENT) {
            trackPromise(
                ClassApi.findByStudent(currentUser.id).then((res) => {
                    setIsLoading(false);
                    mapSubjectsByStudent(res.data);
                })
            );
            return;
        }
    }, [currentUser]);

    const mapSubjectsByStudent = (classes: any[]) => {
        const subIds = _.uniqBy(classes.map((c) => c.subjectId));
        setSubjects(
            subIds.map((subId) => {
                const subject = {
                    id: classes.find((c) => c.subjectId === subId)?.subjectId,
                    name: classes.find((c) => c.subjectId === subId)?.subject,
                };
                return {
                    ...subject,
                    classes: classes
                        .filter((c) => c.subjectId === subId)
                        .map((c) => ({ ...c, teacher: { name: c.teacher } })),
                };
            })
        );
    };

    const mapSubjects = (classes: any[]) => {
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
    return <SubjectList subjects={subjects} isLoading={isLoading} />;
}
