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
            
            // 保存 LRM 分组信息
            const lrmGroups = {};
            rows.forEach(row => {
                const lrmCell = row.querySelector('td[rowspan]');
                if (lrmCell) {
                    const lrmValue = lrmCell.textContent;
                    const rowspan = parseInt(lrmCell.getAttribute('rowspan'));
                    lrmGroups[lrmValue] = {
                        rows: [],
                        rowspan: rowspan
                    };
                }
            });
            
            // 将行按 LRM 分组
            rows.forEach(row => {
                const firstCell = row.querySelector('td');
                if (!firstCell.hasAttribute('rowspan')) {
                    const prevRow = row.previousElementSibling;
                    if (prevRow) {
                        const lrmCell = prevRow.querySelector('td[rowspan]');
                        if (lrmCell) {
                            const lrmValue = lrmCell.textContent;
                            lrmGroups[lrmValue].rows.push(row);
                        }
                    }
                } else {
                    const lrmValue = firstCell.textContent;
                    lrmGroups[lrmValue].rows.push(row);
                }
            });
            
            // 对每个 LRM 组内的行进行排序
            Object.keys(lrmGroups).forEach(lrm => {
                lrmGroups[lrm].rows.sort((a, b) => {
                    let aCell = a.cells[columnIndex];
                    let bCell = b.cells[columnIndex];
                    
                    // 调整单元格索引以考虑合并单元格
                    if (!a.querySelector('td[rowspan]')) {
                        aCell = a.cells[columnIndex - 1];
                    }
                    if (!b.querySelector('td[rowspan]')) {
                        bCell = b.cells[columnIndex - 1];
                    }
                    
                    const aValue = parseFloat(aCell?.textContent) || 0;
                    const bValue = parseFloat(bCell?.textContent) || 0;
                    return isAsc ? bValue - aValue : aValue - bValue;
                });
            });
            
            // 重新组织表格
            tbody.innerHTML = '';
            Object.keys(lrmGroups).forEach(lrm => {
                lrmGroups[lrm].rows.forEach(row => tbody.appendChild(row));
            });
        });
    });
}
