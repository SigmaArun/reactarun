const BASE_URL = 'https://crudcrud.com/api/1a624a7a29f84263996a5bfa9a466593/votes';

export const fetchVotes = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch votes');
    }
    const data = await response.json();
    return data;
};

export const storeVote = async (vote) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(vote),
    });
    if (!response.ok) {
        throw new Error('Failed to store vote');
    }
    const data = await response.json();
    return data;
};

export const deleteVote = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete vote');
    }
    return true;
};
