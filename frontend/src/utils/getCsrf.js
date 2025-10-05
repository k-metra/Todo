export default function getCsrf() {
    return document.cookie.split('; ')
    .find(row => row.startsWith('csrftoken='))?.split('=')[1] || null;
}