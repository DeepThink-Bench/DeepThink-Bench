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

    const headers = table.querySelectorAll('thead th');
    const tbody = table.querySelector('tbody');
    let sortState = {}; // 保存排序状态

    headers.forEach((header, columnIndex) => {
        if (!header.classList.contains('dataset-column')) return;

        header.addEventListener('click', function () {
            const isAsc = sortState[columnIndex] !== true;
            sortState = {};
            sortState[columnIndex] = isAsc;

            headers.forEach(h => h.classList.remove('asc', 'desc'));
            header.classList.add(isAsc ? 'asc' : 'desc');

            const rows = Array.from(tbody.querySelectorAll('tr'));

            // 调试：输出排序前的列值
            console.log(`🔍 点击列索引 ${columnIndex}（${header.textContent.trim()}）`);
            console.log("排序前：", rows.map(row => row.children[columnIndex]?.textContent.trim()));

            rows.sort((a, b) => {
                const aText = a.children[columnIndex]?.textContent.trim();
                const bText = b.children[columnIndex]?.textContent.trim();
                const aVal = parseFloat(aText);
                const bVal = parseFloat(bText);

                // NaN 安全处理
                if (isNaN(aVal) || isNaN(bVal)) return 0;

                return isAsc ? aVal - bVal : bVal - aVal;
            });

            // 调试：输出排序后的列值
            console.log("排序后：", rows.map(row => row.children[columnIndex]?.textContent.trim()));

            tbody.innerHTML = '';
            rows.forEach(row => tbody.appendChild(row));
        });
    });
}