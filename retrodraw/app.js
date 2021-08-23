var PALETTE = [
    'red',
    'blue',
    'white',
    'black',
    'aqua',
    'aquamarine',
    'blueviolet'
]

let mouseIsDown = false;

function makePalette() {
    for (let index = 0; index < PALETTE.length; index = index + 1) {
        // access the color
        const nextColor = PALETTE[index]
        // rest of code below
        let button = $('<button>')
        button.css('background-color', nextColor)
        $('.palette').append(button)
    }
    $('.palette button').first().addClass('active');
}

function makeGrid() {
    let size = 64

    for(let i = 0; i < size; i++) {
        let cell = $('<div>')
        cell.addClass('cell')
        $('.grid').append(cell)
    }
}

function makeColorInput() {
    let form = $('<form>')
    form.css('id','form')
    let label = $('<label>Add a Color:</label><br>')
    label.css('for','colorIn')
    let field = $('<input><br>')
    field.css('type', 'text').css('id', 'colorIn').css('name','colorName')
    let sub = $('<input type=submit><br>')
    $('.stretch').append(form)
    $('form').append(label).append(field).append(sub)
}

function onPaletteClick() {
    console.log($('.palette .active').css('background-color'))
    $('.palette .active').removeClass('active')
    $(this).addClass('active')
}

function onGridClick() {
    let color = $('.palette .active').css('background-color')
    if ($(this).css('background-color') === color) {
        $(this).css('background-color', '')
    }
    else {
        $(this).css('background-color', color);
    }
}

function onClearClick() {
    $('.grid .cell').css('background-color', '')
}

function onFillAllClick() {
    $('.grid .cell').css('background-color', $('.palette .active').css('background-color'));
}

function onFillEmptyClick() {
    let color = $('.palette .active').css('background-color')
    const elements = $('.grid .cell')

    for (let index = 0; index < elements.length; index = index + 1) {
        let nextElement = $( elements[index] );
        if (nextElement.css('background-color') === 'rgba(0, 0, 0, 0)') {
            $(elements[index]).css('background-color', color)
        }
    }
}

function addColor() {
    let exists = false;
    if($('input').val() === '') 
        exists = true
    for(let i = 0; i < PALETTE.length; i++) {
        if(PALETTE[i] === $('input').val())
            exists = true;
    }
    if(!exists) {
        PALETTE.unshift($('input').val());
        console.log('color added')
    }
    $('.palette button').remove()
    makePalette(PALETTE);
}

makeGrid();
makePalette(PALETTE);
makeColorInput();

$('.grid .cell').click(onGridClick);
$('.controls .clear').click(onClearClick);
$('.palette').on('click', 'button', onPaletteClick);
$('.controls .fill-all').click(onFillAllClick);
$('.controls .fill-empty').click(onFillEmptyClick);
$("form").click(function(e) {
    e.preventDefault();
    addColor();
});

$('.grid .cell').mousedown(function() {
    mouseIsDown = true;
})

$('.grid .cell').mouseup(function() {
    mouseIsDown = false;
})

$('.grid .cell').mouseenter(function() {
    if(mouseIsDown) {
        let color = $('.palette .active').css('background-color')
        $(this).css('background-color', $('.palette .active').css('background-color'));
    }
})
