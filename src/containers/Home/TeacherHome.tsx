import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import ClassApi from '../../api/classApi';
import { Class, User } from '../../constants/types';
import SubjectList from '../Subject/SubjectList';

type HomeProps = {
    teacher: User;
};

function TeacherHome({ teacher }: HomeProps) {
    const [subjects, setSubjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        trackPromise(
            ClassApi.findByTeacher(teacher.id).then((classes) => {
                setIsLoading(false);
                mapSubjects(classes);
            })
        );
    }, [teacher]);

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

    return <SubjectList isLoading={isLoading} subjects={subjects} />;
}

export default TeacherHome;
