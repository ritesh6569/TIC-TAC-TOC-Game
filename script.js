let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // player O starts first

const winPattern = {
    pattern1: [0, 1, 2],
    pattern2: [0, 3, 6],
    pattern3: [0, 4, 8],
    pattern4: [1, 4, 7],
    pattern5: [2, 5, 8],
    pattern6: [2, 4, 6],
    pattern7: [3, 4, 5],
    pattern8: [6, 7, 8],
};

const resetGame = () => {
    turn0 = true;
    enableboxes();
    msgcontainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turn0==true) 
            {
                // player O's turn
                box.innerText = "O";
            } 
            else
             {
                // player X's turn
                box.innerText = "X";
            }
            turn0 = !turn0; // toggle turn

            box.disabled = true; // disable box after click

            checkWinner();
        }
    });
});

const disableboxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableboxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = ""; // clear text inside box
    });
};

const showwinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
};

const checkWinner = () => {
    for (let pattern in winPattern) {
        let pos1val = boxes[winPattern[pattern][0]].innerText;
        let pos2val = boxes[winPattern[pattern][1]].innerText;
        let pos3val = boxes[winPattern[pattern][2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            console.log("winner", pos1val);
            showwinner(pos1val);
            break; // exit loop early since we found a winner
        }
    }
};

newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
