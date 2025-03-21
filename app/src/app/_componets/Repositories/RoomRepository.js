const url = "https://didactic-telegram-w9xqw6x46pxf5gv4-8443.app.github.dev";
const roomsPath = "/api/v1/user-session/rooms";

const FetchRooms = async ( 
    setPagination,
    setLoading,
    setError,
    currentPage = 1,
    pageSize = 5,
    filterLabel= "") => {
    try {
        const response = await fetch(`${url}${roomsPath}/?currentPage=${currentPage}&pageSize=${pageSize}&filterLabel=${filterLabel}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch rooms");
        }
        const data = await response.json();
        setPagination(data.paginatedItems);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

const AddPlayerToRoom = async (event, router) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const nickname = formData.get('nickname');
    const roomCode = formData.get('roomCode');

    const data = {
        playerName: nickname,
        roomCode: roomCode
    };

    const JSONdata = JSON.stringify(data);

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSONdata,
    };

    const response = await fetch(`${url}${roomsPath}/${roomCode}/add-player/`, options);
    const result = await response.json();

    if (response.ok) {
        router.push(`/rooms/${roomCode}`);
    } else {
        console.error('Erro ao adicionar jogador');
    }
}

export { 
    FetchRooms,
    AddPlayerToRoom
}