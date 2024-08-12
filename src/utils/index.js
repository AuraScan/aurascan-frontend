

export function shortenWalletAddress(walletAddress) {
  // 确保钱包地址至少有一定的长度
  if (walletAddress.length < 10) {
    return walletAddress;
  }

  // 获取地址的前6位和后4位
  const startPart = walletAddress.substring(0, 6);
  const endPart = walletAddress.substring(walletAddress.length - 4);

  // 拼接中间缩略展示部分
  const middlePart = '...';

  // 拼接结果
  const shortenedAddress = `${startPart}${middlePart}${endPart}`;

  return  shortenedAddress;
}
// 将时间戳～转换成具体日期
export function formatDateTime(timeStamp, returnType) {
  var date = new Date();
  date.setTime(timeStamp * 1000);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  if (returnType == 'full') {
   return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  }
  if (returnType == 'y-m-d h:m:s') {
    return y + '-' + m + '-' + d+' '+h + ':' + minute + ':' + second;
   }
  if (returnType == 'y-m-d') {
   return y + '-' + m + '-' + d;
  }
  if (returnType == 'm-d') {
   return m + '-' + d;
  }
  if (returnType == 'h:m') {
   return h + ':' + minute;
  }
  if (returnType == 'h:m:s') {
   return h + ':' + minute + ':' + second;
  }
  return [y, m, d, h, minute, second];
}

export function formatDateRet(dateString,returnType) {
  // 将日期字符串转换为 Date 对象
  const date = new Date(dateString);
  // 使用 toLocaleDateString() 方法提取月份和日期部分
  if( returnType=='m-d'){
    const extractedDate = date.toLocaleDateString('cn', { month: '2-digit', day: '2-digit' });
    return extractedDate.replace('/','-');
  }
  return extractedDate;
}

// 保留 指定位小数
export function filter_num_decimals(value,num) {
  if (!value || value==0 ) return 0;
  let num_float=parseFloat(value).toFixed(num)
  // const formattedNumber= NumberFormatter(num_float,{
  //   thousandSeparator:true,
  //   decimalSeparator:'.'
  // })
  // return formattedNumber;
  return num_float;
}

// 除以10^6，再取6位小数
export function divided_by_power_of_10(value) {
  if (!value || value==0 ) return 0;
  var result = value / Math.pow(10, 6);
  return filter_num_decimals(result,6);
}

