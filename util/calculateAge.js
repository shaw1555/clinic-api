const calculateAge = (dateOfBirth) => {

  if(dateOfBirth === undefined) return null;

  const dateSecond = new Date();
  const dateFirst = new Date(dateOfBirth);

  return getAge(dateSecond, dateFirst);
};

const calculateAgeUnitTest = (dateOfBirth, currentDate) => {
  const dateSecond = new Date(currentDate);
  const dateFirst = new Date(dateOfBirth);

  return getAge(dateSecond, dateFirst);
};

const getAge = (dateSecond, dateFirst) => {
  //   // time difference
  //   const timeDiff = Math.abs(dateSecond.getTime() - dateFirst.getTime());

  //   // days difference
  //   const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  //   const year = Math.floor(diffDays / 365);
  //   const month = Math.floor((diffDays % 360) / 30);
  //   const day = Math.floor((diffDays % 360) % 30);

  // 01  03 // 02
  // 2019 12  ,  2020 13 //

  let year = dateSecond.getFullYear() - dateFirst.getFullYear();
  let month = dateSecond.getMonth() - dateFirst.getMonth();
  if (month < 0) {
    month += 12;
    year -= 1;
  }

  // 30 - 31 //  29
  //29 - 28 // 1
  // 28 - 31 //
  let day = dateSecond.getDate() - dateFirst.getDate();
  if (day < 0) {
    // const dateOfPreviousMonth = previousMonth(dateSecond);
    // const dayCountOfPreviousMonth = daysInThisMonth(dateOfPreviousMonth);
    const dayCountOfPreviousMonth = daysInThisMonth(dateFirst);
    day += dayCountOfPreviousMonth;
    month -= 1;
  }

  const sYear = year === 0 ? "" : `${year} Y `;
  const sMonth = month === 0 ? "" : `${month} M `;
  const sDay = day === 0 ? "" : `${day} D`;

  return sYear + sMonth + sDay;
};

previousMonth = (date) => {
  var d = new Date(date);
  var newMonth = d.getMonth() - 1;
  if (newMonth < 0) {
    newMonth += 12;
    d.setYear(d.getYear() - 1);
  }
  d.setMonth(newMonth);

  return d;
};

daysInThisMonth = (date) => {
  var now = new Date(date);
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};

const calculateDateOfYear = (age) => {
  return new Date().getFullYear() - age;
};

const getDateOfYearFromDate = (date) => {
  return new Date(date).getFullYear();
};

exports.calculateAgeUnitTest = calculateAgeUnitTest;
exports.getDateOfYearFromDate = getDateOfYearFromDate;
exports.calculateAge = calculateAge;
exports.calculateDateOfYear = calculateDateOfYear;
