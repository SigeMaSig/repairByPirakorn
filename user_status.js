function getStatusText(status) {
    switch (status) {
        case 'pending': return 'รอซ่อม';
        case 'in_progress': return 'กำลังซ่อมค้าบ';
        case 'completed': return 'เสร็จแล้วค้าบ';
        default: return 'ไม่พบสถานะ';
    }
}

document.getElementById('statusForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Status form submitted');

    const room = document.getElementById('room')?.value;
    const statusList = document.getElementById('statusList');
    if (!room || !statusList) {
        console.error('Error: room or statusList not found');
        return;
    }

    const repairs = JSON.parse(localStorage.getItem('repairs') || '[]');
    const roomRepairs = repairs.filter(r => r.room === room);

    statusList.innerHTML = '';
    if (roomRepairs.length > 0) {
        roomRepairs.forEach(repair => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>เครื่องที่ ${repair.computer}</td>
                <td>${getStatusText(repair.status)}</td>
            `;
            statusList.appendChild(row);
        });
        console.log('Repairs found for room:', room, roomRepairs);
    } else {
        statusList.innerHTML = `<tr><td colspan="2" style="text-align: center; color: #dc3545;">ไม่พบรายการแจ้งซ่อมในห้อง ${room}</td></tr>`;
        console.log('No repairs found for room:', room);
    }
});

console.log('user_status.js loaded');