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

    const datasetHeaders = table.querySelectorAll('.dataset-column.sortable');
    console.log('Found dataset headers:', datasetHeaders.length);

    datasetHeaders.forEach((header) => {
        header.addEventListener('click', function () {
            const headerRow = header.parentElement;
            const allHeaders = Array.from(headerRow.children);
            const columnIndex = allHeaders.indexOf(header);
            const isAsc = !header.classList.contains('asc');

            console.log('Clicked header text:', header.textContent);
            console.log('Header column index in second row:', columnIndex);

            // Remove asc/desc classes from all headers
            datasetHeaders.forEach(h => h.classList.remove('asc', 'desc'));
            header.classList.add(isAsc ? 'asc' : 'desc');

            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));

            rows.sort((a, b) => {
                const aValue = parseFloat(a.children[columnIndex + 3]?.textContent.trim()) || 0;
                const bValue = parseFloat(b.children[columnIndex + 3]?.textContent.trim()) || 0;
                const result = isAsc ? aValue - bValue : bValue - aValue;
                console.log(`Compare: ${aValue} vs ${bValue} => ${result}`);
                return result;
            });

            // 清空并重新插入排序后的行
            tbody.innerHTML = '';
            rows.forEach(row => tbody.appendChild(row));
        });
    });
}