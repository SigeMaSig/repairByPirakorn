const computerCounts = {
    '201': 50, '202': 50, '203': 50, '204': 50, '205': 50,
    '206': 50, '207': 50, '208': 50, '209': 50, '311': 12
};

function updateComputers() {
    console.log('updateComputers called');
    const roomSelect = document.getElementById('room');
    const computerSelect = document.getElementById('computer');
    if (!roomSelect || !computerSelect) {
        console.error('Error: room or computer select not found');
        return;
    }
    const selectedRoom = roomSelect.value;
    console.log('Selected room:', selectedRoom);

    computerSelect.innerHTML = '<option value="">-- เลือกคอม --</option>';
    computerSelect.disabled = !selectedRoom;

    if (selectedRoom && computerCounts[selectedRoom]) {
        const count = computerCounts[selectedRoom];
        console.log('Computer count:', count);
        for (let i = 1; i <= count; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `เครื่องที่ ${i}`;
            computerSelect.appendChild(option);
        }
        computerSelect.disabled = false;
    }
}

document.getElementById('repairForm').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Form submitted');

    const room = document.getElementById('room')?.value;
    const computer = document.getElementById('computer')?.value;
    const problem = document.getElementById('problem')?.value;
    console.log('Form data:', { room, computer, problem });

    if (!room || !computer || !problem) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วนค้าบ!');
        console.error('Missing data:', { room, computer, problem });
        return;
    }

    const repairs = JSON.parse(localStorage.getItem('repairs') || '[]');
    const repairId = repairs.length + 1;
    repairs.push({ id: repairId, room, computer, problem, status: 'pending' });
    localStorage.setItem('repairs', JSON.stringify(repairs));
    console.log('Data saved to localStorage:', { id: repairId, room, computer, problem, status: 'pending' });

    alert(`แจ้งซ่อมสำเร็จ! หมายเลขแจ้งซ่อมของคุณคือ ${repairId} กรุณาจดบันทึกเพื่อตรวจสอบสถานะ`);

    document.getElementById('repairForm').reset();
    document.getElementById('computer').innerHTML = '<option value="">-- กรุณาเลือกห้องก่อน --</option>';
    document.getElementById('computer').disabled = true;
});

console.log('script.js loaded');