export const getStatusColumn = (status) => {
    if (status === "TODO")
        return 2;
    if (status === "WIP")
        return 3;
    return 4;
}

export const formatISOToCustomString = (isoString, timeRequired = false) => {
    if (!isoString)
        return "Invalid Date";

    const date = new Date(isoString);
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(date);

    if (!timeRequired) {
        const formattedString = `${parts[2].value} ${parts[0].value} ${parts[4].value}`;
        return formattedString;
    }

    const formattedString = `${parts[2].value} ${parts[0].value} ${parts[4].value} ${parts[6].value}:${parts[8].value} ${parts[10].value}`;
    return formattedString;
}

export const getRelativeDateString = (isoString) => {
    if (!isoString)
        return "Invalid Date";

    const providedDate = new Date(isoString);
    const currentDate = new Date();

    if (
        providedDate.getDate() === currentDate.getDate() &&
        providedDate.getMonth() === currentDate.getMonth() &&
        providedDate.getFullYear() === currentDate.getFullYear()
    ) {
        return 'Today';
    }

    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    if (
        providedDate.getDate() === tomorrowDate.getDate() &&
        providedDate.getMonth() === tomorrowDate.getMonth() &&
        providedDate.getFullYear() === tomorrowDate.getFullYear()
    ) {
        return 'Tomorrow';
    }

    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(providedDate);
    const formattedString = `${parts[2].value} ${parts[0].value} ${parts[4].value}`;

    return formattedString;
}

export const getStatusColumnButtonText = (statusColumn) => {
    switch (statusColumn) {
        case 2:
            return "Start Working!";
        case 3:
            return "Complete Task";
        case 4:
            return "Rework";
        default:
            return "NOT MATCH";
    }
}

export const changeStatus = (task, currentStatus) => {
    let nextStatus = currentStatus;

    if (currentStatus === "TODO")
        nextStatus = "WIP";
    else if (currentStatus === "WIP")
        nextStatus = "DONE";
    else if (currentStatus === "DONE")
        nextStatus = "WIP";
    else
        nextStatus = "UNKNOWN";

    task.status = nextStatus;
    return task;
}

export const isDateLessThanToday = (isoDate) => {
    const passedDate = new Date(isoDate);
    const today = new Date();
    return passedDate < today;
}