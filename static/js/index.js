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

    // 添加表头样式表明可排序
    datasetHeaders.forEach(header => {
        header.style.cursor = 'pointer';
        header.title = '点击排序';
    });

    datasetHeaders.forEach((header) => {
        header.addEventListener('click', function() {
            const columnIndex = Array.from(header.parentElement.children).indexOf(header);
            console.log('Sorting column:', columnIndex, header.textContent);
            
            const isAsc = !header.classList.contains('asc');
            datasetHeaders.forEach(h => h.classList.remove('asc', 'desc'));
            header.classList.add(isAsc ? 'asc' : 'desc');
            
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            
            // 对整个表格进行排序
            rows.sort((a, b) => {
                const aCells = a.querySelectorAll('td');
                const bCells = b.querySelectorAll('td');
                
                // 获取数据并确保是数值类型
                const aValue = parseFloat(aCells[columnIndex]?.textContent.trim()) || 0;
                const bValue = parseFloat(bCells[columnIndex]?.textContent.trim()) || 0;
                
                return isAsc ? bValue - aValue : aValue - bValue;
            });
            
            // 重新组织表格
            tbody.innerHTML = '';
            rows.forEach(row => tbody.appendChild(row));
            
            // 更新行序号
            updateRowNumbers();
        });
    });
}

function updateRowNumbers() {
    const table = document.querySelector('.table-center-all');
    if (!table) return;
    
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    rows.forEach((row, index) => {
        const firstCell = row.querySelector('td:first-child');
        if (firstCell) {
            firstCell.textContent = index + 1;
        }
    });
}