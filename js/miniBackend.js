const STORAGE_TOKEN = 'MJWHV62MT6MZTXK79TRTJKX2UWU2GE8JM6TRFQ7P';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        // Verbesserter code
        if (res.data) { 
            return res.data.value;
        } throw `No users found. Please Sign Up or Guest Login".`;
    });
}

function clearUsers() {
    users = []; 
    setItem('users', JSON.stringify(users))
        .then(() => {
            console.log('Users data cleared successfully.');
        })
        .catch(error => {
            console.error('Error clearing users data:', error);
        });
}


