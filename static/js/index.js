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

            // 切换排序图标
            headers.forEach(h => h.classList.remove('asc', 'desc'));
            header.classList.add(isAsc ? 'asc' : 'desc');

            const rows = Array.from(tbody.querySelectorAll('tr'));

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

            // 重新填充排序后的内容
            rows.forEach(row => tbody.appendChild(row));
        });
    });
}