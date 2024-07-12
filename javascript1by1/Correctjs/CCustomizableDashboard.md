```html
<title>Customizable Dashboard</title> <style> body { font-family: Arial, sans-serif; } .dashboard { display: flex; flex-wrap: wrap; gap: 10px; } .widget { border: 1px solid #ccc; padding: 20px; background-color: #f9f9f9; width: 200px; height: 200px; position: relative; cursor: move; } .remove-btn { position: absolute; top: 5px; right: 5px; background-color: red; color: white; border: none; cursor: pointer; } .light { background-color: #ffffff; color: #000000; } .dark { background-color: #333333; color: #ffffff; } </style>
Add Widget Light Theme Dark Theme
<script>
    const widgets = ['weather', 'news', 'calendar'];
    const dashboard = document.getElementById('dashboard');
    const addWidgetBtn = document.getElementById('addWidgetBtn');
    const themeSelect = document.getElementById('themeSelect');

    addWidgetBtn.addEventListener('click', addWidget);
    themeSelect.addEventListener('change', changeTheme);

    function addWidget() {
        const widgetType = widgets[Math.floor(Math.random() * widgets.length)];
        const widget = document.createElement('div');
        widget.classList.add('widget');
        widget.draggable = true;
        widget.innerHTML = `
            <button class="remove-btn">X</button>
            <h3>${widgetType}</h3>
        `;
        dashboard.appendChild(widget);
        widget.querySelector('.remove-btn').addEventListener('click', () => {
            widget.remove();
            saveDashboard();
        });
        widget.addEventListener('dragstart', handleDragStart);
        widget.addEventListener('dragover', handleDragOver);
        widget.addEventListener('drop', handleDrop);
        saveDashboard();
    }

    function changeTheme() {
        const theme = themeSelect.value;
        document.body.className = theme;
    }

    function saveDashboard() {
        const widgets = [];
        dashboard.querySelectorAll('.widget').forEach(widget => {
            widgets.push(widget.querySelector('h3').textContent);
        });
        localStorage.setItem('dashboard', JSON.stringify(widgets));
    }

    function loadDashboard() {
        const savedWidgets = JSON.parse(localStorage.getItem('dashboard'));
        if (savedWidgets) {
            savedWidgets.forEach(widgetType => {
                const widget = document.createElement('div');
                widget.classList.add('widget');
                widget.draggable = true;
                widget.innerHTML = `
                    <button class="remove-btn">X</button>
                    <h3>${widgetType}</h3>
                `;
                dashboard.appendChild(widget);
                widget.querySelector('.remove-btn').addEventListener('click', () => {
                    widget.remove();
                    saveDashboard();
                });
                widget.addEventListener('dragstart', handleDragStart);
                widget.addEventListener('dragover', handleDragOver);
                widget.addEventListener('drop', handleDrop);
            });
        }
    }

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.innerHTML);
        e.target.classList.add('dragging');
    }

    function handleDragOver(e) {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        if (e.target.classList.contains('widget') && e.target !== dragging) {
            dashboard.insertBefore(dragging, e.target.nextSibling);
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        dragging.classList.remove('dragging');
        saveDashboard();
    }

    loadDashboard();
</script>

```
