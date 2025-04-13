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
    const table = document.querySelector('.table-center-all');  // 找到表格
    if (!table) {
        console.error('Table not found');
        return;
    }

    // 获取所有可排序的列头
    const datasetHeaders = table.querySelectorAll('.dataset-column.sortable');
    console.log('Found dataset headers:', datasetHeaders.length);

    datasetHeaders.forEach((header) => {
        header.addEventListener('click', function () {
            // 获取当前列的索引
            const headerRow = header.parentElement;
            const allHeaders = Array.from(headerRow.children);
            const columnIndex = allHeaders.indexOf(header);
            const isAsc = !header.classList.contains('asc');

            // 清除其他列的排序样式
            datasetHeaders.forEach(h => h.classList.remove('asc', 'desc'));
            header.classList.add(isAsc ? 'asc' : 'desc');

            // 获取tbody中的所有行
            const rows = Array.from(table.querySelectorAll('tbody tr'));
            console.log('Total rows before sort:', rows.length);

            // 选择需要排序的列：从第4列开始（数据列）
            rows.sort((a, b) => {
                const aValue = parseFloat(a.children[columnIndex + 3].textContent.trim()) || 0;  // 确保数据是数字
                const bValue = parseFloat(b.children[columnIndex + 3].textContent.trim()) || 0;
                return isAsc ? aValue - bValue : bValue - aValue;  // 按升序或降序排序
            });

            // 将排序后的行重新放入tbody
            rows.forEach(row => table.querySelector('tbody').appendChild(row));
        });
    });
}