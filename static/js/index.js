window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();

})

document.addEventListener('DOMContentLoaded', function() {
    // 初始化排序功能
    initTableSort();
});

function initTableSort() {
    const table = document.querySelector('.table-center-all');
    const headers = table.querySelectorAll('th.sortable');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.dataset.column;
            const isAsc = !header.classList.contains('asc');
            
            // 移除所有排序标记
            headers.forEach(h => {
                h.classList.remove('asc', 'desc');
            });
            
            // 添加新的排序标记
            header.classList.add(isAsc ? 'asc' : 'desc');
            
            // 执行排序
            sortTableByColumn(table, column, isAsc);
        });
    });
}

function sortTableByColumn(table, column, asc = true) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // 排序行
    const sortedRows = rows.sort((a, b) => {
        const aValue = parseFloat(a.children[column].textContent) || 0;
        const bValue = parseFloat(b.children[column].textContent) || 0;
        return asc ? aValue - bValue : bValue - aValue;
    });
    
    // 清空表格
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    
    // 添加排序后的行
    tbody.append(...sortedRows);
    
    // 更新行号
    sortedRows.forEach((row, index) => {
        const numberCell = row.querySelector('td:first-child');
        if (numberCell) {
            numberCell.textContent = index + 1;
        }
    });
}
