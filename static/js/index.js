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

    headers.forEach((header, columnIndex) => {
        if (!header.classList.contains('dataset-column')) return;

        header.addEventListener('click', function () {
            const isAsc = !header.classList.contains('asc');

            // 清除旧的排序类
            headers.forEach(h => h.classList.remove('asc', 'desc'));
            header.classList.add(isAsc ? 'asc' : 'desc');

            // 获取所有行
            const rows = Array.from(tbody.querySelectorAll('tr'));

            // 按该列数值进行排序
            rows.sort((a, b) => {
                const aVal = parseFloat(a.children[columnIndex].textContent.trim()) || 0;
                const bVal = parseFloat(b.children[columnIndex].textContent.trim()) || 0;
                return isAsc ? aVal - bVal : bVal - aVal;
            });

            // 清空表格重新插入排序后的行
            tbody.innerHTML = '';
            rows.forEach(row => tbody.appendChild(row));
        });
    });
}