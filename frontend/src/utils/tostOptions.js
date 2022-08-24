export const options = {
    onOpen: () => {
        const audio = new Audio('https://drive.google.com/uc?export=download&id=1M95VOpto1cQ4FQHzNBaLf0WFQglrtWi7');
        audio.play();
        console.log(audio)
    }
}
