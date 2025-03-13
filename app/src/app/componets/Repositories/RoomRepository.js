const url = "https://didactic-telegram-w9xqw6x46pxf5gv4-8443.app.github.dev";
const roomsPath = "/api/v1/user-session/rooms";

const fetchRooms = async () => {

}

const AddPlayerToRoom = async (event) => {
    event.preventDefault();

    console.log(event);
    
    const formData = new FormData(event.target);
    const nickname = formData.get('nickname');
    const roomCode = formData.get('roomCode');
    
    console.log(nickname);

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
    console.log(result);
}

export { 
    fetchRooms,
    AddPlayerToRoom
}