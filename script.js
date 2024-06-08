function hitungTagihan() {
    const nama = document.getElementById('nama').value;
    const kategori = document.getElementById('kategori').value;
    const periodeAwal = document.getElementById('periodeAwal').value;
    const periodeAkhir = document.getElementById('periodeAkhir').value;
    const jumlahPemakaian = parseFloat(document.getElementById('jumlahPemakaian').value);

    let abodemen, tarifPerKwh, pajak;

    if (kategori === 'sosial') {
        abodemen = 2200;
        tarifPerKwh = 1461;
        pajak = 0;
    } else if (kategori === 'rumah') {
        abodemen = 1300;
        tarifPerKwh = 1461;
        pajak = 0.10;
    } else if (kategori === 'industri') {
        abodemen = 6600;
        tarifPerKwh = 1671;
        pajak = 0.30;
    }

    const subTotal = jumlahPemakaian * tarifPerKwh;
    const totalPajak = subTotal * pajak;
    const totalTagihan = abodemen + subTotal + totalPajak;

    const hasil = `
        <h3>Rincian Tagihan</h3>
        <table>
            <tr>
                <th>Nama Pelanggan</th>
                <td>${nama}</td>
            </tr>
            <tr>
                <th>Kategori</th>
                <td>${kategori}</td>
            </tr>
            <tr>
                <th>Periode</th>
                <td>${periodeAwal} sd ${periodeAkhir}</td>
            </tr>
            <tr>
                <th>Jumlah Pemakaian</th>
                <td>${jumlahPemakaian} kWh</td>
            </tr>
            <tr>
                <th>Abodemen</th>
                <td>Rp ${abodemen}</td>
            </tr>
            <tr>
                <th>Tarif Per Kwh</th>
                <td>Rp ${tarifPerKwh}</td>
            </tr>
            <tr>
                <th>Pajak</th>
                <td>${pajak * 100}%</td>
            </tr>
            <tr>
                <th>Sub Total</th>
                <td>Rp ${subTotal.toFixed(2)}</td>
            </tr>
            <tr>
                <th>Total Pajak</th>
                <td>Rp ${totalPajak.toFixed(2)}</td>
            </tr>
            <tr>
                <th>Total Tagihan</th>
                <td>Rp ${totalTagihan.toFixed(2)}</td>
            </tr>
        </table>
    `;

    document.getElementById('hasil').innerHTML = hasil;

    saveBill({
        nama,
        kategori,
        periodeAwal,
        periodeAkhir,
        jumlahPemakaian,
        abodemen,
        tarifPerKwh,
        pajak,
        subTotal,
        totalPajak,
        totalTagihan
    });
}

function saveBill(bill) {
    let bills = JSON.parse(localStorage.getItem('bills')) || [];
    bills.push(bill);
    localStorage.setItem('bills', JSON.stringify(bills));
    displaySavedBills();
}

function displaySavedBills() {
    let bills = JSON.parse(localStorage.getItem('bills')) || [];
    const savedBillsDiv = document.getElementById('savedBills');

    if (bills.length === 0) {
        savedBillsDiv.innerHTML = '<p>Tidak ada tagihan yang tersimpan.</p>';
        return;
    }

    let content = '<table><tr><th>Nama Pelanggan</th><th>Kategori</th><th>Periode</th><th>Jumlah Pemakaian</th><th>Total Tagihan</th></tr>';
    bills.forEach(bill => {
        content += `<tr>
            <td>${bill.nama}</td>
            <td>${bill.kategori}</td>
            <td>${bill.periodeAwal} sd ${bill.periodeAkhir}</td>
            <td>${bill.jumlahPemakaian} kWh</td>
            <td>Rp ${bill.totalTagihan.toFixed(2)}</td>
        </tr>`;
    });
    content += '</table>';

    savedBillsDiv.innerHTML = content;
}

document.addEventListener('DOMContentLoaded', displaySavedBills);
