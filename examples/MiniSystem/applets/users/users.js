let users = function (applet) {
    let _grid;

    let imp = {
        END_DRAW: async function () {
            _grid = applet.find('grid');

            try {
                let response = await fetch('https://jsonplaceholder.typicode.com/users');
                let data = await response.json();
                console.log(data);

                _grid.dataProvider = data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    return imp;
}

export { users };
