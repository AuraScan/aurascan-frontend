import React, { useState, useEffect } from 'react';
// from datetime import datetime
// export function TimeDifference(param_targetTime) {
//   console.log("TimeDifference>>",param_targetTime)
//   // const [timeDifference, setTimeDifference] = useState({hours:0, minutes: 0, seconds: 0 });

//   // useEffect(() => {
//     const targetTime = new Date(param_targetTime); // 月份是从0开始计数，所以2表示3月
//     const currentTime = new Date();

//     const difference = currentTime - targetTime;
//     // 1小时=60000*60
//     // const hours = Math.floor(difference / 3600000); // 1小时=60000*60
//     // const minutes = Math.floor(difference / 60000); // 1分钟 = 60000毫秒
//     const seconds = Math.floor((difference % 60000) / 1000); // 剩余毫秒转换为秒

//     // setTimeDifference({hours, minutes, seconds });
//   // }, [param_targetTime]);

//   return seconds

export function TimeDifference(props) {

  const [timeDifference, setTimeDifference] = useState({hours:0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetTime = new Date(props.date); // 月份是从0开始计数，所以2表示3月
    const currentTime = new Date();

    const difference = currentTime - targetTime;
    // 1小时=60000*60
    const hours = Math.floor(difference / 3600000); // 1小时=60000*60
    const minutes = Math.floor(difference / 60000); // 1分钟 = 60000毫秒
    const seconds = Math.floor((difference % 60000) / 1000); // 剩余毫秒转换为秒

    setTimeDifference({hours, minutes, seconds });
  }, [props]);


  return (
    <div>
      {timeDifference.hours!=0? <span className='color-gray-8B font-12'>{timeDifference.hours} hrs </span>:''} 
      {timeDifference.minutes!=0? <span className='color-gray-8B font-12'>{timeDifference.minutes} mins </span>:''}
      <span className='color-gray-8B font-12'>{timeDifference.seconds} secs ago</span>
    </div>
  );
}


export function transDatetime(inputDate){
  // 输入的日期时间字符串
  // var inputDate = "2024-03-19 22:27:07";
  // 将字符串转换为 Date 对象
  var dateObj = new Date(inputDate);

  // 获取年、月、日、小时和分钟
  var year = dateObj.getFullYear();
  var month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  var day = ('0' + dateObj.getDate()).slice(-2);
  var hours = ('0' + dateObj.getHours()).slice(-2);
  var minutes = ('0' + dateObj.getMinutes()).slice(-2);

  // 格式化为所需的字符串格式
  var formattedDate = year + '/' + month + '/' + day + ' ' + hours + ':' + minutes;

  return formattedDate;
}
