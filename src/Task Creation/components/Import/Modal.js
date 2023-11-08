import "../../css/Import/Modal.css";
import React, { useRef, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Papa from "papaparse";
import Table from "./Table";
import { TaskCretionContext } from '../../../AppLayout/AppLayout';

const UserTaskModal = () => {
    const taskCreation = useContext(TaskCretionContext);

    const [show, setShow] = useState(false);
    const [CSVData, setCSVData] = useState([]);
    const [CSVDataToggle, setCSVDataToggle] = useState(false);
    const [error, setError] = useState("");
    const [file, setFile] = useState("");

    const [taskDescription, setTaskDescription] = useState('');

    const [selectedIcons, setSelectedIcons] = useState({
        Ram: { selected: true, name: 'Ram' },
        Shyam: { selected: true, name: 'Shyam' },
        Sita: { selected: false, name: 'Sita' },
    });

    const [selectedTime, setSelectedTime] = useState({
        '10 min': true,
        '15 min': false,
        '20 min': false,
        '30 min': false,
    });

    const [selectedFrequency, setSelectedFrequency] = useState({
        'Everyday': true,
        'Once a week': false,
        'Once a month': false,
    });

    let scvBtn = useRef(null);
    let fileUploadToggle = useRef(false);

    const handleFileChange = (e) => {
        setError('');
        if (e.target.files.length) {
            const inputFile = e.target.files[0];
            const fileExtension = inputFile.name.split('.').pop();

            if (fileExtension !== 'csv') {
                setError('Please input a CSV file');
            }
            else {
                fileUploadToggle.current = true;
                setFile(inputFile);
                handleParse(inputFile);
            }
        }
    };

    const handleParse = (inputFile) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            Papa.parse(event.target.result, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => {
                    console.log(result.data);
                    setCSVData(result.data);
                    setCSVDataToggle(true);
                },
                error: (error) => {
                    setError('Error parsing CSV: ' + error.message);
                },
            });
        };
        reader.readAsText(inputFile);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCSVBtn = () => {
        scvBtn.current.click();
        console.log(error, file);
    }

    // const handleFileChange = (e) => {
    //     setError("");
    //     if (e.target.files.length) {
    //         const inputFile = e.target.files[0];
    //         const fileExtension = inputFile?.type.split("/")[1];
    //         if (!allowedExtensions.includes(fileExtension)) {
    //             setError("Please input a csv file");
    //             return;
    //         }
    //         setFile(inputFile);
    //     }
    //     handleParse();
    // };

    // const handleParse = () => {
    //     console.log("read the data");
    //     if (!file)
    //         return setError("Enter a valid file");
    //     const reader = new FileReader();
    //     reader.onload = async ({ target }) => {
    //         const csv = Papa.parse(target.result, { header: true });
    //         const parsedData = csv?.data;
    //         console.log("parsedData");
    //         console.log(csv); // we got here all data
    //         const columns = Object.keys(parsedData[0]);
    //         setData(columns);
    //         setCSVData(csv);
    //     };
    //     reader.readAsText(file);
    // };
    const toggleTimeSelection = (time) => {
        setSelectedTime((prevState) => ({
            ...prevState,
            [time]: !prevState[time],
        }));
    };

    const toggleIconSelection = (icon) => {
        setSelectedIcons((prevState) => ({
            ...prevState,
            [icon]: {
                ...prevState[icon],
                selected: !prevState[icon]?.selected
            },
        }));
    };

    const handleContinue = () => {
        let arr = [];
        if (fileUploadToggle.current) {
            for (let i = 0; i < CSVData.length; i++) {
                let taskDescription = CSVData[i].taskDescription;
                setTaskDescription(CSVData[i].taskDescription);

                let names = CSVData[i].Kids.split(",");

                for (let j = 0; j < names.length; j++) {
                    toggleIconSelection(names[j]);
                    console.log(selectedIcons);
                }

                let duration = CSVData[i]?.Duration;

                toggleTimeSelection(duration);
                arr.push({ taskDescription, selectedIcons, selectedTime, selectedFrequency });
            }
        }
        taskCreation.setTaskCreationData(arr);
    }

    return (
        <div className='task-creation'>
            <Button variant="primary" className="modal-btn" onClick={handleShow}>
                Import
            </Button>

            <Modal show={show} onHide={handleClose} className="task-creation-poppup">
                <Modal.Header closeButton>
                    <Modal.Title class="task-creation-madal-title">
                        Import to Keyword Category
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="task-creation-modal">
                        <div className="task-creation-modal-left">
                            <div className="task-creation-modal-left-header">
                                <p>To import to a Keyword Category</p>
                            </div>

                            <div className="task-creation-modal-left-body">
                                Each entry should appear on a separate line and include the Keyword
                                or keyword phrase. The following header fields must be included in the first row.
                                <br />
                                <br />
                                <b className='left-box-bold-text' >Task Name : </b>
                                Name of the Task not greater than 20 character(max.20 chars).
                                <br />
                                <b className='left-box-bold-text'>Kids : </b>
                                All the kids are comma separeted.
                                <br />
                                <b className='left-box-bold-text'>Duration : </b>
                                Durartion must be less than 500 minutes and not
                                contain any alphabet or spacial values(Only Numeric Values Allowed).
                                <br />
                                <b className='left-box-bold-text'>Frequency : </b>
                                Frequency must be less than 50  and not
                                contain any alphabet or spacial values(Only Numeric Values Allowed).
                                <br />
                                <b className='left-box-bold-text'>Note : </b> Empty values are skipped from the record.
                            </div>

                            <div className="task-creation-modal-left-footer">
                                <input
                                    type="file"
                                    name="file"
                                    accept=".csv"
                                    className="select-csv-file "
                                    onChange={handleFileChange}
                                    ref={scvBtn} />
                                <Button variant="success" onClick={handleCSVBtn} className="file-btn-style">Select a CSV File</Button>
                            </div>
                        </div>

                        <div className="task-creation-modal-right">
                            <p className='print-total-record'>144 Imported, Selected to Add</p>
                            <Table CSVFiledata={CSVData} toggleCSV={CSVDataToggle} />
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-success" onClick={() => { handleClose(); handleContinue(); }}>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserTaskModal;