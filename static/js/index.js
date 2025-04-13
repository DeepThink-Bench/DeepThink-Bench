window.HELP_IMPROVE_VIDEOJS = false;

document.addEventListener('DOMContentLoaded', function() {
    // 初始化轮播图
    var options = {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
    }
    var carousels = bulmaCarousel.attach('.carousel', options);
    bulmaSlider.attach();

    // 初始化表格排序
    initTableSort();
});

function initTableSort() {
    const table = document.querySelector('.table-center-all');
    if (!table) {
        console.error('Table not found');
        return;
    }

    // 选择所有数据集列的表头
    const datasetHeaders = table.querySelectorAll('.dataset-column');
    console.log('Found dataset headers:', datasetHeaders.length);

    datasetHeaders.forEach((header) => {
        header.addEventListener('click', function() {
            const columnIndex = Array.from(header.parentElement.children).indexOf(header);
            console.log('Sorting column:', columnIndex, header.textContent);
            
            const isAsc = !header.classList.contains('asc');
            datasetHeaders.forEach(h => h.classList.remove('asc', 'desc'));
            header.classList.add(isAsc ? 'asc' : 'desc');
            
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            
            // 将表格分成10行一组
            const groups = [];
            let currentGroup = [];
            
            rows.forEach((row, index) => {
                currentGroup.push(row);
                if (currentGroup.length === 10 || index === rows.length - 1) {
                    groups.push(currentGroup);
                    currentGroup = [];
                }
            });
            
            // 对每组内的行进行排序
            groups.forEach(group => {
                group.sort((a, b) => {
                    const aCells = a.querySelectorAll('td');
                    const bCells = b.querySelectorAll('td');
                    const aValue = parseFloat(aCells[columnIndex]?.textContent) || 0;
                    const bValue = parseFloat(bCells[columnIndex]?.textContent) || 0;
                    return isAsc ? bValue - aValue : aValue - bValue;
                });
            });
            
            // 重新组织表格
            tbody.innerHTML = '';
            groups.forEach(group => {
                group.forEach(row => tbody.appendChild(row));
            });
        });
    });
}
