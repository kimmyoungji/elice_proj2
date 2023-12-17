export default function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
  
    const monthString = year + '-' + month;
    const dateString = year + '-' + month + '-' + day;
  
    return [monthString, dateString];
}
