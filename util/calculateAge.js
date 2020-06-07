const calculateAge = (dateOfYear) => {
    return  new Date().getFullYear() - dateOfYear;
}

const calculateDateOfYear = (age) => {
    return  new Date().getFullYear() - age;
}


exports.calculateAge = calculateAge;
exports.calculateDateOfYear = calculateDateOfYear;