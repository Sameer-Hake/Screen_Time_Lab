import '../css/EditTask.css';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { TaskCretionContext } from '../../AppLayout/AppLayout';
import useValidateTaskCreatiobData from '../utils/useValidateTaskCreatiobData';

const EditTask = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const taskCreation = useContext(TaskCretionContext);

    const [taskDescription, setTaskDescription] = useState('');
    const [selectedIcons, setSelectedIcons] = useState({
        Ram: { selected: false, name: 'Ram' },
        Shyam: { selected: false, name: 'Shyam' },
        Sita: { selected: false, name: 'Sita' },
    });

    const [selectedTime, setSelectedTime] = useState({
        '10 min': false,
        '15 min': false,
        '20 min': false,
        '30 min': false,
    });

    const [customTime, setCustomTime] = useState({ hours: '', mins: '' });

    const [selectedFrequency, setSelectedFrequency] = useState({
        'Everyday': false,
        'Once a week': false,
        'Once a month': false,
    });

    const validateAddTaskData = useValidateTaskCreatiobData({
        taskDescription,
        customTime,
        selectedIcons,
        selectedTime,
        selectedFrequency,
    })

    //set here all the initial object data
    useEffect(() => {
        setTaskDescription(taskCreation.taskCreationData[id]?.taskDescription);
        setSelectedIcons(taskCreation.taskCreationData[id]?.selectedIcons);
        setSelectedTime(taskCreation.taskCreationData[id]?.selectedTime);
        // setCustomTime(taskCreation.taskCreationData[id]?.customTime);
        setSelectedFrequency(taskCreation.taskCreationData[id]?.selectedFrequency);
    }, []);

    const onDeleteTask = () => {
        let remainingTask = taskCreation.taskCreationData.filter((item, index) => {
            if (index === Number(id)) return false;
            return true;
        })
        taskCreation.setTaskCreationData(remainingTask);
    }

    const onSaveTask = () => {
        console.log(id)
        let remainingTask = taskCreation.taskCreationData.filter((item, index) => {
            if (index === Number(id)) return false;
            return true;
        })
        taskCreation.setTaskCreationData([...remainingTask, { customTime, selectedFrequency, selectedIcons, selectedTime, taskDescription }]);
    }

    let countTrueVal = 2;
    for (let i = 0; i <= 5; i++) {
        if (validateAddTaskData[i] === true) {
            countTrueVal += 1;
        }
    }

    const toggleIconSelection = (icon) => {
        setSelectedIcons((prevState) => ({
            ...prevState,
            [icon]: { ...prevState[icon], selected: !prevState[icon].selected },
        }));
    };

    const toggleTimeSelection = (time) => {
        setSelectedTime((prevState) => ({
            ...Object.fromEntries(Object.keys(prevState).map(key => [key, false])),
            [time]: true,
        }));
        setCustomTime({ hours: '', mins: '' });
    };

    const toggleFrequencySelection = (frequency) => {
        setSelectedFrequency((prevState) => ({
            ...Object.fromEntries(Object.keys(prevState).map(key => [key, false])),
            [frequency]: true,
        }));
    };

    const handleCustomTimeChange = (e) => {
        const { name, value } = e.target;
        setCustomTime((prevTime) => ({
            ...prevTime,
            [name]: value,
        }));

        setSelectedTime({
            '10 min': false,
            '15 min': false,
            '20 min': false,
            '30 min': false,
        });
    };

    return (
        <div className="add-task">
            <header className="app-header">
                <span className='app-label'>Edit Task </span>
            </header>

            <div className="add-task-container">
                <div className="task-description h-1">
                    <label className="tag-color">Describe the task</label>
                    <input
                        placeholder="eg. Clean your room"
                        className="task-textarea"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                </div>

                <div className="task-description h-2">
                    <label className="tag-color">Assign task to</label>

                    <div className="mainContainer" style={{ display: "flex" }}>
                        <div className="name-icon-container" style={{ display: "flex" }}>
                            <div
                                onClick={() => toggleIconSelection('Ram')}
                                className={`name-icon-container ${selectedIcons.Ram.selected ? 'selected' : ''}`}
                            >
                                <label className="asign-task-user task-user">Ram</label>
                                {
                                    selectedIcons.Ram.selected && (
                                        <div className="selected-icon">
                                            <i className="fas fa-check"></i>
                                        </div>
                                    )
                                }
                            </div>
                            <img
                                src="https://th.bing.com/th/id/OIP.PlUghRkXvx9eqZvManVhsgHaIS?pid=ImgDet&rs=1"
                                alt="Ram Icon"
                                className="icon"
                                onClick={() => toggleIconSelection('Ram')}
                            />
                        </div>

                        <div className="name-icon-container">
                            <div
                                onClick={() => toggleIconSelection('Shyam')}
                                className={`name-icon-container ${selectedIcons.Shyam.selected ? 'selected' : ''}`}
                            >
                                <label className="asign-task-user task-user">Shyam</label>
                                {
                                    selectedIcons.Shyam.selected && (
                                        <div className="selected-icon">
                                            <i className="fas fa-check"></i>
                                        </div>
                                    )
                                }
                            </div>
                            <img
                                src="https://th.bing.com/th/id/OIP.PlUghRkXvx9eqZvManVhsgHaIS?pid=ImgDet&rs=1"
                                alt="Shyam Icon"
                                className="icon"
                                onClick={() => toggleIconSelection('Shyam')}
                            />
                        </div>

                        <div className="name-icon-container">
                            <div
                                onClick={() => toggleIconSelection('Sita')}
                                className={`name-icon-container ${selectedIcons.Sita.selected ? 'selected' : ''}`}
                            >
                                <label className="asign-task-user task-user">Sita</label>
                                {
                                    selectedIcons.Sita.selected && (
                                        <div className="selected-icon">
                                            <i className="fas fa-check"></i>
                                        </div>
                                    )
                                }
                            </div>
                            <img
                                src="https://th.bing.com/th/id/OIP.PlUghRkXvx9eqZvManVhsgHaIS?pid=ImgDet&rs=1"
                                alt="Sita Icon"
                                className="icon"
                                onClick={() => toggleIconSelection('Sita')}
                            />
                        </div>
                    </div>
                </div>

                <div className="task-description h-3">
                    <label className="tag-color"> How much reward</label>
                    <div className="time-buttons">
                        <NavLink
                            onClick={() => toggleTimeSelection('10 min')}
                            activeClassName={selectedTime['10 min'] ? 'button-active' : ''}
                        >
                            <div className={`time-button ${selectedTime['10 min'] ? 'button-active' : ''}`}>
                                <span className='inner-text'>10 mins</span>
                            </div>
                        </NavLink>

                        <NavLink
                            onClick={() => toggleTimeSelection('15 min')}
                            activeClassName={selectedTime['15 min'] ? 'button-active' : ''}
                        >
                            <div className={`time-button ${selectedTime['15 min'] ? 'button-active' : ''}`}>
                                <span className='inner-text'> 15 mins</span>
                            </div>
                        </NavLink>

                        <NavLink
                            onClick={() => toggleTimeSelection('20 min')}
                            activeClassName={selectedTime['20 min'] ? 'button-active' : ''}
                        >
                            <div className={`time-button ${selectedTime['20 min'] ? 'button-active' : ''}`}>
                                <span className='inner-text'>20 mins</span>
                            </div>
                        </NavLink>

                        <NavLink
                            onClick={() => toggleTimeSelection('30 min')}
                            activeClassName={selectedTime['30 min'] ? 'button-active' : ''}
                        >
                            <div className={`time-button ${selectedTime['30 min'] ? 'button-active' : ''}`}>
                                <span className='inner-text'>30 mins</span>
                            </div>
                        </NavLink>

                    </div>
                </div>

                <div className="task-description h-4">
                    <label className="tag-color">Custom time</label>
                    <div className="custom-time-inputs">
                        <div className="custom-time-input">
                            <input
                                type="number"
                                name="hours"
                                placeholder="Hours"
                                className="custom-time-textarea"
                                value={customTime.hours}
                                onChange={handleCustomTimeChange}
                            />
                        </div>
                        <div className="custom-time-input">
                            <input
                                type="number"
                                name="mins"
                                placeholder="Mins"
                                className="custom-time-textarea2"
                                value={customTime.mins}
                                onChange={handleCustomTimeChange}
                            />
                            {validateAddTaskData[1] ? (<i class="fa-solid fa-check custom-time-tick fa-lg"></i>) : (null)}
                        </div>

                    </div>
                </div>

                <div className="task-description h-5">
                    <label className="tag-color">How often do you want your kids to do this task?</label>

                    <div className="timebuttons">
                        <NavLink
                            onClick={() => toggleFrequencySelection('Everyday')}
                            activeClassName={selectedFrequency['Everyday'] ? 'button-active' : ''}
                        >
                            <div className={`time-button ${selectedFrequency['Everyday'] ? 'button-active' : ''}`}>
                                <span className='inner-text'>Everyday</span>
                            </div>
                        </NavLink>

                        <NavLink
                            onClick={() => toggleFrequencySelection('Once a week')}
                            activeClassName={selectedFrequency['Once a week'] ? 'button-active' : ''}
                        >
                            <div className={`time-button ${selectedFrequency['Once a week'] ? 'button-active' : ''}`}>
                                <span className='inner-text'>Once a week</span>
                            </div>
                        </NavLink>

                        <NavLink
                            onClick={() => toggleFrequencySelection('Once a month')}
                            activeClassName={selectedFrequency['Once a month'] ? 'button-active' : ''}
                        >
                            <div className={`time-button ${selectedFrequency['Once a month'] ? 'button-active' : ''}`}>
                                <span className='inner-text'>Once a month</span>
                            </div>
                        </NavLink>
                    </div>
                </div>



                {
                    (countTrueVal === 5) ? (<div
                        className="create-task"
                        onClick={() => {
                            onSaveTask();
                            navigate('/app/task-creation');
                        }}
                    >
                        <span>Save Task</span>
                    </div>
                    ) : (<div className="inactivecreateTask">
                        <span>Save Task</span>
                    </div>
                    )
                }

                {
                    <div
                        className="delete-task"
                        onClick={() => {
                            onDeleteTask();
                            navigate('/app/task-creation');
                        }}
                    >
                        <span>Delete Task</span>
                    </div>
                }
            </div>
        </div >
    );
};

export default EditTask;

