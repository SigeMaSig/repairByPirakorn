function getStatusText(status) {
    switch (status) {
        case 'pending': return 'รอซ่อม';
        case 'in_progress': return 'กำลังซ่อมค้าบ';
        case 'completed': return 'เสร็จแล้วค้าบ';
        default: return 'ไม่พบสถานะ';
    }
}

document.getElementById('adminStatusForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Admin status form submitted');

    const repairId = document.getElementById('repairId')?.value;
    const detailsDiv = document.getElementById('repairDetails');
    if (!repairId || !detailsDiv) {
        console.error('Error: repairId or repairDetails not found');
        return;
    }

    const repairs = JSON.parse(localStorage.getItem('repairs') || '[]');
    const repair = repairs.find(r => r.id === parseInt(repairId));

    if (repair) {
        detailsDiv.innerHTML = `
            <p><strong>หมายเลขแจ้งซ่อม:</strong> ${repair.id}</p>
            <p><strong>ห้อง:</strong> ${repair.room}</p>
            <p><strong>เครื่องที่:</strong> เครื่องที่ ${repair.computer}</p>
            <p><strong>ปัญหาที่พบ:</strong> ${repair.problem}</p>
            <p><strong>สถานะ:</strong> 
                <select id="statusSelect" onchange="updateAdminStatus(${repair.id}, this)">
                    <option value="pending" ${repair.status === 'pending' ? 'selected' : ''}>รอซ่อม</option>
                    <option value="in_progress" ${repair.status === 'in_progress' ? 'selected' : ''}>กำลังซ่อมค้าบ</option>
                    <option value="completed" ${repair.status === 'completed' ? 'selected' : ''}>เสร็จแล้วค้าบ</option>
                </select>
            </p>
        `;
        console.log('Repair found:', repair);
    } else {
        detailsDiv.innerHTML = `<p style="color: #dc3545;">ไม่พบหมายเลขแจ้งซ่อม ${repairId} กรุณาตรวจสอบหมายเลข</p>`;
        console.log('Repair not found for ID:', repairId);
    }
});

function updateAdminStatus(repairId, select) {
    console.log('Admin status updated:', { repairId, status: select.value });
    const repairs = JSON.parse(localStorage.getItem('repairs') || '[]');
    const repairIndex = repairs.findIndex(r => r.id === parseInt(repairId));
    if (repairIndex !== -1) {
        repairs[repairIndex].status = select.value;
        localStorage.setItem('repairs', JSON.stringify(repairs));
        console.log('Status updated in localStorage');
        document.getElementById('adminStatusForm').dispatchEvent(new Event('submit')); // รีโหลดข้อมูล
    }
}

console.log('admin_status.js loaded');