// 生成随机数
export function randomNumberInRange(min, max) {
  // 👇️ 获取 min（含）和 max（含）之间的数字
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 日期相减～找出差值～～用于倒计时 #min(s) #secs
//1719439533000 1721056156404
export function timeStampDifference(startTime,endTime){
  if(startTime==undefined || endTime==undefined){
    return ''
  }
  if(startTime<Math.pow(10,13)){
    startTime=startTime*Math.pow(10,3)
  }
  // console.log("startTime,endTime",startTime,endTime)
  let timeInterval=Math.abs(endTime-startTime)
  let power_3=Math.pow(10,3)//1000

  let hours=Math.floor(parseInt(timeInterval)/power_3/3600)
  let minutes=Math.floor(parseInt(timeInterval)/power_3/60)
  let seconds=Math.floor(parseInt(timeInterval)/power_3)
  //取模处理 60 进制
  minutes=minutes%60;
  seconds=seconds%60;
  // 判断是否为空
  let str=''
  let hours_unit=hours>1?" hours ":" hour ";
  hours=hours?hours+hours_unit:"";
  let minutes_unit=minutes>1?" mins ":" min ";
  minutes=minutes?minutes+minutes_unit:"";
  let seconds_unit=seconds>1?" secs ":" sec "
  seconds=seconds?seconds+seconds_unit:"";
  str=hours+minutes+seconds
  return str=str?str+" ago":'';
  
}

//倒计时
// 更新倒计时函数
export function updateCountdown() {
  // 设置目标时间（这里以10分钟为例）
  const targetTime = new Date().getTime() + 10 * 60 * 1000; // 当前时间 + 10分钟
  const currentTime = new Date().getTime();
  const timeLeft = targetTime - currentTime;
 
  // if (timeLeft >= 0) {
  //   const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  //   const seconds = Math.floor((timeLeft / 1000) % 60);
  //   // 格式化显示
  //   document.getElementById('countdown').innerText = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  // } else {
  //   clearInterval(intervalId);
  //   document.getElementById('countdown').innerText = "00:00";
  // }

  // 显示初始倒计时
// updateCountdown();
 
// 设置间隔ID
// const intervalId = setInterval(updateCountdown, 1000);
}
 

// 数字，格式化
// export function numFormat(value) {
// return numeral(value).format('0,0')
// }

export function nmberFormat(number){
  // console.log(" number>> ",number);
  // 简单的数字格式化函数，可以根据需要进行扩展
  const formatNumber = (num) => {
    // console.log(" num>> ",num);
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return <span>{formatNumber(number)}</span>;
};

export function blockEpochRatio(block_height){
    // 计算值与360的商，取整，并乘以360
    const result = Math.floor(block_height / 360) * 360;
    // 从原始值中减去上述计算结果
    return block_height - result;
}
//生成随机数
export function generateRandomString (length){
    return Math.random().toString(36).substr(2, length).toLowerCase();
  
}

export function LogoSvg(){
  return(
    <svg>
    <g>
      <g>
        <path d="M54.1,36.61H41.71c-0.99,0-1.8-0.81-1.8-1.8V21.45c0-0.99,0.81-1.8,1.8-1.8H54.1c0.99,0,1.8,0.81,1.8,1.8v13.35
          C55.9,35.8,55.09,36.61,54.1,36.61z" fill="#ffffff"/>
        <path d="M85.4,36.61H73.01c-0.99,0-1.8-0.81-1.8-1.8V21.45c0-0.99,0.81-1.8,1.8-1.8H85.4c0.99,0,1.8,0.81,1.8,1.8v13.35
          C87.2,35.8,86.4,36.61,85.4,36.61z" fill="#ffffff"/>
        <path d="M69.75,20.96H57.36c-0.99,0-1.8-0.81-1.8-1.8V5.8c0-0.99,0.81-1.8,1.8-1.8h12.39c0.99,0,1.8,0.81,1.8,1.8v13.35
          C71.55,20.15,70.75,20.96,69.75,20.96z" fill="#ffffff"/>
        <path d="M38.45,52.26H26.06c-0.99,0-1.8-0.81-1.8-1.8V37.1c0-0.99,0.81-1.8,1.8-1.8h12.39c0.99,0,1.8,0.81,1.8,1.8v13.35
          C40.25,51.45,39.44,52.26,38.45,52.26z" fill="#ffffff"/>
        <path d="M69.75,66.61H57.36c-0.99,0-1.8-0.81-1.8-1.8V51.45c0-0.99,0.81-1.8,1.8-1.8h12.39c0.99,0,1.8,0.81,1.8,1.8V64.8
          C71.55,65.8,70.75,66.61,69.75,66.61z" fill="#ffffff"/>
        <path d="M101.05,52.26H88.66c-0.99,0-1.8-0.81-1.8-1.8V37.1c0-0.99,0.81-1.8,1.8-1.8h12.39c0.99,0,1.8,0.81,1.8,1.8v13.35
          C102.85,51.45,102.05,52.26,101.05,52.26z" fill="#ffffff"/>
        <path d="M22.8,67.91H10.41c-0.99,0-1.8-0.81-1.8-1.8V52.75c0-0.99,0.81-1.8,1.8-1.8H22.8c0.99,0,1.8,0.81,1.8,1.8v13.35
          C24.6,67.1,23.79,67.91,22.8,67.91z"  fill="#ffffff" />
        <path d="M54.1,83.56H41.71c-0.99,0-1.8-0.81-1.8-1.8V68.41c0-0.99,0.81-1.8,1.8-1.8H54.1c0.99,0,1.8,0.81,1.8,1.8v13.35
          C55.9,82.75,55.09,83.56,54.1,83.56z"  fill="#ffffff" />
        <path d="M69.75,83.56H57.36c-0.99,0-1.8-0.81-1.8-1.8V68.41c0-0.99,0.81-1.8,1.8-1.8h12.39c0.99,0,1.8,0.81,1.8,1.8v13.35
          C71.55,82.75,70.75,83.56,69.75,83.56z"  fill="#ffffff" />
        <path d="M85.4,83.56H73.01c-0.99,0-1.8-0.81-1.8-1.8V68.41c0-0.99,0.81-1.8,1.8-1.8H85.4c0.99,0,1.8,0.81,1.8,1.8v13.35
          C87.2,82.75,86.4,83.56,85.4,83.56z"  fill="#ffffff" />
        <path d="M116.7,67.91h-12.39c-0.99,0-1.8-0.81-1.8-1.8V52.75c0-0.99,0.81-1.8,1.8-1.8h12.39c0.99,0,1.8,0.81,1.8,1.8v13.35
          C118.51,67.1,117.7,67.91,116.7,67.91z"  fill="#ffffff" />
        <path d="M22.8,84.86H10.41c-0.99,0-1.8-0.81-1.8-1.8V69.71c0-0.99,0.81-1.8,1.8-1.8H22.8c0.99,0,1.8,0.81,1.8,1.8v13.35
          C24.6,84.06,23.79,84.86,22.8,84.86z"  fill="#ffffff" />
        <path d="M116.7,84.86h-12.39c-0.99,0-1.8-0.81-1.8-1.8V69.71c0-0.99,0.81-1.8,1.8-1.8h12.39c0.99,0,1.8,0.81,1.8,1.8v13.35
          C118.51,84.06,117.7,84.86,116.7,84.86z"  fill="#ffffff" />
        <path d="M22.8,101.82H10.41c-0.99,0-1.8-0.81-1.8-1.8V86.67c0-0.99,0.81-1.8,1.8-1.8H22.8c0.99,0,1.8,0.81,1.8,1.8v13.35
          C24.6,101.01,23.79,101.82,22.8,101.82z"  fill="#ffffff" />
        <path d="M116.7,101.82h-12.39c-0.99,0-1.8-0.81-1.8-1.8V86.67c0-0.99,0.81-1.8,1.8-1.8h12.39c0.99,0,1.8,0.81,1.8,1.8v13.35
          C118.51,101.01,117.7,101.82,116.7,101.82z"  fill="#ffffff" />
        <path d="M22.8,118.78H10.41c-0.99,0-1.8-0.81-1.8-1.8v-13.35c0-0.99,0.81-1.8,1.8-1.8H22.8c0.99,0,1.8,0.81,1.8,1.8v13.35
          C24.6,117.97,23.79,118.78,22.8,118.78z"  fill="#ffffff" />
        <path d="M54.1,120.08H41.71c-0.99,0-1.8-0.81-1.8-1.8v-13.35c0-0.99,0.81-1.8,1.8-1.8H54.1c0.99,0,1.8,0.81,1.8,1.8v13.35
          C55.9,119.27,55.09,120.08,54.1,120.08z"  fill="#ffffff" />
        <path d="M69.75,120.08H57.36c-0.99,0-1.8-0.81-1.8-1.8v-13.35c0-0.99,0.81-1.8,1.8-1.8h12.39c0.99,0,1.8,0.81,1.8,1.8v13.35
          C71.55,119.27,70.75,120.08,69.75,120.08z"  fill="#ffffff" />
        <path d="M85.4,120.08H73.01c-0.99,0-1.8-0.81-1.8-1.8v-13.35c0-0.99,0.81-1.8,1.8-1.8H85.4c0.99,0,1.8,0.81,1.8,1.8v13.35
          C87.2,119.27,86.4,120.08,85.4,120.08z"  fill="#ffffff" />
        <path d="M116.7,118.78h-12.39c-0.99,0-1.8-0.81-1.8-1.8v-13.35c0-0.99,0.81-1.8,1.8-1.8h12.39c0.99,0,1.8,0.81,1.8,1.8v13.35
          C118.51,117.97,117.7,118.78,116.7,118.78z"  fill="#ffffff" />
        <line x1="63.9" y1="11.83" x2="110.85" y2="60.08"  fill="#ffffff" />
        <line x1="16.95" y1="60.08" x2="63.9" y2="11.83"  fill="#ffffff" />
      </g>
      <g>
        <g>
          <path d="M141.45,25.01h17.25v69.01h17.25V25.01h17.25v86.26h-51.76V25.01z"  fill="#ffffff" />
          <path d="M244.96,25.01v17.25h-17.25v17.25h17.25v17.25h-17.25v34.5h-17.25V25.01H244.96z M262.21,59.51h-17.25V42.26h17.25V59.51
            z M244.96,76.77h17.25v34.5h-17.25V76.77z"  fill="#ffffff" />
          <path d="M279.47,42.26h17.25v17.25h17.25V42.26h17.25v69.01h-17.25v-34.5h-17.25v34.5h-17.25V42.26z M313.97,42.26h-17.25V25.01
            h17.25V42.26z"  fill="#ffffff" />
          <path d="M348.47,42.26h17.25v17.25h34.5v34.5h-17.25V76.77h-34.5V42.26z M348.47,111.27V94.02h34.5v17.25H348.47z M365.73,42.26
            V25.01h34.5v17.25H365.73z"  fill="#ffffff" />
          <path d="M417.48,42.26h17.25v51.76h-17.25V42.26z M434.73,42.26V25.01h34.5v17.25H434.73z M434.73,111.27V94.02h34.5v17.25
            H434.73z"  fill="#ffffff" />
          <path d="M486.49,42.26h17.25v17.25h17.25V42.26h17.25v69.01h-17.25v-34.5h-17.25v34.5h-17.25V42.26z M520.99,42.26h-17.25V25.01
            h17.25V42.26z"  fill="#ffffff" />
          <path d="M590,25.01v17.25h-17.25v69.01H555.5V25.01H590z M590,42.26h17.25v69.01H590V42.26z"  fill="#ffffff" />
        </g>
      </g>
    </g>
    </svg>
  )
}


