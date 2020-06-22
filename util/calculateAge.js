const calculateAge = (dateOfBirth) => {
     const dateSecond = new Date();
     const dateFirst = dateOfBirth;

     // time difference
     const timeDiff = Math.abs(dateSecond.getTime() - dateFirst.getTime());

     // days difference
     const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

     const year = Math.floor(diffDays/365);
     const month = Math.floor((diffDays%360)/30);
     const day = Math.floor((diffDays%360)%30);

     return `${year} Y ${month} M ${day} D`;
}

const calculateDateOfYear = (age) => {
    return  new Date().getFullYear() - age;
}

const getDateOfYearFromDate = (date) => {
    return new Date(date).getFullYear();
}

exports.getDateOfYearFromDate = getDateOfYearFromDate;
exports.calculateAge = calculateAge;
exports.calculateDateOfYear = calculateDateOfYear;