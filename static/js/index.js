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

    // 初始化表格排序
    initTableSort();
})

document.addEventListener('DOMContentLoaded', function() {
    // 初始化排序功能
    initTableSort();
});

function initTableSort() {
    console.log('Initializing table sort...');
    const table = document.querySelector('.table-center-all');
    if (!table) {
        console.error('Table not found');
        return;
    }

    const headers = table.querySelectorAll('thead tr:last-child th');
    headers.forEach((header, index) => {
        if (index > 1) { // 跳过 LRM 和 LLM 列
            header.classList.add('sortable');
            header.style.cursor = 'pointer';
            
            header.addEventListener('click', () => {
                console.log('Header clicked:', header.textContent);
                const isAsc = !header.classList.contains('asc');
                
                // 移除所有排序标记
                headers.forEach(h => {
                    h.classList.remove('asc', 'desc');
                });
                
                // 添加新的排序标记
                header.classList.add(isAsc ? 'asc' : 'desc');
                
                // 执行排序
                sortTableByColumn(table, index, isAsc);
            });
        }
    });
}

function sortTableByColumn(table, columnIndex, asc = true) {
    console.log('Sorting column:', columnIndex, 'ascending:', asc);
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // 排序行
    const sortedRows = rows.sort((a, b) => {
        const aCol = a.querySelectorAll('td')[columnIndex];
        const bCol = b.querySelectorAll('td')[columnIndex];
        
        if (!aCol || !bCol) return 0;
        
        const aValue = parseFloat(aCol.textContent) || 0;
        const bValue = parseFloat(bCol.textContent) || 0;
        
        return asc ? aValue - bValue : bValue - aValue;
    });
    
    // 清空表格
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    
    // 添加排序后的行
    sortedRows.forEach(row => tbody.appendChild(row));
}
