import Mock_Data from './Mock_Data.json'

function isAlphanumeric(value) {
    for (let i = 0; i < value.length; i++) {
        const char = value[i];
        if (char >= '0' && char <= '9') {
            return true;
        }
    }
    return false;
}

function useValidateTaskRecords(data) {
    console.log(data);
    let temp = Mock_Data;
    let skippedRecords = [];
    // 1) if any cell is empty then just skip that row and save in skipped records array
    let filteredArray = temp.filter(obj =>
        Object.values(obj).every(value => {
            let val = (value !== '' && value !== null && value !== undefined)
            if (val) {
                return true;
            }
            skippedRecords.push(obj);
            return false;
        }
        ))

    // 2) Name of the task is not greater than 20 Character
   filteredArray = filteredArray.filter(obj => obj.task_name.length <= 20);

    //3 Durartion must be less than 500 minutes and Duration is not alphanumeric
    filteredArray = filteredArray.filter(obj => (obj.Duration <= 500 && (isAlphanumeric(obj.Duration))));

    //4 Durartion must be less than 500 minutes and Duration is not alphanumeric
    filteredArray = filteredArray.filter(obj => (obj.Freq <= 50 && (isAlphanumeric(obj.Duration))));



    return [filteredArray, skippedRecords];
}
export default useValidateTaskRecords;
