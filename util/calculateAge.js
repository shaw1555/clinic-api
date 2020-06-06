const calculateAge = (dateOfYear) => {
    return  new Date().getFullYear() - dateOfYear;
}

exports.calculateAge = calculateAge;