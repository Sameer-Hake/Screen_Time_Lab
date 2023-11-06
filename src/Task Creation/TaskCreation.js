import "./css/TaskCreation.css";
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ImportModal from './components/Import/Modal';
import { TaskCretionContext } from '../AppLayout/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import { addNewTask } from '../ReduxStore/ReduxSlice/addTaskSlice';

function TaskCreation() {
    const taskCreation = useContext(TaskCretionContext);

    return (
        <div className="task-creation-body">
            <header className="app-header">
                <span className='app-label'>Task Creation</span>
                <ImportModal />
            </header>
            <div className="task-creation-container">

                <div className="task-creation-details">
                    {
                        (taskCreation.taskCreationData.length) ?
                            taskCreation.taskCreationData.map((item, index) => (
                                <Link to={`/app/task/${index}`} className="task-creation-details-item">

                                    <div className='task-creation-star-section'>
                                        <div className="star1"><i class="fa-solid fa-star task-creation-star fa-2xs"></i></div>
                                    </div>

                                    <div className="task-creation-info-section">
                                        <span className="ts-bold-label">{item?.taskDescription}</span>
                                        <span className="ts-semibold-label">Reward :
                                            {(item?.selectedTime['10 min'] === true) ? " 10 " : null}
                                            {(item?.selectedTime['15 min'] === true) ? " 15 " : null}
                                            {(item?.selectedTime['20 min'] === true) ? " 20 " : null}
                                            {(item?.selectedTime['30 min'] === true) ? " 30 " : null}
                                            minutes(available every day)</span>
                                        <span className="ts-label">Assigned to:
                                            {(item.selectedIcons.Ram?.selected === true) ? "  Ram  " : null}
                                            {(item.selectedIcons.Shyam?.selected === true) ? "  Shyam  " : null}
                                            {(item.selectedIcons.Sita?.selected === true) ? "  Sita  " : null}
                                        </span>
                                    </div>

                                    <div className="edit-button">
                                        <Link>
                                            <i class="fa-solid fa-greater-than fa-sm add-task-icon"></i>
                                        </Link>
                                    </div>
                                </Link>
                            )) : (<span className="no-data-display-text">No task to display</span>)
                    }
                </div>
            </div>

            <div>
                <Link to="/app/task">
                    <div className="circular-button">
                        <div className="plus">+</div>
                    </div>
                </Link>
            </div >
        </div>
    );
}

export default TaskCreation;

