
const formatDate = (dateTimeStr) => {
    const datetime = new Date(dateTimeStr);

    const formatter = new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    return formatter.format(datetime);
};

export {formatDate};