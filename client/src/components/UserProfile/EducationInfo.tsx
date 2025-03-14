import axios from 'axios';
import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addUserEducation, deleteUserEducation, updateUserEducation} from '../../redux/actions/private/applicantActions';
import Storage from '../../services/storage';
import {Header, Titles, Edit, EachContainer, SubTitles, Education, EducationCard, ParagraphStyle, EditInput, EditTextArea, NoExperience, DateInput} from './Styles';

type Props = {
    userRole: string;
};

export const EducationInfoComp: FC<Props> = ({userRole}) => {

    const applicantDetail = useSelector((state: any) => state.companyReducer.applicantDetail);
    const userId = useSelector((state: any) => state.userReducer.applicant.id);
    const dispatch = useDispatch();
    const token = Storage.get("token");

    const [flag, setFlag] = useState(0);
    const [displayFlag, setDisplayFlag] = useState('none');
    const [overlayFlag, setOverlayFlag] = useState('none');
    const [educationArray, setEducationArray] = useState([]);

    useEffect(() => {
        if (userRole === "company") {
            setEducationArray(applicantDetail.education)
        } else {
            axios.get(`${process.env.REACT_APP_API}/applicant/${userId}`,
                {
                    headers: {
                        token: token || "",
                    },
                }
            )
                .then((res) => {
                    setEducationArray(res.data.education)
                })
        }
    }, [applicantDetail.id])

    const [userEducation, setUserEducation] = useState(
        {
            id: '',
            degree: '',
            institution: '',
            endDate: '',
            startDate: '',
            description: '',
            applicantId: userId
        }
    );

    function editFunction(education: any) {
        flag === 0 ? setFlag(100) : setFlag(0);
        overlayFlag === 'none' ? setOverlayFlag('block') : setOverlayFlag('none');
        displayFlag === 'none' ? setDisplayFlag('flex') : setDisplayFlag('none');
        setUserEducation({
            id: education.id,
            degree: education.degree,
            endDate: education.endDate,
            startDate: education.startDate,
            description: education.description,
            institution: education.institution,
            applicantId: userId
        });
    }

    function updateFunction() {
        flag === 0 ? setFlag(100) : setFlag(0);
        overlayFlag === 'none' ? setOverlayFlag('block') : setOverlayFlag('none');
        displayFlag === 'none' ? setDisplayFlag('flex') : setDisplayFlag('none');
        dispatch(updateUserEducation(userEducation));
        setTimeout(() => {
            axios.get(`${process.env.REACT_APP_API}/applicant/${userId}`,
                {
                    headers: {
                        token: token || "",
                    },
                }
            )
                .then((res) => {
                    setEducationArray(res.data.education)
                })
        }, 500)
    }

    function closeModal() {
        flag === 0 ? setFlag(100) : setFlag(0);
        overlayFlag === 'none' ? setOverlayFlag('block') : setOverlayFlag('none');
        addDisplayFlag === 'none' ? setAddDisplayFlag('flex') : setAddDisplayFlag('none');
    }

    function handleChange(e: any) {
        setUserEducation({...userEducation, [e.target.name]: e.target.value})
    }

    const [addDisplayFlag, setAddDisplayFlag] = useState('none');

    function addEducation() {
        flag === 0 ? setFlag(100) : setFlag(0);
        overlayFlag === 'none' ? setOverlayFlag('block') : setOverlayFlag('none');
        addDisplayFlag === 'none' ? setAddDisplayFlag('flex') : setAddDisplayFlag('none');
    }

    const [id, setId] = useState(2);

    function addHandleChange(e: any) {
        setId(id + 1);
        setAddUserEducationState({...addUserEducationState, [e.target.name]: e.target.value})
    }

    const [addUserEducationState, setAddUserEducationState] = useState(
        {
            id: id,
            degree: '',
            endDate: '',
            startDate: '',
            description: '',
            institution: ''
        }
    );

    function saveEducation() {
        setId(id + 1);
        flag === 0 ? setFlag(100) : setFlag(0);
        overlayFlag === 'none' ? setOverlayFlag('block') : setOverlayFlag('none');
        addDisplayFlag === 'none' ? setAddDisplayFlag('flex') : setAddDisplayFlag('none');
        dispatch(addUserEducation(addUserEducationState, userId));
        setAddUserEducationState({
            id: id,
            degree: '',
            endDate: '',
            startDate: '',
            description: '',
            institution: ''
        })
        setTimeout(() => {
            axios.get(`${process.env.REACT_APP_API}/applicant/${userId}`,
                {
                    headers: {
                        token: token || "",
                    },
                }
            )
                .then((res) => {
                    setEducationArray(res.data.education)
                })
        }, 500)
    }

    function deleteFunction(id: any) {
        dispatch(deleteUserEducation(id))
        setTimeout(() => {
            axios.get(`${process.env.REACT_APP_API}/applicant/${userId}`,
                {
                    headers: {
                        token: token || "",
                    },
                }
            )
                .then((res) => {
                    setEducationArray(res.data.education)
                })
        }, 500)
        flag === 0 ? setFlag(100) : setFlag(0);
        overlayFlag === 'none' ? setOverlayFlag('block') : setOverlayFlag('none');
        displayFlag === 'none' ? setDisplayFlag('flex') : setDisplayFlag('none');
    }

    return (
        <Education>
            <Header>
                <Titles>Educación</Titles>
            </Header>
            {educationArray.length > 0 ?
                educationArray.map((education: any) => (
                    <EducationCard key={education.id}>
                        <Header>
                            <div></div>
                            {userRole === "applicant" &&
                                <Edit onClick={() => editFunction(education)}>Editar</Edit>
                            }
                        </Header>
                        <EachContainer>
                            <SubTitles>Carrera:</SubTitles>
                            <ParagraphStyle>{education.degree}</ParagraphStyle>
                        </EachContainer>
                        <EachContainer>
                            <SubTitles>Institución:</SubTitles>
                            <ParagraphStyle>{education.institution}</ParagraphStyle>
                        </EachContainer>
                        <EachContainer>
                            <SubTitles>Desde:</SubTitles>
                            <ParagraphStyle>{education.startDate}</ParagraphStyle>
                        </EachContainer>
                        <EachContainer>
                            <SubTitles>Hasta:</SubTitles>
                            <ParagraphStyle>{education.endDate}</ParagraphStyle>
                        </EachContainer>
                        <EachContainer>
                            <SubTitles>Descripción:</SubTitles>
                            <ParagraphStyle>{education.description}</ParagraphStyle>
                        </EachContainer>
                    </EducationCard>
                )
                ) :
                null}
            <div className='edit-modal' style={{
                position: 'fixed',
                display: displayFlag,
                opacity: flag,
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '40px',
                width: 'auto',
                height: 'auto',
                background: '#FFFFFF',
                zIndex: '1001',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '15px',
                boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.7)',
                overflow: 'hidden',
                transition: 'all 1s',
            }}>
                <EachContainer>
                    <SubTitles>Carrera:</SubTitles>
                    <EditInput
                        value={userEducation.degree}
                        name="degree"
                        onChange={(e) => handleChange(e)}
                    ></EditInput>
                </EachContainer>
                <EachContainer>
                    <SubTitles>Institución:</SubTitles>
                    <EditInput
                        value={userEducation.institution}
                        name="institution"
                        onChange={(e) => handleChange(e)}
                    ></EditInput>
                </EachContainer>
                <EachContainer>
                    <SubTitles>Desde:</SubTitles>
                    <EditInput
                        type='date'
                        value={userEducation.startDate}
                        name="startDate"
                        onChange={(e) => handleChange(e)}
                    ></EditInput>
                </EachContainer>
                <EachContainer>
                    <SubTitles>Hasta:</SubTitles>
                    <EditInput
                        type='date'
                        value={userEducation.endDate}
                        name="endDate"
                        onChange={(e) => handleChange(e)}
                    ></EditInput>
                </EachContainer>
                <EachContainer>
                    <SubTitles>Descripción:</SubTitles>
                    <EditTextArea
                        value={userEducation.description}
                        name="description"
                        onChange={(e) => handleChange(e)}
                    ></EditTextArea>
                </EachContainer>
                <Header>
                    <Edit onClick={() => deleteFunction(userEducation.id)}>Borrar</Edit>
                    <Edit onClick={() => updateFunction()}>Guardar</Edit>
                </Header>
            </div>
            <div onClick={addEducation}
            className='overlay' style={{
                position: 'fixed',
                opacity: flag,
                display: overlayFlag,
                top: '0',
                left: '0',
                bottom: '0',
                right: '0',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                transition: 'all 1s',
                zIndex: '1000',
            }}>
            </div>
            {userRole === "applicant" && (
                (educationArray.length >= 0 && educationArray.length < 4) ?

                    <NoExperience className='experience-card'>
                        <Edit onClick={() => addEducation()}>Añadir educación</Edit>
                    </NoExperience>
                    :
                    <></>
            )
            }

            <div className='add-experience' style={{
                position: 'fixed',
                display: addDisplayFlag,
                opacity: flag,
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '40px',
                minWidth: '40%',
                width: 'auto',
                height: 'auto',
                background: '#FFFFFF',
                zIndex: '1001',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '15px',
                boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.7)',
                overflow: 'hidden',
                transition: 'all 1s',
            }}>
                <EachContainer>
                    <SubTitles>Carrera:</SubTitles>
                    <EditInput
                        value={addUserEducationState.degree}
                        name="degree"
                        onChange={(e) => addHandleChange(e)}
                    ></EditInput>
                </EachContainer>
                <EachContainer>
                    <SubTitles>Institución:</SubTitles>
                    <EditInput
                        value={addUserEducationState.institution}
                        name="institution"
                        onChange={(e) => addHandleChange(e)}
                    ></EditInput>
                </EachContainer>
                <EachContainer>
                    <SubTitles>Desde:</SubTitles>
                    <DateInput
                        type='date'
                        value={addUserEducationState.startDate}
                        name="startDate"
                        onChange={(e) => addHandleChange(e)}
                    ></DateInput>
                </EachContainer>
                <EachContainer>
                    <SubTitles>Hasta:</SubTitles>
                    <DateInput
                        type='date'
                        value={addUserEducationState.endDate}
                        name="endDate"
                        onChange={(e) => addHandleChange(e)}
                    ></DateInput>
                </EachContainer>
                <EachContainer>
                    <SubTitles>Descripción:</SubTitles>
                    <EditTextArea
                        value={addUserEducationState.description}
                        name="description"
                        onChange={(e) => addHandleChange(e)}
                    ></EditTextArea>
                </EachContainer>
                <Header>
                    <Edit onClick={() => closeModal()}>Descartar</Edit>
                    <Edit onClick={() => saveEducation()}>Guardar</Edit>
                </Header>
            </div>
        </Education>
    )
}
