
function useValidateTaskCreatiobData(data) {
  let TaskCreationButton = true;
  // validate custom time
  // if custom time is greater than 24 and minutes is greater then 60 then data is invalide
  let addTaskcustomTimeValide = true;
  const addTaskcustomTime = data.customTime;
  let hr = Number(addTaskcustomTime?.hours);
  let min = Number(addTaskcustomTime?.mins);
  if (hr > 24 || min > 60 || hr<=0 || min<=0  ) {
    addTaskcustomTimeValide = false;
    TaskCreationButton = false;
  }

  //validate selectedFrequency
  const addTaskSelectedFrequency = data?.selectedFrequency;
  let keysFre = Object?.keys(addTaskSelectedFrequency);
  let findTrueRecordFrequency = false;

  keysFre?.forEach((key) => {
    const value = addTaskSelectedFrequency[key];
    if (value === true) {
      findTrueRecordFrequency = true;
    }
  });

  if (findTrueRecordFrequency === false)
    TaskCreationButton = false;

  //validate selectedIcons
  const addTaskSelectedIcons = data?.selectedIcons;
  const keysIcons = Object?.keys(addTaskSelectedIcons);
  let findTrueRecordIcon = false;

  keysIcons?.forEach(key => {
    const value = findTrueRecordIcon[key];
    if (value?.selected===true) {
      findTrueRecordIcon = true;
    }
  });
  if (findTrueRecordIcon === false)
    TaskCreationButton = false;

  //validate selectedTime
  const addTaskselectedTime = data?.selectedTime;
  const keysTime = Object?.keys(addTaskselectedTime);
  let findTrueRecordTime = false;

  keysTime.forEach(key => {
    const value = addTaskselectedTime[key];
    if (value === true) {
      findTrueRecordTime = true;
    }
  });

  if (findTrueRecordTime === false)
    TaskCreationButton = false;

  // validate taskDescription
  const addTasktaskDescription = data?.taskDescription;
  let findTrueRecordTaskDescription = true;
  if (addTasktaskDescription?.length === 0) {
    findTrueRecordTaskDescription = false;
    TaskCreationButton=false;
  }
  return [TaskCreationButton, addTaskcustomTimeValide, findTrueRecordFrequency, findTrueRecordIcon, findTrueRecordTime,findTrueRecordTaskDescription];
}

export default useValidateTaskCreatiobData;
