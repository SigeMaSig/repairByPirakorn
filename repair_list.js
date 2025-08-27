var btnXlsx = document.querySelectorAll('.action button')[0]
var btnXls = document.querySelectorAll('.action button')[1]
var btnCsv = document.querySelectorAll('.action button')[2]

btnXlsx.onclick = () => exportData('xlsx')
btnXls.onclick = () => exportData('xls')
btnCsv.onclick = () => exportData('csv')

function exportData(type){
    const fileName = 'exported-sheet.' + type
    const table = document.getElementById("repairTable")
    const wb = XLSX.utils.table_to_book(table)
    XLSX.writeFile(wb, fileName)
}


function getStatusText(status) {
    switch (status) {
        case 'pending': return 'รอซ่อม';
        case 'in_progress': return 'กำลังซ่อมค้าบ';
        case 'completed': return 'เสร็จแล้วค้าบ';
        default: return '';
    }
}

function loadRepairs() {
    const repairs = JSON.parse(localStorage.getItem('repairs') || '[]');
    const tableBody = document.getElementById('repairList');
    if (!tableBody) {
        console.error('Error: repairList not found');
        return;
    }
    tableBody.innerHTML = '';
    repairs.forEach((repair, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${repair.id}</td>
            <td>${repair.room}</td>
            <td>เครื่องที่ ${repair.computer}</td>
            <td>${repair.problem}</td>
            <td>
                <select class="status-select" onchange="updateStatus(${index}, this)">
                    <option value="pending" ${repair.status === 'pending' ? 'selected' : ''}>รอซ่อม</option>
                    <option value="in_progress" ${repair.status === 'in_progress' ? 'selected' : ''}>กำลังซ่อมค้าบ</option>
                    <option value="completed" ${repair.status === 'completed' ? 'selected' : ''}>เสร็จแล้วค้าบ</option>
                </select>
            </td>
            <td><button class="delete-btn" onclick="deleteRow(${index})">ลบ</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteRow(index) {
    console.log('Delete row:', index);
    if (confirm('แน่ใจว่าจะลบรายการนี้หรือไม่?')) {
        const repairs = JSON.parse(localStorage.getItem('repairs') || '[]');
        repairs.splice(index, 1);
        localStorage.setItem('repairs', JSON.stringify(repairs));
        loadRepairs();
        console.log('Row deleted');
    }
}

function updateStatus(index, select) {
    console.log('Status updated:', { index, status: select.value });
    const repairs = JSON.parse(localStorage.getItem('repairs') || '[]');
    repairs[index].status = select.value;
    localStorage.setItem('repairs', JSON.stringify(repairs));
    loadRepairs();
}

document.addEventListener('DOMContentLoaded', loadRepairs);

console.log('repair_list.js loaded');