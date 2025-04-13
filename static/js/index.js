window.HELP_IMPROVE_VIDEOJS = false;

document.addEventListener('DOMContentLoaded', function() {
    // // 初始化轮播图
    // var options = {
    //     slidesToScroll: 1,
    //     slidesToShow: 1,
    //     loop: true,
    //     infinite: true,
    //     autoplay: true,
    //     autoplaySpeed: 5000,
    // }
    // var carousels = bulmaCarousel.attach('.carousel', options);
    // bulmaSlider.attach();

    // 初始化表格排序
    initTableSort();
});

function initTableSort() {
    const table = document.querySelector('.table-center-all');
    if (!table) {
        console.error('Table not found');
        return;
    }

    const datasetHeaders = table.querySelectorAll('.dataset-column');
    console.log('Found dataset headers:', datasetHeaders.length);

    datasetHeaders.forEach((header) => {
        header.addEventListener('click', function () {
            const columnIndex = Array.from(header.parentElement.children).indexOf(header);
            console.log('Sorting column:', columnIndex, header.textContent);

            const isAsc = !header.classList.contains('asc');
            datasetHeaders.forEach(h => h.classList.remove('asc', 'desc'));
            header.classList.add(isAsc ? 'asc' : 'desc');

            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));

            // 排序整个列的值
            rows.sort((a, b) => {
                const aText = a.children[columnIndex]?.textContent.trim();
                const bText = b.children[columnIndex]?.textContent.trim();

                const aNum = parseFloat(aText);
                const bNum = parseFloat(bText);

                const isNumber = !isNaN(aNum) && !isNaN(bNum);

                if (isNumber) {
                    return isAsc ? aNum - bNum : bNum - aNum;
                } else {
                    return isAsc ? aText.localeCompare(bText) : bText.localeCompare(aText);
                }
            });

            // 重新写入排序后的行
            tbody.innerHTML = '';
            rows.forEach(row => tbody.appendChild(row));
        });
    });
}
