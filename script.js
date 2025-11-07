document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const leaderboard = processData(data);
            displayLeaderboard(leaderboard);
        })
        .catch(error => console.error('Error loading data:', error));
});

function processData(entries) {
    const grouped = {};

    entries.forEach(entry => {
        if (!grouped[entry.name]) {
            grouped[entry.name] = {
                points: 0,
                role: entry.role
            };
        }
        grouped[entry.name].points += entry.points;
    });

    return Object.entries(grouped)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.points - a.points);
}

function displayLeaderboard(leaderboard) {
    const container = document.getElementById('leaderboard');

    leaderboard.forEach((person, index) => {
        const item = document.createElement('div');
        item.className = 'leader-item';

        const rank = document.createElement('div');
        rank.className = 'rank';
        rank.textContent = `#${index + 1}`;

        const info = document.createElement('div');
        info.className = 'leader-info';

        const name = document.createElement('div');
        name.className = 'leader-name';
        name.textContent = person.name;

        const role = document.createElement('div');
        role.className = 'leader-role';
        role.textContent = person.role;

        const points = document.createElement('div');
        points.className = 'leader-points';
        points.textContent = person.points;

        info.appendChild(name);
        info.appendChild(role);

        item.appendChild(rank);
        item.appendChild(info);
        item.appendChild(points);

        container.appendChild(item);
    });
}
