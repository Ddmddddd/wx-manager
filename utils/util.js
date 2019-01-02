const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatTime2 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatTime3 = date => {
  var date_before = new Date();
  date_before.setMonth(date_before.getMonth() - 3);
  var year = date_before.getFullYear()
  var month = date_before.getMonth() + 1
  const day = date_before.getDate()
  // var year = date.getFullYear()
  // var month = date.getMonth()
  // const day = date.getDate()
  // if (month < 3) year = year - 1;
  // month=(month+9)%12+1;
  return [year, month, day].map(formatNumber).join('-')
}

const formatTime4 = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join(':')
}

const formatTime5 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() -1
  return [year, month].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatTime2: formatTime2,
  formatTime3: formatTime3,
  formatTime4: formatTime4,
  formatTime5: formatTime5
}
