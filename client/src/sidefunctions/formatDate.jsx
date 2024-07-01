function formatDate(timestamp) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const monthIndex = date.getMonth();
  const monthName = months[monthIndex];
  const year = String(date.getFullYear());
  
  return `${day} ${monthName} ${year}`;
  }
  export default formatDate