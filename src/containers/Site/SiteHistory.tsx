import React from 'react';
import styles from './styles';
import { withStyles, Box } from '@material-ui/core';

type SiteHistoryProps = {
    classes: any;
};

function SiteHistory({ classes }: SiteHistoryProps) {
    return (
        <Box
            mt={4}
            width="100%"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
        >
            <Box
                width="40%"
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
            >
                <b style={{ margin: 16 }}>Nuestra historia</b>
                <p>
                    El S.T.B.B., fue fundado por la C.I.B.B. en el año 1998 con
                    el Misionero brasileño Pr. José Aldoir Taborda, en la Ciudad
                    de Coronel Oviedo. Es Miembro de la Convención de las
                    Iglesias Bautistas Betel y sigue una línea teológica
                    práctica con un enfoque evangelístico, social, misionero y
                    pastoral. Fue organizado con la finalidad de preparar
                    hombres y mujeres llamados por Dios con un Mensaje y
                    Ministerio Integral. Contribuimos a la Expansión del Reino
                    de Dios porque creemos que la misma está íntimamente
                    relacionada con la buena preparación bíblica de los líderes
                    cristianos. Nuestro énfasis Teológico se direcciona a la
                    práctica ministerial con una conducta cristiana sin abdicar
                    de la intelectualidad y su énfasis Social al desarrollo
                    comunitario auto sostenible. 
                    <br/>
                    <b>Observaciones Académicas</b>
                    <br/>
                    Las horas cátedra son de 50 minutos 
                    <br/>
                    Un crédito equivale a 18
                    horas cátedra.
                    <br/>
                    Cada materia equivale a 3 créditos. 
                    <br/>
                    Para acceder a la calidad de aprobado se debe
                    tener: un promedio de calificación del 70% Asistencia del 80
                    % Recomendación del Profesor Fuentes de verificación: 500
                    páginas de lectura por materia desglosadas en: Resúmenes –
                    Monografía – Lecturas asignadas – Trabajos de investigación
                    Dos exámenes parciales y uno final Créditos por programa:
                    Medio de Teología: 112 créditos – Bachiller en Teología: 152
                    créditos
                </p>
            </Box>
        </Box>
    );
}

export default withStyles(styles)(SiteHistory);
