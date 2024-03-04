document.getElementById('original').addEventListener('click', function() {
    var original = this;
    var clone = original.cloneNode(true);
    document.getElementById('container').appendChild(clone);

    var offsetX, offsetY;

    function handleMouseDown(event) {
        offsetX = event.clientX - clone.getBoundingClientRect().left;
        offsetY = event.clientY - clone.getBoundingClientRect().top;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    function handleMouseMove(event) {
        clone.style.left = (event.clientX - offsetX) + 'px';
        clone.style.top = (event.clientY - offsetY) + 'px';
    }

    function handleMouseUp() {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        clone.remove();
    }

    clone.addEventListener('mousedown', handleMouseDown);
});

function drag()
{
    var textObject = document.getElementById("draggable_object1")
    textObject.textContent = "this has changed"
}
//drag();