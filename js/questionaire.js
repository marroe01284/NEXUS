

document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');

    
    submitBtn.addEventListener('click', () => {
        const formData = {
            weekdays: document.getElementById('weekdays').checked,
            weekends: document.getElementById('weekends').checked,
            casual: document.getElementById('casual').checked,
            competetive: document.getElementById('competetive').checked,
            pc: document.getElementById('pc').checked,
            xbox: document.getElementById('xbox').checked,
            battlenet: document.getElementById('battlenet').checked,
            action: document.getElementById('action').checked,
            strategy: document.getElementById('strategy').checked,
            puzzle: document.getElementById('puzzle').checked,
            platform: document.getElementById('platform').checked,
            adventure: document.getElementById('adventure').checked,
            simulation: document.getElementById('simulation').checked,
            horror: document.getElementById('horror').checked,
            shooter: document.getElementById('shooter').checked,
            rpg: document.getElementById('rpg').checked,
            sports: document.getElementById('sports').checked,
            fighting: document.getElementById('fighting').checked,
            racing: document.getElementById('racing').checked,
            stealth: document.getElementById('stealth').checked,
            survival: document.getElementById('survival').checked,
            mmorpg: document.getElementById('mmorpg').checked,
            rougelike: document.getElementById('rougelike').checked,
            friends: document.getElementById('friends').checked,
            community: document.getElementById('community').checked,
            teammates: document.getElementById('teammates').checked
        };
        localStorage.setItem('formData', JSON.stringify(formData));
        alert('Data saved successfully and added to your profile!');
        window.location.href = 'profile.html'
    });
});

