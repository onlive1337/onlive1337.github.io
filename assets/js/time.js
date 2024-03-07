document.addEventListener("DOMContentLoaded", function() {
    const clockElement = document.getElementById('clock');

    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'pm' : 'am';

        hours = hours % 12 || 12;

        clockElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    }
    setInterval(updateClock, 1000);
    updateClock();
});