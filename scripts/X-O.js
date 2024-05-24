        let moves = 0;
        let score_p1 = 0;
        let score_p2 = 0;
        let ties_c = 0;
        let counter = 0;

        let player1_selected = null;
        let player2_selected = null;
        let currentPlayer = 1;
        function x_o(boxNumber) {
            moves++;
            let wo;
            let clickedBox = document.getElementById('box' + boxNumber);
            if (!clickedBox.innerHTML) {
                clickedBox.appendChild(createImg(currentPlayer));
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                updateTurnImage();
            }
            let win = check_whos_win();
            if(win)
            {
                if(win == "<img class=\"center-item\" src=\"./X-2.png\">")
                {
                    wo = "X";
                    score_p1++;
                    console.log(score_p1);
                }
                else if(win == "<img class=\"center-item\" src=\"./O-2.png\">")
                {
                    wo = "O";
                    score_p2++;
                    console.log(score_p2);
                }
                show_the_result(wo, 0);
                return
            }
            if(tie())
            {
                console.log('tie');
                ties_c++;
                show_the_result(wo, 1);
            }
        }
        function createImg(player) {
            let img = document.createElement("img");
            img.className = "center-item";
            img.src = "./" + (player === 1 ? player1_selected : player2_selected) + "-2.png";
            return img;
        }

        function updateTurnImage() {
            let turn = document.getElementById('turn-img');
            let imgSrc = `./${currentPlayer === 1 ? player1_selected : player2_selected}-2.png`;
            turn.innerHTML = `<img class="img-svr-middle" src="${imgSrc}">`;
        }

        function clear_the_window() {
            let i = 0;
            while (i < 9) {
                let clickedBox = document.getElementById('box' + (i + 1));
                clickedBox.innerHTML = "";
                i++;
            }
        }
        function select_element(element, but) {
            // console.log()
            if (but == 2) {
                player2_selected = element;
                console.log('player 2 ' + element);
                let change_o = document.getElementById('o-icon-selcted');
                change_o.classList.add('blue');
            }
            if (but == 1) {
                player1_selected = element;
                console.log('player 1 ' + element);
                let change_x = document.getElementById('x-icon-selcted');
                change_x.classList.add('yellow');
                // player2_selected = null;
                // player1_selected = null;
            }
        }
        function ft_startPlay() {
            if (player1_selected && player2_selected) {
                document.getElementById('box-of-choosing').classList.add('hidden');
                document.getElementById('box-of-start').classList.remove('hidden');
                let turn = document.getElementById('turn-img');
                turn.innerHTML = "<img class=\"img-svr-middle\" src=\"./" + player1_selected + "-2.png\">";
                
                let color = document.getElementById('x-icon-selcted');
                let color_1 = document.getElementById('o-icon-selcted');
                color_1.classList.add('reset_color');
                color.classList.add('reset_color');

                let score_pl1 = document.getElementById('pl1');
                let score_pl2 = document.getElementById('pl2');
                score_pl1.innerHTML = "Player 1("+ score_p1 +")";
                score_pl2.innerHTML = "Player 2("+ score_p2 +")";
            }
        }
        function tie()
        {
            let buttons = document.querySelectorAll('.each-box');
            
            let tete;
            let i = 0;
            let counter = 0;

            tete = buttons[i].innerHTML;
            buttons.length
            while(i < buttons.length)
            {
                tete = buttons[i].innerHTML;
                if(tete == "<img class=\"center-item\" src=\"./X-2.png\">" ||
                    tete == "<img class=\"center-item\" src=\"./O-2.png\">")
                    counter++;
                i++;
            }
            console.log('counter', counter);
            if(counter == 9)
                return true;
            return (false);
        }

        function check_whos_win() {
            if (moves < 5)
            return;
        
            let buttons = document.querySelectorAll('.each-box');
        
            const winCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
            ];
        
            for (const combo of winCombos) {
                let [a, b, c] = combo;
            
                if (buttons[a].innerHTML === buttons[b].innerHTML &&
                    buttons[b].innerHTML === buttons[c].innerHTML &&
                        buttons[a].innerHTML !== ''
                )
                {

                    return buttons[a].innerHTML;
                }
            }
        return null;
    }
    function show_the_result(wo, numb)
    {
        if(numb === 0)
        {
            let restar = document.getElementById('restar');
            let allboxs = document.getElementById('allboxs');
            let icon_win = document.getElementById('icon-who-win');
            icon_win.innerHTML = "<img style=\"width: 25px;\" src=\"./"+wo+"-2.png\" ></div>"
            restar.classList.toggle('hidden');
            allboxs.classList.toggle('hidden');
            let score_pl1 = document.getElementById('pl1');
            let score_pl2 = document.getElementById('pl2');
            score_pl1.innerHTML = "Player 1("+ score_p1 +")";
            score_pl2.innerHTML = "Player 2("+ score_p2 +")";
            
            
        }
        if(numb === 1)
        {
            let ties = document.getElementById('ties');
            console.log(ties.innerHTML);
            ties.innerHTML = "Ties(" +  ties_c + ")";
        }

    }
   
    function replay()
    {
        let restar = document.getElementById('restar');
        let allboxs = document.getElementById('allboxs');
        restar.classList.toggle('hidden');
        allboxs.classList.toggle('hidden');
        clear_the_window();
    }
    function quit()
    {
        score_p1 = 0;
        score_p2 = 0;
        document.getElementById('box-of-start').classList.add('hidden');
        document.getElementById('box-of-choosing').classList.remove('hidden');
        let change_o = document.getElementById('o-icon-selcted');
        // change_o.classList.remove('blue');
        // let change_x = document.getElementById('x-icon-selcted');
        // change_x.classList.remove('yellow');
        // player2_selected = null;
        // player1_selected = null;
        replay();
    }